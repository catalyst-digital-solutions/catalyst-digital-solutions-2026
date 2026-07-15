"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

/* CDS Homepage v3 — full recreation of "CDS Homepage v3.dc.html".
   Copy is locked; transcribed verbatim. Shared Nav/Footer come from the root
   layout, so this renders sections §1–§10 (Hero → Why Now). Keyframes and
   helper classes live in globals.css. */

const WORDS = ["REVENUE", "JOBS", "PROFIT"];

const BIG_PAINS: [string, string][] = [
  ["Stretched thin across too many jobs", "When you’re the name everyone knows, you can charge more and take only the jobs worth taking. More profit per job, so you’re not spread thin just to stay busy."],
  ["Can’t find good subs or managers", "Good people want to work for the company everyone respects. A strong name pulls better subs and managers toward you, and makes the good ones you already have want to stay."],
  ["Too busy fighting fires to actually grow", "We run the marketing, the leads, and the follow-up, so you get your week back. And more revenue means you can finally hire the help that puts the fires out for you."],
  ["Everything runs through you. Nothing moves without you", "That’s a systems problem, not a you problem or an employee problem. A trusted brand brings in clients who trust your team, not just you. And clear playbooks for every role mean new people get up to speed without you training each one by hand. The business runs. You step back."],
  ["Your best people leave and take clients with them", "When clients trust the company name, not one person, they stay, even when someone walks. Build it the Catalyst way and your brand becomes a moat: anyone who leaves to compete starts from zero against a name that already owns the market."],
  ["Money’s coming in, but cash is always tight", "Steadier, higher-ticket jobs mean steadier cash. When the pipeline stays full and you’re not bidding low just to make payroll, the scramble stops."],
];

const SMALL_PAINS: [string, string][] = [
  ["Bidding low just to win, barely turning profit", "When your online presence makes you look like the expert, you stop competing on price. Clients pick you because they trust you, not because you’re the cheapest."],
  ["New work comes from referrals only", "Referrals are great, but you can’t schedule them. We bring in new customers every month through search, AI answers, social media content, and ads, so your next job never depends on someone remembering your name."],
  ["No time to answer calls and emails", "Our AI answers every call and message the second it lands, day or night, and books prospects to your calendar. You stop losing jobs to voicemail (and competitors who adopted AI) without adding a thing to your plate."],
  ["Losing jobs to bigger companies (and worse ones)", "A sharp website and real reviews make you look every bit as big and buttoned-up as the guys you’re bidding against. When you look the part, the size gap disappears."],
  ["Feeling invisible online", "We get you showing up first when someone searches for your trade in your area, so the next customer finds you before they ever find your competitor."],
  ["Every month, wondering where the next job comes from", "Steady leads every month means you always know where the next job is coming from. The monthly guessing game ends."],
];

type Obj = { q: string; a: string; links?: { label: string; url: string }[] };
const OBJECTIONS: Obj[] = [
  { q: "“I get all my work by referral.”", a: "Referrals are a gift, but they’re not scalable. You can’t schedule referrals. You can't turn them up when you're slow. And here's what nobody ever tells you: the clients happiest with your work are the least likely to bring you up. The ones who talk most are the unhappy ones. It's human nature. What's more, your next job shouldn’t ride on whether a former customer happens to come in contact with an interested party and then remembers to mention your name. Word of mouth is a ceiling...not a growth engine." },
  { q: "“I’m too busy for this.”", a: "That’s exactly the point. We do it, so you don’t have to. If you had to learn to do your own marketing (properly), it would become your full-time job." },
  { q: "“That’s a lot to spend every month.”", a: "That's a common sentiment...until you look at what you’re already losing. Jobs going to voicemail. Bids lost to whoever answered first. You're already leaking 100x. You can pay 2x to stop it. You can easily make back your investment with Catalyst on a single job." },
  { q: "“I can’t compete with the big companies spending on AI.”", a: "The same tools being used by billion-dollar companies are available to you now. And they're becoming more capable and affordable every day. We can build iOS apps, company business intelligence platforms, and lead systems for 5% of what they used to cost. That’s the whole point of hiring us instead of building it yourself: big-company setup, without the big-company price." },
  { q: "“Isn’t AI just hype? It’ll blow over.”", a: "Please be careful, here. Tools that save time and win jobs are already being adopted by construction firms worldwide. Turner Construction, the largest US construction company by volume, signed an AI deal that has already saved them over $50,000,000 so far. Byte TI estimates 91% of construction companies will invest in AI in 2026. This isn’t Silicon Valley inventing a new social media app. This is the next revolution in human technology — that's not hyperbole — and it’s making new and established businesses huge money.", links: [
    { label: "Turner’s $50M savings", url: "https://www.constructiondive.com/news/turner-partnership-openai-startups-tech/804765/" },
    { label: "91% investing in AI", url: "https://en.itec.cat/infoitec/contech-hub-en/nine-out-of-ten-construction-companies-plan-to-increase-their-investment-in-ai-by-2026/" },
  ] },
  { q: "“AI’s fine for tech companies, but not construction.”", a: "It’s not just tech companies. Gusto (payroll) and Clio (legal software) are plain, decades-old businesses that added AI and took off — Clio went from $200 million to $500 million. And in your own world, Turner and Bechtel run AI on real jobsites. AI is an intelligence, not an app. You can apply it to anything. If it works for payroll and for the biggest builders in the country, it'll work for you." },
  { q: "“My customers want to talk to a real person.”", a: "They do — and you’re still that person. The AI just makes sure the call gets answered instead of rolling to voicemail while you’re on a roof. A customer who gets a real answer at 9pm and a call booked for the next morning is more likely not to give up and call someone else. We make sure they're taken care of, and you're notified." },
  { q: "“I’m not a tech guy.”", a: "Good. You don’t need to be. You never touch any of it. We build it, run it, and manage it. You keep doing what you’re good at, and the jobs show up. If we need your input, it’s a two-minute phone call, not a headache." },
  { q: "“I already have a website.”", a: "When’s the last time it brought you a job? Is it talking to customers after-hours? Is it scheduling phone calls? Is it entering interested customers' emails into your pipeline? Most contractor sites just sit there looking pretty, acting as brochures...not salesmen. We build websites that do real work. Websites that get found, answer fast, and turn lookers into jobs. No WordPress templates here. Our websites are employees that never sleep, not photo albums." },
  { q: "“How do I know this’ll work for me?”", a: "You’ll see real movement inside the first 90 days — actual leads and calls, not vague promises. We start you small, prove our worth, then build from there. If it’s not making you money, that’s on us to fix. You watch the real-world numbers you care about: streamlined processes, more phone calls, more high-ticket jobs booked, increased revenue." },
  { q: "“Is this a cookie-cutter package?”", a: "No. Everyone starts on the same foundation, yes: a professional website, search presence, systems in place, and more. Your results depend on it. What we build on top is shaped around your problems, your market, your goals." },
  { q: "“I’ve been burned by an agency before.”", a: "So have a lot of our clients. That’s why there are no long-term contracts. We start with a small commitment, then go month-to-month." },
];

type Demo = { href: string; domain: string; img: string; name: string; blurb: string; badgeBg: string; badgeColor: string };
const DEMOS: Demo[] = [
  { href: "https://construction1.catalyst-demos.com", domain: "construction1.catalyst-demos.com", img: "/assets/demo-full-apex.jpeg", name: "Apex Construction", blurb: "Design-build for commercial work. Bold, structured, sunset-warm.", badgeBg: "#FFAE3A", badgeColor: "#000" },
  { href: "https://construction2.catalyst-demos.com", domain: "construction2.catalyst-demos.com", img: "/assets/demo-full-holloway.jpeg", name: "Holloway", blurb: "Employee-owned Colorado builder. Red, human, people-first.", badgeBg: "#8F1A25", badgeColor: "#fff" },
  { href: "https://construction3.catalyst-demos.com", domain: "construction3.catalyst-demos.com", img: "/assets/demo-full-monolith.jpeg", name: "Monolith", blurb: "Earthwork and heavy civil. Blunt type, dirt-and-orange.", badgeBg: "#FD5D09", badgeColor: "#000" },
  { href: "https://construction4.catalyst-demos.com", domain: "construction4.catalyst-demos.com", img: "/assets/demo-full-voltaic.jpeg", name: "Voltaic", blurb: "Critical power & HVAC. Dark, technical, live telemetry.", badgeBg: "#3EC7FF", badgeColor: "#000" },
  { href: "https://construction5.catalyst-demos.com", domain: "construction5.catalyst-demos.com", img: "/assets/demo-full-meridian.jpeg", name: "Meridian", blurb: "Quiet luxury design-build. Editorial, calm, warm-toned.", badgeBg: "#C49A3F", badgeColor: "#fff" },
];

const mono = (color: string, size = 13, ls = 3): CSSProperties => ({
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: `${size}px`,
  fontWeight: 500,
  letterSpacing: `${ls}px`,
  textTransform: "uppercase",
  color,
});
const primaryCta: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "16px 30px", borderRadius: "11px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", textDecoration: "none" };

function Iceberg({ label, color = "#8000ff", children }: { label: string; color?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 600, color, padding: 0, marginTop: "24px" }}>
        <span style={{ fontSize: "16px", lineHeight: 1 }}>&oplus;</span> {label}
      </button>
      {open && (
        <div style={{ marginTop: "14px", maxWidth: "520px", borderLeft: "2px solid #8000ff", padding: "6px 0 6px 20px", animation: "panelIn .42s ease" }}>
          <p style={{ fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.65, margin: 0, textWrap: "pretty" }}>{children}</p>
        </div>
      )}
    </>
  );
}

function SolvesRow({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px", marginTop: "20px", ...mono("#00d4ff", 11, 1.5) }}>
      <span style={{ color: "#00d4ff" }}>Solves &rarr;</span>
      {items.map((it) => (
        <span key={it} style={{ color: "#9aa3b0", border: "1px solid rgba(0,212,255,.28)", borderRadius: "100px", padding: "4px 11px" }}>{it}</span>
      ))}
    </div>
  );
}

/* Pain accordion (Mirror). accent = solution label color. */
function PainList({ pains, accent }: { pains: [string, string][]; accent: string }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "12px" }}>
      {pains.map(([pain, fix], i) => {
        const isOpen = !!open[i];
        return (
          <div key={pain} style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <button onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} aria-expanded={isOpen} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "14px", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "16px 2px", fontFamily: "var(--font-inter), sans-serif" }}>
              <span style={{ fontSize: "clamp(15.5px,1.2vw,17.5px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.45 }}>{pain}</span>
              <span style={{ flex: "none", fontSize: "19px", lineHeight: 1.3, fontWeight: 600, color: isOpen ? "#b56bff" : "#8000ff", transition: "color .25s ease, transform .3s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>&oplus;</span>
            </button>
            {isOpen && (
              <div style={{ borderLeft: "2px solid #8000ff", margin: "0 2px 18px", padding: "4px 4px 4px 18px", animation: "panelIn .42s ease" }}>
                <div style={{ ...mono(accent, 11, 2.5), marginBottom: "8px" }}>The solution</div>
                <p style={{ fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.65, margin: 0, textWrap: "pretty" }}>{fix}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Skyline() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "1280px", marginTop: "clamp(28px,4vw,52px)" }}>
      <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: "900px", height: "420px", maxWidth: "120%", background: "radial-gradient(ellipse at 50% 100%,rgba(128,0,255,.32),transparent 65%)", filter: "blur(24px)", pointerEvents: "none" }} />
      <svg viewBox="0 0 1280 560" style={{ position: "relative", display: "block", width: "100%", height: "auto" }} fill="none" aria-label="A skyline assembling itself: wireframe, then framing, then cladding">
        <defs>
          <filter id="hg" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <linearGradient id="cladG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(128,0,255,.16)" /><stop offset="1" stopColor="rgba(128,0,255,.03)" /></linearGradient>
          <linearGradient id="cladC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(0,212,255,.13)" /><stop offset="1" stopColor="rgba(0,212,255,.02)" /></linearGradient>
        </defs>
        <line x1="40" y1="548" x2="1240" y2="548" stroke="#00d4ff" strokeOpacity=".2" strokeWidth="1.5" style={{ animation: "bDraw 1.2s ease both" }} />
        <g stroke="#00d4ff" strokeWidth="1.5" filter="url(#hg)">
          <path d="M180 548 L180 250 L360 250 L360 548" strokeOpacity=".85" style={{ animation: "bDraw 1.6s ease both", animationDelay: ".2s" }} />
          <path d="M360 250 L416 214 L416 512 L360 548" strokeOpacity=".5" style={{ animation: "bDraw 1.6s ease both", animationDelay: ".5s" }} />
          <path d="M520 548 L520 120 L700 120 L700 548" strokeOpacity=".95" style={{ animation: "bDraw 1.8s ease both", animationDelay: ".55s" }} />
          <path d="M700 120 L760 82 L760 510 L700 548" strokeOpacity=".55" style={{ animation: "bDraw 1.8s ease both", animationDelay: ".85s" }} />
          <path d="M880 548 L880 330 L1100 330 L1100 548" strokeOpacity=".8" style={{ animation: "bDraw 1.6s ease both", animationDelay: ".9s" }} />
        </g>
        <g stroke="#00d4ff" strokeWidth="1">
          <g strokeOpacity=".4" style={{ animation: "bFrame .9s ease both", animationDelay: "1.7s" }}>
            <line x1="180" y1="298" x2="360" y2="298" /><line x1="180" y1="346" x2="360" y2="346" /><line x1="180" y1="394" x2="360" y2="394" /><line x1="180" y1="442" x2="360" y2="442" /><line x1="180" y1="490" x2="360" y2="490" />
            <line x1="240" y1="250" x2="240" y2="548" /><line x1="300" y1="250" x2="300" y2="548" />
          </g>
          <g strokeOpacity=".45" style={{ animation: "bFrame .9s ease both", animationDelay: "2s" }}>
            <line x1="520" y1="168" x2="700" y2="168" /><line x1="520" y1="216" x2="700" y2="216" /><line x1="520" y1="264" x2="700" y2="264" /><line x1="520" y1="312" x2="700" y2="312" /><line x1="520" y1="360" x2="700" y2="360" /><line x1="520" y1="408" x2="700" y2="408" /><line x1="520" y1="456" x2="700" y2="456" /><line x1="520" y1="504" x2="700" y2="504" />
            <line x1="565" y1="120" x2="565" y2="548" /><line x1="610" y1="120" x2="610" y2="548" /><line x1="655" y1="120" x2="655" y2="548" />
            <line x1="700" y1="168" x2="760" y2="130" strokeOpacity=".3" /><line x1="700" y1="264" x2="760" y2="226" strokeOpacity=".3" /><line x1="700" y1="360" x2="760" y2="322" strokeOpacity=".3" /><line x1="700" y1="456" x2="760" y2="418" strokeOpacity=".3" />
          </g>
          <g strokeOpacity=".38" style={{ animation: "bFrame .9s ease both", animationDelay: "2.3s" }}>
            <line x1="880" y1="384" x2="1100" y2="384" /><line x1="880" y1="438" x2="1100" y2="438" /><line x1="880" y1="492" x2="1100" y2="492" />
            <line x1="953" y1="330" x2="953" y2="548" /><line x1="1026" y1="330" x2="1026" y2="548" />
          </g>
        </g>
        <g>
          <rect x="182" y="252" width="176" height="294" fill="url(#cladG)" style={{ animation: "bClad 1s ease both", animationDelay: "2.7s" }} />
          <rect x="522" y="122" width="176" height="424" fill="url(#cladC)" style={{ animation: "bClad 1s ease both", animationDelay: "3s" }} />
          <rect x="882" y="332" width="216" height="214" fill="url(#cladG)" style={{ animation: "bClad 1s ease both", animationDelay: "3.3s" }} />
        </g>
        <line x1="610" y1="120" x2="610" y2="58" stroke="#b56bff" strokeWidth="1.8" style={{ animation: "bFrame .7s ease both", animationDelay: "3.4s" }} />
        <circle cx="610" cy="54" r="4" fill="#00d4ff" filter="url(#hg)" style={{ animation: "dotPulse 2.6s ease-in-out infinite" }} />
        <g style={{ animation: "bWin 2.2s ease both", animationDelay: "3.4s" }}>
          <rect x="527" y="172" width="34" height="40" fill="#00d4ff" opacity=".55" style={{ animation: "winPulse 4.4s ease-in-out infinite" }} />
          <rect x="616" y="268" width="34" height="40" fill="#8000ff" opacity=".5" style={{ animation: "winPulse 5.2s ease-in-out infinite", animationDelay: "1s" }} />
          <rect x="661" y="412" width="34" height="40" fill="#00d4ff" opacity=".5" style={{ animation: "winPulse 4.8s ease-in-out infinite", animationDelay: ".5s" }} />
          <rect x="244" y="350" width="52" height="42" fill="#b56bff" opacity=".45" style={{ animation: "winPulse 5.6s ease-in-out infinite", animationDelay: "1.6s" }} />
          <rect x="957" y="388" width="65" height="46" fill="#00d4ff" opacity=".4" style={{ animation: "winPulse 5s ease-in-out infinite", animationDelay: "2.1s" }} />
        </g>
        <g style={{ transformOrigin: "1176px 548px", animation: "craneSwing 10s ease-in-out infinite" }}>
          <g stroke="#b56bff" strokeWidth="1.5" strokeOpacity=".8" style={{ animation: "bDraw 1.4s ease both", animationDelay: "1.2s" }}>
            <line x1="1176" y1="548" x2="1176" y2="180" /><line x1="1040" y1="200" x2="1244" y2="200" /><line x1="1176" y1="180" x2="1040" y2="200" /><line x1="1176" y1="180" x2="1244" y2="200" />
          </g>
          <line x1="1072" y1="200" x2="1072" y2="300" stroke="#b56bff" strokeWidth="1.2" strokeOpacity=".7" style={{ animation: "bFrame .8s ease both", animationDelay: "2.4s" }} />
          <rect x="1058" y="300" width="28" height="20" stroke="#00d4ff" strokeWidth="1.4" style={{ animation: "bFrame .8s ease both", animationDelay: "2.6s" }} />
        </g>
      </svg>
    </div>
  );
}

/* Isolated so the 2s tick only re-renders the word, not the whole page. */
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => v + 1), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      key={i}
      style={{
        display: "inline-block",
        background: "linear-gradient(90deg,#00d4ff,#8000ff)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        animation: "wordIn .55s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {WORDS[i % WORDS.length]}
    </span>
  );
}

/* Isolated typewriter self-audit search bar (types/erases "commercial GC Bakersfield"). */
function SelfAuditSearch() {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const q = "commercial GC Bakersfield";
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) { setTyped(q); return; }
    let pos = 0, dir = 1, pause = 0;
    const id = setInterval(() => {
      if (pause > 0) { pause--; return; }
      pos += dir;
      if (pos >= q.length) { pos = q.length; dir = -1; pause = 24; }
      if (pos <= 0 && dir === -1) { pos = 0; dir = 1; pause = 6; }
      setTyped(q.slice(0, pos));
    }, 90);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ marginTop: "32px", maxWidth: "560px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "13px", background: "#0c1016", border: "1px solid rgba(0,212,255,.35)", borderRadius: "100px", padding: "15px 22px", boxShadow: "0 0 0 1px rgba(0,212,255,.08),0 20px 60px rgba(0,0,0,.5),0 0 38px rgba(0,212,255,.1)" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.2" style={{ flex: "none" }}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
        <div style={{ flex: 1, fontSize: "clamp(14px,1.3vw,16.5px)", color: "#fafafa", whiteSpace: "nowrap", overflow: "hidden" }}>{typed}<span style={{ display: "inline-block", width: "2px", height: "1.1em", background: "#00d4ff", verticalAlign: "text-bottom", marginLeft: "2px", animation: "caretBlink 1.1s step-end infinite" }} /></div>
        <div style={{ ...mono("#7f8896", 10.5, 1.5), flex: "none" }}>Google</div>
      </div>
      <p style={{ fontSize: "14px", color: "#9aa3b0", lineHeight: 1.6, margin: "14px 2px 0", textWrap: "pretty" }}>Try it now. Search your trade and your city. Are you in the top three? If not, that&rsquo;s who your next customer calls.</p>
    </div>
  );
}

export default function HomeV3() {
  const [counts, setCounts] = useState<[number, number, number]>([0, 0, 0]);
  const [openObj, setOpenObj] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLElement>(null);
  const rvClass = (key: string) => `rv${revealed[key] ? " in" : ""}`;

  // Reveal-on-scroll (state-driven so re-renders don't clobber the class)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-rv]"));
    const revealAll = () => {
      const all: Record<string, boolean> = {};
      els.forEach((el) => { if (el.dataset.rv) all[el.dataset.rv] = true; });
      setRevealed(all);
    };
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    // Degenerate viewport (some embedded/headless renderers report 0) or reduced
    // motion: reveal everything immediately so content is never stuck hidden.
    if (reduce || !window.innerHeight || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const key = (e.target as HTMLElement).dataset.rv;
        if (e.isIntersecting && key) { setRevealed((r) => (r[key] ? r : { ...r, [key]: true })); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -20% 0px" });
    els.forEach((el) => io.observe(el));
    // Safety net: never let a section stay invisible if the observer misfires.
    const fallback = window.setTimeout(revealAll, 4000);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, []);

  // Count-up stats when Speed scrolls into view
  useEffect(() => {
    const el = speedRef.current;
    if (!el) return;
    const targets: [number, number, number] = [21, 42, 78];
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce || !window.innerHeight || typeof IntersectionObserver === "undefined") {
      setCounts(targets);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      if (reduce) { setCounts(targets); return; }
      const dur = 1400, start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const k = 1 - Math.pow(1 - t, 3);
        setCounts([Math.round(targets[0] * k), Math.round(targets[1] * k), Math.round(targets[2] * k)] as [number, number, number]);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ===== §1 HERO ===== */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-14%", right: "-10%", width: "720px", height: "720px", maxWidth: "100vw", background: "radial-gradient(circle at center,rgba(128,0,255,.30),transparent 62%)", filter: "blur(28px)", animation: "glowPulse 9s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.055) 1px,transparent 1px)", backgroundSize: "54px 54px", animation: "gridDrift 26s linear infinite", WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 62%,#000 30%,transparent 80%)", maskImage: "radial-gradient(ellipse 85% 75% at 50% 62%,#000 30%,transparent 80%)", pointerEvents: "none" }} />
        <main style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", textAlign: "center", padding: "clamp(80px,10vw,120px) clamp(20px,5vw,64px) 0" }}>
          <div style={{ maxWidth: "1160px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ ...mono("#00d4ff"), marginBottom: "24px", animation: "fadeUp .7s ease both" }}>Construction-focused growth partner</div>
            <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(54px,6.6vw,118px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, animation: "fadeUp .7s ease both", animationDelay: ".12s" }}>
              <div>We don&rsquo;t do <span style={{ color: "#7f8896" }}>&ldquo;marketing.&rdquo;</span></div>
              <div>We do more <RotatingWord />.</div>
            </h1>
            <p style={{ fontSize: "clamp(19px,1.7vw,25px)", fontWeight: 600, color: "#fafafa", margin: "28px 0 0", lineHeight: 1.4, animation: "fadeUp .7s ease both", animationDelay: ".24s" }}>More profit. More time. Less chaos.</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "38px", animation: "fadeUp .7s ease both", animationDelay: ".36s" }}>
              <Link href="/contact" className="cta-full" style={primaryCta}>Book a 20-Min Call <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
              <a href="#the-system" style={{ display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fafafa", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.18)", padding: "16px 28px", borderRadius: "11px", textDecoration: "none" }}><span style={{ fontSize: "11px" }}>&#9654;</span> See How It Works</a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px 28px", marginTop: "32px", fontSize: "14px", color: "#9aa3b0", animation: "fadeUp .7s ease both", animationDelay: ".48s" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><span style={{ color: "#80ff80" }}>&#10003;</span> Construction-only</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><span style={{ color: "#80ff80" }}>&#10003;</span> No long-term contracts</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><span style={{ color: "#80ff80" }}>&#10003;</span> Results in 90 days</span>
            </div>
          </div>
          <Skyline />
        </main>
      </div>

      {/* ===== §2 THE MIRROR ===== */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "640px", height: "640px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(128,0,255,.18),transparent 62%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1220px", margin: "0 auto" }}>
          <div className={rvClass("mirror")} data-rv="mirror" style={{ maxWidth: "820px" }}>
            <div style={{ ...mono("#00d4ff"), marginBottom: "18px" }}>Every builder is fighting some version of this</div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(52px,7vw,120px)", lineHeight: 0.88, letterSpacing: "1px", color: "#fafafa", margin: 0 }}>Which one are you?</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(18px,2.4vw,30px)", marginTop: "clamp(40px,5vw,64px)", alignItems: "flex-start" }}>
            {/* Big shops */}
            <div style={{ flex: "1 1 440px", minWidth: "300px", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(128,0,255,.3)", borderTop: "3px solid #8000ff", borderRadius: "20px", padding: "clamp(26px,3vw,40px)", boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>
              <div style={{ ...mono("#b56bff", 21, 3), fontSize: "clamp(17px,1.5vw,21px)", fontWeight: 700, marginBottom: "12px", textAlign: "center" }}>Big shops</div>
              <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(30px,2.6vw,40px)", letterSpacing: "1px", textTransform: "uppercase", color: "#fafafa", lineHeight: 0.95 }}>Drowning in work.<br />Still stuck.</div>
              <div style={{ ...mono("#b56bff", 11, 2.5), marginTop: "24px" }}>The problems</div>
              <PainList pains={BIG_PAINS} accent="#b56bff" />
            </div>
            {/* Smaller shops */}
            <div style={{ flex: "1 1 440px", minWidth: "300px", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.28)", borderTop: "3px solid #00d4ff", borderRadius: "20px", padding: "clamp(26px,3vw,40px)", boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>
              <div style={{ ...mono("#00d4ff", 21, 3), fontSize: "clamp(17px,1.5vw,21px)", fontWeight: 700, marginBottom: "12px", textAlign: "center" }}>Smaller shops</div>
              <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(30px,2.6vw,40px)", letterSpacing: "1px", textTransform: "uppercase", color: "#fafafa", lineHeight: 0.95 }}>Good at the work.<br />Fighting for it.</div>
              <div style={{ ...mono("#00d4ff", 11, 2.5), marginTop: "24px" }}>The problems</div>
              <PainList pains={SMALL_PAINS} accent="#00d4ff" />
            </div>
          </div>
          {/* positioning + image */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(32px,4.5vw,72px)", marginTop: "clamp(56px,7vw,96px)" }}>
            <div style={{ flex: "1 1 460px", minWidth: "300px", maxWidth: "640px" }}>
              <h3 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(36px,3.8vw,58px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>Different sizes, different battles. <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>SAME SOLUTIONS.</span></h3>
              <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "24px 0 0", textWrap: "pretty" }}>Catalyst builds the systems that carry the load: <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>answering calls</span>, <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>finding jobs</span>, <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>keeping your name in front of the right people</span>, all working around the clock. So the business finally grows without needing more of you.</p>
              <p style={{ fontSize: "clamp(17px,1.4vw,21px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.5, margin: "22px 0 0", textWrap: "pretty" }}>Saving you <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>time</span> and <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>effort</span>. Saving (and making) you more <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>money</span>.</p>
            </div>
            <div style={{ flex: "1 1 380px", minWidth: "280px", maxWidth: "520px", position: "relative" }}>
              <div style={{ position: "relative", width: "100%", height: "clamp(340px,42vw,480px)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,.6)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/mirror-pain.jpeg" alt="A construction owner alone at his desk late at night, buried in paperwork, phone lit with missed calls" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% center" }} />
              </div>
              <div style={{ ...mono("#7f8896", 11, 2), marginTop: "12px" }}>Carrying all of it. Alone.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRIDGE 1 ===== */}
      <section style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(110px,16vw,220px) clamp(20px,5vw,64px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/bridge-server-room.jpeg" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 62% 65% at 50% 50%,rgba(8,11,15,.82),rgba(8,11,15,.45) 60%,rgba(8,11,15,.2)),linear-gradient(180deg,#080b0f 0%,transparent 18%,transparent 82%,#080b0f 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "760px", height: "760px", maxWidth: "120%", background: "radial-gradient(circle at center,rgba(128,0,255,.22),transparent 62%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <h2 className={rvClass("bridge1")} data-rv="bridge1" style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(58px,9vw,160px)", lineHeight: 0.88, letterSpacing: "1px", color: "#fafafa", margin: 0, textAlign: "center", textWrap: "balance" }}>So how do we <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>do it?</span></h2>
      </section>

      {/* ===== §3 LOOK THE PART ===== */}
      <section style={{ position: "relative", overflow: "hidden", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "clamp(36px,5vw,80px)", padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px)", backgroundSize: "54px 54px", WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 30% 50%,#000 20%,transparent 76%)", maskImage: "radial-gradient(ellipse 70% 70% at 30% 50%,#000 20%,transparent 76%)", pointerEvents: "none" }} />
        {/* phone mockup */}
        <div style={{ flex: "1 1 400px", minWidth: "300px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", order: 1 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "520px", height: "520px", maxWidth: "120%", background: "radial-gradient(circle at center,rgba(128,0,255,.26),transparent 64%)", filter: "blur(24px)" }} />
          <div style={{ position: "relative", width: "332px", maxWidth: "100%", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.25)", borderRadius: "28px", padding: "18px 18px 26px", boxShadow: "0 34px 90px rgba(0,0,0,.6)", overflow: "hidden", minHeight: "472px" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "44px", background: "linear-gradient(180deg,rgba(0,212,255,.16),transparent)", borderTop: "1px solid rgba(0,212,255,.55)", boxShadow: "0 0 18px rgba(0,212,255,.4)", animation: "scanDown 7s cubic-bezier(.4,0,.6,1) infinite", animationDelay: "2s", pointerEvents: "none", zIndex: 2 }} />
            <div style={{ width: "88px", height: "6px", borderRadius: "6px", background: "rgba(255,255,255,.1)", margin: "2px auto 18px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "9px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "11px", padding: "10px 13px", marginBottom: "26px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5b6470" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
              <span style={{ fontSize: "13px", color: "#5b6470" }}>john&rsquo;s custom builders</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "24px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,.05)", border: "1px dashed rgba(255,255,255,.14)", flex: "none" }} />
              <div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#c8c8c8" }}>John&rsquo;s Custom Builders</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px", fontSize: "12.5px", color: "#7f8896" }}><span style={{ color: "#00d4ff" }}>&#9733;</span> 1 review</div>
              </div>
            </div>
            <div style={{ ...mono("#5b6470", 11, 0.5), textTransform: "none" }}>linktr.ee/jcbuilders</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px 0 26px" }}>
              <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", padding: "12px", textAlign: "center", fontSize: "13px", color: "#7f8896" }}>Facebook</div>
              <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", padding: "12px", textAlign: "center", fontSize: "13px", color: "#7f8896" }}>Call us</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", opacity: 0.32 }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.25)" }} />
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.25)" }} />
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.25)" }} />
            </div>
            <div style={{ fontSize: "11.5px", color: "#5b6470", marginTop: "12px" }}>No posts since 2021</div>
          </div>
        </div>
        <div style={{ flex: "1 1 500px", minWidth: "300px", maxWidth: "640px", order: 2, position: "relative", zIndex: 1 }}>
          <div style={{ ...mono("#00d4ff"), marginBottom: "18px" }}>Before they ever call</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(42px,5.4vw,86px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>If they look you up, do you look the part?</h2>
          <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "26px 0 0", maxWidth: "560px", textWrap: "pretty" }}>Before anyone hires you, they Google you. A sharp site, real reviews, and photos of finished work say &ldquo;pro.&rdquo; A dead Facebook page and one old review say &ldquo;pass.&rdquo; If you look small online, you lose &mdash; even when your work is better.</p>
          <SolvesRow items={["feeling invisible", "looking small", "losing to worse companies"]} />
          {/* self-audit search bar */}
          <SelfAuditSearch />
          <Iceberg label="What should they find?">
            <span style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {["A fast, modern site", "A filled-out Google profile", "Recent reviews", "Real project photos", "A reply within minutes"].map((t, i) => (
                <span key={t} style={{ display: "flex", gap: "11px", alignItems: "baseline" }}><span style={{ ...mono("#00d4ff", 12, 0), textTransform: "none" }}>{String(i + 1).padStart(2, "0")}</span><span style={{ fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.5 }}>{t}</span></span>
              ))}
            </span>
          </Iceberg>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", marginTop: "32px" }}>
            <Link href="/contact" className="cta-full" style={primaryCta}>Book a 20-Min Call <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
            <div style={{ fontSize: "13.5px", color: "#7f8896" }}>We&rsquo;ll show you exactly where you stand.</div>
          </div>
        </div>
      </section>

      {/* ===== §4 THE SYSTEM ===== */}
      <section id="the-system" style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "absolute", top: "-8%", right: "-8%", width: "600px", height: "600px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(0,212,255,.1),transparent 64%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1220px", margin: "0 auto" }}>
          <div className={rvClass("system")} data-rv="system" style={{ maxWidth: "820px" }}>
            <div style={{ ...mono("#00d4ff"), marginBottom: "18px" }}>The system</div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(44px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>We run the parts that eat up your day.</h2>
            <p style={{ fontSize: "clamp(17px,1.4vw,21px)", fontWeight: 600, color: "#b56bff", lineHeight: 1.5, margin: "20px 0 0" }}>Three machines working while you&rsquo;re on the jobsite.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(16px,2vw,24px)", marginTop: "clamp(40px,5vw,60px)", alignItems: "stretch" }}>
            {/* Machine 01 — featured */}
            <div style={{ gridColumn: "1/-1", display: "flex", flexWrap: "wrap", gap: "clamp(26px,3.5vw,56px)", alignItems: "center", background: "linear-gradient(135deg,rgba(128,0,255,.13),rgba(12,16,22,.9) 55%),linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(128,0,255,.42)", borderRadius: "22px", padding: "clamp(26px,3.5vw,48px)", boxShadow: "0 34px 90px rgba(0,0,0,.55),0 0 60px rgba(128,0,255,.12)" }}>
              <div style={{ flex: "1 1 440px", minWidth: "290px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...mono("#80ff80", 11, 2), border: "1px solid rgba(128,255,128,.3)", borderRadius: "100px", padding: "6px 14px", marginBottom: "18px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#80ff80", boxShadow: "0 0 9px #80ff80" }} />Machine 01 &middot; always on</div>
                <h3 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(34px,3.4vw,54px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0 }}>Never miss a job</h3>
                <p style={{ fontSize: "18px", color: "#9aa3b0", lineHeight: 1.6, margin: "16px 0 0" }}><span style={{ color: "#00d4ff", fontWeight: 600 }}>85% of missed calls never call back.</span></p>
                <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "18px 0 0", maxWidth: "540px", textWrap: "pretty" }}>Our AI answers every call &mdash; day, night, weekends. It talks like a person, finds out the job, and books the good ones straight to your calendar. A missed call is a missed job. Now you miss neither.</p>
                <SolvesRow items={["no time for calls", "too busy to grow", "everything runs through you"]} />
                <Iceberg label="How can a robot answer my phone?">It&rsquo;s a natural-sounding voice AI that qualifies the caller, answers common questions, books real jobs, and texts you the details.</Iceberg>
              </div>
              <div style={{ flex: "1 1 340px", minWidth: "290px", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "340px", maxWidth: "100%", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.25)", borderRadius: "24px", padding: "18px", boxShadow: "0 30px 80px rgba(0,0,0,.6)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 4px 14px", borderBottom: "1px solid rgba(255,255,255,.07)", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/cds-logo-circle.png" alt="Catalyst" style={{ width: "36px", height: "36px", borderRadius: "50%", display: "block", flex: "none", boxShadow: "0 0 16px rgba(128,0,255,.5)" }} />
                      <div><div style={{ fontSize: "13.5px", fontWeight: 600, color: "#fafafa" }}>Voice Agent</div><div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "#80ff80", marginTop: "2px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#80ff80", boxShadow: "0 0 9px #80ff80" }} />Active 24/7</div></div>
                    </div>
                    <span style={{ ...mono("#7f8896", 10.5, 0), textTransform: "none" }}>SAT &middot; 9:41 PM</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginBottom: "16px" }}>
                    <div style={{ alignSelf: "flex-start", maxWidth: "84%", background: "rgba(255,255,255,.06)", borderRadius: "14px 14px 14px 4px", padding: "10px 13px", fontSize: "13px", color: "#d6dae0", lineHeight: 1.5 }}>Hi, do you do bathroom remodels? Looking to get one done soon.</div>
                    <div style={{ alignSelf: "flex-end", maxWidth: "88%", background: "linear-gradient(135deg,#8000ff,#5600ab)", borderRadius: "14px 14px 4px 14px", padding: "10px 13px", fontSize: "13px", color: "#fff", lineHeight: 1.5 }}>We do, Mike. I can book your free estimate this Friday at 10 AM &mdash; does that work?</div>
                    <div style={{ alignSelf: "flex-start", maxWidth: "70%", background: "rgba(255,255,255,.06)", borderRadius: "14px 14px 14px 4px", padding: "10px 13px", fontSize: "13px", color: "#d6dae0", lineHeight: 1.5 }}>Yeah, Friday works.</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(128,255,128,.08)", border: "1px solid rgba(128,255,128,.3)", borderRadius: "12px", padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span style={{ color: "#80ff80", fontSize: "15px" }}>&#10003;</span><span style={{ fontSize: "13.5px", fontWeight: 600, color: "#80ff80" }}>Job booked</span></div>
                    <span style={{ ...mono("#c8c8c8", 12, 0), textTransform: "none" }}>FRI &middot; 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Machine 02 */}
            <div style={{ gridColumn: "1/-1", display: "flex", flexWrap: "wrap", gap: "clamp(26px,3.5vw,56px)", alignItems: "center", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.25)", borderRadius: "22px", padding: "clamp(26px,3.5vw,48px)", boxShadow: "0 26px 70px rgba(0,0,0,.45)" }}>
              <div style={{ flex: "1 1 440px", minWidth: "290px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...mono("#00d4ff", 11, 2), border: "1px solid rgba(0,212,255,.3)", borderRadius: "100px", padding: "6px 14px", marginBottom: "18px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 9px #00d4ff" }} />Machine 02</div>
                <h3 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(32px,3.2vw,50px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0 }}>Be everywhere they look</h3>
                <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "18px 0 0", maxWidth: "540px", textWrap: "pretty" }}>Fresh posts and videos go out every week &mdash; Google, YouTube, social &mdash; so you&rsquo;re the name they keep seeing. You become the obvious choice without lifting a finger.</p>
                <SolvesRow items={["feeling invisible", "relying on referrals"]} />
                <Iceberg label="How does that work?">We create and schedule the content for you across every channel, so your name stays in front of buyers with zero effort on your end.</Iceberg>
              </div>
              <div style={{ flex: "1 1 340px", minWidth: "290px", display: "flex", justifyContent: "center" }}>
                <svg viewBox="0 0 420 160" style={{ width: "100%", maxWidth: "440px", height: "auto" }} fill="none">
                  <circle cx="210" cy="34" r="24" fill="rgba(128,0,255,.14)" stroke="#8000ff" strokeWidth="1.8" style={{ animation: "dotPulse 3s ease-in-out infinite" }} />
                  <text x="210" y="34" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-inter), sans-serif" fontSize="14" fontWeight={700} fill="#fafafa">You</text>
                  <line x1="210" y1="58" x2="60" y2="122" stroke="#00d4ff" strokeOpacity=".7" strokeWidth="1.5" style={{ strokeDasharray: "4 10", animation: "flow 4.5s linear infinite" }} />
                  <line x1="210" y1="58" x2="160" y2="122" stroke="#00d4ff" strokeOpacity=".7" strokeWidth="1.5" style={{ strokeDasharray: "4 10", animation: "flow 4s linear infinite", animationDelay: ".5s" }} />
                  <line x1="210" y1="58" x2="260" y2="122" stroke="#00d4ff" strokeOpacity=".7" strokeWidth="1.5" style={{ strokeDasharray: "4 10", animation: "flow 5s linear infinite", animationDelay: "1s" }} />
                  <line x1="210" y1="58" x2="360" y2="122" stroke="#00d4ff" strokeOpacity=".7" strokeWidth="1.5" style={{ strokeDasharray: "4 10", animation: "flow 4.2s linear infinite", animationDelay: ".3s" }} />
                  <text x="60" y="146" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="11" letterSpacing="1" fill="#7f8896" textAnchor="middle">GOOGLE</text>
                  <text x="160" y="146" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="11" letterSpacing="1" fill="#7f8896" textAnchor="middle">YOUTUBE</text>
                  <text x="260" y="146" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="11" letterSpacing="1" fill="#7f8896" textAnchor="middle">SOCIAL</text>
                  <text x="360" y="146" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="11" letterSpacing="1" fill="#7f8896" textAnchor="middle">MAPS</text>
                </svg>
              </div>
            </div>
            {/* Machine 03 */}
            <div style={{ gridColumn: "1/-1", display: "flex", flexWrap: "wrap", gap: "clamp(26px,3.5vw,56px)", alignItems: "center", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.25)", borderRadius: "22px", padding: "clamp(26px,3.5vw,48px)", boxShadow: "0 26px 70px rgba(0,0,0,.45)" }}>
              <div style={{ flex: "1 1 440px", minWidth: "290px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...mono("#00d4ff", 11, 2), border: "1px solid rgba(0,212,255,.3)", borderRadius: "100px", padding: "6px 14px", marginBottom: "18px" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 9px #00d4ff" }} />Machine 03 &middot; Construction RFP AI</div>
                <h3 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(32px,3.2vw,50px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0 }}>Bids delivered automatically</h3>
                <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "18px 0 0", maxWidth: "540px", textWrap: "pretty" }}>Stop paying someone to dig through government sites for bids/RFPs. Our system scans&nbsp;<i>your</i> RFP sources around the clock and drops the <i>right</i> jobs in your inbox. Your budget, licenses, and other requirements&nbsp;&mdash; ready to bid. 15+ hours back every week.</p>
                <div style={{ ...mono("#b56bff", 11, 1), textTransform: "none", marginTop: "16px", lineHeight: 1.6 }}>A standalone tool &mdash; $497/mo on its own, or included in our top tier.</div>
                <SolvesRow items={["wondering where the next job is", "referrals only", "stretched thin"]} />
                <Iceberg label="What is Construction RFP AI?">An always-on system that scans public bid sources, filters for jobs that fit you, and delivers them to your inbox, ready to bid.</Iceberg>
              </div>
              <div style={{ flex: "1 1 340px", minWidth: "290px", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "360px", maxWidth: "100%", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(0,212,255,.25)", borderRadius: "20px", padding: "20px", boxShadow: "0 30px 80px rgba(0,0,0,.6)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
                    <span style={{ fontSize: "12.5px", color: "#9aa3b0" }}>New jobs &middot; 3</span>
                    <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px", ...mono("#7f8896", 10.5, 0), textTransform: "none" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }} />SCANNED 24/7</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {[["School District Reroof", "DUE AUG 12"], ["City Parking Structure", "DUE AUG 20"], ["Community Center HVAC", "DUE SEP 03"]].map(([job, due]) => (
                      <div key={job} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "10px", padding: "11px 13px" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#80ff80", boxShadow: "0 0 8px #80ff80", flex: "none" }} /><div style={{ flex: 1, fontSize: "13px", fontWeight: 600, color: "#fafafa" }}>{job}</div><span style={{ ...mono("#7f8896", 10, 0), textTransform: "none" }}>{due}</span></div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", ...mono("#80ff80", 11, 0), textTransform: "none" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#80ff80", boxShadow: "0 0 8px #80ff80" }} />15+ HOURS BACK EVERY WEEK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRIDGE 2 ===== */}
      <section style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(100px,14vw,190px) clamp(20px,5vw,64px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/bridge-boardroom.jpg" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 62% 65% at 50% 50%,rgba(8,11,15,.78),rgba(8,11,15,.4) 60%,rgba(8,11,15,.15)),linear-gradient(180deg,#080b0f 0%,transparent 18%,transparent 82%,#080b0f 100%)", pointerEvents: "none" }} />
        <h2 className={rvClass("bridge2")} data-rv="bridge2" style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(54px,8vw,140px)", lineHeight: 0.88, letterSpacing: "1px", color: "#7f8896", margin: 0, textAlign: "center", textWrap: "balance" }}>Big talk. <span style={{ color: "#fafafa" }}>Can we back it up?</span></h2>
      </section>

      {/* ===== §5 PROOF, NOT PROMISES ===== */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "absolute", bottom: "-12%", right: "-8%", width: "640px", height: "640px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(128,0,255,.2),transparent 62%)", filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1220px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ maxWidth: "720px" }}>
              <div style={{ ...mono("#00d4ff"), marginBottom: "18px" }}>Proof, not promises</div>
              <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(44px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>We&rsquo;d rather prove it than promise it.</h2>
              <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "24px 0 0", maxWidth: "640px", textWrap: "pretty" }}>Talk is cheap. Here&rsquo;s the work. Real, live sites we built specifically for contractors. Fast, sharp, made to win jobs. No Wordpress templates here. Just modern,&nbsp;Next.js/React. The gold standard for speed. Great for search authority. When you choose Catalyst, you get the best.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px", ...mono("#00d4ff", 11.5, 1.5) }}>
              <span style={{ color: "#00d4ff" }}>Solves &rarr;</span>
              <span style={{ color: "#9aa3b0", border: "1px solid rgba(0,212,255,.28)", borderRadius: "100px", padding: "5px 12px" }}>looking small online</span>
            </div>
          </div>
          {/* demo grid */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(18px,2.4vw,28px)", marginTop: "clamp(36px,4.5vw,52px)" }}>
            {DEMOS.map((d) => (
              <a key={d.name} href={d.href} target="_blank" rel="noopener" className="demo-card" style={{ flex: "1 1 460px", minWidth: "290px", maxWidth: "575px", display: "block", textDecoration: "none", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.45)", transition: "border-color .35s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "#0c1016", borderBottom: "1px solid rgba(255,255,255,.07)", padding: "11px 16px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.14)" }} /><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.14)" }} /><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.14)" }} />
                  <span style={{ flex: 1, textAlign: "center", ...mono("#7f8896", 11, 0), textTransform: "none" }}>{d.domain}</span>
                  <span style={{ ...mono("#00d4ff", 10.5, 1.5), whiteSpace: "nowrap" }}>LIVE &rarr;</span>
                </div>
                <div style={{ position: "relative", aspectRatio: "1920/1300", overflow: "hidden", containerType: "size", background: "#0a0d12" } as CSSProperties}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="demo-thumb-img" src={d.img} alt={`${d.name} demo site`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", minHeight: "100%", objectFit: "cover", objectPosition: "top" }} />
                </div>
                <div style={{ position: "relative", padding: "16px 150px 18px 20px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
                  <span style={{ position: "absolute", right: "14px", bottom: "16px", transform: "rotate(-6deg)", ...mono(d.badgeColor, 10.5, 1.5), fontWeight: 500, background: d.badgeBg, borderRadius: "6px", padding: "7px 12px", whiteSpace: "nowrap" }}><span className="see-live-click">Click to see live</span><span className="see-live-tap">Tap to see live</span></span>
                  <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "24px", letterSpacing: "1.5px", color: "#fafafa" }}>{d.name}</div>
                  <p style={{ fontSize: "13.5px", color: "#9aa3b0", lineHeight: 1.55, margin: "7px 0 0", textWrap: "pretty" }}>{d.blurb}</p>
                </div>
              </a>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", marginTop: "clamp(36px,4.5vw,52px)" }}>
            <div style={{ maxWidth: "620px" }}>
              <p style={{ fontSize: "clamp(20px,1.9vw,28px)", fontWeight: 600, color: "#fafafa", lineHeight: 1.35, margin: 0, textWrap: "balance" }}>Want to see YOUR company on one of these? Book a call and we&rsquo;ll show you in <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>10 minutes</span>.</p>
              <Iceberg label="Wait — are these real?">Yes &mdash; live and deployable. On a call we re-skin one to your brand in under a minute.</Iceberg>
            </div>
            <Link href="/contact" className="cta-full" style={primaryCta}>Book a 20-Min Call <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
          </div>
        </div>
      </section>

      {/* ===== §6 SPEED ===== */}
      <section ref={speedRef} style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "clamp(40px,5vw,64px)", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px)", backgroundSize: "54px 54px", animation: "gridDrift 30s linear infinite", WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,#000 20%,transparent 78%)", maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,#000 20%,transparent 78%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-8%", left: "-6%", width: "560px", height: "560px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(128,0,255,.24),transparent 64%)", filter: "blur(26px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "840px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(42px,5.4vw,86px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>The fastest contractor wins the job.</h2>
          <p style={{ fontSize: "clamp(16px,1.4vw,18px)", color: "#b56bff", lineHeight: 1.6, margin: "22px auto 0", maxWidth: "580px", textWrap: "pretty" }}>Most leads go to whoever answers first. Here&rsquo;s what the speed gap costs you.</p>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", alignItems: "stretch", justifyContent: "center", gap: "clamp(16px,2vw,24px)", width: "100%", maxWidth: "1000px" }}>
          {[
            { v: `${counts[0]}×`, a: "more likely to land a lead", b: "when you respond in 5 minutes instead of 30", topColor: true },
            { v: `${counts[1]} hrs`, a: "average business response", b: "time", topColor: true },
            { v: `${counts[2]}%`, a: "of customers buy from", b: "whoever responds first", topColor: false },
          ].map((s, i) => (
            <div key={i} style={{ flex: "1 1 270px", minWidth: "240px", maxWidth: "320px", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(128,255,128,.22)", borderRadius: "18px", padding: "34px 28px", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(54px,6vw,76px)", lineHeight: 1, letterSpacing: "-1px", color: "#80ff80", textShadow: "0 0 28px rgba(128,255,128,.35)" }}>{s.v}</div>
              <p style={{ fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.55, margin: "18px 0 0", textAlign: "center", textWrap: "pretty" }}>
                <span style={{ display: "block", ...(s.topColor ? { color: "#00d4ff", fontWeight: 600 } : {}) }}>{s.a}</span>
                <span style={{ display: "block", ...(s.topColor ? {} : { color: "#00d4ff", fontWeight: 600 }) }}>{s.b}</span>
              </p>
            </div>
          ))}
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px 12px", ...mono("#00d4ff", 11.5, 1.5), marginBottom: "18px" }}>
            <span style={{ color: "#00d4ff" }}>Solves &rarr;</span>
            <span style={{ color: "#9aa3b0", border: "1px solid rgba(0,212,255,.28)", borderRadius: "100px", padding: "5px 12px" }}>losing jobs to faster competitors</span>
          </div>
          <Iceberg label="Where these numbers come from">The 21&times; figure comes from the MIT/InsideSales response-time study. The 42-hour average is from Harvard Business Review&rsquo;s lead-response audit. The 78% first-responder figure is directional, drawn from published lead-response research.</Iceberg>
        </div>
      </section>

      {/* ===== §7 HOW WE WORK ===== */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ maxWidth: "780px" }}>
            <div style={{ ...mono("#00d4ff"), marginBottom: "18px" }}>How we work with you</div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(44px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>One system. Built up in three stages.</h2>
            <p style={{ fontSize: "clamp(15.5px,1.15vw,17.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "24px 0 0", maxWidth: "640px", textWrap: "pretty" }}>We don&rsquo;t do one-off jobs. We tie our name to your success, so we build the whole structure. Starting with the foundation, ending with the spire.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "clamp(16px,2vw,24px)", marginTop: "clamp(40px,5vw,56px)" }}>
            {[
              { stage: "STAGE 1", name: "Foundation", price: "$1,497/mo", desc: "A site that wins work, built to get you found.", featured: false },
              { stage: "STAGE 2", name: "Framework", price: "$2,997/mo", desc: "The full machine: content, search, and automation that fills your pipeline and runs itself.", featured: true },
              { stage: "STAGE 3", name: "Landmark", price: "$7,997/mo", desc: "Own your market, end to end, hands-off.", featured: false },
            ].map((s) => (
              <div key={s.name} style={s.featured
                ? { flex: "1 1 300px", minWidth: "270px", display: "flex", flexDirection: "column", position: "relative", background: "linear-gradient(135deg,rgba(128,0,255,.16),rgba(12,16,22,.92) 60%),linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(128,0,255,.5)", borderRadius: "20px", padding: "clamp(26px,2.8vw,38px)", boxShadow: "0 30px 80px rgba(0,0,0,.5),0 0 50px rgba(128,0,255,.16)" }
                : { flex: "1 1 300px", minWidth: "270px", display: "flex", flexDirection: "column", background: "linear-gradient(180deg,#0c1016,#090c11)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "clamp(26px,2.8vw,38px)", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
                {s.featured && <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", ...mono("#fff", 10.5, 2), background: "linear-gradient(135deg,#8000ff,#5600ab)", borderRadius: "100px", padding: "6px 16px", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(128,0,255,.4)" }}>&#9733; Most builders start here</div>}
                <div style={{ ...mono(s.featured ? "#b56bff" : "#7f8896", 11, 2), marginBottom: "14px" }}>{s.stage}</div>
                <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(28px,2.6vw,38px)", letterSpacing: "1.5px", textTransform: "uppercase", color: "#fafafa", lineHeight: 1 }}>{s.name}</div>
                <div style={{ ...mono("#00d4ff", 13, 1), textTransform: "none", marginTop: "10px" }}>{s.price}</div>
                <p style={{ fontSize: "15px", color: "#c8c8c8", lineHeight: 1.65, margin: "18px 0 0", textWrap: "pretty" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "18px", marginTop: "clamp(28px,3.5vw,40px)" }}>
            <p style={{ fontSize: "clamp(15.5px,1.2vw,18px)", fontWeight: 600, color: "#fafafa", margin: 0, textWrap: "pretty" }}>Whatever you build &mdash; or want to build next &mdash; we can work with you.</p>
            <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fafafa", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.18)", padding: "14px 28px", borderRadius: "11px", textDecoration: "none" }}>See full pricing <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
          </div>
        </div>
      </section>

      {/* ===== §8 FIRST CTA ===== */}
      <section style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "clamp(110px,15vw,210px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "720px", height: "720px", maxWidth: "120%", background: "radial-gradient(circle at center,rgba(128,0,255,.3),transparent 62%)", filter: "blur(28px)", animation: "glowPulse 9s ease-in-out infinite", pointerEvents: "none" }} />
        <div className={rvClass("cta1")} data-rv="cta1" style={{ position: "relative", zIndex: 1, maxWidth: "820px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ ...mono("#00d4ff"), marginBottom: "22px" }}>Ready when you are</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(56px,8vw,140px)", lineHeight: 0.88, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>Let&rsquo;s take the weight off.</h2>
          <p style={{ fontSize: "clamp(16px,1.3vw,19px)", color: "#c8c8c8", lineHeight: 1.7, margin: "30px 0 0", maxWidth: "580px", textWrap: "pretty" }}>Book a quick 20-minute call. We&rsquo;ll show you exactly what&rsquo;s costing you jobs and how to fix it. No pressure. No jargon.</p>
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", width: "100%" }}>
            <Link href="/contact" className="cta-full" style={{ ...primaryCta, fontSize: "17px", padding: "17px 34px", animation: "ctaPulse 3.4s ease-in-out infinite" }}>Book a 20-Min Call <span style={{ fontSize: "19px" }}>&rarr;</span></Link>
            <div style={{ fontSize: "13.5px", color: "#7f8896" }}>Or call or text us &mdash; <a href="tel:+16615359927" style={{ color: "#9aa3b0", textDecoration: "none", fontWeight: 600 }}>(661) 535-9927</a>.</div>
          </div>
        </div>
      </section>

      {/* ===== §9 STILL NOT CONVINCED ===== */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,150px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ ...mono("#00d4ff"), marginBottom: "18px" }}>Still not convinced?</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(44px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>LET&rsquo;S HIT THE REAL OBJECTIONS.</h2>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "clamp(36px,4.5vw,52px)", borderTop: "1px solid rgba(255,255,255,.09)" }}>
            {OBJECTIONS.map((o, i) => {
              const isOpen = !!openObj[i];
              return (
                <div key={o.q} style={{ borderBottom: "1px solid rgba(255,255,255,.09)" }}>
                  <button onClick={() => setOpenObj((s) => ({ ...s, [i]: !s[i] }))} aria-expanded={isOpen} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "clamp(20px,2.4vw,30px) 2px", fontFamily: "var(--font-inter), sans-serif", outline: "none", WebkitTapHighlightColor: "transparent" }}>
                    <span style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(24px,2.6vw,40px)", letterSpacing: "1px", textTransform: "uppercase", color: "#fafafa", lineHeight: 1 }}>{o.q}</span>
                    <span style={{ flex: "none", fontSize: "22px", fontWeight: 600, color: isOpen ? "#b56bff" : "#8000ff", transition: "color .25s ease, transform .3s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>&oplus;</span>
                  </button>
                  {isOpen && (
                    <div style={{ borderLeft: "2px solid #8000ff", margin: "0 2px clamp(22px,2.4vw,30px)", padding: "4px 4px 4px 20px", animation: "panelIn .42s ease" }}>
                      <p style={{ fontSize: "clamp(15px,1.15vw,16.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: 0, maxWidth: "700px", textWrap: "pretty" }}>{o.a}</p>
                      {o.links && (
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 16px", marginTop: "14px" }}>
                          <span style={{ ...mono("#7f8896", 11.5, 1.5) }}>Links:</span>
                          {o.links.map((l) => (
                            <a key={l.url} href={l.url} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "6px", ...mono("#00d4ff", 11.5, 1), border: "1px solid rgba(0,212,255,.3)", borderRadius: "100px", padding: "6px 13px", textDecoration: "none" }}>{l.label} &#8599;</a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== §10 WHY NOW ===== */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(100px,13vw,190px) clamp(20px,5vw,64px) clamp(90px,11vw,160px)" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "680px", height: "680px", maxWidth: "90vw", background: "radial-gradient(circle at center,rgba(128,0,255,.24),transparent 62%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1220px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(40px,5.5vw,88px)" }}>
          <div className={rvClass("whynow")} data-rv="whynow" style={{ flex: "1 1 500px", minWidth: "300px", maxWidth: "680px" }}>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(48px,6vw,104px)", lineHeight: 0.88, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>You adapted to the internet. <span style={{ background: "linear-gradient(90deg,#b56bff,#00d4ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Now get ahead of AI.</span></h2>
            <p style={{ fontSize: "clamp(16px,1.25vw,18.5px)", color: "#c8c8c8", lineHeight: 1.75, margin: "32px 0 0", maxWidth: "580px", textWrap: "pretty" }}>You already lived one shift &mdash; the internet &mdash; and you adapted. Make no mistake. AI is the next technological revolution. It&rsquo;s already here. And it&rsquo;s how your customers will find you next. Getting found takes months to build. Start today, and become the name everyone sees first &mdash; while your competitors stare at a gap they can&rsquo;t close.</p>
            <p style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(30px,3vw,48px)", letterSpacing: "1px", textTransform: "uppercase", color: "#fafafa", lineHeight: 1, margin: "40px 0 0" }}>Let&rsquo;s build the system.</p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px", marginTop: "26px" }}>
              <Link href="/contact" className="cta-full" style={{ ...primaryCta, fontSize: "17px", padding: "17px 34px" }}>Book a 20-Min Call <span style={{ fontSize: "19px" }}>&rarr;</span></Link>
              <div style={{ fontSize: "13.5px", color: "#7f8896" }}>Or call or text &mdash; <a href="tel:+16615359927" style={{ color: "#9aa3b0", textDecoration: "none", fontWeight: 600 }}>(661) 535-9927</a>.</div>
            </div>
          </div>
          <div style={{ flex: "1 1 400px", minWidth: "290px", maxWidth: "560px", position: "relative" }}>
            <div style={{ position: "absolute", inset: "-8%", background: "radial-gradient(circle at 60% 40%,rgba(128,0,255,.24),transparent 62%)", filter: "blur(24px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", width: "100%", height: "clamp(420px,52vw,620px)", borderRadius: "18px", overflow: "hidden", boxShadow: "0 40px 110px rgba(0,0,0,.65)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/whynow-highrise.jpeg" alt="A steel-and-glass high-rise under construction at golden hour, cranes against the sky" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div style={{ ...mono("#7f8896", 11, 2), marginTop: "14px", textAlign: "right" }}>YOUR COMPANY, AT SCALE.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
