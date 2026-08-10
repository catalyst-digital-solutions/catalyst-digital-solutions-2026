import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Martin Refrigeration MEP — Launch Proposal | Catalyst Digital Solutions",
  description: "Brand launch and marketing program proposal.",
  robots: { index: false, follow: false, nocache: true },
};

export default function MartinProposalPage() {
  return (
    <div className={styles.root}>
      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="grid-bg"></div>
        <div className="blob"></div>
        <div className="wrap">
          <span className="eyebrow">Prepared for Martin &nbsp;·&nbsp; August 8, 2026 &nbsp;·&nbsp; Catalyst Digital Solutions</span>
          <h1>Martin Refrigeration<br />MEP<span>Launch Proposal</span></h1>
          <div className="hero-rule"></div>
          <p className="hero-sub">You asked me two questions on the phone. This answers both of them at once — one signature, one price, one build.</p>
      
          <div className="meta-strip">
            <div><span>Engagement</span><b>Brand launch + build</b></div>
            <div><span>Timeline</span><b>45 days to live</b></div>
            <div><span>Term</span><b>6 months minimum</b></div>
            <div><span>Website build fee</span><b>$5,000 → waived</b></div>
            <div><span>Offer holds until</span><b>Fri, Aug 14, 2026</b></div>
          </div>
        </div>
      </header>
      
      {/* ============ 01 THE TWO QUESTIONS ============ */}
      <section>
        <div className="wrap narrow">
          <span className="eyebrow">01 — What you actually asked me</span>
          <h2>Two goals.<br />One build.</h2>
      
          <p className="lead">On our call you told me two things. First, you want to move up-market. Your website still shows you primarily working on ice machines, but you've told me you're pushing toward MEP prime work and high-ticket chiller installs almost exclusively — where a single small unit runs seven figures. Second, you want to learn marketing well enough to run an agency of your own.</p>
      
          <p>Most people would sell you two things: a marketing retainer for the first, a consulting retainer for the second. You'd pay twice, and you'd get a classroom with no jobsite.</p>
      
          <p>I'd rather do it the way tradesmen actually learn. <strong>I build the marketing machine for Martin Refrigeration MEP, and you stand next to me while I do it.</strong> Every system I build, you get the written procedure for it — what I did, in what order, with what tools, and why the obvious alternative doesn't work. At the end you own a launched company and a playbook you can run again on somebody else's business.</p>
      
          <p><strong>And on the partnership question — I haven't forgotten it.</strong> I'd rather earn that than assume it. Let me build something real on your own business first, in the open, where you can watch every decision I make and judge whether you'd want me as a true-to-form business partner. If it works, we'll have something worth talking about, and we'll be talking about it from evidence instead of a thirty-minute phone call. If it doesn't, you still own a launched company and everything I taught you along the way.</p>
      
          <p><strong>One more thing before the details.</strong> When I asked what you'd budget to learn marketing, you said $800 a month. Hold onto that number — I come back to it later in this document and show you exactly what it buys once it's pointed at the right thing.</p>
      
          <details className="depth">
            <summary>⊕ Why not just consult?</summary>
            <div className="depth-body">
              <p>Because consulting alone gives you theory you can't test. Four hours a month of me talking is one small piece of the marketing puzzle. We could spend years doing that and never finish. Four hours a month of me building your own site, your own Google profile, your own content engine — with your revenue on the line — is an apprenticeship. Same hours, completely different retention.</p>
              <p>It also keeps my incentives honest. If the marketing doesn't produce, I don't get to hide behind "well, you learned a lot."</p>
            </div>
          </details>
        </div>
      </section>
      
      {/* ============ 02 THE AUDIT ============ */}
      <section>
        <div className="wrap">
          <div className="narrow">
            <span className="eyebrow">02 — The audit</span>
            <h2>Before we talk<br />about what<br />to build</h2>
            <p className="lead">You said you thought your marketing was in decent shape. I want to show you what I found on 312refrigeration.com, because it changes what I'd recommend.</p>
            <p><strong>None of this is on you.</strong> You paid somebody to build a website and you had a business to run. This is what they shipped you, and it's still live today.</p>
          </div>
      
          <div className="narrow" style={{marginTop: '52px'}}>
            <h3 style={{fontSize: '24px', marginBottom: '8px'}}>Your homepage reviews belong to a competitor</h3>
            <p style={{color: 'var(--muted)', fontSize: '15px'}}>Northeast Cooling LLC, Round Lake IL. Owner: Mitch Byrne. Same market, same services.</p>
      
            <div className="receipt" style={{marginTop: '26px'}}>
              <div className="receipt-head"><span className="who">northeastcooling.com — original</span><span className="tag">Source</span></div>
              <div className="receipt-body">"I've used <span className="stolen">Northeast Cooling</span> for a few years now for service and maintenance of my walk-in floral cooler. <span className="stolen">Mitch</span> is awesome. An honest guy who is upfront about pricing, and has even come in under estimate…"</div>
            </div>
      
            <div className="receipt">
              <div className="receipt-head"><span className="who">312refrigeration.com — your homepage</span><span className="tag">Copy</span></div>
              <div className="receipt-body">"I've used <span className="stolen">Northeast Cooling</span> for a few years now for service and maintenance of my walk-in floral cooler. <span className="swap">Martin</span> is awesome. An honest guy who is upfront about pricing, and has even come in under estimate…"</div>
            </div>
      
            <p style={{marginTop: '24px'}}>Your competitor's company name is printed on your homepage, inside a review of you. In another testimonial on the same page the name flips mid-paragraph — <span className="swap">Martin</span> has worked on it twice now in one sentence, <span className="swap">Mitch</span> gets my highest recommendation in the next. Somebody ran find-and-replace and didn't finish. One of the reviews got pasted into the field twice, so the paragraph runs back to back.</p>
      
            <p>Your <code>/products/</code> page is Northeast Cooling's equipment page with the words shuffled.</p>
      
            <details className="depth">
              <summary>⊕ Why this has to come down first</summary>
              <div className="depth-body">
                <p>Two reasons, and only one of them is about pride.</p>
                <p><strong>Legal.</strong> Publishing fabricated reviews is false advertising under the FTC Act, and states enforce it separately. Copying a competitor's page copy is its own copyright problem. Northeast Cooling is not a sleepy operation — they've published content since 2009 and they're running an active SEO program right now. They can find this. Better it's gone before they do.</p>
                <p><strong>Commercial.</strong> You want to bid MEP prime work. A GC's procurement lead or a facilities director will look you up. If five minutes of searching shows them your reviews were lifted from another company, you don't lose the bid on price — you lose it on trust. And to make it worse, nobody tells you why. Trust takes years to build and seconds to destroy.</p>
              </div>
            </details>
          </div>
      
          <div className="narrow" style={{marginTop: '56px'}}>
            <h3 style={{fontSize: '24px', marginBottom: '22px'}}>The rest of what's live right now</h3>
      
            <div className="finding"><div className="n">01</div><div>
              <h4>A page of placeholder text has been public since October 2024</h4>
              <p><code>/service-area/</code> is the unedited demo template. Six blocks of Latin filler under headings like "Business Coaching" and "Business Development," plus three fake reviews from "Lara Smith," "Shirley Paul" and "Rita Beck" praising a business-coaching brand called <em>“Woman In Lead.”</em> Google has it indexed, and it actively undermines every trust signal you're trying to send. Google's whole job is to show people the best result — if it didn't, people would stop using it — and this page signals the opposite. Worse, a customer running a branded search for 312 Refrigeration directly can land on it.</p>
            </div></div>
      
            <div className="finding"><div className="n">02</div><div>
              <h4>Your developer's private notes are published on your site</h4>
              <p><code>/arch/</code> is a scratch page containing "Unable to find user," a screenshot, and a freelancer's personal Discord handle and Gmail address. Live, indexed, last touched March 2025.</p>
            </div></div>
      
            <div className="finding"><div className="n">03</div><div>
              <h4>Every service link on your homepage goes nowhere</h4>
              <p>All the service cards point at <code>#</code>. The service pages exist — nothing links to them. Google reads that as a site with no structure. A visitor reads it as broken.</p>
            </div></div>
      
            <div className="finding"><div className="n">04</div><div>
              <h4>Your own company name is misspelled in two page titles</h4>
              <p><code>/services/</code> and <code>/products/</code> both read <strong>"-321 Refrigeration"</strong> in the browser tab and in Google's search results. Your logo file is named <code>123Ref_logo.webp</code>. The footer still says © 2024.</p>
            </div></div>
      
            <div className="finding"><div className="n">05</div><div>
              <h4>Your experience claim contradicts itself</h4>
              <p>The search description says 25+ years. The body copy says 10+. The 25 came over with the copied content — it's Mitch's number. Ten-plus is yours, it's true, and it's plenty.</p>
            </div></div>
      
            <div className="finding"><div className="n">06</div><div>
              <h4>Google thinks you're four different businesses</h4>
              <p>Rolling Meadows on your site and Yelp. Chicago 60614 on MapQuest. Melrose Park on one directory. Carol Stream on the BBB. Every mismatched address splits your local ranking authority across listings that are competing with each other.</p>
            </div></div>
      
            <div className="finding"><div className="n">07</div><div>
              <h4>Your Google profile is filed under the wrong trade</h4>
              <p>Primary category is <strong>HVAC contractor</strong>. You're not an HVAC contractor — you're commercial refrigeration moving into MEP. That one field decides which searches you're eligible to appear in at all. And your business description is the copied "over 25 years" paragraph.</p>
            </div></div>
      
            <div className="finding"><div className="n">08</div><div>
              <h4>What's missing entirely</h4>
              <p>No emergency or after-hours message. No maintenance-contract offer. No project photos and no client names, after ten years of work. The site claims Illinois and Wisconsin, then lists three towns.</p>
            </div></div>
          </div>
      
          <div className="narrow" style={{marginTop: '40px'}}>
            <p className="lead">This is why I'm proposing a launch instead of a repair. There's nothing here worth saving — and you were already planning to launch a new brand anyway.</p>
          </div>
        </div>
      </section>
      
      {/* ============ 03 POSITIONING GAP ============ */}
      <section>
        <div className="grid-bg" style={{opacity: '.5'}}></div>
        <div className="wrap narrow">
          <span className="eyebrow">03 — The money problem</span>
          <h2>Your website is<br />fishing for the<br />cheapest job<br />you do</h2>
      
          <p className="lead">Your page title, your main headline and your search description all lead with the same three words: <strong>ice machine repair</strong>.</p>
      
          <div className="scale">
            <div className="small">
              <div className="num">$300</div>
              <span className="lbl">Typical ice machine call</span>
            </div>
            <div className="vs">vs.</div>
            <div className="big">
              <div className="num">$2M</div>
              <span className="lbl">Small chiller — your number</span>
            </div>
          </div>
      
          <p style={{marginTop: '40px'}}>Every signal you're sending Google is tuned to catch the three-hundred-dollar job. That's not a small mistake. It means the buyer you want — a facilities director, a property manager, a GC putting an MEP package out to bid — has no way to find you, because you're not saying any of the words they type.</p>
      
          <p><strong>Martin Refrigeration MEP fixes that at the root.</strong> New name, new positioning, built from the first line of code to be found by people spending six and seven figures. 312 Refrigeration keeps running exactly as it is for the service work. The new brand goes after the work you actually want.</p>
      
          <details className="depth">
            <summary>⊕ What happens to my Google reviews?</summary>
            <div className="depth-body">
              <p>They come with you. This is the part most people get wrong, and getting it wrong is expensive.</p>
              <p>You have thirteen reviews spanning four years, with your own responses on them. That history carries real ranking weight and it cannot be transferred to a new listing. So we don't create a new listing — we <strong>rename and re-categorize the existing profile</strong>, then update the description, service list and address. The whole review history stays attached. Starting a fresh profile would throw away four years of trust and put you at the back of the line in the map pack.</p>
            </div>
          </details>
        </div>
      </section>
      
      {/* ============ 04 COMPETITOR ============ */}
      <section>
        <div className="wrap narrow">
          <span className="eyebrow">04 — What the other guy is doing</span>
          <h2>Northeast Cooling<br />started in April</h2>
      
          <p className="lead">The same company your reviews were copied from hired someone. In April 2026 they published a page called <em className="hl">commercial chiller repair near me</em>. Since then they've shipped a new article every two days without missing one.</p>
      
          <p>Roughly fifty pages in four months. Chiller repair. Industrial refrigeration. Commercial freezer service. Labor-rate transparency. They also publish their exact hourly rates, hold EPA certification and an ENERGY STAR partnership, and their owner's name and face are on LinkedIn and in a Chicago business interview.</p>
      
          <p><strong>They are building the exact search real estate you want, right now, while you decide.</strong> Every one of those pages gets older and stronger every week. You will never catch up — if you don't start.</p>
      
          <details className="depth">
            <summary>⊕ Can we beat a two-day publishing cadence?</summary>
            <div className="depth-body">
              <p>Yes, and not by working harder. Their cadence is one post every 48 hours, one at a time.</p>
              <p><strong>Programmatic pages don't work that way.</strong> We generate the entire location-by-service matrix in a single build. Picture ranking for all of these at once:</p>
              <p style={{fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--cyan)', lineHeight: 2}}>
                chiller installation in Rolling Meadows<br />
                chiller installation in Arlington Heights<br />
                freezer repair service in Schaumburg<br />
                freezer repair service in Elk Grove Village<br />
                <span style={{color: 'var(--muted)'}}>…and so on, across every service and every town you cover.</span>
              </p>
              <p>You cover in weeks what took them years.</p>
              <p>On top of that, we use AI to produce blog content at volume — well-researched, professional, error-free articles that give your customers something worth reading and give Google something worth ranking. That's how you stop catching up and start pulling ahead, both in traditional search results and in AI-generated answers.</p>
              <p style={{color: 'var(--muted)'}}>One note so there are no surprises: each program includes a set monthly content volume. If you want to push past it, additional blog and content production is available and billed separately — I'll quote it before a word gets written.</p>
            </div>
          </details>
        </div>
      </section>
      
      {/* ============ 05 THE BUILD ============ */}
      <section>
        <div className="wrap">
          <div className="narrow">
            <span className="eyebrow">05 — The build</span>
            <h2>45 days,<br />four phases</h2>
            <p className="lead">You said you're busy. Good — this is designed around that. Your total time commitment in the first month is about <strong>one hour</strong>.</p>
          </div>
      
          <div className="narrow" style={{marginTop: '40px'}}>
            <div className="phase">
              <div className="when">Days 1–3</div>
              <div>
                <h4>Intake and verification</h4>
                <p>One call, about an hour. Brand direction, service priorities, target buyer, and the documents listed further down. After this call I go quiet and work.</p>
              </div>
            </div>
            <div className="phase">
              <div className="when">Days 4–20</div>
              <div>
                <h4>Brand and website</h4>
                <p>Martin Refrigeration MEP identity, then a custom-built site on modern infrastructure — not a template. Written for chiller, MEP and commercial contract work instead of ice machines. Technical SEO, schema and conversion tracking built in from the start rather than bolted on later.</p>
              </div>
            </div>
            <div className="phase">
              <div className="when">Days 21–30</div>
              <div>
                <h4>Google and local authority</h4>
                <p>Profile rename and re-categorization with the review history preserved. Duplicate and wrong-address listings claimed or killed. Citations rebuilt so your name, address and phone match everywhere. Analytics and call tracking live. <strong>This is the phase that moves the phone first.</strong> <span style={{color: 'var(--muted)'}}>Some directory and citation corrections carry third-party fees; where they do, I'll quote them before purchase.</span></p>
              </div>
            </div>
            <div className="phase">
              <div className="when">Days 31–45</div>
              <div>
                <h4>Content engine and automation</h4>
                <p>Programmatic service and location pages go live. Video and clip production starts. Lead-response and review automation switch on as carrier registration clears. Competitor tracking begins, with Northeast Cooling and your other competitors monitored by name.</p>
              </div>
            </div>
            <div className="phase" style={{borderBottom: '1px solid rgba(255,255,255,.07)'}}>
              <div className="when">Ongoing</div>
              <div>
                <h4>The part you're actually buying</h4>
                <p>At the end of each phase you receive the written procedure for everything I just did. On Framework and above, we sit down on a screenshare and I walk you through it — what it does, why it's built that way, and where it breaks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ============ 06 TIERS ============ */}
      <section>
        <div className="wrap">
          <div className="narrow">
            <span className="eyebrow">06 — The three programs</span>
            <h2>Pick your<br />depth</h2>
            <p className="lead">Every program includes the full website build and the full launch. What changes is how much of the machine room I open up to you.</p>
            <p style={{fontSize: '15px', color: 'var(--muted)'}}>Each program includes everything in the one before it. You pay one price, not two.</p>
          </div>
      
          <div className="tiers">
      
            <div className="tier">
              <span className="tier-flag">&nbsp;</span>
              <div className="tier-name">Foundation</div>
              <div className="tier-line">Launch the brand. Get found. Read the manual on your own time.</div>
              <div className="tier-price">$1,497<sub>/mo</sub></div>
              <hr />
              <ul>
                <li className="key">Written SOP library — self-study
                  <small>The real procedures I run, in writing, delivered as each phase completes. Yours permanently. No walkthroughs and no Q&amp;A at this level — you read them and work it out on your own.</small></li>
                <li>Custom website for Martin Refrigeration MEP
                  <small>$5,000 build fee waived on the 6-month term</small></li>
                <li>On-page and technical SEO</li>
                <li>Google Business Profile rename, re-categorization and management
                  <small>Four years of reviews preserved</small></li>
                <li>Analytics and conversion tracking</li>
                <li>Monthly maintenance and performance report</li>
                <li>Instant acknowledgment on every form fill
                  <small>Email at launch; SMS added once your dedicated number clears carrier registration</small></li>
                <li>Monthly 30-minute report review call</li>
              </ul>
              <div className="tier-foot">
                <a className="btn-2" href="https://buy.stripe.com/8x200j0RS5VUbLqg8XfEk0f" style={{display: 'block', textAlign: 'center'}}>Start Foundation</a>
              </div>
            </div>
      
            <div className="tier featured">
              <span className="tier-flag">Recommended for you</span>
              <div className="tier-name">Framework</div>
              <div className="tier-line">Launch the brand and learn to build one, watching me while I do it.</div>
              <div className="tier-price">$2,997<sub>/mo</sub></div>
              <hr />
              <div className="inherits">Everything in Foundation, plus</div>
              <ul>
                <li className="key">4 hours a month of private mentoring and open Q&amp;A
                  <small>Screenshare walkthroughs of what I just built on your account, and an open floor — ask me anything, including about the agency you want to start</small></li>
                <li className="key">The real education, not the academic version
                  <small>Battle-tested marketing you couldn't buy from a $50,000-a-year university in four years, stripped down to only the parts that actually make money</small></li>
                <li className="key">My actual tool stack, vendor list and prompts
                  <small>What I use, what it costs, and what I stopped using and why</small></li>
                <li className="key">SOPs with commentary
                  <small>The same procedures, plus the reasoning and the mistakes you get to skip</small></li>
                <li>12–16 videos a month, plus 36–96 short clips
                  <small>Auto-distributed to YouTube, TikTok, Instagram and LinkedIn. Begins in Phase 4.</small></li>
                <li>Advanced SEO with keyword and competitor tracking
                  <small>Northeast Cooling monitored by name</small></li>
                <li>Local SEO and citation cleanup
                  <small>Fixes the four-address problem</small></li>
                <li>Programmatic SEO — hundreds of location and service pages</li>
                <li>AI-search visibility, schema saturation, LLMs.txt</li>
                <li>Call tracking with source attribution</li>
                <li>CRM setup with basic automation</li>
                <li>60-second lead response system
                  <small>Activates on carrier registration, typically 2–4 weeks in</small></li>
                <li>Automated review requests with negative-review flagging
                  <small>Same activation window</small></li>
              </ul>
              <div className="tier-foot">
                <a className="btn" href="https://buy.stripe.com/fZufZh6ccaca3eU5ujfEk0e" style={{display: 'block', textAlign: 'center'}}>Start Framework</a>
              </div>
            </div>
      
            <div className="tier">
              <span className="tier-flag">&nbsp;</span>
              <div className="tier-name">Landmark</div>
              <div className="tier-line">The one that actually matches the chiller goal. Here when you're ready for it.</div>
              <div className="tier-price">$7,997<sub>/mo</sub></div>
              <hr />
              <div className="inherits">Everything in Framework, plus</div>
              <ul>
                <li className="key">Bid and RFP aggregation
                  <small>Public solicitations and private bid boards filtered to your trade and radius, delivered daily</small></li>
                <li className="key">Monthly 60-minute strategy session
                  <small>The business behind the marketing — pricing, scoping, proposals</small></li>
                <li>20–30 videos a month, plus 60–180 clips</li>
                <li>24/7 AI voice agent — answers, qualifies, books</li>
                <li>Website chatbot trained on your services and projects</li>
                <li>Competitive intelligence with live ranking alerts</li>
                <li>Full automation suite — lead routing, sequences, proposal automation</li>
                <li>Priority support with a dedicated channel</li>
              </ul>
              <div className="tier-foot">
                <a className="btn-2" href="https://buy.stripe.com/bJe4gzeII986dTycWLfEk0g" style={{display: 'block', textAlign: 'center'}}>Start Landmark</a>
              </div>
            </div>
          </div>
      
          <div className="narrow" style={{marginTop: '44px'}}>
            <details className="depth">
              <summary>⊕ Straight answer on Landmark</summary>
              <div className="depth-body">
                <p>Here's what Landmark actually is. Every morning, before you've had coffee, a filtered list of live MEP and mechanical solicitations inside your radius is sitting in your inbox — public bids, private bid boards, GC invitations — already screened against your trade and your capacity. A voice agent answers the calls you miss at 11pm and books them. A chatbot that knows your project history answers the facilities director doing research on a Sunday. And once a month you and I sit down on the business itself: what to bid, what to walk away from, how to price it, how to write the proposal that wins it.</p>
                <p><strong>That is the tier that matches two-million-dollar chillers</strong> — because that work does not come from Google Maps. It comes from bid boards, GC invitations and public solicitations. Map-pack SEO wins you service contracts and emergency calls. Bid aggregation wins you MEP packages.</p>
                <p>And I'm still going to tell you not to buy it today. You don't yet have the brand, the site, the references or the case studies to bid that work — and pointing a firehose of solicitations at a company that can't answer them credibly just wastes your time and mine. Building the thing that can answer them is exactly what Foundation and Framework do. <strong>Landmark is where this goes in year two.</strong> I'd rather tell you that now than take the $7,997 today and watch it not work.</p>
              </div>
            </details>
          </div>
        </div>
      </section>
      
      {/* ============ 07 THE $800 MATH ============ */}
      <section>
        <div className="wrap narrow">
          <span className="eyebrow">07 — Your number, run forward</span>
          <h2>You said $800.<br />You were right.</h2>
      
          <p className="lead">When I asked what you'd budget to learn marketing, you said $800 a month. I told you my rate runs $150–200 an hour, so that's about four hours — not enough on its own to teach you the job. That's still true.</p>
      
          <p>But don't throw the number away. <strong>Keep it, and look at what the rest of Framework buys.</strong></p>
      
          <div className="math">
            <div className="math-row">
              <span className="l">Four hours a month of one-on-one instruction<br /><span style={{color: 'var(--muted)', fontSize: '14px'}}>The budget you already named</span></span>
              <span className="r">$800</span>
            </div>
            <div className="math-row">
              <span className="l">Custom website build, waived<br /><span style={{color: 'var(--muted)', fontSize: '14px'}}>$5,000 spread across the six-month term</span></span>
              <span className="r">$833</span>
            </div>
            <div className="math-row">
              <span className="l">Brand launch, SEO, Google Maps, content engine, automation, call tracking, competitor monitoring<br /><span style={{color: 'var(--muted)', fontSize: '14px'}}>Everything else in the program</span></span>
              <span className="r">$1,364</span>
            </div>
            <div className="math-total">
              <span className="l">Framework</span>
              <span className="r">$2,997 / mo</span>
            </div>
          </div>
      
          <p>You were ready to spend $800 a month <em className="hl">just to learn</em>. For the difference, you get the same four hours <strong>and</strong> a fully launched, properly branded, properly marketed company built to close multi-million-dollar contracts — built in front of you, so you know how to do it for somebody else.</p>
      
          <p style={{fontSize: '15.5px', color: 'var(--muted)'}}>The same math on Foundation: $833 of the $1,497 is the website. The entire marketing program runs $664 a month. There's no live instruction at that level — you get the written procedures and work through them yourself.</p>
        </div>
      </section>
      
      {/* ============ 08 WHY NOW ============ */}
      <section>
        <div className="wrap narrow">
          <span className="eyebrow">08 — On waiting two months</span>
          <h2>Waiting doesn't<br />save money.<br />It delays<br />the payoff</h2>
      
          <p className="lead">You mentioned starting in a couple of months because you're slammed. Here's the case for starting this week, and none of it is pressure — it's calendar math.</p>
      
          <div className="grid-2" style={{marginTop: '34px', gap: '20px'}}>
            <div className="card">
              <h3>Being busy is the argument <em style={{fontStyle: 'italic', color: 'var(--purple-light)'}}>for</em> starting now, not against it</h3>
              <p style={{fontSize: '15px', marginBottom: 0}}>One hour of intake, then I disappear and work. The build costs you almost no time. Starting later doesn't reduce your workload — it just pushes the finish line farther away. Starting sooner means the program is ready by the time <em>you</em> are.</p>
            </div>
            <div className="card">
              <h3>SEO pays out 90 days late</h3>
              <p style={{fontSize: '15px', marginBottom: 0}}>Start now, the phone changes in November, right when fall contract season lands and you have room. Start in October, nothing moves until January. The cost is identical. Only the payoff moves.</p>
            </div>
            <div className="card">
              <h3>Northeast Cooling doesn't pause</h3>
              <p style={{fontSize: '15px', marginBottom: 0}}>They publish every two days whether you start or not. Sixty days of waiting is thirty more of their pages aging and getting stronger on the search terms you want.</p>
            </div>
            <div className="card">
              <h3>The credibility problem is live today</h3>
              <p style={{fontSize: '15px', marginBottom: 0}}>The copied reviews and your developer's Gmail address are public right now, on the site anyone checking you out will find. That isn't something to schedule for later. It's exposure, and it needs closing now.</p>
            </div>
          </div>
      
          <p style={{marginTop: '38px'}}><strong>And one more, since you want to build an agency.</strong> The first thing any prospective client of yours will do is look at what you've built. Right now that's a site with a competitor's name in the reviews and a page of Latin filler. Martin Refrigeration MEP isn't only a refrigeration brand — it's the first thing in your portfolio.</p>
      
          <div className="deadline">
            <span className="eyebrow">Why there's a date on this</span>
            <p>I run a limited number of 45-day builds at a time and I'm scheduling the fall block now. <strong>The waived $5,000 website build holds through Friday, August 14, 2026.</strong> After that the offer stands, but the build fee comes back and the start date moves to the next open slot. That's a scheduling constraint, not a sales tactic — I'd tell you the same thing if you called me in October.</p>
          </div>
        </div>
      </section>
      
      {/* ============ 09 TERMS ============ */}
      <section>
        <div className="wrap">
          <div className="narrow">
            <span className="eyebrow">09 — Terms</span>
            <h2>Plain terms,<br />no surprises</h2>
          </div>
      
          <div className="grid-2" style={{marginTop: '38px'}}>
            <div className="card">
              <h3>The agreement</h3>
              <ul className="terms">
                <li>Six-month minimum term. After that it's month to month — cancel any time.</li>
                <li>First month due at signature. Not at kickoff, not at launch.</li>
                <li><strong>Automatic recurring billing.</strong> Card or bank account on file, charged the same day each month. No invoices, no check chasing, no thirty-day terms. This is how I run every account and it's the first thing I'll tell you to do in your own agency — recurring revenue is the entire difference between a business and a series of favors.</li>
                <li>No setup fee. The first month covers onboarding and deployment.</li>
                <li>If you ever run paid ads, that budget is separate and paid on your own card.</li>
              </ul>
            </div>
            <div className="card">
              <h3>What you own</h3>
              <ul className="terms">
                <li>The domain, the hosting and every Google account are in your name. I'm added as a user, and you can remove me.</li>
                <li>Website ownership vests fully after six consecutive paid months. That's what the waived $5,000 build fee is — not a discount, something you earn by completing the term.</li>
                <li>If you'd rather not take the waiver, or the August 14 date passes, you can simply buy the site outright for $5,000. It's yours the day that clears, with no term attached.</li>
                <li>Every SOP I write is yours permanently — including if you leave.</li>
                <li>If you cancel inside the six months, the waived $5,000 build fee becomes due and ownership doesn't transfer until it's paid. The site stays live and running on my account in the meantime. You keep every SOP and everything you learned either way — I can't take that back and I wouldn't want to.</li>
              </ul>
            </div>
          </div>
      
          <div className="narrow" style={{marginTop: '34px'}}>
            <details className="depth">
              <summary>⊕ Why I want the accounts in your name</summary>
              <div className="depth-body">
                <p>Because the version of this business where the agency holds the client's domain and Google account is the version where the client can't leave. I don't want that leverage, and you shouldn't accept it from anyone.</p>
                <p>It's also the first lesson of the agency you're building: <strong>the client owns the asset, you own the relationship.</strong> If the only reason someone stays is that you're holding their login, you don't have a business — you have a hostage.</p>
              </div>
            </details>
          </div>
        </div>
      </section>
      
      {/* ============ 10 WHAT I NEED ============ */}
      <section>
        <div className="wrap narrow">
          <span className="eyebrow">10 — Before day one</span>
          <h2>What I need<br />from you</h2>
      
          <p className="lead">Standard onboarding. Most of it you can send in five minutes from your phone.</p>
          <p style={{fontSize: '15.5px', color: 'var(--muted)'}}>And if you want to see the whole picture of what these programs do before you commit — every service, fully spelled out — it's all on <a href="https://catalyst-digital-solutions.com">catalyst-digital-solutions.com</a>. The end state I'm aiming at for you is simple: when a GC in your area needs an MEP prime, <strong style={{color: 'var(--heading)'}}>you are the only name that comes up, and the only one that looks like the obvious choice.</strong></p>
      
          <div className="finding" style={{borderTop: '1px solid rgba(255,255,255,.06)'}}><div className="n">01</div><div>
            <h4>Legal entity name</h4>
            <p>The exact name that goes on the agreement and the invoices. If Martin Refrigeration MEP will be a new entity or an assumed name, tell me and I'll build the brand to match it.</p>
          </div></div>
          <div className="finding"><div className="n">02</div><div>
            <h4>Certificate of insurance, license and EPA 608</h4>
            <p>These go on the site. Commercial and MEP buyers look for them, and pages that display them convert better than pages that don't.</p>
          </div></div>
          <div className="finding"><div className="n">03</div><div>
            <h4>Three recent projects</h4>
            <p>Scope, rough contract value, and the GC or owner if you can name them. This is the raw material for case studies, and case studies are what win bid invitations. I can't write about work I can't see.</p>
          </div></div>
          <div className="finding"><div className="n">04</div><div>
            <h4>Photos</h4>
            <p>Whatever's on your phone. Equipment, installs, your truck, you on a roof. Ten years of work and there isn't one real photo on your current site — that's a bigger loss than it sounds.</p>
          </div></div>
          <div className="finding"><div className="n">05</div><div>
            <h4>Access</h4>
            <p>Domain registrar login, Google Business Profile owner access, and the current site's hosting. You keep ownership of all three.</p>
          </div></div>
        </div>
      </section>
      
      {/* ============ CLOSE ============ */}
      <section className="close" id="sign">
        <div className="blob"></div>
        <div className="wrap narrow">
          <span className="eyebrow">Next step</span>
          <h2 style={{marginBottom: '26px'}}>One click.<br />That's the<br />whole thing.</h2>
          <p className="lead" style={{maxWidth: '56ch'}}>Pick your program below. First month is charged at signature, the agreement lands in your inbox within the hour, and we book the intake call inside 48 hours. Site live in 45 days.</p>
      
          <div style={{display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', margin: '34px auto 14px', maxWidth: '760px'}}>
            <a className="btn" href="https://buy.stripe.com/fZufZh6ccaca3eU5ujfEk0e">Start Framework — $2,997/mo →</a>
            <a className="btn-2" href="https://buy.stripe.com/8x200j0RS5VUbLqg8XfEk0f">Start Foundation — $1,497/mo</a>
            <a className="btn-2" href="https://buy.stripe.com/bJe4gzeII986dTycWLfEk0g">Start Landmark — $7,997/mo</a>
          </div>
          <p style={{maxWidth: '56ch', color: 'var(--muted)', fontSize: '14px'}}>Card or bank transfer. Payment method stays on file and bills automatically each month. Six-month minimum, then month to month.</p>
      
          <p style={{maxWidth: '56ch', color: 'var(--muted)', fontSize: '15.5px', marginTop: '24px'}}>If something in here doesn't fit, tell me which part and I'll adjust it. I'd rather build the right thing than the thing I wrote on a Friday. <a href="mailto:mario@catalyst-digital-solutions.com?subject=Martin%20Refrigeration%20MEP%20%E2%80%94%20question">Email me</a> or call (661) 888-4837.</p>
      
          <div className="sig">
            <b>Mario Garza &nbsp;·&nbsp; Catalyst Digital Solutions, LLC</b><br />
            4012 Foxwood St, Bakersfield, CA 93306 &nbsp;·&nbsp; (661) 888-4837<br />
            Monday–Friday, 8:00 AM – 6:00 PM PT &nbsp;·&nbsp; catalyst-digital-solutions.com<br />
            Prepared August 8, 2026 &nbsp;·&nbsp; Terms hold through August 14, 2026
          </div>
        </div>
      </section>
    </div>
  );
}
