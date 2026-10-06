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
const FADE_FALLBACK_MS = 900;
const MAX_MS = 7000;

type IntroSplashProps = {
  children: React.ReactNode;
};

export default function IntroSplash({ children }: IntroSplashProps) {
  const [active, setActive] = useState(true);
  const [fading, setFading] = useState(false);
  const [showPng, setShowPng] = useState(false);
  const [holding, setHolding] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const holdStartedRef = useRef(false);
  const fadeStartedRef = useRef(false);
  const finishedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const rafRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
    for (const id of rafRef.current) window.cancelAnimationFrame(id);
    rafRef.current = [];
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    document.documentElement.classList.remove("splash-lock");
    setActive(false);
    clearTimers();
  }, [clearTimers]);

  const startFade = useCallback(() => {
    if (fadeStartedRef.current) return;
    fadeStartedRef.current = true;
    setShowSkip(false);

    const el = overlayRef.current;
    if (!el) {
      finish();
      return;
    }

    el.classList.add("intro-controlled");
    el.style.transition = `opacity ${FADE_MS}ms ease`;
    el.style.opacity = "1";
    void el.offsetWidth;

    const frame1 = window.requestAnimationFrame(() => {
      const frame2 = window.requestAnimationFrame(() => {
        el.classList.add("is-fading");
        el.style.opacity = "0";
        setFading(true);
        later(finish, FADE_FALLBACK_MS);
      });
      rafRef.current.push(frame2);
    });
    rafRef.current.push(frame1);
  }, [finish, later]);

  const beginHoldThenFade = useCallback(
    (holdMs: number, mode: "video" | "png") => {
      if (holdStartedRef.current || fadeStartedRef.current) return;
      holdStartedRef.current = true;
      setHolding(true);
      setShowSkip(false);
      if (mode === "png") setShowPng(true);

      const video = videoRef.current;
      if (video) {
        video.pause();
      }

      later(startFade, holdMs);
    },
    [later, startFade],
  );

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finalImage = new Image();
    finalImage.src = FINAL_SRC;
    void finalImage.decode?.().catch(() => undefined);

    later(() => {
      if (!holdStartedRef.current && !fadeStartedRef.current && !reduce) {
        setShowSkip(true);
      }
    }, SKIP_APPEAR_MS);

    later(() => {
      if (!holdStartedRef.current) beginHoldThenFade(HOLD_FALLBACK_MS, "png");
    }, MAX_MS);

    if (reduce) {
      later(() => beginHoldThenFade(HOLD_REDUCED_MS, "png"), 0);
      return () => clearTimers();
    }

    const video = videoRef.current;
    if (!video) {
      later(() => beginHoldThenFade(HOLD_FALLBACK_MS, "png"), 0);
      return () => clearTimers();
    }

    const fail = () => {
      beginHoldThenFade(HOLD_FALLBACK_MS, "png");
    };

    const onEnded = () => {
      beginHoldThenFade(HOLD_AFTER_END_MS, "video");
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
      if (holdStartedRef.current || fadeStartedRef.current || playStarted) return;
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
      if (!holdStartedRef.current && !playStarted && video.currentTime < 0.2) fail();
    }, 2500);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", fail);
      video.removeEventListener("loadeddata", tryPlay);
      clearTimers();
    };
  }, [beginHoldThenFade, clearTimers, later]);

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
    opacity: fading ? 0 : 1,
    transition: "opacity 800ms ease",
  };

  return (
    <>
      {active ? (
        <div
          ref={overlayRef}
          className={`intro-splash intro-controlled${fading ? " is-fading" : ""}${showPng ? " is-png" : ""}${holding ? " is-holding" : ""}`}
          style={overlayStyle}
          onTransitionEnd={(event) => {
            if (
              event.target === event.currentTarget &&
              event.propertyName === "opacity" &&
              fadeStartedRef.current
            ) {
              finish();
            }
          }}
        >
          <div className="intro-media" aria-hidden="true">
            <video
              ref={videoRef}
              className="intro-video"
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
              className={`intro-final${showPng ? " is-visible" : ""}`}
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
            onClick={() => beginHoldThenFade(HOLD_AFTER_SKIP_MS, "png")}
          >
            Skip intro
          </button>
        </div>
      ) : null}
      <div inert={active ? true : undefined}>{children}</div>
    </>
  );
}
