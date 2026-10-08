export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];

export interface UploadedFileRef {
  id: string;
  name: string;
  size: number;
  type: string;
  category?: string;
}

/** One field's answer. Mirrors the handoff answer model. */
export interface FieldAnswer {
  // known
  status?: "confirmed" | "modified" | null;
  value?: string | null;
  confirmedAt?: number | null;
  addition?: string | null;
  // conflict / choice
  pick?: string | null;
  other?: string;
  follow?: string;
  // triage / access (explicit null = cleared)
  items?: Record<string, string | null>;
  notes?: Record<string, string>;
  // multi
  picks?: string[];
  detail?: string;
  // hours
  days?: Partial<Record<Day, { open?: boolean; from?: string; to?: string }>>;
  // upload — owned by the server (files table); never written through autosave
  files?: UploadedFileRef[];
  /** last touched (ms) */
  at?: number;
}

export type Answers = Record<string, FieldAnswer>;

export type View = "intro" | "wizard" | "review" | "submitted";

export type ReviewStatus = "confirmed" | "updated" | "optional" | "needed";

export interface ClientState {
  instanceId: string;
  view: View;
  step: number;
  visited: Record<string, boolean>;
  answers: Answers;
  savedAt: number | null;
  submittedAt: number | null;
}
