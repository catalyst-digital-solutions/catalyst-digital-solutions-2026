"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Launchpad", href: "/services#launchpad" },
      { label: "Growth Engine", href: "/services#growth-engine" },
      { label: "Domination", href: "/services#domination" },
      { label: "Construction RFP AI", href: "/services#rfp-ai" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection — glassmorphic transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
          background: scrolled ? "rgba(0, 0, 0, 0.5)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(135%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(135%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.06)"
            : "1px solid transparent",
        }}
      >
        {/* Wordmark */}
        <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/catalyst-wordmark.png"
            alt="Catalyst Digital Solutions"
            width={120}
            height={40}
            style={{ height: "40px", width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            margin: "0 auto",
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                ref={dropdownRef}
                style={{ position: "relative" }}
              >
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--cds-heading)",
                    fontSize: "14px",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                      "var(--cds-purple-light)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color =
                      "var(--cds-heading)")
                  }
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="currentColor"
                    style={{
                      transition: "transform 0.2s",
                      transform: servicesOpen ? "rotate(180deg)" : "none",
                    }}
                  >
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Dropdown */}
                {servicesOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 16px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(8, 11, 15, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.09)",
                      borderRadius: "12px",
                      padding: "8px",
                      minWidth: "200px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(128,0,255,0.12)",
                    }}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setServicesOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          color: "var(--cds-body)",
                          fontFamily: "var(--font-inter)",
                          transition: "background 0.15s, color 0.15s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "rgba(128, 0, 255, 0.12)";
                          el.style.color = "var(--cds-purple-light)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "transparent";
                          el.style.color = "var(--cds-body)";
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "14px",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  color: "var(--cds-heading)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--cds-purple-light)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--cds-heading)")
                }
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right: Phone + CTA */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "16px", marginLeft: "auto" }}
          className="hidden md:flex"
        >
          <a
            href="tel:+16615359927"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "var(--cds-heading)",
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cds-cyan)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cds-heading)")
            }
          >
            {/* Phone icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "var(--cds-cyan)", flexShrink: 0 }}>
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                fill="currentColor"
              />
            </svg>
            (661) 535-9927
          </a>

          <Link href="/contact" className="btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
            Get a Free Audit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex md:hidden"
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--cds-heading)",
            padding: "8px",
          }}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M1 4h20M1 11h20M1 18h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(8, 11, 15, 0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            padding: "80px 32px 40px",
            gap: "8px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  fontSize: "28px",
                  fontFamily: "var(--font-bebas-neue)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--cds-heading)",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link.label}
              </Link>
              {link.children && (
                <div style={{ paddingLeft: "16px", paddingBottom: "8px" }}>
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontFamily: "var(--font-inter)",
                        color: "var(--cds-muted)",
                        padding: "6px 0",
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href="tel:+16615359927"
              style={{
                fontSize: "16px",
                color: "var(--cds-cyan)",
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
              }}
            >
              (661) 535-9927
            </a>
            <Link
              href="/contact"
              className="btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ justifyContent: "center" }}
            >
              Get a Free Audit
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
