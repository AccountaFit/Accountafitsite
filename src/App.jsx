import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   LANGUAGE DATA
───────────────────────────────────────────── */
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
    heroEyebrow: "STRONGER TOGETHER. ACCOUNTABLE ALWAYS.",
    heroH1a: "STOP", heroH1b: "STARTING", heroH1c: "OVER.",
    heroSub: "Most people don't fail fitness because they're lazy. They fail because they do it alone. AccountaFit matches you with a real partner who keeps you accountable — every day.",
    heroCTA: "Join the Waitlist",
    heroSub2: "Free to join · No credit card required · iOS & Android coming soon",
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
    howH: "Four steps. One system.\nNo more restarting.",
    steps: [
      { n: "01", title: "Get Matched", body: "Tell us your goals, schedule, and commitment level. We find your perfect accountability partner in 48 hours." },
      { n: "02", title: "Check In Daily", body: "A 60-second daily check-in keeps both of you locked in. Miss one and the streak breaks — for both of you." },
      { n: "03", title: "Build Your Streak", body: "Streaks are shared. The longer they get, the harder they are to break. That's the design." },
      { n: "04", title: "Get Results", body: "Consistency compounds. When someone is counting on you every single day, results are inevitable." },
    ],
    featEyebrow: "FEATURES",
    featH: "Built different.\nBecause the problem is different.",
    features: [
      { icon: "match",    title: "Smart Matching",       body: "Paired by goals, schedule, and intensity — not randomly. Your match is your mirror." },
      { icon: "streak",   title: "Streak Tracking",      body: "Shared streaks between partners. Both check in or both lose it. Social pressure that actually works." },
      { icon: "chat",     title: "Accountability Chat",  body: "Direct line to your partner. No feed. No noise. Just the two of you, every day." },
      { icon: "ai",       title: "AI Workout Generator", body: "Personalized plans built around your goals, level, and available time. No guesswork." },
      { icon: "meal",     title: "Daily Meal Guidance",  body: "A new meal every day tailored to your fitness goals. High-protein, low-carb, vegan — your choice." },
      { icon: "progress", title: "Real-Time Progress",   body: "See your partner's activity in real time. When they're online, you know. When they skip, you know." },
    ],
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
    pricingH: "Free to start.\nBuilt to scale.",
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
    whatEyebrow: "INTRODUCING ACCOUNTAFIT",
    whatH: "The World's First Fitness Accountability Matching Platform",
    whatSub: "We didn't build another workout tracker. We built something the fitness world has never seen — a partner-matching system designed around the one thing that determines whether you succeed:",
    whatSub2: "who's with you.",
    comingSoon: "MORE FEATURES COMING SOON",
    comingH: "We're just getting started.",
    comingBody: "Leaderboards. AI workout programs. Meal planning. Real-time partner updates. Video check-ins. Waitlist members get everything first.",
    whatSteps: [
      { n: "01", title: "Build Your Profile", body: "Set your fitness goals, upload photos, define your schedule and commitment level. Tell us what you're working toward and how hard you're willing to push." },
      { n: "02", title: "Set Your Preferences", body: "Choose your training style, intensity level, and what you need from a partner. Someone to push you? Someone to match your pace? You decide." },
      { n: "03", title: "Get Matched", body: "Think Tinder, but for fitness accountability. Swipe through profiles, connect with someone who has the same fire — and make a commitment that neither of you will break." },
    ],
  },
};

/* ─────────────────────────────────────────────
   GLOBAL CSS  — ONE UNIFIED GLASS SYSTEM
───────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #060e1e;
  color: #F6F8FB;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}
::selection { background: rgba(255,77,87,.3); color: #fff; }

/* ── CSS VARIABLES ── */
:root {
  --navy:      #0D1526;
  --navy-deep: #060e1e;
  --navy-mid:  #0f1e38;
  --navy-hi:   #172344;
  --coral:     #FF4D57;
  --coral2:    #FF6B74;
  --coral-dim: rgba(255,77,87,.18);
  --frost:     #F6F8FB;
  --gray:      #B7C1D3;
  --gray2:     #8A97AD;
  --gray3:     #5a6a84;

  /* glass panel tokens */
  --glass-1: rgba(255,255,255,.055);
  --glass-2: rgba(255,255,255,.08);
  --glass-3: rgba(255,255,255,.11);
  --glass-border: rgba(255,255,255,.09);
  --glass-border-hi: rgba(255,255,255,.18);
  --glass-shine: linear-gradient(135deg, rgba(255,255,255,.13) 0%, rgba(255,255,255,0) 60%);

  /* blur levels */
  --blur-sm: blur(12px);
  --blur-md: blur(24px);
  --blur-lg: blur(40px);

  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 24px;
  --radius-xl: 32px;
}

/* ── FONT UTILS ── */
.bebas  { font-family: 'Bebas Neue', sans-serif; letter-spacing: .04em; }
.mono   { font-family: 'JetBrains Mono', monospace; }
.jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }

/* ── ANIMATIONS ── */
@keyframes fadeUp   { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes floatA   { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-12px)} }
@keyframes floatB   { 0%,100%{transform:translateY(-8px)} 50%{transform:translateY(4px)} }
@keyframes marquee  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
@keyframes glow     { 0%,100%{opacity:.55} 50%{opacity:1} }
@keyframes spin     { to { transform: rotate(360deg); } }
@keyframes afDot    { 0%,100%{opacity:.3} 50%{opacity:1; background:var(--coral)} }

/* ── BACKGROUND ATMOSPHERE ── */
.page-bg {
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(ellipse 80% 60% at 70% -10%,  rgba(60,100,200,.28) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at -10% 40%,  rgba(40,80,180,.22) 0%, transparent 55%),
    radial-gradient(ellipse 70% 60% at 110% 80%,  rgba(255,77,87,.12) 0%, transparent 55%),
    radial-gradient(ellipse 80% 80% at 50% 110%,  rgba(30,60,140,.35) 0%, transparent 60%),
    linear-gradient(160deg, #060e1e 0%, #0a1628 40%, #0d1a30 70%, #080f1e 100%);
}
.page-bg-noise {
  position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px;
}

/* ── GLASS PANEL SYSTEM ── */
.glass-panel {
  background: var(--glass-2);
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}
.glass-panel::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: var(--glass-shine);
  pointer-events: none;
  z-index: 0;
}
.glass-panel > * { position: relative; z-index: 1; }

.glass-card {
  background: var(--glass-1);
  backdrop-filter: var(--blur-sm);
  -webkit-backdrop-filter: var(--blur-sm);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  position: relative; overflow: hidden;
  transition: background .3s ease, border-color .3s ease, transform .3s ease, box-shadow .3s ease;
}
.glass-card::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
  pointer-events: none;
}
.glass-card:hover {
  background: var(--glass-2);
  border-color: rgba(255,255,255,.16);
  transform: translateY(-5px);
  box-shadow: 0 28px 56px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.08), 0 0 40px rgba(255,77,87,.06);
}

/* ── EYEBROW LABEL ── */
.eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: .66rem; letter-spacing: .22em; text-transform: uppercase; color: var(--coral);
  margin-bottom: 18px;
}
.eyebrow::before {
  content: '';
  display: block; width: 20px; height: 1.5px;
  background: var(--coral); flex-shrink: 0;
}

/* ── BUTTONS ── */
.btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: .78rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
  color: #fff; border: none; border-radius: 100px; cursor: pointer;
  padding: 16px 40px;
  background: linear-gradient(135deg, #FF4D57 0%, #e0353f 100%);
  box-shadow: 0 8px 32px rgba(255,77,87,.38), inset 0 1px 0 rgba(255,255,255,.22);
  transition: all .25s ease;
  position: relative; overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.14) 0%, transparent 60%);
  pointer-events: none;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 48px rgba(255,77,87,.52), inset 0 1px 0 rgba(255,255,255,.22);
}
.btn-primary:active { transform: translateY(0); }

.btn-ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: .78rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
  color: var(--frost); border-radius: 100px; cursor: pointer;
  padding: 15px 40px;
  background: var(--glass-1);
  backdrop-filter: var(--blur-sm); -webkit-backdrop-filter: var(--blur-sm);
  border: 1px solid var(--glass-border-hi);
  transition: all .25s ease;
}
.btn-ghost:hover {
  background: var(--glass-2);
  border-color: rgba(255,77,87,.5);
  color: var(--coral);
  transform: translateY(-2px);
}

/* ── NAV ── */
.nav-link {
  color: var(--gray); font-size: .88rem; font-weight: 400;
  transition: color .2s; cursor: pointer; white-space: nowrap;
}
.nav-link:hover { color: var(--frost); }

/* ── SECTION ── */
.sec { padding: 112px 0; position: relative; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 5%; }

/* ── DIVIDER LINE ── */
.sec-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.08) 30%, rgba(255,255,255,.12) 50%, rgba(255,255,255,.08) 70%, transparent 100%);
  margin: 0 5%;
}

/* ── MARQUEE ── */
.marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
.marquee-item {
  display: flex; align-items: center; gap: 24px; padding: 0 32px;
  font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: .08em;
  white-space: nowrap; color: rgba(183,193,211,.13);
  border-right: 1px solid rgba(255,255,255,.05);
}
.marquee-item.hi { color: rgba(255,77,87,.7); }

/* ── CHATBOT ── */
.af-chat-btn {
  position:fixed; bottom:28px; right:28px; z-index:800; height:48px;
  border-radius:100px; cursor:pointer;
  background: rgba(255,77,87,.14);
  backdrop-filter: var(--blur-sm); -webkit-backdrop-filter: var(--blur-sm);
  border: 1px solid rgba(255,77,87,.28);
  display:flex; align-items:center; justify-content:center; gap:9px;
  box-shadow: 0 4px 24px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.1);
  transition: all .25s ease; padding: 0 20px; white-space: nowrap;
}
.af-chat-btn:hover { background: rgba(255,77,87,.26); border-color: rgba(255,77,87,.5); transform: translateY(-2px); }
.af-chat-btn.open { width:48px; height:48px; padding:0; border-radius:50%; }
.af-chat-win {
  position:fixed; bottom:88px; right:28px; z-index:800; width:350px;
  background: rgba(12,20,38,.92);
  border: 1px solid rgba(255,255,255,.1); border-radius: var(--radius-xl);
  overflow:hidden;
  box-shadow: 0 28px 72px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.05);
  display:flex; flex-direction:column; animation:fadeIn .25s ease; max-height:520px;
  backdrop-filter: var(--blur-lg); -webkit-backdrop-filter: var(--blur-lg);
}
.af-chat-hd { background: rgba(255,255,255,.04); border-bottom: 1px solid rgba(255,255,255,.07); padding:14px 16px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
.af-chat-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; scroll-behavior:smooth; }
.af-chat-msgs::-webkit-scrollbar { width:3px; }
.af-chat-msgs::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius:2px; }
.af-chat-inp { border-top: 1px solid rgba(255,255,255,.07); padding:12px 14px; background: rgba(255,255,255,.03); display:flex; gap:8px; align-items:center; flex-shrink:0; }
.af-msg-bot { display:flex; gap:8px; align-items:flex-start; }
.af-msg-user { display:flex; justify-content:flex-end; }
.af-bubble-bot { background: rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.08); border-radius:12px 12px 12px 4px; padding:10px 13px; max-width:260px; font-size:13px; color:var(--frost); line-height:1.55; white-space:pre-line; }
.af-bubble-user { background: linear-gradient(135deg,#FF4D57,#e0353f); border-radius:12px 12px 4px 12px; padding:10px 13px; max-width:240px; font-size:13px; color:#fff; line-height:1.55; }
.af-av { width:26px; height:26px; border-radius:50%; background: linear-gradient(135deg,#FF4D57,#B91C1C); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; color:#fff; flex-shrink:0; font-family:'JetBrains Mono',monospace; }
.af-inp { flex:1; background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:100px; color:var(--frost); font-family:'Plus Jakarta Sans',sans-serif; font-size:12.5px; padding:9px 14px; outline:none; transition:border-color .2s; }
.af-inp::placeholder { color: var(--gray3); }
.af-inp:focus { border-color: rgba(255,77,87,.5); }
.af-send { width:34px; height:34px; border-radius:50%; background: linear-gradient(135deg,#FF4D57,#e0353f); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:opacity .2s; }
.af-send:hover { opacity:.85; }
.af-dot { width:6px; height:6px; border-radius:50%; background: rgba(255,255,255,.25); animation:afDot .9s ease-in-out infinite; }
.af-dot:nth-child(2){animation-delay:.2s} .af-dot:nth-child(3){animation-delay:.4s}

/* ── FAQ ── */
.faq-row { background: var(--glass-1); border:1px solid var(--glass-border); border-radius: var(--radius-sm); overflow:hidden; margin-bottom:4px; transition: background .2s, border-color .2s; }
.faq-row.open { background: rgba(255,77,87,.06); border-color: rgba(255,77,87,.22); }
.faq-btn { width:100%; background:none; border:none; cursor:pointer; padding:20px 24px; display:flex; justify-content:space-between; align-items:center; gap:16px; }
.faq-q { font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; color:var(--frost); font-size:.93rem; flex:1; text-align:left; }
.faq-a { padding:0 24px 20px; color:var(--gray); line-height:1.8; font-size:.9rem; }
.faq-icon { color: var(--coral); font-size:1.3rem; line-height:1; transition:transform .25s; flex-shrink:0; }

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .hide-m  { display: none !important; }
  .sec     { padding: 80px 0; }
  .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
  .three-col { grid-template-columns: 1fr 1fr !important; }
  .four-col  { grid-template-columns: 1fr 1fr !important; }
  .feat-grid { grid-template-columns: 1fr 1fr !important; }
  .proof-grid { grid-template-columns: 1fr !important; }
  .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px !important; }
  .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .hero-grid  { grid-template-columns: 1fr !important; }
}
@media (max-width: 600px) {
  .sec { padding: 64px 0; }
  .three-col { grid-template-columns: 1fr !important; }
  .four-col  { grid-template-columns: 1fr !important; }
  .feat-grid { grid-template-columns: 1fr !important; }
  .hero-btns { flex-direction: column !important; align-items: stretch !important; }
  .hero-btns .btn-primary, .hero-btns .btn-ghost { justify-content: center; }
  .af-chat-win { width: calc(100vw - 32px); right:16px; bottom:80px; }
  .af-chat-btn { right:16px; bottom:16px; }
}
@media (min-width: 961px) { .hide-d { display: none !important; } }
`;

/* ─────────────────────────────────────────────
   FEATURE ICONS
───────────────────────────────────────────── */
const ICONS = {
  match: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="3.2"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a3.2 3.2 0 0 1 0 6.2"/>
    </svg>
  ),
  streak: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c2.8 3 4.5 5.6 4.5 8.2A4.5 4.5 0 0 1 12 14.7a4.5 4.5 0 0 1-4.5-4.5C7.5 7.6 9.2 5 12 2Z"/>
      <path d="M7 15.5A5 5 0 0 0 12 21a5 5 0 0 0 5-5.5"/>
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M9 9h6M9 12h6M9 15h4"/>
    </svg>
  ),
  meal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  progress: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   GEMINI CHATBOT
───────────────────────────────────────────── */
const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
const SYSTEM_PROMPT = `You are the AccountaFit AI assistant. Only answer questions about AccountaFit. Keep answers concise, warm, and direct — max 3 sentences unless a list is genuinely needed.

AccountaFit is a fitness accountability platform that matches users with real partners based on goals, schedule, and commitment level. Tagline: "Stop Starting Over."

HOW IT WORKS: 1. Get Matched (48hrs) 2. Check In Daily (60 sec) 3. Build Your Streak (shared) 4. Get Results

FEATURES: Smart Matching, Shared Streaks, Accountability Chat, AI Workout Generator, Daily Meal Guidance, Real-Time Progress, Tinder-style matching with optional video call.

PRICING: Free tier (matching, check-ins, streaks, chat, 3 AI workouts/week). Pro tier pricing coming soon.

CONTACT: info@accountafit.com | @accountafitcorp Instagram | @accountafit X & TikTok. Delaware corporation. Mobile apps coming soon.`;

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
    setInput(""); setMsgs(m => [...m, { role: "user", text }]); setLoading(true);
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

  const QUICK = ["How does matching work?", "Is it free?", "What features are included?"];
  return (
    <>
      {open && (
        <div className="af-chat-win">
          <div className="af-chat-hd">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div className="af-av" style={{ width:34, height:34, fontSize:11 }}>AF</div>
              <div>
                <div style={{ fontWeight:600, fontSize:13, color:"#F6F8FB", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>AccountaFit AI</div>
                <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e" }}/>
                  <span style={{ fontSize:".62rem", color:"#22c55e", letterSpacing:".08em", fontFamily:"'JetBrains Mono',monospace" }}>ONLINE</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.35)", cursor:"pointer", fontSize:"1.2rem", lineHeight:1, padding:4 }}>✕</button>
          </div>
          <div className="af-chat-msgs" ref={msgsRef}>
            {msgs.map((m, i) => m.role === "bot"
              ? <div key={i} className="af-msg-bot"><div className="af-av">AF</div><div className="af-bubble-bot">{m.text}</div></div>
              : <div key={i} className="af-msg-user"><div className="af-bubble-user">{m.text}</div></div>
            )}
            {loading && <div className="af-msg-bot"><div className="af-av">AF</div><div style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.08)", borderRadius:12, padding:"10px 16px", display:"flex", gap:4 }}><div className="af-dot"/><div className="af-dot"/><div className="af-dot"/></div></div>}
          </div>
          {msgs.length === 1 && (
            <div style={{ padding:"0 14px 10px", display:"flex", flexWrap:"wrap", gap:6 }}>
              {QUICK.map(q => <button key={q} onClick={() => send(q)} style={{ background:"rgba(255,77,87,.1)", border:"1px solid rgba(255,77,87,.25)", borderRadius:100, color:"#FF6B74", fontSize:11, padding:"5px 10px", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{q}</button>)}
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
              <span style={{ color:"rgba(255,255,255,.9)", fontFamily:"'JetBrains Mono',monospace", fontWeight:500, fontSize:".78rem", letterSpacing:".1em", textTransform:"uppercase" }}>Ask AI</span>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px rgba(34,197,94,.6)" }}/>
            </>
        }
      </button>
    </>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ lang, setLang, t, onCTA }) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:500, padding:"0 5%",
      background: scrolled ? "rgba(8,15,30,.88)" : "transparent",
      backdropFilter: scrolled ? "blur(28px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(28px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "none",
      transition: "all .35s ease"
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:70 }}>
        {/* Logo */}
        <a href="/" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <img src="/af-mark.png" alt="AccountaFit mark" style={{ height:32, width:"auto", objectFit:"contain" }} />
        </a>

        {/* Desktop links */}
        <div className="hide-m" style={{ display:"flex", alignItems:"center", gap:36 }}>
          {t.nav.map((label, i) => {
            const hrefs = ["#how-it-works", "#features", "#faq"];
            return <a key={i} href={hrefs[i]} className="nav-link">{label}</a>;
          })}
          <button className="btn-primary" onClick={onCTA} style={{ padding:"10px 26px", fontSize:".75rem" }}>{t.joinWaitlist}</button>
          {/* Language */}
          <div style={{ position:"relative" }}>
            <button onClick={() => setLangOpen(o => !o)} style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", color:"var(--coral)", fontFamily:"'JetBrains Mono',monospace", fontSize:".7rem", letterSpacing:".1em" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              {LANGS[lang]?.name}
            </button>
            {langOpen && (
              <div style={{ position:"absolute", top:"calc(100% + 12px)", right:0, background:"rgba(10,18,36,.97)", border:"1px solid rgba(255,255,255,.1)", borderRadius:14, padding:"6px 0", minWidth:160, zIndex:999, boxShadow:"0 20px 56px rgba(0,0,0,.7)", backdropFilter:"blur(24px)" }}>
                {Object.entries(LANGS).map(([code, { name, flag }]) => (
                  <button key={code} onClick={() => { setLang(code); setLangOpen(false); }} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", background: code===lang ? "rgba(255,77,87,.1)" : "none", border:"none", cursor:"pointer", padding:"9px 16px", color: code===lang ? "var(--coral)" : "var(--gray)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:".88rem" }}>
                    <span>{flag}</span>{name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="hide-d" style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background:"none", border:"none", color:"var(--frost)", fontSize:"1.5rem", cursor:"pointer", lineHeight:1, padding:4 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="hide-d" style={{ background:"rgba(8,15,30,.97)", backdropFilter:"blur(28px)", borderTop:"1px solid rgba(255,255,255,.07)", padding:"24px 5% 32px", display:"flex", flexDirection:"column", gap:20 }}>
          {t.nav.map((label, i) => {
            const hrefs = ["#how-it-works", "#features", "#faq"];
            return <a key={i} href={hrefs[i]} onClick={() => setMenuOpen(false)} style={{ color:"var(--frost)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"1.1rem" }}>{label}</a>;
          })}
          <button className="btn-primary" onClick={() => { onCTA(); setMenuOpen(false); }} style={{ width:"100%" }}>{t.joinWaitlist}</button>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {Object.entries(LANGS).map(([code, { name, flag }]) => (
              <button key={code} onClick={() => { setLang(code); setMenuOpen(false); }} style={{ display:"flex", alignItems:"center", gap:8, background: code===lang ? "rgba(255,77,87,.1)" : "rgba(255,255,255,.04)", border:`1px solid ${code===lang ? "rgba(255,77,87,.3)" : "rgba(255,255,255,.08)"}`, borderRadius:8, padding:"9px 12px", cursor:"pointer", color: code===lang ? "var(--coral)" : "var(--gray)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:".84rem" }}>
                <span>{flag}</span>{name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero({ onCTA, t }) {
  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:70 }}>
      {/* Large hero glow rings */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"140vw", height:"140vw", maxWidth:1600, maxHeight:1600, borderRadius:"50%", border:"1px solid rgba(255,255,255,.03)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"100vw", height:"100vw", maxWidth:1100, maxHeight:1100, borderRadius:"50%", border:"1px solid rgba(255,255,255,.04)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"60vw", height:"60vw", maxWidth:700, maxHeight:700, borderRadius:"50%", border:"1px solid rgba(100,150,255,.06)", pointerEvents:"none" }}/>

      <div className="wrap" style={{ position:"relative", zIndex:2, width:"100%", paddingTop:40, paddingBottom:80 }}>
        {/* Eyebrow */}
        <div style={{ marginBottom:28, display:"flex", justifyContent:"flex-start" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(255,77,87,.1)", border:"1px solid rgba(255,77,87,.2)", borderRadius:100, padding:"7px 18px", backdropFilter:"blur(12px)" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--coral)", animation:"glow 2s ease-in-out infinite" }}/>
            <span className="mono" style={{ fontSize:".65rem", letterSpacing:".2em", color:"var(--coral)" }}>{t.heroEyebrow}</span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ marginBottom:32 }}>
          <h1 className="bebas" style={{ fontSize:"clamp(3.8rem,8vw,6.5rem)", lineHeight:.88, letterSpacing:".04em", color:"var(--frost)", maxWidth:680 }}>
            {t.heroH1a}<br/>
            <span style={{ color:"var(--coral)" }}>{t.heroH1b}</span><br/>
            {t.heroH1c}
          </h1>
        </div>

        {/* Two column: copy + glass card */}
        <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"flex-start" }}>
          {/* Left: copy + CTA */}
          <div>
            <p style={{ fontSize:"1.05rem", color:"var(--gray)", lineHeight:1.82, marginBottom:28, maxWidth:440 }}>{t.heroSub}</p>
            {/* Mobile-only CTA — desktop users use glass panel button */}
            <div className="hide-d" style={{ marginBottom:24 }}>
              <button className="btn-primary" onClick={onCTA} style={{ fontSize:".82rem", width:"100%" }}>{t.heroCTA} →</button>
            </div>
            <p className="mono" style={{ fontSize:".62rem", color:"var(--gray3)", letterSpacing:".1em", marginBottom:32 }}>{t.heroSub2}</p>

            {/* Stats */}
            <div style={{ display:"flex", gap:0, marginTop:48, paddingTop:36, borderTop:"1px solid rgba(255,255,255,.07)" }}>
              {[[t.stat1v,t.stat1l],[t.stat2v,t.stat2l],[t.stat3v,t.stat3l]].map(([v,l],i) => (
                <div key={v} style={{ flex:1, paddingRight: i<2 ? 24:0, paddingLeft: i>0 ? 24:0, borderRight: i<2 ? "1px solid rgba(255,255,255,.07)":"none" }}>
                  <div className="bebas" style={{ fontSize:"2.4rem", color:"var(--coral)", letterSpacing:".04em", lineHeight:1 }}>{v}</div>
                  <div className="mono" style={{ fontSize:".58rem", color:"var(--gray2)", letterSpacing:".1em", textTransform:"uppercase", marginTop:7, lineHeight:1.5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: premium glass feature panel */}
          <div className="hide-m" style={{ position:"relative" }}>
            <div className="glass-panel" style={{ padding:"36px 32px", borderRadius:28 }}>
              {/* Top row with app icon */}
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28, paddingBottom:24, borderBottom:"1px solid rgba(255,255,255,.07)" }}>
                <img src="/app-icon.png" alt="AccountaFit" style={{ width:48, height:48, borderRadius:12, objectFit:"contain" }}/>
                <div>
                  <div style={{ fontWeight:700, fontSize:"1rem", color:"var(--frost)", marginBottom:2, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>AccountaFit</div>
                  <div className="mono" style={{ fontSize:".62rem", color:"var(--coral)", letterSpacing:".1em" }}>COMING SOON · iOS & ANDROID</div>
                </div>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.2)", borderRadius:100, padding:"5px 12px" }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e" }}/>
                  <span className="mono" style={{ fontSize:".58rem", color:"#22c55e", letterSpacing:".1em" }}>LIVE BETA</span>
                </div>
              </div>

              {/* Feature rows */}
              {[
                { icon: ICONS.match,    label: "Smart Matching",       sub: "Matched in 48 hours" },
                { icon: ICONS.streak,   label: "Shared Streaks",       sub: "Both win or both lose" },
                { icon: ICONS.chat,     label: "Accountability Chat",  sub: "Direct partner line" },
                { icon: ICONS.ai,       label: "AI Workout Plans",     sub: "Built for your goals" },
              ].map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom: i<3 ? "1px solid rgba(255,255,255,.05)":"none" }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"rgba(255,77,87,.1)", border:"1px solid rgba(255,77,87,.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--coral)", flexShrink:0 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:".9rem", color:"var(--frost)" }}>{item.label}</div>
                    <div style={{ fontSize:".78rem", color:"var(--gray2)" }}>{item.sub}</div>
                  </div>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"rgba(34,197,94,.6)", flexShrink:0 }}/>
                </div>
              ))}

              {/* Bottom CTA — functional button */}
              <button onClick={onCTA} style={{ marginTop:24, padding:"16px 20px", background:"rgba(255,77,87,.08)", border:"1px solid rgba(255,77,87,.16)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", cursor:"pointer", transition:"background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,77,87,.16)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(255,77,87,.08)"}>
                <div>
                  <div style={{ fontWeight:700, fontSize:".88rem", color:"var(--frost)", textAlign:"left" }}>Join the Waitlist</div>
                  <div style={{ fontSize:".75rem", color:"var(--gray2)", textAlign:"left" }}>Priority access at launch</div>
                </div>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--coral)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHAT IS IT
───────────────────────────────────────────── */
function WhatIsIt({ t, onCTA }) {
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec">
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <div className="eyebrow" style={{ justifyContent:"center", display:"flex" }}>{t.whatEyebrow}</div>
            <h2 className="bebas" style={{ fontSize:"clamp(2.8rem,5.5vw,4.8rem)", lineHeight:.9, color:"var(--frost)", maxWidth:760, margin:"0 auto 24px" }}>
              {t.whatH.split("Fitness Accountability").map((part, i) => (
                <span key={i}>{i > 0 && <span style={{ color:"var(--coral)" }}>Fitness Accountability</span>}{part}</span>
              ))}
            </h2>
            <p style={{ fontSize:"1.02rem", color:"var(--gray)", lineHeight:1.85, maxWidth:560, margin:"0 auto" }}>
              {t.whatSub} <em style={{ color:"var(--frost)", fontStyle:"italic" }}>{t.whatSub2}</em>
            </p>
          </div>

          {/* 3 cards */}
          <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3, marginBottom:56 }}>
            {t.whatSteps.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding:"40px 32px", borderRadius: i===0 ? "20px 4px 4px 20px" : i===2 ? "4px 20px 20px 4px" : "4px" }}>
                <div className="bebas" style={{ fontSize:"4rem", color:"rgba(255,77,87,.45)", lineHeight:1, marginBottom:16, letterSpacing:".04em" }}>{s.n}</div>
                <h3 className="bebas" style={{ fontSize:"1.6rem", color:"var(--frost)", marginBottom:14, letterSpacing:".04em" }}>{s.title}</h3>
                <p style={{ fontSize:".9rem", color:"var(--gray)", lineHeight:1.78 }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Coming soon banner */}
          <div className="glass-panel" style={{ padding:"36px 44px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24, borderRadius:20 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--coral)", animation:"glow 2s ease-in-out infinite" }}/>
                <span className="mono" style={{ fontSize:".65rem", color:"var(--coral)", letterSpacing:".2em" }}>{t.comingSoon}</span>
              </div>
              <h3 className="bebas" style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", color:"var(--frost)", marginBottom:10, letterSpacing:".04em" }}>{t.comingH}</h3>
              <p style={{ fontSize:".9rem", color:"var(--gray)", maxWidth:500, lineHeight:1.75 }}>{t.comingBody}</p>
            </div>
            <button className="btn-primary" onClick={onCTA} style={{ flexShrink:0 }}>Join the Waitlist →</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   PROBLEM
───────────────────────────────────────────── */
function Problem({ t }) {
  const items = ["Downloaded the apps", "Started the routines", "Bought the gear", "Told yourself 'this time'"];
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec">
        <div className="wrap">
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}>
            {/* Visual */}
            <div>
              <div className="glass-panel" style={{ padding:"36px", borderRadius:24 }}>
                <div className="mono" style={{ fontSize:".62rem", letterSpacing:".2em", color:"var(--coral)", marginBottom:24, fontWeight:600 }}>THE PATTERN</div>
                {items.map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 0", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
                    <div style={{ width:26, height:26, borderRadius:7, border:"1px solid rgba(255,255,255,.1)", background:"rgba(255,255,255,.04)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                    <span style={{ fontSize:".92rem", color:"rgba(183,193,211,.75)", textDecoration:"line-through", textDecorationColor:"rgba(255,255,255,.3)" }}>{item}</span>
                  </div>
                ))}
                <div style={{ marginTop:20, padding:"16px 20px", background:"rgba(255,77,87,.1)", border:"1px solid rgba(255,77,87,.22)", borderRadius:10, display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--coral)", flexShrink:0 }}/>
                  <span className="mono" style={{ fontSize:".72rem", color:"var(--coral)", letterSpacing:".1em", fontWeight:600 }}>BACK TO DAY ONE. AGAIN.</span>
                </div>
              </div>
            </div>
            {/* Copy */}
            <div>
              <div className="eyebrow">{t.problemEyebrow}</div>
              <h2 className="bebas" style={{ fontSize:"clamp(2.6rem,5vw,4.2rem)", lineHeight:.92, color:"#F6F8FB", marginBottom:24 }}>{t.problemH}</h2>
              <p style={{ fontSize:"1rem", color:"var(--frost)", lineHeight:1.85, marginBottom:28, opacity:.82 }}>{t.problemBody}</p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:36, height:1.5, background:"var(--coral)", flexShrink:0 }}/>
                <span className="mono" style={{ fontSize:".68rem", color:"var(--coral)", letterSpacing:".14em", textTransform:"uppercase", fontWeight:600 }}>The pattern is the problem</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   SOLUTION
───────────────────────────────────────────── */
function Solution({ t }) {
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec" style={{ textAlign:"center" }}>
        <div className="wrap">
          <div className="eyebrow" style={{ justifyContent:"center", display:"flex" }}>{t.solutionEyebrow}</div>
          <h2 className="bebas" style={{ fontSize:"clamp(2.8rem,6vw,5.2rem)", lineHeight:.9, color:"var(--frost)", maxWidth:720, margin:"0 auto 24px" }}>{t.solutionH}</h2>
          <p style={{ fontSize:"1.04rem", color:"var(--gray)", lineHeight:1.85, maxWidth:520, margin:"0 auto 56px" }}>{t.solutionBody}</p>

          {/* Diagram */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
              {["ALONE","→","STRUGGLING","→","RESTART"].map((item,i) => (
                <div key={i} style={{ padding: i%2===0 ? "12px 22px":"0 6px", background: i%2===0 ? "rgba(255,255,255,.07)":"transparent", border: i%2===0 ? "1px solid rgba(255,255,255,.15)":"none", borderRadius:8 }}>
                  <span className="mono" style={{ fontSize: i%2===1 ? "1.2rem":".72rem", color: i%2===1 ? "rgba(255,255,255,.45)":"var(--gray)", letterSpacing:".1em", fontWeight:500 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ width:1, height:40, background:"linear-gradient(to bottom,rgba(255,77,87,.4),rgba(255,77,87,.1))" }}/>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
              {["MATCHED","→","ACCOUNTABLE","→","CONSISTENT"].map((item,i) => (
                <div key={i} style={{ padding: i%2===0 ? "12px 22px":"0 6px", background: i%2===0 ? "rgba(255,77,87,.16)":"transparent", border: i%2===0 ? "1px solid rgba(255,77,87,.38)":"none", borderRadius:8 }}>
                  <span className="mono" style={{ fontSize: i%2===1 ? "1.2rem":".72rem", color: i%2===1 ? "rgba(255,255,255,.45)":"#FF8A92", letterSpacing:".1em", fontWeight:600 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks({ t }) {
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec" id="how-it-works">
        <div className="wrap">
          <div style={{ marginBottom:64 }}>
            <div className="eyebrow">{t.howEyebrow}</div>
            <h2 className="bebas" style={{ fontSize:"clamp(2.8rem,5vw,4.2rem)", lineHeight:.9, color:"var(--frost)", whiteSpace:"pre-line" }}>{t.howH}</h2>
          </div>
          <div className="four-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:3 }}>
            {t.steps.map((s,i) => (
              <div key={i} className="glass-card" style={{ padding:"40px 28px", borderRadius: i===0 ? "20px 4px 4px 20px" : i===3 ? "4px 20px 20px 4px" : "4px" }}>
                <div className="bebas" style={{ fontSize:"5rem", color:"rgba(255,77,87,.42)", lineHeight:1, marginBottom:8, letterSpacing:".04em" }}>{s.n}</div>
                <div className="mono" style={{ fontSize:".62rem", color:"var(--coral)", letterSpacing:".15em", textTransform:"uppercase", marginBottom:12 }}>Step {s.n}</div>
                <h3 className="bebas" style={{ fontSize:"1.55rem", color:"var(--frost)", marginBottom:14, letterSpacing:".04em" }}>{s.title}</h3>
                <p style={{ fontSize:".88rem", color:"var(--gray)", lineHeight:1.78 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
function Features({ t }) {
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec" id="features">
        <div className="wrap">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:60, flexWrap:"wrap", gap:24 }}>
            <div>
              <div className="eyebrow">{t.featEyebrow}</div>
              <h2 className="bebas" style={{ fontSize:"clamp(2.8rem,5vw,4.2rem)", lineHeight:.9, color:"var(--frost)", whiteSpace:"pre-line" }}>{t.featH}</h2>
            </div>
          </div>
          <div className="feat-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
            {t.features.map(({ icon, title, body }, i) => (
              <div key={i} className="glass-card" style={{ padding:"36px 28px", borderRadius: i===0 ? "20px 4px 4px 20px" : i===2 ? "4px 20px 4px 4px" : i===3 ? "4px 4px 4px 20px" : i===5 ? "4px 4px 20px 4px" : "4px" }}>
                <div style={{ color:"var(--coral)", marginBottom:20 }}>{ICONS[icon]}</div>
                <h3 className="bebas" style={{ fontSize:"1.45rem", color:"var(--frost)", marginBottom:12, letterSpacing:".04em" }}>{title}</h3>
                <p style={{ fontSize:".88rem", color:"var(--gray)", lineHeight:1.78 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   LOOP MARQUEE
───────────────────────────────────────────── */
function LoopMarquee({ t }) {
  return (
    <div style={{ padding:"48px 0", overflow:"hidden", borderTop:"1px solid rgba(255,255,255,.05)", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
      <div className="marquee-track">
        {[...t.loopItems,...t.loopItems].map((item,i) => (
          <div key={i} className={`marquee-item${["Build Streak","Get Results"].includes(item)?" hi":""}`}>
            <span>{item}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL PROOF
───────────────────────────────────────────── */
function SocialProof({ t }) {
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec">
        <div className="wrap">
          <div style={{ marginBottom:56 }}>
            <div className="eyebrow">{t.proofEyebrow}</div>
            <h2 className="bebas" style={{ fontSize:"clamp(2.8rem,5vw,4.2rem)", lineHeight:.9, color:"var(--frost)" }}>{t.proofH}</h2>
          </div>
          <div className="proof-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:3 }}>
            {t.testimonials.map(({ q, name, role, ini }, i) => (
              <div key={i} className="glass-card" style={{ padding:"36px 32px", borderRadius: i===0 ? "20px 4px 4px 20px" : i===1 ? "4px 20px 20px 4px" : i===2 ? "4px 20px 4px 4px" : "20px 4px 4px 20px" }}>
                <div className="bebas" style={{ fontSize:"3.5rem", color:"rgba(255,77,87,.14)", lineHeight:1, marginBottom:16 }}>"</div>
                <p style={{ fontSize:".95rem", color:"var(--gray)", lineHeight:1.85, marginBottom:28 }}>{q}</p>
                <div style={{ display:"flex", alignItems:"center", gap:14, borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:22 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg, rgba(255,77,87,.6), rgba(255,77,87,.2))", border:"1px solid rgba(255,77,87,.25)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'JetBrains Mono',monospace", fontSize:".72rem", fontWeight:700, color:"#fff", flexShrink:0 }}>{ini}</div>
                  <div>
                    <div style={{ fontWeight:700, color:"var(--frost)", fontSize:".92rem" }}>{name}</div>
                    <div className="mono" style={{ fontSize:".6rem", color:"var(--coral)", letterSpacing:".08em" }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   PRICING
───────────────────────────────────────────── */
function Pricing({ t, onCTA }) {
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec">
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div className="eyebrow" style={{ justifyContent:"center", display:"flex" }}>{t.pricingEyebrow}</div>
            <h2 className="bebas" style={{ fontSize:"clamp(2.8rem,5vw,4.2rem)", lineHeight:.9, color:"var(--frost)", whiteSpace:"pre-line" }}>{t.pricingH}</h2>
          </div>
          <div className="pricing-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3, maxWidth:860, margin:"0 auto" }}>
            {/* Free */}
            <div className="glass-card" style={{ padding:"44px 40px", borderRadius:"20px 4px 4px 20px" }}>
              <div className="mono" style={{ fontSize:".65rem", letterSpacing:".16em", color:"var(--gray2)", textTransform:"uppercase", marginBottom:12 }}>Free</div>
              <div className="bebas" style={{ fontSize:"4rem", color:"var(--frost)", letterSpacing:".04em", lineHeight:1, marginBottom:6 }}>$0</div>
              <div className="mono" style={{ fontSize:".65rem", color:"var(--gray3)", marginBottom:32 }}>/ forever</div>
              {t.freeFeatures.map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize:".9rem", color:"var(--gray)" }}>{f}</span>
                </div>
              ))}
              <button className="btn-ghost" onClick={onCTA} style={{ width:"100%", marginTop:32 }}>Get Started</button>
            </div>
            {/* Pro */}
            <div className="glass-panel" style={{ padding:"44px 40px", borderRadius:"4px 20px 20px 4px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--coral), var(--coral2), var(--coral))" }}/>
              <div style={{ position:"absolute", top:18, right:18 }}>
                <span className="mono" style={{ fontSize:".6rem", background:"var(--coral)", color:"#fff", padding:"4px 10px", borderRadius:4, letterSpacing:".1em" }}>POPULAR</span>
              </div>
              <div className="mono" style={{ fontSize:".65rem", letterSpacing:".16em", color:"var(--coral)", textTransform:"uppercase", marginBottom:12 }}>Pro</div>
              <div style={{ marginBottom:32 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:9, background:"rgba(255,77,87,.1)", border:"1px solid rgba(255,77,87,.22)", borderRadius:10, padding:"13px 18px" }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--coral)", animation:"glow 2s ease-in-out infinite" }}/>
                  <span className="mono" style={{ fontSize:".7rem", color:"var(--coral2)", letterSpacing:".12em" }}>PRICING COMING SOON</span>
                </div>
                <p className="mono" style={{ fontSize:".6rem", color:"var(--gray3)", letterSpacing:".07em", marginTop:8 }}>Join waitlist for early access pricing</p>
              </div>
              {t.proFeatures.map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--coral2)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize:".9rem", color: f.includes("Everything") ? "var(--coral2)" : "var(--gray)" }}>{f}</span>
                </div>
              ))}
              <button className="btn-primary" onClick={onCTA} style={{ width:"100%", marginTop:32 }}>Get Early Access</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
function FAQ({ t }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="sec-divider"/>
      <section className="sec" id="faq">
        <div className="wrap">
          <div className="faq-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:80, alignItems:"start" }}>
            <div>
              <div className="eyebrow">{t.faqEyebrow}</div>
              <h2 className="bebas" style={{ fontSize:"clamp(2.8rem,5vw,4.2rem)", lineHeight:.9, color:"var(--frost)" }}>{t.faqH}</h2>
            </div>
            <div>
              {t.faqs.map(({ q, a }, i) => (
                <div key={i} className={`faq-row${open===i?" open":""}`} style={{ marginBottom:4 }}>
                  <button className="faq-btn" onClick={() => setOpen(open===i ? null:i)}>
                    <span className="faq-q">{q}</span>
                    <span className="faq-icon" style={{ transform: open===i ? "rotate(45deg)":"none", display:"inline-block" }}>+</span>
                  </button>
                  {open===i && <div className="faq-a">{a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────── */
function FinalCTA({ t, onCTA }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("https://formspree.io/f/mnjwagoo", {
        method:"POST", headers:{ "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({ email, _subject:"New AccountaFit Waitlist Signup", message:`Waitlist signup: ${email}` }),
      });
    } catch {}
    setDone(true);
  };

  return (
    <>
      <div className="sec-divider"/>
      <section className="sec" style={{ textAlign:"center" }}>
        {/* Glow underneath */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:500, background:"radial-gradient(ellipse, rgba(255,77,87,.12) 0%, transparent 65%)", borderRadius:"50%", pointerEvents:"none" }}/>
        <div className="wrap" style={{ position:"relative", zIndex:2 }}>
          {/* App icon centered */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <div style={{ width:80, height:80, background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.13)", borderRadius:22, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(20px)", boxShadow:"0 20px 48px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.14)" }}>
              <img src="/app-icon.png" alt="AccountaFit" style={{ width:52, height:52, objectFit:"contain" }}/>
            </div>
          </div>
          <div className="eyebrow" style={{ justifyContent:"center", display:"flex" }}>{t.ctaEyebrow}</div>
          <h2 className="bebas" style={{ fontSize:"clamp(3.5rem,8vw,7.5rem)", lineHeight:.86, color:"var(--frost)", marginBottom:16 }}>
            {t.ctaH1}<br/><span style={{ color:"var(--coral)" }}>{t.ctaH2}</span>
          </h2>
          <p style={{ fontSize:"1.08rem", color:"var(--gray)", marginBottom:52, fontStyle:"italic" }}>{t.ctaSub}</p>

          {done ? (
            <div className="glass-panel" style={{ padding:"44px", maxWidth:480, margin:"0 auto", borderRadius:24 }}>
              <div className="bebas" style={{ fontSize:"2.5rem", color:"var(--frost)", marginBottom:10 }}>YOU'RE IN.</div>
              <p style={{ color:"var(--gray)" }}>We'll reach out when it's your turn. Stay consistent until then.</p>
            </div>
          ) : (
            <>
              <form onSubmit={submit} style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", maxWidth:540, margin:"0 auto 16px" }}>
                <input type="email" placeholder={t.emailPH} value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ flex:"1 1 280px", height:54, background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)", borderRadius:100, color:"var(--frost)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:".95rem", padding:"0 22px", outline:"none", transition:"border-color .2s", backdropFilter:"blur(12px)" }}
                  onFocus={e => e.target.style.borderColor="rgba(255,77,87,.5)"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,.12)"}/>
                <button type="submit" className="btn-primary" style={{ height:54, padding:"0 36px", borderRadius:100 }}>{t.ctaBtn}</button>
              </form>
              <p className="mono" style={{ fontSize:".62rem", color:"var(--gray3)", letterSpacing:".1em" }}>{t.ctaNote}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer({ t }) {
  return (
    <>
      <div className="sec-divider"/>
      <footer style={{ padding:"56px 5% 36px", position:"relative" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:48, marginBottom:52 }}>
            {/* Brand */}
            <div style={{ maxWidth:300 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <img src="/af-mark.png" alt="AF" style={{ height:28, width:"auto", objectFit:"contain" }}/>
                <img src="/wordmark.png" alt="AccountaFit" style={{ height:20, width:"auto", objectFit:"contain" }}/>
              </div>
              <p style={{ fontSize:".88rem", color:"var(--gray2)", lineHeight:1.75, marginBottom:22 }}>Consistency over motivation. Accountability over intention. Stop starting over.</p>
              {/* Socials */}
              <div style={{ display:"flex", gap:10, marginBottom:24 }}>
                {[
                  { href:"https://x.com/accountafit", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gray2)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.633 5.905-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { href:"https://instagram.com/accountafitcorp", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gray2)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="var(--gray2)" stroke="none"/></svg> },
                  { href:"https://tiktok.com/@accountafit", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gray2)"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.08-.1z"/></svg> },
                ].map(({ href, icon }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,77,87,.4)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,.08)"}>{icon}</a>
                ))}
              </div>
              {/* App store badges */}
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { src:"https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg", alt:"App Store" },
                  { src:"https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png", alt:"Google Play" },
                ].map(({ src, alt }) => (
                  <div key={alt} style={{ position:"relative", width:145, cursor:"not-allowed" }}>
                    <img src={src} alt={alt} style={{ width:"100%", height:"auto", display:"block", filter:"blur(2px) grayscale(.6) brightness(.5)", opacity:.45 }}/>
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(8,15,30,.5)", borderRadius:8 }}>
                      <span className="mono" style={{ fontSize:".55rem", letterSpacing:".12em", color:"var(--gray3)" }}>COMING SOON</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:52 }}>
              {[
                { title:"Product", links:[{label:"Features",href:"#features"},{label:"How It Works",href:"#how-it-works"},{label:"FAQ",href:"#faq"}] },
                { title:"Company", links:[{label:"About",href:"#"},{label:"Contact",href:"mailto:info@accountafit.com"}] },
                { title:"Legal", links:[{label:"Terms of Service",href:"/terms"},{label:"Privacy Policy",href:"/privacy"},{label:"Community Guidelines",href:"/guidelines"},{label:"Safety Policy",href:"/safety"}] },
              ].map(({ title, links }) => (
                <div key={title}>
                  <div className="mono" style={{ fontSize:".6rem", letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,.2)", marginBottom:18 }}>{title}</div>
                  {links.map(({ label, href }) => (
                    <a key={label} href={href} style={{ display:"block", color:"var(--gray2)", fontSize:".88rem", marginBottom:12, transition:"color .2s" }}
                      onMouseEnter={e => e.target.style.color="var(--coral)"}
                      onMouseLeave={e => e.target.style.color="var(--gray2)"}>{label}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ height:1, background:"linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)", marginBottom:24 }}/>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <p className="mono" style={{ fontSize:".6rem", color:"rgba(255,255,255,.18)", letterSpacing:".07em" }}>© 2026 ACCOUNTAFIT CORP. ALL RIGHTS RESERVED. INCORPORATED IN DELAWARE.</p>
            <p className="mono" style={{ fontSize:".6rem", color:"rgba(255,255,255,.18)", letterSpacing:".07em" }}>STRONGER TOGETHER. ACCOUNTABLE ALWAYS.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ onClose, t }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("https://formspree.io/f/mnjwagoo", {
        method:"POST", headers:{ "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({ email, _subject:"New AccountaFit Waitlist Signup", message:`Waitlist signup: ${email}` }),
      });
    } catch {}
    setDone(true);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(4,9,20,.92)", backdropFilter:"blur(28px)" }}/>
      <div className="glass-panel" style={{ position:"relative", padding:"52px 44px", maxWidth:460, width:"100%", borderRadius:28, animation:"fadeUp .3s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg, var(--coral), var(--coral2), var(--coral))", borderRadius:"28px 28px 0 0" }}/>
        <button onClick={onClose} style={{ position:"absolute", top:18, right:22, background:"none", border:"none", color:"rgba(255,255,255,.3)", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>

        {done ? (
          <div style={{ textAlign:"center" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
              <img src="/app-icon.png" alt="AccountaFit" style={{ width:60, height:60, objectFit:"contain" }}/>
            </div>
            <div className="bebas" style={{ fontSize:"2.8rem", color:"var(--frost)", marginBottom:10 }}>YOU'RE IN.</div>
            <p style={{ color:"var(--gray)" }}>We'll reach out when it's your turn. Stay consistent.</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop:28, width:"100%" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <img src="/app-icon.png" alt="AccountaFit" style={{ width:42, height:42, objectFit:"contain" }}/>
              <img src="/wordmark.png" alt="AccountaFit" style={{ height:20, width:"auto", objectFit:"contain" }}/>
            </div>
            <span className="mono" style={{ fontSize:".62rem", color:"var(--coral)", letterSpacing:".2em", textTransform:"uppercase" }}>Early Access</span>
            <h3 className="bebas" style={{ fontSize:"3rem", color:"var(--frost)", marginTop:8, marginBottom:14, lineHeight:.92 }}>
              JOIN THE<br/><span style={{ color:"var(--coral)" }}>WAITLIST</span>
            </h3>
            <p style={{ fontSize:".9rem", color:"var(--gray)", marginBottom:28, lineHeight:1.75 }}>Priority matching and free access to all features at launch. No credit card required.</p>
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)", borderRadius:12, color:"var(--frost)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:".95rem", padding:"14px 18px", outline:"none", transition:"border-color .2s" }}
                onFocus={e => e.target.style.borderColor="rgba(255,77,87,.5)"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,.1)"}/>
              <button type="submit" className="btn-primary" style={{ justifyContent:"center", padding:"15px 0" }}>Claim My Spot →</button>
            </form>
            <p className="mono" style={{ marginTop:12, fontSize:".6rem", color:"var(--gray3)", textAlign:"center", letterSpacing:".08em" }}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function AccountaFit() {
  const [lang, setLang] = useState("en");
  const [modal, setModal] = useState(false);
  const t = T[lang] || T.en;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: G }} />
      {/* Fixed atmospheric background */}
      <div className="page-bg"/>
      <div className="page-bg-noise"/>
      <Nav lang={lang} setLang={setLang} t={t} onCTA={() => setModal(true)} />
      <Hero onCTA={() => setModal(true)} t={t} />
      <LoopMarquee t={t} />
      <Problem t={t} />
      <Solution t={t} />
      <WhatIsIt t={t} onCTA={() => setModal(true)} />
      <HowItWorks t={t} />
      <Features t={t} />
      <SocialProof t={t} />
      <Pricing t={t} onCTA={() => setModal(true)} />
      <FAQ t={t} />
      <FinalCTA t={t} onCTA={() => setModal(true)} />
      <Footer t={t} />
      {modal && <Modal onClose={() => setModal(false)} t={t} />}
      <Chatbot />
    </>
  );
}
