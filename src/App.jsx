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
    nav: ["Our Story", "Features", "How It Works", "FAQ"],
    joinWaitlist: "Join Waitlist",
    heroBadge: "A PRODUCT BY ACCOUNTAFIT CORP",
    heroH1a: "FIND YOUR", heroH1b: "FITNESS", heroH1c: "PARTNER.",
    heroSub: "PACT matches you with a real accountability partner based on your goals, schedule, and commitment level. Train smarter. Stay consistent. Never start over.",
    heroCTA: "Get Early Access", heroGhost: "See How It Works",
    stat1v: "200+", stat1l: "Workout Benchmarks",
    stat2v: "12+",  stat2l: "AI Sport Programs",
    stat3v: "48H",  stat3l: "Avg. Match Time",
    introEyebrow: "INTRODUCING PACT",
    introH1: "The World's First", introH2: "Fitness Accountability", introH3: "Matching Platform.",
    introSub: "AccountaFit Corp didn't build another workout tracker. We built something the fitness world has never seen — a partner-matching system designed around the one thing that determines whether you succeed:",
    introSub2: "who's with you.",
    introNote: "iOS & Android coming soon. Waitlist members get first access.",
    howEyebrow: "HOW IT WORKS",
    howH: "Four steps. One system.\nNo more restarting.",
    steps: [
      { n:"01", title:"Match With Your Partner",  body:"Tell us your goals, schedule, and commitment level. Our algorithm finds your perfect accountability partner in 48 hours — filtered by sport, level, and location." },
      { n:"02", title:"Check In Daily",           body:"A quick daily check-in keeps both of you locked in. Log workouts, share progress, and hold each other accountable every single day." },
      { n:"03", title:"Build Your Training",      body:"Use the AI program builder to generate a fully personalized plan across 12+ sports with customizable goals and weekly periodization." },
      { n:"04", title:"Compete and Grow",         body:"Hit daily benchmarks, climb the King/Queen of the Workout leaderboard, and grow inside Communities with people who share your discipline." },
    ],
    featEyebrow: "FEATURES",
    featH: "Built different.\nBecause the problem is different.",
    features: [
      { key:"match",  title:"Smart Partner Matching",  body:"Paired by sport, goals, schedule, and intensity. Swipe, connect, and make a pact you will not break." },
      { key:"ai",     title:"AI Program Builder",      body:"Generate fully personalized training programs across 12+ sports. Choose your phase: Base Build Peak, Aggressive, or Maintenance." },
      { key:"wod",    title:"King / Queen of the WOD", body:"A new benchmark every day. Log your score and compete on the real-time leaderboard. Claim the throne." },
      { key:"cal",    title:"Schedule & Calendar",     body:"Plan your training week. Add workouts, goals, habits, and events. Your calendar synced to your commitment." },
      { key:"lib",    title:"Workout Library",         body:"200+ pre-built workouts across Bodybuilding, CrossFit, Hyrox, Powerlifting and more. Ready to use or customize." },
      { key:"comm",   title:"Communities",             body:"Join or create Communities around your gym, sport, or training style. Shared workouts, group chats, collective progress." },
      { key:"goals",  title:"Goals & Events",          body:"Set fitness goals, register for upcoming events, and track daily habits all in one unified training hub." },
      { key:"pr",     title:"Personal Records",        body:"Search, add, and manage your PRs across every movement. See your strength story grow week over week." },
      { key:"chat",   title:"Direct Partner Chat",     body:"A private, direct line to your accountability partner. No feed noise. Just the two of you staying on track." },
    ],
    progEyebrow: "AI PROGRAM BUILDER",
    progH: "Your coach.\nPowered by AI.",
    progSub: "Select your sport, set your goal, and PACT's AI generates a fully periodized training program tailored to you — weeks of structured programming in one tap.",
    sports: ["Bodybuilding","General Fitness","Weight Loss","Strength Training","Powerlifting","Olympic Lifting","CrossFit","Hyrox","Running","Marathon","Triathlon","Swimming"],
    libEyebrow: "WORKOUT LIBRARY",
    libH: "200+ workouts.\nZero guesswork.",
    libSub: "From HYROX benchmarks to CrossFit WODs, from powerlifting templates to custom sessions — PACT's library has pre-built workouts ready to log, share, or add to your schedule.",
    commEyebrow: "COMMUNITIES",
    commH: "Your gym. Your crew.\nYour community.",
    commSub: "Create or join Communities built around your gym, sport, or training style. Share workouts, chat with members, and grow together.",
    commCards: [
      { tag:"COMM", title:"Create a Community",  body:"Start your own space — name it, set the level, and invite your training crew." },
      { tag:"CHAT", title:"Community Chat",       body:"A dedicated group chat for every community. Share WODs, results, and motivation." },
      { tag:"WOD",  title:"Shared Workouts",      body:"Post workouts to your community. Members log scores and compete together on a shared leaderboard." },
      { tag:"LOCK", title:"Private or Public",    body:"Keep your community open to all or restricted to your inner circle. Your space, your rules." },
    ],
    waitlistEyebrow: "YOUR MOVE",
    waitlistH: "Your next restart doesn't have to happen.",
    waitlistSub: "Find someone who won't let you quit. Join the PACT waitlist and get first access when we launch on iOS and Android.",
    waitlistNote: "FREE TO JOIN · NO CREDIT CARD REQUIRED · iOS & ANDROID COMING SOON",
    emailPH: "Enter your email", joinBtn: "Join the Waitlist",
    faqEyebrow: "FAQ", faqH: "Real questions.",
    faqSub: "Everything you need to know about PACT before you make yours.",
    faqs: [
      { q:"Is PACT a dating app?",                            a:"No. Partner matching is 100% based on fitness goals, schedule, and commitment level. This is accountability, not socializing." },
      { q:"What sports does the AI program builder support?", a:"12+ disciplines including Bodybuilding, CrossFit, Hyrox, Powerlifting, Olympic Lifting, Running, Marathon, Triathlon, Swimming, and General Fitness. Each program is fully personalized to your goal, phase preference, and timeline." },
      { q:"What is King / Queen of the Workout?",            a:"Every day a new benchmark Workout of the Day is posted. Athletes log their score and compete on a real-time leaderboard to claim the throne — King or Queen of the Workout." },
      { q:"How does partner matching work?",                  a:"Think Tinder for fitness. You browse profiles matched to your goals, fitness level, and location. When both sides connect, you make a Pact and start training together with shared accountability." },
      { q:"What if my partner goes inactive?",               a:"Our system automatically monitors partner activity and will detect and notify you when your partner has been inactive for a period of time — so you're never left wondering. You'll always know, and we'll help you find a better match before your momentum breaks." },
      { q:"When does PACT launch?",                          a:"PACT is in active development. iOS and Android launch is coming soon. Join the waitlist to get early access and be the first to know." },
      { q:"Is it free to use?",                              a:"Core features including partner matching, workout library, and scheduling are free. Premium AI programs and advanced analytics will be available on a subscription plan." },
    ],
    chatGreeting: "Hey! I'm the PACT AI assistant. Ask me anything about the app, matching, features, or how to get started.",
    chatPH: "Ask about PACT...",
  },
};

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:#05090f;color:#EEF2FF;overflow-x:hidden;-webkit-font-smoothing:antialiased;line-height:1.6}
a{color:inherit;text-decoration:none}
::selection{background:rgba(59,123,255,.35);color:#fff}

:root{
  --bg:#05090f;
  --navy:#080e1c;
  --navy-mid:#0d1628;
  --navy-hi:#131e35;
  --blue:#3B7BFF;
  --blue2:#5B94FF;
  --blue-dim:rgba(59,123,255,.18);
  --cyan:#00D4FF;
  --cyan-dim:rgba(0,212,255,.12);
  --purple:#7C5CFC;
  --frost:#EEF2FF;
  --gray:#9AAAC8;
  --gray2:#6B7FA3;
  --gray3:#3D4F70;
  --glass-1:rgba(255,255,255,.045);
  --glass-2:rgba(255,255,255,.075);
  --glass-3:rgba(255,255,255,.11);
  --glass-border:rgba(255,255,255,.08);
  --glass-border-hi:rgba(255,255,255,.16);
  --blur-sm:blur(12px);
  --blur-md:blur(24px);
  --blur-lg:blur(40px);
  --r-sm:10px;
  --r-md:16px;
  --r-lg:22px;
  --r-xl:28px;
}

.raj{font-family:'Rajdhani',sans-serif;letter-spacing:.02em}
.mono{font-family:'JetBrains Mono',monospace}

/* ── Keyframes ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes afDot{0%,100%{opacity:.3}50%{opacity:1;background:var(--blue)}}
@keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

/* ── Page Background ── */
.page-bg{
  position:fixed;inset:0;z-index:-1;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 55% at 75% -5%,rgba(59,123,255,.22) 0%,transparent 60%),
    radial-gradient(ellipse 55% 45% at -5% 40%,rgba(59,123,255,.16) 0%,transparent 55%),
    radial-gradient(ellipse 60% 55% at 105% 80%,rgba(124,92,252,.14) 0%,transparent 55%),
    radial-gradient(ellipse 80% 70% at 50% 110%,rgba(0,212,255,.08) 0%,transparent 60%),
    linear-gradient(160deg,#05090f 0%,#07111f 40%,#0a1428 70%,#060a14 100%);
}
.page-bg-noise{
  position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.028;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:256px;
}

/* ── Glass ── */
.glass{
  background:var(--glass-2);
  backdrop-filter:var(--blur-md);-webkit-backdrop-filter:var(--blur-md);
  border:1px solid var(--glass-border);border-radius:var(--r-lg);
  position:relative;overflow:hidden;
}
.glass::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.09) 0%,rgba(255,255,255,0) 60%);
  pointer-events:none;z-index:0;
}
.glass>*{position:relative;z-index:1}

.glass-card{
  background:var(--glass-1);
  backdrop-filter:var(--blur-sm);-webkit-backdrop-filter:var(--blur-sm);
  border:1px solid var(--glass-border);border-radius:var(--r-md);
  position:relative;overflow:hidden;
  transition:background .3s,border-color .3s,transform .3s,box-shadow .3s;
}
.glass-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  pointer-events:none;
}
.glass-card:hover{
  background:var(--glass-2);border-color:rgba(59,123,255,.28);
  transform:translateY(-4px);
  box-shadow:0 24px 56px rgba(0,0,0,.4),0 0 40px rgba(59,123,255,.07);
}

/* ── Eyebrow ── */
.eyebrow{
  display:inline-flex;align-items:center;gap:10px;
  font-family:'JetBrains Mono',monospace;font-size:.64rem;
  letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);
  margin-bottom:16px;
}
.eyebrow::before{content:'';display:block;width:18px;height:1.5px;background:var(--cyan);flex-shrink:0}

/* ── Buttons ── */
.btn-primary{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  font-family:'JetBrains Mono',monospace;font-size:.76rem;font-weight:500;
  letter-spacing:.1em;text-transform:uppercase;
  color:#fff;border:none;border-radius:100px;cursor:pointer;
  padding:15px 38px;
  background:linear-gradient(135deg,#3B7BFF 0%,#2563EB 100%);
  box-shadow:0 8px 32px rgba(59,123,255,.42),inset 0 1px 0 rgba(255,255,255,.2);
  transition:all .25s ease;position:relative;overflow:hidden;
}
.btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.13) 0%,transparent 60%);pointer-events:none}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 48px rgba(59,123,255,.58)}

.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  font-family:'JetBrains Mono',monospace;font-size:.76rem;font-weight:500;
  letter-spacing:.1em;text-transform:uppercase;
  color:var(--frost);border-radius:100px;cursor:pointer;
  padding:14px 38px;
  background:var(--glass-1);
  backdrop-filter:var(--blur-sm);-webkit-backdrop-filter:var(--blur-sm);
  border:1px solid var(--glass-border-hi);transition:all .25s ease;
}
.btn-ghost:hover{background:var(--glass-2);border-color:rgba(59,123,255,.45);color:var(--blue2);transform:translateY(-2px)}

/* ── Nav ── */
.nav-link{color:var(--gray);font-size:.88rem;font-weight:400;transition:color .2s;cursor:pointer;white-space:nowrap;background:none;border:none;font-family:'Inter',sans-serif}
.nav-link:hover{color:var(--frost)}

/* ── Layout ── */
.sec{padding:108px 0;position:relative}
.wrap{max-width:1200px;margin:0 auto;padding:0 5%}
.divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.07) 30%,rgba(255,255,255,.11) 50%,rgba(255,255,255,.07) 70%,transparent);margin:0 5%}

/* ── Gradient text ── */
.grad-text{
  background:linear-gradient(135deg,#3B7BFF 0%,#00D4FF 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

/* ── Stat pill ── */
.stat-pill{
  display:flex;flex-direction:column;align-items:center;gap:4px;
  background:var(--glass-1);border:1px solid var(--glass-border);
  border-radius:var(--r-md);padding:22px 18px;flex:1;min-width:100px;
}

/* ── Step number ── */
.step-num{
  width:50px;height:50px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:700;
  background:rgba(59,123,255,.12);border:1.5px solid rgba(59,123,255,.28);
  color:var(--blue2);
}

/* ── Tag pills ── */
.tag{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid}
.tag-blue{color:var(--blue2);background:rgba(59,123,255,.1);border-color:rgba(59,123,255,.22)}
.tag-cyan{color:var(--cyan);background:rgba(0,212,255,.08);border-color:rgba(0,212,255,.2)}
.tag-purple{color:#A78BFA;background:rgba(124,92,252,.1);border-color:rgba(124,92,252,.22)}
.tag-green{color:#34D399;background:rgba(52,211,153,.08);border-color:rgba(52,211,153,.2)}
.tag-amber{color:#FBBF24;background:rgba(251,191,36,.08);border-color:rgba(251,191,36,.2)}

/* ── Marquee ── */
.marquee-track{display:flex;width:max-content;animation:marquee 26s linear infinite}
.marquee-item{
  display:flex;align-items:center;gap:22px;padding:0 30px;
  font-family:'Rajdhani',sans-serif;font-size:1.5rem;font-weight:600;
  letter-spacing:.1em;white-space:nowrap;color:rgba(154,170,200,.4);
  border-right:1px solid rgba(255,255,255,.06);
}
.marquee-item.hi{color:var(--cyan)}

/* ── FAQ ── */
.faq-row{background:var(--glass-1);border:1px solid var(--glass-border);border-radius:var(--r-sm);overflow:hidden;margin-bottom:4px;transition:background .2s,border-color .2s}
.faq-row.open{background:rgba(59,123,255,.06);border-color:rgba(59,123,255,.22)}
.faq-btn{width:100%;background:none;border:none;cursor:pointer;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px}
.faq-q{font-family:'Inter',sans-serif;font-weight:600;color:var(--frost);font-size:.92rem;flex:1;text-align:left}
.faq-icon{color:var(--blue);font-size:1.3rem;line-height:1;transition:transform .25s;flex-shrink:0}
.faq-a{padding:0 24px 20px;color:var(--gray);line-height:1.8;font-size:.9rem}

/* ── Chatbot ── */
.af-chat-btn{position:fixed;bottom:28px;right:28px;z-index:800;height:48px;border-radius:100px;cursor:pointer;background:rgba(59,123,255,.14);backdrop-filter:var(--blur-sm);-webkit-backdrop-filter:var(--blur-sm);border:1px solid rgba(59,123,255,.28);display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 4px 24px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1);transition:all .25s ease;padding:0 20px;white-space:nowrap}
.af-chat-btn:hover{background:rgba(59,123,255,.26);border-color:rgba(59,123,255,.5);transform:translateY(-2px)}
.af-chat-btn.open{width:48px;height:48px;padding:0;border-radius:50%}
.af-chat-win{position:fixed;bottom:88px;right:28px;z-index:800;width:350px;background:rgba(8,14,28,.94);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-xl);overflow:hidden;box-shadow:0 28px 72px rgba(0,0,0,.75);display:flex;flex-direction:column;animation:fadeIn .25s ease;max-height:520px;backdrop-filter:var(--blur-lg);-webkit-backdrop-filter:var(--blur-lg)}
.af-chat-hd{background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.07);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.af-chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
.af-chat-msgs::-webkit-scrollbar{width:3px}
.af-chat-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
.af-chat-inp{border-top:1px solid rgba(255,255,255,.07);padding:12px 14px;background:rgba(255,255,255,.03);display:flex;gap:8px;align-items:center;flex-shrink:0}
.af-msg-bot{display:flex;gap:8px;align-items:flex-start}
.af-msg-user{display:flex;justify-content:flex-end}
.af-bubble-bot{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);border-radius:12px 12px 12px 4px;padding:10px 13px;max-width:260px;font-size:13px;color:var(--frost);line-height:1.55;white-space:pre-line}
.af-bubble-user{background:linear-gradient(135deg,#3B7BFF,#2563EB);border-radius:12px 12px 4px 12px;padding:10px 13px;max-width:240px;font-size:13px;color:#fff;line-height:1.55}
.af-av{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#3B7BFF,#1D4ED8);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;flex-shrink:0;font-family:'JetBrains Mono',monospace}
.af-inp{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:100px;color:var(--frost);font-family:'Inter',sans-serif;font-size:12.5px;padding:9px 14px;outline:none;transition:border-color .2s}
.af-inp::placeholder{color:var(--gray3)}
.af-inp:focus{border-color:rgba(59,123,255,.5)}
.af-send{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#3B7BFF,#2563EB);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s}
.af-send:hover{opacity:.85}
.af-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.25);animation:afDot .9s ease-in-out infinite}
.af-dot:nth-child(2){animation-delay:.2s}.af-dot:nth-child(3){animation-delay:.4s}

/* ── Responsive ── */
@media(max-width:960px){
  .hide-m{display:none!important}
  .sec{padding:80px 0}
  .two-col{grid-template-columns:1fr!important;gap:48px!important}
  .three-col{grid-template-columns:1fr 1fr!important}
  .feat-grid{grid-template-columns:1fr 1fr!important}
  .four-col{grid-template-columns:1fr 1fr!important}
  .faq-grid{grid-template-columns:1fr!important;gap:32px!important}
  .hero-h1{font-size:clamp(3.2rem,11vw,5rem)!important}
  .pricing-grid{grid-template-columns:1fr!important;max-width:480px!important}
}
@media(max-width:600px){
  .three-col{grid-template-columns:1fr!important}
  .feat-grid{grid-template-columns:1fr!important}
  .four-col{grid-template-columns:1fr!important}
  .hero-btns{flex-direction:column;align-items:stretch!important}
  .hero-btns .btn-primary,.hero-btns .btn-ghost{justify-content:center}
  .stat-pill{min-width:80px!important;padding:16px 10px!important}
  .af-chat-win{width:calc(100vw - 32px);right:16px;bottom:80px}
  .af-chat-btn{right:16px;bottom:16px}
}
@media(min-width:961px){.hide-d{display:none!important}}
`;

/* ─────────────────────────────────────────────
   ENTRY SCREEN — Light reveal + click to enter
───────────────────────────────────────────── */
function EntryScreen({ onEnter }) {
  const [phase, setPhase] = useState("dark");   // dark → sweep → reveal → ready
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("sweep"), 600);
    const t2 = setTimeout(() => setPhase("reveal"), 2200);
    const t3 = setTimeout(() => setPhase("ready"), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"#020508",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      opacity: leaving ? 0 : 1,
      transition: leaving ? "opacity .7s ease" : "none",
      cursor: phase === "ready" ? "pointer" : "default",
      overflow:"hidden",
    }} onClick={phase === "ready" ? handleEnter : undefined}>

      {/* Background atmosphere */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,123,255,.12) 0%, transparent 65%)",
        opacity: phase === "dark" ? 0 : 1,
        transition:"opacity 1.8s ease",
      }}/>

      {/* Light sweep ray */}
      <div style={{
        position:"absolute", top:0, bottom:0,
        width:"35%",
        background:"linear-gradient(90deg, transparent 0%, rgba(180,210,255,.06) 40%, rgba(220,235,255,.13) 55%, rgba(180,210,255,.06) 70%, transparent 100%)",
        transform: phase === "dark" ? "translateX(-160%)" : "translateX(380%)",
        transition: phase === "sweep" || phase === "reveal" || phase === "ready" ? "transform 1.5s cubic-bezier(.25,.1,.25,1)" : "none",
        pointerEvents:"none",
      }}/>

      {/* PACT Logo — revealed by sweep */}
      <div style={{
        position:"relative", zIndex:2, textAlign:"center",
        opacity: phase === "dark" ? 0 : 1,
        transform: phase === "dark" ? "scale(.94)" : "scale(1)",
        transition:"opacity 1s ease .3s, transform 1s ease .3s",
      }}>
        <img
          src="/images/pact-logo-full.webp"
          alt="PACT"
          style={{
            height:"clamp(60px, 10vw, 100px)",
            width:"auto",
            display:"block",
            margin:"0 auto 24px",
            mixBlendMode:"lighten",
            filter:`
              drop-shadow(0 0 40px rgba(59,123,255,${phase === "ready" ? ".65" : ".2"}))
              drop-shadow(0 0 80px rgba(59,123,255,${phase === "ready" ? ".3" : ".05"}))
              brightness(${phase === "ready" ? "1.08" : "0.9"})
            `,
            transition:"filter 1.2s ease",
          }}
        />

        {/* Presented by line */}
        <div style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize:"clamp(.58rem,.9vw,.72rem)",
          letterSpacing:".28em",
          color:`rgba(154,170,200,${phase === "reveal" || phase === "ready" ? ".75" : "0"})`,
          textTransform:"uppercase",
          marginBottom: 48,
          transition:"color .8s ease .6s",
        }}>
          A PRODUCT BY ACCOUNTAFIT CORP
        </div>

        {/* Enter prompt */}
        <div style={{
          opacity: phase === "ready" ? 1 : 0,
          transform: phase === "ready" ? "translateY(0)" : "translateY(10px)",
          transition:"opacity .6s ease, transform .6s ease",
          display:"flex", flexDirection:"column", alignItems:"center", gap:14,
        }}>
          <div style={{
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:"clamp(.65rem,1vw,.78rem)",
            letterSpacing:".22em",
            color:"rgba(255,255,255,.35)",
            textTransform:"uppercase",
          }}>
            CLICK ANYWHERE TO ENTER
          </div>
          {/* Pulsing dot */}
          <div style={{
            width:8, height:8, borderRadius:"50%",
            background:"rgba(59,123,255,.7)",
            boxShadow:"0 0 12px rgba(59,123,255,.5)",
            animation:"glow 1.4s ease-in-out infinite",
          }}/>
        </div>
      </div>

      {/* Corner branding */}
      <div style={{
        position:"absolute", bottom:32, left:0, right:0,
        textAlign:"center",
        opacity: phase === "ready" ? .35 : 0,
        transition:"opacity .8s ease .2s",
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:".58rem",
        letterSpacing:".18em",
        color:"rgba(154,170,200,.6)",
        textTransform:"uppercase",
      }}>
        THE FITNESS ACCOUNTABILITY MATCHING PLATFORM
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHATBOT
───────────────────────────────────────────── */
const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
const SYSTEM = `You are the PACT app AI assistant, embedded on the PACT website. PACT is a fitness accountability partner-matching platform by AccountaFit Corp.

KEY FACTS:
- PACT matches users with real fitness accountability partners based on goals, schedule, and commitment level
- Think Tinder for fitness — swipe profiles, connect, make a pact
- Features: Smart Partner Matching, AI Program Builder (12+ sports), King/Queen of the WOD daily leaderboard, Schedule & Calendar, 200+ Workout Library, Communities, Goals & Events, Personal Records, Direct Partner Chat
- 12 sports: Bodybuilding, General Fitness, Weight Loss, Strength Training, Powerlifting, Olympic Lifting, CrossFit, Hyrox, Running, Marathon, Triathlon, Swimming
- Free core features. Premium AI programs via subscription coming soon
- iOS & Android launch coming soon
- Built by AccountaFit Corp
- Waitlist: info@accountafit.com

Keep answers concise, enthusiastic, and fitness-focused. Max 3 sentences unless a list is needed.`;

function Chatbot({ t }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role:"bot", text: t.chatGreeting }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [msgs, loading]);

  const send = async (override) => {
    const text = (override || inp).trim();
    if (!text || loading) return;
    setInp(""); setMsgs(m => [...m, { role:"user", text }]); setLoading(true);
    try {
      if (!GEMINI_KEY) throw new Error("no key");
      const history = msgs.map(m => ({ role: m.role === "bot" ? "model" : "user", parts:[{ text: m.text }] }));
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ system_instruction:{ parts:[{ text: SYSTEM }] }, contents:[...history,{ role:"user", parts:[{ text }] }], generationConfig:{ maxOutputTokens:300, temperature:0.7 } }),
      });
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setMsgs(m => [...m, { role:"bot", text: raw.replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1').trim() || "Try again!" }]);
    } catch { setMsgs(m => [...m, { role:"bot", text:"Something went wrong. Reach us at info@accountafit.com" }]); }
    setLoading(false);
  };

  const QUICK = ["How does matching work?", "What sports does AI support?", "Is it free?"];
  return (
    <>
      {open && (
        <div className="af-chat-win">
          <div className="af-chat-hd">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="af-av" style={{width:34,height:34,fontSize:11}}>P</div>
              <div>
                <div style={{fontWeight:600,fontSize:13,color:"var(--frost)",fontFamily:"'Inter',sans-serif"}}>PACT Assistant</div>
                <div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e"}}/>
                  <span style={{fontSize:".62rem",color:"#22c55e",letterSpacing:".08em",fontFamily:"'JetBrains Mono',monospace"}}>ONLINE</span>
                </div>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",cursor:"pointer",fontSize:"1.2rem",lineHeight:1,padding:4}}>✕</button>
          </div>
          <div className="af-chat-msgs" ref={ref}>
            {msgs.map((m,i) => m.role==="bot"
              ? <div key={i} className="af-msg-bot"><div className="af-av">P</div><div className="af-bubble-bot">{m.text}</div></div>
              : <div key={i} className="af-msg-user"><div className="af-bubble-user">{m.text}</div></div>
            )}
            {loading && <div className="af-msg-bot"><div className="af-av">P</div><div style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"10px 16px",display:"flex",gap:4}}><div className="af-dot"/><div className="af-dot"/><div className="af-dot"/></div></div>}
          </div>
          {msgs.length===1 && (
            <div style={{padding:"0 14px 10px",display:"flex",flexWrap:"wrap",gap:6}}>
              {QUICK.map(q => <button key={q} onClick={()=>send(q)} style={{background:"rgba(59,123,255,.1)",border:"1px solid rgba(59,123,255,.25)",borderRadius:100,color:"var(--blue2)",fontSize:11,padding:"5px 10px",cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>{q}</button>)}
            </div>
          )}
          <div className="af-chat-inp">
            <input className="af-inp" type="text" placeholder={t.chatPH} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
            <button className="af-send" onClick={()=>send()} disabled={loading}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
      <button className={`af-chat-btn${open?" open":""}`} onClick={()=>setOpen(o=>!o)}>
        {open
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span style={{color:"rgba(255,255,255,.9)",fontFamily:"'JetBrains Mono',monospace",fontWeight:500,fontSize:".76rem",letterSpacing:".1em",textTransform:"uppercase"}}>Ask PACT AI</span>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px rgba(34,197,94,.6)"}}/>
            </>
        }
      </button>
    </>
  );
}

/* ─────────────────────────────────────────────
   WAITLIST FORM
───────────────────────────────────────────── */
function WaitlistForm({ placeholder = "Enter your email", btnText = "Join the Waitlist", fullWidth = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mnjwagoo", {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify({ email, _subject:"PACT Waitlist Signup", message:`New PACT waitlist signup: ${email}` }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div style={{background:"rgba(59,123,255,.1)",border:"1px solid rgba(59,123,255,.3)",borderRadius:100,padding:"16px 32px",textAlign:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:".76rem",letterSpacing:".1em",color:"#93C5FD"}}>
      YOU'RE ON THE LIST — WE'LL BE IN TOUCH
    </div>
  );

  return (
    <form onSubmit={submit} style={{display:"flex",gap:12,flexWrap:"wrap",width:fullWidth?"100%":undefined}}>
      <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder={placeholder}
        style={{flex:"1 1 240px",minWidth:200,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:100,color:"var(--frost)",fontFamily:"'Inter',sans-serif",fontSize:14,padding:"14px 22px",outline:"none",transition:"border-color .2s"}}
        onFocus={e=>e.target.style.borderColor="rgba(59,123,255,.5)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.12)"}/>
      <button type="submit" className="btn-primary" style={{opacity:status==="loading"?.6:1}}>
        {status==="loading" ? "JOINING..." : btnText}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   FAQ ROW
───────────────────────────────────────────── */
function FaqRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-row${open?" open":""}`}>
      <button className="faq-btn" onClick={()=>setOpen(o=>!o)}>
        <span className="faq-q">{q}</span>
        <span className="faq-icon" style={{transform:open?"rotate(45deg)":"none",display:"inline-block"}}>+</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   LANG SWITCHER
───────────────────────────────────────────── */
function LangSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{position:"relative"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:6,background:"var(--glass-1)",border:"1px solid var(--glass-border)",borderRadius:100,padding:"7px 14px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:".65rem",letterSpacing:".08em",color:"var(--gray)",transition:"all .2s",backdropFilter:"var(--blur-sm)"}}>
        <span>{LANGS[lang].flag}</span><span>{LANGS[lang].name}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:"rgba(7,11,22,.97)",border:"1px solid rgba(255,255,255,.1)",borderRadius:var_r_md,padding:"6px 0",minWidth:170,zIndex:999,boxShadow:"0 20px 50px rgba(0,0,0,.7)",backdropFilter:"blur(24px)"}}>
          {Object.entries(LANGS).map(([code,{name,flag}]) => (
            <button key={code} onClick={()=>{setLang(code);setOpen(false);}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",background:code===lang?"rgba(59,123,255,.12)":"none",border:"none",cursor:"pointer",padding:"9px 16px",color:code===lang?"var(--blue2)":"var(--gray)",fontFamily:"'Inter',sans-serif",fontSize:".85rem",transition:"background .15s"}}>
              <span style={{fontSize:"1rem"}}>{flag}</span>{name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
const var_r_md = "var(--r-md)";

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ lang, setLang, t, onWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };
  const IDS = ["our-story","features","how","faq"];
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,padding:"0 5%",background:scrolled?"rgba(5,9,15,.9)":"transparent",backdropFilter:scrolled?"blur(28px)":"none",WebkitBackdropFilter:scrolled?"blur(28px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,.07)":"none",transition:"all .35s ease"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:70}}>
        {/* Logo */}
        <a href="/" style={{display:"flex",alignItems:"center",flexShrink:0}}>
          <img src="/images/pact-logo-full.webp" alt="PACT" style={{height:40,width:"auto",filter:"drop-shadow(0 0 10px rgba(59,123,255,.45))",mixBlendMode:"lighten"}}/>
        </a>
        {/* Desktop links */}
        <div className="hide-m" style={{display:"flex",alignItems:"center",gap:32}}>
          {t.nav.map((label,i) => <button key={i} className="nav-link" onClick={()=>scrollTo(IDS[i])}>{label}</button>)}
        </div>
        <div className="hide-m" style={{display:"flex",alignItems:"center",gap:14}}>
          <LangSwitcher lang={lang} setLang={setLang}/>
          <button className="btn-primary" onClick={onWaitlist} style={{padding:"10px 24px",fontSize:".72rem"}}>{t.joinWaitlist}</button>
        </div>
        {/* Mobile */}
        <div className="hide-d" style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",color:"var(--frost)",fontSize:"1.5rem",cursor:"pointer",lineHeight:1,padding:4}}>{menuOpen?"✕":"☰"}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="hide-d" style={{background:"rgba(5,9,15,.98)",backdropFilter:"blur(28px)",borderTop:"1px solid rgba(255,255,255,.07)",padding:"24px 5% 32px",display:"flex",flexDirection:"column",gap:18}}>
          {t.nav.map((label,i) => <button key={i} onClick={()=>scrollTo(IDS[i])} style={{background:"none",border:"none",color:"var(--frost)",fontFamily:"'Inter',sans-serif",fontSize:"1.05rem",textAlign:"left",cursor:"pointer",padding:"4px 0"}}>{label}</button>)}
          <button className="btn-primary" onClick={()=>{onWaitlist();setMenuOpen(false);}} style={{width:"100%"}}>{t.joinWaitlist}</button>
          <LangSwitcher lang={lang} setLang={setLang}/>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero({ t, onWaitlist }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <section style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:70}}>
      {/* Ring decorations */}
      <div style={{position:"absolute",top:"50%",left:"40%",transform:"translate(-50%,-50%)",width:"90vw",height:"90vw",maxWidth:900,maxHeight:900,borderRadius:"50%",border:"1px solid rgba(59,123,255,.06)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"40%",transform:"translate(-50%,-50%)",width:"58vw",height:"58vw",maxWidth:600,maxHeight:600,borderRadius:"50%",border:"1px solid rgba(0,212,255,.05)",pointerEvents:"none"}}/>

      <div className="wrap" style={{position:"relative",zIndex:2,width:"100%",paddingTop:8,paddingBottom:40}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 400px",gap:56,alignItems:"center"}} className="two-col">
          {/* Left */}
          <div style={{animation:"fadeUp .8s ease both"}}>
            {/* Badge */}
            <div style={{marginBottom:22}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(59,123,255,.1)",border:"1px solid rgba(59,123,255,.22)",borderRadius:100,padding:"6px 18px"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"var(--cyan)",animation:"glow 2s ease infinite"}}/>
                <span className="mono" style={{fontSize:".62rem",letterSpacing:".2em",color:"var(--cyan)"}}>{t.heroBadge}</span>
              </div>
            </div>
            {/* Headline */}
            <h1 className="hero-h1 raj" style={{fontSize:"clamp(3.8rem,8.5vw,7rem)",fontWeight:700,lineHeight:.92,letterSpacing:".02em",marginBottom:24}}>
              <span style={{display:"block",color:"var(--frost)"}}>{t.heroH1a}</span>
              <span style={{display:"block",background:"linear-gradient(135deg,#3B7BFF 0%,#00D4FF 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{t.heroH1b}</span>
              <span style={{display:"block",color:"var(--frost)"}}>{t.heroH1c}</span>
            </h1>
            <p style={{fontSize:"1.05rem",color:"var(--gray)",lineHeight:1.8,maxWidth:480,marginBottom:34}}>{t.heroSub}</p>
            <div className="hero-btns" style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:40}}>
              <button className="btn-primary" onClick={onWaitlist}>{t.heroCTA}</button>
              <button className="btn-ghost" onClick={()=>scrollTo("how")}>{t.heroGhost}</button>
            </div>
            {/* Stats */}
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              {[[t.stat1v,t.stat1l],[t.stat2v,t.stat2l],[t.stat3v,t.stat3l]].map(([v,l]) => (
                <div key={l} className="stat-pill">
                  <span className="raj" style={{fontWeight:700,fontSize:"1.9rem",background:"linear-gradient(135deg,#3B7BFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",lineHeight:1}}>{v}</span>
                  <span className="mono" style={{fontSize:".6rem",color:"var(--gray2)",letterSpacing:".08em",textAlign:"center"}}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — app preview cards */}
          <div className="hide-m" style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {tag:"MATCH", label:"Jordan, 29", sub:"Denver · 15 mi away · Powerlifting", accent:"var(--blue2)", bg:"rgba(59,123,255,.12)", border:"rgba(59,123,255,.25)"},
              {tag:"WOD",   label:"King/Queen of the WOD", sub:"Iron Hour · For Time · Today", accent:"var(--cyan)", bg:"rgba(0,212,255,.08)", border:"rgba(0,212,255,.2)"},
              {tag:"AI",    label:"12-Week CrossFit Program", sub:"Generating with AI coach...", accent:"#A78BFA", bg:"rgba(124,92,252,.1)", border:"rgba(124,92,252,.22)"},
            ].map((card,i) => (
              <div key={i} className="glass-card" style={{padding:"18px 20px",display:"flex",alignItems:"center",gap:16,animation:`fadeUp .6s ease ${i*.12}s both`,border:`1px solid ${card.border}`}}>
                <div style={{width:44,height:44,borderRadius:12,background:card.bg,border:`1px solid ${card.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:".52rem",color:card.accent,flexShrink:0,letterSpacing:".08em",fontWeight:500}}>{card.tag}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="raj" style={{fontWeight:700,fontSize:"1rem",color:"var(--frost)",marginBottom:3,lineHeight:1.2}}>{card.label}</div>
                  <div style={{fontSize:".75rem",color:"var(--gray2)"}}>{card.sub}</div>
                </div>
                <div style={{width:8,height:8,borderRadius:"50%",background:card.accent,animation:"glow 2s ease infinite",flexShrink:0}}/>
              </div>
            ))}
            {/* Mini stat strip */}
            <div className="glass-card" style={{padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              {[["MATCH","Active Pacts"],["200+","Workouts"],["12","Sports"]].map(([v,l]) => (
                <div key={l} style={{textAlign:"center"}}>
                  <div className="raj" style={{fontWeight:700,fontSize:"1.25rem",color:"var(--blue2)"}}>{v}</div>
                  <div className="mono" style={{fontSize:".56rem",color:"var(--gray2)",letterSpacing:".08em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
function Marquee() {
  const items = ["Partner Matching","AI Programs","200+ Workouts","Daily Leaderboard","Communities","Goals & Events","Personal Records","Schedule Tracking","12+ Sports","Make Your Pact"];
  return (
    <div style={{overflow:"hidden",padding:"24px 0",borderTop:"1px solid rgba(255,255,255,.06)",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
      <div className="marquee-track">
        {[...items,...items].map((item,i) => (
          <div key={i} className={`marquee-item${i%5===1?" hi":""}`}>
            <span>{item}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INTRO — AccountaFit presents PACT
───────────────────────────────────────────── */
function Intro({ t }) {
  return (
    <section className="sec" id="our-story">
      <div className="wrap">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}} className="two-col">
          {/* Left — the story */}
          <div>
            <div className="mono" style={{fontSize:".62rem",letterSpacing:".22em",color:"var(--cyan)",marginBottom:6,display:"flex",alignItems:"center",gap:8}}>
              <span style={{display:"block",width:18,height:1.5,background:"var(--cyan)",flexShrink:0}}/>
              ACCOUNTAFIT CORP
            </div>
            <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.2rem,4vw,3.2rem)",lineHeight:1.02,letterSpacing:".02em",color:"var(--frost)",marginBottom:20}}>
              We set out to solve fitness.<br/>
              We discovered the real problem<br/>
              was <span style={{background:"linear-gradient(135deg,#3B7BFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>doing it alone.</span>
            </h2>
            <p style={{fontSize:"1rem",color:"var(--gray)",lineHeight:1.85,marginBottom:20}}>
              AccountaFit Corp spent years studying why people fail fitness. Not the workouts. Not the diet plans. Not the apps. The answer was always the same: no one was holding them accountable.
            </p>
            <p style={{fontSize:"1rem",color:"var(--gray)",lineHeight:1.85,marginBottom:32}}>
              So we built <strong style={{color:"var(--frost)",fontWeight:600}}>PACT</strong> — the world's first fitness accountability matching platform. Find your partner. Make your pact. Never start over.
            </p>
            <div style={{display:"flex",alignItems:"center",gap:16,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{display:"flex",flexDirection:"column",gap:2}}>
                <span className="raj" style={{fontWeight:700,fontSize:"1.6rem",color:"var(--blue2)",lineHeight:1}}>2026</span>
                <span className="mono" style={{fontSize:".56rem",color:"var(--gray2)",letterSpacing:".1em"}}>FOUNDED</span>
              </div>
              <div style={{width:1,height:36,background:"rgba(255,255,255,.1)"}}/>
              <div style={{display:"flex",flexDirection:"column",gap:2}}>
                <span className="raj" style={{fontWeight:700,fontSize:"1.6rem",color:"var(--blue2)",lineHeight:1}}>PACT</span>
                <span className="mono" style={{fontSize:".56rem",color:"var(--gray2)",letterSpacing:".1em"}}>FLAGSHIP PRODUCT</span>
              </div>
            </div>
          </div>
          {/* Right — what PACT is */}
          <div>
            <div className="eyebrow">{t.introEyebrow}</div>
            <h3 className="raj" style={{fontWeight:700,fontSize:"clamp(2rem,3.5vw,2.8rem)",lineHeight:1.02,letterSpacing:".02em",marginBottom:20}}>
              <span style={{color:"var(--frost)"}}>{t.introH1}</span><br/>
              <span style={{background:"linear-gradient(135deg,#3B7BFF 0%,#00D4FF 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{t.introH2}</span><br/>
              <span style={{color:"var(--frost)"}}>{t.introH3}</span>
            </h3>
            <p style={{fontSize:".98rem",color:"var(--gray)",lineHeight:1.85,marginBottom:16}}>{t.introSub}</p>
            <p style={{fontSize:"1.05rem",color:"var(--frost)",fontStyle:"italic",marginBottom:28}}>"{t.introSub2}"</p>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",background:"rgba(59,123,255,.08)",border:"1px solid rgba(59,123,255,.18)",borderRadius:12}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"var(--cyan)",animation:"glow 2s ease infinite",flexShrink:0}}/>
              <span className="mono" style={{fontSize:".62rem",color:"var(--cyan)",letterSpacing:".14em"}}>iOS & ANDROID — COMING SOON · JOIN THE WAITLIST FOR FIRST ACCESS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks({ t }) {
  return (
    <>
      <div className="divider"/>
      <section className="sec" id="how">
        <div className="wrap">
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
            <div>
              <div className="eyebrow">{t.howEyebrow}</div>
              <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.4rem,4.5vw,3.4rem)",lineHeight:1,letterSpacing:".02em",marginBottom:52,whiteSpace:"pre-line"}}>{t.howH}</h2>
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                {t.steps.map((s,i,arr) => (
                  <div key={s.n} style={{display:"flex",gap:20,position:"relative",paddingBottom:i<arr.length-1?40:0}}>
                    {i<arr.length-1 && <div style={{position:"absolute",left:25,top:50,bottom:0,width:1.5,background:"linear-gradient(180deg,rgba(59,123,255,.3) 0%,transparent 100%)"}}/>}
                    <div className="step-num" style={{zIndex:1,flexShrink:0}}>{s.n}</div>
                    <div style={{paddingTop:10}}>
                      <h3 className="raj" style={{fontWeight:700,fontSize:"1.2rem",letterSpacing:".02em",marginBottom:8,color:"var(--frost)"}}>{s.title}</h3>
                      <p style={{color:"var(--gray)",fontSize:".9rem",lineHeight:1.78}}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual */}
            <div className="hide-m" style={{position:"relative"}}>
              <div style={{position:"absolute",inset:"-40px",background:"radial-gradient(ellipse 65% 70% at 50% 50%,rgba(0,212,255,.14) 0%,transparent 70%)",pointerEvents:"none"}}/>
              <div className="glass" style={{padding:32}}>
                <div className="mono" style={{fontSize:".6rem",letterSpacing:".18em",color:"var(--cyan)",marginBottom:20}}>TRAINING SCHEDULE</div>
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day,i) => (
                  <div key={day} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div className="mono" style={{width:36,fontSize:".62rem",color:i===5?"var(--blue2)":"var(--gray3)",letterSpacing:".08em"}}>{day}</div>
                    <div style={{flex:1,height:8,borderRadius:4,background:i===5?"linear-gradient(90deg,#3B7BFF,#00D4FF)":i%2===0?"rgba(59,123,255,.18)":"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.06)"}}/>
                    {i<5&&i%2===0&&<div style={{width:6,height:6,borderRadius:"50%",background:"#34D399"}}/>}
                    {i===5&&<div className="mono" style={{fontSize:".52rem",color:"var(--blue2)",letterSpacing:".08em"}}>TODAY</div>}
                  </div>
                ))}
                <div style={{marginTop:20,padding:"14px 18px",background:"rgba(59,123,255,.1)",border:"1px solid rgba(59,123,255,.22)",borderRadius:14}}>
                  <div className="raj" style={{fontWeight:700,fontSize:"1rem",color:"var(--frost)",marginBottom:4}}>Iron Hour</div>
                  <div style={{fontSize:".76rem",color:"var(--gray2)"}}>For Time · 1000m Row · 50 Thrusters · 30 Box Jumps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   FEATURES — Hub & spoke expand layout
───────────────────────────────────────────── */
const FEAT_ICONS_SVG = {
  match:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="3.2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a3.2 3.2 0 0 1 0 6.2"/></svg>,
  ai:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>,
  wod:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  cal:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  lib:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  comm:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  goals:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  pr:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  chat:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
};

const FEAT_DATA = [
  { key:"match",  title:"Smart Partner Matching",  body:"Paired by sport, goals, schedule, and intensity. Swipe through profiles, connect with someone at your level, and make a pact you will not break.",          accent:"#3B7BFF" },
  { key:"ai",     title:"AI Program Builder",      body:"Generate fully personalized training programs across 12+ sports. Choose your phase — Base Build Peak, Aggressive, or Maintenance — and PACT's AI writes the plan.", accent:"#00D4FF" },
  { key:"wod",    title:"King / Queen of the WOD", body:"A new benchmark every day. Log your score, compete on the real-time leaderboard, and claim the throne. King or Queen of the Workout — your title to earn.", accent:"#5B94FF" },
  { key:"cal",    title:"Schedule & Calendar",     body:"Plan your entire training week in one place. Add workouts, set goals, log habits, and sync events. Your calendar moves with your commitment.",                accent:"#3B7BFF" },
  { key:"lib",    title:"Workout Library",         body:"200+ pre-built workouts across Bodybuilding, CrossFit, Hyrox, Powerlifting and more — each ready to log, share with your partner, or drop into your schedule.", accent:"#00D4FF" },
  { key:"comm",   title:"Communities",             body:"Join or create Communities around your gym, sport, or training style. Shared workouts, group chats, leaderboards, and collective progress — all in one space.", accent:"#5B94FF" },
  { key:"goals",  title:"Goals & Events",          body:"Set fitness goals, register for upcoming events, and track daily habits all in one unified hub. See your progress accumulate day by day.",                    accent:"#3B7BFF" },
  { key:"pr",     title:"Personal Records",        body:"Search, add, and manage your PRs across every movement. Watch your strength story grow week over week and share milestones with your accountability partner.",  accent:"#00D4FF" },
  { key:"chat",   title:"Direct Partner Chat",     body:"A private, direct line to your accountability partner. No feed noise. No distractions. Just the two of you staying on track — every single day.",           accent:"#3B7BFF" },
];

function Features({ t }) {
  const [active, setActive] = useState(null);
  const feat = active !== null ? FEAT_DATA[active] : null;
  return (
    <>
      <div className="divider"/>
      <section className="sec" id="features">
        <div className="wrap">
          <div style={{textAlign:"center",marginBottom:52}}>
            <div className="eyebrow" style={{justifyContent:"center",display:"flex"}}>{t.featEyebrow}</div>
            <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.4rem,4.5vw,3.4rem)",lineHeight:1,letterSpacing:".02em",whiteSpace:"pre-line"}}>{t.featH}</h2>
            <p style={{color:"var(--gray2)",fontSize:".88rem",marginTop:14}}>Tap any feature to learn more</p>
          </div>

          {/* Hub layout */}
          <div style={{display:"flex",gap:32,alignItems:"flex-start",flexWrap:"wrap"}}>
            {/* Left — feature buttons */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,flex:"1 1 400px",minWidth:0}}>
              {FEAT_DATA.map((f,i) => (
                <button key={f.key} onClick={()=>setActive(active===i?null:i)}
                  style={{
                    display:"flex",alignItems:"center",gap:12,
                    padding:"16px 18px",
                    background: active===i ? `${f.accent}18` : "var(--glass-1)",
                    border: `1px solid ${active===i ? f.accent+"55" : "rgba(255,255,255,.08)"}`,
                    borderRadius:14,cursor:"pointer",textAlign:"left",
                    transition:"all .2s ease",
                  }}
                  onMouseEnter={e=>{if(active!==i){e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.borderColor="rgba(255,255,255,.14)"}}}
                  onMouseLeave={e=>{if(active!==i){e.currentTarget.style.background="var(--glass-1)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)"}}}>
                  <div style={{width:36,height:36,borderRadius:10,background:`${f.accent}18`,border:`1px solid ${f.accent}30`,display:"flex",alignItems:"center",justifyContent:"center",color:f.accent,flexShrink:0}}>{FEAT_ICONS_SVG[f.key]}</div>
                  <div style={{minWidth:0}}>
                    <div className="raj" style={{fontWeight:700,fontSize:".95rem",color: active===i ? f.accent : "var(--frost)",lineHeight:1.2,letterSpacing:".01em"}}>{f.title}</div>
                  </div>
                  <div style={{marginLeft:"auto",width:16,height:16,borderRadius:"50%",border:`1.5px solid ${active===i ? f.accent : "rgba(255,255,255,.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
                    <div style={{fontSize:"10px",color:active===i?f.accent:"rgba(255,255,255,.4)",lineHeight:1,transform:active===i?"rotate(45deg)":"none",transition:"transform .2s"}}>+</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right — detail panel */}
            <div style={{flex:"0 0 340px",minWidth:280,position:"sticky",top:88}}>
              {feat ? (
                <div className="glass-card" style={{padding:"32px 28px",border:`1px solid ${feat.accent}40`,transition:"all .3s ease"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,paddingBottom:18,borderBottom:"1px solid rgba(255,255,255,.07)"}}>
                    <div style={{width:52,height:52,borderRadius:14,background:`${feat.accent}18`,border:`1px solid ${feat.accent}30`,display:"flex",alignItems:"center",justifyContent:"center",color:feat.accent,flexShrink:0}}>{FEAT_ICONS_SVG[feat.key]}</div>
                    <h3 className="raj" style={{fontWeight:700,fontSize:"1.25rem",color:feat.accent,letterSpacing:".02em",lineHeight:1.1}}>{feat.title}</h3>
                  </div>
                  <p style={{fontSize:".95rem",color:"var(--gray)",lineHeight:1.82}}>{feat.body}</p>
                  <div style={{marginTop:20,display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:feat.accent}}/>
                    <span className="mono" style={{fontSize:".6rem",color:"var(--gray3)",letterSpacing:".12em"}}>INCLUDED IN PACT · FREE TIER AVAILABLE</span>
                  </div>
                </div>
              ) : (
                <div style={{padding:"40px 28px",textAlign:"center",background:"rgba(255,255,255,.02)",border:"1px dashed rgba(255,255,255,.08)",borderRadius:16}}>
                  <div style={{fontSize:"2rem",marginBottom:14,opacity:.4}}>↖</div>
                  <p className="mono" style={{fontSize:".72rem",color:"var(--gray3)",letterSpacing:".12em",lineHeight:1.6}}>SELECT A FEATURE<br/>TO SEE DETAILS</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   AI PROGRAMS
───────────────────────────────────────────── */
function Programs({ t }) {
  return (
    <>
      <div className="divider"/>
      <section className="sec" id="programs">
        <div className="wrap">
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
            <div>
              <div className="eyebrow">{t.progEyebrow}</div>
              <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.4rem,4.5vw,3.4rem)",lineHeight:1,letterSpacing:".02em",marginBottom:20,whiteSpace:"pre-line"}}>{t.progH}</h2>
              <p style={{fontSize:"1rem",color:"var(--gray)",lineHeight:1.82,marginBottom:32}}>{t.progSub}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:36}}>
                {t.sports.map(s => (
                  <div key={s} style={{display:"inline-flex",alignItems:"center",background:"rgba(59,123,255,.08)",border:"1px solid rgba(59,123,255,.18)",borderRadius:100,padding:"6px 14px",fontFamily:"'Inter',sans-serif",fontSize:".78rem",color:"var(--gray)",transition:"all .2s",cursor:"default"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(59,123,255,.18)";e.currentTarget.style.color="var(--frost)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(59,123,255,.08)";e.currentTarget.style.color="var(--gray)"}}>{s}</div>
                ))}
              </div>
              <div style={{display:"flex",gap:12}}>
                <span className="tag tag-blue">12+ Sports</span>
                <span className="tag tag-cyan">AI Powered</span>
                <span className="tag tag-purple">Periodized</span>
              </div>
            </div>
            <div className="hide-m" style={{position:"relative"}}>
              <div style={{position:"absolute",inset:"-40px",background:"radial-gradient(ellipse 60% 70% at 50% 50%,rgba(59,123,255,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
              <div className="glass" style={{padding:28}}>
                <div className="mono" style={{fontSize:".6rem",letterSpacing:".18em",color:"var(--blue2)",marginBottom:20}}>BUILD A PROGRAM</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
                  {[["CF","CrossFit","var(--cyan)"],["BB","Bodybuilding","var(--blue2)"],["HX","Hyrox","#FBBF24"],["PL","Powerlifting","#A78BFA"],["RN","Running","#34D399"],["OL","Olympic Lifting","#FB923C"]].map(([code,label,color]) => (
                    <div key={code} style={{background:"rgba(255,255,255,.04)",border:`1px solid ${color}2a`,borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:10}}>
                      <div className="mono" style={{fontSize:".52rem",color,width:28,height:28,borderRadius:8,background:`${color}1a`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{code}</div>
                      <span style={{fontSize:".78rem",color:"var(--gray)"}}>{label}</span>
                    </div>
                  ))}
                </div>
                <div style={{background:"linear-gradient(135deg,rgba(59,123,255,.14),rgba(0,212,255,.07))",border:"1px solid rgba(59,123,255,.28)",borderRadius:14,padding:"14px 18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span className="raj" style={{fontWeight:700,fontSize:"1rem",color:"var(--frost)"}}>Generating Program</span>
                    <span className="mono" style={{fontSize:".62rem",color:"var(--cyan)"}}>AI</span>
                  </div>
                  <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,.08)",overflow:"hidden"}}>
                    <div style={{height:"100%",width:"68%",borderRadius:3,background:"linear-gradient(90deg,#3B7BFF,#00D4FF)",animation:"glow 2s ease infinite"}}/>
                  </div>
                  <div style={{fontSize:".74rem",color:"var(--gray2)",marginTop:8}}>Writing week 1 workouts for CrossFit · Base Build phase...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   WORKOUT LIBRARY
───────────────────────────────────────────── */
function Library({ t }) {
  return (
    <>
      <div className="divider"/>
      <section className="sec">
        <div className="wrap">
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
            <div className="hide-m" style={{position:"relative"}}>
              <div style={{position:"absolute",inset:"-40px",background:"radial-gradient(ellipse 60% 70% at 50% 50%,rgba(124,92,252,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
              <div className="glass" style={{padding:28}}>
                <div className="mono" style={{fontSize:".6rem",letterSpacing:".18em",color:"#A78BFA",marginBottom:16}}>WORKOUT LIBRARY</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
                  {[["All","var(--blue2)"],["Hyrox","var(--cyan)"],["CrossFit","#34D399"],["Powerlifting","#A78BFA"]].map(([l,c],i)=>(
                    <div key={l} style={{padding:"4px 12px",borderRadius:100,fontFamily:"'JetBrains Mono',monospace",fontSize:".56rem",letterSpacing:".08em",background:i===0?"rgba(59,123,255,.2)":"rgba(255,255,255,.05)",border:`1px solid ${i===0?"rgba(59,123,255,.38)":"rgba(255,255,255,.1)"}`,color:i===0?"var(--blue2)":"var(--gray2)"}}>{l}</div>
                  ))}
                </div>
                {[
                  {tag:"HYROX",name:"HYROX Individual Open",detail:"90 min · For Time",color:"var(--cyan)"},
                  {tag:"HYROX",name:"HYROX Individual Pro",detail:"75 min · For Time",color:"var(--cyan)"},
                  {tag:"CF",name:"Iron Hour",detail:"20 min cap · For Time",color:"#34D399"},
                  {tag:"PL",name:"5/3/1 Week 1",detail:"Strength · 4 sets",color:"#A78BFA"},
                ].map((w,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                    <div style={{width:36,height:36,borderRadius:9,background:`${w.color}18`,border:`1px solid ${w.color}2a`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:".5rem",color:w.color,flexShrink:0}}>{w.tag}</div>
                    <div>
                      <div style={{fontWeight:600,fontSize:".84rem",color:"var(--frost)",marginBottom:2}}>{w.name}</div>
                      <div className="mono" style={{fontSize:".6rem",color:"var(--gray2)",letterSpacing:".06em"}}>{w.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow">{t.libEyebrow}</div>
              <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.4rem,4.5vw,3.4rem)",lineHeight:1,letterSpacing:".02em",marginBottom:20,whiteSpace:"pre-line"}}>{t.libH}</h2>
              <p style={{fontSize:"1rem",color:"var(--gray)",lineHeight:1.82,marginBottom:32}}>{t.libSub}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:28}}>
                {[["Bodybuilding","tag-amber"],["CrossFit","tag-green"],["Hyrox","tag-cyan"],["Powerlifting","tag-purple"],["Running","tag-blue"]].map(([l,c])=>(
                  <span key={l} className={`tag ${c}`}>{l}</span>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[["200+","Saved Benchmarks","var(--blue2)"],["12+","Sport Categories","var(--cyan)"]].map(([v,l,c])=>(
                  <div key={l} style={{background:"var(--glass-1)",border:"1px solid var(--glass-border)",borderRadius:"var(--r-sm)",padding:"20px 18px"}}>
                    <div className="raj" style={{fontWeight:700,fontSize:"2rem",color:c,lineHeight:1}}>{v}</div>
                    <div className="mono" style={{fontSize:".72rem",color:"var(--gray2)",marginTop:4,letterSpacing:".08em"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   COMMUNITY
───────────────────────────────────────────── */
function Community({ t }) {
  return (
    <>
      <div className="divider"/>
      <section className="sec" id="community">
        <div className="wrap">
          <div style={{textAlign:"center",maxWidth:640,margin:"0 auto",marginBottom:64}}>
            <div className="eyebrow" style={{justifyContent:"center",display:"flex"}}>{t.commEyebrow}</div>
            <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.4rem,4.5vw,3.4rem)",lineHeight:1,letterSpacing:".02em",marginBottom:16,whiteSpace:"pre-line"}}>{t.commH}</h2>
            <p style={{color:"var(--gray)",fontSize:"1rem",lineHeight:1.82}}>{t.commSub}</p>
          </div>
          <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {t.commCards.map((card,i)=>(
                <div key={i} className="glass-card" style={{padding:"22px 24px",display:"flex",gap:18,alignItems:"flex-start"}}>
                  <div style={{width:44,height:44,borderRadius:12,background:"rgba(124,92,252,.12)",border:"1px solid rgba(124,92,252,.22)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:".5rem",letterSpacing:".1em",color:"#A78BFA",flexShrink:0}}>{card.tag}</div>
                  <div>
                    <h3 className="raj" style={{fontWeight:700,fontSize:"1.05rem",letterSpacing:".02em",marginBottom:5,color:"var(--frost)"}}>{card.title}</h3>
                    <p style={{color:"var(--gray)",fontSize:".88rem",lineHeight:1.7}}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hide-m" style={{position:"relative"}}>
              <div style={{position:"absolute",inset:"-40px",background:"radial-gradient(ellipse 60% 70% at 50% 50%,rgba(124,92,252,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
              <div className="glass" style={{padding:28}}>
                <div className="mono" style={{fontSize:".6rem",letterSpacing:".18em",color:"#A78BFA",marginBottom:20}}>COMMUNITIES</div>
                {[
                  {name:"PR Star Barbell",members:24,tag:"Powerlifting",online:8},
                  {name:"Hyrox DC Crew",members:61,tag:"Hyrox",online:14},
                  {name:"CrossFit Capital",members:38,tag:"CrossFit",online:5},
                ].map((c,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:42,height:42,borderRadius:12,background:"rgba(124,92,252,.12)",border:"1px solid rgba(124,92,252,.22)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:"1.1rem",color:"#A78BFA",flexShrink:0}}>{c.name[0]}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:600,fontSize:".85rem",color:"var(--frost)",marginBottom:3}}>{c.name}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span className="mono" style={{fontSize:".58rem",color:"var(--gray2)"}}>{c.members} members</span>
                        <span style={{width:3,height:3,borderRadius:"50%",background:"var(--gray3)",display:"inline-block"}}/>
                        <span className="mono" style={{fontSize:".58rem",color:"#34D399"}}>{c.online} online</span>
                      </div>
                    </div>
                    <div style={{padding:"4px 10px",borderRadius:100,background:"rgba(124,92,252,.12)",border:"1px solid rgba(124,92,252,.22)",fontFamily:"'JetBrains Mono',monospace",fontSize:".52rem",color:"#A78BFA"}}>JOIN</div>
                  </div>
                ))}
                <div style={{padding:"10px 16px",background:"rgba(59,123,255,.08)",border:"1px solid rgba(59,123,255,.18)",borderRadius:12,display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"var(--blue2)",flexShrink:0}}/>
                  <span style={{fontSize:".78rem",color:"var(--gray2)"}}>New workout posted in PR Star Barbell</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   WAITLIST
───────────────────────────────────────────── */
function Waitlist({ t }) {
  return (
    <>
      <div className="divider"/>
      <section className="sec" id="waitlist">
        <div className="wrap">
          <div className="glass" style={{padding:"80px 60px",textAlign:"center",background:"linear-gradient(135deg,rgba(59,123,255,.09) 0%,rgba(0,212,255,.05) 100%)",border:"1px solid rgba(59,123,255,.2)"}}>
            <div className="eyebrow" style={{justifyContent:"center",display:"flex"}}>{t.waitlistEyebrow}</div>
            <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.2rem,5vw,3.6rem)",lineHeight:1.05,letterSpacing:".02em",marginBottom:16,color:"var(--frost)"}}>{t.waitlistH}</h2>
            <p style={{color:"var(--gray)",fontSize:"1.05rem",lineHeight:1.82,maxWidth:520,margin:"0 auto 40px"}}>{t.waitlistSub}</p>
            <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <WaitlistForm placeholder={t.emailPH} btnText={t.joinBtn}/>
            </div>
            <p className="mono" style={{fontSize:".62rem",letterSpacing:".14em",color:"var(--gray3)"}}>{t.waitlistNote}</p>
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
  return (
    <>
      <div className="divider"/>
      <section className="sec" id="faq">
        <div className="wrap">
          <div className="faq-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.7fr",gap:80,alignItems:"start"}}>
            <div>
              <div className="eyebrow">{t.faqEyebrow}</div>
              <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.2rem,4vw,3rem)",lineHeight:1.05,letterSpacing:".02em",marginBottom:14,color:"var(--frost)"}}>{t.faqH}</h2>
              <p style={{color:"var(--gray)",fontSize:".95rem",lineHeight:1.78}}>{t.faqSub}</p>
            </div>
            <div>{t.faqs.map(f => <FaqRow key={f.q} q={f.q} a={f.a}/>)}</div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <>
      <div className="divider"/>
      <footer style={{padding:"44px 5% 32px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          {/* Top row: logo + tagline left, links right */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:32,marginBottom:36}}>
            {/* Brand */}
            <div style={{maxWidth:300}}>
              <div style={{marginBottom:14}}>
                <img src="/images/pact-logo-full.webp" alt="PACT" style={{height:34,width:"auto",filter:"drop-shadow(0 0 8px rgba(59,123,255,.4))",mixBlendMode:"lighten"}}/>
              </div>
              <p style={{color:"var(--gray2)",fontSize:".84rem",lineHeight:1.72,marginBottom:10}}>The fitness accountability partner-matching platform. Find your partner. Make your pact. Never start over.</p>
              <div className="mono" style={{fontSize:".56rem",letterSpacing:".12em",color:"var(--gray3)"}}>BUILT BY ACCOUNTAFIT CORP</div>
            </div>
            {/* All links horizontal */}
            <div style={{display:"flex",flexWrap:"wrap",gap:40,alignItems:"flex-start"}}>
              <div>
                <div className="mono" style={{fontSize:".56rem",letterSpacing:".18em",color:"var(--gray3)",marginBottom:14}}>PRODUCT</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"6px 20px"}}>
                  {["Features","How It Works","AI Programs","Workout Library","Communities"].map(l=>(
                    <div key={l} style={{color:"var(--gray2)",fontSize:".84rem",cursor:"pointer",transition:"color .2s",whiteSpace:"nowrap"}}
                      onMouseEnter={e=>e.target.style.color="var(--frost)"} onMouseLeave={e=>e.target.style.color="var(--gray2)"}>{l}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mono" style={{fontSize:".56rem",letterSpacing:".18em",color:"var(--gray3)",marginBottom:14}}>COMPANY</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"6px 20px"}}>
                  {[["About AccountaFit","#"],["Contact","mailto:info@accountafit.com"],["Press","#"]].map(([l,href])=>(
                    <a key={l} href={href} style={{color:"var(--gray2)",fontSize:".84rem",transition:"color .2s",whiteSpace:"nowrap"}}
                      onMouseEnter={e=>e.target.style.color="var(--frost)"} onMouseLeave={e=>e.target.style.color="var(--gray2)"}>{l}</a>
                  ))}
                </div>
              </div>
              <div>
                <div className="mono" style={{fontSize:".56rem",letterSpacing:".18em",color:"var(--gray3)",marginBottom:14}}>LEGAL</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"6px 20px"}}>
                  {[["Terms","/terms"],["Privacy","/privacy"],["Guidelines","/guidelines"],["Safety","/safety"]].map(([l,href])=>(
                    <a key={l} href={href} style={{color:"var(--gray2)",fontSize:".84rem",transition:"color .2s",whiteSpace:"nowrap"}}
                      onMouseEnter={e=>e.target.style.color="var(--frost)"} onMouseLeave={e=>e.target.style.color="var(--gray2)"}>{l}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)",marginBottom:20}}/>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div className="mono" style={{fontSize:".56rem",letterSpacing:".1em",color:"var(--gray3)"}}>© 2026 ACCOUNTAFIT CORP. ALL RIGHTS RESERVED.</div>
            <div className="mono" style={{fontSize:".56rem",letterSpacing:".1em",color:"var(--gray3)"}}>YOUR DISCIPLINE STARTS NOW</div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function AccountaFit() {
  const [lang, setLang] = useState("en");
  const [entered, setEntered] = useState(false);
  const t = T[lang] || T.en;
  const scrollToWaitlist = () => document.getElementById("waitlist")?.scrollIntoView({behavior:"smooth"});

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:G}}/>
      {!entered && <EntryScreen onEnter={()=>setEntered(true)}/>}
      <div className="page-bg"/>
      <div className="page-bg-noise"/>
      <Nav lang={lang} setLang={setLang} t={t} onWaitlist={scrollToWaitlist}/>
      <Hero t={t} onWaitlist={scrollToWaitlist}/>
      <Marquee/>
      <Intro t={t}/>
      <HowItWorks t={t}/>
      <Features t={t}/>
      <Waitlist t={t}/>
      <FAQ t={t}/>
      <Footer/>
      <Chatbot t={t}/>
    </>
  );
}
