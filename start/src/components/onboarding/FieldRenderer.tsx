"use client";

import type { FieldDef } from "@/config/onboarding/types";
import { AccessChecklist } from "./fields/AccessChecklist";
import { ChoiceField } from "./fields/ChoiceField";
import { ConflictCard } from "./fields/ConflictCard";
import { HoursEditor } from "./fields/HoursEditor";
import { KnownValueCard } from "./fields/KnownValueCard";
import { MultiSelectChips } from "./fields/MultiSelectChips";
import { NoteBlock, SectionHeading } from "./fields/NoteBlock";
import { TextAreaField, TextField } from "./fields/TextFields";
import { TriageList } from "./fields/TriageList";
import { UploadZone } from "./fields/UploadZone";

function Body({ f }: { f: FieldDef }) {
  switch (f.type) {
    case "known":
      return <KnownValueCard f={f} />;
    case "conflict":
      return <ConflictCard f={f} />;
    case "choice":
      return <ChoiceField f={f} />;
    case "text":
      return <TextField f={f} />;
    case "textarea":
      return <TextAreaField f={f} />;
    case "triage":
      return <TriageList f={f} />;
    case "multi":
      return <MultiSelectChips f={f} />;
    case "hours":
      return <HoursEditor f={f} />;
    case "upload":
      return <UploadZone f={f} />;
    case "access":
      return <AccessChecklist f={f} />;
    default:
      return null;
  }
}

/** switch(field.type) → field component, wrapped in the standard card. */
export function FieldRenderer({ f }: { f: FieldDef }) {
  if (f.type === "heading") return <SectionHeading f={f} />;
  if (f.type === "note") return <NoteBlock f={f} />;
  return (
    <section aria-label={f.label} className="flex flex-col gap-4 rounded-xl border border-line bg-white p-[clamp(20px,3vw,28px)] shadow-[0_1px_2px_rgba(11,27,46,0.04)]">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[17px] font-bold leading-[1.4] text-navy text-pretty">{f.label}</span>
          {f.optional && <span className="flex-none font-mono text-[11px] uppercase tracking-[0.14em] text-caption">Optional</span>}
        </div>
        {f.help && <p className="m-0 text-[15px] leading-[1.55] text-secondary text-pretty">{f.help}</p>}
      </div>
      <Body f={f} />
    </section>
  );
}
