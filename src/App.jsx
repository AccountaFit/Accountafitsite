import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
//  ACCOUNTAFIT  —  Premium Landing Page
//  Design system: cinematic fitness tech, bold red/black, Anton italic
//
//  PALETTE
//  #050505   near-black bg
//  #0D0D0D   section alt bg
//  #141414   card surface
//  #1C1C1C   graphite
//  #262626   border/divider
//  #B91C1C   primary red (crimson)
//  #DC2626   red hover
//  #EF4444   red accent/glow
//  #F5F5F5   white text
//  #A3A3A3   cool gray body
//  #525252   muted
//
//  FONTS
//  Anton         — hero display, section heads (bold italic condensed)
//  Barlow Condensed — labels, buttons, stat numbers (uppercase athletic)
//  DM Sans       — body, cards, subtext (clean modern legibility)
// ═══════════════════════════════════════════════════════════════════

/* ─── CSS ──────────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --black:   #050505;
  --dark:    #0D0D0D;
  --card:    #141414;
  --graph:   #1C1C1C;
  --border:  #262626;
  --red:     #B91C1C;
  --redhov:  #DC2626;
  --redglow: #EF4444;
  --white:   #F5F5F5;
  --gray:    #A3A3A3;
  --muted:   #525252;
}

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body { background:var(--black); color:var(--white); font-family:'DM Sans',sans-serif; overflow-x:hidden; }

::-webkit-scrollbar { width:3px; }
::-webkit-scrollbar-track { background:var(--black); }
::-webkit-scrollbar-thumb { background:var(--red); border-radius:2px; }

/* ── Keyframes ── */
@keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes shimmer  { 0%{opacity:.4} 50%{opacity:.7} 100%{opacity:.4} }

/* ── Type utilities ── */
.display    { font-family:'Anton',sans-serif; font-style:italic; }
.barlow     { font-family:'Barlow Condensed',sans-serif; }
.label      { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:.72rem; letter-spacing:.26em; text-transform:uppercase; color:var(--red); }

/* ── Buttons ── */
.btn-primary {
  display:inline-flex; align-items:center; gap:10px;
  background:var(--red); color:var(--white);
  font-family:'Barlow Condensed',sans-serif; font-weight:700;
  font-size:.95rem; letter-spacing:.18em; text-transform:uppercase;
  padding:16px 44px; border:none; border-radius:100px;
  cursor:pointer; transition:all .22s ease; position:relative; overflow:hidden;
  box-shadow:0 4px 24px rgba(185,28,28,.35);
}
.btn-primary:hover { background:var(--redhov); transform:translateY(-2px); box-shadow:0 12px 36px rgba(220,38,38,.5); }
.btn-primary:active { transform:translateY(0); }
.btn-primary.pulse { animation:pulse 2.6s ease-in-out infinite; }

.btn-outline {
  display:inline-flex; align-items:center; gap:8px;
  background:transparent; color:var(--white);
  font-family:'Barlow Condensed',sans-serif; font-weight:600;
  font-size:.9rem; letter-spacing:.15em; text-transform:uppercase;
  padding:14px 36px; border:1.5px solid rgba(245,245,245,.22); border-radius:100px;
  cursor:pointer; transition:all .2s ease;
}
.btn-outline:hover { border-color:var(--redhov); color:var(--redglow); }

.btn-nav {
  background:transparent; color:var(--white);
  font-family:'Barlow Condensed',sans-serif; font-weight:700;
  font-size:.82rem; letter-spacing:.14em; text-transform:uppercase;
  padding:9px 24px; border:1.5px solid rgba(220,38,38,.55); border-radius:100px;
  cursor:pointer; transition:all .2s ease;
}
.btn-nav:hover { background:var(--red); border-color:var(--red); }

/* ── Cards ── */
.card {
  background:var(--card); border:1px solid var(--border); border-radius:14px;
  padding:32px 26px; transition:all .3s ease; position:relative; overflow:hidden;
}
.card::after {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,var(--red),transparent); opacity:0; transition:opacity .3s;
}
.card:hover { border-color:var(--red); transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,.6),0 0 30px rgba(185,28,28,.12); }
.card:hover::after { opacity:1; }

/* ── Photo panels ── */
.photo-panel { position:relative; overflow:hidden; border-radius:12px; }
.photo-panel img { width:100%; height:100%; object-fit:cover; transition:transform .6s ease; display:block; }
.photo-panel:hover img { transform:scale(1.05); }
.panel-scrim { position:absolute; inset:0; background:linear-gradient(to top,rgba(5,5,5,.88) 0%,rgba(5,5,5,.1) 55%,transparent 100%); pointer-events:none; }

/* ── Grain ── */
.grain::before {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)' opacity='.038'/%3E%3C/svg%3E");
  opacity:.55;
}

/* ── Divider ── */
.divider { height:1px; background:linear-gradient(90deg,transparent,var(--border),transparent); }

/* ── Red line accent ── */
.redline { display:block; width:36px; height:2px; background:var(--red); margin-bottom:20px; }

/* ── Responsive ── */
@media (max-width:900px) {
  .hide-m  { display:none!important; }
  .col2    { grid-template-columns:1fr!important; }
  .hero-h  { font-size:clamp(2.6rem,11vw,5.5rem)!important; }
}
@media (min-width:901px) { .hide-d { display:none!important; } }

/* ── Input ── */
.email-input {
  flex:1 1 260px; max-width:360px;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12);
  border-radius:100px; color:var(--white); font-family:'DM Sans',sans-serif;
  font-size:.93rem; padding:15px 22px; outline:none; transition:border-color .2s;
}
.email-input::placeholder { color:var(--muted); }
.email-input:focus { border-color:rgba(185,28,28,.65); }

/* ── FAQ ── */
.faq-item { background:var(--dark); border:1px solid var(--border); border-radius:10px; overflow:hidden; transition:border-color .2s; }
.faq-item.open { border-color:rgba(185,28,28,.42); }
.faq-btn { width:100%; background:none; border:none; cursor:pointer; padding:22px 24px; display:flex; justify-content:space-between; align-items:center; gap:12px; }
.faq-plus { color:var(--red); font-size:1.5rem; line-height:1; transition:transform .22s; flex-shrink:0; }
.faq-answer { padding:0 24px 20px; color:var(--gray); line-height:1.72; font-size:.93rem; animation:fadeIn .2s ease; }

/* ── Ticker ── */
.ticker-wrap { overflow:hidden; white-space:nowrap; }
.ticker-inner { display:inline-flex; animation:ticker 28s linear infinite; }
.ticker-item { display:inline-flex; align-items:center; gap:16px; padding:0 32px; font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:.82rem; letter-spacing:.22em; text-transform:uppercase; color:var(--muted); }
.ticker-dot { width:4px; height:4px; border-radius:50%; background:var(--red); flex-shrink:0; }
`;

/* ─── Hook ─────────────────────────────────────────────────────── */
function useInView(t=.12) {
  const ref=useRef(null), [v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});
    if(ref.current)o.observe(ref.current); return()=>o.disconnect();
  },[t]);
  return[ref,v];
}

/* ─── Logo ─────────────────────────────────────────────────────── */
function Logo({size="1.55rem"}) {
  return (
    <span className="display" style={{fontSize:size,letterSpacing:".03em",lineHeight:1,userSelect:"none"}}>
      <span style={{color:"#F5F5F5"}}>Accounta</span>
      <span style={{color:"#EF4444"}}>Fit</span>
    </span>
  );
}

/* ─── Section wrapper ──────────────────────────────────────────── */
function Section({id,bg,children,style={}}) {
  return (
    <section id={id} style={{background:bg||"var(--black)",padding:"108px 5%",position:"relative",...style}}>
      {children}
    </section>
  );
}

function Inner({children,max=1200,style={}}) {
  return <div style={{maxWidth:max,margin:"0 auto",...style}}>{children}</div>;
}

function SectionHead({label,headline,sub,center=true,vis=true}) {
  return (
    <div style={{textAlign:center?"center":"left",marginBottom:64}}>
      <span className="label">{label}</span>
      <h2 className="display" style={{
        fontSize:"clamp(2rem,5.5vw,3.8rem)",color:"var(--white)",
        marginTop:10,lineHeight:.96,
        opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:"all .75s ease",
      }}
        dangerouslySetInnerHTML={{__html:headline}}
      />
      {sub && <p style={{marginTop:18,fontSize:"1rem",color:"var(--gray)",maxWidth:480,margin:"18px auto 0",lineHeight:1.72}}>{sub}</p>}
    </div>
  );
}

/* ─── NAV ──────────────────────────────────────────────────────── */
function Nav({onCTA}) {
  const[scrolled,setSc]=useState(false);
  const[open,setOpen]=useState(false);
  useEffect(()=>{
    const h=()=>setSc(window.scrollY>55);
    window.addEventListener("scroll",h); return()=>window.removeEventListener("scroll",h);
  },[]);
  const links=["About","How It Works","Features","FAQ"];
  return(
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:300,height:70,
        padding:"0 5%",display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrolled?"rgba(5,5,5,.95)":"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?"1px solid rgba(38,38,38,.9)":"none",
        transition:"all .3s ease",
      }}>
        <Logo/>
        <div className="hide-m" style={{display:"flex",gap:36,alignItems:"center"}}>
          {links.map(l=>(
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              style={{color:"rgba(245,245,245,.75)",fontFamily:"'DM Sans'",fontSize:".88rem",textDecoration:"none",letterSpacing:".02em",transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color="var(--white)"}
              onMouseLeave={e=>e.target.style.color="rgba(245,245,245,.75)"}>{l}</a>
          ))}
        </div>
        <button className="btn-nav hide-m" onClick={onCTA}>Join Now</button>
        <button className="hide-d" onClick={()=>setOpen(!open)}
          style={{background:"none",border:"none",color:"var(--white)",fontSize:"1.4rem",cursor:"pointer",lineHeight:1}}>
          {open?"✕":"☰"}
        </button>
      </nav>
      {open&&(
        <div style={{position:"fixed",inset:"70px 0 0",background:"var(--black)",zIndex:299,padding:"32px 5%",display:"flex",flexDirection:"column",gap:22,borderTop:"1px solid var(--border)"}}>
          {links.map(l=>(
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} onClick={()=>setOpen(false)}
              style={{color:"var(--white)",fontFamily:"'DM Sans'",fontSize:"1.1rem",textDecoration:"none"}}>{l}</a>
          ))}
          <button className="btn-primary" onClick={()=>{setOpen(false);onCTA();}} style={{justifyContent:"center"}}>Join The Waitlist</button>
        </div>
      )}
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────── */
function Hero({onCTA}) {
  return(
    <section className="grain" style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>

      {/* Premium dark gradient background — no photos */}
      <div style={{position:"absolute",inset:0,zIndex:0,background:"linear-gradient(160deg,#0A0A0A 0%,#0D0202 40%,#140303 65%,#050505 100%)"}}/>
      {/* Radial red atmosphere */}
      <div style={{position:"absolute",inset:0,zIndex:1,background:"radial-gradient(ellipse at 65% 40%,rgba(185,28,28,.22) 0%,transparent 55%)"}}/>
      <div style={{position:"absolute",inset:0,zIndex:1,background:"radial-gradient(ellipse at 20% 80%,rgba(185,28,28,.1) 0%,transparent 50%)"}}/>
      {/* Subtle grid texture */}
      <div style={{position:"absolute",inset:0,zIndex:1,backgroundImage:"linear-gradient(rgba(185,28,28,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(185,28,28,.04) 1px,transparent 1px)",backgroundSize:"56px 56px"}}/>
      {/* Top fade */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:200,zIndex:2,background:"linear-gradient(to bottom,rgba(5,5,5,.5) 0%,transparent 100%)"}}/>

      {/* Content */}
      <div style={{position:"relative",zIndex:5,flex:1,display:"flex",alignItems:"center",padding:"130px 5% 0",maxWidth:1300,width:"100%",margin:"0 auto"}}>
        <div style={{maxWidth:820}}>

          {/* Eyebrow */}
          <div style={{animation:"fadeUp .6s .06s ease both",opacity:0,marginBottom:24}}>
            <span style={{
              display:"inline-flex",alignItems:"center",gap:8,
              background:"rgba(185,28,28,.14)",border:"1px solid rgba(185,28,28,.38)",
              borderRadius:100,padding:"6px 18px",
              fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".75rem",
              letterSpacing:".24em",textTransform:"uppercase",color:"#EF4444",
            }}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#EF4444",animation:"shimmer 2s ease-in-out infinite"}}/>
              Early Access Now Open
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-h display" style={{
            fontSize:"clamp(3rem,7.8vw,7rem)",lineHeight:.9,letterSpacing:".02em",color:"var(--white)",
            textShadow:"0 6px 48px rgba(0,0,0,.7)",
            animation:"fadeUp .82s .2s ease both",opacity:0,marginBottom:0,
          }}>
            FIND YOUR FIT.<br/>
            <span style={{color:"#EF4444"}}>STAY ACCOUNTABLE.</span><br/>
            ACHIEVE MORE.
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize:"clamp(.95rem,1.6vw,1.12rem)",color:"rgba(245,245,245,.7)",
            lineHeight:1.78,maxWidth:540,
            animation:"fadeUp .82s .38s ease both",opacity:0,marginBottom:44,marginTop:22,
          }}>
            The fitness accountability platform built to help you find the right partner, build unshakable habits, and get real results —{" "}
            <em style={{color:"#EF4444",fontStyle:"italic"}}>together.</em>
          </p>

          {/* CTAs */}
          <div style={{display:"flex",flexWrap:"wrap",gap:14,animation:"fadeUp .82s .54s ease both",opacity:0}}>
            <button className="btn-primary pulse" onClick={onCTA} style={{fontSize:"1rem",padding:"18px 52px"}}>
              Join The Movement
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn-outline" onClick={()=>document.getElementById("how-it-works")?.scrollIntoView({behavior:"smooth"})}>
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div style={{display:"flex",flexWrap:"wrap",gap:"10px 48px",marginTop:60,animation:"fadeUp .82s .7s ease both",opacity:0}}>
            {[["2,400+","Waitlist members"],["94%","Report better consistency"],["48 hrs","Average match time"]].map(([n,l])=>(
              <div key={l}>
                <div className="display" style={{fontSize:"2.4rem",color:"var(--white)",lineHeight:1}}>{n}</div>
                <div className="barlow" style={{fontSize:".7rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(245,245,245,.4)",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Pillars pinned to bottom of hero */}
      <HeroPillars/>

      {/* Scroll hint */}
      <div style={{position:"absolute",bottom:158,left:"50%",transform:"translateX(-50%)",zIndex:5,display:"flex",flexDirection:"column",alignItems:"center",gap:5,opacity:.35}}>
        <span className="barlow" style={{fontSize:".6rem",letterSpacing:".24em",textTransform:"uppercase",color:"var(--gray)"}}>Scroll</span>
        <div style={{width:1,height:44,background:"linear-gradient(to bottom,var(--red),transparent)"}}/>
      </div>
    </section>
  );
}

function HeroPillars() {
  const pills=[
    {icon:<PeopleIcon/>,title:"Find Your Partner",desc:"Match with driven people who share your goals, schedule, and training style."},
    {icon:<ShieldIcon/>,title:"Stay Accountable",desc:"Check in, track progress, and keep each other on track every step of the way."},
    {icon:<TrendIcon/>,title:"Achieve More",desc:"Stronger together. Push further. Get results you couldn't get on your own."},
    {icon:<FireIcon/>,title:"Built for Every Goal",desc:"From HYROX to weight loss to strength and beyond — we've got your goal."},
  ];
  return(
    <div style={{position:"relative",zIndex:5,background:"linear-gradient(to top,rgba(5,5,5,.98) 50%,transparent)",padding:"56px 5% 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:28}}>
        {pills.map(({icon,title,desc},i)=>(
          <div key={i} style={{textAlign:"center",animation:`fadeUp .65s ${.06+i*.1}s ease both`,opacity:0}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:"rgba(185,28,28,.12)",border:"1px solid rgba(185,28,28,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>{icon}</div>
            <h3 className="barlow" style={{fontWeight:700,fontSize:"1rem",letterSpacing:".15em",textTransform:"uppercase",color:"var(--white)",marginBottom:7}}>{title}</h3>
            <p style={{fontSize:".83rem",color:"rgba(245,245,245,.45)",lineHeight:1.65}}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PROBLEM ───────────────────────────────────────────────────── */
function Problem() {
  const[ref,vis]=useInView();
  const cards=[
    {e:<BreakIcon/>,t:"You start strong every January — and quietly quit by February"},
    {e:<ResetIcon/>,t:"You've restarted the same fitness goal four or more times this year"},
    {e:<AloneIcon/>,t:"Solo workouts feel hollow when nobody is counting on you to show up"},
    {e:<DrainIcon/>,t:"Motivation spikes and disappears — leaving you back at square one"},
  ];
  return(
    <Section bg="var(--dark)">
      <Inner>
        <div ref={ref}>
          <SectionHead vis={vis} label="The Problem"
            headline={`MOTIVATION FADES.<br/><span style="color:#EF4444">ACCOUNTABILITY STICKS.</span>`}
            sub="The problem isn't willpower. It's having no one to answer to."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
            {cards.map(({e,t},i)=>(
              <div key={i} className="card" style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:`all .6s ${i*.12}s ease`}}>
                <div style={{marginBottom:14}}>{e}</div>
                <p style={{color:"#E0E0E0",lineHeight:1.68,fontSize:".97rem"}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </Inner>
    </Section>
  );
}

/* ─── SOLUTION ──────────────────────────────────────────────────── */
function Solution() {
  const[ref,vis]=useInView(.1);
  return(
    <Section>
      <Inner>
        <div ref={ref} className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>
          {/* Visual side — premium design card, no photo */}
          <div style={{position:"relative",opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all .85s ease"}}>
            <div style={{borderRadius:18,overflow:"hidden",aspectRatio:"3/4",position:"relative",background:"var(--dark)",border:"1px solid var(--border)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:28}}>
              {/* Top: match card header */}
              <div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                  <div className="barlow" style={{fontSize:".7rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--red)"}}>Your Match</div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:"#22c55e"}}/>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".7rem",letterSpacing:".1em",color:"#22c55e"}}>ACTIVE</span>
                  </div>
                </div>
                {/* Partner cards */}
                {[{ini:"JM",name:"Jordan M.",goal:"Build muscle",days:"5×/week",streak:22},{ini:"SR",name:"Sam R.",goal:"Lose 20 lbs",days:"4×/week",streak:15}].map((p,i)=>(
                  <div key={i} style={{background:"var(--graph)",border:"1px solid var(--border)",borderRadius:12,padding:"14px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,#B91C1C,#7f1d1d)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Anton',sans-serif",fontStyle:"italic",fontSize:".9rem",color:"var(--white)",flexShrink:0}}>{p.ini}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,color:"var(--white)",fontSize:".9rem"}}>{p.name}</div>
                      <div style={{fontSize:".75rem",color:"var(--gray)"}}>{p.goal} · {p.days}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{display:"flex",alignItems:"center",gap:4}}><FlameIcon size={14}/><span className="display" style={{fontSize:"1.1rem",color:"var(--white)"}}>{p.streak}</span></div>
                      <div style={{fontSize:".6rem",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:".1em",textTransform:"uppercase"}}>day streak</div>
                    </div>
                  </div>
                ))}
                {/* Compatibility bar */}
                <div style={{background:"rgba(185,28,28,.1)",border:"1px solid rgba(185,28,28,.25)",borderRadius:10,padding:"12px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span className="barlow" style={{fontSize:".68rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--gray)"}}>Compatibility</span>
                    <span className="barlow" style={{fontSize:".68rem",letterSpacing:".1em",color:"#EF4444",fontWeight:700}}>98%</span>
                  </div>
                  <div style={{height:4,background:"var(--border)",borderRadius:4}}>
                    <div style={{width:"98%",height:"100%",background:"linear-gradient(90deg,#B91C1C,#EF4444)",borderRadius:4}}/>
                  </div>
                </div>
              </div>
              {/* Bottom: weekly check-in grid */}
              <div>
                <div className="barlow" style={{fontSize:".68rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--muted)",marginBottom:10}}>This Week's Check-ins</div>
                <div style={{display:"flex",gap:6}}>
                  {["M","T","W","T","F","S","S"].map((d,i)=>(
                    <div key={i} style={{flex:1,textAlign:"center"}}>
                      <div style={{fontSize:".58rem",color:"var(--muted)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif"}}>{d}</div>
                      <div style={{height:32,borderRadius:5,background:i<5?"#B91C1C":"var(--graph)",border:"1px solid",borderColor:i<5?"transparent":"var(--border)",opacity:i===4?.6:1}}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{position:"absolute",top:-14,left:-14,width:70,height:70,border:"2px solid rgba(185,28,28,.3)",borderRadius:10,zIndex:-1}}/>
            <div style={{position:"absolute",bottom:-14,right:-14,width:50,height:50,border:"1px solid rgba(185,28,28,.18)",borderRadius:8,zIndex:-1}}/>
          </div>

          {/* Text side */}
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(30px)",transition:"all .85s .2s ease"}}>
            <span className="redline"/>
            <span className="label">The Solution</span>
            <h2 className="display" style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",color:"var(--white)",marginTop:10,lineHeight:1}}>
              THE RIGHT PARTNER<br/><span style={{color:"#EF4444"}}>CHANGES EVERYTHING</span>
            </h2>
            <p style={{marginTop:20,fontSize:".98rem",color:"var(--gray)",lineHeight:1.82}}>
              AccountaFit matches you with someone who shares your goals, schedule, and commitment level. Not a cheerleader — a co-conspirator in discipline.
            </p>
            <div style={{marginTop:30,display:"flex",flexDirection:"column",gap:13}}>
              {["Matched by goals, schedule & energy level","Daily check-ins that build unbreakable habits","Shared progress tracking — nowhere to hide","Smart rematch if a partnership isn't clicking"].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(185,28,28,.14)",border:"1px solid rgba(185,28,28,.38)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{color:"#EF4444",fontSize:".7rem",fontWeight:700}}>✓</span>
                  </div>
                  <span style={{color:"#E0E0E0",fontSize:".97rem"}}>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{marginTop:36}} onClick={()=>document.querySelector(".pulse")?.click()}>
              Get Matched Now →
            </button>
          </div>
        </div>
      </Inner>
    </Section>
  );
}

/* ─── FEATURES ──────────────────────────────────────────────────── */
function Features() {
  const[ref,vis]=useInView();
  const feats=[
    {icon:<TargetIcon/>,title:"Goal-Based Matching",desc:"Paired with someone chasing the same outcomes — not just a random gym buddy."},
    {icon:<CalendarIcon/>,title:"Schedule Alignment",desc:"Early birds with early birds. Night owls with night owls. Your schedules sync perfectly."},
    {icon:<FlameIcon size={30}/>,title:"Streak Accountability",desc:"Shared streaks make quitting feel personal. Your partner is literally counting on you."},
    {icon:<ChatIcon/>,title:"Daily Check-Ins",desc:"60-second habit-building check-ins that take minutes but build lasting discipline."},
    {icon:<ChartIcon/>,title:"Progress Visibility",desc:"Both partners see progress. No hiding, no excuses, no falling off quietly."},
    {icon:<RefreshIcon/>,title:"Smart Rematch",desc:"If chemistry isn't there, we find you a better match. No awkwardness required."},
  ];
  return(
    <Section id="features" bg="var(--dark)">
      <Inner>
        <div ref={ref}>
          <SectionHead vis={vis} label="Features"
            headline={`BUILT FOR <span style="color:#EF4444">DISCIPLINE</span>`}
            sub="Every feature designed to make consistency your new default."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
            {feats.map(({icon,title,desc},i)=>(
              <div key={i} className="card" style={{opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:`all .6s ${i*.08}s ease`}}>
                <span className="redline"/>
                <div style={{marginBottom:16}}>{icon}</div>
                <h3 className="barlow" style={{fontWeight:700,fontSize:"1.1rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--white)",marginBottom:8}}>{title}</h3>
                <p style={{color:"var(--gray)",lineHeight:1.65,fontSize:".92rem"}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Inner>
    </Section>
  );
}

/* ─── HOW IT WORKS ──────────────────────────────────────────────── */
function HowItWorks() {
  const[ref,vis]=useInView(.1);
  const steps=[
    {n:"01",title:"Create Your Profile",desc:"Tell us your goals, schedule, fitness level, and how you like to be held accountable. Takes 3 minutes."},
    {n:"02",title:"Get Matched",desc:"Our algorithm finds you a partner with compatible goals, schedule, and commitment energy. Within 48 hours."},
    {n:"03",title:"Connect & Commit",desc:"Meet your partner, align on expectations, and make a mutual commitment to show up — every single day."},
    {n:"04",title:"Build Together",desc:"Daily check-ins, shared streaks, joint progress. Discipline stops being a struggle and starts being identity."},
  ];
  return(
    <Section id="how-it-works">
      <Inner max={1000}>
        <div ref={ref}>
          <SectionHead vis={vis} label="How It Works"
            headline={`FOUR STEPS TO <span style="color:#EF4444">CONSISTENCY</span>`}/>
          <div style={{display:"flex",flexDirection:"column",gap:44,position:"relative"}}>
            <div className="hide-m" style={{position:"absolute",left:33,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,var(--red) 0%,var(--red) 72%,transparent)",opacity:.22,pointerEvents:"none"}}/>
            {steps.map(({n,title,desc},i)=>(
              <div key={i} style={{display:"flex",gap:30,alignItems:"flex-start",opacity:vis?1:0,transform:vis?"none":"translateX(-22px)",transition:`all .72s ${i*.15}s ease`}}>
                <div className="display" style={{width:68,height:68,borderRadius:"50%",background:"var(--dark)",border:"2px solid var(--red)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",color:"var(--red)",flexShrink:0,zIndex:1}}>{n}</div>
                <div style={{paddingTop:13}}>
                  <h3 className="barlow" style={{fontWeight:700,fontSize:"1.2rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--white)",marginBottom:8}}>{title}</h3>
                  <p style={{color:"var(--gray)",lineHeight:1.72,maxWidth:520,fontSize:".95rem"}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Inner>
    </Section>
  );
}

/* ─── STREAK SECTION ────────────────────────────────────────────── */
function StreakSection() {
  const[ref,vis]=useInView(.1);
  const days=["MON","TUE","WED","THU","FRI","SAT","SUN"];
  const weekA=[true,true,true,true,true,false,false];
  const weekB=[true,true,true,true,false,false,false];

  return(
    <Section id="streaks" bg="var(--dark)">
      <Inner>
        <div ref={ref} className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>

          {/* Text side */}
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-30px)",transition:"all .85s ease"}}>
            <span className="redline"/>
            <span className="label">Streak Tracking</span>
            <h2 className="display" style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",color:"var(--white)",marginTop:10,lineHeight:1}}>
              STREAKS YOU<br/><span style={{color:"#EF4444"}}>CAN'T BREAK ALONE</span>
            </h2>
            <p style={{marginTop:20,fontSize:".98rem",color:"var(--gray)",lineHeight:1.82}}>
              Every day you check in, your streak grows — and so does your partner's. When both of you are on the line, skipping becomes personal. That's the difference between a 7-day streak and a 70-day one.
            </p>
            <div style={{marginTop:30,display:"flex",flexDirection:"column",gap:14}}>
              {[
                {icon:<FlameIcon size={18}/>,text:"Shared streaks — both partners must check in daily"},
                {icon:<FlameIcon size={18}/>,text:"Streak warnings sent before midnight so neither of you breaks the chain"},
                {icon:<FlameIcon size={18}/>,text:"Milestone celebrations at 7, 30, 60, and 100 days"},
                {icon:<FlameIcon size={18}/>,text:"Streak history shows your longest run — and keeps you hungry for more"},
              ].map(({icon,text},i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{width:32,height:32,borderRadius:8,background:"rgba(185,28,28,.14)",border:"1px solid rgba(185,28,28,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{icon}</div>
                  <span style={{color:"#E0E0E0",fontSize:".97rem",lineHeight:1.6}}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: streak dashboard card */}
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(30px)",transition:"all .85s .2s ease"}}>
            <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:20,padding:28,boxShadow:"0 32px 80px rgba(0,0,0,.5),0 0 60px rgba(185,28,28,.08)"}}>

              {/* Header */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
                <div>
                  <div className="barlow" style={{fontSize:".68rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--muted)",marginBottom:4}}>Active Streak</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                    <span className="display" style={{fontSize:"3.8rem",color:"var(--white)",lineHeight:1}}>47</span>
                    <span className="barlow" style={{fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--gray)"}}>days</span>
                  </div>
                </div>
                <div style={{textAlign:"center"}}>
                  <FlameIcon size={52}/>
                  <div className="barlow" style={{fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--red)",marginTop:4}}>On Fire</div>
                </div>
              </div>

              {/* Progress bar to next milestone */}
              <div style={{marginBottom:22}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                  <span style={{fontSize:".8rem",color:"var(--gray)"}}>Next milestone</span>
                  <span className="barlow" style={{fontSize:".78rem",letterSpacing:".1em",color:"#EF4444",fontWeight:700}}>60 days — 13 to go</span>
                </div>
                <div style={{height:6,background:"var(--graph)",borderRadius:6}}>
                  <div style={{width:"78%",height:"100%",background:"linear-gradient(90deg,#B91C1C,#EF4444)",borderRadius:6,boxShadow:"0 0 12px rgba(239,68,68,.4)"}}/>
                </div>
              </div>

              {/* This week — both partners */}
              {[{label:"You",checked:weekA},{label:"Your Partner",checked:weekB}].map(({label,checked},pi)=>(
                <div key={pi} style={{marginBottom:pi===0?18:0}}>
                  <div className="barlow" style={{fontSize:".65rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>{label}</div>
                  <div style={{display:"flex",gap:5}}>
                    {days.map((d,i)=>(
                      <div key={i} style={{flex:1,textAlign:"center"}}>
                        <div style={{fontSize:".5rem",color:"var(--muted)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:".08em"}}>{d}</div>
                        <div style={{
                          height:34,borderRadius:6,
                          background:checked[i]?"#B91C1C":"var(--graph)",
                          border:"1px solid",borderColor:checked[i]?"transparent":"var(--border)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          boxShadow:checked[i]?"0 0 8px rgba(185,28,28,.35)":"none",
                          transition:"all .2s",
                        }}>
                          {checked[i]&&<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mutual accountability note */}
              <div style={{marginTop:20,background:"rgba(185,28,28,.08)",border:"1px solid rgba(185,28,28,.2)",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                <FlameIcon size={16}/>
                <span style={{fontSize:".82rem",color:"rgba(245,245,245,.7)",lineHeight:1.5}}>Both partners must check in to keep the streak alive. No ghosting. No excuses.</span>
              </div>
            </div>
          </div>
        </div>
      </Inner>
    </Section>
  );
}

/* ─── BENEFITS ──────────────────────────────────────────────────── */
function Benefits() {
  const[ref,vis]=useInView();
  const stats=[
    {v:"3×",l:"More likely to achieve goals with an accountability partner vs going solo"},
    {v:"94%",l:"Of AccountaFit users report improved workout consistency within the first month"},
    {v:"65%",l:"Higher goal completion rate compared to solo training programs"},
    {v:"14 days",l:"Average time to form a consistent new habit when partnered"},
  ];
  return(
    <Section bg="var(--dark)" style={{padding:"90px 5%"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.1) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <Inner>
        <div ref={ref}>
          <SectionHead vis={vis} label="The Research"
            headline={`ACCOUNTABILITY <span style="color:#EF4444">WORKS</span>`}
            sub="The science is clear. The right partner doesn't just motivate — they rewire your relationship with commitment."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:22}}>
            {stats.map(({v,l},i)=>(
              <div key={i} style={{textAlign:"center",padding:"48px 22px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:`all .65s ${i*.1}s ease`}}>
                <div className="display" style={{fontSize:"3.4rem",color:"var(--red)",lineHeight:1,marginBottom:14}}>{v}</div>
                <p style={{fontSize:".88rem",color:"var(--gray)",lineHeight:1.65}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </Inner>
    </Section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────────── */
function Testimonials() {
  const[ref,vis]=useInView(.08);
  const ts=[
    {name:"Marcus T.",role:"Lost 28 lbs in 4 months",ini:"MT",q:"I've tried every fitness app. The difference with AccountaFit is someone is literally waiting for my check-in. That changes everything."},
    {name:"Priya S.",role:"Marathon runner, 3× finisher",ini:"PS",q:"My partner and I haven't missed a single check-in in 11 weeks. That kind of streak becomes part of who you are."},
    {name:"Devon K.",role:"Built 15 lbs of muscle",ini:"DK",q:"Stop thinking about willpower. Willpower runs out. Accountability doesn't. This app proved that to me."},
    {name:"Aaliyah W.",role:"Hit her goal weight",ini:"AW",q:"I didn't need a trainer. I needed someone who would notice if I stopped showing up. AccountaFit gave me exactly that."},
    {name:"Carlos M.",role:"6 months of consistency",ini:"CM",q:"The matching is real. My partner also trains at 5am. We've never met in person but we show up for each other every single day."},
    {name:"Jordan B.",role:"Strength training comeback",ini:"JB",q:"Accountability partners aren't a hack. They're how humans were designed to work. This platform just formalizes it brilliantly."},
  ];
  return(
    <Section id="testimonials">
      <Inner>
        <div ref={ref}>
          <SectionHead vis={vis} label="Testimonials"
            headline={`REAL PEOPLE. <span style="color:#EF4444">REAL RESULTS.</span>`}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
            {ts.map(({name,role,ini,q},i)=>(
              <div key={i} className="card" style={{opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:`all .6s ${i*.08}s ease`}}>
                <div style={{fontSize:"2.4rem",color:"rgba(185,28,28,.3)",fontFamily:"Georgia,serif",lineHeight:1,marginBottom:12}}>"</div>
                <p style={{color:"#E0E0E0",lineHeight:1.74,fontSize:".93rem",marginBottom:22}}>{q}</p>
                <div style={{display:"flex",alignItems:"center",gap:12,borderTop:"1px solid var(--border)",paddingTop:18}}>
                  <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#B91C1C,#7f1d1d)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Anton',sans-serif",fontStyle:"italic",color:"var(--white)",fontSize:".85rem"}}>{ini}</div>
                  <div>
                    <div style={{fontWeight:600,color:"var(--white)",fontSize:".87rem"}}>{name}</div>
                    <div className="barlow" style={{fontSize:".7rem",letterSpacing:".1em",color:"var(--red)"}}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Inner>
    </Section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
function FAQ() {
  const[open,setOpen]=useState(null);
  const faqs=[
    {q:"Is AccountaFit a dating app?",a:"Absolutely not. AccountaFit is strictly a fitness accountability platform. Matching is based entirely on goals, schedule, and commitment style — not personal attraction or compatibility."},
    {q:"How does the matching algorithm work?",a:"We match based on fitness goals, training schedule, experience level, preferred communication style, and accountability intensity. The goal is maximum partnership synergy for consistency, not socializing."},
    {q:"What if my partner stops showing up?",a:"Our Smart Rematch system detects disengaged partnerships early and offers you a better-fit match. We protect your momentum because we know how hard consistency is to rebuild."},
    {q:"What does it cost?",a:"Early access members join the waitlist and receive priority matching plus a free trial period at launch. Subscription pricing will be announced closer to the launch date."},
    {q:"How much time does it take each day?",a:"As little as 60 seconds for a daily check-in. Consistency is the point, not complexity. Your check-ins adapt to fit your lifestyle and schedule."},
    {q:"Can I choose my own accountability partner?",a:"At launch we focus on our algorithm-driven matching for best results. Future updates will allow you to invite specific people and form small accountability groups."},
  ];
  return(
    <Section id="faq" bg="var(--dark)">
      <Inner max={740}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="label">FAQ</span>
          <h2 className="display" style={{fontSize:"clamp(2rem,5vw,3.4rem)",color:"var(--white)",marginTop:10}}>
            COMMON <span style={{color:"#EF4444"}}>QUESTIONS</span>
          </h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {faqs.map(({q,a},i)=>(
            <div key={i} className={`faq-item${open===i?" open":""}`}>
              <button className="faq-btn" onClick={()=>setOpen(open===i?null:i)}>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"var(--white)",fontSize:".97rem",flex:1,textAlign:"left"}}>{q}</span>
                <span className="faq-plus" style={{transform:open===i?"rotate(45deg)":"none"}}>+</span>
              </button>
              {open===i&&<div className="faq-answer">{a}</div>}
            </div>
          ))}
        </div>
      </Inner>
    </Section>
  );
}

/* ─── FINAL CTA ─────────────────────────────────────────────────── */
function FinalCTA({onCTA}) {
  const[email,setEmail]=useState("");
  const[done,setDone]=useState(false);
  const submit=()=>{if(email.trim())setDone(true);};
  return(
    <section style={{position:"relative",overflow:"hidden",textAlign:"center",background:"linear-gradient(160deg,#0A0A0A 0%,#140303 45%,#0A0A0A 100%)"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.18) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(185,28,28,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(185,28,28,.04) 1px,transparent 1px)",backgroundSize:"56px 56px",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:2,padding:"120px 5%",maxWidth:660,margin:"0 auto"}}>
        <span className="label">Join The Movement</span>
        <h2 className="display" style={{fontSize:"clamp(2.6rem,7.5vw,5.5rem)",color:"var(--white)",marginTop:10,lineHeight:.92}}>
          DONE<br/>STARTING OVER?
        </h2>
        <p style={{marginTop:20,fontSize:"1rem",color:"rgba(245,245,245,.68)",lineHeight:1.78}}>
          Join 2,400+ people who chose accountability over intention. Early access members get priority matching and first access to all features.
        </p>
        {done?(
          <div style={{marginTop:48,background:"rgba(185,28,28,.12)",border:"1px solid rgba(185,28,28,.38)",borderRadius:16,padding:"36px 40px"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><FlameIcon size={52}/></div>
            <div className="display" style={{fontSize:"2rem",color:"var(--white)",marginBottom:10}}>YOU'RE ON THE LIST</div>
            <p style={{color:"var(--gray)"}}>We'll reach out with early access. Stay disciplined until then.</p>
          </div>
        ):(
          <>
            <div style={{marginTop:44,display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
              <input type="email" placeholder="Enter your email address" value={email}
                onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}
                className="email-input"/>
              <button className="btn-primary" onClick={submit} style={{whiteSpace:"nowrap",padding:"15px 40px"}}>
                Claim My Spot →
              </button>
            </div>
            <p style={{marginTop:14,fontSize:".76rem",color:"rgba(245,245,245,.28)"}}>No credit card. No spam. Just early access.</p>
          </>
        )}
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────── */
function Footer() {
  return(
    <footer style={{background:"#030303",borderTop:"1px solid #0F0F0F",padding:"56px 5% 34px"}}>
      <Inner>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:36,marginBottom:44}}>
          <div>
            <Logo size="1.5rem"/>
            <p style={{marginTop:12,fontSize:".82rem",color:"var(--muted)",maxWidth:240,lineHeight:1.68}}>Consistency over motivation.<br/>Accountability over intention.</p>
            {/* Social icons */}
            <div style={{display:"flex",gap:12,marginTop:20}}>
              {["Twitter","Instagram","TikTok"].map(s=>(
                <div key={s} style={{width:34,height:34,borderRadius:"50%",background:"var(--dark)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"border-color .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="var(--red)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                  <span style={{fontSize:".62rem",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:".08em",color:"var(--muted)"}}>{s[0]}</span>
                </div>
              ))}
            </div>
            {/* App store badges */}
            <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:24}}>
              {/* App Store */}
              <a href="#" style={{display:"inline-flex",alignItems:"center",gap:12,background:"var(--graph)",border:"1px solid var(--border)",borderRadius:10,padding:"10px 16px",textDecoration:"none",transition:"border-color .2s",width:"fit-content"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="var(--red)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--white)">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div style={{fontSize:".6rem",color:"var(--muted)",fontFamily:"'DM Sans',sans-serif",lineHeight:1,marginBottom:1}}>Download on the</div>
                  <div style={{fontSize:".88rem",fontWeight:600,color:"var(--white)",fontFamily:"'DM Sans',sans-serif",lineHeight:1}}>App Store</div>
                </div>
              </a>
              {/* Google Play */}
              <a href="#" style={{display:"inline-flex",alignItems:"center",gap:12,background:"var(--graph)",border:"1px solid var(--border)",borderRadius:10,padding:"10px 16px",textDecoration:"none",transition:"border-color .2s",width:"fit-content"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="var(--red)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.76c.3.17.64.24.99.19L15.34 12 11.5 8.16 3.18 23.76z" fill="#EA4335"/>
                  <path d="M20.52 10.61l-2.5-1.44-3.33 3.33 3.33 3.34 2.53-1.46c.72-.41.72-1.44-.03-1.77z" fill="#FBBC04"/>
                  <path d="M3.18.24C2.85.46 2.62.85 2.62 1.35v21.3c0 .5.23.89.56 1.11l.13.07 11.94-11.94v-.28L3.31.17l-.13.07z" fill="#4285F4"/>
                  <path d="M15.34 12l3.68-3.68-2.53-1.46C15.7 6.44 14.9 6.6 14.5 7L11.5 8.16 15.34 12z" fill="#34A853"/>
                </svg>
                <div>
                  <div style={{fontSize:".6rem",color:"var(--muted)",fontFamily:"'DM Sans',sans-serif",lineHeight:1,marginBottom:1}}>Get it on</div>
                  <div style={{fontSize:".88rem",fontWeight:600,color:"var(--white)",fontFamily:"'DM Sans',sans-serif",lineHeight:1}}>Google Play</div>
                </div>
              </a>
            </div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:52}}>
            {[
              {title:"Product",links:["Features","How It Works","Pricing","FAQ"]},
              {title:"Company",links:["About","Blog","Careers","Contact"]},
              {title:"Legal",links:["Privacy Policy","Terms of Service","Cookies"]},
            ].map(({title,links})=>(
              <div key={title}>
                <div className="barlow" style={{fontWeight:700,fontSize:".68rem",letterSpacing:".22em",textTransform:"uppercase",color:"var(--muted)",marginBottom:14}}>{title}</div>
                {links.map(l=>(
                  <a key={l} href="#" style={{display:"block",color:"var(--muted)",fontSize:".84rem",textDecoration:"none",marginBottom:9,transition:"color .2s"}}
                    onMouseEnter={e=>e.target.style.color="var(--white)"} onMouseLeave={e=>e.target.style.color="var(--muted)"}>{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="divider" style={{marginBottom:24}}/>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:10}}>
          <p style={{fontSize:".76rem",color:"var(--border)"}}>© 2026 AccountaFit. All rights reserved.</p>
          <p style={{fontSize:".76rem",color:"var(--border)"}}>Built for people who don't quit.</p>
        </div>
      </Inner>
    </footer>
  );
}

/* ─── MODAL ─────────────────────────────────────────────────────── */
function Modal({onClose}) {
  const[email,setEmail]=useState("");
  const[done,setDone]=useState(false);
  const submit=()=>{if(email.trim())setDone(true);};
  return(
    <div style={{position:"fixed",inset:0,zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.88)",backdropFilter:"blur(14px)"}}/>
      <div style={{position:"relative",background:"var(--dark)",border:"1px solid var(--border)",borderRadius:20,padding:"52px 44px",maxWidth:480,width:"100%",animation:"fadeUp .3s ease"}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:18,right:20,background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:"1.3rem",lineHeight:1}}>✕</button>
        {done?(
          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><FlameIcon size={52}/></div>
            <h3 className="display" style={{fontSize:"2.2rem",color:"var(--white)",marginBottom:10}}>YOU'RE IN.</h3>
            <p style={{color:"var(--gray)"}}>We'll reach out with early access details. Stay consistent until then.</p>
            <button className="btn-primary" onClick={onClose} style={{marginTop:26,width:"100%",justifyContent:"center"}}>Close</button>
          </div>
        ):(
          <>
            <span className="label">Early Access</span>
            <h3 className="display" style={{fontSize:"2.6rem",color:"var(--white)",marginTop:8,marginBottom:14,lineHeight:.95}}>
              JOIN THE<br/><span style={{color:"#EF4444"}}>WAITLIST</span>
            </h3>
            <p style={{color:"var(--gray)",marginBottom:26,lineHeight:1.68,fontSize:".94rem"}}>Priority matching and free access to all features at launch. No credit card needed.</p>
            <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&submit()}
              style={{width:"100%",marginBottom:12,background:"var(--graph)",border:"1px solid var(--border)",borderRadius:10,color:"var(--white)",fontFamily:"'DM Sans',sans-serif",fontSize:"1rem",padding:"15px 18px",outline:"none",transition:"border-color .2s"}}
              onFocus={e=>e.target.style.borderColor="var(--red)"} onBlur={e=>e.target.style.borderColor="var(--border)"}/>
            <button className="btn-primary" style={{width:"100%",justifyContent:"center",padding:"15px 0"}} onClick={submit}>
              Claim My Spot →
            </button>
            <p style={{marginTop:11,fontSize:".74rem",color:"var(--muted)",textAlign:"center"}}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Brand SVG Icon System — all red/crimson, no emojis ────────── */

// Core flame — used everywhere fire/energy is needed
function FlameIcon({size=28,color="#EF4444"}) {
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 7.5 6.5 7.5 11.5C7.5 13.163 8.163 14.674 9.25 15.75C9.163 15.163 9.25 14.5 9.5 14C10.5 15 11 16.5 11 17.5C11 19.433 12.343 21 14 21C12.667 19.5 12.5 17.5 13.5 16C14 15.5 14.5 15 14.5 14C15.5 15 16 16.5 16 17.5C17.5 16 18.5 13.5 16.5 11C17.5 11 18.5 11.5 19 12C19 7 15 3.5 12 2Z" fill={color} opacity=".9"/>
      <path d="M12 14C12 14 10.5 15.5 10.5 17C10.5 18.381 11.119 19 12 19.5C12.881 19 13.5 18.381 13.5 17C13.5 15.5 12 14 12 14Z" fill={color} opacity=".65"/>
    </svg>
  );
}

// Problem: broken chain / quit
function BreakIcon() {
  return(
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      <line x1="4" y1="4" x2="20" y2="20" stroke="#B91C1C" strokeWidth="2"/>
    </svg>
  );
}

// Problem: reset / restart loop
function ResetIcon() {
  return(
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <line x1="12" y1="8" x2="12" y2="12" stroke="#B91C1C" strokeWidth="2.2"/>
      <circle cx="12" cy="15" r="1" fill="#EF4444"/>
    </svg>
  );
}

// Problem: alone / no partner
function AloneIcon() {
  return(
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7"/>
      <path d="M17 17l4 4M21 17l-4 4" stroke="#B91C1C" strokeWidth="2"/>
    </svg>
  );
}

// Problem: drained / battery dead
function DrainIcon() {
  return(
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2"/>
      <path d="M22 11v2" strokeWidth="2.5"/>
      <path d="M5 11h3l-2 4h4" stroke="#B91C1C" strokeWidth="1.8"/>
    </svg>
  );
}

// Feature: target / goal
function TargetIcon() {
  return(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2" fill="#EF4444"/>
    </svg>
  );
}

// Feature: schedule / calendar
function CalendarIcon() {
  return(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h2v2H8z" fill="#EF4444" stroke="none"/>
    </svg>
  );
}

// Feature: chat / check-in
function ChatIcon() {
  return(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <line x1="9" y1="10" x2="15" y2="10"/>
      <line x1="9" y1="14" x2="13" y2="14"/>
    </svg>
  );
}

// Feature: bar chart / progress
function ChartIcon() {
  return(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}

// Feature: refresh / rematch
function RefreshIcon() {
  return(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  );
}

/* ─── Icon components ───────────────────────────────────────────── */
function PeopleIcon() {
  return(<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
}
function ShieldIcon() {
  return(<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
}
function TrendIcon() {
  return(<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>);
}
function FireIcon() {
  return(<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-6 4.5-6 10a6 6 0 0 0 12 0C18 6.5 12 2 12 2z"/><path d="M12 12c0 0-3 2-3 4.5a3 3 0 0 0 6 0C15 14 12 12 12 12z"/></svg>);
}

/* ─── APP ───────────────────────────────────────────────────────── */
export default function AccountaFit() {
  const[modal,setModal]=useState(false);
  return(
    <>
      <style dangerouslySetInnerHTML={{__html:G}}/>
      <div style={{background:"var(--black)",minHeight:"100vh"}}>
        <Nav onCTA={()=>setModal(true)}/>
        <Hero onCTA={()=>setModal(true)}/>
        <Problem/>
        <Solution/>
        <Features/>
        <HowItWorks/>
        <StreakSection/>
        <Benefits/>
        <Testimonials/>
        <FAQ/>
        <FinalCTA onCTA={()=>setModal(true)}/>
        <Footer/>
        {modal&&<Modal onClose={()=>setModal(false)}/>}
      </div>
    </>
