import Link from "next/link";
import RotatingWord from "@/components/home/RotatingWord";

/* ── Isometric wireframe cube ─────────────────── */
function IsometricCube() {
  // Projection: isoPoint(x,y,z) → [sx, sy]
  // Origin (0,0,0) → screen (280, 360)
  // u=52, cos30≈0.866, sin30=0.5
  const u = 52;
  const c = 0.866;
  const s = 0.5;
  const ox = 280;
  const oy = 360;
  const cols = 4;
  const rows = 4;
  const hgt = 3;

  function p(x: number, y: number, z: number): [number, number] {
    return [ox + (x - y) * u * c, oy + (x + y) * u * s - z * u];
  }

  function pts(...coords: [number, number, number][]): string {
    return coords.map(([x, y, z]) => p(x, y, z).join(",")).join(" ");
  }

  const gridStroke = "rgba(0,212,255,0.22)";
  const edgeStroke = "rgba(0,212,255,0.55)";

  // Build grid lines
  const topLines: React.ReactNode[] = [];
  for (let i = 0; i <= cols; i++) {
    const [x1, y1] = p(i, 0, hgt);
    const [x2, y2] = p(i, rows, hgt);
    topLines.push(<line key={`tx${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gridStroke} strokeWidth="0.8" />);
  }
  for (let j = 0; j <= rows; j++) {
    const [x1, y1] = p(0, j, hgt);
    const [x2, y2] = p(cols, j, hgt);
    topLines.push(<line key={`ty${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gridStroke} strokeWidth="0.8" />);
  }

  const rightLines: React.ReactNode[] = [];
  for (let i = 0; i <= cols; i++) {
    const [x1, y1] = p(i, 0, 0);
    const [x2, y2] = p(i, 0, hgt);
    rightLines.push(<line key={`rx${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gridStroke} strokeWidth="0.8" />);
  }
  for (let k = 0; k <= hgt; k++) {
    const [x1, y1] = p(0, 0, k);
    const [x2, y2] = p(cols, 0, k);
    rightLines.push(<line key={`rz${k}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gridStroke} strokeWidth="0.8" />);
  }

  const leftLines: React.ReactNode[] = [];
  for (let j = 0; j <= rows; j++) {
    const [x1, y1] = p(0, j, 0);
    const [x2, y2] = p(0, j, hgt);
    leftLines.push(<line key={`ly${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gridStroke} strokeWidth="0.8" />);
  }
  for (let k = 0; k <= hgt; k++) {
    const [x1, y1] = p(0, 0, k);
    const [x2, y2] = p(0, rows, k);
    leftLines.push(<line key={`lz${k}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gridStroke} strokeWidth="0.8" />);
  }

  // Purple-filled cells: right face (y=0) and top face (z=hgt)
  const purpleCells: [number, number, number][][] = [
    // right face
    [p(1,0,1), p(2,0,1), p(2,0,2), p(1,0,2)].map(([x,y])=>[x,y,0]) as [number,number,number][],
    [p(2,0,1), p(3,0,1), p(3,0,2), p(2,0,2)].map(([x,y])=>[x,y,0]) as [number,number,number][],
    [p(2,0,2), p(3,0,2), p(3,0,3), p(2,0,3)].map(([x,y])=>[x,y,0]) as [number,number,number][],
    // top face
    [p(2,1,3), p(3,1,3), p(3,2,3), p(2,2,3)].map(([x,y])=>[x,y,0]) as [number,number,number][],
    [p(1,2,3), p(2,2,3), p(2,3,3), p(1,3,3)].map(([x,y])=>[x,y,0]) as [number,number,number][],
  ];

  // Convert already-projected cells to polygon points strings
  const purplePts: [number, number][][] = [
    [[...p(1,0,1)], [...p(2,0,1)], [...p(2,0,2)], [...p(1,0,2)]],
    [[...p(2,0,1)], [...p(3,0,1)], [...p(3,0,2)], [...p(2,0,2)]],
    [[...p(2,0,2)], [...p(3,0,2)], [...p(3,0,3)], [...p(2,0,3)]],
    [[...p(2,1,3)], [...p(3,1,3)], [...p(3,2,3)], [...p(2,2,3)]],
    [[...p(1,2,3)], [...p(2,2,3)], [...p(2,3,3)], [...p(1,3,3)]],
  ];

  // Glow dots
  const dots: [number, number][] = [p(0,0,hgt), p(cols/2, rows/2, hgt), p(cols,0,hgt)];

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
      {/* Purple glow behind cube */}
      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(128,0,255,0.28), transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="50 100 460 380"
        style={{ width: "100%", maxWidth: "480px", overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="purpleFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8000ff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#b56bff" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="pinkFill" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff40ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8000ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Face backgrounds */}
        <polygon points={pts([0,0,hgt],[cols,0,hgt],[cols,rows,hgt],[0,rows,hgt])}
          fill="rgba(8,11,15,0.3)" stroke={edgeStroke} strokeWidth="1.4" />
        <polygon points={pts([0,0,hgt],[cols,0,hgt],[cols,0,0],[0,0,0])}
          fill="rgba(8,11,15,0.45)" stroke={edgeStroke} strokeWidth="1.4" />
        <polygon points={pts([0,0,hgt],[0,rows,hgt],[0,rows,0],[0,0,0])}
          fill="rgba(8,11,15,0.5)" stroke={edgeStroke} strokeWidth="1.4" />

        {/* Purple cells */}
        {purplePts.map((cell, i) => (
          <polygon
            key={i}
            points={cell.map(([x, y]) => `${x},${y}`).join(" ")}
            fill={i < 3 ? "url(#purpleFill)" : "url(#pinkFill)"}
          />
        ))}

        {/* Grid lines */}
        {topLines}
        {rightLines}
        {leftLines}

        {/* Cyan accent lines extending right (scan lines) */}
        {[0, 1, 2].map((k) => {
          const [x1, y1] = p(cols, 0, k);
          return (
            <line
              key={`scan${k}`}
              x1={x1} y1={y1}
              x2={x1 + 60} y2={y1}
              stroke="rgba(0,212,255,0.3)"
              strokeWidth="0.8"
              strokeDasharray="4 3"
            />
          );
        })}

        {/* Glow dots */}
        {dots.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="rgba(0,212,255,0.25)" />
            <circle cx={x} cy={y} r="2.5" fill="#00d4ff" />
          </g>
        ))}

        {/* Floating dot above cube */}
        {(() => {
          const [topX, topY] = p(0, 0, hgt);
          return (
            <g>
              <circle cx={topX + 80} cy={topY - 30} r="4" fill="#00d4ff" opacity="0.8" />
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      className="section"
      style={{ paddingTop: "80px", paddingBottom: "120px", position: "relative" }}
    >
      {/* Subtle grid overlay */}
      <div className="grid-overlay" style={{ opacity: 0.6 }} />

      <div className="container">
        <div className="two-col" style={{ gap: "48px" }}>
          {/* Left — Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <h1
              className="display"
              style={{ fontSize: "clamp(54px, 9vw, 132px)", lineHeight: 0.88, letterSpacing: "1px" }}
            >
              We don&apos;t do<br />
              &ldquo;Marketing.&rdquo;<br />
              We do more<br />
              <RotatingWord />
            </h1>

            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--cds-heading)",
                fontFamily: "var(--font-inter)",
                lineHeight: 1.5,
              }}
            >
              That&apos;s what you hire Catalyst for: a fatter bottom line.
            </p>

            <p
              style={{
                fontSize: "15px",
                color: "var(--cds-body)",
                lineHeight: 1.8,
                maxWidth: "500px",
                fontFamily: "var(--font-inter)",
              }}
            >
              You didn&apos;t become a contractor to build websites and babysit algorithms. You got
              into it to build things and make a great living. You don&apos;t care about SEO
              keywords. You want a business that puts money in the bank and lets you step away
              whenever you want. That&apos;s what we build.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: "15px" }}>
                Get a Free Audit →
              </Link>
              <Link href="#how-it-works" className="btn-secondary" style={{ fontSize: "15px" }}>
                ▶ See How It Works
              </Link>
            </div>
          </div>

          {/* Right — Isometric cube */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IsometricCube />
          </div>
        </div>
      </div>
    </section>
  );
}
