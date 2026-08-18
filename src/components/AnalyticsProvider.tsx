"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

/**
 * PostHog analytics — no-op until NEXT_PUBLIC_POSTHOG_KEY is set
 * (Vercel env + local .env.local). Session replay, autocapture (CTA clicks),
 * and UTM attribution are handled by PostHog itself.
 *
 * Captures window.location (not the rewritten Next pathname) so the
 * getbranded subdomain is recorded as getbranded.catalyst-digital-solutions.com
 * rather than /trades on the apex.
 *
 * Also persists first-touch UTM params in localStorage so outbound
 * Cal.com / Stripe links can be decorated with them.
 */

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export const UTM_STORAGE_KEY = "cds_first_touch_utms";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function capturePageview() {
  const href = window.location.href;
  const host = window.location.hostname;
  posthog.capture("$pageview", {
    $current_url: href,
    $host: host,
  });
  if (host.startsWith("getbranded.")) {
    posthog.capture("getbranded_pageview", {
      $current_url: href,
      path: window.location.pathname,
    });
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    if (!posthog.__loaded) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
        persistence: "localStorage+cookie",
        loaded: capturePageview,
      });
      return;
    }

    capturePageview();
  }, [pathname, searchParams]);

  // First-touch UTM persistence (independent of PostHog, used for Cal.com / Stripe)
  useEffect(() => {
    try {
      if (localStorage.getItem(UTM_STORAGE_KEY)) return;
      const captured: Record<string, string> = {};
      for (const p of UTM_PARAMS) {
        const v = searchParams.get(p);
        if (v) captured[p] = v;
      }
      if (Object.keys(captured).length > 0) {
        localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      }
    } catch {
      /* storage unavailable (private mode) — attribution still works via PostHog */
    }
  }, [searchParams]);

  return null;
}

/** Append stored first-touch UTMs to an external URL (e.g. Cal.com). */
export function decorateUrlWithUtms(url: string): string {
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return url;
    const utms: Record<string, string> = JSON.parse(raw);
    const u = new URL(url);
    for (const [k, v] of Object.entries(utms)) u.searchParams.set(k, v);
    return u.toString();
  } catch {
    return url;
  }
}
