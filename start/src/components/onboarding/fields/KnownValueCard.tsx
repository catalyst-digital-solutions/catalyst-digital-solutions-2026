"use client";

import { nowMs } from "@/lib/onboarding/client/util";
import { useState } from "react";
import type { FieldDef } from "@/config/onboarding/types";
import { knownOriginal, truncate } from "@/lib/onboarding/status";
import { useOnboarding } from "../context";
import { Check, Chevron, Pencil } from "../icons";

export function KnownValueCard({ f }: { f: FieldDef }) {
  const { answers, setAnswer } = useOnboarding();
  const a = answers[f.id] || {};
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);

  const orig = knownOriginal(f);
  const st = a.status || null;
  const append = f.editMode === "append";
  const replaced = st === "modified" && a.value != null && !append;
  const cur = replaced ? String(a.value).split("\n").filter(Boolean) : orig;
  const addition = append && st === "modified" ? a.addition || "" : "";
  const showPanel = !editing || append;
  const set = (p: Parameters<typeof setAnswer>[1]) => setAnswer(f.id, p);

  const panelBg = st === "confirmed" ? "#EAF3FA" : st === "modified" ? "#FFF8F2" : "#F5F8FB";
  const panelBd = st === "confirmed" ? "#C3DAF0" : st === "modified" ? "#F1D5C1" : "#E3E9EF";

  const startEdit = () => {
    setDraft(append ? addition : cur.join("\n"));
    setEditing(true);
  };
  const save = () => {
    setEditing(false);
    if (append) {
      const d = draft.trim();
      set(d ? { status: "modified", addition: d, value: null, confirmedAt: nowMs() } : { status: "confirmed", addition: null, value: null, confirmedAt: nowMs() });
      return;
    }
    const d = draft.split("\n").map((x) => x.trim()).filter(Boolean).join("\n");
    if (!d) return;
    set(d === orig.join("\n") ? { status: "confirmed", value: null, confirmedAt: nowMs() } : { status: "modified", value: d, confirmedAt: nowMs() });
  };

  return (
    <div className="flex flex-col gap-3.5">
      {f.intro && <p className="m-0 text-[16px] leading-[1.55] text-body text-pretty">{f.intro}</p>}
      {f.quote && (
        <figure className="m-0 flex flex-col gap-2">
          <blockquote className="m-0 text-[clamp(19px,2.1vw,22px)] font-semibold leading-[1.45] tracking-[-0.005em] text-navy-deep text-pretty">“{f.quote}”</blockquote>
          <figcaption className="font-mono text-[12px] uppercase tracking-[0.14em] text-secondary">{f.quoteCite}</figcaption>
        </figure>
      )}
      {showPanel && (
        <>
          <div className="flex flex-col gap-2.5 rounded-[10px] px-[18px] py-4 transition-[background,border-color] duration-200" style={{ background: panelBg, border: `1px solid ${panelBd}` }}>
            <div className="flex min-h-6 items-center justify-between gap-3">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-secondary">{f.panelLabel || "We currently have"}</span>
              {st === "confirmed" && (
                <span className="inline-flex flex-none items-center gap-1.5 rounded-full bg-[#D6E7F8] py-[3px] pl-2 pr-2.5 text-[13px] font-bold text-navy-deep">
                  <Check size={12} stroke={2.8} />
                  Confirmed
                </span>
              )}
              {st === "modified" && <span className="inline-flex flex-none items-center rounded-full bg-[#FBE3D3] px-2.5 py-[3px] text-[13px] font-bold text-[#7A3410]">{append ? "Context added" : "Updated"}</span>}
            </div>
            {f.prose ? (
              <div className="flex flex-col gap-2.5">
                {cur.map((line, i) => (
                  <p key={i} className="m-0 text-[16px] leading-[1.65] text-navy text-pretty">{line}</p>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-[3px]">
                {cur.map((line, i) => (
                  <span key={i} className="text-[18px] font-semibold leading-[1.45] text-navy [overflow-wrap:anywhere]">{line}</span>
                ))}
              </div>
            )}
            {!!addition && (
              <div className="flex flex-col gap-1 border-t border-[#F1D5C1] pt-2.5">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A3410]">Your addition</span>
                <p className="m-0 whitespace-pre-line text-[16px] leading-[1.6] text-navy text-pretty">{addition}</p>
              </div>
            )}
            {replaced && (
              <span className="text-[13px] leading-[1.5] text-caption">
                Previously: <span className="line-through">{truncate(orig.join(" "), 140)}</span>
              </span>
            )}
            {!replaced && f.source && <span className="text-[13px] leading-[1.5] text-caption">{f.source}</span>}
          </div>
          {f.details && (
            <div className="flex flex-col gap-1.5">
              <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="-ml-3 inline-flex min-h-11 cursor-pointer items-center gap-2 self-start rounded-md border-0 bg-transparent px-3 text-[14px] font-bold text-blue-link hover:bg-hover">
                {f.details.label}
                <Chevron open={open} />
              </button>
              {open && <p className="m-0 rounded-lg border border-[#E3E9EF] bg-panel px-3.5 py-3 text-[14px] leading-[1.55] text-body text-pretty">{f.details.body}</p>}
            </div>
          )}
          {f.question && (
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold leading-[1.5] text-navy text-pretty">{f.question}</span>
              {f.questionHelp && <span className="text-[14px] leading-[1.55] text-secondary text-pretty">{f.questionHelp}</span>}
            </div>
          )}
          {!editing && (
            <div className="flex flex-wrap gap-2.5">
              {!st ? (
                <>
                  <button
                    type="button"
                    data-action="confirm"
                    onClick={() => set({ status: "confirmed", value: null, addition: null, confirmedAt: nowMs() })}
                    className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-md border-[1.5px] border-navy-deep bg-white px-5 text-[15px] font-bold text-navy-deep transition-colors duration-150 hover:bg-navy-deep hover:text-white"
                  >
                    <Check size={14} />
                    {f.confirmLabel || "Looks Correct"}
                  </button>
                  <button type="button" data-action="edit" onClick={startEdit} className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-md border-[1.5px] border-transparent bg-transparent px-[18px] text-[15px] font-bold text-blue-link hover:bg-hover">
                    <Pencil />
                    {f.editLabel || "Edit"}
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={startEdit} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent px-3 text-[14px] font-bold text-blue-link hover:bg-hover">
                    <Pencil />
                    {append ? (addition ? "Edit your addition" : "Add context") : "Edit"}
                  </button>
                  {st === "modified" && (
                    <button type="button" onClick={() => set({ status: "confirmed", value: null, addition: null, confirmedAt: nowMs() })} className="min-h-11 cursor-pointer rounded-md border-0 bg-transparent px-3 text-[14px] font-semibold text-secondary hover:bg-hover">
                      {append ? "Remove addition" : "Use original"}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
      {editing && (
        <div className="flex flex-col gap-2.5">
          {append && <span className="text-[15px] font-semibold text-navy">Your addition</span>}
          <textarea
            aria-label={f.label}
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            rows={append ? 3 : f.prose ? 8 : Math.max(2, cur.length + 1)}
            placeholder={append ? f.appendPlaceholder || "Add anything you’d like us to know…" : ""}
            className="onb-input w-full resize-y px-4 py-3.5 leading-[1.6]"
            style={{ borderColor: "#1E6FE6", boxShadow: "0 0 0 3px rgba(30,111,230,0.15)" }}
          />
          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={save} className="min-h-12 cursor-pointer rounded-md border border-navy-deep bg-navy-deep px-5 text-[15px] font-bold text-white hover:border-blue-link hover:bg-blue-link">
              {append ? "Save" : "Save change"}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="min-h-12 cursor-pointer rounded-md border-0 bg-transparent px-[18px] text-[15px] font-semibold text-secondary hover:bg-hover">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
