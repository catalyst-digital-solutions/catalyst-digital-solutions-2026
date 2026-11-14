import Image from "next/image";
import type { ReactNode } from "react";
import {
  inlineText,
  slugify,
  type MdBlock,
  type MdSection,
} from "@/lib/agreementMarkdown";
import { Inline, InlineLines } from "@/components/myers/Inline";

type Props = {
  sections: MdSection[];
  /** Display title; the source H1 is shown with its version identifier. */
  title: string;
  versionLabel: string;
};

const pText = (block: MdBlock | undefined) =>
  block && block.type === "p" ? block.lines.join(" ").trim() : null;

function Table({ block, caption }: { block: Extract<MdBlock, { type: "table" }>; caption?: string }) {
  const numericCol = block.header.map((_, col) =>
    block.rows.every((row) => !row[col] || /^\$?[\d,]+$/.test(row[col].replace(/\*/g, ""))),
  );
  return (
    <div className="md-table-wrap" role="region" aria-label={caption ?? "Table"} tabIndex={0}>
      <table className={`md-table md-table-cols-${block.header.length}`}>
        <thead>
          <tr>
            {block.header.map((cell, idx) => (
              <th key={idx} scope="col" className={numericCol[idx] ? "num" : undefined}>
                <Inline text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, r) => {
            const isTotal = /^total/i.test(inlineText(row[0] ?? ""));
            return (
              <tr key={r} className={isTotal ? "total" : undefined}>
                {row.map((cell, c) => {
                  const content = <Inline text={cell} />;
                  return c === 0 ? (
                    <th key={c} scope="row" data-label={inlineText(block.header[c])}>
                      {content}
                    </th>
                  ) : (
                    <td
                      key={c}
                      data-label={inlineText(block.header[c])}
                      className={numericCol[c] ? "num" : undefined}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GenericBlock({
  block,
  sectionId,
  idx,
  tableCaption,
}: {
  block: MdBlock;
  sectionId: string;
  idx: number;
  tableCaption?: string;
}) {
  switch (block.type) {
    case "heading": {
      const id = `${sectionId}--${slugify(block.text)}`;
      return (
        <h3 id={id} className="md-h3">
          <Inline text={block.text} />
        </h3>
      );
    }
    case "hr":
      return <hr className="md-rule" />;
    case "p":
      return (
        <p>
          <InlineLines lines={block.lines} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol start={block.items[0]?.n ?? 1}>
          {block.items.map((item) => (
            <li key={item.n} value={item.n}>
              <Inline text={item.text} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return <Table block={block} caption={tableCaption ?? `Table ${idx + 1}`} />;
  }
}

function Blocks({ blocks, sectionId, caption }: { blocks: MdBlock[]; sectionId: string; caption?: string }) {
  const captions = blocks.map((_, idx) => {
    for (let k = idx; k >= 0; k--) {
      const b = blocks[k];
      if (b.type === "heading") return inlineText(b.text);
    }
    return caption;
  });
  return (
    <>
      {blocks.map((block, idx) => (
        <GenericBlock
          key={idx}
          block={block}
          sectionId={sectionId}
          idx={idx}
          tableCaption={captions[idx]}
        />
      ))}
    </>
  );
}

/* ---------- Section-specific presentations (wording untouched) ---------- */

function SummarySection({ section }: { section: MdSection }) {
  const out: ReactNode[] = [];
  const blocks = section.blocks;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "p" && block.lines.every((l) => /^\*\*[^*]+:\*\*/.test(l.trim()))) {
      out.push(
        <dl className="md-summary-list" key={i}>
          {block.lines.map((line) => {
            const m = /^\*\*([^*]+:)\*\*\s*(.*)$/.exec(line.trim())!;
            return (
              <div className="md-summary-row" key={m[1]}>
                <dt>{m[1]}</dt>
                <dd>
                  <Inline text={m[2]} />
                </dd>
              </div>
            );
          })}
        </dl>,
      );
      continue;
    }
    out.push(
      <GenericBlock key={i} block={block} sectionId={section.id} idx={i} tableCaption="Agreement summary by phase" />,
    );
  }
  return <div className="md-summary-card">{out}</div>;
}

function PartyCard({ blocks, sectionId }: { blocks: MdBlock[]; sectionId: string }) {
  const [kicker, name, ...rest] = blocks;
  return (
    <div className="md-party">
      <p className="md-kicker">{kicker && kicker.type === "p" ? <InlineLines lines={kicker.lines} /> : null}</p>
      <p className="md-party-name">{name && name.type === "p" ? <InlineLines lines={name.lines} /> : null}</p>
      {rest.map((block, idx) => {
        const text = pText(block);
        const m = text ? /^([^:]{2,60}):\s(.+)$/.exec(text) : null;
        if (m && !/^https?$/i.test(m[1])) {
          return (
            <p className="md-party-line" key={idx}>
              <span className="md-party-label">{m[1]}:</span> <Inline text={m[2]} />
            </p>
          );
        }
        return <GenericBlock key={idx} block={block} sectionId={sectionId} idx={idx} />;
      })}
    </div>
  );
}

function PartiesSection({ section }: { section: MdSection }) {
  const blocks = section.blocks;
  const start = blocks.findIndex((b) => pText(b)?.startsWith('Service Provider ("Catalyst")'));
  const client = blocks.findIndex((b) => pText(b)?.startsWith('Client ("Myers")'));
  const end = blocks.findIndex((b) => pText(b)?.startsWith("Catalyst and Myers are"));
  if (start < 0 || client < 0 || end < 0) return <Blocks blocks={blocks} sectionId={section.id} />;
  return (
    <>
      <Blocks blocks={blocks.slice(0, start)} sectionId={section.id} />
      <div className="md-parties">
        <PartyCard blocks={blocks.slice(start, client)} sectionId={section.id} />
        <PartyCard blocks={blocks.slice(client, end)} sectionId={section.id} />
      </div>
      <Blocks blocks={blocks.slice(end)} sectionId={section.id} />
    </>
  );
}

function PhaseSection({ section }: { section: MdSection }) {
  const blocks = section.blocks;
  const labels = ["Total Pages", "Investment", "Estimated Timeline"];
  const values = labels.map((_, k) => blocks[k * 2 + 1]);
  const ok =
    labels.every((label, k) => pText(blocks[k * 2]) === label) &&
    values.every((b): b is Extract<MdBlock, { type: "p" }> => b?.type === "p");
  if (!ok) return <Blocks blocks={blocks} sectionId={section.id} />;
  const valueBlocks = values as Extract<MdBlock, { type: "p" }>[];
  return (
    <>
      <dl className="md-stats">
        {labels.map((label, k) => (
          <div className="md-stat" key={label}>
            <dt>{label}</dt>
            <dd>
              <InlineLines lines={valueBlocks[k].lines} />
            </dd>
          </div>
        ))}
      </dl>
      <Blocks blocks={blocks.slice(6)} sectionId={section.id} />
    </>
  );
}

function ScheduleASection({ section }: { section: MdSection }) {
  const blocks = section.blocks;
  const firstCat = blocks.findIndex((b) => b.type === "heading" && /^Category /.test(b.text));
  const summaryIdx = blocks.findIndex((b) => b.type === "heading" && b.text === "Page Count Summary");
  if (firstCat < 0 || summaryIdx < 0) return <Blocks blocks={blocks} sectionId={section.id} />;
  const groups: MdBlock[][] = [];
  for (const block of blocks.slice(firstCat, summaryIdx)) {
    if (block.type === "heading") groups.push([block]);
    else groups[groups.length - 1].push(block);
  }
  return (
    <>
      <Blocks blocks={blocks.slice(0, firstCat)} sectionId={section.id} />
      <div className="md-inventory">
        {groups.map((group, g) => {
          const head = group[0] as Extract<MdBlock, { type: "heading" }>;
          const bonus = /Bonus/.test(head.text);
          return (
            <div className={`md-category${bonus ? " md-category-bonus" : ""}`} key={g}>
              <Blocks blocks={group} sectionId={section.id} />
            </div>
          );
        })}
      </div>
      <Blocks blocks={blocks.slice(summaryIdx)} sectionId={section.id} />
    </>
  );
}

function ScheduleDSection({ section }: { section: MdSection }) {
  const blocks = section.blocks;
  // Keep the election (choice heading, both options, default rule and the
  // initials/date line) together as one unbreakable print block.
  const choose = blocks.findIndex((b) => /^\*\*Choose one/.test(pText(b) ?? ""));
  const initials = blocks.findIndex((b) => (pText(b) ?? "").startsWith("Hosting election confirmed"));
  const render = (block: MdBlock, idx: number) => {
    const text = pText(block) ?? "";
    if (block.type === "p" && text.startsWith("☐")) {
      return (
        <div className="md-election-option" key={idx}>
          <span className="md-box" aria-hidden="true">
            ☐
          </span>
          <p>
            <Inline text={text.replace(/^☐\s*/, "")} />
          </p>
        </div>
      );
    }
    if (block.type === "p" && /— \$199 per month$/.test(text)) {
      return (
        <p className="md-price" key={idx}>
          <Inline text={text} />
        </p>
      );
    }
    if (block.type === "p" && text.startsWith("Hosting election confirmed")) {
      return (
        <p className="md-initials" key={idx}>
          <Inline text={text} />
        </p>
      );
    }
    return <GenericBlock key={idx} block={block} sectionId={section.id} idx={idx} />;
  };
  if (choose < 0 || initials < choose) {
    return <div className="md-election">{blocks.map(render)}</div>;
  }
  return (
    <div className="md-election">
      <div className="md-election-intro">{blocks.slice(0, choose).map((b, k) => render(b, k))}</div>
      <div className="md-election-choice">
        {blocks.slice(choose, initials + 1).map((b, k) => render(b, choose + k))}
      </div>
      {blocks.slice(initials + 1).map((b, k) => render(b, initials + 1 + k))}
    </div>
  );
}

const SIG_LABELS = new Set(["Authorized Representative", "Title", "Signature", "Date", "Email", "Legal Notices (to both)"]);

function SignatureCard({ blocks }: { blocks: MdBlock[] }) {
  const texts = blocks.map((b) => (b.type === "p" ? b : null)).filter(Boolean) as Extract<MdBlock, { type: "p" }>[];
  const header: Extract<MdBlock, { type: "p" }>[] = [];
  let i = 0;
  while (i < texts.length && !SIG_LABELS.has(texts[i].lines.join(" "))) header.push(texts[i++]);
  const fields: { label: string; value: Extract<MdBlock, { type: "p" }> | null }[] = [];
  while (i < texts.length) {
    const label = texts[i].lines.join(" ");
    if (label === "Signature" || label === "Date") {
      fields.push({ label, value: null });
      i++;
      continue;
    }
    fields.push({ label, value: texts[i + 1] ?? null });
    i += 2;
  }
  const [role, ...entity] = header;
  return (
    <div className="md-sig">
      {role ? (
        <p className="md-kicker">
          <InlineLines lines={role.lines} />
        </p>
      ) : null}
      {entity.map((p, k) => (
        <p className={k === 0 ? "md-party-name" : "md-sig-dba"} key={k}>
          <InlineLines lines={p.lines} />
        </p>
      ))}
      {fields.map((field, k) => (
        <div className={`md-sig-field${field.value ? "" : " md-sig-blank"}`} key={k}>
          <p className="md-sig-label">{field.label}</p>
          {field.value ? (
            <p className="md-sig-value">
              <InlineLines lines={field.value.lines} />
            </p>
          ) : (
            <p className="md-sig-line" />
          )}
        </div>
      ))}
    </div>
  );
}

function SignaturesSection({ section }: { section: MdSection }) {
  const blocks = section.blocks;
  const sp = blocks.findIndex((b) => pText(b) === "Service Provider");
  const cl = blocks.findIndex((b) => pText(b) === "Client");
  const end = blocks.findIndex((b) => pText(b) === "End of Agreement");
  if (sp < 0 || cl < 0 || end < 0) return <Blocks blocks={blocks} sectionId={section.id} />;
  const tail = blocks.slice(end);
  return (
    <>
      <Blocks blocks={blocks.slice(0, sp)} sectionId={section.id} />
      <div className="md-sigs">
        <SignatureCard blocks={blocks.slice(sp, cl)} />
        <SignatureCard blocks={blocks.slice(cl, end)} />
      </div>
      <footer className="md-end">
        {tail.map((block, idx) =>
          block.type === "p" ? (
            <p key={idx} className={idx === 0 ? "md-end-title" : "md-end-note"}>
              <InlineLines lines={block.lines} />
            </p>
          ) : (
            <GenericBlock key={idx} block={block} sectionId={section.id} idx={idx} />
          ),
        )}
      </footer>
    </>
  );
}

function SectionBody({ section }: { section: MdSection }) {
  switch (section.id) {
    case "agreement-summary":
      return <SummarySection section={section} />;
    case "section-1":
      return <PartiesSection section={section} />;
    case "section-5":
    case "section-6":
      return <PhaseSection section={section} />;
    case "schedule-a":
      return <ScheduleASection section={section} />;
    case "schedule-d":
      return <ScheduleDSection section={section} />;
    case "authorization-and-signatures":
      return <SignaturesSection section={section} />;
    default:
      return <Blocks blocks={section.blocks} sectionId={section.id} />;
  }
}

export default function AgreementDocument({ sections, title, versionLabel }: Props) {
  const [preamble, ...body] = sections;
  const pre = preamble.blocks.filter((b) => b.type === "p") as Extract<MdBlock, { type: "p" }>[];
  const [subtitle, versionLine, statusLine] = pre;

  return (
    <article className="md-doc" id="agreement" aria-labelledby="agreement-title">
      <div className="md-doc-head">
        <Image
          className="md-logo-myers"
          src="/myers/myers-diesel-logo.jpg"
          alt="Myers Diesel Repair"
          width={880}
          height={190}
          priority
        />
        <div className="md-prepared">
          <span>Prepared by</span>
          <Image
            className="md-logo-catalyst"
            src="/myers/catalyst-lockup.png"
            alt="Catalyst Digital Solutions"
            width={417}
            height={146}
            priority
          />
        </div>
      </div>

      <div className="md-pills">
        {versionLine ? (
          <span className="md-pill md-pill-solid">
            <InlineLines lines={versionLine.lines} />
          </span>
        ) : null}
      </div>
      <h1 id="agreement-title" className="md-h1">
        {title} <span className="md-h1-version">— {versionLabel}</span>
      </h1>
      {subtitle ? (
        <p className="md-subtitle">
          <InlineLines lines={subtitle.lines} />
        </p>
      ) : null}
      {statusLine ? (
        <p className="md-status">
          <InlineLines lines={statusLine.lines} />
        </p>
      ) : null}

      {body.map((section) => (
        <section
          key={section.id}
          className={`md-section md-section-${section.id}`}
          aria-labelledby={section.id}
        >
          <h2 id={section.id} className="md-h2">
            <Inline text={section.title ?? ""} />
          </h2>
          <SectionBody section={section} />
        </section>
      ))}
    </article>
  );
}
