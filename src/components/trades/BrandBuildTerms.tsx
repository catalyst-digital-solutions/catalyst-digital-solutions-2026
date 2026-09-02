"use client";

import { useEffect, useState } from "react";

/**
 * Terms of Service v1.0 + Schedule A v1.5 (Brand Build) + Schedule B v1.4 (Brand Starter).
 * Ported from branding-and-website-landing-page/Terms & Conditions Page/Terms of Service.dc.html
 * Legal copy — do not edit wording without Mario's approval.
 */

const h2Style: React.CSSProperties = {
  font: "700 22px/1.3 var(--font-inter), sans-serif",
  color: "#8000ff",
  margin: "40px 0 14px",
};

const hrStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e6e6e6",
  margin: "32px 0",
};

const tocLabelStyle: React.CSSProperties = {
  margin: "16px 0 6px",
  font: "600 11px var(--font-inter), sans-serif",
  color: "#7f8896",
  letterSpacing: ".5px",
  textTransform: "uppercase",
};

const tocListStyle: React.CSSProperties = {
  listStyle: "none",
  margin: "0 0 20px",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 9,
  fontSize: 14,
  lineHeight: 1.4,
};

export default function BrandBuildTerms() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:860px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      className="bbterms"
      style={{
        background: "#f8f8f8",
        minHeight: "100vh",
        fontFamily: "var(--font-inter), sans-serif",
        color: "#1a1a1a",
      }}
    >
      <style>{`
        .bbterms a { color: #8000ff; text-decoration: none; }
        .bbterms a:hover { color: #5600ab; text-decoration: underline; }
        .bbterms { scroll-behavior: smooth; }
        @media print {
          .bbterms header, .bbterms nav[aria-label="Table of contents"], .bbterms .bbterms-back { display: none !important; }
          .bbterms .bbterms-grid { display: block !important; }
          .bbterms article { max-width: 100% !important; }
        }
      `}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "#ffffff",
          borderBottom: "1px solid #e6e6e6",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 32px",
        }}
      >
        <a href="https://getbranded.catalyst-digital-solutions.com" style={{ display: "block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/trades/cds-wordmark.png"
            alt="Catalyst Digital Solutions"
            style={{ width: 150, height: "auto", display: "block" }}
          />
        </a>
      </header>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 32px 0",
        }}
      >
        <a
          href="/trades"
          className="bbterms-back"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            font: "600 15px var(--font-inter), sans-serif",
            color: "#8000ff",
            textDecoration: "none",
          }}
        >
          <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>←</span>
          Back to Website &amp; Branding Bundle
        </a>
      </div>

      <div
        className="bbterms-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 32px 96px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <nav
          aria-label="Table of contents"
          style={
            isMobile
              ? { marginBottom: 8 }
              : {
                  position: "sticky",
                  top: 88,
                  maxHeight: "calc(100vh - 120px)",
                  overflowY: "auto",
                }
          }
        >
          <details
            open={!isMobile}
            style={
              isMobile
                ? {
                    background: "#ffffff",
                    border: "1px solid #e6e6e6",
                    borderRadius: 10,
                    padding: "14px 16px",
                  }
                : undefined
            }
          >
            <summary
              style={
                isMobile
                  ? {
                      font: "600 14px var(--font-inter), sans-serif",
                      color: "#1a1a1a",
                      cursor: "pointer",
                    }
                  : {
                      font: "600 12px var(--font-inter), sans-serif",
                      color: "#7f8896",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      listStyle: "none",
                      cursor: "default",
                    }
              }
            >
              Table of contents
            </summary>
            <p style={tocLabelStyle}>Terms of Service</p>
            <ol style={tocListStyle}>
              <li><a href="#1">1. How this agreement is put together</a></li>
              <li><a href="#2">2. Versions</a></li>
              <li><a href="#3">3. Which document wins if they conflict</a></li>
              <li><a href="#4">4. Price and payment</a></li>
              <li><a href="#5">5. Ongoing services and recurring charges</a></li>
              <li><a href="#6">6. What we need from you</a></li>
              <li><a href="#7">7. Intellectual property</a></li>
              <li><a href="#8">8. Revisions and approvals</a></li>
              <li><a href="#9">9. Refunds and cancellation</a></li>
              <li><a href="#10">10. Confidentiality</a></li>
              <li><a href="#11">11. No guarantee of results</a></li>
              <li><a href="#12">12. Limitation of liability</a></li>
              <li><a href="#13">13. Third-party services</a></li>
              <li><a href="#14">14. Content and compliance</a></li>
              <li><a href="#15">15. Termination</a></li>
              <li><a href="#16">16. Governing law and disputes</a></li>
              <li><a href="#17">17. Everything else</a></li>
              <li><a href="#sec-contact">Questions</a></li>
            </ol>
            <p style={{ ...tocLabelStyle, margin: "0 0 6px" }}>Schedule A</p>
            <ol style={{ ...tocListStyle, margin: 0 }}>
              <li><a href="#A.1">A.1 What&rsquo;s included</a></li>
              <li><a href="#A.2">A.2 What&rsquo;s not included</a></li>
              <li><a href="#A.3">A.3 Statement of Work</a></li>
              <li><a href="#A.4">A.4 Payment</a></li>
              <li><a href="#A.5">A.5 Timeline and process</a></li>
              <li><a href="#A.6">A.6 Care Plan</a></li>
              <li><a href="#A.7">A.7 What you own, and when</a></li>
              <li><a href="#A.8">A.8 Limited slots and pricing</a></li>
              <li><a href="#A.9">A.9 Uniqueness</a></li>
              <li><a href="#A.10">A.10 Your responsibilities</a></li>
            </ol>
            <p style={{ ...tocLabelStyle, margin: "16px 0 6px" }}>Schedule B</p>
            <ol style={{ ...tocListStyle, margin: 0 }}>
              <li><a href="#B.1">B.1 What this purchase is</a></li>
              <li><a href="#B.2">B.2 What is delivered</a></li>
              <li><a href="#B.3">B.3 What you own</a></li>
              <li><a href="#B.3a">B.3a Refunds</a></li>
              <li><a href="#B.3b">B.3b Direction selection and revisions</a></li>
              <li><a href="#B.3c">B.3c Preview hosting period</a></li>
              <li><a href="#B.4">B.4 Credit toward the full build</a></li>
              <li><a href="#B.5">B.5 Timeline and delivery promise</a></li>
              <li><a href="#B.6">B.6 Chat assistant vs. phone AI</a></li>
              <li><a href="#B.7">B.7 Care Plan</a></li>
            </ol>
          </details>
        </nav>

        <article style={{ maxWidth: 720, fontSize: 16, lineHeight: 1.7, color: "#2b2b2b" }}>
          <h1 style={{ font: "700 34px/1.25 var(--font-inter), sans-serif", color: "#1a1a1a", margin: "0 0 8px" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 14, color: "#6b6b6b", margin: "0 0 32px" }}>
            Version 1.0 &nbsp;&middot;&nbsp; Effective date: August 17, 2026 &nbsp;&middot;&nbsp; Last updated: August 17, 2026
          </p>

          <p>
            These Terms of Service (the &ldquo;Terms&rdquo;) govern your purchase of services from{" "}
            <strong>Catalyst Digital Solutions, LLC</strong> (&ldquo;Catalyst,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;), a California limited liability company located at 4012 Foxwood St, Bakersfield, CA 93306.
          </p>
          <p>
            By completing a purchase, signing a Statement of Work, or accepting these Terms at checkout, you
            (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) agree to be bound by them.
          </p>
          <p>
            These Terms are written for business customers. If you are purchasing on behalf of a company, you represent
            that you have authority to bind that company.
          </p>

          <hr style={hrStyle} />

          <h2 id="1" style={h2Style}>1. How this agreement is put together</h2>
          <p>Your agreement with us is made up of the following documents:</p>
          <p><strong>These Terms</strong> — the baseline rules that apply to every purchase.</p>
          <p>
            <strong>The applicable Schedule</strong> — offer-specific terms for the particular program or package you
            bought. Schedules appear at the bottom of this page. The Schedule that applies to you is the one named on
            your checkout page, invoice, or Statement of Work.
          </p>
          <p>
            <strong>Your Statement of Work, proposal, or order form</strong>, if we signed one — the specific scope,
            price, and dates for your project.
          </p>
          <p><strong>Any signed change order</strong> that modifies the above.</p>
          <p>
            Each Schedule on this page is incorporated into these Terms by reference and forms part of your agreement
            when it applies to your purchase.
          </p>

          <h2 id="2" style={h2Style}>2. Versions</h2>
          <p>
            We may update these Terms. <strong>Changes apply only to purchases made after the updated version is
            posted.</strong> The version in effect on the date you paid or signed governs your project for its duration.
            Each version carries a version number and effective date at the top of this page.
          </p>
          <p>
            Material changes to an active project — scope, price, payment schedule, intellectual property, or recurring
            billing — require your written approval. We will not change them by posting a new version of these Terms.
          </p>

          <h2 id="3" style={h2Style}>3. Which document wins if they conflict</h2>
          <p>
            We interpret all of the documents together and give effect to each wherever reasonably possible. If there is
            a genuine conflict that cannot be reconciled, the following order controls, and only to the extent of that
            conflict:
          </p>
          <p>
            1. A written change order signed by both parties<br />
            2. Your signed Statement of Work, proposal, or order form<br />
            3. The applicable Schedule on this page<br />
            4. These Terms<br />
            5. Any invoice, receipt, checkout page, marketing page, email, or other informational material
          </p>
          <p>
            A payment receipt or checkout confirmation confirms that a transaction happened. It does not change your
            agreement unless it says so explicitly and we both agree in writing.
          </p>

          <h2 id="4" style={h2Style}>4. Price and payment</h2>
          <p>Prices are stated at checkout or in your Statement of Work. All amounts are in US dollars.</p>
          <p>
            Payment schedules are set out in the applicable Schedule or Statement of Work. Where a project is paid in
            installments, <strong>we are not obligated to publish your website, release source files, or transfer any
            ownership until we have received payment in full.</strong>
          </p>
          <p>
            <strong>Bank transfers (ACH).</strong> If you pay by bank transfer, the payment is not final when it appears
            as submitted. Bank transfers can be returned for several business days afterward. We do not begin production
            work on a bank transfer until the funds have cleared. Card payments clear immediately and we can begin right
            away.
          </p>
          <p>
            <strong>Late payment.</strong> Invoices are due on receipt unless stated otherwise. If an invoice goes more
            than fifteen (15) days past due, we may pause all work on your account until it is paid. Work resumes when
            payment clears, and your timeline extends accordingly.
          </p>
          <p>
            <strong>Chargebacks.</strong> If you dispute a charge for work already delivered or in progress, we may
            suspend all services and withhold delivery of files pending resolution. Please contact us first — we would
            rather solve the problem than fight about it.
          </p>

          <h2 id="5" style={h2Style}>5. Ongoing services and recurring charges</h2>
          <p>
            Some of our services are billed monthly. We do not enroll you in any recurring charge automatically, and we
            do not save your payment card at your project checkout. When you separately enroll in a monthly service, you
            provide a payment method at that time and authorize automatic monthly billing — the terms for that service
            are set out in its Schedule.
          </p>
          <p>
            Any monthly service — including hosting and care plans — is a separate purchase that you enroll in yourself,
            at the time that service begins, through a separate checkout where the monthly amount, the billing date, and
            the cancellation method are all disclosed before you enter payment information.
          </p>
          <p>
            <strong>Cancelling a monthly service.</strong> You may cancel any monthly service at any time by emailing
            info@catalyst-digital-solutions.com or calling or texting (661) 888-4837. We will confirm your cancellation
            in writing and stop future charges. We do not require a phone call, a meeting, or a retention conversation
            to cancel. Cancellation stops future billing; it does not refund the current month, and it does not entitle
            you to a refund of one-time project fees already paid.
          </p>
          <p>
            <strong>If you cancel hosting</strong>, your website files remain yours. We will provide your files and
            reasonable assistance to move them to a host of your choosing. Continued hosting, uptime, security patching,
            backups, and any AI assistant features are not our responsibility after cancellation.
          </p>

          <h2 id="6" style={h2Style}>6. What we need from you</h2>
          <p>
            To do our work we need timely information, materials, feedback, and approvals from you. Where a project has
            a target timeline, that timeline assumes you respond to our requests within three (3) business days.
          </p>
          <p>
            You are responsible for the accuracy of everything you give us — your license number, service areas,
            pricing, service descriptions, certifications, and claims about your business. We publish what you tell us.
            We do not independently verify it.
          </p>
          <p>
            You confirm that you have the right to use any logo, photo, video, text, font, or other material you supply
            to us, and that using it does not infringe anyone&rsquo;s rights.
          </p>

          <h2 id="7" style={h2Style}>7. Intellectual property</h2>
          <p>Ownership is split into four buckets. This matters, so read it.</p>
          <p>
            <strong>Your materials.</strong> Anything you gave us — your existing logo, photos, copy, customer lists,
            business information — remains yours. We use it only to perform the services.
          </p>
          <p>
            <strong>Project deliverables.</strong> For project-based work, the specific deliverables created for you
            (your logo files, your brand assets, your website design and page code) are assigned to you{" "}
            <strong>upon our receipt of payment in full for that project.</strong> Until then, we retain all rights, and
            you have no license to use, publish, modify, or register any deliverable. The exact list of what transfers
            is set out in the applicable Schedule or Statement of Work.
          </p>
          <p>
            <strong>Our materials.</strong> Our methods, templates, code frameworks, component libraries, AI prompts and
            configurations, automation blueprints, know-how, internal tooling, and anything we developed before or
            independently of your project remain ours. Your deliverables may include or be built on these. Where they
            are, you receive a perpetual, non-exclusive license to use them <strong>as part of your delivered
            deliverables</strong> — you do not acquire the underlying materials themselves and may not resell,
            redistribute, or license them separately.
          </p>
          <p>
            <strong>Third-party materials.</strong> Stock images, fonts, plugins, hosting, AI models, and
            software-as-a-service accounts are governed by their own licenses. Some are not transferable. We will tell
            you what falls into this category and what it requires you to maintain. We do not warrant that third-party
            licenses can be assigned to you.
          </p>
          <p>
            <strong>Drafts and unused concepts.</strong> Concepts you did not select, and drafts from any project not
            paid in full, remain ours. You receive no license to use them.
          </p>
          <p>
            <strong>Our portfolio.</strong> We may display work we produced for you in our portfolio, case studies,
            social media, and marketing materials, and identify you as a client. If you would rather we didn&rsquo;t,
            tell us in writing and we will honor that.
          </p>

          <h2 id="8" style={h2Style}>8. Revisions and approvals</h2>
          <p>
            Revision rounds are defined in the applicable Schedule or Statement of Work. Revisions within the agreed
            scope are included. Requests that change the agreed direction after you have approved it, or that exceed the
            stated revision rounds, are additional work and are quoted separately before we do them.
          </p>
          <p>
            Approval means approval. Once you approve a brand direction or a design, subsequent changes to that decision
            are new work.
          </p>

          <h2 id="9" style={h2Style}>9. Refunds and cancellation</h2>
          <p>
            <strong>One-time projects.</strong> Payments that reserve your production slot are non-refundable once
            production begins, because your slot is committed and work has started. If you cancel before production
            begins, we will refund amounts paid less any work already performed and any third-party costs already
            incurred on your behalf. If we cancel or cannot deliver, you receive a full refund of amounts paid for
            undelivered work.
          </p>
          <p>Refund terms specific to a program are set out in its Schedule and control over this section where they differ.</p>
          <p>
            <strong>Monthly services.</strong> Monthly fees pay for that month&rsquo;s work. They are not refundable
            after the month begins. Cancel any time under §5 and you will not be billed again.
          </p>
          <p>
            <strong>What is never refundable:</strong> work already delivered, files already transferred, third-party
            costs already paid on your behalf, and time already spent on a project you abandoned.
          </p>

          <h2 id="10" style={h2Style}>10. Confidentiality</h2>
          <p>
            Each of us will keep the other&rsquo;s non-public business information confidential and use it only to
            perform or receive the services. This does not apply to information that is public, that we already had, or
            that we are legally required to disclose.
          </p>

          <h2 id="11" style={h2Style}>11. No guarantee of results</h2>
          <p>We will do professional work. <strong>We do not guarantee business outcomes.</strong></p>
          <p>
            Specifically, we do not guarantee search engine rankings, positions on Google Maps, traffic volume, number
            of leads, quality of leads, conversion rates, bid wins, revenue, or profit. Search engines, advertising
            platforms, and AI assistants control their own algorithms and change them without notice. Your results also
            depend on your market, your pricing, your capacity, your reputation, how fast you answer your phone, and how
            well you close.
          </p>
          <p>
            Any figure we mention in a conversation, proposal, or on our website is an example or an illustration of
            what has been possible — not a promise, projection, or guarantee of what you will achieve.
          </p>
          <p>We do not provide legal, tax, accounting, insurance, or licensing advice.</p>

          <h2 id="12" style={h2Style}>12. Limitation of liability</h2>
          <p>To the maximum extent permitted by law:</p>
          <p>
            <strong>We are not liable for indirect, incidental, special, consequential, punitive, or exemplary
            damages</strong>, including lost profits, lost revenue, lost business opportunity, lost bids, loss of
            goodwill, or loss of data, even if we were told those damages were possible.
          </p>
          <p>
            <strong>Our total liability</strong> for any and all claims arising out of or relating to your purchase is
            limited to <strong>the amount you actually paid us for the specific project or, for monthly services, the
            fees you paid us in the six (6) months before the claim arose.</strong>
          </p>
          <p>
            Nothing in this section limits liability that cannot lawfully be limited, including liability for fraud,
            intentional misconduct, or gross negligence.
          </p>
          <p>
            We provide our services &ldquo;as is&rdquo; and disclaim all implied warranties, including merchantability,
            fitness for a particular purpose, and non-infringement, except as expressly stated in these Terms.
          </p>

          <h2 id="13" style={h2Style}>13. Third-party services and things outside our control</h2>
          <p>
            Our work depends on services we do not operate — hosting providers, domain registrars, Google, Meta, payment
            processors, AI model providers, and software vendors. We are not responsible for their outages, policy
            changes, price increases, account suspensions, or discontinued features. Where a third party&rsquo;s change
            affects your service, we will tell you and propose a path forward.
          </p>
          <p>
            We are not responsible for delays or failures caused by anything outside our reasonable control, including
            your delays, third-party failures, natural disasters, labor disruptions, or changes in law.
          </p>

          <h2 id="14" style={h2Style}>14. Your obligations regarding content and compliance</h2>
          <p>
            You are responsible for the legality of your own business. You will not ask us to publish anything false,
            misleading, defamatory, discriminatory, or unlawful, and you will not ask us to publish claims about your
            services that you cannot substantiate.
          </p>
          <p>
            If we run reviews or reputation services for you, we follow platform policies. We will not filter, gate, or
            suppress reviews based on how a customer feels about you, and we will not write reviews on your behalf or on
            behalf of your customers.
          </p>
          <p>
            If we run advertising for you, you remain the advertiser of record for compliance purposes and are
            responsible for the accuracy of your offers and claims.
          </p>

          <h2 id="15" style={h2Style}>15. Termination</h2>
          <p>Either of us may terminate an ongoing monthly service under §5.</p>
          <p>
            We may suspend or terminate services immediately if you fail to pay, if you use our work unlawfully, or if
            you ask us to do something we believe is unlawful or deceptive.
          </p>
          <p>
            On termination: you pay for work performed through the termination date. Deliverables you have paid for in
            full are yours. Deliverables you have not paid for in full remain ours.
          </p>

          <h2 id="16" style={h2Style}>16. Governing law and disputes</h2>
          <p>
            These Terms are governed by the laws of the State of California, without regard to its conflict-of-laws
            rules.
          </p>
          <p>
            Before filing anything, we both agree to try to resolve the dispute directly — one written notice describing
            the problem and thirty (30) days to work it out in good faith. Most problems get solved here.
          </p>
          <p>
            If that fails, any action must be brought in the state or federal courts located in Kern County, California,
            and we each consent to that venue.
          </p>

          <h2 id="17" style={h2Style}>17. Everything else</h2>
          <p>
            <strong>Independent contractor.</strong> We are an independent contractor, not your employee, partner,
            agent, or joint venturer.
          </p>
          <p>
            <strong>Assignment.</strong> Neither of us may assign this agreement without the other&rsquo;s written
            consent, except in connection with a sale of substantially all of our business.
          </p>
          <p>
            <strong>Notices.</strong> Written notice to us goes to info@catalyst-digital-solutions.com. Notice to you
            goes to the email address on your account.
          </p>
          <p>
            <strong>Severability.</strong> If any part of these Terms is found unenforceable, the rest stays in effect.
          </p>
          <p>
            <strong>No waiver.</strong> If we don&rsquo;t enforce a provision right away, that doesn&rsquo;t mean
            we&rsquo;ve given it up.
          </p>
          <p>
            <strong>Entire agreement.</strong> These Terms, the applicable Schedule, and any signed Statement of Work or
            change order are the entire agreement between us. They replace any prior discussions, emails, proposals, or
            marketing materials.
          </p>

          <hr style={{ ...hrStyle, margin: "48px 0 32px" }} />

          <div id="sec-contact">
            <p style={{ fontWeight: 600, color: "#1a1a1a", margin: "0 0 8px" }}>Questions</p>
            <p style={{ margin: 0 }}>
              Catalyst Digital Solutions, LLC
              <br />
              4012 Foxwood St, Bakersfield, CA 93306
              <br />
              Email: <a href="mailto:info@catalyst-digital-solutions.com">info@catalyst-digital-solutions.com</a>
              <br />
              Call or text: (661) 888-4837
            </p>
          </div>

          <p style={{ fontSize: 13, color: "#9a9a9a", margin: "32px 0 0" }}>
            Terms of Service — Version 1.0 — Effective August 17, 2026
          </p>

          <div
            style={{
              margin: "56px -4px 0",
              padding: "28px 32px",
              background: "rgba(128,0,255,.06)",
              borderTop: "2px solid #8000ff",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <p
              style={{
                font: "600 12px var(--font-inter), sans-serif",
                color: "#8000ff",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                margin: "0 0 10px",
              }}
            >
              Schedule A
            </p>
            <h1 style={{ font: "700 28px/1.3 var(--font-inter), sans-serif", color: "#1a1a1a", margin: "0 0 8px" }}>
              Brand Build Program
            </h1>
            <p style={{ fontSize: 14, color: "#6b6b6b", margin: 0 }}>
              Version 1.5 &nbsp;&middot;&nbsp; Effective date: September 2, 2026
            </p>
          </div>

          <p style={{ margin: "28px 0 24px" }}>
            This Schedule applies if you purchased the Brand Build package (complete brand identity plus custom
            website). It is incorporated into and forms part of the Terms of Service above. Where this Schedule and the
            Terms differ, this Schedule controls for Brand Build purchases.
          </p>

          <h2 id="A.1" style={h2Style}>A.1 What&rsquo;s included</h2>
          <p><strong>Brand identity</strong></p>
          <p>
            Primary logo lockup, compact horizontal lockup, supporting mark or emblem, one-color version, reversed
            version for dark backgrounds, color palette with hex, RGB, and CMYK values, typography system,
            embroidery-ready file formats, a custom character or mascot illustration if you want one, and a written
            brand guidelines sheet.
          </p>
          <p><strong>Applied assets</strong></p>
          <p>
            Vehicle wrap design for <strong>one</strong> vehicle type, using <strong>one</strong> template that you
            supply; one storefront signage design with production-ready vector artwork; production-ready logo and
            wordmark files for uniforms and crew apparel; one business-card design, populated with the names and contact
            information you provide for up to five (5) people; social profile avatars sized for major platforms; social
            header images; a Google Business Profile image set; an Open Graph link-preview image.
          </p>
          <p><strong>Website</strong></p>
          <p>
            A custom <strong>ten-page</strong> website built in Next.js and React; contact and service-request forms;
            on-page search optimization; an AI assistant trained on the business information you provide and powered
            by an OpenAI model unless otherwise disclosed under §A.6;
            mobile-responsive across phones, tablets, and desktops.
          </p>
          <p><strong>Getting you online</strong></p>
          <p>
            We connect your domain to your new site and set up your security certificate. If you don&rsquo;t have a
            domain yet, we&rsquo;ll find one and register it for you — in your name, with you as the legal owner (see
            §A.2). Hosting for the first thirty (30) days after launch is included so you can go live.
          </p>
          <p>
            <strong>File formats.</strong> You receive editable vector source files (.ai or .svg), print-ready .pdf,
            transparent .png at multiple sizes, and embroidery-ready formats.
          </p>

          <h2 id="A.2" style={h2Style}>A.2 What&rsquo;s not included</h2>
          <p>
            Anything not listed in §A.1, including: additional website pages; additional vehicle templates; printing;
            embroidery; wrap fabrication or installation; signage fabrication; photography; videography; copywriting
            beyond the pages in scope; a blog, blog posts, or ongoing article writing; paid advertising and ad spend;
            ongoing search optimization; and social media management.
          </p>
          <p>
            These are available separately and quoted before we start. Catalyst offers ongoing SEO, paid advertising
            management, content, social media, reputation management, automation, and other growth services under a
            separate written scope or purchase. None is included automatically, and none is a condition of owning,
            self-hosting, or using the completed Brand Build deliverables.
          </p>
          <p>
            Domain registration and hosting past the first thirty (30) days are not part of the build price. We offer
            both — here&rsquo;s how they work.
          </p>
          <p><strong>Domain.</strong></p>
          <p>You own your domain. If you already have one, you keep it, and we point it at your new site.</p>
          <p>
            If you don&rsquo;t have one — or you&rsquo;d rather we handle it — we&rsquo;ll get one for you. We search
            for available names, recommend options, and register the one you approve.{" "}
            <strong>The domain is registered in your name. You are the legal owner from day one.</strong> We&rsquo;re
            listed only as the technical contact so we can manage the settings and keep your site running.
          </p>
          <p>
            We cover the registration cost up to $30 for the first year, for a standard name. Some names are premium,
            resale, or held by a third party and cost more than that — sometimes far more. If the name you want falls
            into that category, we&rsquo;ll tell you the price before we buy anything, and you decide. We can&rsquo;t
            promise any specific name will be available.
          </p>
          <p><strong>Hosting.</strong></p>
          <p>
            After the first thirty (30) days, hosting continues under our Care Plan at $149 per month, billed in
            advance — see §A.6. That covers hosting, your security certificate, uptime monitoring, backups, keeping the
            AI assistant running, and yearly renewal of any domain we registered for you, for as long as your account is
            active and paid.
          </p>
          <p>
            If your account goes unpaid, we&rsquo;ll give you ten (10) days&rsquo; written notice. After that, your site
            comes down. Your domain is still yours: tell us where to send it and we&rsquo;ll transfer it to you at no
            charge within ten (10) business days. We&rsquo;ll also hand over a copy of your site files. We don&rsquo;t
            hold domains, files, or accounts hostage.
          </p>
          <p>
            If you move your site to another host, just tell us. We&rsquo;ll point your domain wherever you want, once,
            at no charge — and hosting ends with your current billing period. No cancellation fee.
          </p>

          <h2 id="A.3" style={h2Style}>A.3 Statement of Work required before production</h2>
          <p>
            Your Brand Starter purchase reserves your production slot. Before we begin production, we will send you a Statement of Work
            setting out your specific scope, price, payment dates, page list, and delivery target.
          </p>
          <p>
            Production does not begin, and no final invoice will issue, until you sign it. If you decide not to sign,
            tell us and the refund terms in Schedule B §B.3a apply to your Brand Starter, and any additional amount you have paid toward the build will be refunded in full less any third-party costs already
            incurred.
          </p>
          <p>
            This protects both of us. You get the scope in writing before work starts. We don&rsquo;t build $4,000 of
            work against a verbal description.
          </p>

          <h2 id="A.4" style={h2Style}>A.4 Payment</h2>
          <p>
            The package price is stated at checkout or in your Statement of Work. During the fourteen-day offer period
            described in Schedule B §B.4, the complete Brand Build price is $4,000: the $500 Brand Starter payment is
            credited in full, leaving a $3,500 balance. Payment dates or any agreed payment arrangement for that balance
            are set out in your Statement of Work.
          </p>
          <p>
            Choosing to continue does not authorize an automatic $3,500 charge. You must sign the Statement of Work and
            separately authorize each additional payment. If you do not continue, no additional balance is due and the
            Brand Starter terms in Schedule B continue to apply.
          </p>
          <p>
            When you continue, your homepage preview becomes part of the complete Brand Build deliverables. We will not
            publish the completed site or release the Brand Build source files until the full $4,000 has cleared.
            Ownership of the complete Brand Build deliverables, including the website, transfers on payment in full —
            see §A.7.
          </p>

          <h2 id="A.5" style={h2Style}>A.5 Timeline and process</h2>
          <p>
            We target thirty (30) calendar days to launch, counted from the date your Statement of Work is signed and your first build payment clears. The Brand Starter period is separate and does not start this clock.
          </p>
          <p>
            1. Kickoff and intake confirmation — we confirm your services, service area, desired brand impression,
            preferences, and required materials.
            <br />
            2. Brand direction — the direction approved during your Brand Starter carries forward. If a direction has
            not yet been approved, the selection process in Schedule B §B.3b applies.
            <br />
            3. Brand refinement — we finish the approved direction. Continuing to the Brand Build does not restart the
            included Brand Starter direction or refinement counts unless your Statement of Work says otherwise.
            <br />
            4. Website build — we build the site around the approved brand.
            <br />
            5. Website review — up to two (2) rounds of revisions on content and layout.
            <br />
            6. Launch — balance clears, we publish, you own it.
          </p>
          <p>
            The thirty-day target assumes you respond within three (3) business days at each approval point. If you take
            longer, the timeline extends by at least the length of the delay and we will tell you when that happens.
          </p>
          <p>
            <strong>Project pause.</strong> If we do not hear from you for thirty (30) consecutive days after requesting
            information or approval, we may pause your project and reassign your production slot. Restarting a paused
            project is subject to our then-current availability and may carry a restart fee. Payments on paused projects
            are not refunded.
          </p>

          <h2 id="A.6" style={h2Style}>A.6 Care Plan</h2>
          <p>
            The Brand Build price includes the first thirty (30) days of hosting and AI-assistant operation after your
            site launches. Beginning on day thirty-one (31), hosting, your security certificate, security updates,
            backups, uptime monitoring, yearly renewal of any domain we registered for you, and the operating costs of
            your AI assistant can continue under our Care Plan at $149 per month, billed in advance.
          </p>
          <p>
            This is a separate purchase, and it is optional. We do not save your card at your build checkout and we do
            not enroll you automatically. Near the end of your build we will send you a separate checkout that shows the
            monthly amount, the date of the first charge, what&rsquo;s included, and how to cancel, before you enter any
            payment information. You choose whether to enroll, and the first Care Plan charge will not occur before day
            thirty-one (31) after launch.
          </p>
          <p>
            <strong>Payment authorization.</strong> When you enroll, you provide a credit or debit card or a bank
            account, and you authorize us to charge it on the same day each month for that month&rsquo;s Care Plan and
            for any usage charges incurred during the prior month. Invoices are emailed at least three (3) days before
            the charge date. Automatic payment is a condition of the Care Plan. You are responsible for keeping a valid
            payment method on file. If a payment fails, we will notify you and retry within five (5) business days. If
            payment is not received within ten (10) days of the due date, we may suspend the service under §A.2.
          </p>
          <p>
            <strong>AI assistant usage.</strong> Your Care Plan includes 2,000 AI assistant replies per month. A reply
            is one answer the assistant sends to a visitor.
          </p>
          <p>
            If you use all 2,000 in a billing month, the assistant continues without interruption. Additional replies
            are added in blocks of 500 at $10 per block. Blocks used during a billing month appear as a single line item
            on your next monthly invoice — you are not charged separately at the time of use. You are billed only for
            the blocks you use. Unused replies do not carry over to the next month.
          </p>
          <p>
            We will notify you by email when you reach 80% of your included replies, and you can request your usage
            figures at any time. Automated traffic, scraping, and abusive requests are filtered and are not billed to
            your account. We may block sources that abuse the assistant.
          </p>
          <p>
            <strong>AI provider and model.</strong> Unless we state otherwise in writing, the assistant is powered by an
            OpenAI model through an application programming interface or gateway. Catalyst selects and may change the
            specific OpenAI model used to balance answer quality, reliability, availability, and operating cost. A
            change from one OpenAI model to another does not require advance notice.
          </p>
          <p>
            We will give you at least sixty (60) days&rsquo; written notice before moving the assistant to a different
            model provider or increasing the Care Plan base price or per-block usage price. You may cancel before the
            change takes effect. We may change providers sooner when reasonably necessary to prevent or end an outage,
            address a security or legal issue, or respond to a provider or model discontinuation. If that happens, we
            will notify you promptly. A price increase will not take effect without the full sixty-day notice and will
            never apply retroactively.
          </p>
          <p>
            <strong>If you don&rsquo;t enroll</strong>, your files are yours and we will hand them over with reasonable
            help moving to a host of your choosing. Your site, uptime, security, backups, domain renewal, and any AI
            assistant features become your responsibility. The AI assistant requires a paid model provider account to
            function; without one it will not run.
          </p>
          <p>
            <strong>Cancelling.</strong> Cancel any time by email or text under §5 of the Terms.
          </p>

          <h2 id="A.7" style={h2Style}>A.7 What you own, and when</h2>
          <p>
            On payment in full, we assign to you all rights in: your logo files and all lockup variations, your color
            palette and typography specifications, your custom character or mascot illustration, your brand guidelines
            sheet, your vehicle wrap design, your storefront signage design, your uniform logo and wordmark files, your
            business-card design and versions prepared for up to five people, your social and profile assets, and the
            design and page code of your website.
          </p>
          <p>
            Before payment in full, we own all of it and you have no license to use it — including for signage, wraps,
            apparel, print, or online.
          </p>
          <p>
            <strong>What we keep</strong> (§7 of the Terms): our Next.js component library, code frameworks, AI
            assistant configuration and prompt architecture, design system methodology, and internal tooling. Your
            website is built on these, and you receive a perpetual license to use them as part of your delivered site.
            You do not acquire the underlying frameworks and may not resell or redistribute them.
          </p>
          <p>
            <strong>Third-party items</strong> — fonts, stock assets, plugins, AI model access, hosting — are governed
            by their own licenses and may require you to maintain your own account. We will identify these at handoff.
          </p>
          <p>
            <strong>Fonts specifically:</strong> some typefaces are licensed per-user and cannot be transferred. Where
            your brand uses one, we will tell you what license you need to buy and what it costs. Where possible we use
            open-license typefaces so this doesn&rsquo;t come up.
          </p>
          <p>
            <strong>Your domain</strong> is yours from the day it is registered, regardless of project status or payment
            status. It is never held as leverage.
          </p>

          <h2 id="A.8" style={h2Style}>A.8 Limited slots and pricing</h2>
          <p>
            We build these one at a time. When we say a limited number of slots are available at a given price, that is
            a real production constraint, and the price genuinely increases once those slots are sold. Your price is the
            price stated on your checkout page at the time you paid, and it does not change afterward.
          </p>

          <h2 id="A.9" style={h2Style}>A.9 Uniqueness</h2>
          <p>
            We do not reuse a brand identity. No two clients receive the same logo, character, color system, or website
            design. We do not use logo templates or website themes.
          </p>
          <p>
            We do not offer geographic or category exclusivity. We may work with another company in your trade,
            including in your market, unless we have separately agreed in writing not to.
          </p>

          <h2 id="A.10" style={h2Style}>A.10 Your responsibilities on this project</h2>
          <ul style={{ margin: "0 0 16px", paddingLeft: 22 }}>
            <li>Provide your service list, service area, license number, and business details.</li>
            <li>Provide a vehicle template from your wrap installer if you want the wrap design.</li>
            <li>Provide photos of your trucks, crew, and completed work if you want them used.</li>
            <li>
              Own your domain, or authorize us to register one on your behalf in your name. We cover up to $30 for the
              first year; premium or resale names are quoted before purchase.
            </li>
            <li>Respond to approval requests within three (3) business days.</li>
            <li>Confirm that any existing brand element you ask us to build on is yours to use.</li>
          </ul>

          <hr style={{ ...hrStyle, margin: "40px 0 24px" }} />
          <p style={{ fontSize: 13, color: "#9a9a9a", margin: "0 0 4px" }}>
            Schedule A — Version 1.5 — Effective September 2, 2026
          </p>

          <div
            style={{
              margin: "56px -4px 0",
              padding: "28px 32px",
              background: "rgba(128,0,255,.06)",
              borderTop: "2px solid #8000ff",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <p
              style={{
                font: "600 12px var(--font-inter), sans-serif",
                color: "#8000ff",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                margin: "0 0 10px",
              }}
            >
              Schedule B
            </p>
            <h1 style={{ font: "700 28px/1.3 var(--font-inter), sans-serif", color: "#1a1a1a", margin: "0 0 8px" }}>
              Brand Starter
            </h1>
            <p style={{ fontSize: 14, color: "#6b6b6b", margin: 0 }}>
              Version 1.4 &nbsp;&middot;&nbsp; Effective date: September 2, 2026
            </p>
          </div>

          <p style={{ margin: "28px 0 24px" }}>
            This Schedule applies if you purchased the Brand Starter (logo package plus a live 14-day preview of your homepage).
            It is incorporated into and forms part of the Terms of Service above. Where this Schedule and the Terms
            differ, this Schedule controls for Brand Starter purchases. If you later purchase the full Brand Build,
            Schedule A also applies to that purchase.
          </p>

          <h2 id="B.1" style={h2Style}>B.1 What this purchase is</h2>
          <p>
            The $500 Brand Starter is a <strong>purchase of a completed deliverable set</strong>. It is not a reservation fee and it is not held against future work as a refundable balance. You are buying the work listed in §B.2. Completing checkout does not enroll you in a monthly
            service, does not save your card, and does not authorize any future charge.
          </p>

          <h2 id="B.2" style={h2Style}>B.2 What is delivered</h2>
          <p>We deliver:</p>
          <ul style={{ margin: "0 0 16px", paddingLeft: 22 }}>
            <li>
              A presentation of five (5) distinct initial brand directions based on your completed intake. Each is a
              preliminary concept for review, not a fully produced brand package.
            </li>
            <li>
              A completed logo package based on the direction you select: primary, stacked, horizontal, reversed, and
              one-color versions, in Adobe Illustrator (.ai), SVG, and PNG.
            </li>
            <li>A business card design for up to five people on your crew.</li>
            <li>Brand mockups (van, apparel, social, storefront), delivered as images.</li>
            <li>Your color palette and typography specifications.</li>
            <li>The mascot or character direction you select, if you choose one.</li>
            <li>A live 14-day preview of your homepage, hosted by us, live on the internet with your name on it.</li>
          </ul>
          <p>
            Mockup images are presentation renders. They are not print-ready production files. Print-ready vehicle wrap
            files and embroidery-ready files are part of the full Brand Build.
          </p>

          <h2 id="B.3" style={h2Style}>B.3 What you own</h2>
          <p>
            When we deliver the completed Brand Starter and your $500 payment has cleared, you own the finished logo
            files for the direction you selected, the business card design, the mockup images, your color palette and
            typography specifications, and the finished mascot or character selected for your brand, if any. If you
            decide not to go forward with the full Brand Build, you keep all of them. The business card design is
            delivered as a print-ready PDF with bleed and crop marks. Preliminary directions and all unselected initial
            or replacement directions remain ours and are not licensed for use. The 14-day homepage preview comes down
            at the end of the period described in §B.3c.
          </p>

          <h2 id="B.3a" style={h2Style}>B.3a Refunds</h2>
          <p>
            Except for the delivery promise and Catalyst-cancellation exceptions stated below, the Brand Starter is a
            one-time, non-refundable purchase of completed digital deliverables. It is not a reservation fee and it is
            not held against future work as a refundable balance. By purchasing, you
            acknowledge that we reserve production capacity and begin project setup and design work immediately. The
            purchase is not refundable if you cancel or decide not to continue, including on the basis of subjective
            preference after we meet the delivery promises in §B.5. If we cancel, cannot deliver the Brand Starter, or
            miss an applicable delivery target for reasons within our reasonable control and you cancel in writing
            before the late item is delivered, we refund the $500 in full. On a refund, you receive no license or
            ownership in any preliminary direction, preview, or draft and must stop using and delete any copies you
            received. We do not release final editable or production-ready source files before completed delivery. This
            section controls over §9 of the Terms for Brand Starter purchases.
          </p>

          <h2 id="B.3b" style={h2Style}>B.3b Direction selection and revisions</h2>
          <p>
            Your completed intake is the creative brief. It must identify your correct business name, services,
            audience, desired impression, preferences, dislikes, and any existing elements we must keep or avoid. We
            use that information to create five (5) distinct initial brand directions. A direction may show an initial
            logo or wordmark approach, color palette, typography, and supporting visual style. The five directions are
            concept choices, not five completed logo systems or five website designs.
          </p>
          <p>
            You select one direction. Two (2) refinement rounds on that selected direction are included. A refinement
            round means one consolidated written list of related changes to the selected direction. It does not include
            a new company name, a new creative brief, or development of a different direction.
          </p>
          <p>
            If none of the five initial directions fits, one (1) guided direction reset is included. After a feedback
            call or one consolidated written response explaining what missed the mark, we provide up to three (3)
            replacement directions. You then select one direction for the two included refinement rounds. Additional
            directions, resets, or refinement rounds require a written change order stating the added price and timing
            before we begin that extra work. If Catalyst voluntarily shows additional concepts without a change order,
            that courtesy does not expand the included scope for later work. All unselected directions remain ours
            under §7 of the Terms and may not be used, copied, or given to another designer for development.
          </p>

          <h2 id="B.3c" style={h2Style}>B.3c Preview hosting period</h2>
          <p>
            Your live 14-day homepage preview stays live for fourteen (14) calendar days from the date we deliver your Brand Starter.
            If you have not purchased the full Brand Build by then, we take it down. We can put it back up if you
            purchase later, subject to availability.
          </p>

          <h2 id="B.4" style={h2Style}>B.4 Credit toward the full build</h2>
          <p>
            If you purchase the complete Brand + Website Build within fourteen (14) calendar days of the date we deliver
            your Brand Starter, the $500 is credited in full for fourteen (14) days against the package price in effect on the date of your
            Brand Starter purchase, and that price is held for you during those fourteen days. For the current $4,000
            offer, the $500 is part of that total and the remaining balance is $3,500. We do not charge that balance
            automatically. To continue, you must sign a Statement of Work and separately authorize the additional
            payment or payments described there. If you do not continue, no additional balance is due. After fourteen
            days, the credit expires and current pricing applies. We may extend this period at our discretion.
          </p>
          <p>
            If you continue during the fourteen-day period, the homepage preview becomes part of the complete Brand
            Build deliverables. Ownership of the website transfers after the full Brand Build price has been paid in
            full under Schedule A §§A.4 and A.7.
          </p>
          <p>Your delivery date is stated in the email that delivers your Brand Starter.</p>

          <h2 id="B.5" style={h2Style}>B.5 Timeline and delivery promise</h2>
          <p>
            We target presentation of your five (5) initial brand directions within <strong>seven (7) business
            days</strong> from the later of (a) the date your payment clears, or (b) the date we receive your completed
            intake form and all information we identify as required to begin. If you use the guided direction reset in
            §B.3b, we target the replacement directions within five (5) business days after we receive your consolidated
            reset feedback.
          </p>
          <p>
            After you select a direction, we target delivery of the completed Brand Starter deliverables and working
            homepage preview within <strong>seven (7) additional business days</strong> from the later of (a) your
            written selection, or (b) our receipt of any information or materials required to build that direction.
            Time needed for your requested refinement rounds is added to that target and confirmed to you in writing.
            Your 14-day preview and $500-credit period begin when we deliver the completed Brand Starter, not when we
            first present the directions.
          </p>
          <p>
            Delays caused by incomplete or inaccurate intake information, client-requested changes, late feedback or
            approvals, missing materials, third-party outages, or events outside our reasonable control extend the
            applicable target by at least the length of the delay. If we miss either applicable seven-business-day
            target for reasons within our reasonable control, you may cancel by written notice received before we
            deliver the late item and receive a full refund under §B.3a.
          </p>

          <h2 id="B.6" style={h2Style}>B.6 Chat assistant vs. phone AI</h2>
          <p>
            The website included in a later Brand Build has a <strong>chat assistant on the website</strong> — the chat
            window a visitor types into. It is not a phone answering service. An AI that answers your actual phone is
            part of our separate monthly marketing programs and is not included in the Brand Starter or the Brand Build
            package. The website chat assistant is powered by an OpenAI model unless otherwise disclosed under Schedule
            A §A.6.
          </p>

          <h2 id="B.7" style={h2Style}>B.7 Care Plan</h2>
          <p>
            The complete Brand Build includes the first thirty (30) days of hosting and AI-assistant operation after full
            site launch. The optional $149/month Care Plan can begin on day thirty-one (31), is a separate purchase, and
            is cancelable at any time. It is not part of the $500 Brand Starter. We do not enroll you automatically and
            we do not save your card at Brand Starter checkout. See Schedule A §A.6 if you later purchase the full build.
          </p>

          <hr style={{ ...hrStyle, margin: "40px 0 24px" }} />
          <p style={{ fontSize: 13, color: "#9a9a9a", margin: "0 0 4px" }}>
            Schedule B — Version 1.4 — Effective September 2, 2026
          </p>
          <p style={{ fontSize: 13, color: "#9a9a9a", margin: "0 0 4px" }}>
            Schedule A — Version 1.5 — Effective September 2, 2026
          </p>
          <p style={{ fontSize: 13, color: "#9a9a9a", margin: "0 0 32px" }}>
            Terms of Service — Version 1.0 — Effective August 17, 2026
          </p>
        </article>
      </div>
    </div>
  );
}
