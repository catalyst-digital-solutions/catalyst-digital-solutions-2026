import { Fragment, type ReactNode } from "react";
import { paragraphSegments, tokenizeInline, type InlineToken } from "@/lib/agreementMarkdown";

const EMAIL = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

function linkEmails(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(EMAIL);
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <a key={`${keyBase}-${idx}`} href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      <Fragment key={`${keyBase}-${idx}`}>{part}</Fragment>
    ),
  );
}

function renderTokens(tokens: InlineToken[], keyBase: string): ReactNode[] {
  return tokens.map((token, idx) => {
    const key = `${keyBase}-${idx}`;
    if (token.kind === "text") return <Fragment key={key}>{linkEmails(token.value, key)}</Fragment>;
    if (token.kind === "strong") return <strong key={key}>{renderTokens(token.children, key)}</strong>;
    return <em key={key}>{renderTokens(token.children, key)}</em>;
  });
}

/** Renders one markdown inline string (bold, italic, escapes, emails). */
export function Inline({ text }: { text: string }) {
  return <>{renderTokens(tokenizeInline(text), "i")}</>;
}

/** Renders a paragraph's lines, honoring markdown hard breaks. */
export function InlineLines({ lines }: { lines: string[] }) {
  const runs = paragraphSegments(lines);
  return (
    <>
      {runs.map((run, idx) => (
        <Fragment key={idx}>
          {idx > 0 ? <br /> : null}
          <Inline text={run.join(" ")} />
        </Fragment>
      ))}
    </>
  );
}
