import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Catalyst Digital Solutions",
  description: "Terms governing use of the Catalyst Digital Solutions website.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      effectiveDate="July 17, 2026"
      lastUpdated="July 17, 2026"
    >
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of the website at
        catalyst-digital-solutions.com (the &quot;Site&quot;), operated by Catalyst Digital
        Solutions LLC (&quot;Catalyst,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
      </p>
      <p>
        By using the Site, you agree to these Terms. If you don&apos;t agree, please don&apos;t use
        the Site.
      </p>

      <hr />

      <h2>1. Who we are</h2>
      <p>
        <strong>Catalyst Digital Solutions LLC</strong>
        <br />
        4012 Foxwood St, Bakersfield, CA 93306
        <br />
        (661) 535-9927
        <br />
        <a href="mailto:mario@catalyst-digital-solutions.com">
          mario@catalyst-digital-solutions.com
        </a>
      </p>

      <h2>2. What this Site is</h2>
      <p>
        The Site is informational. It describes our services, shows examples of our work, and lets
        you contact us or book a call.{" "}
        <strong>Nothing on this Site is an offer, a contract, or a guarantee.</strong>
      </p>

      <h2>3. Client engagements are governed by a separate agreement</h2>
      <p>
        If you become a Catalyst client, the work we do for you is governed by a{" "}
        <strong>separate written agreement</strong> between us — a proposal, statement of work, or
        service agreement. That agreement controls the scope, price, term, deliverables, and
        obligations of the engagement.
      </p>
      <p>
        <strong>These Terms govern your use of this Site only.</strong> Where these Terms and a
        signed client agreement conflict, the client agreement controls for that engagement.
      </p>
      <p>
        Prices shown on the Site are indicative starting points and may change. A price becomes
        binding only when it appears in a signed agreement.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site for any unlawful purpose</li>
        <li>
          Attempt to gain unauthorized access to the Site, its servers, or any connected systems
        </li>
        <li>
          Scrape, harvest, or extract data from the Site by automated means without our written
          permission
        </li>
        <li>Interfere with or disrupt the Site or its infrastructure</li>
        <li>
          Submit false information, impersonate another person, or submit a phone number you are
          not authorized to use
        </li>
        <li>
          Introduce malware, or attempt to probe, scan, or test the vulnerability of the Site
        </li>
        <li>Use the Site or its contents to build a competing product or service</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        The Site and its contents — text, design, graphics, code, layout, logos, and the Catalyst
        name and marks — are owned by Catalyst or its licensors and are protected by copyright,
        trademark, and other laws.
      </p>
      <p>
        You may view and print pages for your own reference. You may not copy, reproduce,
        republish, distribute, or create derivative works from the Site without our written
        permission.
      </p>
      <p>
        <strong>Demonstration sites.</strong> The example and demonstration sites linked from this
        Site were designed and built by Catalyst. Company names, logos, and brands shown on them
        are fictional or are used for illustration. They are our work product, shown as examples of
        our capability.
      </p>
      <p>
        <strong>Third-party marks.</strong> Any third-party names, logos, or trademarks appearing
        on the Site are the property of their respective owners and are used for identification
        only. Their appearance does not imply endorsement, affiliation, or sponsorship.
      </p>

      <h2>6. Phone contact</h2>
      <p>
        If you provide a phone number on this Site, you agree that we may call you about your
        inquiry. We do not currently send text messages from this Site. If text messaging is added
        later, we will update these Terms and our Privacy Policy and collect separate consent before
        sending any texts.
      </p>
      <p>
        How we handle your information is described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>7. Third-party links and services</h2>
      <p>
        The Site links to third-party websites and services we don&apos;t control. We provide those
        links for convenience. We are not responsible for their content, their accuracy, their
        availability, or their practices, and a link is not an endorsement. Your use of a
        third-party site is governed by that site&apos;s terms.
      </p>

      <h2>8. No guarantee of results</h2>
      <p>
        We&apos;re proud of our work, and we&apos;ll tell you plainly what we think we can do for
        you. But:
      </p>
      <p>
        <strong>
          Catalyst does not guarantee any specific business outcome.
        </strong>{" "}
        Marketing, search visibility, advertising, and automation results depend on many factors
        outside our control — your market, your competitors, your pricing, your capacity, your
        response to leads, the platforms we operate on and their rules, and general economic
        conditions.
      </p>
      <p>
        Any statistics, case examples, timelines, or performance figures on the Site are
        illustrative and reflect either published third-party research or past results in specific
        circumstances.{" "}
        <strong>Past results do not guarantee future results.</strong> Nothing on this Site is a
        promise, warranty, or guarantee of revenue, leads, rankings, bids won, or any other
        outcome.
      </p>
      <p>
        Any commitments we make about a specific engagement will be in that engagement&apos;s
        written agreement — not here.
      </p>

      <h2>9. Disclaimer of warranties</h2>
      <p>
        THE SITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF
        ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
      </p>
      <p>
        We do not warrant that the Site will be uninterrupted, timely, secure, or error-free, that
        defects will be corrected, or that the Site is free of viruses or other harmful components.
        We do not warrant the accuracy, completeness, or usefulness of any information on the Site.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, CATALYST AND ITS MEMBERS, OFFICERS, EMPLOYEES, AND
        AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY,
        OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, BUSINESS, OR GOODWILL,
        ARISING OUT OF OR RELATING TO YOUR USE OF THE SITE, WHETHER BASED IN CONTRACT, TORT, STRICT
        LIABILITY, OR ANY OTHER THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
        DAMAGES.
      </p>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR
        RELATING TO YOUR USE OF THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100).
      </p>
      <p>
        Some jurisdictions do not allow certain limitations of liability, so some of the above may
        not apply to you. In that case, our liability is limited to the greatest extent permitted
        by law.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Catalyst and its members, officers,
        employees, and agents from any claims, liabilities, damages, losses, and expenses —
        including reasonable attorneys&apos; fees — arising out of or related to your use of the
        Site, your violation of these Terms, or your violation of any rights of a third party.
      </p>

      <h2>12. Governing law and venue</h2>
      <p>
        These Terms are governed by the laws of the <strong>State of California</strong>, without
        regard to its conflict-of-law rules.
      </p>
      <p>
        Any dispute arising out of or relating to these Terms or the Site will be brought
        exclusively in the state or federal courts located in{" "}
        <strong>Kern County, California</strong>, and you consent to the personal jurisdiction of
        those courts.
      </p>

      <h2>13. General</h2>
      <p>
        <strong>Changes.</strong> We may update these Terms from time to time. Changes take effect
        when posted, and we&apos;ll revise the &quot;Last updated&quot; date. Your continued use of
        the Site after a change means you accept the updated Terms.
      </p>
      <p>
        <strong>Severability.</strong> If any provision of these Terms is found unenforceable, the
        rest remain in full force.
      </p>
      <p>
        <strong>No waiver.</strong> Our failure to enforce any provision is not a waiver of it.
      </p>
      <p>
        <strong>Entire agreement.</strong> These Terms and our Privacy Policy are the entire
        agreement between you and Catalyst regarding your use of the Site, and supersede any prior
        understanding about the Site.
      </p>

      <h2>14. Contact us</h2>
      <p>
        <strong>Catalyst Digital Solutions LLC</strong>
        <br />
        4012 Foxwood St, Bakersfield, CA 93306
        <br />
        <a href="mailto:mario@catalyst-digital-solutions.com">
          mario@catalyst-digital-solutions.com
        </a>
        <br />
        (661) 535-9927
      </p>
    </LegalPage>
  );
}
