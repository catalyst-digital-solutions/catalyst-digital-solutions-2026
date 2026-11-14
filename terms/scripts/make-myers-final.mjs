// Builds src/content/myers/agreement-v1.4-final.md (the signature-ready copy)
// from the untouched authoritative source src/content/myers/agreement-v1.4.md.
//
// Only the removals Mario authorized on Nov 13, 2026 are applied:
//   1. the internal "To be confirmed before signing" note in the summary and the
//      duplicate "Items for confirmation before signing" section (admin notes,
//      not contract provisions);
//   2. draft / not-executed status words in the title block and closing line.
// Every other character is copied unchanged. Each removal must match exactly
// once or the script fails, so a changed source can never be silently altered.
//   node scripts/make-myers-final.mjs && node scripts/gen-myers-source.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src/content/myers");
let md = readFileSync(path.join(dir, "agreement-v1.4.md"), "utf8");

const confirmItems = [
  "Business identities have been prefilled, and Kenneth Wayne Myers is designated as the proposed authorized signer. The following details require confirmation before the agreement is executed:",
  "",
  "- Confirm current California Secretary of State status for Myers Diesel Repair, Inc. (entity C2734165), the legal business address, and Kenneth Wayne Myers's authority as President to sign — *Myers*",
  "- Confirm that **myersdiesel@icloud.com** (Ken) and **abelz@myersdiesel.com** (Abel) are the addresses the Parties authorize for formal notices — *Myers*",
  "- Confirm that Myers elects or declines the optional **$199/month Managed Hosting & Care Plan** in Schedule D; configure Catalyst-managed Vercel hosting and initial off-platform backups before launch — *Both Parties*",
  "- Optional counsel review is strongly advised before execution, particularly the cancellation and hosting terms — Both Parties",
  "",
].join("\n");

export const REMOVALS = [
  { what: "Summary note: To be confirmed before signing", from: "To be confirmed before signing\n\n" + confirmItems, to: "" },
  { what: "Section: Items for confirmation before signing", from: "## Items for confirmation before signing\n\n" + confirmItems + "\n", to: "" },
  { what: "Title block status", from: "**VERSION 1.4 — NOVEMBER 13, 2026 — DRAFT**", to: "**VERSION 1.4 — NOVEMBER 13, 2026**" },
  { what: "Title block status", from: "Schedules A–D. Not executed.**", to: "Schedules A–D.**" },
  {
    what: "Closing line status",
    from: "Version 1.4 — November 13, 2026 · Draft for final business and legal approval before execution.",
    to: "Version 1.4 — November 13, 2026",
  },
];

for (const r of REMOVALS) {
  const n = md.split(r.from).length - 1;
  if (n !== 1) throw new Error(`Expected exactly one match for "${r.what}", found ${n}`);
  md = md.replace(r.from, r.to);
}
if (/draft/i.test(md)) throw new Error("final copy still contains 'draft'");
writeFileSync(path.join(dir, "agreement-v1.4-final.md"), md);
console.log("wrote agreement-v1.4-final.md");
