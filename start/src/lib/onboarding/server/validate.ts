import "server-only";
import type { FieldDef } from "@/config/onboarding/types";
import { ACCESS_OPTIONS, TRIAGE_OPTIONS, knownOriginal, optionLabel } from "../status";
import { DAYS, type FieldAnswer } from "../types";

/** Server-side validation + sanitization of one field answer patch. */

export class ValidationError extends Error {}

// Strip control chars (keep \n and \t), normalise line endings, cap length.
export function cleanText(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .normalize("NFC")
    .slice(0, max);
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

function clampTime(v: unknown) {
  return typeof v === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? v : "";
}

export function validateAnswer(f: FieldDef, raw: unknown): FieldAnswer {
  if (!isObj(raw)) throw new ValidationError("answer must be an object");
  const out: FieldAnswer = {};
  const at = num(raw.at);
  out.at = at && at <= Date.now() + 60_000 ? at : Date.now();

  switch (f.type) {
    case "known": {
      const st = raw.status;
      if (st !== undefined && st !== null && st !== "confirmed" && st !== "modified") throw new ValidationError("bad status");
      out.status = (st as FieldAnswer["status"]) ?? null;
      out.value = raw.value == null ? null : cleanText(raw.value, 6000).split("\n").map((x) => x.trim()).filter(Boolean).join("\n") || null;
      out.addition = raw.addition == null ? null : cleanText(raw.addition, 6000).trim() || null;
      out.confirmedAt = num(raw.confirmedAt) ?? null;
      if (f.editMode === "append") {
        out.value = null;
        if (out.status === "modified" && !out.addition) out.status = "confirmed";
      } else {
        out.addition = null;
        // A modified value equal to the original collapses back to confirmed.
        if (out.status === "modified" && (!out.value || out.value === knownOriginal(f).join("\n"))) {
          out.status = "confirmed";
          out.value = null;
        }
      }
      if (!out.status) out.confirmedAt = null;
      return out;
    }
    case "conflict": {
      const allowed = [...(f.options || []).map(optionLabel), "__other"];
      if (raw.pick != null && !allowed.includes(String(raw.pick))) throw new ValidationError("bad pick");
      out.pick = (raw.pick as string) ?? null;
      out.other = cleanText(raw.other, 500);
      return out;
    }
    case "choice": {
      const allowed = (f.options || []).map(optionLabel);
      if (raw.pick != null && !allowed.includes(String(raw.pick))) throw new ValidationError("bad pick");
      out.pick = (raw.pick as string) ?? null;
      out.follow = cleanText(raw.follow, 3000);
      return out;
    }
    case "text":
      out.value = cleanText(raw.value, 2000);
      return out;
    case "textarea":
      out.value = cleanText(raw.value, 10000);
      return out;
    case "triage": {
      const opts = f.options?.map(optionLabel) || TRIAGE_OPTIONS;
      const items = f.items || [];
      if (raw.items !== undefined) {
        if (!isObj(raw.items)) throw new ValidationError("bad items");
        out.items = {};
        for (const [k, v] of Object.entries(raw.items)) {
          if (!items.includes(k)) throw new ValidationError("unknown item");
          if (v !== null && !opts.includes(String(v))) throw new ValidationError("bad option");
          out.items[k] = v as string | null;
        }
      }
      if (raw.notes !== undefined) {
        if (!isObj(raw.notes)) throw new ValidationError("bad notes");
        out.notes = {};
        for (const [k, v] of Object.entries(raw.notes)) {
          if (!items.includes(k)) throw new ValidationError("unknown item");
          out.notes[k] = cleanText(v, 6000);
        }
      }
      if (raw.other !== undefined) out.other = cleanText(raw.other, 6000);
      return out;
    }
    case "multi": {
      const opts = (f.options || []).map(optionLabel);
      if (raw.picks !== undefined) {
        if (!Array.isArray(raw.picks)) throw new ValidationError("bad picks");
        out.picks = Array.from(new Set(raw.picks.map(String))).filter((p) => opts.includes(p));
      }
      out.detail = cleanText(raw.detail, 2000);
      return out;
    }
    case "hours": {
      if (raw.days !== undefined) {
        if (!isObj(raw.days)) throw new ValidationError("bad days");
        out.days = {};
        for (const d of DAYS) {
          const v = raw.days[d];
          if (!isObj(v)) continue;
          out.days[d] = {
            open: typeof v.open === "boolean" ? v.open : undefined,
            from: clampTime(v.from),
            to: clampTime(v.to),
          };
        }
      }
      return out;
    }
    case "access": {
      const ids = (f.accessItems || []).map((i) => i.id);
      if (raw.items !== undefined) {
        if (!isObj(raw.items)) throw new ValidationError("bad items");
        out.items = {};
        for (const [k, v] of Object.entries(raw.items)) {
          if (!ids.includes(k)) throw new ValidationError("unknown access item");
          if (v !== null && !(ACCESS_OPTIONS as readonly string[]).includes(String(v))) throw new ValidationError("bad access state");
          out.items[k] = v as string | null;
        }
      }
      return out;
    }
    default:
      // upload / heading / note: nothing client-writable through autosave
      return out;
  }
}
