/**
 * Minimal, dependency-free parser for the agreement markdown subset used by
 * the client agreement sources (headings, paragraphs with hard breaks,
 * bullet and numbered lists, pipe tables, horizontal rules, **bold**,
 * *italic*, and backslash escapes). It never rewrites wording: every text
 * run in the output comes directly from the source file.
 */

export type MdBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "hr" }
  | { type: "p"; lines: string[] }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: { n: number; text: string }[] }
  | { type: "table"; header: string[]; rows: string[][] };

export type MdSection = {
  /** Heading text of the level-2 heading, or null for the preamble. */
  title: string | null;
  id: string;
  blocks: MdBlock[];
};

const UL = /^- (.*)$/;
const OL = /^(\d+)\. (.*)$/;

function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

export function parseBlocks(markdown: string): MdBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MdBlock[] = [];
  let i = 0;

  const nextNonBlank = (from: number) => {
    let j = from;
    while (j < lines.length && lines[j].trim() === "") j++;
    return j;
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }

    const heading = /^(#{1,3}) (.*)$/.exec(line);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2].trim(),
      });
      i++;
      continue;
    }

    if (line.trim() === "---") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [headerLine, , ...rowLines] = tableLines;
      blocks.push({
        type: "table",
        header: splitRow(headerLine),
        rows: rowLines.map(splitRow),
      });
      continue;
    }

    if (UL.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const m = UL.exec(lines[i]);
        if (m) {
          items.push(m[1]);
          i++;
          continue;
        }
        if (lines[i].trim() === "") {
          const j = nextNonBlank(i);
          if (j < lines.length && UL.test(lines[j])) {
            i = j;
            continue;
          }
        }
        break;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (OL.test(line)) {
      const items: { n: number; text: string }[] = [];
      while (i < lines.length) {
        const m = OL.exec(lines[i]);
        if (m) {
          items.push({ n: Number(m[1]), text: m[2] });
          i++;
          continue;
        }
        if (lines[i].trim() === "") {
          const j = nextNonBlank(i);
          if (j < lines.length && OL.test(lines[j])) {
            i = j;
            continue;
          }
        }
        break;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3}) /.test(lines[i]) &&
      !lines[i].trim().startsWith("|") &&
      lines[i].trim() !== "---" &&
      !(para.length > 0 && (UL.test(lines[i]) || OL.test(lines[i])))
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", lines: para });
  }

  return blocks;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Stable anchor id for a level-2 heading. */
export function sectionId(title: string): string {
  const numbered = /^(\d+)\.\s/.exec(title);
  if (numbered) return `section-${numbered[1]}`;
  const schedule = /^Schedule ([A-Z])\b/.exec(title);
  if (schedule) return `schedule-${schedule[1].toLowerCase()}`;
  return slugify(title);
}

export function splitSections(blocks: MdBlock[]): MdSection[] {
  const sections: MdSection[] = [{ title: null, id: "preamble", blocks: [] }];
  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      sections.push({ title: block.text, id: sectionId(block.text), blocks: [] });
      continue;
    }
    sections[sections.length - 1].blocks.push(block);
  }
  return sections;
}

export type InlineToken =
  | { kind: "text"; value: string }
  | { kind: "strong"; children: InlineToken[] }
  | { kind: "em"; children: InlineToken[] };

/** Tokenizes **bold**, *italic* and backslash escapes. */
export function tokenizeInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let buf = "";
  let i = 0;
  const flush = () => {
    if (buf) tokens.push({ kind: "text", value: buf });
    buf = "";
  };
  while (i < input.length) {
    const ch = input[i];
    if (ch === "\\" && i + 1 < input.length && /[\\`*_{}[\]()#+\-.!|~]/.test(input[i + 1])) {
      buf += input[i + 1];
      i += 2;
      continue;
    }
    if (input.startsWith("**", i)) {
      const end = input.indexOf("**", i + 2);
      if (end > i + 2) {
        flush();
        tokens.push({ kind: "strong", children: tokenizeInline(input.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }
    if (ch === "*" && input[i + 1] !== " ") {
      const end = input.indexOf("*", i + 1);
      if (end > i + 1 && input[end - 1] !== " ") {
        flush();
        tokens.push({ kind: "em", children: tokenizeInline(input.slice(i + 1, end)) });
        i = end + 1;
        continue;
      }
    }
    buf += ch;
    i++;
  }
  flush();
  return tokens;
}

/** Plain text of an inline string (markdown markers removed). */
export function inlineText(input: string): string {
  const walk = (tokens: InlineToken[]): string =>
    tokens
      .map((t) => (t.kind === "text" ? t.value : walk(t.children)))
      .join("");
  return walk(tokenizeInline(input));
}

/** A paragraph's lines joined with hard breaks ("  " line endings) preserved. */
export function paragraphSegments(lines: string[]): string[][] {
  // Each inner array is a run of soft-wrapped lines; runs are separated by hard breaks.
  const runs: string[][] = [[]];
  lines.forEach((line, idx) => {
    const hard = / {2,}$/.test(line);
    runs[runs.length - 1].push(line.replace(/ +$/, ""));
    if (hard && idx < lines.length - 1) runs.push([]);
  });
  return runs;
}
