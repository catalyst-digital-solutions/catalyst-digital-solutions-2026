"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PublicOnboardingConfig } from "@/config/onboarding/types";
import { ApiError, api } from "@/lib/onboarding/client/api";
import { nowMs } from "@/lib/onboarding/client/util";
import { sectionStats } from "@/lib/onboarding/status";
import type { Answers, ClientState, FieldAnswer, UploadedFileRef, View } from "@/lib/onboarding/types";
import { OnboardingContext, type AnswerPatch, type OnboardingCtx } from "./context";
import { IntroView } from "./IntroView";
import { ReviewView } from "./ReviewView";
import { SaveExitDialog } from "./SaveExitDialog";
import { MobileActionBar, SectionView } from "./SectionView";
import { MobileStepHeader, StepNav, StepSheet } from "./StepNav";
import { SubmittedView } from "./SubmittedView";
import { TopBar } from "./TopBar";

const pad2 = (n: number) => String(n).padStart(2, "0");
const DEBOUNCE_MS = 600;

interface LocalCache {
  /** field answers not yet acknowledged by the server */
  pending: Record<string, FieldAnswer>;
  /** resume position not yet acknowledged by the server */
  pos?: { view: View; step: number; visited: Record<string, boolean>; ts: number };
  ts: number;
}

type SaveState = "ok" | "saving" | "offline";

export function OnboardingShell({
  slug,
  config,
  initial,
  preview,
}: {
  slug: string;
  config: PublicOnboardingConfig;
  initial: ClientState;
  preview: boolean;
}) {
  const N = config.sections.length;
  const [view, setView] = useState<View>(initial.view);
  const [step, setStep] = useState(initial.step);
  const [visited, setVisited] = useState(initial.visited);
  const [answers, setAnswers] = useState<Answers>(initial.answers);
  const [savedAt, setSavedAt] = useState<number | null>(initial.savedAt);
  const [submittedAt, setSubmittedAt] = useState<number | null>(initial.submittedAt);
  const [agree, setAgree] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("ok");
  const [expired, setExpired] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [now, setNow] = useState(() => Date.now());

  // ---- refs for the autosave engine (avoid stale closures)
  const answersRef = useRef(answers);
  const posRef = useRef({ view, step, visited });
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    posRef.current = { view, step, visited };
  }, [view, step, visited]);
  const flushRef = useRef<(opts?: { keepalive?: boolean }) => Promise<void>>(async () => {});
  const later = (ms: number) => setTimeout(() => void flushRef.current(), ms);
  const dirty = useRef(new Map<string, number>()); // fieldId -> version
  const version = useRef(0);
  const posDirty = useRef(false);
  const inflight = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backoff = useRef(0);
  const dead = useRef(false); // expired/submitted: stop saving
  const posTs = useRef(0);
  const cacheKey = `catalyst.onboarding.${slug}.${initial.instanceId}.v1`;

  const writeCache = useCallback(() => {
    if (preview) return;
    try {
      const pending: Record<string, FieldAnswer> = {};
      dirty.current.forEach((_, id) => {
        if (answersRef.current[id]) pending[id] = answersRef.current[id];
      });
      const pos = posDirty.current ? { ...posRef.current, ts: posTs.current } : undefined;
      if (Object.keys(pending).length || pos) localStorage.setItem(cacheKey, JSON.stringify({ pending, pos, ts: Date.now() } satisfies LocalCache));
      else localStorage.removeItem(cacheKey);
    } catch {
      /* storage full / disabled */
    }
  }, [cacheKey, preview]);

  const flush = useCallback(
    async (opts: { keepalive?: boolean } = {}) => {
      if (preview || dead.current) return;
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      if (inflight.current && !opts.keepalive) {
        timer.current = later(250);
        return;
      }
      if (!dirty.current.size && !posDirty.current) return;
      const sent = new Map(dirty.current);
      const fields: Record<string, FieldAnswer> = {};
      sent.forEach((_, id) => {
        const a = answersRef.current[id];
        if (a) {
          const { files: _f, ...rest } = a; // uploads are server-owned
          void _f;
          fields[id] = rest;
        }
      });
      const sentPos = posDirty.current;
      const p = posRef.current;
      posDirty.current = false;
      inflight.current = true;
      setSaveState("saving");
      try {
        const res = await api<{ savedAt: number }>(slug, "save", {
          keepalive: opts.keepalive,
          body: { fields, position: { view: p.view === "submitted" ? undefined : p.view, step: p.step, visited: p.visited } },
        });
        sent.forEach((v, id) => {
          if (dirty.current.get(id) === v) dirty.current.delete(id);
        });
        backoff.current = 0;
        setSavedAt(res.savedAt || Date.now());
        setSaveState("ok");
        writeCache();
        if (dirty.current.size || posDirty.current) timer.current = later(DEBOUNCE_MS);
      } catch (err) {
        if (sentPos) posDirty.current = true;
        if (err instanceof ApiError && err.status === 401) {
          dead.current = true;
          setExpired(true);
          setSaveState("offline");
        } else if (err instanceof ApiError && err.status === 409) {
          dead.current = true;
          window.location.reload();
        } else if (err instanceof ApiError && err.status === 400) {
          // Server rejected the batch: drop it rather than loop forever.
          console.warn("[onboarding] save rejected", err.message);
          sent.forEach((v, id) => {
            if (dirty.current.get(id) === v) dirty.current.delete(id);
          });
          writeCache();
          setSaveState("ok");
        } else {
          setSaveState("offline");
          backoff.current = Math.min(backoff.current ? backoff.current * 2 : 2000, 30000);
          timer.current = later(backoff.current);
        }
      } finally {
        inflight.current = false;
      }
    },
    [preview, slug, writeCache],
  );
  useEffect(() => {
    flushRef.current = flush;
  }, [flush]);

  const schedule = useCallback(() => {
    if (preview) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void flush(), DEBOUNCE_MS);
  }, [flush, preview]);

  // ---- restore unsynced edits from this device (refresh / crash / offline recovery)
  useEffect(() => {
    if (preview || initial.view === "submitted") return;
    try {
      const c = JSON.parse(localStorage.getItem(cacheKey) || "null") as LocalCache | null;
      // A position change that may not have reached the server (e.g. exit + instant reload).
      const pos = c?.pos;
      if (pos && pos.ts > (initial.savedAt || 0) && (pos.view === "intro" || pos.view === "wizard" || pos.view === "review")) {
        const step = Math.min(Math.max(Number(pos.step) || 0, 0), N - 1);
        const visitedNext = { ...initial.visited, ...(pos.visited || {}) };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setView(pos.view);
        setStep(step);
        setVisited(visitedNext);
        posRef.current = { view: pos.view, step, visited: visitedNext };
        posTs.current = pos.ts;
        posDirty.current = true;
        later(50);
      }
      if (c && c.pending && typeof c.pending === "object") {
        const ids = Object.keys(c.pending).filter((id) => {
          const server = initial.answers[id];
          return !server?.at || (c.pending[id].at || 0) > (server.at || 0);
        });
        if (ids.length) {
          // Restoring from an external store (localStorage) after hydration.
          setAnswers((prev) => {
            const next = { ...prev };
            ids.forEach((id) => (next[id] = { ...c.pending[id], files: prev[id]?.files }));
            return next;
          });
          ids.forEach((id) => dirty.current.set(id, ++version.current));
          later(50);
        } else if (!posDirty.current) localStorage.removeItem(cacheKey);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- flush on tab hide / unload; retry when back online
  useEffect(() => {
    if (preview) return;
    const hide = () => {
      if (document.visibilityState === "hidden") void flush({ keepalive: true });
    };
    const pagehide = () => void flush({ keepalive: true });
    const online = () => void flush();
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("pagehide", pagehide);
    window.addEventListener("online", online);
    return () => {
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("pagehide", pagehide);
      window.removeEventListener("online", online);
    };
  }, [flush, preview]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 20000);
    return () => clearInterval(t);
  }, []);

  // ---- answers
  // Answers are computed synchronously against the ref (not inside a state
  // updater) so the local cache and an unload flush always see the latest value.
  const setAnswer = useCallback(
    (fieldId: string, patch: AnswerPatch) => {
      const cur = answersRef.current;
      const prev = cur[fieldId] || {};
      const p = typeof patch === "function" ? patch(prev) : patch;
      const next = { ...cur, [fieldId]: { ...prev, ...p, at: nowMs() } };
      answersRef.current = next;
      setAnswers(next);
      if (preview) {
        setSavedAt(nowMs());
        return;
      }
      dirty.current.set(fieldId, ++version.current);
      writeCache();
      schedule();
    },
    [preview, schedule, writeCache],
  );

  const setFiles = useCallback((fieldId: string, fn: (files: UploadedFileRef[]) => UploadedFileRef[]) => {
    const cur = answersRef.current;
    const prev = cur[fieldId] || {};
    const files = fn(prev.files || []);
    const next = { ...cur, [fieldId]: { ...prev, files, at: files.length ? nowMs() : prev.at } };
    answersRef.current = next;
    setAnswers(next);
    setSavedAt(nowMs());
  }, []);

  // ---- single active dictation
  const [dictKey, setDictKey] = useState<string | null>(null);
  const dictStop = useRef<(() => void) | null>(null);
  const activeDictation = useMemo(
    () => ({
      key: dictKey,
      claim: (key: string, stop: () => void) => {
        if (dictStop.current && dictKey !== key) dictStop.current();
        dictStop.current = stop;
        setDictKey(key);
      },
      release: (key: string) => {
        setDictKey((k) => (k === key ? null : k));
        if (dictKey === key) dictStop.current = null;
      },
    }),
    [dictKey],
  );

  const onSessionExpired = useCallback(() => {
    dead.current = true;
    setExpired(true);
  }, []);

  const ctx: OnboardingCtx = useMemo(
    () => ({ slug, preview, config, answers, setAnswer, setFiles, activeDictation, onSessionExpired }),
    [slug, preview, config, answers, setAnswer, setFiles, activeDictation, onSessionExpired],
  );

  // ---- navigation
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    document.getElementById("section-title")?.focus({ preventScroll: true });
  }, [view, step]);

  const nav = useCallback(
    (patch: { view?: View; step?: number }) => {
      if (dictStop.current) {
        dictStop.current();
        dictStop.current = null;
        setDictKey(null);
      }
      const leavingSection = view === "wizard" ? config.sections[step].id : null;
      const nextVisited = leavingSection && !visited[leavingSection] ? { ...visited, [leavingSection]: true } : visited;
      const nv = patch.view ?? view;
      const ns = patch.step ?? step;
      setVisited(nextVisited);
      if (patch.view !== undefined) setView(patch.view);
      if (patch.step !== undefined) setStep(patch.step);
      setStepsOpen(false);
      setExitOpen(false);
      posRef.current = { view: nv, step: ns, visited: nextVisited };
      if (!preview) {
        posDirty.current = true;
        posTs.current = nowMs();
        writeCache();
        void flush();
      }
    },
    [config.sections, flush, preview, step, view, visited, writeCache],
  );

  const stats = useMemo(() => config.sections.map((s) => sectionStats(s, answers, visited)), [config.sections, answers, visited]);
  const done = stats.filter((s) => s.complete).length;
  const hasProgress = stats.some((s) => s.touched) || Object.keys(visited).length > 0;
  const resumeLabel = view === "review" ? "Final Review" : `Section ${pad2(step + 1)} — ${config.sections[step].short}`;

  const next = () => (step < N - 1 ? nav({ step: step + 1 }) : nav({ view: "review" }));
  const prev = () => (view === "review" ? nav({ view: "wizard", step: N - 1 }) : step > 0 ? nav({ step: step - 1 }) : nav({ view: "intro" }));

  const send = async () => {
    if (!agree || sending) return;
    if (preview) {
      setSubmittedAt(Date.now());
      setView("submitted");
      return;
    }
    setSending(true);
    setSendError("");
    try {
      await flush();
      // wait for any in-flight save to settle
      for (let i = 0; i < 40 && (inflight.current || dirty.current.size); i++) await new Promise((r) => setTimeout(r, 150));
      const res = await api<{ submittedAt: number }>(slug, "submit", { body: { confirm: true } });
      dead.current = true;
      try {
        localStorage.removeItem(cacheKey);
      } catch {
        /* ignore */
      }
      setSubmittedAt(res.submittedAt || Date.now());
      setView("submitted");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) setExpired(true);
      else if (err instanceof ApiError && err.status === 409) window.location.reload();
      else setSendError("We couldn’t send that just now. Your answers are saved — please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  // ---- top bar label
  let savedLabel = "Progress saves automatically";
  if (saveState === "saving" && !savedAt) savedLabel = "Saving…";
  else if (saveState === "offline" && !expired) savedLabel = "Offline — saved on this device";
  else if (savedAt) {
    const m = (now - savedAt) / 60000;
    savedLabel = m < 1 ? "Saved just now" : m < 60 ? `Saved ${Math.floor(m)} min ago` : "Saved at " + new Date(savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
  const isFlow = view === "wizard" || view === "review";

  return (
    <OnboardingContext.Provider value={ctx}>
      <div className="flex min-h-screen flex-col bg-page font-sans text-body">
        <TopBar
          config={config}
          savedLabel={savedLabel}
          saveState={saveState}
          onExit={
            isFlow
              ? () => {
                  void flush();
                  if (!savedAt) setSavedAt(Date.now());
                  setExitOpen(true);
                }
              : undefined
          }
        />

        {view === "intro" && <IntroView config={config} stats={stats} hasProgress={hasProgress} resumeLabel={resumeLabel} onStart={() => nav({ view: "wizard" })} />}

        {isFlow && (
          <>
            <MobileStepHeader label={view === "review" ? "Final review" : `Section ${step + 1} of ${N}`} done={done} total={N} onOpen={() => setStepsOpen(true)} />
            <div className="mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-[minmax(0,1fr)] items-start gap-[clamp(32px,4.5vw,72px)] px-[clamp(16px,4vw,40px)] nav:grid-cols-[248px_minmax(0,1fr)]">
              <StepNav config={config} stats={stats} step={step} view={view} onGo={(i) => nav({ view: "wizard", step: i })} onReview={() => nav({ view: "review" })} />
              <main className="w-full min-w-0 max-w-[760px] pb-[clamp(32px,6vw,72px)] pt-[clamp(28px,5vw,48px)]">
                {view === "wizard" ? (
                  <SectionView key={step} section={config.sections[step]} index={step} total={N} stats={stats[step]} onPrev={prev} onNext={next} />
                ) : (
                  <ReviewView
                    config={config}
                    answers={answers}
                    stats={stats}
                    agree={agree}
                    sending={sending}
                    error={sendError}
                    onToggleAgree={() => setAgree((a) => !a)}
                    onEdit={(i) => nav({ view: "wizard", step: i })}
                    onPrev={prev}
                    onSend={send}
                  />
                )}
              </main>
            </div>
            {view === "wizard" && <MobileActionBar nextLabel={step < N - 1 ? "Continue" : "Review & send"} onPrev={prev} onNext={next} />}
          </>
        )}

        {view === "submitted" && <SubmittedView config={config} submittedAt={submittedAt} />}

        {stepsOpen && (
          <StepSheet
            config={config}
            stats={stats}
            step={step}
            view={view}
            onGo={(i) => nav({ view: "wizard", step: i })}
            onReview={() => nav({ view: "review" })}
            onClose={() => setStepsOpen(false)}
          />
        )}
        {exitOpen && <SaveExitDialog resumeLabel={resumeLabel} onKeepGoing={() => setExitOpen(false)} onExit={() => nav({ view: "intro" })} />}
        {expired && <SessionEndedDialog />}
      </div>
    </OnboardingContext.Provider>
  );
}

function SessionEndedDialog() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/55 p-5">
      <div role="alertdialog" aria-modal="true" aria-labelledby="ended-title" className="onb-sheet flex w-full max-w-[460px] flex-col gap-3.5 rounded-[14px] bg-white p-[clamp(24px,4vw,32px)] shadow-[0_30px_60px_-20px_rgba(11,27,46,0.45)]">
        <h2 id="ended-title" className="m-0 text-[22px] font-bold text-navy">
          Your secure link needs a refresh.
        </h2>
        <p className="m-0 text-[16px] leading-[1.55] text-body text-pretty">
          For your security, this session has ended. Anything you just typed is kept on this device and will be restored when you’re back in.
        </p>
        <button
          type="button"
          autoFocus
          onClick={() => window.location.reload()}
          className="mt-1.5 min-h-[52px] cursor-pointer rounded-md border border-navy-deep bg-navy-deep text-[15px] font-bold text-white hover:border-blue-link hover:bg-blue-link"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
