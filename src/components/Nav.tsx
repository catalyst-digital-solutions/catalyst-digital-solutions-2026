"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES = [
  { label: "Websites & Branding", href: "/services/websites" },
  { label: "SEO", href: "/services/seo" },
  { label: "Google Optimization & Reviews", href: "/services/google-reviews" },
  { label: "Advertising", href: "/services/advertising" },
  { label: "Content Generation", href: "/services/content" },
  { label: "Operations & Automation", href: "/services/automation" },
  { label: "Construction RFP AI", href: "/services/rfp-ai" },
];

const TOP = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: SERVICES },
  { label: "Quick Wins", href: "/quick-wins" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

const linkBase: CSSProperties = { color: "#c8c8c8", textDecoration: "none" };
const linkActive: CSSProperties = { color: "#fafafa", fontWeight: 600, textDecoration: "none" };

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      data-screen-label="Nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
        padding: "20px clamp(20px,5vw,64px)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "rgba(9,12,17,.61)",
          backdropFilter: "blur(18px) saturate(135%)",
          WebkitBackdropFilter: "blur(18px) saturate(135%)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 8px 30px rgba(0,0,0,.35)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity .4s ease",
          pointerEvents: "none",
        }}
      />

      <Link href="/" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", textDecoration: "none", flex: "none" }}>
        <Image src="/assets/cds-wordmark.png" alt="Catalyst Digital Solutions" width={150} height={36} style={{ display: "block", width: 150, height: "auto" }} priority />
      </Link>

      <nav
        className="nav-links"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "clamp(18px,2.4vw,36px)",
          fontSize: 14.5,
          color: "#c8c8c8",
          flexWrap: "wrap",
        }}
      >
        {TOP.map((item) =>
          item.children ? (
            <div key={item.href} className="nav-drop" style={{ display: "inline-flex" }}>
              <Link
                href={item.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  ...(servicesActive ? linkActive : linkBase),
                }}
              >
                Services <span style={{ fontSize: 10, color: "#7f8896" }}>▾</span>
              </Link>
              <div className="nav-drop-menu">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 264,
                    padding: 10,
                    background: "rgba(9,12,17,.96)",
                    backdropFilter: "blur(18px) saturate(135%)",
                    WebkitBackdropFilter: "blur(18px) saturate(135%)",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: 14,
                    boxShadow: "0 24px 60px rgba(0,0,0,.55)",
                  }}
                >
                  {item.children.map((child) => {
                    const active = isActive(pathname, child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: "block",
                          padding: "10px 14px",
                          borderRadius: 9,
                          color: active ? "#fafafa" : "#c8c8c8",
                          fontWeight: active ? 600 : 400,
                          background: active ? "rgba(128,0,255,.14)" : "transparent",
                          textDecoration: "none",
                          fontSize: 14,
                        }}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <Link key={item.href} href={item.href} style={isActive(pathname, item.href) ? linkActive : linkBase}>
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(14px,1.8vw,24px)", flex: "none" }}>
        <a
          href="tel:+16618884837"
          className="nav-phone"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: "#fafafa",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" style={{ flex: "none" }} aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="nav-phone-num">(661) 888-4837</span>
        </a>
        <Link
          href="/contact"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 14.5,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg,#8000ff,#5600ab)",
            border: "none",
            padding: "11px 20px",
            borderRadius: 9,
            boxShadow: "0 6px 24px rgba(128,0,255,.35)",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Book a 20-Minute Call
        </Link>
      </div>

      <button
        type="button"
        className="nav-burger"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        style={{
          position: "relative",
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,.14)",
          background: "rgba(255,255,255,.04)",
          cursor: "pointer",
          flex: "none",
          display: "none",
          color: "#fafafa",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      {mobileOpen && (
        <div
          className="nav-panel nav-panel-open"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 2,
            padding: "16px clamp(20px,5vw,64px) 26px",
            fontSize: 17,
            background: "rgba(9,12,17,.96)",
            backdropFilter: "blur(18px) saturate(135%)",
            WebkitBackdropFilter: "blur(18px) saturate(135%)",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 24px 50px rgba(0,0,0,.5)",
          }}
        >
          {TOP.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                style={{
                  display: "block",
                  padding: "9px 0",
                  ...(isActive(pathname, item.href) || (item.children && servicesActive) ? linkActive : linkBase),
                }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 16,
                    borderLeft: "1px solid rgba(255,255,255,.12)",
                    margin: "2px 0 6px",
                  }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      style={{
                        color: isActive(pathname, child.href) ? "#fafafa" : "#9aa3b0",
                        fontWeight: isActive(pathname, child.href) ? 600 : 400,
                        textDecoration: "none",
                        fontSize: 15,
                        padding: "9px 0",
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="tel:+16618884837" style={{ color: "#00d4ff", textDecoration: "none", fontWeight: 600, padding: "9px 0" }}>
            Call (661) 888-4837
          </a>
        </div>
      )}
    </header>
  );
}
