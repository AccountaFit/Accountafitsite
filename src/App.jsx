import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
//  ACCOUNTAFIT — "Stop Starting Over" Rebuild
//  Theme: emotional fitness accountability, Nike-meets-SaaS
//  Palette: #050505 / #B91C1C / #EF4444 / #F5F5F5 / #A3A3A3
//  Fonts: Anton (display) · Barlow Condensed (labels/UI) · DM Sans (body)
// ═══════════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --black:  #050505;
  --dark:   #0D0D0D;
  --card:   #111111;
  --graph:  #1A1A1A;
  --border: #242424;
  --red:    #B91C1C;
  --redhov: #DC2626;
  --redhi:  #EF4444;
  --white:  #F5F5F5;
  --gray:   #A3A3A3;
  --muted:  #4A4A4A;
  --radius: 12px;
}

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body { background:var(--black); color:var(--white); font-family:'DM Sans',sans-serif; overflow-x:hidden; -webkit-font-smoothing:antialiased; }

::-webkit-scrollbar { width:3px; }
::-webkit-scrollbar-track { background:var(--black); }
::-webkit-scrollbar-thumb { background:var(--red); border-radius:2px; }

/* Keyframes */
@keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(185,28,28,.5)} 60%{box-shadow:0 0 0 16px rgba(185,28,28,0)} }
@keyframes shimmer  { 0%,100%{opacity:.5} 50%{opacity:1} }
@keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes lineGrow { from{width:0} to{width:100%} }

/* Typography */
.d  { font-family:'Anton',sans-serif; font-style:italic; }
.bc { font-family:'Barlow Condensed',sans-serif; }
.lbl {
  font-family:'Barlow Condensed',sans-serif;
  font-weight:700; font-size:.72rem;
  letter-spacing:.28em; text-transform:uppercase; color:var(--red);
}

/* Buttons */
.btn-red {
  display:inline-flex; align-items:center; gap:10px;
  background:var(--red); color:var(--white);
  font-family:'Barlow Condensed',sans-serif; font-weight:700;
  font-size:.95rem; letter-spacing:.16em; text-transform:uppercase;
  padding:16px 44px; border:none; border-radius:100px;
  cursor:pointer; transition:all .2s ease;
  box-shadow:0 4px 24px rgba(185,28,28,.3);
  position:relative; overflow:hidden;
}
.btn-red:hover { background:var(--redhov); transform:translateY(-2px); box-shadow:0 12px 36px rgba(220,38,38,.45); }
.btn-red:active { transform:translateY(0); }
.btn-red.pulse  { animation:pulse 2.8s ease-in-out infinite; }

.btn-ghost {
  display:inline-flex; align-items:center; gap:8px;
  background:transparent; color:var(--white);
  font-family:'Barlow Condensed',sans-serif; font-weight:600;
  font-size:.9rem; letter-spacing:.14em; text-transform:uppercase;
  padding:15px 36px; border:1.5px solid rgba(245,245,245,.2); border-radius:100px;
  cursor:pointer; transition:all .2s ease;
}
.btn-ghost:hover { border-color:var(--redhi); color:var(--redhi); }

/* Cards */
.card {
  background:var(--card); border:1px solid var(--border);
  border-radius:var(--radius); padding:30px 26px;
  transition:all .3s ease; position:relative; overflow:hidden;
}
.card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,var(--red),transparent);
  opacity:0; transition:opacity .3s;
}
.card:hover { border-color:var(--red); transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,0,0,.6),0 0 32px rgba(185,28,28,.1); }
.card:hover::before { opacity:1; }

/* Divider */
.divider { height:1px; background:linear-gradient(90deg,transparent,var(--border),transparent); }

/* Grain */
.grain::after {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:4;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
  opacity:.5;
}

/* Red accent line */
.redbar { display:block; width:40px; height:2px; background:var(--red); margin-bottom:18px; }

/* Input */
.email-in {
  flex:1 1 260px; max-width:340px;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:100px; color:var(--white); font-family:'DM Sans',sans-serif;
  font-size:.93rem; padding:15px 22px; outline:none; transition:border-color .2s;
}
.email-in::placeholder { color:var(--muted); }
.email-in:focus { border-color:rgba(185,28,28,.6); }

/* FAQ */
.faq-wrap { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; transition:border-color .2s; }
.faq-wrap.open { border-color:rgba(185,28,28,.4); }
.faq-btn { width:100%; background:none; border:none; cursor:pointer; padding:22px 24px; display:flex; justify-content:space-between; align-items:center; gap:12px; }
.faq-plus { color:var(--red); font-size:1.5rem; line-height:1; transition:transform .2s; flex-shrink:0; }
.faq-ans  { padding:0 24px 20px; color:var(--gray); line-height:1.75; font-size:.93rem; animation:fadeIn .2s ease; }

/* Responsive */
@media (max-width:860px) {
  .hide-m { display:none!important; }
  .split  { grid-template-columns:1fr!important; gap:48px!important; }
  .hero-h { font-size:clamp(3rem,13vw,6rem)!important; }
  .feat-grid { grid-template-columns:1fr 1fr!important; }
}
@media (min-width:861px) { .hide-d { display:none!important; } }
`;

/* ── Helpers ─────────────────────────────────────────────────────── */
function useInView(t = .12) {
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

/* ── Logo ────────────────────────────────────────────────────────── */
function Logo({ size = "1.5rem" }) {
  return (
    <span className="d" style={{ fontSize: size, letterSpacing: ".03em", lineHeight: 1, userSelect: "none" }}>
      <span style={{ color: "#F5F5F5" }}>Accounta</span>
      <span style={{ color: "#EF4444" }}>Fit</span>
    </span>
  );
}

/* ── Nav ─────────────────────────────────────────────────────────── */
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
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%",
        background: scrolled ? "rgba(5,5,5,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(36,36,36,.9)" : "none",
        transition: "all .3s ease",
      }}>
        <Logo />
        <div className="hide-m" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              style={{ color: "rgba(245,245,245,.72)", fontFamily: "'DM Sans'", fontSize: ".88rem", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#F5F5F5"}
              onMouseLeave={e => e.target.style.color = "rgba(245,245,245,.72)"}>{l}</a>
          ))}
        </div>
        <button onClick={onCTA} className="hide-m" style={{
          background: "transparent", color: "#F5F5F5",
          fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
          fontSize: ".82rem", letterSpacing: ".14em", textTransform: "uppercase",
          padding: "9px 24px", border: "1.5px solid rgba(225,29,46,.6)", borderRadius: 100,
          cursor: "pointer", transition: "all .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.borderColor = "var(--red)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(225,29,46,.6)"; }}>
          Join Waitlist
        </button>
        <button className="hide-d" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "#F5F5F5", fontSize: "1.4rem", cursor: "pointer" }}>
          {open ? "✕" : "☰"}
        </button>
      </nav>
      {open && (
        <div style={{ position: "fixed", inset: "68px 0 0", background: "#050505", zIndex: 299, padding: "32px 5%", display: "flex", flexDirection: "column", gap: 24, borderTop: "1px solid var(--border)" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} onClick={() => setOpen(false)}
              style={{ color: "#F5F5F5", fontFamily: "'DM Sans'", fontSize: "1.1rem", textDecoration: "none" }}>{l}</a>
          ))}
          <button className="btn-red" onClick={() => { setOpen(false); onCTA(); }} style={{ justifyContent: "center" }}>Join Waitlist</button>
        </div>
      )}
    </>
  );
}

/* ── HERO ────────────────────────────────────────────────────────── */
function Hero({ onCTA }) {
  return (
    <section className="grain" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Background atmosphere */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(145deg,#080808 0%,#0E0101 45%,#120203 70%,#050505 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at 70% 38%,rgba(185,28,28,.24) 0%,transparent 55%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at 15% 75%,rgba(185,28,28,.1) 0%,transparent 50%)" }} />
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "linear-gradient(rgba(185,28,28,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(185,28,28,.035) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      {/* Top vignette for nav */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, zIndex: 2, background: "linear-gradient(to bottom,rgba(5,5,5,.55) 0%,transparent 100%)" }} />

      {/* Main hero content */}
      <div style={{ position: "relative", zIndex: 5, flex: 1, display: "flex", alignItems: "center", padding: "120px 5% 0" }}>
        <Wrap style={{ padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", width: "100%" }} max={1200}>

          {/* Left — copy */}
          <div className="split" style={{ gridColumn: "1" }}>
            <div style={{ animation: "fadeUp .6s .05s ease both", opacity: 0, marginBottom: 22 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(185,28,28,.14)", border: "1px solid rgba(185,28,28,.35)",
                borderRadius: 100, padding: "6px 18px",
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
                fontSize: ".74rem", letterSpacing: ".24em", textTransform: "uppercase", color: "#EF4444",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", animation: "shimmer 2s ease-in-out infinite" }} />
                Early Access Open
              </span>
            </div>

            <h1 className="hero-h d" style={{
              fontSize: "clamp(3.2rem,7vw,6.5rem)", lineHeight: .92, letterSpacing: ".02em",
              color: "#F5F5F5", marginBottom: 20,
              textShadow: "0 4px 40px rgba(0,0,0,.6)",
              animation: "fadeUp .8s .18s ease both", opacity: 0,
            }}>
              STOP<br />
              <span style={{ color: "#EF4444" }}>STARTING</span><br />
              OVER.
            </h1>

            <p style={{
              fontSize: "clamp(1rem,1.6vw,1.15rem)", color: "rgba(245,245,245,.68)",
              lineHeight: 1.78, maxWidth: 500, fontWeight: 400,
              animation: "fadeUp .8s .34s ease both", opacity: 0, marginBottom: 40,
            }}>
              AccountaFit pairs you with an accountability partner who matches your goals, your schedule, and your energy. Because discipline isn't built alone — it's built together.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, animation: "fadeUp .8s .5s ease both", opacity: 0 }}>
              <button className="btn-red pulse" onClick={onCTA} style={{ fontSize: "1rem", padding: "17px 48px" }}>
                Join the Waitlist
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="btn-ghost" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
                See How It Works
              </button>
            </div>

            {/* Trust micro-stats */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 44px", marginTop: 52, animation: "fadeUp .8s .65s ease both", opacity: 0 }}>
              {[["2,400+", "People on the waitlist"], ["94%", "Report staying more consistent"], ["48 hrs", "Average time to get matched"]].map(([n, l]) => (
                <div key={l}>
                  <div className="d" style={{ fontSize: "2.2rem", color: "#F5F5F5", lineHeight: 1 }}>{n}</div>
                  <div className="bc" style={{ fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,245,245,.38)", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — App mockup */}
          <div className="hide-m split" style={{ animation: "fadeUp .9s .3s ease both", opacity: 0, display: "flex", justifyContent: "center" }}>
            <AppMockup />
          </div>

        </Wrap>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "relative", zIndex: 5, background: "linear-gradient(to top,rgba(5,5,5,1) 40%,transparent)", height: 120, marginTop: 60 }} />
    </section>
  );
}

/* ── App Mockup ──────────────────────────────────────────────────── */
function AppMockup() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const checked = [true, true, true, true, true, false, false];
  return (
    <div style={{ width: 300, animation: "floatUp 5s ease-in-out infinite" }}>
      {/* Phone frame */}
      <div style={{
        background: "linear-gradient(160deg,#1A1A1A,#0D0D0D)", border: "1px solid #2A2A2A",
        borderRadius: 32, padding: 20,
        boxShadow: "0 48px 96px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04), 0 0 80px rgba(185,28,28,.12)",
      }}>
        {/* Status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: "0 4px" }}>
          <div className="bc" style={{ fontSize: ".65rem", color: "#555", letterSpacing: ".08em" }}>9:41</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[12, 16, 20].map(h => <div key={h} style={{ width: 3, height: h, background: "#444", borderRadius: 2 }} />)}
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div className="bc" style={{ fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#EF4444", marginBottom: 4 }}>Your Streak</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="d" style={{ fontSize: "3.2rem", color: "#F5F5F5", lineHeight: 1 }}>47</span>
            <span className="bc" style={{ fontSize: ".8rem", color: "#666", letterSpacing: ".1em", textTransform: "uppercase" }}>days</span>
            <FlameIconSm />
          </div>
          {/* Progress to 60 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: ".72rem", color: "#555" }}>Next milestone</span>
              <span className="bc" style={{ fontSize: ".7rem", color: "#EF4444", fontWeight: 700 }}>60 days</span>
            </div>
            <div style={{ height: 4, background: "#222", borderRadius: 4 }}>
              <div style={{ width: "78%", height: "100%", background: "linear-gradient(90deg,#B91C1C,#EF4444)", borderRadius: 4, boxShadow: "0 0 10px rgba(239,68,68,.35)" }} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1E1E1E", margin: "14px 0" }} />

        {/* Weekly grid */}
        <div style={{ marginBottom: 18 }}>
          <div className="bc" style={{ fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#444", marginBottom: 10 }}>This week</div>
          <div style={{ display: "flex", gap: 5 }}>
            {days.map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: ".5rem", color: "#3A3A3A", marginBottom: 5, fontFamily: "'Barlow Condensed',sans-serif" }}>{d}</div>
                <div style={{
                  height: 30, borderRadius: 6,
                  background: checked[i] ? "#B91C1C" : "#1A1A1A",
                  border: "1px solid", borderColor: checked[i] ? "transparent" : "#2A2A2A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: checked[i] ? "0 0 8px rgba(185,28,28,.3)" : "none",
                }}>
                  {checked[i] && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner card */}
        <div style={{ background: "#0D0D0D", border: "1px solid #1E1E1E", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#B91C1C,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontStyle: "italic", fontSize: ".85rem", color: "#F5F5F5", flexShrink: 0 }}>JM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#F5F5F5", fontSize: ".82rem" }}>Jordan M.</div>
              <div style={{ fontSize: ".68rem", color: "#555" }}>5×/week · Build muscle</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: ".6rem", color: "#22c55e", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: ".08em" }}>ACTIVE</span>
            </div>
          </div>
          {/* Check-in status */}
          <div style={{ display: "flex", gap: 8 }}>
            {[["You", true], ["Jordan", true]].map(([name, done]) => (
              <div key={name} style={{ flex: 1, background: done ? "rgba(185,28,28,.12)" : "#111", border: "1px solid", borderColor: done ? "rgba(185,28,28,.3)" : "#222", borderRadius: 8, padding: "7px 0", textAlign: "center" }}>
                <div style={{ fontSize: ".58rem", color: done ? "#EF4444" : "#444", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: ".1em", textTransform: "uppercase" }}>{done ? "Checked In" : "Pending"}</div>
                <div style={{ fontSize: ".65rem", color: done ? "rgba(245,245,245,.6)" : "#333", marginTop: 1 }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PROBLEM ─────────────────────────────────────────────────────── */
function Problem() {
  const [ref, vis] = useInView();
  return (
    <section style={{ padding: "112px 5%", background: "var(--dark)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%,rgba(185,28,28,.07) 0%,transparent 60%)", pointerEvents: "none" }} />
      <Wrap>
        <div ref={ref}>
          {/* Headline */}
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <span className="lbl">Sound Familiar?</span>
            <h2 className="d" style={{
              fontSize: "clamp(2.4rem,5.5vw,4rem)", color: "#F5F5F5", marginTop: 10, lineHeight: .95,
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all .75s ease",
            }}>
              YOU DON'T HAVE<br />A DISCIPLINE PROBLEM.<br />
              <span style={{ color: "#EF4444" }}>YOU HAVE A SUPPORT PROBLEM.</span>
            </h2>
            <p style={{ marginTop: 20, fontSize: "1rem", color: "var(--gray)", lineHeight: 1.78, maxWidth: 560, opacity: vis ? 1 : 0, transition: "opacity .75s .2s ease" }}>
              The cycle is always the same. You start strong. Life gets busy. The momentum slips. And before you know it, you're back at day one — again. That's not a willpower issue. That's what happens when you're trying to do it alone.
            </p>
          </div>

          {/* Pain cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {[
              { icon: <BreakIcon />, head: "The January Effect", body: "You go all-in for three weeks then disappear. Every single year." },
              { icon: <AloneIcon />, head: "Training Solo Is Hard", body: "When no one's counting on you to show up, not showing up is too easy." },
              { icon: <ResetIcon />, head: "Always Starting Over", body: "You know the routine by heart — because you've had to restart it four times." },
              { icon: <DrainIcon />, head: "Motivation Isn't Enough", body: "Motivation is a feeling. It fades. What lasts is having someone in your corner." },
            ].map(({ icon, head, body }, i) => (
              <div key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(22px)", transition: `all .65s ${i * .12}s ease` }}>
                <div style={{ marginBottom: 16 }}>{icon}</div>
                <h3 className="bc" style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: ".08em", textTransform: "uppercase", color: "#F5F5F5", marginBottom: 8 }}>{head}</h3>
                <p style={{ color: "var(--gray)", lineHeight: 1.65, fontSize: ".92rem" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── WHAT IT IS ──────────────────────────────────────────────────── */
function WhatItIs() {
  const [ref, vis] = useInView(.1);
  return (
    <section style={{ padding: "112px 5%", background: "var(--black)" }}>
      <Wrap>
        <div ref={ref} className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* Left — visual */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-28px)", transition: "all .85s ease" }}>
            <MatchCard />
          </div>

          {/* Right — copy */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(28px)", transition: "all .85s .2s ease" }}>
            <span className="redbar" />
            <span className="lbl">What AccountaFit Is</span>
            <h2 className="d" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", color: "#F5F5F5", marginTop: 10, lineHeight: 1 }}>
              YOUR PARTNER<br />IN STAYING<br /><span style={{ color: "#EF4444" }}>CONSISTENT.</span>
            </h2>
            <p style={{ marginTop: 20, fontSize: ".98rem", color: "var(--gray)", lineHeight: 1.82 }}>
              AccountaFit isn't a workout tracker. It's not a social feed. It's a direct accountability system that connects you with a real person who has the same goals, the same schedule, and the same commitment to not falling off this time.
            </p>
            <p style={{ marginTop: 14, fontSize: ".98rem", color: "var(--gray)", lineHeight: 1.82 }}>
              You check in daily. They check in daily. You both hold the line — together. That shared responsibility changes everything.
            </p>
            <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 13 }}>
              {[
                "Matched by goals, schedule, and commitment level",
                "Daily check-ins that build real, lasting habits",
                "Shared streaks that make skipping feel personal",
                "Progress you can both see — no hiding, no fading",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(185,28,28,.14)", border: "1px solid rgba(185,28,28,.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ color: "#E0E0E0", fontSize: ".97rem", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── Match Card ──────────────────────────────────────────────────── */
function MatchCard() {
  return (
    <div style={{ position: "relative" }}>
      {/* Corner accents */}
      <div style={{ position: "absolute", top: -16, left: -16, width: 80, height: 80, border: "2px solid rgba(185,28,28,.28)", borderRadius: 12, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -16, right: -16, width: 56, height: 56, border: "1px solid rgba(185,28,28,.16)", borderRadius: 10, zIndex: 0 }} />

      <div style={{
        position: "relative", zIndex: 1,
        background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 28,
        boxShadow: "0 32px 80px rgba(0,0,0,.55), 0 0 60px rgba(185,28,28,.07)",
      }}>
        <div className="lbl" style={{ marginBottom: 18 }}>Your Match</div>

        {/* Partner profiles */}
        {[
          { ini: "KL", name: "Keisha L.", goal: "Cut + tone", sched: "6am, 5×/week", streak: 34, compat: 97 },
          { ini: "MR", name: "Marcus R.", goal: "Build muscle", sched: "Evening, 4×/week", streak: 21, compat: 93 },
        ].map((p, i) => (
          <div key={i} style={{
            background: "var(--graph)", border: "1px solid var(--border)", borderRadius: 12,
            padding: "14px 16px", marginBottom: i === 0 ? 12 : 0,
            borderColor: i === 0 ? "rgba(185,28,28,.3)" : "var(--border)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i === 0 ? 12 : 0 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: `linear-gradient(135deg,${i === 0 ? "#B91C1C,#7f1d1d" : "#333,#1a1a1a"})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Anton',sans-serif", fontStyle: "italic", fontSize: ".88rem", color: "#F5F5F5", flexShrink: 0,
              }}>{p.ini}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#F5F5F5", fontSize: ".9rem" }}>{p.name}</div>
                <div style={{ fontSize: ".72rem", color: "var(--gray)" }}>{p.goal} · {p.sched}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                  <FlameIconSm />
                  <span className="d" style={{ fontSize: "1.1rem", color: "#F5F5F5" }}>{p.streak}</span>
                </div>
                <div style={{ fontSize: ".6rem", color: "var(--muted)", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: ".08em" }}>day streak</div>
              </div>
            </div>
            {i === 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, height: 4, background: "#222", borderRadius: 4, marginRight: 10 }}>
                  <div style={{ width: `${p.compat}%`, height: "100%", background: "linear-gradient(90deg,#B91C1C,#EF4444)", borderRadius: 4 }} />
                </div>
                <span className="bc" style={{ fontSize: ".68rem", color: "#EF4444", fontWeight: 700, letterSpacing: ".1em" }}>{p.compat}% match</span>
              </div>
            )}
          </div>
        ))}

        {/* Bottom action */}
        <div style={{ marginTop: 16, background: "rgba(185,28,28,.08)", border: "1px solid rgba(185,28,28,.2)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <FlameIconSm />
          <span style={{ fontSize: ".82rem", color: "rgba(245,245,245,.65)", lineHeight: 1.5 }}>Both partners must check in to keep the streak alive. No excuses.</span>
        </div>
      </div>
    </div>
  );
}

/* ── HOW IT WORKS ────────────────────────────────────────────────── */
function HowItWorks() {
  const [ref, vis] = useInView(.1);
  const steps = [
    { n: "01", title: "Build Your Profile", body: "Tell us your goals, your schedule, and how hard you want to be pushed. This is how we find someone who actually fits." },
    { n: "02", title: "Get Matched in 48 Hours", body: "Our matching system finds you a partner with compatible goals, timing, and accountability energy. Not a random stranger — the right person." },
    { n: "03", title: "Commit Together", body: "Connect with your partner, align on expectations, and make a mutual commitment. Not a suggestion. A pact." },
    { n: "04", title: "Build the Streak", body: "Daily check-ins. Shared progress. Mutual accountability. The longer the streak, the harder it is to break. That's the point." },
  ];
  return (
    <section id="how-it-works" style={{ padding: "112px 5%", background: "var(--dark)" }}>
      <Wrap max={980}>
        <div ref={ref}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="lbl">How It Works</span>
            <h2 className="d" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#F5F5F5", marginTop: 10, lineHeight: .97 }}>
              FOUR STEPS TO <span style={{ color: "#EF4444" }}>NEVER STARTING OVER AGAIN</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
            {/* Vertical line */}
            <div className="hide-m" style={{ position: "absolute", left: 35, top: 68, bottom: 68, width: 1, background: "linear-gradient(to bottom,var(--red),rgba(185,28,28,.1))", opacity: .25 }} />

            {steps.map(({ n, title, body }, i) => (
              <div key={i} style={{
                display: "flex", gap: 32, alignItems: "flex-start",
                padding: "28px 0",
                borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none",
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)",
                transition: `all .72s ${i * .15}s ease`,
              }}>
                <div className="d" style={{
                  width: 70, height: 70, borderRadius: "50%", flexShrink: 0,
                  background: "var(--black)", border: "2px solid var(--red)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", color: "var(--red)", zIndex: 1,
                }}>{n}</div>
                <div style={{ paddingTop: 16 }}>
                  <h3 className="bc" style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#F5F5F5", marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: "var(--gray)", lineHeight: 1.72, maxWidth: 520, fontSize: ".95rem" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── WHY DIFFERENT ───────────────────────────────────────────────── */
function WhyDifferent() {
  const [ref, vis] = useInView();
  const rows = [
    { them: "Tracks your workouts", us: "Holds you to your workouts" },
    { them: "Sends you notifications", us: "Sends someone who actually cares" },
    { them: "Shows you motivational content", us: "Builds you real discipline" },
    { them: "Works when you're motivated", us: "Works when you don't feel like it" },
    { them: "You use it alone", us: "You're never doing it alone" },
  ];
  return (
    <section style={{ padding: "112px 5%", background: "var(--black)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.07) 0%,transparent 60%)", pointerEvents: "none" }} />
      <Wrap>
        <div ref={ref}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="lbl">Why AccountaFit</span>
            <h2 className="d" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#F5F5F5", marginTop: 10, lineHeight: .97, opacity: vis ? 1 : 0, transition: "opacity .75s ease" }}>
              OTHER APPS TRACK YOU.<br /><span style={{ color: "#EF4444" }}>WE HOLD YOU.</span>
            </h2>
          </div>

          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 4 }}>
              <div style={{ background: "var(--graph)", borderRadius: "10px 10px 0 0", padding: "12px 20px", textAlign: "center" }}>
                <span className="bc" style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>Every Other App</span>
              </div>
              <div style={{ background: "rgba(185,28,28,.15)", border: "1px solid rgba(185,28,28,.3)", borderRadius: "10px 10px 0 0", padding: "12px 20px", textAlign: "center" }}>
                <span className="bc" style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#EF4444", fontWeight: 700 }}>AccountaFit</span>
              </div>
            </div>
            {rows.map(({ them, us }, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2,
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)",
                transition: `all .55s ${i * .08}s ease`,
              }}>
                <div style={{ background: "var(--card)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A4A4A" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span style={{ color: "var(--muted)", fontSize: ".9rem" }}>{them}</span>
                </div>
                <div style={{ background: "rgba(185,28,28,.08)", border: "1px solid rgba(185,28,28,.18)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ color: "#E0E0E0", fontSize: ".9rem" }}>{us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── FEATURES ────────────────────────────────────────────────────── */
function Features() {
  const [ref, vis] = useInView();
  const feats = [
    { icon: <TargetIcon />, title: "Smart Matching", body: "Paired by goals, schedule, fitness level, and how hard you need to be pushed." },
    { icon: <FlameIconLg />, title: "Shared Streaks", body: "Both partners check in daily. The streak only survives if you both show up." },
    { icon: <ChatIcon />, title: "Daily Check-Ins", body: "60-second habit that builds consistency faster than any workout plan." },
    { icon: <ChartIcon />, title: "Progress Visibility", body: "You both see it. No hiding. No quietly falling off. Full transparency." },
    { icon: <CalIcon />, title: "Schedule Sync", body: "Matched to your actual life — mornings, nights, weekdays, weekends." },
    { icon: <RefreshIcon />, title: "Smart Rematch", body: "Partnership not clicking? We find you a better fit. Momentum protected." },
  ];
  return (
    <section id="features" style={{ padding: "112px 5%", background: "var(--dark)" }}>
      <Wrap>
        <div ref={ref}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="lbl">Features</span>
            <h2 className="d" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#F5F5F5", marginTop: 10, opacity: vis ? 1 : 0, transition: "opacity .75s ease" }}>
              BUILT FOR <span style={{ color: "#EF4444" }}>PEOPLE WHO KEEP FALLING OFF</span>
            </h2>
          </div>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {feats.map(({ icon, title, body }, i) => (
              <div key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all .6s ${i * .08}s ease` }}>
                <span className="redbar" />
                <div style={{ marginBottom: 16 }}>{icon}</div>
                <h3 className="bc" style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#F5F5F5", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "var(--gray)", lineHeight: 1.65, fontSize: ".91rem" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ── TESTIMONIALS ────────────────────────────────────────────────── */
function Testimonials() {
  const [ref, vis] = useInView(.08);
  const ts = [
    { ini: "MT", name: "Marcus T.", role: "Down 28 lbs, 4 months", q: "I've downloaded every fitness app. None of them made me feel like someone was actually waiting for me. AccountaFit did. That changed everything." },
    { ini: "PS", name: "Priya S.", role: "Marathon finisher, 3×", q: "Eleven weeks. Not one missed check-in between me and my partner. That streak started feeling like part of who I am." },
    { ini: "DK", name: "Devon K.", role: "+15 lbs of muscle", q: "I stopped trying to be motivated. I just made sure my partner knew I was showing up. That's it. That's the whole thing." },
    { ini: "AW", name: "Aaliyah W.", role: "Finally hit her goal weight", q: "I didn't need a trainer or a gym. I needed someone who would notice if I stopped. That's exactly what AccountaFit gave me." },
    { ini: "CM", name: "Carlos M.", role: "6 months consistent", q: "My partner and I have never even met. But I show up for them every single day at 5am. And they show up for me." },
    { ini: "JB", name: "Jordan B.", role: "Back after 2-year gap", q: "I'm not motivated every day. But I haven't quit. Because someone else's streak is on the line too." },
  ];
  return (
    <section style={{ padding: "112px 5%", background: "var(--black)" }}>
      <Wrap>
        <div ref={ref}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="lbl">Real People. Real Results.</span>
            <h2 className="d" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#F5F5F5", marginTop: 10 }}>
              THEY STOPPED <span style={{ color: "#EF4444" }}>STARTING OVER.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {ts.map(({ ini, name, role, q }, i) => (
              <div key={i} className="card" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all .6s ${i * .08}s ease` }}>
                <div style={{ fontSize: "2.2rem", color: "rgba(185,28,28,.28)", fontFamily: "Georgia,serif", lineHeight: 1, marginBottom: 14 }}>"</div>
                <p style={{ color: "#E0E0E0", lineHeight: 1.74, fontSize: ".93rem", marginBottom: 22 }}>{q}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 18 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#B91C1C,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontStyle: "italic", color: "#F5F5F5", fontSize: ".82rem" }}>{ini}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#F5F5F5", fontSize: ".87rem" }}>{name}</div>
                    <div className="bc" style={{ fontSize: ".7rem", letterSpacing: ".1em", color: "var(--red)" }}>{role}</div>
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

/* ── STATS ───────────────────────────────────────────────────────── */
function Stats() {
  const [ref, vis] = useInView();
  return (
    <section style={{ padding: "80px 5%", background: "linear-gradient(135deg,#0C0101,#120303,#0C0101)", borderTop: "1px solid #1A0303", borderBottom: "1px solid #1A0303", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.12) 0%,transparent 65%)", pointerEvents: "none" }} />
      <Wrap>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32 }}>
          {[
            ["3×", "More likely to reach your goal with an accountability partner than going it alone"],
            ["94%", "Of our users report stronger consistency in their very first month"],
            ["65%", "Higher goal completion vs solo training — across every fitness type"],
            ["14 days", "Average time to lock in a lasting habit when someone else is counting on you"],
          ].map(([v, l], i) => (
            <div key={i} style={{ textAlign: "center", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)", transition: `all .65s ${i * .1}s ease` }}>
              <div className="d" style={{ fontSize: "3.2rem", color: "var(--redhi)", lineHeight: 1, marginBottom: 12 }}>{v}</div>
              <p style={{ fontSize: ".86rem", color: "rgba(245,245,245,.5)", lineHeight: 1.65 }}>{l}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Is this a dating app?", a: "Not even close. AccountaFit is a fitness accountability platform. Every match is based on goals, schedule, and commitment level — full stop." },
    { q: "What if I get matched with someone who ghosts?", a: "Our Smart Rematch system catches disengaged partnerships early and finds you a better match before your momentum breaks." },
    { q: "How long does matching take?", a: "Most users get matched within 48 hours. We'd rather find you the right person than the fastest one." },
    { q: "Does it cost anything?", a: "Early access members join for free and lock in priority matching at launch. Subscription pricing will be announced before we go live." },
    { q: "How much time does it take per day?", a: "About 60 seconds for a check-in. The goal is consistency, not complexity. It fits into real life — that's the point." },
    { q: "What if I'm a beginner?", a: "Perfect. AccountaFit works for any fitness level. You're matched with someone at your level, not someone who makes you feel behind." },
  ];
  return (
    <section id="faq" style={{ padding: "112px 5%", background: "var(--dark)" }}>
      <Wrap max={740}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="lbl">FAQ</span>
          <h2 className="d" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", color: "#F5F5F5", marginTop: 10 }}>
            REAL <span style={{ color: "#EF4444" }}>QUESTIONS</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {faqs.map(({ q, a }, i) => (
            <div key={i} className={`faq-wrap${open === i ? " open" : ""}`}>
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, color: "#F5F5F5", fontSize: ".97rem", flex: 1, textAlign: "left" }}>{q}</span>
                <span className="faq-plus" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {open === i && <div className="faq-ans">{a}</div>}
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ── FINAL CTA ───────────────────────────────────────────────────── */
function FinalCTA({ onCTA }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = () => { if (email.trim()) setDone(true); };
  return (
    <section style={{ padding: "120px 5%", background: "linear-gradient(160deg,#080808,#110202,#080808)", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.16) 0%,transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(185,28,28,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(185,28,28,.04) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 620, margin: "0 auto" }}>
        <span className="lbl">This Is Your Moment</span>
        <h2 className="d" style={{ fontSize: "clamp(2.8rem,8vw,5.5rem)", color: "#F5F5F5", marginTop: 10, lineHeight: .92 }}>
          STOP<br /><span style={{ color: "#EF4444" }}>STARTING</span><br />OVER.
        </h2>
        <p style={{ marginTop: 22, fontSize: "1rem", color: "rgba(245,245,245,.65)", lineHeight: 1.78 }}>
          The next time you think about starting a fitness journey, you won't be doing it alone. Join the waitlist and be among the first people matched when we launch.
        </p>

        {done ? (
          <div style={{ marginTop: 48, background: "rgba(185,28,28,.1)", border: "1px solid rgba(185,28,28,.35)", borderRadius: 16, padding: "36px 40px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><FlameIconLg /></div>
            <div className="d" style={{ fontSize: "2rem", color: "#F5F5F5", marginBottom: 10 }}>YOU'RE ON THE LIST.</div>
            <p style={{ color: "var(--gray)" }}>We'll reach out when it's your turn. Stay consistent until then.</p>
          </div>
        ) : (
          <>
            <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <input type="email" className="email-in" placeholder="Enter your email address"
                value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
              <button className="btn-red" onClick={submit} style={{ whiteSpace: "nowrap", padding: "15px 40px" }}>
                Join the Waitlist →
              </button>
            </div>
            <p style={{ marginTop: 14, fontSize: ".75rem", color: "rgba(245,245,245,.25)" }}>No credit card. No spam. Just early access.</p>
          </>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#030303", borderTop: "1px solid #0F0F0F", padding: "56px 5% 32px" }}>
      <Wrap>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 36, marginBottom: 44 }}>
          <div>
            <Logo size="1.5rem" />
            <p style={{ marginTop: 12, fontSize: ".82rem", color: "var(--muted)", maxWidth: 240, lineHeight: 1.68 }}>
              Consistency over motivation.<br />Accountability over intention.
            </p>
            {/* Social */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {["X", "IG", "TK"].map(s => (
                <div key={s} style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--graph)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--red)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  <span style={{ fontSize: ".62rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: ".06em", color: "var(--muted)" }}>{s}</span>
                </div>
              ))}
            </div>
            {/* App badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
              {[
                { label: "Download on the", name: "App Store", icon: <AppleIcon /> },
                { label: "Get it on", name: "Google Play", icon: <PlayIcon /> },
              ].map(({ label, name, icon }) => (
                <a key={name} href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  background: "var(--graph)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px",
                  textDecoration: "none", transition: "border-color .2s", width: "fit-content",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--red)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  {icon}
                  <div>
                    <div style={{ fontSize: ".58rem", color: "var(--muted)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1, marginBottom: 1 }}>{label}</div>
                    <div style={{ fontSize: ".88rem", fontWeight: 600, color: "#F5F5F5", fontFamily: "'DM Sans',sans-serif", lineHeight: 1 }}>{name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 52 }}>
            {[
              { title: "Product", links: ["Features", "How It Works", "Pricing", "FAQ"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookies"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="bc" style={{ fontWeight: 700, fontSize: ".68rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>{title}</div>
                {links.map(l => (
                  <a key={l} href="#" style={{ display: "block", color: "var(--muted)", fontSize: ".84rem", textDecoration: "none", marginBottom: 9, transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#F5F5F5"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 22 }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
          <p style={{ fontSize: ".76rem", color: "#1E1E1E" }}>© 2026 AccountaFit. All rights reserved.</p>
          <p style={{ fontSize: ".76rem", color: "#1E1E1E" }}>Built for people who don't quit.</p>
        </div>
      </Wrap>
    </footer>
  );
}

/* ── MODAL ───────────────────────────────────────────────────────── */
function Modal({ onClose }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = () => { if (email.trim()) setDone(true); };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.88)", backdropFilter: "blur(14px)" }} />
      <div style={{ position: "relative", background: "var(--dark)", border: "1px solid var(--border)", borderRadius: 20, padding: "52px 44px", maxWidth: 480, width: "100%", animation: "fadeUp .3s ease" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "1.3rem", lineHeight: 1 }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><FlameIconLg /></div>
            <h3 className="d" style={{ fontSize: "2.2rem", color: "#F5F5F5", marginBottom: 10 }}>YOU'RE IN.</h3>
            <p style={{ color: "var(--gray)" }}>We'll reach out when it's your turn. Stay consistent until then.</p>
            <button className="btn-red" onClick={onClose} style={{ marginTop: 26, width: "100%", justifyContent: "center" }}>Close</button>
          </div>
        ) : (
          <>
            <span className="lbl">Early Access</span>
            <h3 className="d" style={{ fontSize: "2.6rem", color: "#F5F5F5", marginTop: 8, marginBottom: 14, lineHeight: .95 }}>
              JOIN THE<br /><span style={{ color: "#EF4444" }}>WAITLIST</span>
            </h3>
            <p style={{ color: "var(--gray)", marginBottom: 26, lineHeight: 1.68, fontSize: ".94rem" }}>
              Priority matching and free access to all features at launch. No credit card needed.
            </p>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()}
              style={{ width: "100%", marginBottom: 12, background: "var(--graph)", border: "1px solid var(--border)", borderRadius: 10, color: "#F5F5F5", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", padding: "15px 18px", outline: "none", transition: "border-color .2s" }}
              onFocus={e => e.target.style.borderColor = "var(--red)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"} />
            <button className="btn-red" style={{ width: "100%", justifyContent: "center", padding: "15px 0" }} onClick={submit}>
              Claim My Spot →
            </button>
            <p style={{ marginTop: 11, fontSize: ".74rem", color: "var(--muted)", textAlign: "center" }}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── SVG Icons ───────────────────────────────────────────────────── */
function FlameIconSm() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 7.5 6.5 7.5 11.5C7.5 13.163 8.163 14.674 9.25 15.75C9.163 15.163 9.25 14.5 9.5 14C10.5 15 11 16.5 11 17.5C11 19.433 12.343 21 14 21C12.667 19.5 12.5 17.5 13.5 16C14 15.5 14.5 15 14.5 14C15.5 15 16 16.5 16 17.5C17.5 16 18.5 13.5 16.5 11C17.5 11 18.5 11.5 19 12C19 7 15 3.5 12 2Z" fill="#EF4444" opacity=".9" />
      <path d="M12 14C12 14 10.5 15.5 10.5 17C10.5 18.381 11.119 19 12 19.5C12.881 19 13.5 18.381 13.5 17C13.5 15.5 12 14 12 14Z" fill="#EF4444" opacity=".6" />
    </svg>
  );
}
function FlameIconLg() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 7.5 6.5 7.5 11.5C7.5 13.163 8.163 14.674 9.25 15.75C9.163 15.163 9.25 14.5 9.5 14C10.5 15 11 16.5 11 17.5C11 19.433 12.343 21 14 21C12.667 19.5 12.5 17.5 13.5 16C14 15.5 14.5 15 14.5 14C15.5 15 16 16.5 16 17.5C17.5 16 18.5 13.5 16.5 11C17.5 11 18.5 11.5 19 12C19 7 15 3.5 12 2Z" fill="#EF4444" opacity=".9" />
      <path d="M12 14C12 14 10.5 15.5 10.5 17C10.5 18.381 11.119 19 12 19.5C12.881 19 13.5 18.381 13.5 17C13.5 15.5 12 14 12 14Z" fill="#EF4444" opacity=".6" />
    </svg>
  );
}
function BreakIcon() { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /><line x1="4" y1="4" x2="20" y2="20" stroke="#B91C1C" strokeWidth="2" /></svg>; }
function AloneIcon() { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7" /><path d="M17 17l4 4M21 17l-4 4" stroke="#B91C1C" strokeWidth="2" /></svg>; }
function ResetIcon() { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><line x1="12" y1="8" x2="12" y2="12" stroke="#B91C1C" strokeWidth="2.2" /><circle cx="12" cy="15" r="1" fill="#EF4444" /></svg>; }
function DrainIcon() { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" strokeWidth="2.5" /><path d="M5 11h3l-2 4h4" stroke="#B91C1C" strokeWidth="1.8" /></svg>; }
function TargetIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" fill="#EF4444" /></svg>; }
function ChatIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="13" y2="14" /></svg>; }
function ChartIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></svg>; }
function CalIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h2v2H8z" fill="#EF4444" stroke="none" /></svg>; }
function RefreshIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>; }
function AppleIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5F5F5"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>; }
function PlayIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3.18 23.76c.3.17.64.24.99.19L15.34 12 11.5 8.16 3.18 23.76z" fill="#EA4335" /><path d="M20.52 10.61l-2.5-1.44-3.33 3.33 3.33 3.34 2.53-1.46c.72-.41.72-1.44-.03-1.77z" fill="#FBBC04" /><path d="M3.18.24C2.85.46 2.62.85 2.62 1.35v21.3c0 .5.23.89.56 1.11l.13.07 11.94-11.94v-.28L3.31.17l-.13.07z" fill="#4285F4" /><path d="M15.34 12l3.68-3.68-2.53-1.46C15.7 6.44 14.9 6.6 14.5 7L11.5 8.16 15.34 12z" fill="#34A853" /></svg>; }

/* ── APP ─────────────────────────────────────────────────────────── */
export default function AccountaFit() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ background: "var(--black)", minHeight: "100vh" }}>
        <Nav onCTA={() => setModal(true)} />
        <Hero onCTA={() => setModal(true)} />
        <Problem />
        <WhatItIs />
        <HowItWorks />
        <WhyDifferent />
        <Features />
        <Stats />
        <Testimonials />
        <FAQ />
        <FinalCTA onCTA={() => setModal(true)} />
        <Footer />
        {modal && <Modal onClose={() => setModal(false)} />}
      </div>
    </>
  );
}
