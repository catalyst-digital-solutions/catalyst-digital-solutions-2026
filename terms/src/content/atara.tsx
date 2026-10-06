import {
  AgreementSection,
  PriceCallout,
  Subheading,
} from "@/components/AgreementSection";
import type { AgreementDefinition } from "@/content/types";

function AtaraAgreementBody() {
  return (
    <>
      <p>
        <strong>Effective Date:</strong> The date Atara accepts these terms and
        submits the initial payment.
      </p>
      <p>
        This agreement is between{" "}
        <strong>Catalyst Digital Solutions (“Catalyst”)</strong> and{" "}
        <strong>Atara Mechanical, Inc. (“Atara”)</strong>.
      </p>
      <p>
        The goal is simple: Catalyst will build the website described below,
        Atara will provide the information and access needed to complete it, and
        both sides will know exactly what is included, what it costs, and who
        owns what.
      </p>

      <AgreementSection id="project" number="1" title="Project">
        <p>
          Catalyst will design and develop a custom website for Atara Mechanical
          built around the website strategy presented to Omar and Brittany.
        </p>
        <p>The project includes:</p>
        <ul>
          <li>
            <strong>16 strategic website pages</strong>
          </li>
          <li>
            Required utility and infrastructure pages, including
            Contact/Schedule Service, Financing, Privacy, Terms, thank-you
            pages, error pages, and other necessary technical pages
          </li>
          <li>Custom Atara-branded responsive design</li>
          <li>SEO and GEO site architecture</li>
          <li>Strategic internal linking</li>
          <li>Technical schema and entity foundation</li>
          <li>Redirects and technical launch setup</li>
          <li>Housecall Pro scheduling integration</li>
          <li>Financing integration</li>
          <li>Real customer review integration</li>
          <li>Atara’s Second Opinion / Repair-First positioning</li>
          <li>Rancho Cucamonga and Eastvale search positioning</li>
          <li>
            Commercial HVAC foundation, including Commercial Preventive
            Maintenance
          </li>
          <li>
            Residential HVAC Maintenance &amp; Tune-Ups, reflecting Atara’s
            existing residential maintenance program
          </li>
          <li>
            Basic <strong>Atara AI Website Assistant</strong>
          </li>
          <li>
            Other functionality specifically shown or agreed upon during the
            project
          </li>
        </ul>

        <Subheading id="sixteen-page-strategy">The 16-page strategy</Subheading>
        <p>
          The project is sold as a <strong>16-page strategic website build</strong>,
          not as 16 individual pages purchased à la carte.
        </p>
        <p>
          If Catalyst and Atara determine that one proposed page does not make
          operational or strategic sense, Catalyst may recommend replacing that
          page with another page of comparable strategic value.
        </p>
        <p>
          The goal is to improve the strategy,{" "}
          <strong>not simply reduce the number of pages.</strong>
        </p>
      </AgreementSection>

      <AgreementSection
        id="ai-assistant"
        number="2"
        title="Atara AI Website Assistant"
      >
        <p>
          The website will include a basic public-facing AI assistant trained on
          approved Atara business information.
        </p>
        <p>It may help visitors with subjects such as:</p>
        <ul>
          <li>services</li>
          <li>service areas</li>
          <li>hours and contact information</li>
          <li>Atara’s residential and commercial maintenance plans</li>
          <li>Second Opinions</li>
          <li>basic HVAC questions</li>
          <li>commercial HVAC</li>
          <li>financing handoff</li>
          <li>scheduling guidance</li>
        </ul>
        <p>
          This initial version{" "}
          <strong>
            does not access private customer records or customer history
          </strong>{" "}
          and will not independently quote jobs, approve financing, access full
          Housecall Pro records, or dispatch technicians.
        </p>
        <p>
          Advanced CRM/Housecall Pro integration, customer-specific AI, internal
          automation, and similar features are outside this project unless
          separately agreed upon.
        </p>
        <p>
          AI-generated responses may occasionally be imperfect. Catalyst will
          use reasonable safeguards and approved Atara information, but the
          assistant is informational and is not a substitute for an on-site
          diagnosis by a qualified technician.
        </p>
      </AgreementSection>

      <AgreementSection id="price" number="3" title="Project Price">
        <p>The website build is:</p>
        <PriceCallout amount="$8,000" />
        <p>Atara may choose either:</p>
        <div className="option-block">
          <h3>Option A — Two Payments</h3>
          <ul>
            <li>$4,000 to begin</li>
            <li>
              $4,000 when the website is substantially complete and ready for
              launch
            </li>
          </ul>
        </div>
        <div className="option-block">
          <h3>Option B — Pay in Full</h3>
          <ul>
            <li>$8,000 at kickoff</li>
          </ul>
        </div>
        <p>Choosing to pay in full does not change the scope of work.</p>
        <p>
          The kickoff payment reserves Catalyst’s production capacity and
          becomes non-refundable once project work begins.
        </p>
        <p>
          The final balance must be paid before the new website is placed into
          full production and before final ownership of Catalyst-created project
          deliverables transfers to Atara.
        </p>
        <p>
          If the website is substantially complete but Atara chooses to delay
          launch for reasons unrelated to Catalyst’s work, the remaining project
          balance is still due.
        </p>
      </AgreementSection>

      <AgreementSection id="timeline" number="4" title="Estimated Timeline">
        <p>
          Catalyst expects the website build to take approximately{" "}
          <strong>3–4 weeks</strong> after:
        </p>
        <ol>
          <li>kickoff payment is received, and</li>
          <li>
            Catalyst receives the access, information, approvals, and materials
            reasonably necessary to begin.
          </li>
        </ol>
        <p>This is a target rather than a guaranteed completion date.</p>
        <p>
          Delays in receiving feedback, approvals, credentials, photographs,
          factual information, or other materials from Atara will extend the
          timeline accordingly.
        </p>
        <p>Catalyst will keep Atara reasonably informed of project progress.</p>
      </AgreementSection>

      <AgreementSection id="changes" number="5" title="Changes and Revisions">
        <p>
          Reasonable revisions within the agreed scope are included during the
          build.
        </p>
        <p>
          Additional charges may apply if Atara requests work that materially
          expands the project, including:
        </p>
        <ul>
          <li>additional strategic pages beyond the agreed 16</li>
          <li>major redesigns after a design direction has been approved</li>
          <li>substantial new functionality</li>
          <li>custom integrations not included above</li>
          <li>additional applications or software</li>
          <li>services unrelated to the website build</li>
        </ul>
        <p>
          Catalyst will discuss and obtain approval for additional paid work
          before performing it.
        </p>
      </AgreementSection>

      <AgreementSection id="atara-provides" number="6" title="What Atara Provides">
        <p>
          Atara agrees to provide Catalyst with reasonable access, information,
          feedback, and approvals needed to complete the project.
        </p>
        <p>
          Atara is responsible for confirming the accuracy of business-specific
          facts such as:
        </p>
        <ul>
          <li>licenses and credentials</li>
          <li>service areas</li>
          <li>pricing</li>
          <li>warranties</li>
          <li>financing terms</li>
          <li>promotions</li>
          <li>hours</li>
          <li>rebate or incentive information</li>
          <li>service capabilities</li>
          <li>customer reviews and testimonials</li>
        </ul>
        <p>
          Atara represents that it has the right to use photographs, logos,
          customer reviews, text, trademarks, and other materials it provides to
          Catalyst.
        </p>
        <p>
          Catalyst may reasonably rely upon factual information supplied or
          approved by Atara.
        </p>
      </AgreementSection>

      <AgreementSection id="ownership" number="7" title="Ownership">
        <Subheading id="before-final-payment">Before final payment</Subheading>
        <p>
          Until the <strong>entire $8,000 project price has been paid</strong>,
          Catalyst retains ownership of the website and all project-specific
          deliverables created by Catalyst.
        </p>
        <p>
          Atara may review and approve the work during development, but
          ownership does not transfer until payment is complete.
        </p>

        <Subheading id="after-final-payment">After final payment</Subheading>
        <p>
          Once the website build has been paid in full, Atara will own the final
          project-specific deliverables Catalyst created specifically for Atara,
          including the custom website design, project-specific written content,
          custom graphics, and custom code created specifically for this
          project.
        </p>
        <p>Atara always retains ownership of its existing:</p>
        <ul>
          <li>business name</li>
          <li>trademarks</li>
          <li>logos</li>
          <li>customer information</li>
          <li>photographs and materials supplied by Atara</li>
          <li>domain names</li>
          <li>social accounts</li>
          <li>Housecall Pro account</li>
          <li>other pre-existing Atara property</li>
        </ul>

        <Subheading id="catalyst-owns">What Catalyst continues to own</Subheading>
        <p>Catalyst retains ownership of its pre-existing and reusable:</p>
        <ul>
          <li>methods</li>
          <li>processes</li>
          <li>development systems</li>
          <li>code libraries</li>
          <li>templates</li>
          <li>frameworks</li>
          <li>prompts</li>
          <li>AI systems</li>
          <li>utilities</li>
          <li>know-how</li>
          <li>design systems</li>
          <li>other technology developed independently of this project</li>
        </ul>
        <p>
          Third-party software, fonts, plugins, APIs, platforms, stock assets,
          and similar materials remain subject to their respective licenses.
        </p>
        <p>
          Catalyst may display the completed website and non-confidential
          portions of the work in its portfolio and case studies unless Atara
          asks otherwise in writing.
        </p>
      </AgreementSection>

      <AgreementSection id="managed-care" number="8" title="Managed Website Care">
        <p>
          Beginning when the new website launches, Atara will receive Managed
          Website Care for $249 per month.
        </p>
        <p>
          Managed Website Care is required while Catalyst hosts and manages the
          website.
        </p>
        <p>
          It includes managed website hosting, uptime and performance
          monitoring, backups, security monitoring, routine technical
          maintenance, reasonable minor content changes, monitoring of important
          booking and contact paths, operation of the basic Atara AI Website
          Assistant, and ongoing website support.
        </p>
        <p>
          Minor updates include ordinary changes such as text, photographs,
          hours, staff information, promotions, or similar small content edits.
          They do not include new strategic pages, substantial redesigns, new
          applications, major functionality, or custom integrations.
        </p>
        <p>
          Up to approximately one hour of minor website work per month is
          included. Unused time does not accrue or carry forward.
        </p>

        <Subheading id="ai-assistant-usage">AI Assistant Usage</Subheading>
        <p>
          The Managed Website Care plan includes 2,000 AI assistant replies per
          billing month.
        </p>
        <p>
          One reply means one answer the Atara AI Website Assistant sends to a
          visitor.
        </p>
        <p>
          If Atara uses all 2,000 included replies during a billing month, the
          assistant will continue operating without interruption.
        </p>
        <p>
          Additional replies are billed in blocks of 500 replies for $10 per
          block.
        </p>
        <p>
          Used overage blocks will appear as a single line item on Atara’s next
          monthly invoice. Atara will not be charged separately each time a
          block is used, and only blocks actually used will be billed.
        </p>
        <p>
          Unused included replies and unused portions of overage blocks do not
          carry forward into a future billing month.
        </p>
        <p>
          Catalyst will make reasonable efforts to notify Atara by email when
          usage reaches approximately 80% of the monthly included allowance.
          Atara may request current usage information at any time.
        </p>
        <p>
          Automated scraping, abusive requests, obvious bot traffic, and other
          traffic reasonably identified as non-customer abuse will be filtered
          where practicable and will not intentionally be counted as billable
          customer usage. Catalyst may restrict or block sources that abuse the
          assistant.
        </p>

        <Subheading id="ai-provider">AI Provider and Model</Subheading>
        <p>
          Unless Catalyst states otherwise in writing, the AI assistant will be
          powered by an OpenAI model through an application programming
          interface or related gateway.
        </p>
        <p>
          Catalyst may select or change the specific OpenAI model used to
          balance response quality, reliability, availability, security, and
          operating cost. Switching between OpenAI models does not require
          advance notice.
        </p>
        <p>
          Catalyst will provide at least 60 days’ written notice before
          intentionally moving the assistant to a different AI model provider or
          increasing either the Managed Website Care base price or the AI
          usage-block price.
        </p>
        <p>
          Atara may cancel Managed Website Care before such a price increase
          takes effect.
        </p>
        <p>
          Catalyst may make a provider change sooner when reasonably necessary
          to resolve or prevent an outage, security concern, legal/compliance
          issue, or provider/model discontinuation. Catalyst will notify Atara
          promptly if that occurs.
        </p>
        <p>No price increase will apply retroactively.</p>

        <Subheading id="cancellation-transfer">Cancellation and Transfer</Subheading>
        <p>
          Managed Website Care may be canceled with 30 days’ written notice.
        </p>
        <p>
          Once the website build has been paid in full, Atara remains the owner
          of its custom website even if Managed Website Care is canceled.
        </p>
        <p>
          Catalyst will reasonably cooperate with transferring the website to
          hosting selected by Atara. Significant migration, configuration, or
          third-party setup work may be separately quoted.
        </p>
        <p>
          Because the Atara AI Website Assistant relies on Catalyst-managed
          systems, APIs, prompts, monitoring, and ongoing operating costs, the
          AI assistant itself is a managed service and is not transferred as
          standalone software when Managed Website Care ends unless the parties
          separately agree otherwise.
        </p>
      </AgreementSection>

      <AgreementSection id="marketing" number="9" title="Marketing Is Separate">
        <p>
          The website provides the foundation for future marketing, but the
          $8,000 project and $249 Managed Website Care plan do{" "}
          <strong>not</strong> include an ongoing marketing campaign.
        </p>
        <p>
          Services such as the following would be separately agreed upon if
          Atara wants them later:
        </p>
        <ul>
          <li>ongoing SEO/GEO expansion</li>
          <li>Google Business Profile management</li>
          <li>citation/NAP cleanup</li>
          <li>review campaigns</li>
          <li>paid search or LSA management</li>
          <li>direct mail</li>
          <li>door-hanger campaigns</li>
          <li>commercial outreach</li>
          <li>ongoing content campaigns</li>
          <li>advanced analytics</li>
          <li>advanced Housecall Pro automation</li>
        </ul>
        <p>There is no obligation for Atara to purchase those services.</p>
      </AgreementSection>

      <AgreementSection
        id="guarantees"
        number="10"
        title="No Ranking, Lead, or Revenue Guarantees"
      >
        <p>
          Catalyst will perform the work professionally and use commercially
          reasonable practices.
        </p>
        <p>However, Catalyst cannot guarantee:</p>
        <ul>
          <li>a particular Google ranking</li>
          <li>placement in Google Maps</li>
          <li>inclusion or ranking in AI-generated answers</li>
          <li>a specific number of leads</li>
          <li>a specific number of booked jobs</li>
          <li>a specific amount of revenue</li>
        </ul>
        <p>
          Search engines, AI platforms, browsers, hosting companies, Housecall
          Pro, payment systems, and other third-party platforms operate outside
          Catalyst’s control.
        </p>
        <p>
          The purpose of the project is to substantially improve Atara’s online
          foundation and ability to be found and chosen—not to promise a
          particular business result.
        </p>
      </AgreementSection>

      <AgreementSection id="confidentiality" number="11" title="Confidentiality">
        <p>
          Both parties will protect non-public business, customer, financial,
          technical, and proprietary information received from the other party
          and will use it only as reasonably necessary to perform this
          agreement.
        </p>
        <p>
          This does not apply to information that is already public,
          independently developed, lawfully obtained from another source, or
          required to be disclosed by law.
        </p>
      </AgreementSection>

      <AgreementSection
        id="suspension"
        number="12"
        title="Suspension and Termination"
      >
        <p>
          Catalyst may temporarily suspend work or hosting if an undisputed
          payment becomes materially overdue after written notice.
        </p>
        <p>
          Either party may terminate this agreement for a material breach if the
          breach is not corrected within a reasonable period after written
          notice.
        </p>
        <p>
          If Atara chooses to cancel the website project after work has begun:
        </p>
        <ul>
          <li>the kickoff payment remains earned;</li>
          <li>
            Atara is responsible for the reasonable value of work completed up
            to the cancellation date, not to exceed the total $8,000 project
            price; and
          </li>
          <li>
            ownership of unpaid Catalyst-created work remains with Catalyst.
          </li>
        </ul>
        <p>
          If Catalyst terminates the project without cause before completing the
          work, Catalyst will refund any payment attributable to work that has
          not been performed and return Atara-provided materials.
        </p>
        <p>
          Either party may immediately terminate the relationship for unlawful,
          threatening, abusive, or seriously inappropriate conduct.
        </p>
      </AgreementSection>

      <AgreementSection
        id="liability"
        number="13"
        title="Liability and Client-Provided Materials"
      >
        <p>
          Neither party will be liable to the other for indirect, incidental,
          special, punitive, or consequential damages such as lost profits or
          lost business opportunities, except where such limitation is
          prohibited by law.
        </p>
        <p>
          Catalyst’s total liability arising from a particular service will not
          exceed the amount Atara paid Catalyst for the service giving rise to
          the claim.
        </p>
        <p>
          This limitation does not apply to fraud, intentional misconduct, or
          liability that cannot legally be limited.
        </p>
        <p>
          Atara is responsible for third-party claims arising from content,
          photographs, trademarks, instructions, or other materials supplied by
          Atara that Atara did not have the right to use.
        </p>
      </AgreementSection>

      <AgreementSection id="third-party" number="14" title="Third-Party Services">
        <p>
          The website may depend upon services operated by other companies,
          including hosting infrastructure, domain providers, Housecall Pro,
          Stripe, AI providers, analytics tools, email systems, and other
          technology.
        </p>
        <p>
          Catalyst is not responsible for outages, policy changes, price
          changes, account suspensions, service interruptions, or other failures
          caused by third-party providers outside Catalyst’s reasonable
          control.
        </p>
        <p>
          Catalyst will reasonably assist Atara when such issues affect the
          website.
        </p>
      </AgreementSection>

      <AgreementSection id="general" number="15" title="General Terms">
        <p>
          Catalyst may use employees or qualified subcontractors to perform
          portions of the work and remains responsible for the services it
          provides.
        </p>
        <p>
          Neither party is responsible for delays caused by circumstances
          reasonably outside its control.
        </p>
        <p>
          This agreement is governed by the laws of the{" "}
          <strong>State of California</strong>.
        </p>
        <p>
          Before filing a lawsuit concerning this agreement, the parties agree
          to first make a good-faith effort to resolve the issue directly.
        </p>
        <p>
          If legal proceedings become necessary, venue will be in the state or
          federal courts serving <strong>Kern County, California</strong>,
          unless the parties agree otherwise in writing.
        </p>
        <p>
          This agreement, together with any written project changes accepted by
          both parties, represents the complete agreement for this website
          project and supersedes prior discussions regarding the same scope.
        </p>
        <p>Changes to this agreement must be agreed to in writing.</p>
      </AgreementSection>

      <AgreementSection
        id="electronic-acceptance"
        number="16"
        title="Electronic Acceptance"
      >
        <p>
          An authorized representative of Atara may accept this agreement
          electronically.
        </p>
        <div className="section-keep">
          <p>
            By checking the acceptance box associated with Catalyst’s private
            checkout page and submitting payment, the representative confirms
            that they:
          </p>
          <p>
            <strong>
              have read these terms, have authority to accept them on behalf of
              Atara Mechanical, Inc., and agree to be bound by them.
            </strong>
          </p>
        </div>
      </AgreementSection>
    </>
  );
}

export const ataraAgreement: AgreementDefinition = {
  slug: "atara",
  partiesLine: "Catalyst Digital Solutions × Atara Mechanical",
  title: "Atara Mechanical Website Build & Managed Care Agreement",
  subtitle:
    "Clear terms for the website build, launch, ownership, and ongoing care.",
  lastUpdated: "October 5, 2026",
  metadata: {
    title:
      "Atara Mechanical Website Build Agreement | Catalyst Digital Solutions",
    description:
      "Terms for the Atara Mechanical strategic website build and ongoing managed website care provided by Catalyst Digital Solutions.",
    canonical: "https://terms.catalyst-digital-solutions.com/atara",
  },
  checkoutEnvKey: "NEXT_PUBLIC_ATARA_CHECKOUT_URL",
  checkoutButtonLabel: "Return to Project Checkout",
  acceptanceText:
    "By checking the acceptance box associated with Catalyst’s private checkout page and submitting payment, the authorized representative confirms that they have read these terms, have authority to accept them on behalf of Atara Mechanical, Inc., and agree to be bound by them.",
  summary: {
    heading: "Project summary",
    rows: [
      {
        label: "Strategic Website Build",
        value: "$8,000 total",
      },
      {
        label: "Option A",
        value:
          "$4,000 kickoff, $4,000 when substantially complete and ready for launch",
      },
      {
        label: "Option B",
        value: "$8,000 paid in full",
      },
      {
        label: "Managed Website Care",
        value:
          "$249/month, required beginning at launch while Catalyst hosts/manages the website",
      },
    ],
  },
  nav: [
    { id: "project", label: "1. Project" },
    { id: "ai-assistant", label: "2. AI Website Assistant" },
    { id: "price", label: "3. Project Price" },
    { id: "timeline", label: "4. Estimated Timeline" },
    { id: "changes", label: "5. Changes and Revisions" },
    { id: "atara-provides", label: "6. What Atara Provides" },
    { id: "ownership", label: "7. Ownership" },
    { id: "managed-care", label: "8. Managed Website Care" },
    { id: "marketing", label: "9. Marketing Is Separate" },
    { id: "guarantees", label: "10. No Guarantees" },
    { id: "confidentiality", label: "11. Confidentiality" },
    { id: "suspension", label: "12. Suspension and Termination" },
    { id: "liability", label: "13. Liability" },
    { id: "third-party", label: "14. Third-Party Services" },
    { id: "general", label: "15. General Terms" },
    { id: "electronic-acceptance", label: "16. Electronic Acceptance" },
  ],
  Body: AtaraAgreementBody,
};
