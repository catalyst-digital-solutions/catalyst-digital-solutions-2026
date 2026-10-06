"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/atara/atara-checkout-intro.mp4";
const POSTER_SRC = "/atara/atara-checkout-intro-poster.jpg";
const FINAL_SRC = "/atara/atara-checkout-intro-final.png";

const SKIP_APPEAR_MS = 1000;
const HOLD_AFTER_END_MS = 600;
const HOLD_AFTER_SKIP_MS = 200;
const HOLD_REDUCED_MS = 500;
const HOLD_FALLBACK_MS = 500;
const FADE_MS = 800;
const MAX_MS = 7000;

type IntroSplashProps = {
  children: React.ReactNode;
};

export default function IntroSplash({ children }: IntroSplashProps) {
  const [active, setActive] = useState(true);
  const [fading, setFading] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const settledRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  const later = useCallback(
    (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    },
    [],
  );

  const finish = useCallback(() => {
    document.documentElement.classList.remove("splash-lock");
    setActive(false);
    clearTimers();
  }, [clearTimers]);

  const fadeOut = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;
    setShowSkip(false);
    setFading(true);
    later(finish, FADE_MS + 50);
  }, [finish, later]);

  const revealFinalThenFade = useCallback(
    (holdMs: number) => {
      if (settledRef.current) return;
      setShowFinal(true);
      setHideVideo(true);
      setShowSkip(false);
      later(fadeOut, holdMs);
    },
    [fadeOut, later],
  );

  useEffect(() => {
    overlayRef.current?.classList.add("intro-controlled");

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finalImage = new Image();
    finalImage.src = FINAL_SRC;
    void finalImage.decode?.().catch(() => undefined);

    const skipTimer = later(() => {
      if (!settledRef.current && !reduce) setShowSkip(true);
    }, SKIP_APPEAR_MS);

    const maxTimer = later(() => {
      if (!settledRef.current) revealFinalThenFade(HOLD_FALLBACK_MS);
    }, MAX_MS);

    if (reduce) {
      later(() => revealFinalThenFade(HOLD_REDUCED_MS), 0);
      return () => {
        window.clearTimeout(skipTimer);
        window.clearTimeout(maxTimer);
        clearTimers();
      };
    }

    const video = videoRef.current;
    if (!video) {
      later(() => revealFinalThenFade(HOLD_FALLBACK_MS), 0);
      return () => {
        clearTimers();
      };
    }

    const fail = () => {
      revealFinalThenFade(HOLD_FALLBACK_MS);
    };

    const onEnded = () => {
      revealFinalThenFade(HOLD_AFTER_END_MS);
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", fail);

    try {
      video.pause();
      video.currentTime = 0;
    } catch {
      // Some browsers throw if metadata is not ready yet.
    }

    let playStarted = false;
    const tryPlay = () => {
      if (settledRef.current || playStarted) return;
      try {
        if (video.currentTime > 0.05) video.currentTime = 0;
      } catch {
        // ignore
      }
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt
          .then(() => {
            playStarted = true;
          })
          .catch(fail);
      }
    };

    video.addEventListener("loadeddata", tryPlay);
    tryPlay();

    later(() => {
      if (settledRef.current) return;
      if (!playStarted && video.currentTime < 0.2) fail();
    }, 2500);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", fail);
      video.removeEventListener("loadeddata", tryPlay);
      clearTimers();
    };
  }, [clearTimers, later, revealFinalThenFade]);

  const onSkip = () => {
    revealFinalThenFade(HOLD_AFTER_SKIP_MS);
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100dvh",
    zIndex: 2147483000,
    overflow: "hidden",
    pointerEvents: "auto",
    backgroundColor: "#102140",
    backgroundImage:
      "radial-gradient(ellipse 78% 52% at 50% 0%, #1e5178 0%, transparent 58%), radial-gradient(ellipse 70% 48% at 50% 100%, #1b4c73 0%, transparent 60%)",
  };

  return (
    <>
      {active ? (
        <div
          ref={overlayRef}
          className={`intro-splash${fading ? " is-fading" : ""}`}
          style={overlayStyle}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && fading) finish();
          }}
        >
          <div className="intro-media" aria-hidden="true">
            <video
              ref={videoRef}
              className={`intro-video${hideVideo ? " is-hidden" : ""}`}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
            />
            <img
              className={`intro-final${showFinal ? " is-visible" : ""}`}
              src={FINAL_SRC}
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </div>
          <button
            type="button"
            className={`intro-skip${showSkip ? " is-visible" : ""}`}
            aria-hidden={showSkip ? undefined : true}
            tabIndex={showSkip ? 0 : -1}
            onClick={onSkip}
          >
            Skip intro
          </button>
        </div>
      ) : null}
      <div inert={active ? true : undefined}>{children}</div>
    </>
  );
}
