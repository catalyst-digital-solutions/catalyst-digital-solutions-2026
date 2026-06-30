import Link from "next/link";
import RotatingWord from "@/components/home/RotatingWord";

/* ── Building SVG — exact port from CDS Hero.dc.html lines 96–153 ── */
function BuildingVisual() {
  return (
    <div
      style={{
        flex: "1 1 420px",
        minWidth: "300px",
        position: "relative",
        alignSelf: "stretch",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "480px",
      }}
    >
      {/* Purple ambient glow blob — glowPulse 8s */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "560px",
          height: "560px",
          maxWidth: "120%",
          background: "radial-gradient(circle at center,rgba(128,0,255,.4),transparent 62%)",
          filter: "blur(20px)",
          animation: "glowPulse 8s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Animated cyan grid — gridDrift 24s */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,212,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.07) 1px,transparent 1px)",
          backgroundSize: "54px 54px",
          animation: "gridDrift 24s linear infinite",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%,#000 35%,transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%,#000 35%,transparent 78%)",
          willChange: "background-position",
        }}
      />

      {/* Beam sweeps — t1 through t4 */}
      <div style={{ position:"absolute",left:"6%",top:"42%",width:"130px",height:"2px",borderRadius:"2px",background:"linear-gradient(90deg,transparent,#00d4ff)",boxShadow:"0 0 12px rgba(0,212,255,.8)",animation:"t1 5.5s ease-in infinite",willChange:"transform,opacity" }} />
      <div style={{ position:"absolute",left:"2%",top:"30%",width:"160px",height:"2px",borderRadius:"2px",background:"linear-gradient(90deg,transparent,#b56bff)",boxShadow:"0 0 12px rgba(181,107,255,.8)",animation:"t2 7s ease-in infinite",animationDelay:"1.4s",willChange:"transform,opacity" }} />
      <div style={{ position:"absolute",right:"4%",top:"24%",width:"120px",height:"2px",borderRadius:"2px",background:"linear-gradient(90deg,#00d4ff,transparent)",boxShadow:"0 0 12px rgba(0,212,255,.7)",animation:"t3 6.2s ease-in infinite",animationDelay:"2.6s",willChange:"transform,opacity" }} />
      <div style={{ position:"absolute",left:"8%",top:"62%",width:"140px",height:"2px",borderRadius:"2px",background:"linear-gradient(90deg,transparent,#8000ff)",boxShadow:"0 0 12px rgba(128,0,255,.8)",animation:"t4 6.8s ease-in infinite",animationDelay:".8s",willChange:"transform,opacity" }} />

      {/* Building SVG — floatY 9s ease-in-out infinite */}
      <svg
        viewBox="0 0 420 520"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "520px",
          height: "auto",
          animation: "floatY 9s ease-in-out infinite",
          willChange: "transform",
        }}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="cg" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ant" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b56bff" />
            <stop offset="1" stopColor="#00d4ff" />
          </linearGradient>
        </defs>

        {/* Ground line */}
        <line x1="20" y1="470" x2="400" y2="470" stroke="#00d4ff" strokeOpacity=".18" strokeWidth="1" />

        {/* Secondary building (left) */}
        <g stroke="#00d4ff" strokeOpacity=".35" strokeWidth="1.1">
          <rect x="64" y="306" width="74" height="164" />
          <line x1="64" y1="340" x2="138" y2="340" />
          <line x1="64" y1="374" x2="138" y2="374" />
          <line x1="64" y1="408" x2="138" y2="408" />
          <line x1="64" y1="442" x2="138" y2="442" />
          <line x1="101" y1="306" x2="101" y2="470" />
        </g>

        {/* Main tower */}
        <g stroke="#00d4ff" strokeWidth="1.4" filter="url(#cg)">
          {/* Top face */}
          <path d="M150 150 L280 150 L328 120 L198 120 Z" strokeOpacity=".9" />
          {/* Right side face */}
          <path d="M280 150 L328 120 L328 440 L280 470 Z" strokeOpacity=".7" />
          {/* Front face */}
          <rect x="150" y="150" width="130" height="320" strokeOpacity="1" />
          {/* Front floor lines */}
          <line x1="150" y1="182" x2="280" y2="182" strokeOpacity=".55" />
          <line x1="150" y1="214" x2="280" y2="214" strokeOpacity=".55" />
          <line x1="150" y1="246" x2="280" y2="246" strokeOpacity=".55" />
          <line x1="150" y1="278" x2="280" y2="278" strokeOpacity=".55" />
          <line x1="150" y1="310" x2="280" y2="310" strokeOpacity=".55" />
          <line x1="150" y1="342" x2="280" y2="342" strokeOpacity=".55" />
          <line x1="150" y1="374" x2="280" y2="374" strokeOpacity=".55" />
          <line x1="150" y1="406" x2="280" y2="406" strokeOpacity=".55" />
          <line x1="150" y1="438" x2="280" y2="438" strokeOpacity=".55" />
          {/* Front mullions */}
          <line x1="183" y1="150" x2="183" y2="470" strokeOpacity=".45" />
          <line x1="215" y1="150" x2="215" y2="470" strokeOpacity=".45" />
          <line x1="247" y1="150" x2="247" y2="470" strokeOpacity=".45" />
          {/* Side floor lines */}
          <line x1="280" y1="182" x2="328" y2="152" strokeOpacity=".3" />
          <line x1="280" y1="246" x2="328" y2="216" strokeOpacity=".3" />
          <line x1="280" y1="310" x2="328" y2="280" strokeOpacity=".3" />
          <line x1="280" y1="374" x2="328" y2="344" strokeOpacity=".3" />
          <line x1="280" y1="438" x2="328" y2="408" strokeOpacity=".3" />
          {/* Antenna */}
          <line x1="221" y1="120" x2="221" y2="78" stroke="url(#ant)" strokeWidth="1.6" />
        </g>
        <circle cx="221" cy="76" r="3.5" fill="#00d4ff" filter="url(#cg)" />

        {/* Lit windows — winPulse */}
        <rect x="151" y="183" width="31" height="30" fill="#00d4ff" style={{ animation: "winPulse 4s ease-in-out infinite" }} />
        <rect x="216" y="247" width="31" height="30" fill="#8000ff" style={{ animation: "winPulse 5s ease-in-out infinite", animationDelay: "1s" }} />
        <rect x="248" y="311" width="31" height="30" fill="#00d4ff" style={{ animation: "winPulse 4.6s ease-in-out infinite", animationDelay: ".6s" }} />
        <rect x="151" y="375" width="31" height="30" fill="#b56bff" style={{ animation: "winPulse 5.4s ease-in-out infinite", animationDelay: "1.8s" }} />
        <rect x="184" y="407" width="31" height="30" fill="#00d4ff" style={{ animation: "winPulse 4.2s ease-in-out infinite", animationDelay: "2.2s" }} />
      </svg>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#080b0f",
        fontFamily: "'Inter',sans-serif",
        color: "#c8c8c8",
        overflow: "hidden",
      }}
    >
      <main
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "40px",
          padding: "clamp(24px,4vw,56px) clamp(20px,5vw,64px) clamp(40px,5vw,72px)",
          marginTop: "64px", /* offset for fixed nav */
        }}
      >
        {/* Left — Copy */}
        <div
          style={{
            flex: "1 1 520px",
            minWidth: "300px",
            maxWidth: "720px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(54px,6.6vw,118px)",
              lineHeight: 0.88,
              letterSpacing: "1px",
              color: "#fafafa",
              margin: 0,
            }}
          >
            <div>
              We don&apos;t do{" "}
              <span style={{ color: "#7f8896" }}>&ldquo;marketing.&rdquo;</span>
            </div>
            <div>
              We do more <RotatingWord />.
            </div>
          </h1>

          <p
            style={{
              fontSize: "clamp(19px,1.5vw,23px)",
              fontWeight: 600,
              color: "#fafafa",
              margin: "30px 0 0",
              lineHeight: 1.4,
              fontFamily: "'Inter',sans-serif",
            }}
          >
            That&apos;s what you hire Catalyst for: a fatter bottom line.
          </p>

          <p
            style={{
              fontSize: "clamp(15.5px,1.1vw,17px)",
              color: "#c8c8c8",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "18px 0 0",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            You didn&apos;t become a contractor to build websites and babysit
            algorithms. You got into it to build things and make a great living.
            You don&apos;t care about SEO keywords. You want a business that puts
            money in the bank and lets you step away whenever you want.
            That&apos;s what we build.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg,#8000ff,#5600ab)",
                border: "none",
                padding: "16px 30px",
                borderRadius: "11px",
                boxShadow: "0 10px 34px rgba(128,0,255,.4)",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Get a Free Audit <span style={{ fontSize: "18px" }}>→</span>
            </Link>
            <Link
              href="#how-it-works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#fafafa",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.18)",
                padding: "16px 28px",
                borderRadius: "11px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "11px" }}>▶</span> See How It Works
            </Link>
          </div>
        </div>

        {/* Right — Building visual */}
        <BuildingVisual />
      </main>
    </section>
  );
}
