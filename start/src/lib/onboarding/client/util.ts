"use client";

/** Event-time helpers (kept out of component bodies for the React purity lint). */
export const nowMs = () => Date.now();
export const randomKey = () => Math.random().toString(36).slice(2, 10);
export const jitter = (min: number, spread: number) => min + Math.random() * spread;
