import type { FieldDef } from "@/config/onboarding/types";
import { Info, Lock } from "../icons";

export function NoteBlock({ f }: { f: FieldDef }) {
  const tone = f.tone === "conflict" ? ["#FFF6EC", "#F3D9BF", "#5A3311"] : ["#EAF3FA", "#CFE0EE", "#0F2E57"];
  return (
    <div className="grid grid-cols-[22px_1fr] items-start gap-3 rounded-[10px] px-[18px] py-4 text-[16px] font-semibold leading-[1.5]" style={{ background: tone[0], border: `1px solid ${tone[1]}`, color: tone[2] }}>
      {f.tone === "secure" ? <Lock w={18} h={20} stroke={1.3} className="mt-px" /> : <Info />}
      <div className="flex flex-col gap-1">
        <span>{f.label}</span>
        {f.body && <span className="text-[15px] font-normal leading-[1.55]">{f.body}</span>}
      </div>
    </div>
  );
}

export function SectionHeading({ f }: { f: FieldDef }) {
  return <h2 className="m-0 mt-5 border-t border-line pt-7 text-[22px] font-bold tracking-[-0.01em] text-navy">{f.label}</h2>;
}
