import { useState, useEffect, useRef } from "react";
import { EXTRA_T } from "./pact-translations.js";


/* ─────────────────────────────────────────────
   SEO — inject/update <head> meta tags
───────────────────────────────────────────── */
const SEO_META = {
  en:{ title:"PACT — Find Your Fitness Accountability Partner", desc:"PACT matches you with a real accountability partner based on your goals, schedule, and commitment level. iOS & Android coming soon.", kw:"fitness accountability, workout partner, accountability app, PACT app", ogTitle:"PACT — The Fitness Accountability Matching Platform", ogDesc:"Find your partner. Make your pact. Never start over. By AccountaFit Corp." },
  fr:{ title:"PACT — Trouvez Votre Partenaire de Fitness", desc:"PACT vous associe à un vrai partenaire de responsabilité. iOS & Android bientôt.", kw:"partenaire fitness, responsabilité sportive, PACT app", ogTitle:"PACT — La Plateforme de Mise en Relation Fitness", ogDesc:"Trouvez votre partenaire. Faites votre pacte. Ne recommencez plus jamais." },
  es:{ title:"PACT — Encuentra Tu Compañero de Fitness", desc:"PACT te empareja con un compañero de responsabilidad real. iOS y Android próximamente.", kw:"compañero fitness, app responsabilidad, PACT app", ogTitle:"PACT — La Plataforma de Emparejamiento Fitness", ogDesc:"Encuentra tu compañero. Haz tu pacto. No vuelvas a empezar." },
  de:{ title:"PACT — Finde Deinen Fitness-Partner", desc:"PACT verbindet dich mit einem echten Verantwortungspartner. iOS & Android bald.", kw:"fitness partner, verantwortungs app, PACT app", ogTitle:"PACT — Die Fitness-Partner-Matching-Plattform", ogDesc:"Finde deinen Partner. Schließe deinen Pakt. Fang nie wieder von vorne an." },
  pt:{ title:"PACT — Encontre Seu Parceiro de Fitness", desc:"PACT combina você com um parceiro de responsabilidade real. iOS & Android em breve.", kw:"parceiro fitness, app responsabilidade, PACT app", ogTitle:"PACT — A Plataforma de Matching Fitness", ogDesc:"Encontre seu parceiro. Faça seu pacto. Nunca recomece." },
  it:{ title:"PACT — Trova il Tuo Partner Fitness", desc:"PACT ti abbina a un vero partner di responsabilità. iOS e Android presto.", kw:"partner fitness, app responsabilità, PACT app", ogTitle:"PACT — La Piattaforma di Matching per il Fitness", ogDesc:"Trova il tuo partner. Fai il tuo patto. Non ricominciare mai." },
  sv:{ title:"PACT — Hitta Din Fitnesspartner", desc:"PACT matchar dig med en riktig ansvarspartner. iOS och Android snart.", kw:"fitnesspartner, ansvarsapp, PACT app", ogTitle:"PACT — Fitness Accountability Matchningsplattformen", ogDesc:"Hitta din partner. Gör din pakt. Börja aldrig om igen." },
  nl:{ title:"PACT — Vind Jouw Fitnesspartner", desc:"PACT koppelt je aan een echte verantwoordelijkheidspartner. iOS en Android binnenkort.", kw:"fitnesspartner, verantwoordelijkheidsapp, PACT app", ogTitle:"PACT — Het Fitness Accountability Matchingplatform", ogDesc:"Vind je partner. Maak je pact. Begin nooit opnieuw." },
  ja:{ title:"PACT — フィットネスパートナーを見つけよう", desc:"PACTはあなたの目標に基づいて本物のアカウンタビリティパートナーとマッチングします。iOS & Android近日公開。", kw:"フィットネス パートナー, PACT", ogTitle:"PACT — フィットネスアカウンタビリティマッチングプラットフォーム", ogDesc:"パートナーを見つけて。パクトを結んで。もう一度始めることはない。" },
  zh:{ title:"PACT — 找到你的健身伙伴", desc:"PACT根据你的目标为你匹配真正的责任伙伴。iOS和Android即将推出。", kw:"健身伙伴, 责任应用, PACT应用", ogTitle:"PACT — 健身责任匹配平台", ogDesc:"找到你的伙伴。订立你的契约。永远不要重新开始。" },
  ko:{ title:"PACT — 나의 피트니스 파트너를 찾아보세요", desc:"PACT는 목표에 따라 진짜 책임 파트너를 매칭해 드립니다. iOS & Android 출시 예정.", kw:"피트니스 파트너, 책임 앱, PACT 앱", ogTitle:"PACT — 피트니스 어카운터빌리티 매칭 플랫폼", ogDesc:"파트너를 찾아보세요. 팩트를 맺으세요. 다시는 처음부터 시작하지 마세요." },
  hi:{ title:"PACT — अपना फिटनेस पार्टनर खोजें", desc:"PACT आपको आपके लक्ष्यों के आधार पर एक वास्तविक जवाबदेही भागीदार से मिलाता है।", kw:"फिटनेस पार्टनर, PACT ऐप", ogTitle:"PACT — फिटनेस अकाउंटेबिलिटी मैचिंग प्लेटफॉर्म", ogDesc:"अपना पार्टनर खोजें। अपना समझौता करें। फिर कभी शुरुआत न करें।" },
};

function SEO({ lang = "en" }) {
  useEffect(() => {
    const m = SEO_META[lang] || SEO_META.en;
    document.title = m.title;
    const set = (sel, attr, val, prop) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      if (prop) el.setAttribute("property", prop); else el.setAttribute("name", attr);
      el.setAttribute("content", val);
    };
    set('meta[name="description"]', "description", m.desc);
    set('meta[name="keywords"]', "keywords", m.kw);
    set('meta[property="og:title"]', null, m.ogTitle, "og:title");
    set('meta[property="og:description"]', null, m.ogDesc, "og:description");
    set('meta[property="og:type"]', null, "website", "og:type");
    set('meta[property="og:image"]', null, "/images/pact-og.webp", "og:image");
    set('meta[name="twitter:card"]', "twitter:card", "summary_large_image");
    set('meta[name="twitter:title"]', "twitter:title", m.ogTitle);
    set('meta[name="twitter:description"]', "twitter:description", m.ogDesc);
    set('meta[name="twitter:image"]', "twitter:image", "/images/pact-og.webp");
    set('meta[property="og:url"]', null, "https://pactapp.io", "og:url");
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    canon.href = 'https://pactapp.io';
    document.documentElement.lang = lang;
    // JSON-LD structured data
    let ld = document.getElementById('pact-jsonld');
    if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'pact-jsonld'; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context":"https://schema.org","@type":"MobileApplication",
      "name":"PACT","applicationCategory":"HealthApplication",
      "operatingSystem":"iOS, Android",
      "description":"The world's first fitness accountability partner-matching platform. Find your partner. Make your pact. Never start over.",
      "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
      "author":{"@type":"Organization","name":"AccountaFit Corp","url":"https://accountafit.com"},
    });
  }, [lang]);
  return null;
}

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
    pricingEyebrow: "PRICING",
    pricingH: "Simple pricing.\nNo surprises.",
    pricingSub: "Start free. Upgrade when you're ready to unlock the full power of PACT.",
    pricingNote: "Prices in USD · Billed monthly · Cancel anytime",
    plans: [
      { key:"free", name:"PACT FREE", price:"$0", period:"/forever", badge:null,
        desc:"Everything you need to find your partner and get started.",
        features:["Smart Partner Matching (3 active pacts)","Daily Check-Ins & Progress Logging","King / Queen of the WOD — Daily Leaderboard","Workout Library — 200+ pre-built workouts","Schedule & Calendar","Communities (join up to 3)","Personal Records Tracker","Direct Partner Chat","Goals & Events"],
        cta:"Join Waitlist", ctaStyle:"ghost" },
      { key:"pro", name:"PACT PRO", price:"$9.99", period:"/month", badge:"MOST POPULAR",
        desc:"Unlock AI coaching, unlimited matching, and advanced analytics.",
        features:["Everything in Free","AI Program Builder — 12+ sports, unlimited programs","Unlimited Active Pacts","Advanced Partner Analytics & Insights","Custom WOD Creation & Community Leaderboards","Unlimited Communities","Priority Partner Matching (24H avg.)","Workout Export & Sharing","Early Access to New Features"],
        cta:"Get Early Access", ctaStyle:"primary" },
    ],
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
/* ── Scroll Reveal ── */
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-left{opacity:0;transform:translateX(-32px);transition:opacity .7s ease,transform .7s ease}
.reveal-left.visible{opacity:1;transform:translateX(0)}
.reveal-right{opacity:0;transform:translateX(32px);transition:opacity .7s ease,transform .7s ease}
.reveal-right.visible{opacity:1;transform:translateX(0)}
.reveal-scale{opacity:0;transform:scale(.94);transition:opacity .6s ease,transform .6s ease}
.reveal-scale.visible{opacity:1;transform:scale(1)}

/* ── Phone Mockup ── */
.phone-shell{
  width:260px;height:520px;border-radius:38px;flex-shrink:0;
  background:linear-gradient(145deg,#0d1628 0%,#080e1c 100%);
  border:1.5px solid rgba(255,255,255,.13);
  box-shadow:0 40px 100px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.05),inset 0 1px 0 rgba(255,255,255,.08);
  position:relative;overflow:hidden;
}
.phone-shell::before{
  content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:80px;height:24px;background:#05090f;border-radius:0 0 16px 16px;z-index:10;
}
.phone-screen{position:absolute;inset:0;padding:32px 14px 14px;display:flex;flex-direction:column;gap:8px;overflow:hidden}
.phone-tab-bar{display:flex;justify-content:space-around;padding:8px 0 4px;border-top:1px solid rgba(255,255,255,.07);margin-top:auto;flex-shrink:0}
.phone-tab{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:2px 8px;border-radius:8px;transition:all .2s;border:none;background:none}
@keyframes phoneSlide{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
.phone-content{animation:phoneSlide .35s ease both}

/* ── AI Sport Demo ── */
.sport-pill{
  padding:9px 18px;border-radius:100px;cursor:pointer;
  font-family:'JetBrains Mono',monospace;font-size:.66rem;font-weight:500;
  letter-spacing:.1em;text-transform:uppercase;
  border:1px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.04);color:var(--gray);
  transition:all .22s ease;white-space:nowrap;
}
.sport-pill:hover{background:rgba(59,123,255,.12);border-color:rgba(59,123,255,.3);color:var(--frost)}
.sport-pill.active{background:rgba(59,123,255,.18);border-color:rgba(59,123,255,.5);color:var(--blue2);box-shadow:0 0 20px rgba(59,123,255,.15)}

/* ── Mobile Nav Polish ── */
.mob-nav-link{
  display:flex;align-items:center;gap:12px;padding:14px 0;
  border-bottom:1px solid rgba(255,255,255,.06);
  color:var(--gray);font-family:'Inter',sans-serif;font-size:1rem;
  background:none;border-left:none;border-right:none;border-top:none;
  cursor:pointer;width:100%;text-align:left;transition:color .2s;
}
.mob-nav-link:last-of-type{border-bottom:none}
.mob-nav-link:hover{color:var(--frost)}
.mob-nav-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);flex-shrink:0}

/* ── Pricing ── */
.pricing-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:0 auto}
.pricing-card{border-radius:var(--r-lg);padding:40px 36px;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:0}
.pricing-card.featured{background:linear-gradient(145deg,rgba(59,123,255,.13) 0%,rgba(0,212,255,.07) 100%);border:1px solid rgba(59,123,255,.35)}
.pricing-card.standard{background:var(--glass-1);border:1px solid var(--glass-border)}
.pricing-feat{display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:.86rem;color:var(--gray);line-height:1.45}
.pricing-feat:last-child{border-bottom:none}
.pricing-check{width:16px;height:16px;border-radius:50%;background:rgba(59,123,255,.18);border:1.5px solid rgba(59,123,255,.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
@media(max-width:600px){.pricing-grid{grid-template-columns:1fr!important}}

`;


/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}


/* global class-based reveal */
function useGlobalReveal() {
  useEffect(() => {
    const cls = ["reveal","reveal-left","reveal-right","reveal-scale"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    cls.forEach(c => document.querySelectorAll("."+c).forEach(el => obs.observe(el)));
    return () => obs.disconnect();
  });
}

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
          src="/images/pact-logo-full.png"
          alt="PACT"
          style={{
            height:"clamp(60px, 10vw, 100px)",
            width:"auto",
            display:"block",
            margin:"0 auto 24px",
            
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
const T_MERGED = { ...T, ...EXTRA_T };

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

  // Reset greeting when language changes
  useEffect(() => {
    setMsgs([{ role:"bot", text: t.chatGreeting }]);
  }, [t.chatGreeting]);

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
        body: JSON.stringify({
          system_instruction:{ parts:[{ text: SYSTEM }] },
          contents:[...history,{ role:"user", parts:[{ text }] }],
          generationConfig:{ maxOutputTokens:300, temperature:0.7 }
        }),
      });
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setMsgs(m => [...m, { role:"bot", text: raw.replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1').trim() || "Try again!" }]);
    } catch {
      setMsgs(m => [...m, { role:"bot", text: "Something went wrong. Email us at info@accountafit.com" }]);
    }
    setLoading(false);
  };

  const QUICK = ["How does matching work?", "What sports are supported?", "Is it free?"];
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
      <button className={`af-chat-btn${open?" open":""}`} onClick={()=>setOpen(o=>!o)} aria-label="Open PACT AI chat">
        {open
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span style={{color:"rgba(255,255,255,.9)",fontFamily:"'JetBrains Mono',monospace",fontWeight:500,fontSize:".76rem",letterSpacing:".1em",textTransform:"uppercase"}}>Ask PACT AI</span>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px rgba(34,197,94,.7)",animation:"glow 2s ease infinite"}}/>
            </>
        }
      </button>
    </>
  );
}


/* ─────────────────────────────────────────────
   CLOUDFLARE WORKER — Deploy to pact-waitlist.accountafit.workers.dev
   
   wrangler init pact-waitlist
   wrangler kv:namespace create WAITLIST
   
   worker.js:
   ───────────
   export default {
     async fetch(request, env) {
       const cors = {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "POST, OPTIONS",
         "Access-Control-Allow-Headers": "Content-Type",
       };
       if (request.method === "OPTIONS") return new Response(null, { headers: cors });
       if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
       try {
         const { email, name, source, timestamp } = await request.json();
         if (!email || !email.includes("@")) return new Response("Invalid email", { status: 400, headers: cors });
         const key = `waitlist:${email.toLowerCase().trim()}`;
         const existing = await env.WAITLIST.get(key);
         if (!existing) {
           await env.WAITLIST.put(key, JSON.stringify({ email, name, source, timestamp }));
         }
         return new Response(JSON.stringify({ ok: true }), { headers: { ...cors, "Content-Type": "application/json" } });
       } catch (e) {
         return new Response("Server error", { status: 500, headers: cors });
       }
     }
   };
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   WAITLIST FORM
───────────────────────────────────────────── */
function WaitlistForm({ placeholder = "Enter your email", btnText = "Join the Waitlist", fullWidth = false }) {
  const [email, setEmail] = useState("");
  const [name,  setName]  = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [showName, setShowName] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    if (!showName) { setShowName(true); return; }
    setStatus("loading");

    const payload = {
      email,
      name: name.trim() || undefined,
      source: "pact-website",
      timestamp: new Date().toISOString(),
      _subject: "PACT Waitlist Signup",
      message: `New PACT waitlist signup: ${email}${name ? " — " + name : ""}`,
    };

    // Try Cloudflare Worker first, fall back to Formspree
    const endpoints = [
      { url: "https://pact-waitlist.accountafit.workers.dev/waitlist", type: "worker" },
      { url: "https://formspree.io/f/mnjwagoo", type: "formspree" },
    ];

    let success = false;
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep.url, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) { success = true; break; }
      } catch { /* try next */ }
    }
    setStatus(success ? "success" : "error");
  };

  if (status === "success") return (
    <div style={{background:"rgba(59,123,255,.08)",border:"1px solid rgba(59,123,255,.28)",borderRadius:16,padding:"20px 32px",textAlign:"center"}}>
      <div style={{fontSize:"1.4rem",marginBottom:8}}>🎉</div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".76rem",letterSpacing:".1em",color:"#93C5FD",marginBottom:4}}>YOU'RE ON THE LIST</div>
      <div style={{fontSize:".82rem",color:"var(--gray2)"}}>We'll reach out with early access details. Your discipline starts now.</div>
    </div>
  );

  if (status === "error") return (
    <div style={{textAlign:"center"}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".72rem",color:"#F87171",marginBottom:12,letterSpacing:".08em"}}>SOMETHING WENT WRONG — TRY AGAIN</div>
      <button className="btn-ghost" onClick={()=>setStatus("idle")}>RETRY</button>
    </div>
  );

  return (
    <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:10,width:fullWidth?"100%":undefined,maxWidth:480,margin:"0 auto"}}>
      {showName && (
        <input
          type="text" value={name} onChange={e=>setName(e.target.value)}
          placeholder="First name (optional)"
          autoFocus
          style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:100,color:"var(--frost)",fontFamily:"'Inter',sans-serif",fontSize:14,padding:"14px 22px",outline:"none",transition:"border-color .2s",width:"100%"}}
          onFocus={e=>e.target.style.borderColor="rgba(59,123,255,.5)"}
          onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.12)"}
        />
      )}
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <input
          type="email" required value={email} onChange={e=>setEmail(e.target.value)}
          placeholder={placeholder}
          style={{flex:"1 1 200px",minWidth:180,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:100,color:"var(--frost)",fontFamily:"'Inter',sans-serif",fontSize:14,padding:"14px 22px",outline:"none",transition:"border-color .2s"}}
          onFocus={e=>e.target.style.borderColor="rgba(59,123,255,.5)"}
          onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.12)"}
        />
        <button type="submit" className="btn-primary" style={{opacity:status==="loading"?.6:1,flexShrink:0}}>
          {status==="loading" ? "JOINING..." : showName ? "CONFIRM →" : btnText}
        </button>
      </div>
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
          <img src="/images/pact-logo-full.png" alt="PACT" style={{height:40,width:"auto",filter:"drop-shadow(0 0 10px rgba(59,123,255,.45)) brightness(1.15)"}}/>
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
        <div className="hide-d" style={{display:"flex",alignItems:"center",gap:10}}>
          <LangSwitcher lang={lang} setLang={setLang}/>
          <button onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",color:"var(--frost)",fontSize:"1.5rem",cursor:"pointer",lineHeight:1,padding:4}}>{menuOpen?"✕":"☰"}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="hide-d" style={{background:"rgba(5,9,15,.98)",backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",borderTop:"1px solid rgba(255,255,255,.07)",padding:"20px 5% 28px",display:"flex",flexDirection:"column"}}>
          {t.nav.map((label,i) => (
            <button key={i} onClick={()=>scrollTo(IDS[i])} className="mob-nav-link">
              <div className="mob-nav-dot"/>
              {label}
            </button>
          ))}
          <div style={{height:1,background:"rgba(255,255,255,.07)",margin:"16px 0"}}/>
          <button className="btn-primary" onClick={()=>{onWaitlist();setMenuOpen(false);}} style={{width:"100%",justifyContent:"center"}}>{t.joinWaitlist}</button>
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
            <div className="eyebrow reveal">{t.introEyebrow}</div>
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
              <div className="eyebrow reveal">{t.howEyebrow}</div>
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
   AI PROGRAM BUILDER DEMO
───────────────────────────────────────────── */
const PACT_SPORTS = [
  {key:"Bodybuilding",       emoji:"💪"},{key:"General Fitness",   emoji:"🎯"},
  {key:"Weight Loss",        emoji:"🔥"},{key:"General Strength",  emoji:"⚙️"},
  {key:"Powerlifting",       emoji:"🏋️"},{key:"Olympic Lifting",   emoji:"🥇"},
  {key:"CrossFit",           emoji:"⚡"},{key:"Hyrox",             emoji:"🏃"},
  {key:"Running",            emoji:"👟"},{key:"Marathon",           emoji:"🏅"},
  {key:"Triathlon",          emoji:"🚴"},{key:"Swimming",           emoji:"🌊"},
];

const PACT_PHASES = [
  {key:"Base Build Peak",   desc:"Progressive overload from foundation to peak"},
  {key:"Conservative Base", desc:"Gradual build, lower intensity, sustainable"},
  {key:"Aggressive Build",  desc:"High volume, accelerated adaptation"},
  {key:"Maintenance Focus", desc:"Hold current fitness, minimal fatigue"},
];

const PACT_WEEKS = {
  "Base Build Peak":   [{d:"MON",w:"Strength Foundation",x:"5×5 @ 70%",rest:false},{d:"TUE",w:"Conditioning",x:"AMRAP 20 min",rest:false},{d:"WED",w:"Active Recovery",x:"Mobility",rest:true},{d:"THU",w:"Skill Work",x:"Technique",rest:false},{d:"FRI",w:"WOD Benchmark",x:"For Time",rest:false},{d:"SAT",w:"Long Effort",x:"Aerobic Base",rest:false},{d:"SUN",w:"Rest",x:"Full Recovery",rest:true}],
  "Conservative Base": [{d:"MON",w:"Base Lift",x:"3×8 @ 65%",rest:false},{d:"TUE",w:"Zone 2 Cardio",x:"40 min easy",rest:false},{d:"WED",w:"Rest",x:"Optional Mobility",rest:true},{d:"THU",w:"Full Body",x:"Circuit",rest:false},{d:"FRI",w:"Benchmark",x:"Test effort",rest:false},{d:"SAT",w:"Outdoor",x:"Free choice",rest:false},{d:"SUN",w:"Rest",x:"Recovery",rest:true}],
  "Aggressive Build":  [{d:"MON",w:"Max Effort",x:"Work to 1RM",rest:false},{d:"TUE",w:"High Intensity",x:"Tabata + EMOM",rest:false},{d:"WED",w:"Speed Work",x:"Sprint intervals",rest:false},{d:"THU",w:"Heavy Metcon",x:"Partner WOD",rest:false},{d:"FRI",w:"Volume Day",x:"5×5 clusters",rest:false},{d:"SAT",w:"Competition",x:"Test week",rest:false},{d:"SUN",w:"Rest",x:"Full recovery",rest:true}],
  "Maintenance Focus": [{d:"MON",w:"Moderate Lift",x:"3×8 @ 75%",rest:false},{d:"TUE",w:"Cardio",x:"30 min Zone 2",rest:false},{d:"WED",w:"Rest",x:"Optional",rest:true},{d:"THU",w:"Full Body",x:"Circuit",rest:false},{d:"FRI",w:"Fun WOD",x:"Partner choice",rest:false},{d:"SAT",w:"Activity",x:"Free choice",rest:false},{d:"SUN",w:"Rest",x:"Recovery",rest:true}],
};

const PACT_SPORT_META = {
  "Bodybuilding":{weeks:12,days:5},"General Fitness":{weeks:8,days:4},"Weight Loss":{weeks:12,days:5},
  "General Strength":{weeks:10,days:4},"Powerlifting":{weeks:10,days:4},"Olympic Lifting":{weeks:10,days:5},
  "CrossFit":{weeks:12,days:5},"Hyrox":{weeks:16,days:4},"Running":{weeks:14,days:5},
  "Marathon":{weeks:20,days:5},"Triathlon":{weeks:24,days:6},"Swimming":{weeks:12,days:4},
};

function AIDemo({ t }) {
  const [sport, setSport] = useState("CrossFit");
  const [phase, setPhase] = useState("Base Build Peak");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);

  const generate = () => {
    setGenerating(true); setGenerated(false); setProgress(0);
    const iv = setInterval(()=>setProgress(p=>{if(p>=92){clearInterval(iv);return 92;}return p+Math.random()*14;}),200);
    setTimeout(()=>{clearInterval(iv);setProgress(100);setTimeout(()=>{setGenerating(false);setGenerated(true);},250);},1800);
  };

  const meta = PACT_SPORT_META[sport] || {weeks:12,days:5};
  const days = PACT_WEEKS[phase] || PACT_WEEKS["Base Build Peak"];
  const emoji = PACT_SPORTS.find(s=>s.key===sport)?.emoji || "⚡";

  return (
    <>
      <div className="divider"/>
      <section className="sec" id="ai-demo">
        <div className="wrap">
          <div style={{textAlign:"center",maxWidth:580,margin:"0 auto 52px"}}>
            <div className="eyebrow reveal" style={{justifyContent:"center",display:"flex"}}>{t.progEyebrow || "AI PROGRAM BUILDER"}</div>
            <h2 className="raj reveal" style={{fontWeight:700,fontSize:"clamp(2.4rem,4.5vw,3.4rem)",lineHeight:1,letterSpacing:".02em",marginBottom:14,whiteSpace:"pre-line"}}>{t.progH || "Your coach.\nPowered by AI."}</h2>
            <p className="reveal" style={{color:"var(--gray)",fontSize:"1rem",lineHeight:1.8}}>{t.progSub || "Select your sport, set your phase, and PACT generates a fully periodized training program."}</p>
          </div>

          <div className="glass reveal" style={{padding:"34px 30px",maxWidth:820,margin:"0 auto"}}>
            <div style={{marginBottom:26}}>
              <div className="mono" style={{fontSize:".56rem",letterSpacing:".18em",color:"var(--blue2)",marginBottom:12}}>01 — SELECT YOUR SPORT</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {PACT_SPORTS.map(s=>(
                  <div key={s.key} onClick={()=>{setSport(s.key);setGenerated(false);}}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"10px 13px",borderRadius:11,cursor:"pointer",border:`1px solid ${sport===s.key?"rgba(59,123,255,.55)":"rgba(255,255,255,.07)"}`,background:sport===s.key?"rgba(59,123,255,.12)":"rgba(255,255,255,.03)",fontSize:".85rem",color:sport===s.key?"var(--frost)":"var(--gray)",transition:"all .18s",fontWeight:sport===s.key?600:400}}>
                    <span style={{fontSize:"1rem",flexShrink:0}}>{s.emoji}</span>{s.key}
                  </div>
                ))}
              </div>
            </div>

            <div style={{marginBottom:26}}>
              <div className="mono" style={{fontSize:".56rem",letterSpacing:".18em",color:"var(--blue2)",marginBottom:12}}>02 — PHASE PREFERENCE</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {PACT_PHASES.map(p=>(
                  <button key={p.key} onClick={()=>{setPhase(p.key);setGenerated(false);}}
                    style={{padding:"8px 18px",borderRadius:100,cursor:"pointer",border:`1px solid ${phase===p.key?"rgba(59,123,255,.55)":"rgba(255,255,255,.1)"}`,background:phase===p.key?"rgba(59,123,255,.12)":"rgba(255,255,255,.04)",fontFamily:"'JetBrains Mono',monospace",fontSize:".64rem",letterSpacing:".1em",color:phase===p.key?"var(--blue2)":"var(--gray)",transition:"all .18s"}}>
                    {p.key}
                  </button>
                ))}
              </div>
              {phase && <p style={{fontSize:".78rem",color:"var(--gray2)",marginTop:8}}>{PACT_PHASES.find(p=>p.key===phase)?.desc}</p>}
            </div>

            <button className="btn-primary" onClick={generate} disabled={generating}
              style={{width:"100%",justifyContent:"center",marginBottom:generating||generated?20:0,opacity:generating?.7:1}}>
              {generating
                ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{animation:"spinPact 1s linear infinite"}}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>GENERATING...</>
                : generated
                ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>REGENERATE PROGRAM</>
                : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>GENERATE MY PROGRAM</>
              }
            </button>

            {generating && (
              <div style={{marginBottom:16}}>
                <div style={{height:4,background:"rgba(255,255,255,.07)",borderRadius:2,overflow:"hidden",marginBottom:6}}>
                  <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#3B7BFF,#00D4FF)",borderRadius:2,transition:"width .2s ease"}}/>
                </div>
                <div className="mono" style={{fontSize:".52rem",color:"var(--gray3)",textAlign:"center",letterSpacing:".1em"}}>
                  {progress<40?"ANALYZING YOUR SPORT...":progress<75?"WRITING WEEK 1 WORKOUTS...":"FINALIZING PROGRAM..."}
                </div>
              </div>
            )}

            {generated && (
              <div style={{animation:"fadeUp .4s ease both"}}>
                <div style={{background:"rgba(59,123,255,.07)",border:"1px solid rgba(59,123,255,.2)",borderRadius:"var(--r-md)",padding:"16px 20px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
                      <span style={{fontSize:"1.4rem"}}>{emoji}</span>
                      <h3 className="raj" style={{fontWeight:700,fontSize:"1.2rem",color:"var(--frost)",margin:0}}>{meta.weeks}-Week {sport} Program</h3>
                    </div>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                      <span className="tag tag-blue">{phase}</span>
                      <span className="tag tag-cyan">{meta.days} DAYS/WK</span>
                      <span className="tag tag-purple">{meta.weeks} WEEKS</span>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div className="raj" style={{fontWeight:700,fontSize:"2rem",color:"var(--blue2)",lineHeight:1}}>Wk 1</div>
                    <div className="mono" style={{fontSize:".5rem",color:"var(--gray2)",letterSpacing:".08em"}}>SAMPLE</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:5,marginBottom:14}}>
                  {days.map((day,i)=>(
                    <div key={i} style={{background:day.rest?"var(--glass-1)":"rgba(59,123,255,.06)",border:`1px solid ${day.rest?"var(--glass-border)":"rgba(59,123,255,.16)"}`,borderRadius:"var(--r-sm)",padding:"7px 5px",textAlign:"center"}}>
                      <div className="mono" style={{fontSize:".46rem",letterSpacing:".08em",color:"var(--gray3)",marginBottom:4}}>{day.d}</div>
                      <div style={{fontSize:".62rem",fontWeight:600,color:day.rest?"var(--gray3)":"var(--frost)",lineHeight:1.2,marginBottom:3}}>{day.w}</div>
                      <div className="mono" style={{fontSize:".42rem",color:"var(--gray2)"}}>{day.x}</div>
                    </div>
                  ))}
                </div>
                <div style={{padding:"9px 14px",background:"rgba(0,212,255,.05)",border:"1px solid rgba(0,212,255,.12)",borderRadius:"var(--r-sm)",display:"flex",alignItems:"center",gap:7}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"var(--cyan)",animation:"glow 1.5s ease infinite",flexShrink:0}}/>
                  <span className="mono" style={{fontSize:".52rem",color:"var(--gray2)",letterSpacing:".07em"}}>FULL {meta.weeks}-WEEK PROGRAM IN THE APP · JOIN WAITLIST FOR ACCESS</span>
                </div>
              </div>
            )}
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
              <div className="eyebrow reveal">{t.faqEyebrow}</div>
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
                <img src="/images/pact-logo-full.png" alt="PACT" style={{height:34,width:"auto",filter:"drop-shadow(0 0 8px rgba(59,123,255,.4)) brightness(1.1)"}}/>
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
          {/* App Store badges */}
          <div style={{display:"flex",gap:14,marginBottom:28,flexWrap:"wrap",alignItems:"center"}}>
            <div className="mono" style={{fontSize:".52rem",letterSpacing:".14em",color:"var(--gray3)",marginRight:4}}>AVAILABLE SOON ON</div>
            {/* Apple App Store badge */}
            <div style={{position:"relative",display:"inline-block",opacity:.45,filter:"grayscale(0.3)"}}>
              <a href="https://apps.apple.com" aria-label="Download on the App Store" style={{display:"block",cursor:"default",pointerEvents:"none"}}>
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  style={{height:38,width:"auto",display:"block",filter:"brightness(0.9)"}}
                />
              </a>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(5,9,15,.55)",borderRadius:8}}>
                <span className="mono" style={{fontSize:".44rem",letterSpacing:".14em",color:"rgba(255,255,255,.6)"}}>COMING SOON</span>
              </div>
            </div>
            {/* Google Play badge */}
            <div style={{position:"relative",display:"inline-block",opacity:.45,filter:"grayscale(0.3)"}}>
              <a href="https://play.google.com" aria-label="Get it on Google Play" style={{display:"block",cursor:"default",pointerEvents:"none"}}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  style={{height:38,width:"auto",display:"block",filter:"brightness(0.9)"}}
                />
              </a>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(5,9,15,.55)",borderRadius:8}}>
                <span className="mono" style={{fontSize:".44rem",letterSpacing:".14em",color:"rgba(255,255,255,.6)"}}>COMING SOON</span>
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
   PRICING
───────────────────────────────────────────── */
function Pricing({ t, onWaitlist }) {
  if (!t.plans) return null;
  return (
    <>
      <div className="divider"/>
      <section className="sec" id="pricing">
        <div className="wrap">
          <div style={{textAlign:"center",maxWidth:600,margin:"0 auto 64px"}}>
            <div className="eyebrow" style={{justifyContent:"center",display:"flex"}}>{t.pricingEyebrow}</div>
            <h2 className="raj" style={{fontWeight:700,fontSize:"clamp(2.4rem,4.5vw,3.4rem)",lineHeight:1,letterSpacing:".02em",marginBottom:16,whiteSpace:"pre-line"}}>{t.pricingH}</h2>
            <p style={{color:"var(--gray)",fontSize:"1rem",lineHeight:1.8}}>{t.pricingSub}</p>
          </div>
          <div className="pricing-grid">
            {t.plans.map(plan => (
              <div key={plan.key} className={`pricing-card ${plan.key==="pro"?"featured":"standard"}`}>
                {plan.badge && (
                  <div style={{position:"absolute",top:20,right:20}}>
                    <span className="tag tag-cyan" style={{fontSize:".52rem",letterSpacing:".14em"}}>{plan.badge}</span>
                  </div>
                )}
                <div className="mono" style={{fontSize:".6rem",letterSpacing:".18em",color:"var(--gray3)",marginBottom:10}}>{plan.name}</div>
                <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:8}}>
                  <span className="raj" style={{fontWeight:700,fontSize:"clamp(2.8rem,5vw,3.8rem)",lineHeight:1,background:"linear-gradient(135deg,#3B7BFF,#00D4FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{plan.price}</span>
                  <span className="mono" style={{fontSize:".72rem",color:"var(--gray2)"}}>{plan.period}</span>
                </div>
                <p style={{color:"var(--gray)",fontSize:".88rem",lineHeight:1.65,marginBottom:28,minHeight:42}}>{plan.desc}</p>
                <button
                  className={plan.ctaStyle==="primary"?"btn-primary":"btn-ghost"}
                  onClick={onWaitlist}
                  style={{width:"100%",marginBottom:28,justifyContent:"center"}}
                >{plan.cta}</button>
                <div style={{display:"flex",flexDirection:"column",position:"relative"}}>
                  <div style={{filter:"blur(5px)",userSelect:"none",pointerEvents:"none"}}>
                    {plan.features.map((f,i) => (
                      <div key={i} className="pricing-feat">
                        <div className="pricing-check">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--blue2)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}>
                    <div style={{background:"rgba(59,123,255,.12)",border:"1px solid rgba(59,123,255,.28)",borderRadius:"var(--r-md)",padding:"10px 20px",textAlign:"center"}}>
                      <div className="mono" style={{fontSize:".58rem",letterSpacing:".14em",color:"var(--blue2)",marginBottom:4}}>COMING SOON</div>
                      <div style={{fontSize:".78rem",color:"var(--gray)"}}>Full feature list revealed at launch</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mono" style={{textAlign:"center",fontSize:".58rem",letterSpacing:".12em",color:"var(--gray3)",marginTop:28}}>{t.pricingNote}</p>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function AccountaFit() {
  const [lang, setLang] = useState("en");
  const [entered, setEntered] = useState(false);
  useGlobalReveal();
  const t = T_MERGED[lang] || T_MERGED.en;
  const scrollToWaitlist = () => document.getElementById("waitlist")?.scrollIntoView({behavior:"smooth"});

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:G}}/>
      {!entered && <EntryScreen onEnter={()=>setEntered(true)}/>}
      <div className="page-bg"/>
      <div className="page-bg-noise"/>
      <SEO lang={lang}/>
      <Nav lang={lang} setLang={setLang} t={t} onWaitlist={scrollToWaitlist}/>
      <Hero t={t} onWaitlist={scrollToWaitlist}/>
      <Marquee/>
      <Intro t={t}/>
      <HowItWorks t={t}/>
      <Features t={t}/>
      <AIDemo t={t}/>
      <Community t={t}/>
      <Pricing t={t} onWaitlist={scrollToWaitlist}/>
      <Waitlist t={t}/>
      <FAQ t={t}/>
      <Footer/>
      <Chatbot t={t}/>
    </>
  );
}
