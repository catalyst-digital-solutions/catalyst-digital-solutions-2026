import Link from "next/link";
import Image from "next/image";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      {/* Main grid */}
      <div className="footer-grid">
        {/* Col 1 — Brand */}
        <div className="footer-brand">
          <Link href="/">
            <Image
              src="/assets/catalyst-wordmark.png"
              alt="Catalyst Digital Solutions"
              width={130}
              height={44}
              style={{ height: "44px", width: "auto" }}
            />
          </Link>
          <p className="footer-tagline">
            Bakersfield&apos;s construction growth partner.
          </p>
        </div>

        {/* Col 2 — Pages */}
        <div>
          <p className="footer-col-heading eyebrow">Pages</p>
          <nav aria-label="Footer pages">
            <ul className="footer-link-list">
              {PAGES.map((page) => (
                <li key={page.label}>
                  <Link href={page.href} className="footer-link">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <p className="footer-col-heading eyebrow">Get in Touch</p>
          <ul className="footer-link-list">
            <li>
              <a href="tel:+16615359927" className="footer-link footer-contact-link">
                <PhoneIcon />
                (661) 535-9927
              </a>
            </li>
            <li>
              <a
                href="mailto:info@catalyst-digital-solutions.com"
                className="footer-link footer-contact-link"
              >
                <MailIcon />
                info@catalyst-digital-solutions.com
              </a>
            </li>
            <li>
              <span className="footer-contact-link">
                <PinIcon />
                Bakersfield, CA 93306
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4 — Start */}
        <div>
          <p className="footer-col-heading eyebrow">Start</p>
          <Link href="/contact" className="btn-primary footer-cta">
            Get a Free Audit →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© 2026 Catalyst Digital Solutions, LLC. All rights reserved.</span>
        <span className="footer-dot">·</span>
        <Link href="/privacy" className="footer-link">Privacy Policy</Link>
        <span className="footer-dot">·</span>
        <Link href="/terms" className="footer-link">Terms</Link>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "var(--cds-cyan)", flexShrink: 0 }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "var(--cds-cyan)", flexShrink: 0 }}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: "var(--cds-cyan)", flexShrink: 0 }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
    </svg>
  );
}
