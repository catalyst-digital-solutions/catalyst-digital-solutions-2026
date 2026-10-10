"use client";

import { useState } from "react";
import type { PublicOnboardingConfig } from "@/config/onboarding/types";
import { Lock } from "./icons";
import { TopBar } from "./TopBar";

const COPY = {
  expired: {
    title: "This link has expired.",
    body: "For your security, onboarding links expire after a while. Anything you already saved is still here — request a fresh link and we’ll email it to you.",
  },
  invalid: {
    title: "This link isn’t working.",
    body: "Please use the most recent link from your email. If you can’t find it, request a new one below.",
  },
  none: {
    title: "Open your private link to continue.",
    body: "This onboarding is private. Use the link from your email, or request a new one below.",
  },
} as const;

export type GateReason = keyof typeof COPY;

export function AccessGate({ slug, config, reason }: { slug: string; config: PublicOnboardingConfig; reason: GateReason }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");
  const c = COPY[reason];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setMsg("");
    try {
      const res = await fetch(`/api/onboarding/${slug}/request-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (res.ok) {
        setState("sent");
        setMsg(data.message || "If that email matches this onboarding, a new private link is on its way.");
      } else if (res.status === 429) {
        setState("error");
        setMsg("Too many requests. Please try again a little later.");
      } else {
        setState("error");
        setMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMsg("We couldn’t reach the server. Please check your connection and try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-page font-sans text-body">
      <TopBar config={config} />
      <main className="flex w-full flex-1 justify-center px-[clamp(16px,4vw,40px)] py-[clamp(48px,9vw,112px)]">
        <div className="flex w-full max-w-[560px] flex-col gap-5">
          <span className="flex size-12 items-center justify-center rounded-full bg-panel-confirmed text-blue-link">
            <Lock w={18} h={20} stroke={1.3} />
          </span>
          <h1 className="m-0 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy text-balance onb-wide">{c.title}</h1>
          <p className="m-0 text-[clamp(17px,1.8vw,19px)] leading-[1.55] text-body text-pretty">{c.body}</p>

          {state === "sent" ? (
            <p role="status" className="m-0 rounded-[10px] border border-[#CFE0F2] bg-panel-confirmed px-[18px] py-4 text-[16px] font-semibold leading-[1.5] text-navy-deep">
              {msg}
            </p>
          ) : (
            <form onSubmit={submit} className="mt-1 flex flex-col gap-3 rounded-xl border border-line bg-white p-[clamp(20px,3vw,28px)] shadow-[0_1px_2px_rgba(11,27,46,0.04)]">
              <label htmlFor="gate-email" className="text-[17px] font-bold text-navy">
                Email a new link
              </label>
              <p className="m-0 text-[15px] leading-[1.55] text-secondary">Enter the email address this onboarding was sent to.</p>
              <input
                id="gate-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="onb-input min-h-12 w-full px-3.5"
              />
              {state === "error" && (
                <p role="alert" className="m-0 text-[14px] text-[#9A4615]">
                  {msg}
                </p>
              )}
              <button
                type="submit"
                disabled={state === "sending"}
                className="mt-1 inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-md border border-navy-deep bg-navy-deep px-6 text-[16px] font-bold text-white hover:border-blue-link hover:bg-blue-link disabled:cursor-wait disabled:opacity-70"
              >
                {state === "sending" ? "Sending…" : "Send me a new link"}
              </button>
            </form>
          )}
          <a href={`mailto:${config.support.email}`} className="inline-flex min-h-11 items-center text-[14px] font-semibold underline-offset-[3px]">
            {config.support.label}
          </a>
        </div>
      </main>
    </div>
  );
}

export function Unavailable({ config }: { config: PublicOnboardingConfig }) {
  return (
    <div className="flex min-h-screen flex-col bg-page font-sans text-body">
      <TopBar config={config} />
      <main className="flex w-full flex-1 justify-center px-[clamp(16px,4vw,40px)] py-[clamp(48px,9vw,112px)]">
        <div className="flex w-full max-w-[560px] flex-col gap-5">
          <h1 className="m-0 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy onb-wide">We’ll be right back.</h1>
          <p className="m-0 text-[clamp(17px,1.8vw,19px)] leading-[1.55] text-body">Onboarding is temporarily unavailable. Nothing you’ve saved is lost — please try again shortly.</p>
          <a href={`mailto:${config.support.email}`} className="inline-flex min-h-11 items-center text-[14px] font-semibold underline-offset-[3px]">
            {config.support.label}
          </a>
        </div>
      </main>
    </div>
  );
}
