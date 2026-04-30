import { useState, useEffect, useRef } from "react";

/* ── LANGUAGE DATA ───────────────────────────────────────────── */
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
    heroEyebrow: "THE FITNESS ACCOUNTABILITY PLATFORM",
    heroH1a: "Stop",
    heroH1b: "Starting",
    heroH1c: "Over.",
    heroSub: "Most people don't fail fitness because they're lazy. They fail because they do it alone. AccountaFit matches you with a real partner who keeps you accountable — every day.",
    heroCTA1: "Join the Waitlist",
    heroCTA2: "Join the Waitlist",
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
    pricingFree: "Free",
    pricingPro: "Pro",
    pricingFreeDesc: "Everything you need to get started and build your first streak.",
    pricingProDesc: "For people serious about never starting over again.",
    freeFeatures: ["Partner matching", "Daily check-ins", "Shared streaks", "Basic chat", "AI workout (3/week)"],
    proFeatures: ["Everything in Free", "Unlimited AI workouts", "Daily meal plans", "Priority matching", "Advanced analytics", "Smart Rematch"],
    ctaEyebrow: "YOUR MOVE",
    ctaH1: "Your next restart",
    ctaH2: "doesn't have to happen.",
    ctaSub: "Find someone who won't let you quit.",
    ctaBtn: "Join the Waitlist",
    ctaNote: "Free to join. No credit card required.",
    faqEyebrow: "FAQ",
    faqH: "Real questions.",
    faqs: [
      { q: "Is this a dating app?", a: "No. Matching is 100% based on fitness goals and schedule. This is accountability, not socializing." },
      { q: "What if my partner ghosts me?", a: "Smart Rematch detects disengagement early and finds you a better fit before your momentum breaks." },
      { q: "How long does matching take?", a: "Most people are matched within 48 hours. We prioritize fit over speed." },
      { q: "Is it really free?", a: "Yes. Core features are free forever. Pro upgrades are available for power users." },
      { q: "How much time does it take daily?", a: "About 60 seconds for a check-in. Consistency over complexity." },
    ],
  },
};

/* ── GLOBAL CSS ──────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { background: #080808; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; line-height: 1.6; }
a { color: inherit; text-decoration: none; }
::selection { background: rgba(220,38,38,.35); color: #fff; }

:root {
  --red: #DC2626;
  --red-dim: #991B1B;
  --red-glow: rgba(220,38,38,.15);
  --red-hi: #EF4444;
  --surface: #0F0F0F;
  --surface2: #141414;
  --border: #1E1E1E;
  --border2: #2A2A2A;
  --gray: #A0A0A0;
  --gray2: #606060;
  --white: #F5F5F5;
}

/* ── Typography ── */
.bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: .04em; }
.mono { font-family: 'JetBrains Mono', monospace; }
.eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .72rem; letter-spacing: .22em; text-transform: uppercase; color: var(--red); display: block; margin-bottom: 16px; }

/* ── Animations ── */
@keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes streakGlow { 0%,100%{box-shadow:0 0 20px rgba(220,38,38,.3)} 50%{box-shadow:0 0 40px rgba(220,38,38,.6)} }
@keyframes slideIn { from{transform:translateX(-20px);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes scan { 0%{top:0} 100%{top:100%} }

.anim-fade-up { animation: fadeUp .8s ease both; }
.anim-fade-up-1 { animation: fadeUp .8s .1s ease both; }
.anim-fade-up-2 { animation: fadeUp .8s .2s ease both; }
.anim-fade-up-3 { animation: fadeUp .8s .3s ease both; }
.anim-fade-up-4 { animation: fadeUp .8s .4s ease both; }
.anim-fade-up-5 { animation: fadeUp .8s .5s ease both; }

/* ── Buttons ── */
.btn-red {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--red); color: #fff;
  font-family: 'JetBrains Mono', monospace; font-size: .82rem;
  font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  padding: 16px 36px; border: none; border-radius: 4px; cursor: pointer;
  transition: all .2s ease; position: relative; overflow: hidden;
}
.btn-red::before {
  content:''; position:absolute; inset:0;
  background: linear-gradient(135deg, rgba(255,255,255,.12) 0%, transparent 60%);
  opacity: 0; transition: opacity .2s;
}
.btn-red:hover { background: #EF4444; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(220,38,38,.4); }
.btn-red:hover::before { opacity: 1; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 10px;
  background: transparent; color: var(--white);
  font-family: 'JetBrains Mono', monospace; font-size: .82rem;
  font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  padding: 15px 36px; border: 1px solid var(--border2); border-radius: 4px; cursor: pointer;
  transition: all .2s ease;
}
.btn-ghost:hover { border-color: var(--red); color: var(--red-hi); transform: translateY(-2px); }

/* ── Cards ── */
.card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 8px; padding: 28px; transition: all .3s ease;
  position: relative; overflow: hidden;
}
.card::after {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, var(--red), transparent);
  opacity: 0; transition: opacity .3s;
}
.card:hover { border-color: rgba(220,38,38,.4); transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 40px rgba(220,38,38,.08); }
.card:hover::after { opacity: 1; }

/* ── Nav ── */
.nav-link { color: var(--gray); font-size: .9rem; font-weight: 400; transition: color .2s; cursor: pointer; }
.nav-link:hover { color: #fff; }

/* ── Noise texture ── */
.noise-bg {
  position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: .06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-size: 128px;
}

/* ── Grid line bg ── */
.grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(220,38,38,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Section ── */
.sec { padding: 100px 0; position: relative; overflow: hidden; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 5%; }

/* ── Loop marquee ── */
.marquee-track { display: flex; gap: 0; width: max-content; animation: marquee 18s linear infinite; }
.marquee-item {
  display: flex; align-items: center; gap: 32px; padding: 0 40px;
  font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; letter-spacing: .06em;
  white-space: nowrap; color: rgba(255,255,255,.12);
  border-right: 1px solid rgba(220,38,38,.15);
}
.marquee-item.active { color: var(--red); }

/* ── Phone mockup ── */
.phone-frame {
  width: 220px; border-radius: 36px;
  border: 2px solid #2A2A2A;
  background: #0A0A0A;
  overflow: hidden; position: relative;
  box-shadow: 0 40px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.05);
}
.phone-notch {
  width: 80px; height: 24px; background: #0A0A0A;
  border-radius: 0 0 16px 16px; margin: 0 auto;
  border: 1px solid #1A1A1A; border-top: none;
}

/* ── Streak badge ── */
.streak-badge {
  display: flex; align-items: center; gap: 6px;
  background: rgba(220,38,38,.12); border: 1px solid rgba(220,38,38,.3);
  border-radius: 100px; padding: 6px 14px;
  font-family: 'JetBrains Mono', monospace; font-size: .78rem; color: var(--red-hi);
  animation: streakGlow 2s ease-in-out infinite;
}

/* ── Mobile ── */
@media (max-width: 900px) {
  .hide-m { display: none !important; }
  .sec { padding: 60px 0; }
  .feat-grid { grid-template-columns: 1fr 1fr !important; }
  .proof-grid { grid-template-columns: 1fr !important; }
  .steps-grid { grid-template-columns: 1fr !important; }
  .pricing-grid { grid-template-columns: 1fr !important; }
  .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .wrap { padding: 0 6% !important; }
  /* Marquee smaller on mobile */
  .marquee-item { font-size: 1.4rem !important; padding: 0 20px !important; gap: 16px !important; }
}
@media (max-width: 600px) {
  .feat-grid { grid-template-columns: 1fr !important; }
  .pricing-grid { grid-template-columns: 1fr !important; }
}
@media (min-width: 901px) { .hide-d { display: none !important; } }

/* ── FAQ ── */
.faq-item { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; margin-bottom: 4px; transition: border-color .2s; }
.faq-item.open { border-color: rgba(220,38,38,.35); }
.faq-btn { width:100%; background:none; border:none; cursor:pointer; padding:20px 24px; display:flex; justify-content:space-between; align-items:center; gap:16px; }
.faq-q { font-family:'DM Sans',sans-serif; font-weight:600; color:#fff; font-size:1rem; flex:1; text-align:left; }
.faq-plus { color:var(--red); font-size:1.4rem; line-height:1; transition:transform .25s; flex-shrink:0; }
.faq-a { padding:0 24px 20px; color:var(--gray); line-height:1.78; font-size:.95rem; }

/* ── Chat bubble ── */
.chat-msg { display:flex; gap:8px; align-items:flex-end; margin-bottom:10px; }
.chat-msg.right { flex-direction:row-reverse; }
.chat-avatar { width:28px; height:28px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:.65rem; font-weight:700; font-family:'JetBrains Mono',monospace; }
.chat-bubble { max-width:180px; padding:10px 13px; border-radius:16px; font-size:.8rem; line-height:1.45; }
.chat-bubble.left { background:#1E1E1E; color:#E0E0E0; border-radius:4px 16px 16px 16px; }
.chat-bubble.right { background:var(--red); color:#fff; border-radius:16px 4px 16px 16px; }

/* ── AI card ── */
.ai-tag { display:inline-flex; align-items:center; gap:6px; background:rgba(220,38,38,.1); border:1px solid rgba(220,38,38,.25); border-radius:4px; padding:4px 10px; font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.1em; color:var(--red-hi); margin-bottom:12px; }

/* ── Chatbot ── */
.af-chat-btn {
  position:fixed; bottom:28px; right:28px; z-index:800;
  height:48px; border-radius:100px; cursor:pointer;
  background:rgba(220,38,38,.18);
  backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(239,68,68,.35);
  display:flex; align-items:center; justify-content:center; gap:9px;
  box-shadow:0 4px 24px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.1);
  transition:all .25s ease; padding:0 20px; white-space:nowrap;
}
.af-chat-btn:hover { background:rgba(220,38,38,.32); border-color:rgba(239,68,68,.6); transform:translateY(-2px); box-shadow:0 10px 32px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.15); }
.af-chat-btn.open { width:48px; height:48px; padding:0; border-radius:50%; }
.af-chat-win { position:fixed; bottom:88px; right:28px; z-index:800; width:350px; background:#111; border:1px solid #2A2A2A; border-radius:16px; overflow:hidden; box-shadow:0 28px 72px rgba(0,0,0,.85); display:flex; flex-direction:column; animation:fadeIn .25s ease; max-height:520px; }
.af-chat-hd { background:#0D0D0D; border-bottom:1px solid #1E1E1E; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
.af-chat-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; scroll-behavior:smooth; }
.af-chat-msgs::-webkit-scrollbar { width:3px; } .af-chat-msgs::-webkit-scrollbar-thumb { background:#333; border-radius:2px; }
.af-chat-inp { border-top:1px solid #1E1E1E; padding:12px 14px; background:#0D0D0D; display:flex; gap:8px; align-items:center; flex-shrink:0; }
.af-msg-bot { display:flex; gap:8px; align-items:flex-start; } .af-msg-user { display:flex; justify-content:flex-end; }
.af-bubble-bot { background:#1A1A1A; border-radius:12px 12px 12px 4px; padding:10px 13px; max-width:260px; font-size:13px; color:#E0E0E0; line-height:1.55; white-space:pre-line; }
.af-bubble-user { background:var(--red); border-radius:12px 12px 4px 12px; padding:10px 13px; max-width:240px; font-size:13px; color:#fff; line-height:1.55; }
.af-av { width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,#B91C1C,#7f1d1d); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; color:#fff; flex-shrink:0; font-family:'JetBrains Mono',monospace; }
.af-inp { flex:1; background:#1A1A1A; border:1px solid #2A2A2A; border-radius:100px; color:#fff; font-family:'DM Sans',sans-serif; font-size:12.5px; padding:9px 14px; outline:none; transition:border-color .2s; }
.af-inp::placeholder { color:#555; } .af-inp:focus { border-color:rgba(220,38,38,.55); }
.af-send { width:34px; height:34px; border-radius:50%; background:var(--red); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .2s; }
.af-send:hover { background:#EF4444; }
.af-dot { width:6px; height:6px; border-radius:50%; background:#555; animation:afDot .9s ease-in-out infinite; }
.af-dot:nth-child(2){animation-delay:.2s} .af-dot:nth-child(3){animation-delay:.4s}
@keyframes afDot { 0%,100%{background:#444} 50%{background:#EF4444} }
@media(max-width:600px){ .af-chat-win{width:calc(100vw - 32px);right:16px;bottom:80px;} .af-chat-btn{right:16px;bottom:16px;} }
`;

/* ── GEMINI CHATBOT ──────────────────────────────────────────── */
const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
const SYSTEM_PROMPT = `You are the AccountaFit AI assistant. You ONLY answer questions about AccountaFit. If asked anything unrelated, politely redirect back to AccountaFit. Keep answers concise, friendly, bold and direct — max 3 sentences unless a list is genuinely needed.

WHAT IT IS: AccountaFit is a fitness accountability app with the tagline "Stop Starting Over." It pairs users with real accountability partners matched by goals, schedule, and commitment level. It is NOT a workout tracker, social feed, or dating app.

HOW IT WORKS: 1. Get Matched (48hrs) 2. Check In Daily (60 seconds) 3. Build Your Streak (shared with partner) 4. Get Results

KEY FEATURES: Smart Matching, Shared Streaks, Accountability Chat, AI Workout Generator, Daily Meal Guidance, Real-Time Progress, Leaderboard, Customizable Notifications, Social Sharing.

PRICING: Free tier (partner matching, check-ins, streaks, basic chat, 3 AI workouts/week). Pro tier (unlimited AI workouts, daily meal plans, priority matching, advanced analytics, Smart Rematch). Early access is FREE, no credit card required.

MATCHING: 48 hours. Based on fitness goals, schedule, commitment level, intensity. Not random. Tinder-style flow with optional 5-min video call.

CONTACT: info@accountafit.com | Instagram @accountafitcorp | X @accountafit | TikTok @accountafit

FAQ: Not a dating app. Smart Rematch handles ghosting. 60 sec/day. All levels welcome. Mobile apps coming soon (iOS & Android). Delaware corporation.`;

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "bot", text: "Hey! I'm the AccountaFit AI. Ask me anything about the app, matching, pricing, or how it works. 💪" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [msgs, loading]);

  const send = async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      if (!GEMINI_KEY) throw new Error("API key not configured");
      const history = msgs.filter(m => m.role !== "error").map(m => ({ role: m.role === "bot" ? "model" : "user", parts: [{ text: m.text }] }));
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM_PROMPT }] }, contents: [...history, { role: "user", parts: [{ text }] }], generationConfig: { maxOutputTokens: 300, temperature: 0.7 } }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const rawReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawReply) throw new Error("Empty response");
      const reply = rawReply.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/#+\s/g, '').trim();
      setMsgs(m => [...m, { role: "bot", text: reply }]);
    } catch { setMsgs(m => [...m, { role: "bot", text: "Something went wrong. Try again or reach us at info@accountafit.com." }]); }
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
                <div style={{ fontWeight: 600, fontSize: 13, color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>AccountaFit AI</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: ".65rem", color: "#22c55e", letterSpacing: ".08em", fontFamily: "'JetBrains Mono',monospace" }}>ONLINE</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1, padding: 4 }}>✕</button>
          </div>
          <div className="af-chat-msgs" ref={msgsRef}>
            {msgs.map((m, i) => m.role === "bot" ? (
              <div key={i} className="af-msg-bot"><div className="af-av">AF</div><div className="af-bubble-bot">{m.text}</div></div>
            ) : (
              <div key={i} className="af-msg-user"><div className="af-bubble-user">{m.text}</div></div>
            ))}
            {loading && <div className="af-msg-bot"><div className="af-av">AF</div><div style={{ background: "#1A1A1A", borderRadius: 12, padding: "10px 16px", display: "flex", gap: 4 }}><div className="af-dot" /><div className="af-dot" /><div className="af-dot" /></div></div>}
          </div>
          {msgs.length === 1 && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {QUICK.map(q => <button key={q} onClick={() => send(q)} style={{ background: "rgba(220,38,38,.12)", border: "1px solid rgba(220,38,38,.3)", borderRadius: 100, color: "#EF4444", fontSize: 11, padding: "5px 10px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{q}</button>)}
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
        {open ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> : <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span style={{ color: "rgba(255,255,255,.95)", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: ".82rem", letterSpacing: ".12em", textTransform: "uppercase" }}>Ask AI</span>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,.6)" }} />
        </>}
      </button>
    </>
  );
}

/* ── PHONE MOCKUP COMPONENTS ─────────────────────────────────── */
function StreakPhone() {
  return (
    <div className="phone-frame" style={{ width: 200, animation: "float 4s ease-in-out infinite" }}>
      <div className="phone-notch" />
      <div style={{ padding: "16px 14px 20px", background: "#080808" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", color: "#888", letterSpacing: ".1em" }}>ACCOUNTAFIT</span>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(220,38,38,.2)", border: "1px solid rgba(220,38,38,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626" }} />
          </div>
        </div>
        {/* Streak counter */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "4.5rem", lineHeight: 1, color: "#fff", letterSpacing: ".04em" }}>34</div>
          <div className="streak-badge" style={{ justifyContent: "center", margin: "8px auto 0", width: "fit-content" }}>
            <span>🔥</span><span>DAY STREAK</span>
          </div>
        </div>
        {/* Partner */}
        <div style={{ background: "#0F0F0F", borderRadius: 10, padding: "10px 12px", border: "1px solid #1E1E1E", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#DC2626,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>KL</div>
            <div>
              <div style={{ fontSize: ".72rem", color: "#fff", fontWeight: 600 }}>Keisha L.</div>
              <div style={{ fontSize: ".6rem", color: "#888" }}>Checked in 2m ago ✓</div>
            </div>
            <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          </div>
          <div style={{ height: 3, background: "#1A1A1A", borderRadius: 2 }}>
            <div style={{ width: "78%", height: "100%", background: "linear-gradient(90deg,#DC2626,#EF4444)", borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: ".58rem", color: "#888" }}>Compatibility</span>
            <span style={{ fontSize: ".58rem", color: "#EF4444", fontFamily: "'JetBrains Mono',monospace" }}>97%</span>
          </div>
        </div>
        {/* Check in button */}
        <div style={{ background: "#DC2626", borderRadius: 8, padding: "10px", textAlign: "center", cursor: "pointer" }}>
          <span style={{ fontSize: ".72rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, letterSpacing: ".1em", color: "#fff" }}>CHECK IN →</span>
        </div>
      </div>
    </div>
  );
}

function ChatPhone() {
  return (
    <div className="phone-frame" style={{ width: 200, animation: "float 4s 1.5s ease-in-out infinite" }}>
      <div className="phone-notch" />
      <div style={{ padding: "14px 12px 16px", background: "#080808" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 12, borderBottom: "1px solid #1A1A1A", marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#DC2626,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>MR</div>
          <div>
            <div style={{ fontSize: ".72rem", color: "#fff", fontWeight: 600 }}>Marcus R.</div>
            <div style={{ fontSize: ".6rem", color: "#22c55e" }}>● Online now</div>
          </div>
          <div className="streak-badge" style={{ marginLeft: "auto", padding: "3px 8px", fontSize: ".58rem" }}>🔥 21</div>
        </div>
        <div className="chat-msg" style={{ marginBottom: 8 }}>
          <div className="chat-avatar" style={{ background: "linear-gradient(135deg,#DC2626,#7f1d1d)", color: "#fff" }}>MR</div>
          <div className="chat-bubble left" style={{ fontSize: ".72rem" }}>Already hit my morning run. You up? 💪</div>
        </div>
        <div className="chat-msg right" style={{ marginBottom: 8 }}>
          <div className="chat-avatar" style={{ background: "#1E1E1E", color: "#C0C0C0" }}>ME</div>
          <div className="chat-bubble right" style={{ fontSize: ".72rem" }}>5am gym. Just checked in. Streak safe 🔥</div>
        </div>
        <div className="chat-msg" style={{ marginBottom: 12 }}>
          <div className="chat-avatar" style={{ background: "linear-gradient(135deg,#DC2626,#7f1d1d)", color: "#fff" }}>MR</div>
          <div className="chat-bubble left" style={{ fontSize: ".72rem" }}>Let's go! Day 21 🎯</div>
        </div>
        <div style={{ background: "#0F0F0F", borderRadius: 20, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: ".65rem", color: "#707070", flex: 1 }}>Reply...</span>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIPhone() {
  return (
    <div className="phone-frame" style={{ width: 200, animation: "float 4s 3s ease-in-out infinite" }}>
      <div className="phone-notch" />
      <div style={{ padding: "14px 12px 16px", background: "#080808" }}>
        <div className="ai-tag">⚡ AI WORKOUT</div>
        <div style={{ fontSize: ".78rem", fontWeight: 700, color: "#fff", marginBottom: 14 }}>Today's Plan</div>
        {[
          { name: "Deadlift", sets: "4×6", load: "85%" },
          { name: "Romanian DL", sets: "3×10", load: "70%" },
          { name: "Hip Thrust", sets: "3×12", load: "75%" },
          { name: "Leg Curl", sets: "3×12", load: "65%" },
        ].map((ex, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #0F0F0F" }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: i === 0 ? "rgba(220,38,38,.2)" : "#0F0F0F", border: `1px solid ${i === 0 ? "rgba(220,38,38,.4)" : "#1E1E1E"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#DC2626" : "#555" }} />
            </div>
            <span style={{ fontSize: ".7rem", color: i === 0 ? "#fff" : "#666", flex: 1 }}>{ex.name}</span>
            <span style={{ fontSize: ".65rem", fontFamily: "'JetBrains Mono',monospace", color: i === 0 ? "#EF4444" : "#707070" }}>{ex.sets}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, background: "rgba(220,38,38,.1)", borderRadius: 6, padding: "8px 10px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: ".62rem", color: "#DC2626", fontFamily: "'JetBrains Mono',monospace" }}>⚡ GENERATED FOR YOUR GOALS</span>
        </div>
      </div>
    </div>
  );
}

/* ── LOGO ────────────────────────────────────────────────────── */
function Logo({ size = "1.6rem" }) {
  return (
    <span className="bebas" style={{ fontSize: size, letterSpacing: ".04em", lineHeight: 1, userSelect: "none" }}>
      <span style={{ color: "#fff" }}>Accounta</span><span style={{ color: "#DC2626" }}>Fit</span>
    </span>
  );
}

/* ── NAV ─────────────────────────────────────────────────────── */
function Nav({ lang, setLang, t, onCTA }) {
  const dark = true;
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: "0 5%", background: dark ? "rgba(8,8,8,.85)" : "rgba(242,242,242,.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.08)"}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Logo />
        {/* Desktop */}
        <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {t.nav.map((label, i) => {
            const hrefs = ["#how-it-works", "#features", "#faq"];
            return <a key={i} href={hrefs[i]} className="nav-link" style={{ color: dark ? undefined : "#444" }}>{label}</a>;
          })}
          <button className="btn-red" onClick={onCTA} style={{ padding: "10px 24px", fontSize: ".78rem" }}>{t.joinWaitlist}</button>
          {/* Lang */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: ".72rem", letterSpacing: ".1em" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              {LANGS[lang]?.name}
            </button>
            {langOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 8, padding: "6px 0", minWidth: 150, zIndex: 999, boxShadow: "0 20px 48px rgba(0,0,0,.7)" }}>
                {Object.entries(LANGS).map(([code, { name, flag }]) => (
                  <button key={code} onClick={() => { setLang(code); setLangOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", background: code === lang ? "rgba(220,38,38,.1)" : "none", border: "none", cursor: "pointer", padding: "8px 14px", color: code === lang ? "#EF4444" : "rgba(255,255,255,.75)", fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem" }}>
                    <span>{flag}</span>{name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Mobile */}
        <div className="hide-d" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", color: dark ? "#fff" : "#0A0A0A", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1, padding: 4 }}>{menuOpen ? "✕" : "☰"}</button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="hide-d" style={{ background: dark ? "rgba(8,8,8,.98)" : "rgba(242,242,242,.98)", borderTop: `1px solid ${dark ? "#1A1A1A" : "#E0E0E0"}`, padding: "20px 5% 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {t.nav.map((label, i) => {
            const hrefs = ["#how-it-works", "#features", "#faq"];
            return <a key={i} href={hrefs[i]} onClick={() => setMenuOpen(false)} style={{ color: dark ? "#fff" : "#0A0A0A", fontFamily: "'DM Sans',sans-serif", fontSize: "1.1rem" }}>{label}</a>;
          })}
          <button className="btn-red" onClick={() => { onCTA(); setMenuOpen(false); }} style={{ textAlign: "center", justifyContent: "center" }}>{t.joinWaitlist}</button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {Object.entries(LANGS).map(([code, { name, flag }]) => (
              <button key={code} onClick={() => { setLang(code); setMenuOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, background: code === lang ? "rgba(220,38,38,.1)" : "rgba(255,255,255,.04)", border: `1px solid ${code === lang ? "rgba(220,38,38,.3)" : "rgba(255,255,255,.08)"}`, borderRadius: 6, padding: "8px 10px", cursor: "pointer", color: code === lang ? "#EF4444" : dark ? "rgba(255,255,255,.7)" : "#444", fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem" }}>
                <span>{flag}</span>{name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── HERO ────────────────────────────────────────────────────── */
function Hero({ onCTA, t }) {
  return (
    <section className="hero-section" style={{ background: "#080808", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 64 }}>
      <div className="noise-bg" />
      <div className="grid-bg" />
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(220,38,38,.18) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>

        {/* ── DESKTOP layout (two columns) ── */}
        <div className="hide-m" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "calc(100vh - 64px)", padding: "60px 0" }}>
          {/* Left */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <span className="mono" style={{ fontSize: ".72rem", letterSpacing: ".22em", textTransform: "uppercase", color: "#DC2626", border: "1px solid rgba(220,38,38,.25)", borderRadius: 3, padding: "6px 12px" }}>{t.heroEyebrow}</span>
            </div>
            <h1 className="bebas" style={{ fontSize: "clamp(4.5rem,9vw,8rem)", lineHeight: .88, color: "#fff", marginBottom: 28, letterSpacing: ".04em" }}>
              {t.heroH1a}<br />
              <span style={{ color: "#DC2626", WebkitTextStroke: "2px #DC2626" }}>{t.heroH1b}</span><br />
              {t.heroH1c}
            </h1>
            <p style={{ fontSize: "clamp(1rem,1.5vw,1.15rem)", color: "#C0C0C0", lineHeight: 1.75, maxWidth: 480, marginBottom: 40 }}>{t.heroSub}</p>
            <div style={{ display: "flex", gap: 14 }}>
              <button className="btn-red" onClick={onCTA}>{t.heroCTA2} →</button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.06)" }}>
              {[["3×", "More likely to hit goals"], ["48h", "Average match time"], ["94%", "Report stronger consistency"]].map(([v, l]) => (
                <div key={v}>
                  <div className="bebas" style={{ fontSize: "1.8rem", color: "#DC2626", letterSpacing: ".04em" }}>{v}</div>
                  <div className="mono" style={{ fontSize: ".62rem", color: "#909090", letterSpacing: ".1em", textTransform: "uppercase", lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — phones */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-end", transform: "translateY(20px)" }}>
              <StreakPhone />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", transform: "translateY(-20px)" }}>
              <ChatPhone />
              <AIPhone />
            </div>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(220,38,38,.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          </div>
        </div>

        {/* ── MOBILE layout — full width, bold, clean ── */}
        <div className="hide-d" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 0 52px", minHeight: "calc(100vh - 64px)" }}>
          {/* Eyebrow tag */}
          <div style={{ marginBottom: 18 }}>
            <span className="mono" style={{ fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#DC2626", border: "1px solid rgba(220,38,38,.3)", borderRadius: 3, padding: "5px 10px" }}>{t.heroEyebrow}</span>
          </div>
          {/* Big headline */}
          <h1 className="bebas" style={{ fontSize: "clamp(4.2rem,20vw,6.5rem)", lineHeight: .88, color: "#fff", marginBottom: 20, letterSpacing: ".04em" }}>
            {t.heroH1a}<br />
            <span style={{ color: "#DC2626" }}>{t.heroH1b}</span><br />
            {t.heroH1c}
          </h1>
          {/* Subheading */}
          <p style={{ fontSize: ".98rem", color: "#C0C0C0", lineHeight: 1.75, marginBottom: 28 }}>{t.heroSub}</p>
          {/* CTA */}
          <button className="btn-red" onClick={onCTA} style={{ width: "100%", justifyContent: "center", padding: "17px 0", fontSize: ".8rem", marginBottom: 32 }}>{t.heroCTA2} →</button>
          {/* Stats strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            {[["3×", "More likely to hit goals"], ["48H", "Avg match time"], ["94%", "Stronger consistency"]].map(([v, l]) => (
              <div key={v}>
                <div className="bebas" style={{ fontSize: "1.9rem", color: "#DC2626", letterSpacing: ".04em" }}>{v}</div>
                <div className="mono" style={{ fontSize: ".52rem", color: "#A0A0A0", letterSpacing: ".06em", textTransform: "uppercase", lineHeight: 1.4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, #080808)", zIndex: 3 }} />
    </section>
  );
}


/* ── WHAT IS ACCOUNTAFIT ─────────────────────────────────────── */
function WhatIsIt({ t, onCTA }) {
  const steps = [
    {
      n: "01",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      title: "Build Your Profile",
      body: "Set your fitness goals, upload photos, define your schedule and commitment level. Tell us what you're working toward and how hard you're willing to push."
    },
    {
      n: "02",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
      title: "Set Your Preferences",
      body: "Choose your training style, intensity level, and what you need from a partner. Someone to push you? Someone to match your pace? You decide."
    },
    {
      n: "03",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
      title: "Get Matched",
      body: "Think Tinder, but for fitness accountability. Swipe through profiles, connect with someone who has the same fire — and make a commitment that neither of you will break."
    },
  ];

  return (
    <section style={{ background: "#000", padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <div className="noise-bg" />
      {/* Red glow */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(220,38,38,.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        {/* Eyebrow + headline */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="mono" style={{ fontSize: ".72rem", letterSpacing: ".22em", textTransform: "uppercase", color: "#DC2626", border: "1px solid rgba(220,38,38,.25)", borderRadius: 3, padding: "6px 12px", display: "inline-block", marginBottom: 24 }}>INTRODUCING ACCOUNTAFIT</span>
          <h2 className="bebas" style={{ fontSize: "clamp(3rem,6vw,5.5rem)", lineHeight: .9, color: "#fff", maxWidth: 800, margin: "0 auto 24px" }}>
            The World's First<br /><span style={{ color: "#DC2626" }}>Fitness Accountability</span><br />Matching Platform
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#909090", lineHeight: 1.85, maxWidth: 580, margin: "0 auto" }}>
            We didn't build another workout tracker. We built something the fitness world has never seen — a partner-matching system designed around the one thing that actually determines whether you succeed: <span style={{ color: "#C0C0C0", fontStyle: "italic" }}>who's with you.</span>
          </p>
        </div>

        {/* 3-step cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginBottom: 80 }} className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", padding: "40px 32px", position: "relative", overflow: "hidden", transition: "border-color .3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(220,38,38,.4)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1A1A1A"}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: i === 0 ? "linear-gradient(90deg, #DC2626, transparent)" : "transparent" }} />
              <div className="bebas" style={{ fontSize: "4rem", color: "rgba(220,38,38,.06)", lineHeight: 1, marginBottom: 16, letterSpacing: ".04em" }}>{s.n}</div>
              <div style={{ marginBottom: 20 }}>{s.icon}</div>
              <h3 className="bebas" style={{ fontSize: "1.5rem", color: "#fff", marginBottom: 12, letterSpacing: ".04em" }}>{s.title}</h3>
              <p style={{ fontSize: ".88rem", color: "#909090", lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Coming soon banner */}
        <div style={{ border: "1px solid #1A1A1A", borderRadius: 8, padding: "28px 24px", background: "#080808", display: "flex", flexDirection: "column", gap: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(220,38,38,.4), transparent)" }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", animation: "pulse 2s ease-in-out infinite" }} />
              <span className="mono" style={{ fontSize: ".68rem", color: "#DC2626", letterSpacing: ".18em" }}>MORE FEATURES COMING SOON</span>
            </div>
            <h3 className="bebas" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#fff", letterSpacing: ".04em", marginBottom: 8 }}>We're just getting started.</h3>
            <p style={{ fontSize: ".9rem", color: "#888888", maxWidth: 480, lineHeight: 1.7 }}>
              Leaderboards. AI-powered workout programs. Meal planning. Real-time partner updates. Video check-ins. We're building the complete accountability ecosystem — and waitlist members get everything first.
            </p>
          </div>
          <button className="btn-red" onClick={onCTA} style={{ flexShrink: 0 }}>Join the Waitlist →</button>
        </div>
      </div>
    </section>
  );
}

/* ── PROBLEM ─────────────────────────────────────────────────── */
function Problem({ t }) {
  const dark = true;
  return (
    <section className="sec" style={{ background: dark ? "#050505" : "#EBEBEB" }}>
      <div className="noise-bg" style={{ opacity: .03 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="hero-grid">
          {/* Left — visual */}
          <div className="hide-m" style={{ position: "relative" }}>
            <div style={{ border: "1px solid rgba(220,38,38,.15)", borderRadius: 12, padding: 32, background: dark ? "rgba(220,38,38,.03)" : "rgba(220,38,38,.04)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(220,38,38,.5), transparent)" }} />
              {["Downloaded 6 apps", "Started 3 routines", "Joined 2 gyms", "Bought new gear", "Told yourself 'this time'"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < 4 ? `1px solid ${dark ? "#0F0F0F" : "#DDD"}` : "none", opacity: 1 - i * 0.08 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 4, border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <span style={{ color: dark ? "#888888" : "#888", fontSize: ".9rem", textDecoration: "line-through", textDecorationColor: dark ? "#555" : "#CCC" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: "16px", background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 8 }}>
                <span className="mono" style={{ fontSize: ".72rem", color: "#DC2626", letterSpacing: ".1em" }}>RESULT: BACK TO DAY ONE. AGAIN.</span>
              </div>
            </div>
          </div>
          {/* Right — copy */}
          <div>
            <span className="eyebrow">{t.problemEyebrow}</span>
            <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", lineHeight: .92, color: dark ? "#fff" : "#0A0A0A", marginBottom: 28 }}>{t.problemH}</h2>
            <p style={{ fontSize: "1.05rem", color: dark ? "#C0C0C0" : "#888", lineHeight: 1.85, marginBottom: 20 }} className="body-text">{t.problemBody}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32 }}>
              <div style={{ width: 36, height: 1, background: "#DC2626" }} />
              <span className="mono" style={{ fontSize: ".68rem", color: "#DC2626", letterSpacing: ".14em", textTransform: "uppercase" }}>The pattern is the problem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SOLUTION ────────────────────────────────────────────────── */
function Solution({ t }) {
  const dark = true;
  return (
    <section className="sec section-dark" style={{ background: "#0A0A0A", position: "relative", overflow: "hidden" }}>
      <div className="noise-bg" />
      {/* Red line accent */}
      <div style={{ position: "absolute", left: 0, top: "50%", width: "35%", height: 1, background: "linear-gradient(90deg, transparent, rgba(220,38,38,.5))", transform: "translateY(-50%)" }} />
      <div style={{ position: "absolute", right: 0, top: "50%", width: "35%", height: 1, background: "linear-gradient(270deg, transparent, rgba(220,38,38,.5))", transform: "translateY(-50%)" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center", display: "block" }}>{t.solutionEyebrow}</span>
        <h2 className="bebas" style={{ fontSize: "clamp(3rem,6vw,5.5rem)", lineHeight: .92, color: "#fff", marginBottom: 28, maxWidth: 700, margin: "0 auto 28px" }}>
          {t.solutionH}
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#A8A8A8", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 60px" }}>{t.solutionBody}</p>
        {/* The system diagram */}
        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, minWidth: "max-content", margin: "0 auto" }}>
            {["ALONE", "→", "STRUGGLING", "→", "RESTART"].map((item, i) => (
              <div key={i} style={{ padding: i % 2 === 0 ? "14px 24px" : "0 8px", background: i % 2 === 0 ? "rgba(220,38,38,.08)" : "transparent", border: i % 2 === 0 ? "1px solid rgba(220,38,38,.2)" : "none", borderRadius: 4, display: "flex", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: i % 2 === 1 ? "1.2rem" : ".72rem", color: i % 2 === 1 ? "#555" : "#DC2626", letterSpacing: ".1em" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ margin: "20px auto", width: 2, height: 40, background: "linear-gradient(to bottom, rgba(220,38,38,.5), rgba(220,38,38,.1))" }} />
        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, minWidth: "max-content", margin: "0 auto" }}>
            {["MATCHED", "→", "ACCOUNTABLE", "→", "CONSISTENT"].map((item, i) => (
              <div key={i} style={{ padding: i % 2 === 0 ? "14px 24px" : "0 8px", background: i % 2 === 0 ? "rgba(220,38,38,.15)" : "transparent", border: i % 2 === 0 ? "1px solid rgba(220,38,38,.4)" : "none", borderRadius: 4, display: "flex", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: i % 2 === 1 ? "1.2rem" : ".72rem", color: i % 2 === 1 ? "#888" : "#EF4444", letterSpacing: ".1em" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ────────────────────────────────────────────── */
function HowItWorks({ t }) {
  const dark = true;
  return (
    <section className="sec" id="how-it-works" style={{ background: dark ? "#080808" : "#F2F2F2" }}>
      <div className="grid-bg" style={{ opacity: .5 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">{t.howEyebrow}</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", lineHeight: .92, color: dark ? "#fff" : "#0A0A0A", maxWidth: 600 }}>{t.howH}</h2>
        </div>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {t.steps.map((s, i) => (
            <div key={i} style={{ background: dark ? "#0A0A0A" : "#fff", border: `1px solid ${dark ? "#1A1A1A" : "#E0E0E0"}`, padding: "28px 22px", position: "relative", overflow: "hidden", transition: "all .3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(220,38,38,.5)"; e.currentTarget.style.background = dark ? "#0F0F0F" : "#FAFAFA"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "#1A1A1A" : "#E0E0E0"; e.currentTarget.style.background = dark ? "#0A0A0A" : "#fff"; }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: i === 0 ? "linear-gradient(90deg, #DC2626, transparent)" : "transparent", transition: "background .3s" }} />
              <div className="bebas" style={{ fontSize: "5rem", color: "rgba(220,38,38,.08)", lineHeight: 1, marginBottom: 8, letterSpacing: ".04em" }}>{s.n}</div>
              <div className="mono" style={{ fontSize: ".7rem", color: "#DC2626", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>Step {s.n}</div>
              <h3 className="bebas" style={{ fontSize: "1.6rem", color: dark ? "#fff" : "#0A0A0A", marginBottom: 14, letterSpacing: ".04em" }}>{s.title}</h3>
              <p className="step-body" style={{ fontSize: ".9rem", color: dark ? "#909090" : "#666", lineHeight: 1.72 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES ────────────────────────────────────────────────── */
function Features({ t }) {
  const dark = true;
  const ICONS = {
    match:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="3.2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a3.2 3.2 0 0 1 0 6.2"/></svg>,
    streak:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c2.8 3 4.5 5.6 4.5 8.2A4.5 4.5 0 0 1 12 14.7a4.5 4.5 0 0 1-4.5-4.5C7.5 7.6 9.2 5 12 2Z"/><path d="M7 15.5A5 5 0 0 0 12 21a5 5 0 0 0 5-5.5"/></svg>,
    chat:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    ai:       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h6M9 15h4"/><circle cx="17" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>,
    meal:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    progress: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  };
  return (
    <section className="sec" id="features" style={{ background: dark ? "#050505" : "#EBEBEB" }}>
      <div className="noise-bg" style={{ opacity: .03 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <span className="eyebrow">{t.featEyebrow}</span>
            <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", lineHeight: .92, color: dark ? "#fff" : "#0A0A0A" }}>{t.featH}</h2>
          </div>
        </div>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {t.features.map(({ icon, title, body }, i) => (
            <div key={i} className="card" style={{ borderRadius: 0, border: `1px solid ${dark ? "#1A1A1A" : "#E0E0E0"}`, background: dark ? "#080808" : "#fff", padding: "36px 28px" }}>
              <div style={{ color: "#DC2626", marginBottom: 20, display: "flex" }}>{ICONS[icon]}</div>
              <h3 className="bebas" style={{ fontSize: "1.4rem", color: dark ? "#fff" : "#0A0A0A", marginBottom: 12, letterSpacing: ".04em" }}>{title}</h3>
              <p style={{ fontSize: ".88rem", color: dark ? "#909090" : "#666", lineHeight: 1.72 }} className="body-text">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── ADDICTION LOOP ──────────────────────────────────────────── */
function AddictionLoop({ t }) {
  const dark = true;
  return (
    <section className="sec section-dark" style={{ background: "#000", overflow: "hidden", padding: "80px 0" }}>
      <div style={{ marginBottom: 48, textAlign: "center" }}>
        <span className="eyebrow" style={{ display: "block" }}>{t.loopEyebrow}</span>
        <h2 className="bebas" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#fff" }}>{t.loopH}</h2>
      </div>
      {/* Infinite marquee */}
      <div style={{ overflow: "hidden", borderTop: "1px solid #1A1A1A", borderBottom: "1px solid #1A1A1A", padding: "28px 0" }}>
        <div className="marquee-track">
          {[...t.loopItems, ...t.loopItems].map((item, i) => (
            <div key={i} className={`marquee-item${item === "Build Streak" || item === "Get Results" ? " active" : ""}`}>
              <span>{item}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SOCIAL PROOF ────────────────────────────────────────────── */
function SocialProof({ t }) {
  const dark = true;
  return (
    <section className="sec" style={{ background: dark ? "#080808" : "#F2F2F2" }}>
      <div className="noise-bg" style={{ opacity: .03 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow">{t.proofEyebrow}</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", lineHeight: .92, color: dark ? "#fff" : "#0A0A0A" }}>{t.proofH}</h2>
        </div>
        <div className="proof-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          {t.testimonials.map(({ q, name, role, ini }, i) => (
            <div key={i} className="t-card" style={{ background: dark ? "#0A0A0A" : "#fff", border: `1px solid ${dark ? "#1A1A1A" : "#E0E0E0"}`, padding: "32px 28px", transition: "border-color .3s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(220,38,38,.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "#1A1A1A" : "#E0E0E0"}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: i < 2 ? "linear-gradient(90deg, rgba(220,38,38,.5), transparent)" : "transparent" }} />
              <div className="bebas" style={{ fontSize: "3.5rem", color: "rgba(220,38,38,.2)", lineHeight: 1, marginBottom: 12, letterSpacing: ".04em" }}>"</div>
              <p style={{ fontSize: ".95rem", color: dark ? "#C8C8C8" : "#555", lineHeight: 1.8, marginBottom: 24 }}>{q}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${dark ? "#111" : "#EEE"}`, paddingTop: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#DC2626,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: ".75rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{ini}</div>
                <div>
                  <div style={{ fontWeight: 600, color: dark ? "#fff" : "#0A0A0A", fontSize: ".9rem" }}>{name}</div>
                  <div className="mono" style={{ fontSize: ".62rem", color: "#DC2626", letterSpacing: ".08em" }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ─────────────────────────────────────────────────── */
function Pricing({ onCTA, t }) {
  const dark = true;
  return (
    <section className="sec section-dark" style={{ background: "#050505" }}>
      <div className="noise-bg" />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <span className="eyebrow" style={{ display: "block" }}>{t.pricingEyebrow}</span>
          <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", color: "#fff" }}>{t.pricingH}</h2>
        </div>
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, maxWidth: 800, margin: "0 auto" }}>
          {/* Free */}
          <div style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", padding: "32px 24px" }}>
            <div className="mono" style={{ fontSize: ".7rem", letterSpacing: ".16em", color: "#909090", textTransform: "uppercase", marginBottom: 12 }}>{t.pricingFree}</div>
            <div className="bebas" style={{ fontSize: "3.5rem", color: "#fff", letterSpacing: ".04em", marginBottom: 4 }}>$0</div>
            <div className="mono" style={{ fontSize: ".7rem", color: "#707070", marginBottom: 24 }}>/ forever</div>
            <p style={{ fontSize: ".85rem", color: "#909090", lineHeight: 1.7, marginBottom: 28 }}>{t.pricingFreeDesc}</p>
            {t.freeFeatures.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: ".85rem", color: "#C0C0C0" }}>{f}</span>
              </div>
            ))}
            <button className="btn-ghost" onClick={onCTA} style={{ width: "100%", justifyContent: "center", marginTop: 24 }}>Get Started</button>
          </div>
          {/* Pro */}
          <div style={{ background: "#0F0707", border: "1px solid rgba(220,38,38,.35)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #DC2626, #EF4444, #DC2626)" }} />
            <div style={{ position: "absolute", top: 16, right: 16 }}>
              <span className="mono" style={{ fontSize: ".62rem", background: "#DC2626", color: "#fff", padding: "4px 10px", borderRadius: 3, letterSpacing: ".1em" }}>POPULAR</span>
            </div>
            <div className="mono" style={{ fontSize: ".7rem", letterSpacing: ".16em", color: "#DC2626", textTransform: "uppercase", marginBottom: 12 }}>{t.pricingPro}</div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.25)", borderRadius: 4, padding: "12px 18px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", animation: "pulse 2s ease-in-out infinite" }} />
                <span className="mono" style={{ fontSize: ".75rem", color: "#EF4444", letterSpacing: ".14em" }}>PRICING COMING SOON</span>
              </div>
              <p className="mono" style={{ fontSize: ".65rem", color: "#555", letterSpacing: ".08em", marginTop: 8 }}>Join the waitlist for early access pricing</p>
            </div>
            <p style={{ fontSize: ".85rem", color: "#A8A8A8", lineHeight: 1.7, marginBottom: 28 }}>{t.pricingProDesc}</p>
            {t.proFeatures.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: ".85rem", color: f.includes("Everything") ? "#EF4444" : "#C0C0C0" }}>{f}</span>
              </div>
            ))}
            <button className="btn-red" onClick={onCTA} style={{ width: "100%", justifyContent: "center", marginTop: 24 }}>Get Pro Access</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────── */
function FAQ({ t }) {
  const dark = true;
  const [open, setOpen] = useState(null);
  return (
    <section className="sec" id="faq" style={{ background: dark ? "#080808" : "#F2F2F2" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "start" }} className="hero-grid faq-grid">
          <div>
            <span className="eyebrow">{t.faqEyebrow}</span>
            <h2 className="bebas" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", lineHeight: .92, color: dark ? "#fff" : "#0A0A0A" }}>{t.faqH}</h2>
          </div>
          <div>
            {t.faqs.map(({ q, a }, i) => (
              <div key={i} className={`faq-item${open === i ? " open" : ""}`} style={{ marginBottom: 4 }}>
                <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q" style={{ color: dark ? "#fff" : "#0A0A0A", fontFamily: "'DM Sans',sans-serif" }}>{q}</span>
                  <span className="faq-plus" style={{ transform: open === i ? "rotate(45deg)" : "none", display: "inline-block", transition: "transform .25s" }}>+</span>
                </button>
                {open === i && <div className="faq-a" style={{ color: dark ? "#999999" : "#888" }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ───────────────────────────────────────────────── */
function FinalCTA({ onCTA, t }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("https://formspree.io/f/mnjwagoo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, _subject: "New AccountaFit Waitlist Signup", message: `New waitlist signup: ${email}` }),
      });
    } catch {}
    setDone(true);
  };
  return (
    <section className="sec section-dark" style={{ background: "#000", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div className="noise-bg" />
      <div className="grid-bg" />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(220,38,38,.15) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <span className="eyebrow" style={{ display: "block" }}>{t.ctaEyebrow}</span>
        <h2 className="bebas" style={{ fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: .88, color: "#fff", marginBottom: 12 }}>
          {t.ctaH1}<br /><span style={{ color: "#DC2626" }}>{t.ctaH2}</span>
        </h2>
        <p style={{ fontSize: "1.15rem", color: "#909090", marginBottom: 48, fontStyle: "italic" }}>{t.ctaSub}</p>
        {done ? (
          <div style={{ background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.25)", borderRadius: 8, padding: "40px", maxWidth: 480, margin: "0 auto" }}>
            <div className="bebas" style={{ fontSize: "2.5rem", color: "#fff", marginBottom: 8 }}>YOU'RE IN.</div>
            <p style={{ color: "#909090" }}>We'll reach out when it's your turn. Stay consistent until then.</p>
          </div>
        ) : (
          <>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", maxWidth: 480, margin: "0 auto 16px" }}>
              <input type="email" placeholder={t.emailPH || "Enter your email"} value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width: "100%", height: 52, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", padding: "0 18px", outline: "none", transition: "border-color .2s" }}
                onFocus={e => e.target.style.borderColor = "rgba(220,38,38,.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />
              <button type="submit" className="btn-red" style={{ width: "100%", height: 52, justifyContent: "center", borderRadius: 4 }}>{t.ctaBtn}</button>
            </form>
            <p className="mono" style={{ fontSize: ".65rem", color: "#555", letterSpacing: ".1em" }}>{t.ctaNote}</p>
          </>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function Footer({ t }) {
  const dark = true;
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid #0F0F0F", padding: "48px 6% 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <Logo size="1.8rem" />
            <p style={{ marginTop: 14, fontSize: ".88rem", color: "#909090", lineHeight: 1.7 }}>Consistency over motivation. Accountability over intention. Stop starting over.</p>
            {/* Socials */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[
                { href: "https://x.com/accountafit", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.633 5.905-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href: "https://instagram.com/accountafitcorp", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="#fff" stroke="none"/></svg> },
                { href: "https://tiktok.com/@accountafit", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.08-.1z"/></svg> },
              ].map(({ href, icon }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ width: 34, height: 34, borderRadius: "50%", background: "#111", border: "1px solid #1E1E1E", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#DC2626"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1E1E1E"}>{icon}</a>
              ))}
            </div>
            {/* Store badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              {[
                { src: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg", alt: "App Store" },
                { src: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png", alt: "Google Play" },
              ].map(({ src, alt }) => (
                <div key={alt} style={{ position: "relative", width: 140, cursor: "not-allowed" }}>
                  <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block", filter: "blur(2px) grayscale(.3)", opacity: .55 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.4)", borderRadius: 7 }}>
                    <span className="mono" style={{ fontSize: ".58rem", letterSpacing: ".14em", color: "#fff" }}>COMING SOON</span>
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
                <div className="mono" style={{ fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#888", marginBottom: 16 }}>{title}</div>
                {links.map(({ label, href }) => (
                  <a key={label} href={href} style={{ display: "block", color: "#A0A0A0", fontSize: ".85rem", marginBottom: 10, transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#DC2626"}
                    onMouseLeave={e => e.target.style.color = "#A0A0A0"}>{label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #1A1A1A, transparent)", marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p className="mono" style={{ fontSize: ".62rem", color: "#2A2A2A", letterSpacing: ".08em" }}>© 2026 ACCOUNTAFIT CORP. ALL RIGHTS RESERVED. INCORPORATED IN DELAWARE.</p>
          <p className="mono" style={{ fontSize: ".62rem", color: "#2A2A2A", letterSpacing: ".08em" }}>BUILT FOR PEOPLE WHO DON'T QUIT.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── MODAL ───────────────────────────────────────────────────── */
function Modal({ onClose, t }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("https://formspree.io/f/mnjwagoo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, _subject: "New AccountaFit Waitlist Signup", message: `New waitlist signup: ${email}` }),
      });
    } catch {}
    setDone(true);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.92)", backdropFilter: "blur(20px)" }} />
      <div style={{ position: "relative", background: "#0A0A0A", border: "1px solid #1E1E1E", borderRadius: 8, padding: "48px 40px", maxWidth: 440, width: "100%", animation: "fadeUp .3s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #DC2626, #EF4444, #DC2626)", borderRadius: "8px 8px 0 0" }} />
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 18, background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div className="bebas" style={{ fontSize: "2.5rem", color: "#fff", marginBottom: 10 }}>YOU'RE IN.</div>
            <p style={{ color: "#909090" }}>We'll reach out when it's your turn. Stay consistent.</p>
            <button className="btn-red" onClick={onClose} style={{ marginTop: 24, width: "100%", justifyContent: "center" }}>Close</button>
          </div>
        ) : (
          <>
            <span className="mono" style={{ fontSize: ".65rem", color: "#DC2626", letterSpacing: ".2em", textTransform: "uppercase" }}>Early Access</span>
            <h3 className="bebas" style={{ fontSize: "2.8rem", color: "#fff", marginTop: 8, marginBottom: 12, lineHeight: .95 }}>FIND YOUR<br /><span style={{ color: "#DC2626" }}>PARTNER</span></h3>
            <p style={{ fontSize: ".88rem", color: "#909090", marginBottom: 24, lineHeight: 1.7 }}>Priority matching and free access to all features at launch. No credit card required.</p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ background: "#111", border: "1px solid #222", borderRadius: 4, color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", padding: "14px 16px", outline: "none", transition: "border-color .2s" }}
                onFocus={e => e.target.style.borderColor = "#DC2626"} onBlur={e => e.target.style.borderColor = "#222"} />
              <button type="submit" className="btn-red" style={{ justifyContent: "center", padding: "14px 0" }}>{t.heroCTA2} →</button>
            </form>
            <p className="mono" style={{ marginTop: 10, fontSize: ".62rem", color: "#555", textAlign: "center", letterSpacing: ".08em" }}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── ROOT APP ────────────────────────────────────────────────── */
export default function AccountaFit() {
  const [lang, setLang] = useState("en");
  const [modal, setModal] = useState(false);
  const t = T[lang] || T.en;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: G }} />
      <Nav lang={lang} setLang={setLang} t={t} onCTA={() => setModal(true)} />
      <Hero onCTA={() => setModal(true)} t={t} />
      <WhatIsIt t={t} onCTA={() => setModal(true)} />
      <Problem t={t} />
      <Solution t={t} />
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
