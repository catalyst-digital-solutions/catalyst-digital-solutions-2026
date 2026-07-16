"use client";

import { useState } from "react";
import Link from "next/link";

/* CDS About page — recreated from "CDS About v2.dc.html" (design handoff).
   Copy is locked; transcribed verbatim including punctuation. Shared Nav/Footer
   come from the root layout, so this renders only the page body (sections 1–6). */

const PhoneIcon = ({ stroke = "#fff" }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" style={{ flex: "none" }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function AboutContent() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div style={{ background: "#080b0f", fontFamily: "var(--font-inter), sans-serif", color: "#c8c8c8" }}>
      {/* ============ SECTION 1 : OPENING BAND ============ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(90px,12vw,150px) clamp(20px,5vw,64px) clamp(70px,8vw,110px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-14%",
            left: "-8%",
            width: "600px",
            height: "600px",
            maxWidth: "90vw",
            background: "radial-gradient(circle at center,rgba(128,0,255,.16),transparent 64%)",
            filter: "blur(28px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1180px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(40px,5vw,72px)",
          }}
        >
          <div style={{ flex: "1 1 480px", minWidth: "300px" }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>
              A Fair Warning
            </div>
            <h1 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(46px,5.6vw,92px)", lineHeight: 0.9, letterSpacing: "1px", color: "#fafafa", margin: "18px 0 0", textWrap: "balance" }}>
              Some will understand this message. Most won&rsquo;t.
            </h1>
            <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: "24px 0 0", maxWidth: "540px", textWrap: "pretty" }}>
              That&rsquo;s on purpose. This page isn&rsquo;t written to convince everyone. It&rsquo;s written for the builder who&rsquo;s honest enough to look at their own business and ask, &ldquo;What am I missing?&rdquo; If that&rsquo;s not you, no hard feelings &mdash; there&rsquo;s an agency out there that&rsquo;ll tell you what you want to hear. If it is you...then welcome to&nbsp;Catalyst.
            </p>
          </div>
          <div style={{ flex: "1 1 340px", minWidth: "280px", maxWidth: "460px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: "420px", height: "480px", border: "1px solid rgba(255,255,255,.09)", borderRadius: "18px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/mario-hero.jpg" alt="Mario Garza at his desk, building a construction company website" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 : THE WHY — THE LETTER ============ */}
      <section style={{ position: "relative", padding: "clamp(70px,8vw,110px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1180px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "clamp(40px,5vw,80px)" }}>
          {/* THE LETTER */}
          <article style={{ flex: "1 1 560px", minWidth: "300px", maxWidth: "720px" }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>
              Why Catalyst exists
            </div>
            <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(28px,2.8vw,40px)", lineHeight: 1.2, color: "#fafafa", margin: "16px 0 0", textWrap: "balance" }}>
              The thing that kills most construction companies isn&rsquo;t what you think.
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "26px 0 0" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,#8000ff,#5600ab)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "24px", color: "#fff", flex: "none" }}>M</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#fafafa" }}>Mario</div>
                <div style={{ fontSize: "12.5px", color: "#7f8896" }}>Founder &middot; 4 min read</div>
              </div>
            </div>

            <div style={{ marginTop: "34px", fontSize: "clamp(16px,1.2vw,17.5px)", lineHeight: 1.85, color: "#c8c8c8" }}>
              <p style={{ margin: 0, textWrap: "pretty" }}>
                <span style={{ float: "left", fontFamily: '"Bebas Neue", sans-serif', fontSize: "76px", lineHeight: 0.78, color: "rgb(181, 107, 255)", padding: "6px 14px 0px 0px" }}>H</span>
                ere&rsquo;s what nobody wants to say out loud: the thing that kills most construction companies isn&rsquo;t the economy, a lack of skilled workers, or even slow-paying clients.
              </p>

              <p style={{ margin: "26px 0 0", fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(28px,2.6vw,38px)", letterSpacing: "1px", color: "#fafafa", textTransform: "uppercase" }}>
                It&rsquo;s pride.
              </p>

              <p style={{ margin: "26px 0 0", textWrap: "pretty" }}>
                It&rsquo;s the owner who won&rsquo;t look at his own numbers because he&rsquo;s afraid of what he&rsquo;ll find. The one who knows his systems are held together with duct tape and a shared spreadsheet, but says, &ldquo;It&rsquo;s worked fine so far.&rdquo; The one who&rsquo;d rather lose the bid quietly than risk looking foolish trying something new.
              </p>

              {/* PULL QUOTE */}
              <div style={{ margin: "44px 0", padding: "0 clamp(0px,3vw,32px)", textAlign: "center" }}>
                <div style={{ width: "56px", height: "2px", background: "linear-gradient(90deg,#8000ff,#00d4ff)", margin: "0 auto 22px" }} />
                <p style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(28px,2.9vw,42px)", lineHeight: 1.1, letterSpacing: ".5px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
                  &ldquo;When pride comes, then comes disgrace, but with humility comes wisdom.&rdquo;
                </p>
                <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#7f8896", margin: "14px 0 0" }}>
                  &mdash; Proverbs 11:2 NIV
                </p>
                <div style={{ width: "56px", height: "2px", background: "linear-gradient(90deg,#00d4ff,#8000ff)", margin: "22px auto 0" }} />
              </div>

              <p style={{ margin: 0, textWrap: "pretty" }}>
                I get it more than most. It goes against our nature to set pride down. It feels like we&rsquo;re protecting ourselves by holding on to it, but in fact, we&rsquo;re only hurting ourselves. It causes us to keep our guard up against people and ideas that would strengthen us.
              </p>

              <p style={{ margin: "26px 0 0", textWrap: "pretty" }}>
                I spent 20 years as a Deputy Sheriff before this. I fought pride every day &mdash; within myself, among my peers and daily contacts. Everywhere. Decades later, I learned how to beat it. One simple truth: <strong style={{ color: "#fafafa" }}>it starts with me (and you).</strong>
              </p>

              <p style={{ margin: "26px 0 0", textWrap: "pretty" }}>
                I apply that same truth to this business: I&rsquo;ll tell you the truth about your business, even when it&rsquo;s not what you want to hear &mdash; especially then, actually. But I&rsquo;ll need you to be open to advice, open to ideas, open to change.
              </p>

              <p style={{ margin: "26px 0 0", fontWeight: 600, color: "#fafafa", textWrap: "pretty" }}>
                Because things ARE changing&hellip;
              </p>

              <p style={{ margin: "26px 0 0", textWrap: "pretty" }}>
                And here&rsquo;s the main thing that should concern you: <strong style={{ color: "#00d4ff" }}>AI.</strong>
              </p>

              <button
                aria-expanded={open2}
                onClick={() => setOpen2((v) => !v)}
                style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "none", border: "none", padding: 0, marginTop: "22px", fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 600, color: "#8000ff", cursor: "pointer" }}
              >
                <span style={{ fontSize: "15px", lineHeight: 1 }}>&oplus;</span> &ldquo;How does AI affect me?&rdquo;
              </button>
              {open2 && (
                <div style={{ borderLeft: "2px solid #8000ff", padding: "4px 0 4px 18px", marginTop: "14px", animation: "panelIn .42s cubic-bezier(.4,0,.2,1)" }}>
                  <p style={{ fontSize: "14.5px", color: "#c8c8c8", lineHeight: 1.75, margin: 0, textWrap: "pretty" }}>
                    Every new technology follows the same curve: a handful of Innovators go first, then Early Adopters, then it hits the Early Majority &mdash; and that&rsquo;s the moment it stops being an edge and becomes the price of staying in business. AI is climbing that curve right now, in construction, faster than most owners realize. The company that adopts it while it&rsquo;s still an advantage wins the next five years and beyond. The one that waits for &ldquo;everyone else to do it first&rdquo; is waiting to become a Late Majority, competing on price against companies that already automated the cost out of their overhead.
                  </p>
                </div>
              )}

              {/* EMPHASIS */}
              <blockquote style={{ margin: "34px 0 0", padding: "6px 0 6px 22px", borderLeft: "2px solid #00d4ff", fontStyle: "italic", color: "#fafafa" }}>
                <p style={{ margin: 0, fontSize: "clamp(17px,1.35vw,19px)", lineHeight: 1.7, textWrap: "pretty" }}>
                  In the digital era, the job goes to whoever the customer finds first and trusts fastest. Now, that&rsquo;s determined on a screen, not in person.
                </p>
              </blockquote>

              <p style={{ margin: "34px 0 0", textWrap: "pretty" }}>
                I saw proof of that myself. I built one construction company&rsquo;s online presence so strong that a bonding company <strong style={{ color: "#fafafa" }}>doubled a subcontractor&rsquo;s bonding capacity</strong> simply because that sub was associated with them. Real money, moved by nothing but how the company looked online. It became a pattern among their subs. It changed how the whole industry treated them.
              </p>

              <p style={{ margin: "26px 0 0", textWrap: "pretty" }}>
                That&rsquo;s when it clicked. <strong style={{ color: "#fafafa" }}>The presence I build changes how the market sees a company</strong> &mdash; but only for the owner willing to actually look in the mirror first.
              </p>

              <p style={{ margin: "34px 0 0", textWrap: "pretty" }}>
                You should know this before going in: I run this business the way I live my life. <strong style={{ color: "rgb(250, 250, 250)" }}>Jesus Christ first. A life of service. Honesty in everything,</strong> even when honesty costs me the sale. If that&rsquo;s not for you, I understand. If it is&hellip; you&rsquo;re exactly who I built this for. Let&rsquo;s talk.
              </p>

              <p style={{ margin: "34px 0 0", fontStyle: "italic", color: "#c8c8c8" }}>
                &mdash; Mario Garza, Founder, Catalyst Digital Solutions
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "36px" }}>
                <a href="tel:+16615359927" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "15.5px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", padding: "15px 28px", borderRadius: "11px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", textDecoration: "none" }}>
                  Call Mario Now
                  <PhoneIcon stroke="#fff" />
                </a>
                <Link href="/contact" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "15.5px", fontWeight: 600, color: "#fafafa", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.18)", padding: "15px 26px", borderRadius: "11px", textDecoration: "none" }}>
                  Book a Meeting <span style={{ fontSize: "17px" }}>&rarr;</span>
                </Link>
              </div>
            </div>
          </article>

          {/* FOUNDER CARD */}
          <aside style={{ flex: "1 1 300px", minWidth: "280px", maxWidth: "380px", position: "sticky", top: "110px" }}>
            <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "18px" }}>
              <div style={{ width: "150px", height: "150px", flex: "none", border: "2px solid rgba(128,0,255,.45)", borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 40px rgba(128,0,255,.18)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/mario-headshot.jpg" alt="Mario Garza, Founder of Catalyst Digital Solutions" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "22px", color: "#fafafa" }}>Mario Garza</div>
                <div style={{ fontSize: "14px", color: "#b56bff", marginTop: "4px" }}>Founder,<br />Catalyst Digital Solutions LLC</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#c8c8c8", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>&#128205; Bakersfield, CA</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#c8c8c8", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>Since 2023</span>
              </div>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.08)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#e8c14c", background: "rgba(232,193,76,.08)", border: "1px solid rgba(232,193,76,.35)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>Christ Follower</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#fafafa", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.22)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>20-Year Law Enforcement Veteran</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#80ff80", background: "rgba(128,255,128,.07)", border: "1px solid rgba(128,255,128,.3)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>Card-Carrying Nerd</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#00d4ff", background: "rgba(0,212,255,.07)", border: "1px solid rgba(0,212,255,.3)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>Construction-Focused</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11.5px", color: "#b56bff", background: "rgba(128,0,255,.08)", border: "1px solid rgba(128,0,255,.3)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>Bakersfield-Based</span>
              </div>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.08)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#00d4ff", marginBottom: "12px" }}>About Mario</div>
                <p style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.75, margin: 0, textWrap: "pretty" }}>
                  Mario has been writing code since long before &ldquo;learn to code&rdquo; was a bootcamp slogan. He started with C, then learned Objective-C and object-oriented programming fundamentals.
                </p>
                <p style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.75, margin: "12px 0 0", textWrap: "pretty" }}>
                  20+ years later, that same tenacious curiosity goes into databases, web development, and now AI-focused Python apps. He&rsquo;s never met a programming language or operating system he couldn&rsquo;t figure out.
                </p>
                <p style={{ fontSize: "13.5px", color: "#c8c8c8", lineHeight: 1.75, margin: "12px 0 0", textWrap: "pretty" }}>
                  When he&rsquo;s not building systems for construction companies, you&rsquo;ll find him tinkering with new tools to add to his stack, usually 30 tabs deep into documentation he didn&rsquo;t really need to read.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ SECTION 3 : WHAT MAKES US DIFFERENT ============ */}
      <section style={{ position: "relative", padding: "clamp(80px,9vw,130px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto clamp(48px,6vw,72px)" }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>What makes us different</div>
            <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(40px,4.6vw,72px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: "16px 0 0", textWrap: "balance" }}>
              Three things we do that agencies don&rsquo;t
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "clamp(20px,2.4vw,28px)", alignItems: "stretch" }}>
            <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "13px", background: "rgba(0,212,255,.07)", border: "1px solid rgba(0,212,255,.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(0,212,255,.15)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.8"><path d="M2 18h20" /><path d="M4 18v-3a8 8 0 0 1 5-7.4" /><path d="M20 18v-3a8 8 0 0 0-5-7.4" /><path d="M10 5a2 2 0 0 1 4 0v3h-4z" /></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(20px,1.6vw,24px)", lineHeight: 1.3, color: "#fafafa", margin: 0, textWrap: "balance" }}>We only work with construction.</h3>
              <p style={{ fontSize: "15px", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
                We&rsquo;re not a general agency with a few contractor clients. Construction is all we do &mdash; the bidding cycles, the RFP grind, the difference between a GC and a specialty trade. Your marketing reads like someone who&rsquo;s been near a jobsite, because we have.
              </p>
            </div>

            <div style={{ background: "linear-gradient(180deg,rgba(128,0,255,.10),rgba(128,0,255,.035)),rgba(255,255,255,.02)", border: "1px solid rgba(128,0,255,.45)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 0 40px rgba(128,0,255,.12)" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "13px", background: "rgba(128,0,255,.12)", border: "1px solid rgba(128,0,255,.45)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(128,0,255,.25)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b56bff" strokeWidth="1.8"><rect x="4" y="7" width="16" height="12" rx="2" /><path d="M12 7V4" /><circle cx="12" cy="3" r="1" /><circle cx="9" cy="12" r="1" fill="#b56bff" /><circle cx="15" cy="12" r="1" fill="#b56bff" /><path d="M9 16h6" /></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(20px,1.6vw,24px)", lineHeight: 1.3, color: "#fafafa", margin: 0, textWrap: "balance" }}>We build tools, not campaigns.</h3>
              <p style={{ fontSize: "15px", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
                Ads and social posts work while you&apos;re paying for them &mdash; the moment you stop, they stop. We build things that <i>keep on</i> working: AI that answers every lead, finds your bids, asks for reviews on autopilot, and more. You end up owning an advantage, not just renting attention month to month.
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.09)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "13px", background: "rgba(128,255,128,.06)", border: "1px solid rgba(128,255,128,.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(128,255,128,.12)" }}>
                <PhoneIcon stroke="#80ff80" />
              </div>
              <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(20px,1.6vw,24px)", lineHeight: 1.3, color: "#fafafa", margin: 0, textWrap: "balance" }}>You work with me. And I answer.</h3>
              <p style={{ fontSize: "15px", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
                No offshore team. No ticket queue. You get a local partner in Bakersfield you can call, text, or meet for coffee. Small on purpose &mdash; so nothing about your business falls through the cracks. And, as&nbsp;Catalyst grows, you&apos;ll continue to receive the same VIP treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4 : PHILOSOPHY BAND ============ */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "clamp(90px,11vw,150px) clamp(20px,5vw,64px)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "820px", height: "820px", maxWidth: "130vw", background: "radial-gradient(circle,rgba(128,0,255,.2),transparent 64%)", filter: "blur(24px)", pointerEvents: "none", animation: "floatY 12s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>How we think</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(42px,5.2vw,84px)", lineHeight: 0.92, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
            We don&rsquo;t sell marketing.<br />We sell outcomes.
          </h2>
          <p style={{ fontSize: "clamp(16px,1.25vw,18px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, maxWidth: "620px", textWrap: "pretty" }}>
            You don&rsquo;t care if we give you a website or stand on a street corner waving a sign. You care about getting more well-qualified jobs, commanding premium prices, and taking time off to spend with your family. You care about your company running smoothly and scaling, even while you&apos;re away.<br /><br />That&rsquo;s what we provide. Everything we build is just how we get you there.
          </p>
          <p style={{ fontSize: "clamp(15.5px,1.15vw,17px)", fontStyle: "italic", color: "#b56bff", lineHeight: 1.7, margin: "8px 0 0", maxWidth: "580px", textWrap: "pretty" }}>
            You didn&rsquo;t build the engine in your truck &mdash; you bought one from a company that builds engines. Let&nbsp;Catalyst build your growth engine, so you can enjoy driving it.
          </p>
        </div>
      </section>

      {/* ============ SECTION 5 : THE QUALIFIER ============ */}
      <section style={{ position: "relative", padding: "clamp(70px,8vw,110px) clamp(20px,5vw,64px)" }}>
        <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto", background: "linear-gradient(180deg,rgba(128,0,255,.10),rgba(128,0,255,.03)),rgba(255,255,255,.02)", border: "1px solid rgba(128,0,255,.45)", borderRadius: "20px", padding: "clamp(40px,5vw,64px) clamp(26px,4vw,56px)", boxShadow: "0 0 60px rgba(128,0,255,.12)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#b56bff" }}>Let&rsquo;s be straight</div>
          <h2 style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontWeight: 400, textTransform: "uppercase", fontSize: "clamp(38px,4.4vw,68px)", lineHeight: 0.94, letterSpacing: "1px", color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Looking for a yes-man? You&rsquo;re in the wrong place.
          </h2>
          <p style={{ fontSize: "clamp(15.5px,1.2vw,17.5px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, maxWidth: "640px", textWrap: "pretty" }}>
            If you want someone to nod at every idea and send an invoice, there are cheaper options. If you want a partner who&rsquo;ll tell you the truth &mdash; even when it&rsquo;s not what you hoped to hear &mdash; that&rsquo;s Catalyst. Because your company&apos;s success is the only thing that keeps us both in business.
          </p>
          <button
            aria-expanded={open1}
            onClick={() => setOpen1((v) => !v)}
            style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "none", border: "none", padding: 0, fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontWeight: 600, color: "#b56bff", cursor: "pointer" }}
          >
            <span style={{ fontSize: "15px", lineHeight: 1 }}>&oplus;</span> Why we&rsquo;re picky
          </button>
          {open1 && (
            <div style={{ borderLeft: "2px solid #8000ff", padding: "4px 0 4px 18px", maxWidth: "560px", textAlign: "left", animation: "panelIn .42s cubic-bezier(.4,0,.2,1)" }}>
              <p style={{ fontSize: "14px", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
                We only take clients we can actually move the needle for. We say no to the wrong fit, deliver hard for the right one. That&rsquo;s how we build&nbsp;<i>lasting</i> relationships.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ============ SECTION 6 : FINAL CTA ============ */}
      <section style={{ position: "relative", textAlign: "center", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,64px) clamp(90px,11vw,140px)" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#00d4ff" }}>Let&rsquo;s talk</div>
          <h2 style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.25, color: "#fafafa", margin: 0, textWrap: "balance" }}>
            Let&rsquo;s dig your competitive moat.
          </h2>
          <p style={{ fontSize: "clamp(15.5px,1.1vw,17px)", color: "#c8c8c8", lineHeight: 1.7, margin: 0, textWrap: "pretty" }}>
            The wider we build it, the harder you are to touch.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "10px" }}>
            <Link href="/contact" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#8000ff,#5600ab)", border: "none", padding: "16px 30px", borderRadius: "11px", boxShadow: "0 10px 34px rgba(128,0,255,.4)", cursor: "pointer", textDecoration: "none" }}>
              Book a 15-Minute Call <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
            <Link href="/pricing" className="cta-full" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "48px", fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", fontWeight: 600, color: "#fafafa", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.18)", padding: "16px 28px", borderRadius: "11px", cursor: "pointer", textDecoration: "none" }}>
              See the Plans <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
          </div>
          <p style={{ fontSize: "13px", color: "#7f8896", margin: "4px 0 0" }}>Free, no obligation. You own everything we build.</p>
        </div>
      </section>
    </div>
  );
}
