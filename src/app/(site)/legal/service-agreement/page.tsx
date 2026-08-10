import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Client Service Agreement | Catalyst Digital Solutions",
  description:
    "Standard terms of service for Catalyst Digital Solutions monthly marketing programs.",
  alternates: {
    canonical: "https://catalyst-digital-solutions.com/legal/service-agreement",
  },
  robots: { index: true, follow: true },
};

export default function ServiceAgreementPage() {
  return (
    <div className={styles.root}>
      <header className="head">
        <div className="blob"></div>
        <div className="wrap">
          <span className="eyebrow">Catalyst Digital Solutions, LLC</span>
          <h1>Client Service<br />Agreement</h1>
          <div className="head-meta">
            Version 1.0 &nbsp;·&nbsp; Effective <b>August 8, 2026</b><br />
            Applies to the Foundation, Framework and Landmark monthly programs<br />
            Catalyst Digital Solutions, LLC &nbsp;·&nbsp; 4012 Foxwood St, Bakersfield, CA 93306
          </div>
        </div>
      </header>
      
      <div className="docMain">
        <div className="wrap">
      
          <p className="intro">This Agreement governs the monthly marketing programs provided by Catalyst Digital Solutions, LLC. It is written to be read, not to be survived. If any part of it is unclear or doesn't match what we discussed, say so before you subscribe and we'll fix it in writing.</p>
      
          <div className="note">
            <span className="lbl">Website terms</span>
            <p>Looking for the terms that govern use of our website? See our <a href="/terms">Terms of Service</a>.</p>
          </div>
      
          <div className="note">
            <span className="lbl">How you accept</span>
            <p>You accept this Agreement when you complete checkout for one of the programs described in Schedule A, or when you sign a copy of it, whichever happens first. Your checkout record — the date, the program selected, and the payment method authorized — forms the order details of this Agreement and is incorporated into it.</p>
          </div>
      
          <div className="toc">
            <span className="lbl">Contents</span>
            <ol>
              <li>Parties and definitions</li>
              <li>Services</li>
              <li>Term and renewal</li>
              <li>Fees and automatic billing</li>
              <li>Build fee waiver</li>
              <li>Delivery and phasing</li>
              <li>Third-party and pass-through costs</li>
              <li>Your responsibilities</li>
              <li>Ownership of the website and accounts</li>
              <li>Procedures, training materials and intellectual property</li>
              <li>Confidentiality</li>
              <li>No guarantee of results</li>
              <li>Content warranty and indemnity</li>
              <li>Suspension and termination</li>
              <li>Limitation of liability</li>
              <li>Disputes and chargebacks</li>
              <li>Governing law</li>
              <li>General provisions</li>
              <li>Schedule A — Programs and fees</li>
            </ol>
          </div>
      
          {/* 1 */}
          <h2><span className="n">01</span>Parties and definitions</h2>
          <p><strong>"Catalyst," "we," "us"</strong> means Catalyst Digital Solutions, LLC, a California limited liability company located at 4012 Foxwood St, Bakersfield, CA 93306.</p>
          <p><strong>"Client," "you"</strong> means the individual or legal entity identified at checkout. If you are subscribing on behalf of a company, you represent that you are authorized to bind that company, and "you" means that company. You agree to provide the exact legal entity name on request.</p>
          <p><strong>"Program"</strong> means the monthly service package you selected — Foundation, Framework or Landmark — as described in Schedule A.</p>
          <p><strong>"Build Fee"</strong> means the standard $5,000 minimum fee for a custom website build, which may be waived under Section 5.</p>
          <p><strong>"Deliverables"</strong> means the website, written procedures, content, configurations and other work product we produce for you under a Program.</p>
      
          {/* 2 */}
          <h2><span className="n">02</span>Services</h2>
          <p>We will provide the services included in your Program, as described in Schedule A and in the written proposal delivered to you. Schedule A controls if the two ever conflict.</p>
          <p>Programs are inclusive: each Program contains everything in the Program below it at a single price. Upgrading takes effect on your next billing date. Downgrading takes effect at the end of your current Minimum Term or, after that, on your next billing date.</p>
          <p>We may substitute a tool, vendor or platform for another of equivalent or better capability without notice, provided the outcome you were promised is unchanged. Specific tool names in marketing materials are illustrative, not contractual.</p>
      
          {/* 3 */}
          <h2><span className="n">03</span>Term and renewal</h2>
          <ol className="abc">
            <li><strong>Minimum Term.</strong> Your subscription carries a minimum term of <strong>six (6) consecutive paid monthly billing cycles</strong> beginning on the date of your first payment.</li>
            <li><strong>After the Minimum Term.</strong> The subscription continues automatically on a month-to-month basis until cancelled. You may cancel at any time after the Minimum Term with written notice before your next billing date, and you will not be charged again.</li>
            <li><strong>Cancelling during the Minimum Term.</strong> You may stop the work at any time. Doing so before the sixth paid cycle triggers the consequences in Section 5(c) and Section 9(c). It does not create a right to a refund of amounts already paid.</li>
            <li><strong>Written notice</strong> means email to the address in the footer of this Agreement. Cancelling through the payment processor's customer portal is also effective as notice.</li>
          </ol>
      
          {/* 4 */}
          <h2><span className="n">04</span>Fees and automatic billing</h2>
          <ol className="abc">
            <li><strong>Amount and timing.</strong> Program fees are stated in Schedule A. The first month is charged at the time you subscribe — not at kickoff and not at launch. Each subsequent month is charged on the same calendar day.</li>
            <li><strong>Authorization to charge.</strong> By subscribing, you authorize Catalyst to charge the payment method you provide — credit card or bank account — on a recurring monthly basis for the Program fee and for any pass-through costs you have approved in writing under Section 7. This authorization remains in effect until you cancel in accordance with Section 3.</li>
            <li><strong>ACH / bank debits.</strong> If you pay by bank account, you authorize recurring electronic debits from that account. You may revoke this authorization by cancelling under Section 3; revoking it without cancelling does not end your obligation to pay.</li>
            <li><strong>No invoicing.</strong> We do not invoice on net terms and we do not accept checks. Recurring automatic payment is a condition of every Program.</li>
            <li><strong>Failed payments.</strong> If a charge fails, we will retry. If payment is not received within seven (7) days of the due date, we may suspend work under Section 14.</li>
            <li><strong>No setup fee.</strong> The first month's fee covers onboarding, deployment and configuration.</li>
            <li><strong>Price changes.</strong> Your rate is locked for the Minimum Term. After that, we may change pricing with thirty (30) days' written notice, and you may cancel before the change takes effect.</li>
            <li><strong>Taxes.</strong> Fees are exclusive of any applicable sales or use taxes, which are your responsibility.</li>
          </ol>
      
          {/* 5 */}
          <h2><span className="n">05</span>Build fee waiver</h2>
          <ol className="abc">
            <li><strong>What is waived.</strong> When you subscribe to a Program and complete the Minimum Term, the $5,000 Build Fee for your custom website is waived in full. Sites exceeding ten (10) pages may carry additional per-page fees, quoted and approved in writing before build.</li>
            <li><strong>It is earned, not discounted.</strong> The waiver is consideration for completing six paid cycles. It is not a price reduction and it does not vest at signature.</li>
            <li><strong>If you cancel early.</strong> If your subscription ends before the sixth paid cycle for any reason other than our material breach, the full $5,000 Build Fee becomes immediately due and payable. Until it is paid, ownership of the website does not transfer under Section 9 and the site remains hosted on our infrastructure. We will not delete or hold your content hostage — you may request an export of your content at any time at no charge.</li>
            <li><strong>Buying outright instead.</strong> You may decline the waiver and purchase the website outright for the Build Fee. In that case ownership transfers on the date payment clears, with no minimum term attached.</li>
          </ol>
      
          {/* 6 */}
          <h2><span className="n">06</span>Delivery and phasing</h2>
          <ol className="abc">
            <li><strong>Phased build.</strong> Program services are delivered in phases over approximately forty-five (45) days from the intake call, in the order set out in your proposal. Not every included service begins in month one; content production, distribution and automation are scheduled in later phases by design, because they depend on the assets built in earlier phases.</li>
            <li><strong>Automated messaging.</strong> Any service involving automated SMS to your customers — instant lead acknowledgment, rapid lead response, or automated review requests — requires carrier registration of a dedicated number in your business's name. This is a third-party approval process outside our control and typically completes within two to four weeks. Those services activate on approval. Email-based equivalents operate from launch.</li>
            <li><strong>Estimates.</strong> Timelines are good-faith estimates, not guarantees. Timelines extend by the length of any delay caused by your late delivery of materials, access or approvals under Section 8.</li>
          </ol>
      
          {/* 7 */}
          <h2><span className="n">07</span>Third-party and pass-through costs</h2>
          <p>Program fees cover our services. They do not cover money paid to third parties on your behalf. The following are separate, and we will quote and obtain your written approval before incurring any of them:</p>
          <ul className="plain">
            <li><strong>Advertising spend.</strong> Any paid advertising budget is billed to your own payment method, held in your own advertising accounts. We will not place ad spend on our card or run ads from an account under our login.</li>
            <li><strong>Directory, citation and listing fees.</strong> Some directories and data aggregators charge to add, correct or claim a listing.</li>
            <li><strong>Content beyond the included volume.</strong> Each Program includes a stated monthly volume of content. Additional blog posts, pages, video or clip production beyond that volume is quoted separately.</li>
            <li><strong>Domains, premium plugins, licensed imagery and third-party subscriptions</strong> registered in your name.</li>
          </ul>
      
          {/* 8 */}
          <h2><span className="n">08</span>Your responsibilities</h2>
          <p>You agree to:</p>
          <ul className="plain">
            <li>Attend the intake call and provide brand direction, service priorities and target-customer information.</li>
            <li>Provide business documentation reasonably required to build accurate marketing assets, which may include licensing, insurance certificates, trade certifications and project references.</li>
            <li>Provide administrative access to your domain registrar, hosting, Google Business Profile and analytics accounts.</li>
            <li>Supply photographs, project details and factual claims about your business, and confirm their accuracy.</li>
            <li>Respond to requests for approval within five (5) business days. Materials not rejected within that window are deemed approved so the build can continue.</li>
          </ul>
          <p>You remain solely responsible for the accuracy of factual claims about your business, including years in operation, certifications, licensure and service capabilities.</p>
      
          {/* 9 */}
          <h2><span className="n">09</span>Ownership of the website and accounts</h2>
          <ol className="abc">
            <li><strong>Accounts are yours.</strong> Your domain, hosting, Google Business Profile, analytics and advertising accounts are registered in your name and under your ownership. We are added as a user. You may remove our access at any time.</li>
            <li><strong>Website ownership vests</strong> in you upon completion of six consecutive paid monthly cycles, or upon payment of the Build Fee under Section 5(d), whichever occurs first. On vesting, we assign to you all right, title and interest in the custom design, copy and page content produced for your site.</li>
            <li><strong>Before vesting</strong>, we grant you a non-exclusive, non-transferable license to use the website in the operation of your business for as long as your subscription is current.</li>
            <li><strong>Excluded from transfer</strong> are our underlying frameworks, component libraries, internal tooling, workflow automations and any third-party software, all of which remain ours or their licensors' and are licensed to you for use in connection with your site.</li>
          </ol>
      
          {/* 10 */}
          <h2><span className="n">10</span>Procedures, training materials and intellectual property</h2>
          <ol className="abc">
            <li><strong>Yours to keep.</strong> Standard operating procedures, written documentation and training materials we deliver to you are yours permanently. That is true whether you complete the Minimum Term or not, and whether or not the Build Fee is outstanding. We will not attempt to claw them back.</li>
            <li><strong>Personal license.</strong> These materials are licensed to you and your employees for use in your own business and in a business you own. You may not resell them, publish them, or distribute them as a standalone product or course.</li>
            <li><strong>Mentoring sessions.</strong> Where your Program includes monthly mentoring or strategy time, unused hours do not roll over. Sessions are scheduled by mutual agreement and may be recorded for your reference with the consent of both parties.</li>
            <li><strong>No exclusivity.</strong> Nothing in this Agreement restricts either party from working with, advising, or serving any other business, including businesses in the same industry. Nothing in this Agreement creates a partnership, joint venture, agency or employment relationship between us.</li>
          </ol>
      
          {/* 11 */}
          <h2><span className="n">11</span>Confidentiality</h2>
          <p>Each party will keep the other's non-public business information confidential and use it only to perform this Agreement. This does not apply to information that is public through no fault of the receiving party, was already known to it, or is required to be disclosed by law. Either party may state publicly that the other is a client or service provider, and we may reference your project in our portfolio unless you tell us in writing not to.</p>
      
          {/* 12 */}
          <h2><span className="n">12</span>No guarantee of results</h2>
          <div className="note">
            <span className="lbl">Read this one</span>
            <p>Search rankings, lead volume, call volume, revenue and contract awards depend on factors outside our control — including search engine algorithms, competitor activity, market conditions, seasonality, your pricing, your responsiveness to leads, and your ability to close work. <strong>We do not guarantee any specific ranking, traffic level, number of leads, or amount of revenue.</strong> Any timeline, projection or example figure discussed in a proposal, on a call or in marketing material is an illustration, not a promise.</p>
          </div>
          <p>What we do commit to is performing the services in your Program competently and in good faith, and reporting honestly on what is and isn't working.</p>
      
          {/* 13 */}
          <h2><span className="n">13</span>Content warranty and indemnity</h2>
          <ol className="abc">
            <li><strong>Your warranty.</strong> You represent and warrant that any content you provide to us — text, images, logos, testimonials, reviews, project descriptions and factual claims — is either owned by you or properly licensed to you, is accurate, and does not infringe the rights of any third party or violate any law governing advertising, endorsements or testimonials.</li>
            <li><strong>Existing content.</strong> If we identify content on your existing web properties that appears to infringe a third party's rights or to misstate facts about your business, we will tell you. Removing or correcting it is your decision and your responsibility. We may decline to reuse or republish any such content.</li>
            <li><strong>Indemnity.</strong> You will defend, indemnify and hold us harmless from any third-party claim arising out of content you supplied or directed us to publish, or out of your business operations. We will defend, indemnify and hold you harmless from any third-party claim that original work product we created for you infringes that party's intellectual property rights.</li>
          </ol>
      
          {/* 14 */}
          <h2><span className="n">14</span>Suspension and termination</h2>
          <ol className="abc">
            <li><strong>Suspension for non-payment.</strong> If payment is more than seven (7) days late, we may suspend all work and pause hosting of unvested deliverables until the account is current. Suspension does not extend the Minimum Term or excuse accrued fees.</li>
            <li><strong>Termination for cause.</strong> Either party may terminate immediately if the other materially breaches this Agreement and fails to cure within fifteen (15) days of written notice.</li>
            <li><strong>Our termination without cause.</strong> We may terminate on thirty (30) days' written notice. If we do so before your Minimum Term is complete and you are not in breach, the Build Fee waiver survives, ownership vests immediately, and we will refund any unused portion of the current month.</li>
            <li><strong>Effect of termination.</strong> Sections 5(c), 9, 10, 11, 12, 13, 15, 16 and 17 survive. Fees already paid are non-refundable except as stated in 14(c).</li>
            <li><strong>Abusive conduct.</strong> We may terminate immediately, with pro-rated refund of the current month, in response to abusive, threatening or unlawful conduct toward us or anyone working with us.</li>
          </ol>
      
          {/* 15 */}
          <h2><span className="n">15</span>Limitation of liability</h2>
          <p>To the maximum extent permitted by law, neither party is liable to the other for indirect, incidental, special, consequential, exemplary or punitive damages, or for lost profits, lost revenue, lost business opportunity, or loss of data, even if advised of the possibility.</p>
          <p>Our total aggregate liability arising out of or relating to this Agreement will not exceed <strong>the total fees you paid to us in the three (3) months immediately preceding the event giving rise to the claim.</strong></p>
          <p>Nothing in this section limits either party's liability for fraud, willful misconduct, or any liability that cannot be limited by law.</p>
      
          {/* 16 */}
          <h2><span className="n">16</span>Disputes and chargebacks</h2>
          <p>If you have a billing concern, contact us first. We will work it out. Initiating a chargeback or payment dispute without first contacting us is a material breach of this Agreement, and we may suspend service immediately and recover our costs of responding to the dispute.</p>
          <p>Before either party files a lawsuit, both agree to spend at least thirty (30) days attempting to resolve the matter in good faith, in writing.</p>
      
          {/* 17 */}
          <h2><span className="n">17</span>Governing law</h2>
          <p>This Agreement is governed by the laws of the State of California, without regard to its conflict-of-laws rules. The parties consent to exclusive jurisdiction and venue in the state and federal courts located in Kern County, California. Each party waives any objection to that venue on grounds of inconvenience.</p>
          <p>The prevailing party in any action to enforce this Agreement is entitled to recover reasonable attorneys' fees and costs.</p>
      
          {/* 18 */}
          <h2><span className="n">18</span>General provisions</h2>
          <ol className="abc">
            <li><strong>Entire agreement.</strong> This Agreement, together with Schedule A and your checkout record, is the complete agreement between us and supersedes all prior discussions, proposals, emails and calls. Statements made during sales conversations that are not written here are not binding.</li>
            <li><strong>Amendments.</strong> Changes must be in writing and agreed by both parties. We may update these standard terms for new subscriptions at any time; the version in effect when you subscribed governs your Minimum Term.</li>
            <li><strong>Assignment.</strong> Neither party may assign this Agreement without the other's written consent, except to a successor in connection with a merger or sale of substantially all assets.</li>
            <li><strong>Severability.</strong> If any provision is held unenforceable, the rest remains in effect and the unenforceable provision is modified to the minimum extent necessary to make it enforceable.</li>
            <li><strong>No waiver.</strong> Failure to enforce a provision is not a waiver of it.</li>
            <li><strong>Force majeure.</strong> Neither party is liable for delay caused by events beyond its reasonable control.</li>
            <li><strong>Electronic signatures.</strong> Electronic acceptance, including completing checkout, has the same legal effect as a handwritten signature.</li>
            <li><strong>Notices.</strong> Notices go to the email addresses the parties use to correspond, and are effective on delivery.</li>
          </ol>
      
          {/* Schedule A */}
          <h2><span className="n">A</span>Schedule A — Programs and fees</h2>
          <p>All programs are billed monthly, in advance, on the recurring automatic basis described in Section 4, and carry the six-month Minimum Term described in Section 3.</p>
      
          <table>
            <thead>
              <tr><th>Program</th><th>Monthly fee</th><th>Includes</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Foundation</strong></td>
                <td className="amt">$1,497</td>
                <td>Custom website build, on-page and technical SEO, Google Business Profile setup and management, analytics and conversion tracking, monthly maintenance and reporting, instant lead acknowledgment, written SOP library, monthly report review call.</td>
              </tr>
              <tr>
                <td><strong>Framework</strong></td>
                <td className="amt">$2,997</td>
                <td>Everything in Foundation, plus four (4) hours per month of private mentoring and Q&amp;A, tool stack and vendor access, annotated SOPs, video and short-form content production and distribution, advanced and programmatic SEO, local SEO and citation cleanup, AI-search optimization, call tracking, CRM setup, rapid lead response and automated review requests.</td>
              </tr>
              <tr>
                <td><strong>Landmark</strong></td>
                <td className="amt">$7,997</td>
                <td>Everything in Framework, plus bid and RFP aggregation, expanded video and clip production, 24/7 AI voice agent, website chatbot, competitive intelligence, full automation suite, monthly strategy session, and priority support.</td>
              </tr>
            </tbody>
          </table>
      
          <table>
            <thead>
              <tr><th>Other</th><th>Amount</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Website Build Fee</strong></td><td className="amt">$5,000</td><td>Waived on completion of the Minimum Term. See Section 5. Additional pages beyond ten quoted separately, approximately $500 per page.</td></tr>
              <tr><td><strong>Pass-through costs</strong></td><td className="amt">At cost</td><td>Advertising spend, citation and directory fees, content beyond included volume, domains and third-party licenses. Quoted and approved in advance. See Section 7.</td></tr>
            </tbody>
          </table>
      
          <div className="note" style={{marginTop: '34px'}}>
            <span className="lbl">Questions before you subscribe</span>
            <p>If any term here doesn't match what we discussed, don't sign around it — tell me and we'll correct the document. <a href="mailto:mario@catalyst-digital-solutions.com">mario@catalyst-digital-solutions.com</a> or (661) 888-4837.</p>
          </div>
      
        </div>
      </div>
      
      <div className="docFoot">
        <div className="wrap">
          <b>Catalyst Digital Solutions, LLC</b><br />
          4012 Foxwood St, Bakersfield, CA 93306<br />
          (661) 888-4837 &nbsp;·&nbsp; mario@catalyst-digital-solutions.com<br />
          Monday–Friday, 8:00 AM – 6:00 PM PT<br />
          <a href="https://catalyst-digital-solutions.com">catalyst-digital-solutions.com</a><br /><br />
          Client Service Agreement v1.0 &nbsp;·&nbsp; Effective August 8, 2026
        </div>
      </div>
    </div>
  );
}
