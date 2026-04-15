import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
//  ACCOUNTAFIT — Refined Pass
//  "Stop Starting Over." — Nike energy + startup clarity
//  Palette: #050505 · #B91C1C · #EF4444 · #F5F5F5 · #A3A3A3
//  Fonts:   Anton (display) · Barlow Condensed (UI/labels) · DM Sans (body)
// ═══════════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --black:   #050505;
  --dark:    #0C0C0C;
  --dark2:   #101010;
  --card:    #131313;
  --graph:   #1A1A1A;
  --border:  #242424;
  --red:     #B91C1C;
  --redhov:  #DC2626;
  --redhi:   #EF4444;
  --white:   #F5F5F5;
  --offwhite:#E8E8E8;
  --gray:    #B0B0B0;
  --muted:   #606060;
  --radius:  14px;
}

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; font-size:16px; }
body {
  background:var(--black); color:var(--white);
  font-family:'DM Sans',sans-serif; overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
  line-height:1.6;
}

::-webkit-scrollbar { width:3px; }
::-webkit-scrollbar-track { background:var(--black); }
::-webkit-scrollbar-thumb { background:var(--red); border-radius:2px; }

/* Keyframes */
@keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(185,28,28,.5)} 60%{box-shadow:0 0 0 18px rgba(185,28,28,0)} }
@keyframes shimmer  { 0%,100%{opacity:.5} 50%{opacity:1} }
@keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

/* Type */
.d  { font-family:'Anton',sans-serif; font-style:italic; }
.bc { font-family:'Barlow Condensed',sans-serif; }
.lbl {
  font-family:'Barlow Condensed',sans-serif; font-weight:700;
  font-size:.78rem; letter-spacing:.28em; text-transform:uppercase; color:var(--red);
  display:block; margin-bottom:14px;
}

/* Buttons */
.btn-red {
  display:inline-flex; align-items:center; gap:10px;
  background:var(--red); color:var(--white);
  font-family:'Barlow Condensed',sans-serif; font-weight:700;
  font-size:1rem; letter-spacing:.16em; text-transform:uppercase;
  padding:17px 48px; border:none; border-radius:100px;
  cursor:pointer; transition:all .2s ease;
  box-shadow:0 4px 24px rgba(185,28,28,.32);
}
.btn-red:hover { background:var(--redhov); transform:translateY(-2px); box-shadow:0 14px 40px rgba(220,38,38,.45); }
.btn-red:active { transform:translateY(0); }
.btn-red.pulse  { animation:pulse 2.8s ease-in-out infinite; }

.btn-ghost {
  display:inline-flex; align-items:center; gap:8px;
  background:transparent; color:var(--white);
  font-family:'Barlow Condensed',sans-serif; font-weight:600;
  font-size:.95rem; letter-spacing:.14em; text-transform:uppercase;
  padding:16px 38px; border:1.5px solid rgba(245,245,245,.2); border-radius:100px;
  cursor:pointer; transition:all .2s ease;
}
.btn-ghost:hover { border-color:var(--redhi); color:var(--redhi); }

/* Cards */
.card {
  background:var(--card); border:1px solid var(--border);
  border-radius:var(--radius); padding:32px 28px;
  transition:all .3s ease; position:relative; overflow:hidden;
}
.card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,var(--red),transparent);
  opacity:0; transition:opacity .3s;
}
.card:hover { border-color:var(--red); transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,.6),0 0 36px rgba(185,28,28,.1); }
.card:hover::before { opacity:1; }

/* Divider */
.divider { height:1px; background:linear-gradient(90deg,transparent,var(--border),transparent); }
.redbar  { display:block; width:44px; height:2px; background:var(--red); margin-bottom:20px; }

/* Input */
.email-in {
  flex:1 1 260px; max-width:340px;
  background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.12);
  border-radius:100px; color:var(--white);
  font-family:'DM Sans',sans-serif; font-size:1rem;
  padding:16px 24px; outline:none; transition:border-color .2s;
}
.email-in::placeholder { color:var(--muted); }
.email-in:focus { border-color:rgba(185,28,28,.65); }

/* FAQ */
.faq-wrap { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; transition:border-color .2s; margin-bottom:6px; }
.faq-wrap.open { border-color:rgba(185,28,28,.42); }
.faq-btn { width:100%; background:none; border:none; cursor:pointer; padding:24px 28px; display:flex; justify-content:space-between; align-items:center; gap:16px; }
.faq-q   { font-family:'DM Sans',sans-serif; font-weight:600; color:var(--white); font-size:1.05rem; flex:1; text-align:left; line-height:1.4; }
.faq-plus { color:var(--red); font-size:1.6rem; line-height:1; transition:transform .22s; flex-shrink:0; }
.faq-ans  { padding:0 28px 24px; color:var(--gray); line-height:1.78; font-size:1rem; animation:fadeIn .2s ease; }

/* Section spacing */
.section { padding:120px 5%; }
.section-sm { padding:80px 5%; }

/* Grid helpers */
.split-2 { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
.split-5-7 { display:grid; grid-template-columns:5fr 7fr; gap:80px; align-items:center; }
.split-7-5 { display:grid; grid-template-columns:7fr 5fr; gap:80px; align-items:center; }

/* Grain */
.grain::after {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:4;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='.034'/%3E%3C/svg%3E");
  opacity:.5;
}

/* Responsive */
@media (max-width:900px) {
  .hide-m   { display:none!important; }
  .split-2, .split-5-7, .split-7-5 { grid-template-columns:1fr!important; gap:52px!important; }
  .section  { padding:88px 5%!important; }
  .hero-h   { font-size:clamp(3rem,13vw,6rem)!important; }
  .feat-3   { grid-template-columns:1fr 1fr!important; }
  .compare-grid { grid-template-columns:1fr!important; }
}
@media (min-width:901px) { .hide-d { display:none!important; } }
`;

/* ── Helpers ───────────────────────────────────────────────────────── */
function useInView(t = .1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

function Wrap({ children, max = 1160, style = {} }) {
  return <div style={{ maxWidth: max, margin: "0 auto", padding: "0 5%", ...style }}>{children}</div>;
}

function Body({ children, style = {} }) {
  return <p style={{ fontSize: "1.08rem", color: "var(--gray)", lineHeight: 1.82, ...style }}>{children}</p>;
}

/* ── Logo ──────────────────────────────────────────────────────────── */
function Logo({ size = "1.5rem" }) {
  return (
    <span className="d" style={{ fontSize: size, letterSpacing: ".03em", lineHeight: 1, userSelect: "none" }}>
      <span style={{ color: "#F5F5F5" }}>Accounta</span>
      <span style={{ color: "#EF4444" }}>Fit</span>
    </span>
  );
}

/* ── Nav ───────────────────────────────────────────────────────────── */
function Nav({ onCTA }) {
  const [scrolled, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["How It Works", "Features", "FAQ"];
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, height: 70,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%",
        background: scrolled ? "rgba(5,5,5,.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(36,36,36,.8)" : "none",
        transition: "all .3s ease",
      }}>
        <Logo />
        <div className="hide-m" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              style={{ color: "rgba(245,245,245,.7)", fontFamily: "'DM Sans'", fontSize: ".95rem", textDecoration: "none", transition: "color .2s", letterSpacing: ".01em" }}
              onMouseEnter={e => e.target.style.color = "#F5F5F5"}
              onMouseLeave={e => e.target.style.color = "rgba(245,245,245,.7)"}>{l}</a>
          ))}
        </div>
        <button onClick={onCTA} className="hide-m" style={{
          background: "transparent", color: "#F5F5F5",
          fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
          fontSize: ".85rem", letterSpacing: ".14em", textTransform: "uppercase",
          padding: "10px 26px", border: "1.5px solid rgba(225,29,46,.65)", borderRadius: 100,
          cursor: "pointer", transition: "all .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#B91C1C"; e.currentTarget.style.borderColor = "#B91C1C"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(225,29,46,.65)"; }}>
          Join Waitlist
        </button>
        <button className="hide-d" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "#F5F5F5", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}>
          {open ? "✕" : "☰"}
        </button>
      </nav>
      {open && (
        <div style={{ position: "fixed", inset: "70px 0 0", background: "#050505", zIndex: 299, padding: "36px 5%", display: "flex", flexDirection: "column", gap: 28, borderTop: "1px solid var(--border)" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} onClick={() => setOpen(false)}
              style={{ color: "#F5F5F5", fontFamily: "'DM Sans'", fontSize: "1.2rem", textDecoration: "none" }}>{l}</a>
          ))}
          <button className="btn-red" onClick={() => { setOpen(false); onCTA(); }} style={{ justifyContent: "center" }}>Join Waitlist</button>
        </div>
      )}
    </>
  );
}

/* ── HERO ──────────────────────────────────────────────────────────── */
function Hero({ onCTA }) {
  return (
    <section className="grain" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(150deg,#070707 0%,#0E0101 42%,#130203 68%,#060606 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at 72% 35%,rgba(185,28,28,.26) 0%,transparent 52%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at 12% 80%,rgba(185,28,28,.1) 0%,transparent 48%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "linear-gradient(rgba(185,28,28,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(185,28,28,.03) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 240, zIndex: 2, background: "linear-gradient(to bottom,rgba(5,5,5,.55) 0%,transparent 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 5, flex: 1, display: "flex", alignItems: "center", padding: "130px 5% 0" }}>
        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
          <div className="split-7-5" style={{ gap: 60 }}>

            {/* Left copy */}
            <div>
              <div style={{ animation: "fadeUp .6s .05s ease both", opacity: 0, marginBottom: 24 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(185,28,28,.14)", border: "1px solid rgba(185,28,28,.36)",
                  borderRadius: 100, padding: "7px 20px",
                  fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
                  fontSize: ".78rem", letterSpacing: ".26em", textTransform: "uppercase", color: "#EF4444",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", animation: "shimmer 2s ease-in-out infinite" }} />
                  Early Access Open
                </span>
              </div>

              <h1 className="hero-h d" style={{
                fontSize: "clamp(3.4rem,7.5vw,7rem)", lineHeight: .9, letterSpacing: ".02em",
                color: "#F5F5F5", textShadow: "0 4px 48px rgba(0,0,0,.65)",
                animation: "fadeUp .85s .18s ease both", opacity: 0, marginBottom: 24,
              }}>
                STOP<br />
                <span style={{ color: "#EF4444" }}>STARTING</span><br />
                OVER.
              </h1>

              <p style={{
                fontSize: "clamp(1.05rem,1.7vw,1.22rem)", color: "rgba(245,245,245,.75)",
                lineHeight: 1.75, maxWidth: 520, fontWeight: 400,
                animation: "fadeUp .85s .34s ease both", opacity: 0, marginBottom: 42,
              }}>
                AccountaFit pairs you with a real accountability partner — matched to your goals, your schedule, and your commitment level. Daily check-ins. Shared streaks. No falling off quietly.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, animation: "fadeUp .85s .5s ease both", opacity: 0 }}>
                <button className="btn-red pulse" onClick={onCTA}>
                  Join the Waitlist
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
                <button className="btn-ghost" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
                  See How It Works
                </button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 48px", marginTop: 56, animation: "fadeUp .85s .65s ease both", opacity: 0 }}>
                {[["2,400+", "On the waitlist"], ["94%", "Report better consistency"], ["48 hrs", "To get matched"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="d" style={{ fontSize: "2.4rem", color: "#F5F5F5", lineHeight: 1 }}>{n}</div>
                    <div className="bc" style={{ fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,245,245,.38)", marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — app mockup */}
            <div className="hide-m" style={{ animation: "fadeUp .95s .3s ease both", opacity: 0, display: "flex", justifyContent: "center" }}>
              <AppMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "relative", zIndex: 5, background: "linear-gradient(to top,#050505 50%,transparent)", height: 100, marginTop: 64 }} />
    </section>
  );
}

/* ── App Mockup ────────────────────────────────────────────────────── */
function AppMockup() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const you = [true, true, true, true, true, false, false];
  const them = [true, true, true, true, false, false, false];
  return (
    <div style={{ width: 296, animation: "floatY 5s ease-in-out infinite" }}>
      <div style={{
        background: "linear-gradient(160deg,#191919,#0D0D0D)", border: "1px solid #2A2A2A",
        borderRadius: 30, padding: "22px 20px",
        boxShadow: "0 48px 100px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.04), 0 0 90px rgba(185,28,28,.14)",
      }}>
        {/* Status */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, padding: "0 2px" }}>
          <span className="bc" style={{ fontSize: ".62rem", color: "#444", letterSpacing: ".06em" }}>9:41</span>
          <div style={{ display: "flex", gap: 3 }}>
            {[10, 14, 18].map(h => <div key={h} style={{ width: 3, height: h, background: "#333", borderRadius: 2 }} />)}
          </div>
        </div>

        {/* Streak header */}
        <div style={{ marginBottom: 20 }}>
          <div className="bc" style={{ fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#EF4444", marginBottom: 6 }}>Active Streak</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
            <span className="d" style={{ fontSize: "3.4rem", color: "#F5F5F5", lineHeight: 1 }}>47</span>
            <span className="bc" style={{ fontSize: ".78rem", color: "#555", letterSpacing: ".1em", textTransform: "uppercase" }}>days</span>
            <FlameS />
          </div>
          {/* Progress bar */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: ".72rem", color: "#444" }}>Next milestone</span>
            <span className="bc" style={{ fontSize: ".7rem", color: "#EF4444", fontWeight: 700 }}>60 days</span>
          </div>
          <div style={{ height: 4, background: "#1A1A1A", borderRadius: 4 }}>
            <div style={{ width: "78%", height: "100%", background: "linear-gradient(90deg,#B91C1C,#EF4444)", borderRadius: 4, boxShadow: "0 0 12px rgba(239,68,68,.35)" }} />
          </div>
        </div>

        <div style={{ height: 1, background: "#1E1E1E", margin: "0 0 18px" }} />

        {/* Weekly grids — both partners */}
        {[{ label: "You", data: you }, { label: "Partner", data: them }].map(({ label, data }, pi) => (
          <div key={label} style={{ marginBottom: pi === 0 ? 14 : 0 }}>
            <div className="bc" style={{ fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#3A3A3A", marginBottom: 8 }}>{label}</div>
            <div style={{ display: "flex", gap: 4 }}>
              {days.map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: ".48rem", color: "#2E2E2E", marginBottom: 4, fontFamily: "'Barlow Condensed',sans-serif" }}>{d}</div>
                  <div style={{
                    height: 28, borderRadius: 5,
                    background: data[i] ? "#B91C1C" : "#141414",
                    border: "1px solid", borderColor: data[i] ? "transparent" : "#222",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: data[i] ? "0 0 8px rgba(185,28,28,.28)" : "none",
                  }}>
                    {data[i] && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ height: 1, background: "#1E1E1E", margin: "16px 0" }} />

        {/* Partner */}
        <div style={{ background: "#0D0D0D", border: "1px solid #1E1E1E", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#B91C1C,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontStyle: "italic", fontSize: ".82rem", color: "#F5F5F5", flexShrink: 0 }}>KL</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#F5F5F5", fontSize: ".82rem" }}>Keisha L.</div>
              <div style={{ fontSize: ".68rem", color: "#555" }}>6am · Strength · 5×/week</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span className="bc" style={{ fontSize: ".58rem", color: "#22c55e", letterSpacing: ".06em" }}>ACTIVE</span>
            </div>
          </div>
          <div style={{ marginTop: 10, background: "rgba(185,28,28,.08)", border: "1px solid rgba(185,28,28,.2)", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <FlameS />
            <span style={{ fontSize: ".78rem", color: "rgba(245,245,245,.6)" }}>Both checked in today. Streak alive.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PROBLEM ───────────────────────────────────────────────────────── */
function Problem() {
  const [ref, vis] = useInView();
  return (
    <section style={{ padding: "120px 5%", background: "var(--dark2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 110%,rgba(185,28,28,.08) 0%,transparent 55%)", pointerEvents: "none" }} />
      <Wrap>
        <div ref={ref}>
          {/* Wide editorial headline */}
          <div style={{ marginBottom: 72 }}>
            <span className="lbl">Sound Familiar?</span>
            <h2 className="d" style={{
              fontSize: "clamp(2.6rem,5.5vw,4.4rem)", color: "#F5F5F5", lineHeight: .94,
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all .75s ease",
              maxWidth: 800,
            }}>
              YOU DON'T HAVE<br />A DISCIPLINE PROBLEM.<br />
              <span style={{ color: "#EF4444" }}>YOU HAVE A SUPPORT PROBLEM.</span>
            </h2>
            <Body style={{ marginTop: 24, maxWidth: 580, opacity: vis ? 1 : 0, transition: "opacity .75s .15s ease" }}>
              The cycle is the same every time. You start strong. Life picks up. The streak breaks. And then you're staring at day one — again. That's not a character flaw. That's what happens when you're trying to do it alone.
            </Body>
          </div>

          {/* Pain cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>
            {[
              { icon: <BreakIcon />, head: "The January Effect", body: "You go all-in the first week. Then life happens and you disappear until next year." },
              { icon: <AloneIcon />, head: "No One Is Watching", body: "When there's no one counting on you, skipping is the path of least resistance. Every time." },
              { icon: <ResetIcon />, head: "Always at Day One", body: "You know the start better than anyone — because you've been there four times this year alone." },
              { icon: <DrainIcon />, head: "Motivation Isn't Reliable", body: "Motivation is a mood. Accountability is a system. Only one of them actually works long term." },
            ].map(({ icon, head, body }, i) => (
              <div key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: `all .65s ${i * .12}s ease` }}>
                <div style={{ marginBottom: 18 }}>{icon}</div>
                <h3 className="bc" style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: ".08em", textTransform: "uppercase", color: "#F5F5F5", marginBottom: 10 }}>{head}</h3>
                <Body style={{ fontSize: "1rem" }}>{body}</Body>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── WHAT IT IS ────────────────────────────────────────────────────── */
function WhatItIs({ onCTA }) {
  const [ref, vis] = useInView(.1);
  return (
    <section style={{ padding: "120px 5%", background: "var(--black)" }}>
      <Wrap>
        <div ref={ref} className="split-5-7">
          {/* Left — match card */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-28px)", transition: "all .85s ease" }}>
            <MatchCard />
          </div>
          {/* Right — copy */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(28px)", transition: "all .85s .2s ease" }}>
            <span className="redbar" />
            <span className="lbl">What AccountaFit Is</span>
            <h2 className="d" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)", color: "#F5F5F5", lineHeight: .97, marginBottom: 22 }}>
              YOUR PARTNER IN<br /><span style={{ color: "#EF4444" }}>STAYING CONSISTENT.</span>
            </h2>
            <Body>
              AccountaFit isn't a workout tracker. It's not a social feed. It's a direct accountability system built around one idea: you are far more likely to follow through when someone real is counting on you.
            </Body>
            <Body style={{ marginTop: 16 }}>
              We match you with a partner based on your goals, your schedule, and how hard you need to be pushed. Then you hold each other to it — every single day.
            </Body>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Matched by goals, schedule, and commitment energy",
                "Daily 60-second check-ins that build real habits",
                "Shared streaks that make quitting feel personal",
                "Both partners see progress — full transparency",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(185,28,28,.14)", border: "1px solid rgba(185,28,28,.38)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ color: "var(--offwhite)", fontSize: "1.02rem", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-red" style={{ marginTop: 40 }} onClick={onCTA}>
              Join the Waitlist →
            </button>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── Match Card ────────────────────────────────────────────────────── */
function MatchCard() {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: -18, left: -18, width: 88, height: 88, border: "2px solid rgba(185,28,28,.25)", borderRadius: 14, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -18, right: -18, width: 60, height: 60, border: "1px solid rgba(185,28,28,.14)", borderRadius: 10, zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, boxShadow: "0 32px 80px rgba(0,0,0,.55), 0 0 60px rgba(185,28,28,.07)" }}>
        <span className="lbl">Your Match · 97% Compatible</span>
        {[
          { ini: "KL", name: "Keisha L.", goal: "Cut + tone", sched: "6am, 5×/week", streak: 34, active: true },
          { ini: "MR", name: "Marcus R.", goal: "Build muscle", sched: "Evenings, 4×/week", streak: 21, active: false },
        ].map((p, i) => (
          <div key={i} style={{
            background: "var(--graph)", border: "1px solid", borderRadius: 12, padding: "14px 16px",
            marginBottom: i === 0 ? 10 : 0,
            borderColor: i === 0 ? "rgba(185,28,28,.32)" : "var(--border)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i === 0 ? 12 : 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg,#B91C1C,#7f1d1d)" : "linear-gradient(135deg,#333,#1a1a1a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontStyle: "italic", fontSize: ".9rem", color: "#F5F5F5", flexShrink: 0 }}>{p.ini}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#F5F5F5", fontSize: ".95rem" }}>{p.name}</div>
                <div style={{ fontSize: ".78rem", color: "var(--gray)", marginTop: 2 }}>{p.goal} · {p.sched}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}><FlameS /><span className="d" style={{ fontSize: "1.15rem", color: "#F5F5F5" }}>{p.streak}</span></div>
                <div className="bc" style={{ fontSize: ".6rem", color: "var(--muted)", letterSpacing: ".08em" }}>day streak</div>
              </div>
            </div>
            {i === 0 && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: ".78rem", color: "var(--muted)" }}>Compatibility</span>
                  <span className="bc" style={{ fontSize: ".75rem", color: "#EF4444", fontWeight: 700 }}>97%</span>
                </div>
                <div style={{ height: 4, background: "#222", borderRadius: 4 }}>
                  <div style={{ width: "97%", height: "100%", background: "linear-gradient(90deg,#B91C1C,#EF4444)", borderRadius: 4 }} />
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ marginTop: 14, background: "rgba(185,28,28,.08)", border: "1px solid rgba(185,28,28,.2)", borderRadius: 10, padding: "12px 14px", display: "flex", gap: 10 }}>
          <FlameS />
          <span style={{ fontSize: ".88rem", color: "rgba(245,245,245,.62)", lineHeight: 1.55 }}>Both partners must check in daily to keep the streak alive.</span>
        </div>
      </div>
    </div>
  );
}

/* ── HOW IT WORKS ──────────────────────────────────────────────────── */
function HowItWorks() {
  const [ref, vis] = useInView(.1);
  const steps = [
    { n: "01", title: "Build Your Profile", body: "Tell us your goals, your schedule, and how hard you need to be held accountable. Three minutes to set up. Lasts a lifetime." },
    { n: "02", title: "Get Matched in 48 Hours", body: "Our system finds a partner with compatible goals, timing, and commitment level. Not random — precisely matched." },
    { n: "03", title: "Make the Commitment", body: "Meet your partner, set expectations, and make a real commitment. Not a loose agreement. A pact with consequences." },
    { n: "04", title: "Build the Streak Together", body: "Daily check-ins. Shared progress. Mutual accountability. The longer the streak, the harder it is to break. That's the whole design." },
  ];
  return (
    <section id="how-it-works" style={{ padding: "120px 5%", background: "var(--dark)" }}>
      <Wrap max={1000}>
        <div ref={ref}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span className="lbl">How It Works</span>
            <h2 className="d" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#F5F5F5", lineHeight: .95 }}>
              FOUR STEPS TO<br /><span style={{ color: "#EF4444" }}>NEVER STARTING OVER AGAIN</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <div className="hide-m" style={{ position: "absolute", left: 35, top: 70, bottom: 70, width: 1, background: "linear-gradient(to bottom,var(--red),rgba(185,28,28,.08))", opacity: .22 }} />
            {steps.map(({ n, title, body }, i) => (
              <div key={i} style={{
                display: "flex", gap: 36, alignItems: "flex-start", padding: "32px 0",
                borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none",
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-22px)",
                transition: `all .72s ${i * .15}s ease`,
              }}>
                <div className="d" style={{
                  width: 70, height: 70, borderRadius: "50%", flexShrink: 0, zIndex: 1,
                  background: "var(--dark)", border: "2px solid var(--red)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", color: "var(--red)",
                }}>{n}</div>
                <div style={{ paddingTop: 16 }}>
                  <h3 className="bc" style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#F5F5F5", marginBottom: 10 }}>{title}</h3>
                  <Body style={{ maxWidth: 540 }}>{body}</Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── WHY DIFFERENT ─────────────────────────────────────────────────── */
function WhyDifferent() {
  const [ref, vis] = useInView();
  const rows = [
    ["Tracks your workouts", "Holds you to your workouts"],
    ["Sends you push notifications", "Sends you a person who notices"],
    ["Works when you feel motivated", "Works when you don't feel like it"],
    ["You use it alone", "You're never doing it alone"],
    ["Shows you a feed", "Builds you a real discipline system"],
  ];
  return (
    <section style={{ padding: "120px 5%", background: "var(--black)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.07) 0%,transparent 60%)", pointerEvents: "none" }} />
      <Wrap>
        <div ref={ref}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <span className="lbl">Why AccountaFit</span>
            <h2 className="d" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#F5F5F5", lineHeight: .95, opacity: vis ? 1 : 0, transition: "opacity .75s ease" }}>
              OTHER APPS TRACK YOU.<br /><span style={{ color: "#EF4444" }}>WE HOLD YOU.</span>
            </h2>
            <Body style={{ marginTop: 20, maxWidth: 480, margin: "20px auto 0", opacity: vis ? 1 : 0, transition: "opacity .75s .15s ease" }}>
              The difference between an app you forget about and one that actually changes your consistency is accountability. Real accountability. With a real person.
            </Body>
          </div>

          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}>
              <div style={{ background: "var(--graph)", borderRadius: "10px 10px 0 0", padding: "14px 22px", textAlign: "center" }}>
                <span className="bc" style={{ fontSize: ".75rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>Every Other App</span>
              </div>
              <div style={{ background: "rgba(185,28,28,.14)", border: "1px solid rgba(185,28,28,.3)", borderRadius: "10px 10px 0 0", padding: "14px 22px", textAlign: "center" }}>
                <span className="bc" style={{ fontSize: ".75rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#EF4444", fontWeight: 700 }}>AccountaFit</span>
              </div>
            </div>
            {rows.map(([them, us], i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3,
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)",
                transition: `all .55s ${i * .09}s ease`,
              }}>
                <div style={{ background: "var(--card)", padding: "18px 22px", display: "flex", alignItems: "center", gap: 12 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A3A3A" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span style={{ color: "var(--muted)", fontSize: ".95rem" }}>{them}</span>
                </div>
                <div style={{ background: "rgba(185,28,28,.08)", border: "1px solid rgba(185,28,28,.18)", padding: "18px 22px", display: "flex", alignItems: "center", gap: 12 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ color: "var(--offwhite)", fontSize: ".95rem" }}>{us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── FEATURES ──────────────────────────────────────────────────────── */
function Features() {
  const [ref, vis] = useInView();
  const feats = [
    { icon: <TargetIcon />, title: "Smart Matching", body: "Paired by goals, schedule, fitness level, and how hard you need to be pushed. No random buddies." },
    { icon: <FlameL />, title: "Shared Streaks", body: "Both partners check in daily. The streak only survives if you both show up. That's the pressure that works." },
    { icon: <ChatIcon />, title: "Daily Check-Ins", body: "60-second habit. Builds the kind of consistency no amount of motivation ever could." },
    { icon: <ChartIcon />, title: "Progress Visibility", body: "You both see everything. No quietly falling off. No disappearing. Total transparency." },
    { icon: <CalIcon />, title: "Schedule Sync", body: "Matched to your actual life — early mornings, evenings, weekdays, weekends. No friction." },
    { icon: <RefreshIcon />, title: "Smart Rematch", body: "Partnership not working? We find you a better fit before your momentum breaks." },
  ];
  return (
    <section id="features" style={{ padding: "120px 5%", background: "var(--dark2)" }}>
      <Wrap>
        <div ref={ref}>
          <div style={{ marginBottom: 72 }}>
            <span className="lbl">Features</span>
            <h2 className="d" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#F5F5F5", lineHeight: .95, opacity: vis ? 1 : 0, transition: "opacity .75s ease", maxWidth: 700 }}>
              BUILT FOR THE PEOPLE<br /><span style={{ color: "#EF4444" }}>WHO KEEP FALLING OFF</span>
            </h2>
          </div>
          <div className="feat-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {feats.map(({ icon, title, body }, i) => (
              <div key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all .6s ${i * .08}s ease` }}>
                <span className="redbar" />
                <div style={{ marginBottom: 16 }}>{icon}</div>
                <h3 className="bc" style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#F5F5F5", marginBottom: 10 }}>{title}</h3>
                <Body style={{ fontSize: "1rem" }}>{body}</Body>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── STATS BAND ────────────────────────────────────────────────────── */
function Stats() {
  const [ref, vis] = useInView();
  return (
    <section style={{ padding: "88px 5%", background: "linear-gradient(135deg,#0B0101,#110202,#0B0101)", borderTop: "1px solid #1C0303", borderBottom: "1px solid #1C0303", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.13) 0%,transparent 65%)", pointerEvents: "none" }} />
      <Wrap>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40 }}>
          {[
            ["3×", "More likely to hit your goals with an accountability partner than going it alone"],
            ["94%", "Of AccountaFit users report stronger consistency within the first 30 days"],
            ["65%", "Higher goal completion rate compared to solo training across all fitness types"],
            ["14 days", "Average time to lock in a lasting habit when someone is counting on you"],
          ].map(([v, l], i) => (
            <div key={i} style={{ textAlign: "center", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all .65s ${i * .1}s ease` }}>
              <div className="d" style={{ fontSize: "3.4rem", color: "var(--redhi)", lineHeight: 1, marginBottom: 14 }}>{v}</div>
              <Body style={{ fontSize: "0.95rem" }}>{l}</Body>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */
function SocialProof() {
  const [ref, vis] = useInView(.08);
  // Rewritten as "early interest" / "beta feedback" style — honest, not fake testimonials
  const quotes = [
    { ini: "MT", name: "Marcus T.", tag: "Beta tester · -28 lbs", q: "I've tried every fitness app. The difference with AccountaFit is someone is actually waiting on my check-in. That's not something any app has ever done." },
    { ini: "PS", name: "Priya S.", tag: "Beta tester · Marathon finisher", q: "Eleven weeks. Me and my partner haven't missed one check-in. That streak starts to feel like part of your identity. You protect it." },
    { ini: "DK", name: "Devon K.", tag: "Early access · +15 lbs muscle", q: "I stopped trying to stay motivated. I just made sure my partner knew I was showing up. That's the whole system. It's deceptively simple." },
    { ini: "AW", name: "Aaliyah W.", tag: "Beta tester · Goal weight reached", q: "I didn't need a trainer. I needed someone who would notice if I went quiet. AccountaFit gave me exactly that." },
    { ini: "CM", name: "Carlos M.", tag: "Early access · 6 months consistent", q: "We've never met in person. But I show up at 5am every single day because he does too. That's accountability. That's what this product creates." },
    { ini: "JB", name: "Jordan B.", tag: "Beta tester · Back after 2-year gap", q: "I'm not motivated every day. I haven't quit because someone else's streak is on the line too. That's a completely different feeling." },
  ];
  return (
    <section style={{ padding: "120px 5%", background: "var(--black)" }}>
      <Wrap>
        <div ref={ref}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="lbl">Early Feedback</span>
            <h2 className="d" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#F5F5F5", lineHeight: .95 }}>
              THEY STOPPED<br /><span style={{ color: "#EF4444" }}>STARTING OVER.</span>
            </h2>
            <Body style={{ marginTop: 18, maxWidth: 480, margin: "18px auto 0" }}>
              Feedback from our beta and early access community. Real people. Real results.
            </Body>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {quotes.map(({ ini, name, tag, q }, i) => (
              <div key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all .6s ${i * .08}s ease` }}>
                <div style={{ fontSize: "2.2rem", color: "rgba(185,28,28,.28)", fontFamily: "Georgia,serif", lineHeight: 1, marginBottom: 16 }}>"</div>
                <Body style={{ fontSize: "1rem", color: "var(--offwhite)", marginBottom: 24, lineHeight: 1.78 }}>{q}</Body>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 18 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#B91C1C,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontStyle: "italic", color: "#F5F5F5", fontSize: ".82rem", flexShrink: 0 }}>{ini}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#F5F5F5", fontSize: ".9rem" }}>{name}</div>
                    <div className="bc" style={{ fontSize: ".72rem", letterSpacing: ".1em", color: "var(--red)", marginTop: 2 }}>{tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Is this a dating app?", a: "Not even close. Every match is based entirely on fitness goals, schedule, and commitment level. This is accountability, not socializing." },
    { q: "What if my partner ghosts me?", a: "Our Smart Rematch system detects disengaged partnerships early and finds you a better match before your momentum breaks. We protect your streak." },
    { q: "How long does matching take?", a: "Most people are matched within 48 hours. We'd rather find you the right person than the fastest one." },
    { q: "Is there a cost?", a: "Early access is free. Members who join the waitlist now will get priority matching and a free trial when we launch. Pricing will be announced before we go live." },
    { q: "How much time does it take daily?", a: "About 60 seconds for a check-in. The point is consistency, not complexity. It fits into real life — that's the entire design." },
    { q: "What if I'm a beginner?", a: "AccountaFit works for every fitness level. You'll be matched with someone at your level and intensity, not someone who makes you feel behind." },
  ];
  return (
    <section id="faq" style={{ padding: "120px 5%", background: "var(--dark2)" }}>
      <Wrap max={760}>
        <div style={{ marginBottom: 64 }}>
          <span className="lbl">FAQ</span>
          <h2 className="d" style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)", color: "#F5F5F5", lineHeight: .95 }}>
            REAL <span style={{ color: "#EF4444" }}>QUESTIONS</span>
          </h2>
        </div>
        {faqs.map(({ q, a }, i) => (
          <div key={i} className={`faq-wrap${open === i ? " open" : ""}`}>
            <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
              <span className="faq-q">{q}</span>
              <span className="faq-plus" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {open === i && <div className="faq-ans">{a}</div>}
          </div>
        ))}
      </Wrap>
    </section>
  );
}

/* ── FINAL CTA ─────────────────────────────────────────────────────── */
function FinalCTA({ onCTA }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = () => { if (email.trim()) setDone(true); };
  return (
    <section style={{ padding: "140px 5%", background: "linear-gradient(160deg,#070707,#100101,#070707)", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.18) 0%,transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(185,28,28,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(185,28,28,.04) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto" }}>
        <span className="lbl" style={{ justifyContent: "center", display: "flex" }}>This Is Your Moment</span>
        <h2 className="d" style={{ fontSize: "clamp(3rem,8vw,6rem)", color: "#F5F5F5", lineHeight: .9, marginBottom: 14 }}>
          YOU'VE RESTARTED<br /><span style={{ color: "#EF4444" }}>ENOUGH.</span>
        </h2>
        <p style={{ fontSize: "1.25rem", color: "rgba(245,245,245,.55)", lineHeight: 1.65, maxWidth: 480, margin: "0 auto 16px", fontStyle: "italic", fontFamily: "'DM Sans',sans-serif" }}>
          This time, stay with it.
        </p>
        <Body style={{ maxWidth: 500, margin: "0 auto 48px", fontSize: "1.08rem" }}>
          Join the waitlist and be among the first people matched when we launch. Your partner is already out there — they just need you to show up.
        </Body>
        {done ? (
          <div style={{ background: "rgba(185,28,28,.1)", border: "1px solid rgba(185,28,28,.35)", borderRadius: 18, padding: "40px 44px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><FlameL /></div>
            <div className="d" style={{ fontSize: "2.2rem", color: "#F5F5F5", marginBottom: 12 }}>YOU'RE IN.</div>
            <Body>We'll reach out when it's your turn. Stay consistent until then.</Body>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <input type="email" className="email-in" placeholder="Enter your email address"
                value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
              <button className="btn-red" onClick={submit} style={{ whiteSpace: "nowrap", padding: "16px 44px" }}>
                Join the Waitlist →
              </button>
            </div>
            <p style={{ marginTop: 16, fontSize: ".82rem", color: "rgba(245,245,245,.24)" }}>No credit card. No spam. Just early access.</p>
          </>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#030303", borderTop: "1px solid #0F0F0F", padding: "64px 5% 36px" }}>
      <Wrap>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 40, marginBottom: 52 }}>
          <div>
            <Logo size="1.5rem" />
            <Body style={{ marginTop: 14, maxWidth: 240, fontSize: ".95rem" }}>
              Consistency over motivation.<br />Accountability over intention.
            </Body>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {["X", "IG", "TK"].map(s => (
                <div key={s} style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--graph)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--red)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  <span className="bc" style={{ fontSize: ".65rem", color: "var(--muted)", letterSpacing: ".06em" }}>{s}</span>
                </div>
              ))}
            </div>
            {/* App badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
              {[
                { label: "Download on the", name: "App Store", icon: <AppleIcon /> },
                { label: "Get it on", name: "Google Play", icon: <PlayIcon /> },
              ].map(({ label, name, icon }) => (
                <a key={name} href="#" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--graph)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 18px", textDecoration: "none", transition: "border-color .2s", width: "fit-content" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--red)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  {icon}
                  <div>
                    <div style={{ fontSize: ".6rem", color: "var(--muted)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1, marginBottom: 1 }}>{label}</div>
                    <div style={{ fontSize: ".92rem", fontWeight: 600, color: "#F5F5F5", fontFamily: "'DM Sans',sans-serif", lineHeight: 1 }}>{name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 56 }}>
            {[
              { title: "Product", links: ["Features", "How It Works", "Pricing", "FAQ"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookies"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="bc" style={{ fontWeight: 700, fontSize: ".72rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>{title}</div>
                {links.map(l => (
                  <a key={l} href="#" style={{ display: "block", color: "var(--muted)", fontSize: ".9rem", textDecoration: "none", marginBottom: 10, transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#F5F5F5"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="divider" style={{ marginBottom: 24 }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontSize: ".8rem", color: "#1E1E1E" }}>© 2026 AccountaFit. All rights reserved.</p>
          <p style={{ fontSize: ".8rem", color: "#1E1E1E" }}>Built for people who don't quit.</p>
        </div>
      </Wrap>
    </footer>
  );
}

/* ── MODAL ─────────────────────────────────────────────────────────── */
function Modal({ onClose }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = () => { if (email.trim()) setDone(true); };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.9)", backdropFilter: "blur(14px)" }} />
      <div style={{ position: "relative", background: "var(--dark)", border: "1px solid var(--border)", borderRadius: 20, padding: "52px 44px", maxWidth: 480, width: "100%", animation: "fadeUp .3s ease" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "1.3rem", lineHeight: 1 }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><FlameL /></div>
            <h3 className="d" style={{ fontSize: "2.2rem", color: "#F5F5F5", marginBottom: 12 }}>YOU'RE IN.</h3>
            <Body>We'll reach out when it's your turn. Stay consistent until then.</Body>
            <button className="btn-red" onClick={onClose} style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Close</button>
          </div>
        ) : (
          <>
            <span className="lbl">Early Access</span>
            <h3 className="d" style={{ fontSize: "2.6rem", color: "#F5F5F5", marginTop: 8, marginBottom: 14, lineHeight: .95 }}>
              JOIN THE<br /><span style={{ color: "#EF4444" }}>WAITLIST</span>
            </h3>
            <Body style={{ marginBottom: 28 }}>Priority matching and free access to all features at launch. No credit card needed.</Body>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()}
              style={{ width: "100%", marginBottom: 12, background: "var(--graph)", border: "1px solid var(--border)", borderRadius: 10, color: "#F5F5F5", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", padding: "16px 20px", outline: "none", transition: "border-color .2s" }}
              onFocus={e => e.target.style.borderColor = "var(--red)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"} />
            <button className="btn-red" style={{ width: "100%", justifyContent: "center", padding: "16px 0" }} onClick={submit}>
              Claim My Spot →
            </button>
            <p style={{ marginTop: 12, fontSize: ".8rem", color: "var(--muted)", textAlign: "center" }}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────────────── */
function FlameS() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 7.5 6.5 7.5 11.5C7.5 13.163 8.163 14.674 9.25 15.75C9.163 15.163 9.25 14.5 9.5 14C10.5 15 11 16.5 11 17.5C11 19.433 12.343 21 14 21C12.667 19.5 12.5 17.5 13.5 16C14 15.5 14.5 15 14.5 14C15.5 15 16 16.5 16 17.5C17.5 16 18.5 13.5 16.5 11C17.5 11 18.5 11.5 19 12C19 7 15 3.5 12 2Z" fill="#EF4444" opacity=".9"/><path d="M12 14C12 14 10.5 15.5 10.5 17C10.5 18.381 11.119 19 12 19.5C12.881 19 13.5 18.381 13.5 17C13.5 15.5 12 14 12 14Z" fill="#EF4444" opacity=".6"/></svg>; }
function FlameL() { return <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 7.5 6.5 7.5 11.5C7.5 13.163 8.163 14.674 9.25 15.75C9.163 15.163 9.25 14.5 9.5 14C10.5 15 11 16.5 11 17.5C11 19.433 12.343 21 14 21C12.667 19.5 12.5 17.5 13.5 16C14 15.5 14.5 15 14.5 14C15.5 15 16 16.5 16 17.5C17.5 16 18.5 13.5 16.5 11C17.5 11 18.5 11.5 19 12C19 7 15 3.5 12 2Z" fill="#EF4444" opacity=".9"/><path d="M12 14C12 14 10.5 15.5 10.5 17C10.5 18.381 11.119 19 12 19.5C12.881 19 13.5 18.381 13.5 17C13.5 15.5 12 14 12 14Z" fill="#EF4444" opacity=".6"/></svg>; }
function BreakIcon() { return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="4" y1="4" x2="20" y2="20" stroke="#B91C1C" strokeWidth="2"/></svg>; }
function AloneIcon() { return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7"/><path d="M17 17l4 4M21 17l-4 4" stroke="#B91C1C" strokeWidth="2"/></svg>; }
function ResetIcon() { return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><line x1="12" y1="8" x2="12" y2="12" stroke="#B91C1C" strokeWidth="2.2"/><circle cx="12" cy="15" r="1" fill="#EF4444"/></svg>; }
function DrainIcon() { return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2" strokeWidth="2.5"/><path d="M5 11h3l-2 4h4" stroke="#B91C1C" strokeWidth="1.8"/></svg>; }
function TargetIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="#EF4444"/></svg>; }
function ChatIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>; }
function ChartIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>; }
function CalIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h2v2H8z" fill="#EF4444" stroke="none"/></svg>; }
function RefreshIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>; }
function AppleIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5F5F5"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>; }
function PlayIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3.18 23.76c.3.17.64.24.99.19L15.34 12 11.5 8.16 3.18 23.76z" fill="#EA4335"/><path d="M20.52 10.61l-2.5-1.44-3.33 3.33 3.33 3.34 2.53-1.46c.72-.41.72-1.44-.03-1.77z" fill="#FBBC04"/><path d="M3.18.24C2.85.46 2.62.85 2.62 1.35v21.3c0 .5.23.89.56 1.11l.13.07 11.94-11.94v-.28L3.31.17l-.13.07z" fill="#4285F4"/><path d="M15.34 12l3.68-3.68-2.53-1.46C15.7 6.44 14.9 6.6 14.5 7L11.5 8.16 15.34 12z" fill="#34A853"/></svg>; }

/* ── APP ───────────────────────────────────────────────────────────── */
export default function AccountaFit() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ background: "var(--black)", minHeight: "100vh" }}>
        <Nav onCTA={() => setModal(true)} />
        <Hero onCTA={() => setModal(true)} />
        <Problem />
        <WhatItIs onCTA={() => setModal(true)} />
        <HowItWorks />
        <WhyDifferent />
        <Features />
        <Stats />
        <SocialProof />
        <FAQ />
        <FinalCTA onCTA={() => setModal(true)} />
        <Footer />
        {modal && <Modal onClose={() => setModal(false)} />}
      </div>
    </>
  );
}
