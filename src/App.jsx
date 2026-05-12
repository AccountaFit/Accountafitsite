import { useState, useEffect, useRef } from "react";

const LANGS = {
  en: { name: "English", flag: "🇺🇸" }, fr: { name: "Français", flag: "🇫🇷" },
  es: { name: "Español", flag: "🇪🇸" }, de: { name: "Deutsch", flag: "🇩🇪" },
  pt: { name: "Português", flag: "🇧🇷" }, it: { name: "Italiano", flag: "🇮🇹" },
  ja: { name: "日本語", flag: "🇯🇵" }, zh: { name: "中文", flag: "🇨🇳" },
  ko: { name: "한국어", flag: "🇰🇷" }, hi: { name: "हिन्दी", flag: "🇮🇳" },
  sv: { name: "Svenska", flag: "🇸🇪" }, nl: { name: "Nederlands", flag: "🇳🇱" },
};

const T = {
  en: {
    nav: ["How It Works", "Features", "FAQ"],
    joinWaitlist: "Join Waitlist",
    eyebrow: "STRONGER TOGETHER. ACCOUNTABLE ALWAYS.",
    heroH1: ["STOP", "STARTING", "OVER."],
    heroSub: "Most people don't fail fitness because they're lazy. They fail because they do it alone. AccountaFit matches you with a real partner who keeps you accountable — every day.",
    heroCTA: "Join the Waitlist",
    stat1v: "3×", stat1l: "More likely to hit goals",
    stat2v: "48H", stat2l: "Average match time",
    stat3v: "94%", stat3l: "Report stronger consistency",
    problemEyebrow: "THE REAL PROBLEM",
    problemH: "You don't need more motivation.",
    problemBody: "You've downloaded the apps. You've started the routines. You've told yourself \"this time is different.\" And somehow… it always resets. Not because you're incapable. Because you're doing it alone.",
    solutionEyebrow: "THE FIX",
    solutionH: "Fitness doesn't fail. Systems do.",
    solutionBody: "AccountaFit fixes the real problem: accountability. We pair you with someone who has similar goals, schedules, and drive — so showing up isn't optional anymore.",
    howEyebrow: "HOW IT WORKS",
    howH: "Four steps. One system. No more restarting.",
    steps: [
      { n: "01", title: "Get Matched", body: "Tell us your goals, schedule, and commitment level. We find your perfect accountability partner in 48 hours." },
      { n: "02", title: "Check In Daily", body: "A 60-second daily check-in keeps both of you locked in. Miss one and the streak breaks — for both of you." },
      { n: "03", title: "Build Your Streak", body: "Streaks are shared. The longer they get, the harder they are to break. That's the design." },
      { n: "04", title: "Get Results", body: "Consistency compounds. When someone is counting on you every single day, results are inevitable." },
    ],
    featEyebrow: "FEATURES",
    featH: "Built different. Because the problem is different.",
    features: [
      { icon: "match", title: "Smart Matching", body: "Paired by goals, schedule, and intensity — not randomly. Your match is your mirror." },
      { icon: "streak", title: "Streak Tracking", body: "Shared streaks between partners. Both check in or both lose it. Social pressure that actually works." },
      { icon: "chat", title: "Accountability Chat", body: "Direct line to your partner. No feed. No noise. Just the two of you, every day." },
      { icon: "ai", title: "AI Workout Generator", body: "Personalized plans built around your goals, level, and available time. No guesswork." },
      { icon: "meal", title: "Daily Meal Guidance", body: "A new meal every day tailored to your fitness goals. High-protein, low-carb, vegan — your choice." },
      { icon: "progress", title: "Real-Time Progress", body: "See your partner's activity in real time. When they're online, you know. When they skip, you know." },
    ],
    loopEyebrow: "THE SYSTEM",
    loopH: "The loop that changes everything.",
    loopItems: ["Match", "Show Up", "Check In", "Build Streak", "Get Results", "Repeat"],
    proofEyebrow: "EARLY FEEDBACK",
    proofH: "They stopped starting over.",
    testimonials: [
      { q: "I've tried every app. The difference with AccountaFit is someone is actually waiting on my check-in. That changes everything.", name: "Marcus T.", role: "Beta tester · -28 lbs", ini: "MT" },
      { q: "Eleven weeks. Me and my partner haven't missed one check-in. That streak starts to feel like part of your identity.", name: "Priya S.", role: "Beta tester · Marathon finisher", ini: "PS" },
      { q: "I stopped trying to stay motivated. I just made sure my partner knew I was showing up. That's the whole system.", name: "Devon K.", role: "Early access · +15 lbs muscle", ini: "DK" },
      { q: "I didn't need a trainer. I needed someone who would notice if I went quiet. AccountaFit gave me exactly that.", name: "Aaliyah W.", role: "Beta tester · Goal weight reached", ini: "AW" },
    ],
    pricingEyebrow: "PRICING",
    pricingH: "Free to start. Built to scale.",
    freeFeatures: ["Partner matching", "Daily check-ins", "Shared streaks", "Basic chat", "AI workout (3/week)"],
    proFeatures: ["Everything in Free", "Unlimited AI workouts", "Daily meal plans", "Priority matching", "Advanced analytics", "Smart Rematch"],
    faqEyebrow: "FAQ",
    faqH: "Real questions.",
    faqs: [
      { q: "Is this a dating app?", a: "No. Matching is 100% based on fitness goals and schedule. This is accountability, not socializing." },
      { q: "What if my partner ghosts me?", a: "Smart Rematch detects disengagement early and finds you a better fit before your momentum breaks." },
      { q: "How long does matching take?", a: "Most people are matched within 48 hours. We prioritize fit over speed." },
      { q: "Is it really free?", a: "Yes. Core features are free forever. Pro upgrades are available for power users." },
      { q: "How much time does it take daily?", a: "About 60 seconds for a check-in. Consistency over complexity." },
    ],
    ctaEyebrow: "YOUR MOVE",
    ctaH1: "Your next restart",
    ctaH2: "doesn't have to happen.",
    ctaSub: "Find someone who won't let you quit.",
    ctaBtn: "Join the Waitlist",
    ctaNote: "Free to join. No credit card required.",
    emailPH: "Enter your email",
  },
};

const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { background: #0D1526; color: #F6F8FB; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; line-height: 1.6; }
a { color: inherit; text-decoration: none; }
::selection { background: rgba(255,77,87,.25); color: #fff; }

:root {
  --navy: #0D1526;
  --navy2: #111D33;
  --navy3: #162040;
  --coral: #FF4D57;
  --coral2: #FF6B74;
  --frost: #F6F8FB;
  --gray: #B7C1D3;
  --gray2: #8A97AD;
  --glass-bg: rgba(255,255,255,.06);
  --glass-border: rgba(255,255,255,.10);
  --glass-border-strong: rgba(255,255,255,.18);
  --section-light: #F0F4FA;
  --section-light2: #E8EDF7;
  --navy-light-text: #1A2540;
  --navy-light-sub: #4A5568;
}

.bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: .04em; }
.mono { font-family: 'JetBrains Mono', monospace; }
.eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .68rem; letter-spacing: .24em; text-transform: uppercase; color: var(--coral); display: block; margin-bottom: 16px; }

@keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes glowPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes afDot { 0%,100%{background:rgba(255,255,255,.2)} 50%{background:#FF4D57} }

.glass { background: var(--glass-bg); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid var(--glass-border); border-radius: 20px; }
.glass-strong { background: rgba(255,255,255,.09); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); border: 1px solid var(--glass-border-strong); border-radius: 20px; }
.glass-card { background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: 16px; transition: all .3s ease; position: relative; overflow: hidden; }
.glass-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent); }
.glass-card:hover { background: rgba(255,255,255,.1); border-color: rgba(255,77,87,.35); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,.4), 0 0 30px rgba(255,77,87,.08); }

.light-card { background: #fff; border: 1px solid rgba(0,0,0,.07); border-radius: 16px; transition: all .3s ease; position: relative; overflow: hidden; box-shadow: 0 4px 24px rgba(13,21,38,.06); }
.light-card:hover { border-color: rgba(255,77,87,.25); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(13,21,38,.12); }

.btn-coral { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: linear-gradient(135deg, #FF4D57, #FF2D3A); color: #fff; font-family: 'JetBrains Mono', monospace; font-size: .8rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; padding: 16px 36px; border: none; border-radius: 100px; cursor: pointer; transition: all .25s ease; box-shadow: 0 8px 32px rgba(255,77,87,.35), inset 0 1px 0 rgba(255,255,255,.2); }
.btn-coral:hover { background: linear-gradient(135deg, #FF6B74, #FF4D57); transform: translateY(-2px); box-shadow: 0 14px 48px rgba(255,77,87,.45); }

.btn-ghost-dark { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: transparent; color: var(--frost); font-family: 'JetBrains Mono', monospace; font-size: .8rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; padding: 15px 36px; border: 1px solid var(--glass-border-strong); border-radius: 100px; cursor: pointer; transition: all .25s ease; }
.btn-ghost-dark:hover { border-color: var(--coral); color: var(--coral); transform: translateY(-2px); }

.nav-link { color: var(--gray); font-size: .88rem; font-weight: 400; transition: color .2s; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; }
.nav-link:hover { color: var(--frost); }

.sec { padding: 100px 0; position: relative; overflow: hidden; }
.sec-light { background: var(--section-light); }
.sec-light2 { background: var(--section-light2); }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 5%; }

.noise { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: .025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 128px; }
.glow-coral { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255,77,87,.18) 0%, transparent 70%); pointer-events: none; }
.glow-blue { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(99,143,255,.1) 0%, transparent 70%); pointer-events: none; }

.marquee-track { display: flex; width: max-content; animation: marquee 20s linear infinite; }
.marquee-item { display: flex; align-items: center; gap: 28px; padding: 0 36px; font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: .06em; white-space: nowrap; color: rgba(182,193,211,.15); border-right: 1px solid rgba(255,255,255,.06); }
.marquee-item.hi { color: #FF4D57; }

.phone-wrap { width: 220px; border-radius: 40px; border: 1.5px solid rgba(255,255,255,.15); background: rgba(13,21,38,.85); backdrop-filter: blur(40px); overflow: hidden; position: relative; box-shadow: 0 40px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,.12); }
.phone-notch { width: 72px; height: 22px; background: rgba(13,21,38,.95); border-radius: 0 0 14px 14px; margin: 0 auto; border: 1px solid rgba(255,255,255,.08); border-top: none; }

.af-chat-btn { position:fixed; bottom:28px; right:28px; z-index:800; height:48px; border-radius:100px; cursor:pointer; background:rgba(255,77,87,.15); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,77,87,.3); display:flex; align-items:center; justify-content:center; gap:9px; box-shadow:0 4px 24px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1); transition:all .25s ease; padding:0 20px; white-space:nowrap; }
.af-chat-btn:hover { background:rgba(255,77,87,.28); border-color:rgba(255,77,87,.55); transform:translateY(-2px); }
.af-chat-btn.open { width:48px; height:48px; padding:0; border-radius:50%; }
.af-chat-win { position:fixed; bottom:88px; right:28px; z-index:800; width:350px; background:rgba(17,29,51,.96); border:1px solid rgba(255,255,255,.1); border-radius:20px; overflow:hidden; box-shadow:0 28px 72px rgba(0,0,0,.7); display:flex; flex-direction:column; animation:fadeIn .25s ease; max-height:520px; backdrop-filter:blur(40px); }
.af-chat-hd { background:rgba(255,255,255,.04); border-bottom:1px solid rgba(255,255,255,.08); padding:14px 16px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
.af-chat-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; scroll-behavior:smooth; }
.af-chat-msgs::-webkit-scrollbar { width:3px; }
.af-chat-msgs::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:2px; }
.af-chat-inp { border-top:1px solid rgba(255,255,255,.08); padding:12px 14px; background:rgba(255,255,255,.03); display:flex; gap:8px; align-items:center; flex-shrink:0; }
.af-msg-bot { display:flex; gap:8px; align-items:flex-start; }
.af-msg-user { display:flex; justify-content:flex-end; }
.af-bubble-bot { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.08); border-radius:12px 12px 12px 4px; padding:10px 13px; max-width:260px; font-size:13px; color:#F6F8FB; line-height:1.55; white-space:pre-line; }
.af-bubble-user { background:linear-gradient(135deg,#FF4D57,#FF2D3A); border-radius:12px 12px 4px 12px; padding:10px 13px; max-width:240px; font-size:13px; color:#fff; line-height:1.55; }
.af-av { width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,#FF4D57,#B91C1C); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; color:#fff; flex-shrink:0; font-family:'JetBrains Mono',monospace; }
.af-inp { flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:100px; color:#F6F8FB; font-family:'Plus Jakarta Sans',sans-serif; font-size:12.5px; padding:9px 14px; outline:none; transition:border-color .2s; }
.af-inp::placeholder { color:rgba(183,193,211,.4); }
.af-inp:focus { border-color:rgba(255,77,87,.5); }
.af-send { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,#FF4D57,#FF2D3A); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:opacity .2s; }
.af-send:hover { opacity:.85; }
.af-dot { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.3); animation:afDot .9s ease-in-out infinite; }
.af-dot:nth-child(2){animation-delay:.2s}
.af-dot:nth-child(3){animation-delay:.4s}

@media (max-width: 900px) {
  .hide-m { display: none !important; }
  .sec { padding: 72px 0; }
  .feat-grid { grid-template-columns: 1fr 1fr !important; }
  .proof-grid { grid-template-columns: 1fr !important; }
  .steps-grid { grid-template-columns: 1fr 1fr !important; }
  .pricing-grid { grid-template-columns: 1fr !important; }
  .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
  .solution-row { overflow-x: auto; justify-content: flex-start !important; }
}
@media (max-width: 600px) {
  .feat-grid { grid-template-columns: 1fr !important; }
  .steps-grid { grid-template-columns: 1fr !important; }
  .af-chat-win { width: calc(100vw - 32px); right: 16px; bottom: 80px; }
  .af-chat-btn { right: 16px; bottom: 16px; }
}
@media (min-width: 901px) { .hide-d { display: none !important; } }
`;

function AFMark({ size = 48 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 72L34 12L60 72" stroke="rgba(246,248,251,0.88)" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M18 52H50" stroke="rgba(246,248,251,0.88)" strokeWidth="7.5" strokeLinecap="round"/>
      <rect x="68" y="16" width="26" height="9" rx="4.5" fill="#FF4D57"/>
      <rect x="68" y="32" width="20" height="9" rx="4.5" fill="#FF4D57" opacity=".85"/>
    </svg>
  );
}

function Wordmark({ size = "1.5rem", dark = false }) {
  return (
    <span style={{ fontSize: size, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1, userSelect: "none" }}>
      <span style={{ color: dark ? "#1A2540" : "#F6F8FB" }}>Accounta</span>
      <span style={{ color: "#FF4D57" }}>Fit</span>
    </span>
  );
}

const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
const SYSTEM_PROMPT = `You are the AccountaFit AI assistant. Only answer questions about AccountaFit. Keep answers concise, warm, and direct — max 3 sentences.

AccountaFit is a fitness accountability platform matching users with real partners based on goals, schedule, and commitment level. Tagline: "Stop Starting Over." Features: Smart Matching, Shared Streaks, Accountability Chat, AI Workout Generator, Daily Meal Guidance, Real-Time Progress, Tinder-style matching with optional 5-min video call. Free tier available. Pro pricing coming soon. Contact: info@accountafit.com | @accountafitcorp on Instagram. Delaware corporation. Mobile apps coming soon.`;

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "bot", text: "Hey! I'm the AccountaFit AI. Ask me anything about the app, matching, pricing, or how it works. 💪" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);
  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [msgs, loading]);

  const send = async (override) => {
    const text = (override || input).trim();
    if (!text || loading) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      if (!GEMINI_KEY) throw new Error("no key");
      const history = msgs.map(m => ({ role: m.role === "bot" ? "model" : "user", parts: [{ text: m.text }] }));
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM_PROMPT }] }, contents: [...history, { role: "user", parts: [{ text }] }], generationConfig: { maxOutputTokens: 300, temperature: 0.7 } }),
      });
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const reply = raw.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim();
      setMsgs(m => [...m, { role: "bot", text: reply || "Something went wrong. Try again!" }]);
    } catch { setMsgs(m => [...m, { role: "bot", text: "Something went wrong. Reach us at info@accountafit.com." }]); }
    setLoading(false);
  };

  const QUICK = ["How does matching work?", "Is it free?", "What features does it have?"];
  return (
    <>
      {open && (
        <div className="af-chat-win">
          <div className="af-chat-hd">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="af-av" style={{ width: 34, height: 34, fontSize: 11 }}>AF</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#F6F8FB", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>AccountaFit AI</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: ".62rem", color: "#22c55e", letterSpacing: ".08em", fontFamily: "'JetBrains Mono',monospace" }}>ONLINE</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.35)", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, padding: 4 }}>✕</button>
          </div>
          <div className="af-chat-msgs" ref={msgsRef}>
            {msgs.map((m, i) => m.role === "bot"
              ? <div key={i} className="af-msg-bot"><div className="af-av">AF</div><div className="af-bubble-bot">{m.text}</div></div>
              : <div key={i} className="af-msg-user"><div className="af-bubble-user">{m.text}</div></div>
            )}
            {loading && <div className="af-msg-bot"><div className="af-av">AF</div><div style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "10px 16px", display: "flex", gap: 4 }}><div className="af-dot"/><div className="af-dot"/><div className="af-dot"/></div></div>}
          </div>
          {msgs.length === 1 && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {QUICK.map(q => <button key={q} onClick={() => send(q)} style={{ background: "rgba(255,77,87,.1)", border: "1px solid rgba(255,77,87,.25)", borderRadius: 100, color: "#FF6B74", fontSize: 11, padding: "5px 10px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{q}</button>)}
            </div>
          )}
          <div className="af-chat-inp">
            <input className="af-inp" type="text" placeholder="Ask anything about AccountaFit..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <button className="af-send" onClick={() => send()} disabled={loading}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
      <button className={`af-chat-btn${open ? " open" : ""}`} onClick={() => setOpen(o => !o)}>
        {open
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{ color: "rgba(255,255,255,.9)", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase" }}>Ask AI</span>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,.6)" }} />
          </>
        }
      </button>
    </>
  );
}

function PhoneGlass({ delay = "0s", offsetY = 0 }) {
  return (
    <div className="phone-wrap" style={{ animation: `float 5s ${delay} ease-in-out infinite`, transform: `translateY(${offsetY}px)` }}>
      <div className="phone-notch" />
      <div style={{ padding: "20px 16px 28px", minHeight: 340, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 150, height: 150, background: "radial-gradient(circle, rgba(255,77,87,.2) 0%, transparent 70%)", borderRadius: "50%", animation: "glowPulse 3s ease-in-out infinite" }} />
        <div style={{ width: 110, height: 110, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(20px)", boxShadow: "0 20px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.18)", position: "relative", zIndex: 2 }}>
          <AFMark size={52} />
        </div>
        <div style={{ marginTop: 18, position: "relative", zIndex: 2 }}><Wordmark size="1rem" /></div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,77,87,.12)", border: "1px solid rgba(255,77,87,.25)", borderRadius: 100, padding: "4px 12px", position: "relative", zIndex: 2 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".58rem", color: "#FF6B74", letterSpacing: ".1em" }}>COMING SOON</span>
        </div>
        <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, height: 60, backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      </div>
    </div>
  );
}

const ICONS = {
  match:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="3.2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a3.2 3.2 0 0 1 0 6.2"/></svg>,
  streak:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c2.8 3 4.5 5.6 4.5 8.2A4.5 4.5 0 0 1 12 14.7a4.5 4.5 0 0 1-4.5-4.5C7.5 7.6 9.2 5 12 2Z"/><path d="M7 15.5A5 5 0 0 0 12 21a5 5 0 0 0 5-5.5"/></svg>,
  chat:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  ai:       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>,
  meal:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  progress: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
};

function Nav({ lang, setLang, t, onCTA }) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: "0 5%", background: scrolled ? "rgba(13,21,38,.93)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "none", transition: "all .3s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AFMark size={28} />
          <Wordmark size="1.15rem" />
        </div>
        <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {t.nav.map((label, i) => {
            const hrefs = ["#how-it-works", "#features", "#faq"];
            return <a key={i} href={hrefs[i]} className="nav-link">{label}</a>;
          })}
          <button className="btn-coral" onClick={onCTA} style={{ padding: "10px 24px", fontSize: ".75rem" }}>{t.joinWaitlist}</button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#FF4D57", fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", letterSpacing: ".1em" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF4D57" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              {LANGS[lang]?.name}
            </button>
            {langOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, background: "rgba(13,21,38,.97)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "6px 0", minWidth: 150, zIndex: 999, boxShadow: "0 20px 48px rgba(0,0,0,.6)", backdropFilter: "blur(24px)" }}>
                {Object.entries(LANGS).map(([code, { name, flag }]) => (
                  <button key={code} onClick={() => { setLang(code); setLangOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", background: code === lang ? "rgba(255,77,87,.1)" : "none", border: "none", cursor: "pointer", padding: "8px 14px", color: code === lang ? "#FF4D57" : "#B7C1D3", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".85rem" }}>
                    <span>{flag}</span>{name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="hide-d" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", color: "#F6F8FB", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1, padding: 4 }}>{menuOpen ? "✕" : "☰"}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="hide-d" style={{ background: "rgba(13,21,38,.98)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,.07)", padding: "20px 5% 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {t.nav.map((label, i) => {
            const hrefs = ["#how-it-works", "#features", "#faq"];
            return <a key={i} href={hrefs[i]} onClick={() => setMenuOpen(false)} style={{ color: "#F6F8FB", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.1rem" }}>{label}</a>;
          })}
          <button className="btn-coral" onClick={() => { onCTA(); setMenuOpen(false); }} style={{ width: "100%" }}>{t.joinWaitlist}</button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
            {Object.entries(LANGS).map(([code, { name, flag }]) => (
              <button key={code} onClick={() => { setLang(code); setMenuOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, background: code === lang ? "rgba(255,77,87,.1)" : "rgba(255,255,255,.04)", border: `1px solid ${code === lang ? "rgba(255,77,87,.3)" : "rgba(255,255,255,.07)"}`, borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: code === lang ? "#FF4D57" : "#B7C1D3", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".82rem" }}>
                <span>{flag}</span>{name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ onCTA, t }) {
  return (
    <section style={{ background: "#0D1526", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
      <div className="noise" />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
      <div className="glow-coral" style={{ width: 700, height: 700, top: "-10%", right: "-5%", opacity: .55 }} />
      <div className="glow-blue" style={{ width: 500, height: 500, bottom: "-5%", left: "0%", opacity: .7 }} />

      <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        {/* Desktop */}
        <div className="hide-m" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", minHeight: "calc(100vh - 68px)", padding: "60px 0" }}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <span className="mono" style={{ fontSize: ".66rem", letterSpacing: ".22em", textTransform: "uppercase", color: "#FF4D57", border: "1px solid rgba(255,77,87,.22)", borderRadius: 4, padding: "6px 14px" }}>{t.eyebrow}</span>
            </div>
            <h1 className="bebas" style={{ fontSize: "clamp(5rem,10vw,9rem)", lineHeight: .86, color: "#F6F8FB", marginBottom: 28, letterSpacing: ".04em" }}>
              {t.heroH1[0]}<br/>
              <span style={{ color: "#FF4D57" }}>{t.heroH1[1]}</span><br/>
              {t.heroH1[2]}
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#B7C1D3", lineHeight: 1.82, maxWidth: 460, marginBottom: 40 }}>{t.heroSub}</p>
            <div style={{ display: "flex", gap: 14 }}>
              <button className="btn-coral" onClick={onCTA}>{t.heroCTA} →</button>
            </div>
            <div style={{ display: "flex", gap: 0, marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.07)" }}>
              {[[t.stat1v, t.stat1l], [t.stat2v, t.stat2l], [t.stat3v, t.stat3l]].map(([v, l], i) => (
                <div key={v} style={{ flex: 1, paddingRight: i < 2 ? 24 : 0, borderRight: i < 2 ? "1px solid rgba(255,255,255,.07)" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
                  <div className="bebas" style={{ fontSize: "2.2rem", color: "#FF4D57", letterSpacing: ".04em", lineHeight: 1 }}>{v}</div>
                  <div className="mono" style={{ fontSize: ".6rem", color: "#8A97AD", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 6, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", transform: "translateY(24px)" }}>
              <PhoneGlass delay="0s" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", transform: "translateY(-24px)" }}>
              <PhoneGlass delay="1.5s" />
              <PhoneGlass delay="3s" />
            </div>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(255,77,87,.06) 0%, transparent 65%)", pointerEvents: "none" }} />
          </div>
        </div>

        {/* Mobile */}
        <div className="hide-d" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 0 56px", minHeight: "calc(100vh - 68px)" }}>
          <div style={{ marginBottom: 20 }}>
            <span className="mono" style={{ fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#FF4D57", border: "1px solid rgba(255,77,87,.22)", borderRadius: 4, padding: "5px 10px" }}>{t.eyebrow}</span>
          </div>
          <h1 className="bebas" style={{ fontSize: "clamp(4rem,18vw,6rem)", lineHeight: .86, color: "#F6F8FB", marginBottom: 24, letterSpacing: ".04em" }}>
            {t.heroH1[0]}<br/>
            <span style={{ color: "#FF4D57" }}>{t.heroH1[1]}</span><br/>
            {t.heroH1[2]}
          </h1>
          <p style={{ fontSize: "1rem", color: "#B7C1D3", lineHeight: 1.78, marginBottom: 32 }}>{t.heroSub}</p>
          <button className="btn-coral" onClick={onCTA} style={{ width: "100%", marginBottom: 36, padding: "16px 0" }}>{t.heroCTA} →</button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            {[[t.stat1v, t.stat1l], [t.stat2v, t.stat2l], [t.stat3v, t.stat3l]].map(([v, l], i) => (
              <div key={v} style={{ paddingRight: i < 2 ? 12 : 0, borderRight: i < 2 ? "1px solid rgba(255,255,255,.07)" : "none", paddingLeft: i > 0 ? 12 : 0 }}>
                <div className="bebas" style={{ fontSize: "1.8rem", color: "#FF4D57", letterSpacing: ".04em" }}>{v}</div>
                <div className="mono" style={{ fontSize: ".5rem", color: "#8A97AD", letterSpacing: ".07em", textTransform: "uppercase", lineHeight: 1.4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, #0D1526)", zIndex: 3, pointerEvents: "none" }} />
    </section>
  );
}

function Problem({ t }) {
  const items = ["Downloaded the apps", "Started the routines", "Bought the gear", "Told yourself 'this time'", "Back to day one. Again."];
  return (
    <section className="sec sec-light">
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.07)", borderRadius: 20, padding: 32, boxShadow: "0 8px 40px rgba(13,21,38,.08)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #FF4D57, transparent)" }} />
              <div className="mono" style={{ fontSize: ".62rem", letterSpacing: ".18em", color: "#FF4D57", marginBottom: 20 }}>THE PATTERN</div>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < 4 ? "1px solid rgba(0,0,0,.05)" : "none" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid rgba(0,0,0,.1)", background: i === 4 ? "rgba(255,77,87,.08)" : "#F8F9FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {i < 4
                      ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#B0BAC9" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF4D57" }} />}
                  </div>
                  <span style={{ fontSize: ".9rem", color: i === 4 ? "#FF4D57" : "#8A97AD", textDecoration: i < 4 ? "line-through" : "none", textDecorationColor: "rgba(0,0,0,.15)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow" style={{ color: "#FF4D57" }}>{t.problemEyebrow}</span>
            <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", lineHeight: .92, color: "#1A2540", marginBottom: 24 }}>{t.problemH}</h2>
            <p style={{ fontSize: "1rem", color: "#4A5568", lineHeight: 1.85, marginBottom: 32 }}>{t.problemBody}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 2, background: "#FF4D57" }} />
              <span className="mono" style={{ fontSize: ".65rem", color: "#FF4D57", letterSpacing: ".14em", textTransform: "uppercase" }}>The pattern is the problem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Solution({ t }) {
  return (
    <section className="sec" style={{ background: "#0D1526", position: "relative", overflow: "hidden" }}>
      <div className="noise" />
      <div className="glow-coral" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: .35 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <span className="eyebrow" style={{ display: "block" }}>{t.solutionEyebrow}</span>
        <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: .92, color: "#F6F8FB", maxWidth: 680, margin: "0 auto 24px" }}>{t.solutionH}</h2>
        <p style={{ fontSize: "1.05rem", color: "#B7C1D3", lineHeight: 1.82, maxWidth: 520, margin: "0 auto 56px" }}>{t.solutionBody}</p>
        <div className="solution-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {["ALONE", "→", "STRUGGLING", "→", "RESTART"].map((item, i) => (
            <div key={i} style={{ padding: i % 2 === 0 ? "12px 20px" : "0 4px", background: i % 2 === 0 ? "rgba(255,255,255,.04)" : "transparent", border: i % 2 === 0 ? "1px solid rgba(255,255,255,.08)" : "none", borderRadius: 6, flexShrink: 0 }}>
              <span className="mono" style={{ fontSize: i % 2 === 1 ? "1.1rem" : ".68rem", color: i % 2 === 1 ? "rgba(255,255,255,.2)" : "#8A97AD", letterSpacing: ".1em" }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(255,77,87,.4), rgba(255,77,87,.1))" }} />
        </div>
        <div className="solution-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {["MATCHED", "→", "ACCOUNTABLE", "→", "CONSISTENT"].map((item, i) => (
            <div key={i} style={{ padding: i % 2 === 0 ? "12px 20px" : "0 4px", background: i % 2 === 0 ? "rgba(255,77,87,.1)" : "transparent", border: i % 2 === 0 ? "1px solid rgba(255,77,87,.25)" : "none", borderRadius: 6, flexShrink: 0 }}>
              <span className="mono" style={{ fontSize: i % 2 === 1 ? "1.1rem" : ".68rem", color: i % 2 === 1 ? "rgba(255,255,255,.22)" : "#FF6B74", letterSpacing: ".1em" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIsIt({ onCTA }) {
  const steps = [
    { n: "01", icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF4D57" strokeWidth="1.6" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title: "Build Your Profile", body: "Set your fitness goals, upload photos, define your schedule and commitment level. Tell us what you're working toward and how hard you're willing to push." },
    { n: "02", icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF4D57" strokeWidth="1.6" strokeLinecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>, title: "Set Your Preferences", body: "Choose your training style, intensity level, and what you need from a partner. Someone to push you? Someone to match your pace? You decide." },
    { n: "03", icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF4D57" strokeWidth="1.6" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, title: "Get Matched", body: "Think Tinder, but for fitness accountability. Swipe through profiles, connect with someone who has the same fire — and make a commitment that neither of you will break." },
  ];
  return (
    <section className="sec" style={{ background: "#0D1526" }}>
      <div className="noise" />
      <div className="glow-coral" style={{ width: 500, height: 400, bottom: 0, left: "50%", transform: "translateX(-50%)", opacity: .22 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="mono" style={{ fontSize: ".68rem", letterSpacing: ".22em", textTransform: "uppercase", color: "#FF4D57", border: "1px solid rgba(255,77,87,.22)", borderRadius: 4, padding: "6px 14px", display: "inline-block", marginBottom: 24 }}>INTRODUCING ACCOUNTAFIT</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: .9, color: "#F6F8FB", maxWidth: 780, margin: "0 auto 24px" }}>
            The World's First<br /><span style={{ color: "#FF4D57" }}>Fitness Accountability</span><br />Matching Platform
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#B7C1D3", lineHeight: 1.82, maxWidth: 560, margin: "0 auto" }}>
            We didn't build another workout tracker. We built something the fitness world has never seen — a partner-matching system designed around the one thing that determines whether you succeed: <em style={{ color: "#F6F8FB" }}>who's with you.</em>
          </p>
        </div>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, marginBottom: 64 }}>
          {steps.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: "40px 32px", borderRadius: i === 0 ? "16px 4px 4px 16px" : i === 2 ? "4px 16px 16px 4px" : "4px" }}>
              <div className="bebas" style={{ fontSize: "4rem", color: "rgba(255,77,87,.08)", lineHeight: 1, marginBottom: 16 }}>{s.n}</div>
              <div style={{ marginBottom: 18 }}>{s.icon}</div>
              <h3 className="bebas" style={{ fontSize: "1.5rem", color: "#F6F8FB", marginBottom: 12, letterSpacing: ".04em" }}>{s.title}</h3>
              <p style={{ fontSize: ".88rem", color: "#B7C1D3", lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="glass" style={{ padding: "36px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,77,87,.4), transparent)" }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF4D57", animation: "glowPulse 2s ease-in-out infinite" }} />
              <span className="mono" style={{ fontSize: ".65rem", color: "#FF4D57", letterSpacing: ".18em" }}>MORE FEATURES COMING SOON</span>
            </div>
            <h3 className="bebas" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#F6F8FB", letterSpacing: ".04em", marginBottom: 8 }}>We're just getting started.</h3>
            <p style={{ fontSize: ".9rem", color: "#B7C1D3", maxWidth: 460, lineHeight: 1.72 }}>Leaderboards. AI workout programs. Meal planning. Real-time partner updates. Video check-ins. Waitlist members get everything first.</p>
          </div>
          <button className="btn-coral" onClick={onCTA} style={{ flexShrink: 0 }}>Join the Waitlist →</button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ t }) {
  return (
    <section className="sec sec-light" id="how-it-works">
      <div className="wrap">
        <div style={{ marginBottom: 60 }}>
          <span className="eyebrow" style={{ color: "#FF4D57" }}>{t.howEyebrow}</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", lineHeight: .92, color: "#1A2540", maxWidth: 580 }}>{t.howH}</h2>
        </div>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 3 }}>
          {t.steps.map((s, i) => (
            <div key={i} className="light-card" style={{ padding: "36px 28px", borderRadius: i === 0 ? "16px 4px 4px 16px" : i === 3 ? "4px 16px 16px 4px" : "4px", cursor: "default" }}>
              <div className="bebas" style={{ fontSize: "4.5rem", color: "rgba(255,77,87,.09)", lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
              <div className="mono" style={{ fontSize: ".62rem", color: "#FF4D57", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>Step {s.n}</div>
              <h3 className="bebas" style={{ fontSize: "1.5rem", color: "#1A2540", marginBottom: 12, letterSpacing: ".04em" }}>{s.title}</h3>
              <p style={{ fontSize: ".88rem", color: "#4A5568", lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ t }) {
  return (
    <section className="sec" id="features" style={{ background: "#111D33" }}>
      <div className="noise" />
      <div className="glow-coral" style={{ width: 500, height: 500, top: 0, right: "-10%", opacity: .3 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow">{t.featEyebrow}</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", lineHeight: .92, color: "#F6F8FB" }}>{t.featH}</h2>
        </div>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
          {t.features.map(({ icon, title, body }, i) => (
            <div key={i} className="glass-card" style={{ padding: "36px 28px", borderRadius: i === 0 ? "16px 4px 4px 16px" : i === 2 ? "4px 16px 4px 4px" : i === 3 ? "4px 4px 4px 16px" : i === 5 ? "4px 4px 16px 4px" : "4px" }}>
              <div style={{ color: "#FF4D57", marginBottom: 20 }}>{ICONS[icon]}</div>
              <h3 className="bebas" style={{ fontSize: "1.4rem", color: "#F6F8FB", marginBottom: 12, letterSpacing: ".04em" }}>{title}</h3>
              <p style={{ fontSize: ".88rem", color: "#B7C1D3", lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddictionLoop({ t }) {
  return (
    <section style={{ background: "#0D1526", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span className="eyebrow" style={{ display: "block" }}>{t.loopEyebrow}</span>
        <h2 className="bebas" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#F6F8FB" }}>{t.loopH}</h2>
      </div>
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "28px 0" }}>
        <div className="marquee-track">
          {[...t.loopItems, ...t.loopItems].map((item, i) => (
            <div key={i} className={`marquee-item${["Build Streak", "Get Results"].includes(item) ? " hi" : ""}`}>
              <span>{item}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof({ t }) {
  return (
    <section className="sec sec-light2">
      <div className="wrap">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow" style={{ color: "#FF4D57" }}>{t.proofEyebrow}</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", lineHeight: .92, color: "#1A2540" }}>{t.proofH}</h2>
        </div>
        <div className="proof-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {t.testimonials.map(({ q, name, role, ini }, i) => (
            <div key={i} className="light-card" style={{ padding: "32px 28px" }}>
              <div className="bebas" style={{ fontSize: "3rem", color: "rgba(255,77,87,.14)", lineHeight: 1, marginBottom: 12 }}>"</div>
              <p style={{ fontSize: ".95rem", color: "#4A5568", lineHeight: 1.82, marginBottom: 24 }}>{q}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid rgba(0,0,0,.06)", paddingTop: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#FF4D57,rgba(255,77,87,.35))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{ini}</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1A2540", fontSize: ".9rem" }}>{name}</div>
                  <div className="mono" style={{ fontSize: ".6rem", color: "#FF4D57", letterSpacing: ".08em" }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ onCTA, t }) {
  return (
    <section className="sec" style={{ background: "#162040" }}>
      <div className="noise" />
      <div className="glow-coral" style={{ width: 500, height: 500, bottom: "-10%", left: "50%", transform: "translateX(-50%)", opacity: .28 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow" style={{ display: "block" }}>{t.pricingEyebrow}</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", color: "#F6F8FB" }}>{t.pricingH}</h2>
        </div>
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 820, margin: "0 auto" }}>
          <div className="glass" style={{ padding: "40px 36px" }}>
            <div className="mono" style={{ fontSize: ".65rem", letterSpacing: ".16em", color: "#8A97AD", textTransform: "uppercase", marginBottom: 10 }}>Free</div>
            <div className="bebas" style={{ fontSize: "3.5rem", color: "#F6F8FB", letterSpacing: ".04em", lineHeight: 1, marginBottom: 6 }}>$0</div>
            <div className="mono" style={{ fontSize: ".65rem", color: "#8A97AD", marginBottom: 28 }}>/ forever</div>
            {t.freeFeatures.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF4D57" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: ".88rem", color: "#B7C1D3" }}>{f}</span>
              </div>
            ))}
            <button className="btn-ghost-dark" onClick={onCTA} style={{ width: "100%", marginTop: 28 }}>Get Started</button>
          </div>
          <div className="glass-strong" style={{ padding: "40px 36px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #FF4D57, #FF6B74, #FF4D57)" }} />
            <div style={{ position: "absolute", top: 16, right: 16 }}>
              <span className="mono" style={{ fontSize: ".6rem", background: "#FF4D57", color: "#fff", padding: "4px 10px", borderRadius: 4, letterSpacing: ".1em" }}>POPULAR</span>
            </div>
            <div className="mono" style={{ fontSize: ".65rem", letterSpacing: ".16em", color: "#FF4D57", textTransform: "uppercase", marginBottom: 10 }}>Pro</div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,77,87,.1)", border: "1px solid rgba(255,77,87,.22)", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF4D57", animation: "glowPulse 2s ease-in-out infinite" }} />
                <span className="mono" style={{ fontSize: ".7rem", color: "#FF6B74", letterSpacing: ".12em" }}>PRICING COMING SOON</span>
              </div>
              <p className="mono" style={{ fontSize: ".6rem", color: "#8A97AD", letterSpacing: ".07em", marginTop: 8 }}>Join waitlist for early access pricing</p>
            </div>
            {t.proFeatures.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6B74" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: ".88rem", color: f.includes("Everything") ? "#FF6B74" : "#B7C1D3" }}>{f}</span>
              </div>
            ))}
            <button className="btn-coral" onClick={onCTA} style={{ width: "100%", marginTop: 28 }}>Get Early Access</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ({ t }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="sec sec-light" id="faq">
      <div className="wrap">
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="eyebrow" style={{ color: "#FF4D57" }}>{t.faqEyebrow}</span>
            <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.2rem)", lineHeight: .92, color: "#1A2540" }}>{t.faqH}</h2>
          </div>
          <div>
            {t.faqs.map(({ q, a }, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${open === i ? "rgba(255,77,87,.25)" : "rgba(0,0,0,.07)"}`, borderRadius: 10, overflow: "hidden", marginBottom: 6, transition: "all .2s", boxShadow: open === i ? "0 4px 20px rgba(255,77,87,.07)" : "none" }}>
                <button style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }} onClick={() => setOpen(open === i ? null : i)}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, color: "#1A2540", fontSize: ".95rem", flex: 1, textAlign: "left" }}>{q}</span>
                  <span style={{ color: "#FF4D57", fontSize: "1.3rem", lineHeight: 1, transition: "transform .25s", transform: open === i ? "rotate(45deg)" : "none", display: "inline-block", flexShrink: 0 }}>+</span>
                </button>
                {open === i && <div style={{ padding: "0 24px 20px", color: "#4A5568", lineHeight: 1.78, fontSize: ".9rem" }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onCTA, t }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("https://formspree.io/f/mnjwagoo", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, _subject: "New AccountaFit Waitlist Signup", message: `New waitlist signup: ${email}` }),
      });
    } catch {}
    setDone(true);
  };
  return (
    <section className="sec" style={{ background: "#0D1526", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div className="noise" />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
      <div className="glow-coral" style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: .35 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.13)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(20px)", boxShadow: "0 20px 40px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.14)" }}>
            <AFMark size={38} />
          </div>
        </div>
        <span className="eyebrow" style={{ display: "block" }}>{t.ctaEyebrow}</span>
        <h2 className="bebas" style={{ fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: .88, color: "#F6F8FB", marginBottom: 12 }}>
          {t.ctaH1}<br /><span style={{ color: "#FF4D57" }}>{t.ctaH2}</span>
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#B7C1D3", marginBottom: 48, fontStyle: "italic" }}>{t.ctaSub}</p>
        {done ? (
          <div className="glass" style={{ padding: "40px", maxWidth: 480, margin: "0 auto", borderRadius: 20 }}>
            <div className="bebas" style={{ fontSize: "2.5rem", color: "#F6F8FB", marginBottom: 8 }}>YOU'RE IN.</div>
            <p style={{ color: "#B7C1D3" }}>We'll reach out when it's your turn. Stay consistent until then.</p>
          </div>
        ) : (
          <>
            <form onSubmit={submit} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 520, margin: "0 auto 16px" }}>
              <input type="email" placeholder={t.emailPH} value={email} onChange={e => setEmail(e.target.value)} required
                style={{ flex: "1 1 260px", height: 52, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 100, color: "#F6F8FB", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".95rem", padding: "0 20px", outline: "none", transition: "border-color .2s" }}
                onFocus={e => e.target.style.borderColor = "rgba(255,77,87,.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"} />
              <button type="submit" className="btn-coral" style={{ height: 52, padding: "0 32px", borderRadius: 100 }}>{t.ctaBtn}</button>
            </form>
            <p className="mono" style={{ fontSize: ".62rem", color: "#8A97AD", letterSpacing: ".1em" }}>{t.ctaNote}</p>
          </>
        )}
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{ background: "#0A1020", borderTop: "1px solid rgba(255,255,255,.06)", padding: "52px 5% 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <AFMark size={32} />
              <Wordmark size="1.2rem" />
            </div>
            <p style={{ fontSize: ".88rem", color: "#8A97AD", lineHeight: 1.72, marginBottom: 20 }}>Consistency over motivation. Accountability over intention. Stop starting over.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { href: "https://x.com/accountafit", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="#8A97AD"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.633 5.905-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href: "https://instagram.com/accountafitcorp", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A97AD" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="#8A97AD" stroke="none"/></svg> },
                { href: "https://tiktok.com/@accountafit", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="#8A97AD"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.08-.1z"/></svg> },
              ].map(({ href, svg }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,77,87,.4)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"}>{svg}</a>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              {[
                { src: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg", alt: "App Store" },
                { src: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png", alt: "Google Play" },
              ].map(({ src, alt }) => (
                <div key={alt} style={{ position: "relative", width: 140, cursor: "not-allowed" }}>
                  <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block", filter: "blur(2px) grayscale(.5) brightness(.6)", opacity: .5 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,16,32,.5)", borderRadius: 7 }}>
                    <span className="mono" style={{ fontSize: ".56rem", letterSpacing: ".12em", color: "#8A97AD" }}>COMING SOON</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
            {[
              { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "How It Works", href: "#how-it-works" }, { label: "FAQ", href: "#faq" }] },
              { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "mailto:info@accountafit.com" }] },
              { title: "Legal", links: [{ label: "Terms of Service", href: "/terms" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Community Guidelines", href: "/guidelines" }, { label: "Safety Policy", href: "/safety" }] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="mono" style={{ fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.22)", marginBottom: 16 }}>{title}</div>
                {links.map(({ label, href }) => (
                  <a key={label} href={href} style={{ display: "block", color: "#8A97AD", fontSize: ".85rem", marginBottom: 10, transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#FF4D57"}
                    onMouseLeave={e => e.target.style.color = "#8A97AD"}>{label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)", marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p className="mono" style={{ fontSize: ".6rem", color: "rgba(255,255,255,.18)", letterSpacing: ".07em" }}>© 2026 ACCOUNTAFIT CORP. ALL RIGHTS RESERVED. INCORPORATED IN DELAWARE.</p>
          <p className="mono" style={{ fontSize: ".6rem", color: "rgba(255,255,255,.18)", letterSpacing: ".07em" }}>STRONGER TOGETHER. ACCOUNTABLE ALWAYS.</p>
        </div>
      </div>
    </footer>
  );
}

function Modal({ onClose, t }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("https://formspree.io/f/mnjwagoo", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, _subject: "New AccountaFit Waitlist Signup", message: `New waitlist signup: ${email}` }),
      });
    } catch {}
    setDone(true);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(9,14,28,.93)", backdropFilter: "blur(24px)" }} />
      <div className="glass-strong" style={{ position: "relative", padding: "48px 40px", maxWidth: 440, width: "100%", animation: "fadeUp .3s ease", borderRadius: 24 }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #FF4D57, #FF6B74, #FF4D57)", borderRadius: "24px 24px 0 0" }} />
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><AFMark size={48} /></div>
            <div className="bebas" style={{ fontSize: "2.5rem", color: "#F6F8FB", marginBottom: 8 }}>YOU'RE IN.</div>
            <p style={{ color: "#B7C1D3" }}>We'll reach out when it's your turn. Stay consistent.</p>
            <button className="btn-coral" onClick={onClose} style={{ marginTop: 24, width: "100%" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <AFMark size={32} />
              <Wordmark size="1.1rem" />
            </div>
            <span className="mono" style={{ fontSize: ".62rem", color: "#FF4D57", letterSpacing: ".2em", textTransform: "uppercase" }}>Early Access</span>
            <h3 className="bebas" style={{ fontSize: "2.8rem", color: "#F6F8FB", marginTop: 8, marginBottom: 12, lineHeight: .95 }}>JOIN THE<br /><span style={{ color: "#FF4D57" }}>WAITLIST</span></h3>
            <p style={{ fontSize: ".88rem", color: "#B7C1D3", marginBottom: 24, lineHeight: 1.72 }}>Priority matching and free access to all features at launch. No credit card required.</p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#F6F8FB", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".95rem", padding: "14px 16px", outline: "none", transition: "border-color .2s" }}
                onFocus={e => e.target.style.borderColor = "rgba(255,77,87,.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />
              <button type="submit" className="btn-coral" style={{ justifyContent: "center", padding: "14px 0" }}>Claim My Spot →</button>
            </form>
            <p className="mono" style={{ marginTop: 10, fontSize: ".6rem", color: "#8A97AD", textAlign: "center", letterSpacing: ".08em" }}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AccountaFit() {
  const [lang, setLang] = useState("en");
  const [modal, setModal] = useState(false);
  const t = T[lang] || T.en;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: G }} />
      <Nav lang={lang} setLang={setLang} t={t} onCTA={() => setModal(true)} />
      <Hero onCTA={() => setModal(true)} t={t} />
      <Problem t={t} />
      <Solution t={t} />
      <WhatIsIt onCTA={() => setModal(true)} />
      <HowItWorks t={t} />
      <Features t={t} />
      <AddictionLoop t={t} />
      <SocialProof t={t} />
      <Pricing onCTA={() => setModal(true)} t={t} />
      <FAQ t={t} />
      <FinalCTA onCTA={() => setModal(true)} t={t} />
      <Footer t={t} />
      {modal && <Modal onClose={() => setModal(false)} t={t} />}
      <Chatbot />
    </>
  );
}
