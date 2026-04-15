import { useState, useEffect } from "react";

const IMG_L = "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=88&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.3";
const IMG_C = "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=900&q=88&fit=crop&crop=top";
const IMG_R = "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=88&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.3";

const LANGS = {
  en: { name: "English",    flag: "🇺🇸" },
  fr: { name: "Français",   flag: "🇫🇷" },
  es: { name: "Español",    flag: "🇪🇸" },
  de: { name: "Deutsch",    flag: "🇩🇪" },
  pt: { name: "Português",  flag: "🇧🇷" },
  it: { name: "Italiano",   flag: "🇮🇹" },
  ja: { name: "日本語",      flag: "🇯🇵" },
  zh: { name: "中文",        flag: "🇨🇳" },
  ko: { name: "한국어",      flag: "🇰🇷" },
  hi: { name: "हिन्दी",     flag: "🇮🇳" },
  sv: { name: "Svenska",    flag: "🇸🇪" },
  nl: { name: "Nederlands", flag: "🇳🇱" },
};

const T = {
  en: { nav: ["How It Works","Features","FAQ"], joinWaitlist: "Join Waitlist", heroTagline: ["FIND YOUR FIT.","STAY ACCOUNTABLE.","ACHIEVE MORE."], heroSub: "The fitness accountability platform built to help you find the right partner, build unshakable habits, and get real results —", heroTogether: "together.", heroCTA: "Join the Movement", feats: ["FIND YOUR PARTNER","STAY ACCOUNTABLE","ACHIEVE MORE","BUILT FOR EVERY GOAL"], featBodies: ["Match with driven people who share your goals, schedule, and training style.","Check in, track progress, and keep each other on track every step of the way.","Stronger together. Push further. Get results you couldn't get on your own.","From HYROX to weight loss to strength and beyond — we've got your goal."], problemLbl: "Sound Familiar?", problemH: ["YOU DON'T HAVE A DISCIPLINE PROBLEM.","YOU HAVE A SUPPORT PROBLEM."], problemSub: "The cycle is the same every time. You start strong. Life picks up. The streak breaks. And then you're staring at day one — again. That's not a character flaw. That's what happens when you're trying to do it alone.", ctaFinal: ["YOU'VE RESTARTED","ENOUGH."], ctaSubline: "This time, stay with it.", ctaBody: "Join the waitlist and be among the first people matched when we launch. Your partner is already out there — they just need you to show up.", ctaBtn: "JOIN THE WAITLIST →", ctaNote: "No credit card. No spam. Just early access.", emailPH: "Enter your email address" },
  fr: { nav: ["Comment ça marche","Fonctionnalités","FAQ"], joinWaitlist: "Rejoindre la liste", heroTagline: ["TROUVEZ VOTRE FIT.","RESTEZ RESPONSABLE.","ACCOMPLISSEZ PLUS."], heroSub: "La plateforme de responsabilité fitness pour trouver le bon partenaire, construire des habitudes solides et obtenir de vrais résultats —", heroTogether: "ensemble.", heroCTA: "Rejoindre le mouvement", feats: ["TROUVEZ VOTRE PARTENAIRE","RESTEZ RESPONSABLE","ACCOMPLISSEZ PLUS","POUR TOUS LES OBJECTIFS"], featBodies: ["Associez-vous à des personnes motivées qui partagent vos objectifs.","Faites le point et restez sur la bonne voie à chaque étape.","Plus forts ensemble. Allez plus loin.","Du HYROX à la perte de poids — nous avons votre objectif."], problemLbl: "Ça vous parle ?", problemH: ["VOUS N'AVEZ PAS UN PROBLÈME DE DISCIPLINE.","VOUS AVEZ UN PROBLÈME DE SOUTIEN."], problemSub: "Le cycle est toujours le même. Vous commencez fort. La vie reprend. Le fil se brise. Et vous regardez de nouveau le jour un.", ctaFinal: ["VOUS AVEZ ASSEZ","RECOMMENCÉ."], ctaSubline: "Cette fois, tenez bon.", ctaBody: "Rejoignez la liste et soyez parmi les premiers associés au lancement.", ctaBtn: "REJOINDRE LA LISTE →", ctaNote: "Sans carte de crédit. Sans spam.", emailPH: "Entrez votre adresse e-mail" },
  es: { nav: ["Cómo funciona","Funciones","Preguntas"], joinWaitlist: "Unirse a la lista", heroTagline: ["ENCUENTRA TU FIT.","MANTENTE RESPONSABLE.","LOGRA MÁS."], heroSub: "La plataforma de responsabilidad fitness para encontrar el socio adecuado y obtener resultados reales —", heroTogether: "juntos.", heroCTA: "Únete al movimiento", feats: ["ENCUENTRA TU SOCIO","MANTENTE RESPONSABLE","LOGRA MÁS","PARA CADA OBJETIVO"], featBodies: ["Conéctate con personas motivadas que comparten tus objetivos.","Haz seguimiento y mantente en el camino correcto.","Más fuertes juntos. Ve más lejos.","De HYROX a pérdida de peso — tenemos tu objetivo."], problemLbl: "¿Te suena familiar?", problemH: ["NO TIENES UN PROBLEMA DE DISCIPLINA.","TIENES UN PROBLEMA DE APOYO."], problemSub: "El ciclo es siempre el mismo. Empiezas fuerte. La vida se complica. El hábito se rompe. Y vuelves al día uno.", ctaFinal: ["YA RECOMENZASTE","SUFICIENTE."], ctaSubline: "Esta vez, quédate.", ctaBody: "Únete a la lista y sé de los primeros emparejados al lanzamiento.", ctaBtn: "UNIRSE A LA LISTA →", ctaNote: "Sin tarjeta de crédito. Sin spam.", emailPH: "Ingresa tu correo electrónico" },
  de: { nav: ["So funktioniert's","Funktionen","FAQ"], joinWaitlist: "Warteliste beitreten", heroTagline: ["FINDE DEIN FIT.","BLEIB VERANTWORTLICH.","ERREICHE MEHR."], heroSub: "Die Fitness-Accountability-Plattform, um den richtigen Partner zu finden und echte Ergebnisse zu erzielen —", heroTogether: "gemeinsam.", heroCTA: "Der Bewegung beitreten", feats: ["FINDE DEINEN PARTNER","BLEIB VERANTWORTLICH","ERREICHE MEHR","FÜR JEDES ZIEL"], featBodies: ["Verbinde dich mit motivierten Menschen, die deine Ziele teilen.","Check-in und einander auf Kurs halten.","Gemeinsam stärker. Gehe weiter.","Von HYROX bis Kraft — wir haben dein Ziel."], problemLbl: "Kommt dir das bekannt vor?", problemH: ["DU HAST KEIN DISZIPLINPROBLEM.","DU HAST EIN UNTERSTÜTZUNGSPROBLEM."], problemSub: "Der Kreislauf ist immer derselbe. Du fängst stark an. Das Leben holt dich ein. Der Streak bricht. Und du stehst wieder bei Tag eins.", ctaFinal: ["DU HAST GENUG","NEU ANGEFANGEN."], ctaSubline: "Diesmal bleibst du dabei.", ctaBody: "Trag dich in die Warteliste ein und sei einer der Ersten beim Start.", ctaBtn: "WARTELISTE BEITRETEN →", ctaNote: "Keine Kreditkarte. Kein Spam.", emailPH: "Gib deine E-Mail-Adresse ein" },
  pt: { nav: ["Como funciona","Recursos","FAQ"], joinWaitlist: "Entrar na lista", heroTagline: ["ENCONTRE SEU FIT.","MANTENHA-SE RESPONSÁVEL.","ALCANCE MAIS."], heroSub: "A plataforma de responsabilidade fitness para encontrar o parceiro certo e obter resultados reais —", heroTogether: "juntos.", heroCTA: "Junte-se ao movimento", feats: ["ENCONTRE SEU PARCEIRO","MANTENHA-SE RESPONSÁVEL","ALCANCE MAIS","PARA CADA OBJETIVO"], featBodies: ["Conecte-se com pessoas motivadas que compartilham seus objetivos.","Faça check-in e mantenha-se no caminho certo.","Mais fortes juntos. Vá mais longe.","De HYROX a perda de peso — temos seu objetivo."], problemLbl: "Soa familiar?", problemH: ["VOCÊ NÃO TEM UM PROBLEMA DE DISCIPLINA.","VOCÊ TEM UM PROBLEMA DE APOIO."], problemSub: "O ciclo é sempre o mesmo. Você começa forte. A vida acontece. O streak quebra. E você está no dia um de novo.", ctaFinal: ["VOCÊ JÁ RECOMEÇOU","O SUFICIENTE."], ctaSubline: "Desta vez, fique.", ctaBody: "Entre na lista e seja um dos primeiros emparelhados no lançamento.", ctaBtn: "ENTRAR NA LISTA →", ctaNote: "Sem cartão de crédito. Sem spam.", emailPH: "Digite seu endereço de e-mail" },
  it: { nav: ["Come funziona","Funzionalità","FAQ"], joinWaitlist: "Iscriviti alla lista", heroTagline: ["TROVA IL TUO FIT.","RIMANI RESPONSABILE.","OTTIENI DI PIÙ."], heroSub: "La piattaforma di responsabilità fitness per trovare il partner giusto e ottenere risultati reali —", heroTogether: "insieme.", heroCTA: "Unisciti al movimento", feats: ["TROVA IL TUO PARTNER","RIMANI RESPONSABILE","OTTIENI DI PIÙ","PER OGNI OBIETTIVO"], featBodies: ["Connettiti con persone motivate che condividono i tuoi obiettivi.","Fai check-in e mantieniti in carreggiata.","Più forti insieme. Vai più lontano.","Da HYROX alla forza — abbiamo il tuo obiettivo."], problemLbl: "Ti suona familiare?", problemH: ["NON HAI UN PROBLEMA DI DISCIPLINA.","HAI UN PROBLEMA DI SUPPORTO."], problemSub: "Il ciclo è sempre lo stesso. Inizi forte. La vita si fa intensa. La striscia si spezza. E sei di nuovo al giorno uno.", ctaFinal: ["HAI RICOMINCIATO","ABBASTANZA."], ctaSubline: "Questa volta, resta.", ctaBody: "Iscriviti alla lista e sii tra i primi abbinati al lancio.", ctaBtn: "ISCRIVITI ALLA LISTA →", ctaNote: "Nessuna carta. Nessuno spam.", emailPH: "Inserisci il tuo indirizzo email" },
  ja: { nav: ["仕組み","機能","FAQ"], joinWaitlist: "リストに登録", heroTagline: ["フィットを見つけよ。","責任を持ち続けよ。","もっと達成しよ。"], heroSub: "正しいパートナーを見つけ、本当の結果を得るためのフィットネス責任プラットフォーム —", heroTogether: "共に。", heroCTA: "参加する", feats: ["パートナーを見つける","責任を持ち続ける","もっと達成する","すべての目標に対応"], featBodies: ["目標を共有する意欲的な人々とつながる。","チェックインし、お互いを正しい道に導く。","共に強くなれ。より遠くへ。","HYROXから減量まで対応。"], problemLbl: "心当たりありますか？", problemH: ["規律の問題ではありません。","サポートの問題です。"], problemSub: "サイクルはいつも同じ。強く始める。ストリークが途切れる。そしてまた1日目に戻る。", ctaFinal: ["もう十分","やり直した。"], ctaSubline: "今度こそ、続けよう。", ctaBody: "ウェイトリストに登録して、ローンチ時に最初にマッチングされる一人になろう。", ctaBtn: "登録する →", ctaNote: "クレジットカード不要。スパムなし。", emailPH: "メールアドレスを入力" },
  zh: { nav: ["工作原理","功能","常见问题"], joinWaitlist: "加入候补名单", heroTagline: ["找到你的健身。","保持责任感。","获得更多成就。"], heroSub: "帮助您找到合适的伙伴，获得真实成果的健身责任平台 —", heroTogether: "共同。", heroCTA: "加入运动", feats: ["找到你的伙伴","保持责任感","获得更多成就","适合每个目标"], featBodies: ["与志同道合的人建立联系。","打卡、追踪进度，互相督促。","共同更强大。走得更远。","从HYROX到减重 — 满足您的目标。"], problemLbl: "听起来熟悉吗？", problemH: ["你没有自律问题。","你有支持问题。"], problemSub: "循环总是一样的。你开始时很强劲。生活变得忙碌。连续记录中断。然后你又回到第一天。", ctaFinal: ["你已经重新开始","够多了。"], ctaSubline: "这次，坚持下去。", ctaBody: "加入候补名单，成为启动时第一批配对的人之一。", ctaBtn: "加入候补名单 →", ctaNote: "无需信用卡。无垃圾邮件。", emailPH: "输入您的电子邮件地址" },
  ko: { nav: ["작동 방식","기능","FAQ"], joinWaitlist: "대기 목록 참여", heroTagline: ["당신의 핏을 찾아라.","책임감을 유지하라.","더 많이 달성하라."], heroSub: "올바른 파트너를 찾고 실제 결과를 얻기 위한 피트니스 책임 플랫폼 —", heroTogether: "함께.", heroCTA: "참여하기", feats: ["파트너 찾기","책임감 유지","더 많이 달성","모든 목표에 적합"], featBodies: ["목표를 공유하는 의욕적인 사람들과 연결.","체크인, 서로 올바른 길로 유지.","함께 더 강해져라.","HYROX부터 체중 감량까지 대응."], problemLbl: "친숙하게 들리나요?", problemH: ["자율 문제가 아닙니다.","지원 문제입니다."], problemSub: "사이클은 항상 같습니다. 강하게 시작합니다. 스트릭이 끊깁니다. 그리고 다시 첫날로 돌아갑니다.", ctaFinal: ["충분히 다시 시작했습니다.","이제 그만."], ctaSubline: "이번에는 계속하세요.", ctaBody: "대기 목록에 등록하고 출시 시 가장 먼저 매칭되는 사람 중 하나가 되세요.", ctaBtn: "참여하기 →", ctaNote: "신용카드 불필요. 스팸 없음.", emailPH: "이메일 주소를 입력하세요" },
  hi: { nav: ["यह कैसे काम करता है","विशेषताएं","FAQ"], joinWaitlist: "सूची में शामिल हों", heroTagline: ["अपना फिट खोजें।","जवाबदेह रहें।","अधिक हासिल करें।"], heroSub: "सही साथी खोजने और वास्तविक परिणाम पाने के लिए फिटनेस जवाबदेही प्लेटफॉर्म —", heroTogether: "साथ में।", heroCTA: "आंदोलन में शामिल हों", feats: ["अपना साथी खोजें","जवाबदेह रहें","अधिक हासिल करें","हर लक्ष्य के लिए"], featBodies: ["ऐसे लोगों से जुड़ें जो आपके लक्ष्य साझा करते हैं।","चेक इन करें और एक-दूसरे को सही रास्ते पर रखें।","साथ में अधिक मजबूत। आगे बढ़ें।","HYROX से वजन घटाने तक — आपका लक्ष्य हमारे पास है।"], problemLbl: "यह परिचित लगता है?", problemH: ["आपको अनुशासन की समस्या नहीं है।","आपको समर्थन की समस्या है।"], problemSub: "चक्र हमेशा एक जैसा होता है। आप मजबूत शुरुआत करते हैं। लकीर टूट जाती है। और आप फिर दिन एक पर होते हैं।", ctaFinal: ["आपने काफी बार","फिर से शुरू किया।"], ctaSubline: "इस बार, टिके रहें।", ctaBody: "प्रतीक्षा सूची में शामिल हों और लॉन्च पर पहले मैच होने वालों में से एक बनें।", ctaBtn: "सूची में शामिल हों →", ctaNote: "क्रेडिट कार्ड नहीं। स्पैम नहीं।", emailPH: "अपना ईमेल पता दर्ज करें" },
  sv: { nav: ["Hur det fungerar","Funktioner","FAQ"], joinWaitlist: "Gå med i listan", heroTagline: ["HITTA DIN FIT.","HÅLL DIG ANSVARIG.","UPPNÅ MER."], heroSub: "Fitness-ansvarsplattformen för att hitta rätt partner och få verkliga resultat —", heroTogether: "tillsammans.", heroCTA: "Gå med i rörelsen", feats: ["HITTA DIN PARTNER","HÅLL DIG ANSVARIG","UPPNÅ MER","FÖR VARJE MÅL"], featBodies: ["Koppla ihop dig med motiverade människor som delar dina mål.","Checka in och håll varandra på rätt spår.","Starkare tillsammans. Gå längre.","Från HYROX till styrka — vi har ditt mål."], problemLbl: "Låter det bekant?", problemH: ["DU HAR INTE ETT DISCIPLINPROBLEM.","DU HAR ETT STÖDPROBLEM."], problemSub: "Cykeln är alltid densamma. Du börjar starkt. Streaken brister. Och du är tillbaka på dag ett.", ctaFinal: ["DU HAR BÖRJAT OM","TILLRÄCKLIGT."], ctaSubline: "Den här gången, håll ut.", ctaBody: "Gå med i listan och bli en av de första matchade vid lansering.", ctaBtn: "GÅ MED I LISTAN →", ctaNote: "Inget kreditkort. Ingen spam.", emailPH: "Ange din e-postadress" },
  nl: { nav: ["Hoe het werkt","Functies","FAQ"], joinWaitlist: "Wachtlijst deelnemen", heroTagline: ["VIND JOUW FIT.","BLIJF VERANTWOORDELIJK.","BEREIK MEER."], heroSub: "Het fitness-verantwoordelijkheidsplatform om de juiste partner te vinden en echte resultaten te behalen —", heroTogether: "samen.", heroCTA: "Word lid van de beweging", feats: ["VIND JE PARTNER","BLIJF VERANTWOORDELIJK","BEREIK MEER","VOOR ELK DOEL"], featBodies: ["Verbind je met gemotiveerde mensen die jouw doelen delen.","Check in en houd elkaar op koers.","Samen sterker. Ga verder.","Van HYROX tot kracht — wij hebben jouw doel."], problemLbl: "Klinkt dit bekend?", problemH: ["JE HEBT GEEN DISCIPLINEPROBLEEM.","JE HEBT EEN ONDERSTEUNINGSPROBLEEM."], problemSub: "De cyclus is altijd hetzelfde. Je begint sterk. De streak breekt. En je bent terug bij dag één.", ctaFinal: ["JE BENT GENOEG","OPNIEUW BEGONNEN."], ctaSubline: "Deze keer, blijf erbij.", ctaBody: "Meld je aan voor de wachtlijst en wees een van de eersten bij de lancering.", ctaBtn: "WACHTLIJST DEELNEMEN →", ctaNote: "Geen creditcard. Geen spam.", emailPH: "Voer je e-mailadres in" },
};const G = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { background: #000; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; line-height: 1.6; }
a { color: inherit; text-decoration: none; }

:root {
  --red:    #B91C1C;
  --redhov: #DC2626;
  --redhi:  #EF4444;
  --card:   #111111;
  --border: #222222;
  --gray:   #B0B0B0;
  --muted:  #606060;
}

.d  { font-family: 'Anton', sans-serif; font-style: italic; }
.bc { font-family: 'Barlow Condensed', sans-serif; }
.lbl { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: .75rem; letter-spacing: .28em; text-transform: uppercase; color: var(--redhi); display: block; margin-bottom: 14px; }
.body-t { font-size: 1.06rem; color: var(--gray); line-height: 1.72; }

@keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes swashDraw { from { stroke-dashoffset:2000; opacity:0; } to { stroke-dashoffset:0; opacity:1; } }

.nav-link { color: rgba(255,255,255,.88); font-size: 17px; font-weight: 500; transition: color .2s; cursor: pointer; }
.nav-link:hover { color: #fff; }
.nav-join {
  border: 1px solid rgba(185,28,28,.75); border-radius: 14px;
  padding: 12px 32px; font-weight: 600; font-size: 17px; color: #fff;
  background: transparent; cursor: pointer; transition: all .2s ease;
}
.nav-join:hover { border-color: #ef4444; background: rgba(220,38,38,.1); }

.hero-cta {
  display: inline-flex; align-items: center; gap: 20px;
  background: linear-gradient(to bottom, #ef4444, #b91c1c);
  border-radius: 100px; padding: 20px 56px; border: none;
  font-family: 'Barlow Condensed', sans-serif; font-size: 22px;
  font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
  color: #fff; box-shadow: 0 14px 45px rgba(190,0,0,.38);
  transition: all .2s ease; cursor: pointer;
}
.hero-cta:hover { background: linear-gradient(to bottom, #f87171, #dc2626); transform: scale(1.02); }

.btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  background: var(--red); color: #fff;
  font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
  font-size: 1rem; letter-spacing: .16em; text-transform: uppercase;
  padding: 17px 48px; border: none; border-radius: 100px; cursor: pointer;
  box-shadow: 0 4px 24px rgba(185,28,28,.32); transition: all .2s ease;
}
.btn-primary:hover { background: var(--redhov); transform: translateY(-2px); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: #fff;
  font-family: 'Barlow Condensed', sans-serif; font-weight: 600;
  font-size: .95rem; letter-spacing: .14em; text-transform: uppercase;
  padding: 16px 38px; border: 1.5px solid rgba(255,255,255,.2); border-radius: 100px;
  cursor: pointer; transition: all .2s ease;
}
.btn-ghost:hover { border-color: var(--redhi); color: var(--redhi); }

.card {
  background: var(--card); border: 1px solid var(--border); border-radius: 14px;
  padding: 22px; transition: all .3s ease; position: relative; overflow: hidden;
}
.card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background: linear-gradient(90deg, var(--red), transparent);
  opacity: 0; transition: opacity .3s;
}
.card:hover { border-color: var(--red); transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,.6), 0 0 28px rgba(185,28,28,.1); }
.card:hover::before { opacity: 1; }
.redbar { display: block; width: 36px; height: 2px; background: var(--red); margin-bottom: 18px; }

.feat-icon-ring {
  width: 86px; height: 86px; border-radius: 50%;
  border: 1px solid rgba(185,28,28,.65);
  background: rgba(0,0,0,.28); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; color: #dc2626;
  box-shadow: 0 0 35px rgba(185,28,28,.18); margin: 0 auto 24px;
  transition: all .3s ease;
}

.swash { stroke-dasharray: 2000; animation: swashDraw 1.8s .6s ease forwards; opacity: 0; }

.step-num {
  width: 68px; height: 68px; border-radius: 50%; flex-shrink: 0;
  background: #000; border: 2px solid var(--red);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Anton', sans-serif; font-style: italic;
  font-size: 1.4rem; color: var(--red);
}

.cmp-left { background: var(--card); padding: 18px 22px; display: flex; align-items: center; gap: 12px; font-size: .96rem; color: rgba(255,255,255,.55); text-decoration: line-through; text-decoration-color: rgba(255,255,255,.2); }
.cmp-right { background: rgba(185,28,28,.08); border: 1px solid rgba(185,28,28,.18); padding: 18px 22px; display: flex; align-items: center; gap: 12px; font-size: .96rem; color: #E8E8E8; }

.tcard {
  background: #0F0F0F; border: 1px solid #1E1E1E; border-radius: 16px;
  padding: 22px 20px; display: flex; flex-direction: column; gap: 10px;
  transition: border-color .3s ease;
}
.tcard:hover { border-color: rgba(185,28,28,.4); }
.tcard-quote { font-size: 2rem; color: rgba(185,28,28,.35); font-family: Georgia, serif; line-height: 1; }
.avatar {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #B91C1C, #7f1d1d);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Anton', sans-serif; font-style: italic; font-size: .88rem; color: #fff;
}

.faq-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: border-color .2s; margin-bottom: 5px; }
.faq-item.open { border-color: rgba(185,28,28,.42); }
.faq-btn { width: 100%; background: none; border: none; cursor: pointer; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.faq-q { font-family: 'DM Sans', sans-serif; font-weight: 600; color: #fff; font-size: 1.05rem; flex: 1; text-align: left; }
.faq-plus { color: var(--red); font-size: 1.5rem; line-height: 1; transition: transform .2s; flex-shrink: 0; }
.faq-ans { padding: 0 22px 18px; color: var(--gray); line-height: 1.78; font-size: 1rem; animation: fadeIn .2s ease; }

.email-in {
  flex: 1 1 260px; max-width: 340px; height: 56px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
  border-radius: 100px; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 1rem;
  padding: 0 24px; outline: none; transition: border-color .2s;
}
.email-in::placeholder { color: var(--muted); }
.email-in:focus { border-color: rgba(185,28,28,.65); }

.store-badge {
  display: inline-flex; align-items: center; gap: 12px;
  background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 10px;
  padding: 10px 18px; text-decoration: none; transition: border-color .2s; width: fit-content;
}
.store-badge:hover { border-color: var(--red); }

.scroll-top {
  position: fixed; bottom: 28px; right: 28px; width: 46px; height: 46px;
  border-radius: 50%; background: var(--red); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(185,28,28,.4); transition: all .3s ease;
  opacity: 0; pointer-events: none; z-index: 500;
}
.scroll-top.visible { opacity: 1; pointer-events: all; }
.scroll-top:hover { background: var(--redhov); transform: translateY(-3px); }

.footer-col-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: .7rem; letter-spacing: .22em; text-transform: uppercase; color: #606060; margin-bottom: 14px; }

@media (max-width: 900px) {
  .hide-m { display: none !important; }
  .split-2, .split-5-7, .split-7-5 { grid-template-columns: 1fr !important; gap: 48px !important; }
  .feat-3 { grid-template-columns: 1fr 1fr !important; }
  .hero-feat-4 { grid-template-columns: 1fr 1fr !important; }
  .sec { padding: 84px 0 !important; }
  .hero-grid { min-height: auto; padding-top: 72px; }
  .tgrid { grid-template-columns: 1fr !important; }
  .cmp-row, .cmp-head { grid-template-columns: 1fr !important; }
  .cmp-left { display: none !important; }
}
@media (max-width: 600px) {
  .feat-3 { grid-template-columns: 1fr !important; }
  .hero-feat-4 { grid-template-columns: 1fr !important; }
}
@media (min-width: 901px) { .hide-d { display: none !important; } }
`;

function W({ children, max = 1160, style = {} }) {
  return <div style={{ maxWidth: max, margin: "0 auto", padding: "0 5%", ...style }}>{children}</div>;
}

const I = {
  partner: <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="3.2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a3.2 3.2 0 0 1 0 6.2"/></svg>,
  shield:  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>,
  trend:   <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 4 8-8"/><path d="M14 8h6v6"/></svg>,
  flame:   <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c2.8 3 4.5 5.6 4.5 8.2A4.5 4.5 0 0 1 12 14.7a4.5 4.5 0 0 1-4.5-4.5C7.5 7.6 9.2 5 12 2Z"/><path d="M7 15.5A5 5 0 0 0 12 21a5 5 0 0 0 5-5.5"/></svg>,
  target:  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>,
  chat:    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  chart:   <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  cal:     <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  refresh: <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  break:   <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="4" y1="4" x2="20" y2="20" stroke="#B91C1C" strokeWidth="2"/></svg>,
  alone:   <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7"/><path d="M17 17l4 4M21 17l-4 4" stroke="#B91C1C" strokeWidth="2"/></svg>,
  reset:   <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
  drain:   <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2" strokeWidth="2.5"/></svg>,
  check:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  cross:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#444" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  minifl:  <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M12 2c2.8 3 4.5 5.6 4.5 8.2A4.5 4.5 0 0 1 12 14.7a4.5 4.5 0 0 1-4.5-4.5C7.5 7.6 9.2 5 12 2Z" fill="#EF4444" opacity=".9"/></svg>,
};

function Logo({ size = "1.55rem" }) {
  return (
    <span className="d" style={{ fontSize: size, letterSpacing: "-.03em", lineHeight: 1, userSelect: "none" }}>
      <span style={{ color: "#fff" }}>Accounta</span>
      <span style={{ color: "#dc2626" }}>Fit</span>
    </span>
  );
}function Hero({ onCTA, dark, onToggle, t, lang, setLang }) {
  const [langOpen, setLangOpen] = useState(false);
  const FEATS = [
    { icon: I.partner, title: t.feats[0], body: t.featBodies[0] },
    { icon: I.shield,  title: t.feats[1], body: t.featBodies[1] },
    { icon: I.trend,   title: t.feats[2], body: t.featBodies[2] },
    { icon: I.flame,   title: t.feats[3], body: t.featBodies[3] },
  ];
  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#000", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 0 }}>
        <div style={{ flex: "0 0 27%", position: "relative", overflow: "hidden" }}>
          <img src={IMG_L} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "brightness(.62) saturate(.7) contrast(1.1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(120,5,5,.38) 0%,rgba(0,0,0,.2) 60%,transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 55%,rgba(0,0,0,.88) 100%)" }} />
        </div>
        <div style={{ flex: "0 0 46%", position: "relative", overflow: "hidden" }}>
          <img src={IMG_C} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", filter: "brightness(.55) saturate(.65) contrast(1.15)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 115%,rgba(200,20,20,.52) 0%,rgba(140,10,10,.22) 35%,transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.78) 0%,transparent 20%,transparent 80%,rgba(0,0,0,.78) 100%)" }} />
        </div>
        <div style={{ flex: "0 0 27%", position: "relative", overflow: "hidden" }}>
          <img src={IMG_R} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", filter: "brightness(.6) saturate(.65) contrast(1.12)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(200deg,rgba(100,5,5,.35) 0%,rgba(0,0,0,.2) 60%,transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left,transparent 55%,rgba(0,0,0,.88) 100%)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.32) 0%,rgba(0,0,0,.52) 45%,rgba(0,0,0,.92) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: .16, background: "linear-gradient(to right,transparent 0%,transparent 32.5%,rgba(155,0,0,.42) 33%,transparent 33.5%,transparent 66%,rgba(155,0,0,.42) 66.5%,transparent 67%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.44)" }} />
      </div>
      <svg viewBox="0 0 1440 900" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice">
        <path className="swash" d="M -80 820 Q 200 680 480 720 Q 720 755 920 680 Q 1100 610 1300 540" fill="none" stroke="#c41e2a" strokeWidth="2.2" opacity=".75" />
        <path className="swash" d="M -60 860 Q 240 720 520 760 Q 760 795 960 715 Q 1140 645 1360 570" fill="none" stroke="#dc2626" strokeWidth="1.4" opacity=".45" style={{ animationDelay: ".9s" }} />
        <path className="swash" d="M -100 750 Q 160 630 400 670 Q 640 710 880 640 Q 1080 580 1260 510" fill="none" stroke="#9b1c1c" strokeWidth="1" opacity=".28" style={{ animationDelay: "1.2s" }} />
      </svg>
      <header style={{ position: "relative", zIndex: 20, maxWidth: 1440, width: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px 16px" }}>
        <Logo size="clamp(28px,3vw,40px)" />
        <nav className="hide-m" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {(t.nav || T.en.nav).map((label, i) => {
            const hrefs = ["#how-it-works","#features","#faq"];
            return <a key={i} href={hrefs[i]} className="nav-link">{label}</a>;
          })}
          <a href="#final-cta" className="nav-join" style={{ fontFamily: "'DM Sans',sans-serif" }}>{t.joinWaitlist}</a>
          <button onClick={onToggle} aria-label="Toggle dark/light mode" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", transition: "transform .2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            {dark ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="rgba(185,28,28,.15)"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" fill="rgba(185,28,28,.15)"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: ".85rem", letterSpacing: ".1em", padding: "4px 2px", transition: "opacity .2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = ".75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {LANGS[lang]?.name || "English"}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {langOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 12, padding: "8px 0", minWidth: 160, zIndex: 999, boxShadow: "0 20px 48px rgba(0,0,0,.7)", animation: "fadeIn .15s ease" }}>
                {Object.entries(LANGS).map(([code, { name, flag }]) => (
                  <button key={code} onClick={() => { setLang(code); setLangOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: code === lang ? "rgba(185,28,28,.15)" : "none", border: "none", cursor: "pointer", padding: "9px 18px", textAlign: "left", color: code === lang ? "#EF4444" : "rgba(255,255,255,.8)", fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", transition: "background .15s" }}
                    onMouseEnter={e => { if (code !== lang) e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
                    onMouseLeave={e => { if (code !== lang) e.currentTarget.style.background = "none"; }}>
                    <span style={{ fontSize: "1rem" }}>{flag}</span>
                    {name}
                    {code === lang && <span style={{ marginLeft: "auto", color: "#EF4444", fontSize: ".8rem" }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>
      <main style={{ position: "relative", zIndex: 10, flex: 1, maxWidth: 1440, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0 48px 28px" }}>
        <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "clamp(16px,2.5vh,32px)" }}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 1200 }}>
            <h1 className="hero-h d" style={{ fontSize: "clamp(72px,13vw,188px)", lineHeight: .88, letterSpacing: "-.06em", textShadow: "0 10px 60px rgba(0,0,0,.75)", animation: "fadeUp .8s .18s ease both", opacity: 0 }}>
              <span className="hero-wordmark-white" style={{ color: "#fff" }}>Accounta</span>
              <span style={{ color: "#dc2626" }}>Fit</span>
            </h1>
            <p className="bc hero-tagline" style={{ fontSize: "clamp(15px,2.2vw,30px)", fontWeight: 600, letterSpacing: ".32em", textTransform: "uppercase", color: "rgba(255,255,255,.94)", marginTop: "clamp(8px,1.5vh,16px)", animation: "fadeUp .8s .3s ease both", opacity: 0 }}>
              {t.heroTagline[0]} <span style={{ color: "#dc2626" }}>{t.heroTagline[1]}</span> {t.heroTagline[2]}
            </p>
            <p className="hero-sub-copy" style={{ fontSize: "clamp(17px,1.9vw,29px)", lineHeight: 1.52, color: "rgba(255,255,255,.86)", maxWidth: 900, margin: "clamp(10px,2vh,20px) auto 0", animation: "fadeUp .8s .44s ease both", opacity: 0 }}>
              {t.heroSub} <span style={{ color: "#ef4444" }}>{t.heroTogether}</span>
            </p>
            <div style={{ marginTop: "clamp(18px,2.5vh,32px)", animation: "fadeUp .8s .58s ease both", opacity: 0 }}>
              <a href="#final-cta" className="hero-cta">
                <span>{t.heroCTA}</span>
                <span style={{ fontSize: 30, lineHeight: 1 }}>→</span>
              </a>
            </div>
          </div>
        </section>
        <section style={{ paddingTop: "clamp(20px,2.5vh,36px)" }}>
          <div className="hero-feat-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(16px,2.5vw,40px)", maxWidth: 1360, margin: "0 auto" }}>
            {FEATS.map((f, i) => (
              <div key={i} style={{ textAlign: "center", animation: `fadeUp .7s ${.7 + i * .12}s ease both`, opacity: 0 }}>
                <div className="feat-icon-ring">{f.icon}</div>
                <h3 className="bc hero-feat-title" style={{ fontSize: "clamp(14px,1.5vw,20px)", fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "#fff" }}>{f.title}</h3>
                <p className="hero-feat-body" style={{ fontSize: "clamp(14px,1.2vw,19px)", lineHeight: 1.55, color: "rgba(255,255,255,.68)", marginTop: 14, maxWidth: 280, margin: "14px auto 0" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}

function Problem({ dark, t }) {
  return (
    <section id="problem" style={{ padding: "72px 5%", background: dark ? "#050505" : "#EBEBEB" }}>
      <W>
        <span className="lbl">{t.problemLbl}</span>
        <h2 className="d" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", lineHeight: .92, color: "#fff", maxWidth: 900, marginBottom: 24 }}>
          {t.problemH[0]}<br /><span style={{ color: "#EF4444" }}>{t.problemH[1]}</span>
        </h2>
        <p className="body-t" style={{ maxWidth: 640, marginBottom: 36 }}>{t.problemSub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
          {[
            { icon: I.break, title: "The January Effect",      body: "You go all-in the first week. Then life happens and you disappear until next year." },
            { icon: I.alone, title: "No One Is Watching",      body: "When there's no one counting on you, skipping is the path of least resistance. Every time." },
            { icon: I.reset, title: "Always at Day One",       body: "You know the start better than anyone — because you've been there four times this year alone." },
            { icon: I.drain, title: "Motivation Isn't Reliable", body: "Motivation is a mood. Accountability is a system. Only one of them works long term." },
          ].map(({ icon, title, body }) => (
            <div key={title} className="card">
              <div style={{ marginBottom: 16 }}>{icon}</div>
              <h3 className="bc" style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", marginBottom: 10 }}>{title}</h3>
              <p className="body-t" style={{ fontSize: "1rem" }}>{body}</p>
            </div>
          ))}
        </div>
      </W>
    </section>
  );
}

function WhatItIs({ onCTA, dark, t }) {
  return (
    <section id="what-it-is" style={{ padding: "72px 5%", background: dark ? "#000" : "#F5F5F5" }}>
      <W>
        <div className="split-5-7" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, left: -16, width: 80, height: 80, border: "2px solid rgba(185,28,28,.28)", borderRadius: 12, zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1, background: "#111", border: "1px solid #222", borderRadius: 20, padding: 22, boxShadow: "0 32px 80px rgba(0,0,0,.55),0 0 60px rgba(185,28,28,.07)" }}>
              <span className="lbl">Your Match · 97% Compatible</span>
              {[
                { ini: "KL", name: "Keisha L.", info: "Cut + tone · 6am, 5×/week", streak: 34, compat: 97 },
                { ini: "MR", name: "Marcus R.", info: "Build muscle · Evenings, 4×/week", streak: 21, compat: null },
              ].map((p) => (
                <div key={p.ini} style={{ background: "#1A1A1A", border: `1px solid ${p.compat ? "rgba(185,28,28,.3)" : "#2A2A2A"}`, borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: p.compat ? 12 : 0 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: p.compat ? "linear-gradient(135deg,#B91C1C,#7f1d1d)" : "linear-gradient(135deg,#333,#1a1a1a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Anton',sans-serif", fontStyle: "italic", fontSize: ".88rem", color: "#fff", flexShrink: 0 }}>{p.ini}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: ".92rem" }}>{p.name}</div>
                      <div style={{ fontSize: ".72rem", color: "#777" }}>{p.info}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>{I.minifl}<span className="d" style={{ fontSize: "1.1rem", color: "#fff" }}>{p.streak}</span></div>
                      <div className="bc" style={{ fontSize: ".6rem", color: "#555", letterSpacing: ".08em" }}>day streak</div>
                    </div>
                  </div>
                  {p.compat && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: ".78rem", color: "#555" }}>Compatibility</span>
                        <span className="bc" style={{ fontSize: ".75rem", color: "#EF4444", fontWeight: 700 }}>{p.compat}%</span>
                      </div>
                      <div style={{ height: 4, background: "#222", borderRadius: 4 }}>
                        <div style={{ width: `${p.compat}%`, height: "100%", background: "linear-gradient(90deg,#B91C1C,#EF4444)", borderRadius: 4 }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div style={{ background: "rgba(185,28,28,.08)", border: "1px solid rgba(185,28,28,.22)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                {I.minifl}
                <span style={{ fontSize: ".88rem", color: "rgba(255,255,255,.62)", lineHeight: 1.5 }}>Both partners must check in daily to keep the streak alive.</span>
              </div>
            </div>
          </div>
          <div>
            <span style={{ display: "block", width: 44, height: 2, background: "#B91C1C", marginBottom: 20 }} />
            <span className="lbl">What AccountaFit Is</span>
            <h2 className="d" style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)", color: "#fff", lineHeight: .95, marginBottom: 22 }}>
              YOUR PARTNER IN<br /><span style={{ color: "#EF4444" }}>STAYING CONSISTENT.</span>
            </h2>
            <p className="body-t" style={{ marginBottom: 16 }}>AccountaFit isn't a workout tracker. It's not a social feed. It's a direct accountability system built around one idea: you are far more likely to follow through when someone real is counting on you.</p>
            <p className="body-t" style={{ marginBottom: 32 }}>We match you with a partner based on your goals, your schedule, and how hard you need to be pushed. Then you hold each other to it — every single day.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 36 }}>
              {["Matched by goals, schedule, and commitment energy","Daily 60-second check-ins that build real habits","Shared streaks that make quitting feel personal","Both partners see progress — full transparency"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(185,28,28,.14)", border: "1px solid rgba(185,28,28,.38)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{I.check}</div>
                  <span style={{ color: "#E8E8E8", fontSize: "1rem", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={onCTA}>JOIN THE WAITLIST →</button>
          </div>
        </div>
      </W>
    </section>
  );
}

function HowItWorks({ dark, t }) {
  const steps = [
    { n: "01", title: "Build Your Profile",        body: "Tell us your goals, your schedule, and how hard you need to be held accountable. Three minutes to set up. Lasts a lifetime." },
    { n: "02", title: "Get Matched in 48 Hours",   body: "Our system finds a partner with compatible goals, timing, and commitment level. Not random — precisely matched." },
    { n: "03", title: "Make the Commitment",       body: "Meet your partner, set expectations, and make a real commitment. Not a loose agreement. A pact with consequences." },
    { n: "04", title: "Build the Streak Together", body: "Daily check-ins. Shared progress. Mutual accountability. The longer the streak, the harder it is to break. That's the design." },
  ];
  return (
    <section id="how-it-works" style={{ padding: "72px 5%", background: dark ? "#030303" : "#EBEBEB" }}>
      <W max={980}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="lbl">How It Works</span>
          <h2 className="d" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", lineHeight: .93, color: "#fff" }}>
            FOUR STEPS TO <span style={{ color: "#EF4444" }}>NEVER STARTING OVER AGAIN</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div className="hide-m" style={{ position: "absolute", left: 33, top: 68, bottom: 68, width: 1, background: "linear-gradient(to bottom,#B91C1C,rgba(185,28,28,.08))", opacity: .25 }} />
          {steps.map(({ n, title, body }, i) => (
            <div key={n} style={{ display: "flex", gap: 32, alignItems: "flex-start", padding: "22px 0", borderBottom: i < 3 ? `1px solid ${dark ? "#1A1A1A" : "#D0D0D0"}` : "none" }}>
              <div className="step-num">{n}</div>
              <div style={{ paddingTop: 14 }}>
                <h3 className="bc" style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", marginBottom: 8 }}>{title}</h3>
                <p className="body-t">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </W>
    </section>
  );
}

function WhyDifferent({ dark, t }) {
  const rows = [
    ["Tracks your workouts","Holds you to your workouts"],
    ["Sends push notifications","Sends you a person who notices"],
    ["Works when you feel motivated","Works when you don't feel like it"],
    ["You use it alone","You're never doing it alone"],
    ["Shows you a feed","Builds you a real discipline system"],
  ];
  return (
    <section id="why-different" style={{ padding: "72px 5%", background: dark ? "#000" : "#F5F5F5", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.07) 0%,transparent 60%)" : "none", pointerEvents: "none" }} />
      <W>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="lbl">Why AccountaFit</span>
          <h2 className="d" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", lineHeight: .93, color: "#fff" }}>
            OTHER APPS TRACK YOU.<br /><span style={{ color: "#EF4444" }}>WE HOLD YOU.</span>
          </h2>
          <p className="body-t" style={{ maxWidth: 480, margin: "18px auto 0", textAlign: "center" }}>The difference between an app you forget about and one that actually changes your consistency is real accountability with a real person.</p>
        </div>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div className="cmp-head" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}>
            <div style={{ background: "#171717", padding: "14px 22px", textAlign: "center", fontFamily: "'Barlow Condensed',sans-serif", fontSize: ".75rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#606060", fontWeight: 700, borderRadius: "10px 10px 0 0" }}>Every Other App</div>
            <div style={{ background: "rgba(185,28,28,.14)", border: "1px solid rgba(185,28,28,.3)", padding: "14px 22px", textAlign: "center", fontFamily: "'Barlow Condensed',sans-serif", fontSize: ".75rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#EF4444", fontWeight: 700, borderRadius: "10px 10px 0 0" }}>AccountaFit</div>
          </div>
          {rows.map(([them, us], i) => (
            <div key={i} className="cmp-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}>
              <div className="cmp-left">{I.cross}{them}</div>
              <div className="cmp-right">{I.check}{us}</div>
            </div>
          ))}
        </div>
      </W>
    </section>
  );
}

function Features({ dark, t }) {
  const feats = [
    { icon: I.target,  title: "Smart Matching",      body: "Paired by goals, schedule, fitness level, and how hard you need to be pushed. No random buddies." },
    { icon: I.flame,   title: "Shared Streaks",      body: "Both partners check in daily. The streak only survives if you both show up. That's the pressure that works." },
    { icon: I.chat,    title: "Daily Check-Ins",     body: "60-second habit. Builds the kind of consistency no amount of motivation ever could." },
    { icon: I.chart,   title: "Progress Visibility", body: "You both see everything. No quietly falling off. No disappearing. Total transparency." },
    { icon: I.cal,     title: "Schedule Sync",       body: "Matched to your actual life — early mornings, evenings, weekdays, weekends. No friction." },
    { icon: I.refresh, title: "Smart Rematch",       body: "Partnership not working? We find you a better fit before your momentum breaks." },
  ];
  return (
    <section id="features" style={{ padding: "72px 5%", background: dark ? "#050505" : "#EBEBEB" }}>
      <W>
        <div style={{ marginBottom: 40 }}>
          <span className="lbl">Features</span>
          <h2 className="d" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", lineHeight: .93, color: "#fff", maxWidth: 640 }}>
            BUILT FOR THE PEOPLE<br /><span style={{ color: "#EF4444" }}>WHO KEEP FALLING OFF</span>
          </h2>
        </div>
        <div className="feat-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {feats.map(({ icon, title, body }) => (
            <div key={title} className="card">
              <span className="redbar" />
              <div style={{ color: "#EF4444", marginBottom: 16 }}>{icon}</div>
              <h3 className="bc" style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", marginBottom: 10 }}>{title}</h3>
              <p className="body-t" style={{ fontSize: "1rem" }}>{body}</p>
            </div>
          ))}
        </div>
      </W>
    </section>
  );
}

function Stats({ dark, t }) {
  return (
    <section id="stats-band" style={{ padding: "56px 5%", background: dark ? "linear-gradient(135deg,#0B0101,#110202,#0B0101)" : "#fff", borderTop: dark ? "1px solid #1C0303" : "1px solid #E0E0E0", borderBottom: dark ? "1px solid #1C0303" : "1px solid #E0E0E0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.14) 0%,transparent 65%)" : "none", pointerEvents: "none" }} />
      <W>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          {[
            ["3×","More likely to hit your goals with an accountability partner than going it alone"],
            ["94%","Of AccountaFit users report stronger consistency within the first 30 days"],
            ["65%","Higher goal completion rate compared to solo training across all fitness types"],
            ["14 days","Average time to lock in a lasting habit when someone is counting on you"],
          ].map(([v, l]) => (
            <div key={v} style={{ textAlign: "center" }}>
              <div className="d" style={{ fontSize: "3.4rem", color: "#EF4444", lineHeight: 1, marginBottom: 8 }}>{v}</div>
              <p style={{ fontSize: ".92rem", color: dark ? "var(--gray)" : "#1A1A1A", lineHeight: 1.72 }}>{l}</p>
            </div>
          ))}
        </div>
      </W>
    </section>
  );
}

function Testimonials({ dark, t }) {
  const ts = [
    { ini: "MT", name: "Marcus T.",  role: "Beta tester · -28 lbs",           q: "I've tried every fitness app. The difference with AccountaFit is someone is actually waiting on my check-in. That's not something any app has ever done." },
    { ini: "PS", name: "Priya S.",   role: "Beta tester · Marathon finisher",  q: "Eleven weeks. Me and my partner haven't missed one check-in. That streak starts to feel like part of your identity. You protect it." },
    { ini: "DK", name: "Devon K.",   role: "Early access · +15 lbs muscle",    q: "I stopped trying to stay motivated. I just made sure my partner knew I was showing up. That's the whole system. It's deceptively simple." },
    { ini: "AW", name: "Aaliyah W.", role: "Beta tester · Goal weight reached", q: "I didn't need a trainer. I needed someone who would notice if I went quiet. AccountaFit gave me exactly that." },
    { ini: "CM", name: "Carlos M.",  role: "Early access · 6 months consistent",q: "We've never met in person. But I show up at 5am every day because he does too. That's accountability. That's what this product creates." },
    { ini: "JB", name: "Jordan B.",  role: "Beta tester · Back after 2-year gap",q: "I'm not motivated every day. I haven't quit because someone else's streak is on the line too. That's a completely different feeling." },
  ];
  return (
    <section id="testimonials-section" style={{ padding: "72px 5%", background: dark ? "#000" : "#F5F5F5" }}>
      <W>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="lbl">Early Feedback</span>
          <h2 className="d" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", lineHeight: .93, color: dark ? "#fff" : "#0A0A0A" }}>
            THEY STOPPED<br /><span style={{ color: "#EF4444" }}>STARTING OVER.</span>
          </h2>
          <p className="body-t" style={{ maxWidth: 440, margin: "18px auto 0", textAlign: "center", color: dark ? undefined : "#333" }}>Feedback from our beta and early access community. Real people. Real results.</p>
        </div>
        <div className="tgrid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {ts.map(({ ini, name, role, q }) => (
            <div key={ini} className="tcard">
              <div className="tcard-quote">"</div>
              <p style={{ color: dark ? "#E8E8E8" : "#111", fontSize: "1rem", lineHeight: 1.78, flex: 1, fontWeight: dark ? 400 : 500 }}>{q}</p>
              <div style={{ borderTop: `1px solid ${dark ? "#1E1E1E" : "#D8D8D8"}`, paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar">{ini}</div>
                <div>
                  <div style={{ fontWeight: 600, color: dark ? "#fff" : "#0A0A0A", fontSize: ".9rem" }}>{name}</div>
                  <div className="bc" style={{ fontSize: ".7rem", letterSpacing: ".1em", color: "#B91C1C" }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </W>
    </section>
  );
}

function FAQ({ dark, t }) {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Is this a dating app?",          a: "Not even close. Every match is based entirely on fitness goals, schedule, and commitment level. This is accountability, not socializing." },
    { q: "What if my partner ghosts me?",  a: "Our Smart Rematch system detects disengaged partnerships early and finds you a better match before your momentum breaks." },
    { q: "How long does matching take?",   a: "Most people are matched within 48 hours. We prioritize fit over speed." },
    { q: "Is there a cost?",               a: "Early access is free. Members who join the waitlist now will get priority matching and a free trial when we launch." },
    { q: "How much time does it take daily?", a: "About 60 seconds for a check-in. The point is consistency, not complexity." },
    { q: "What if I'm a beginner?",        a: "AccountaFit works for every fitness level. You'll be matched with someone at your level and intensity." },
  ];
  return (
    <section id="faq" style={{ padding: "72px 5%", background: dark ? "#050505" : "#EBEBEB" }}>
      <W max={760}>
        <span className="lbl">FAQ</span>
        <h2 className="d" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", lineHeight: .93, color: dark ? "#fff" : "#0A0A0A", marginBottom: 32 }}>
          REAL <span style={{ color: "#EF4444" }}>QUESTIONS</span>
        </h2>
        {faqs.map(({ q, a }, i) => (
          <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
            <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
              <span className="faq-q">{q}</span>
              <span className="faq-plus" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {open === i && <div className="faq-ans">{a}</div>}
          </div>
        ))}
      </W>
    </section>
  );
}function FinalCTA({ onCTA, dark, t }) {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim()) setDone(true); };
  return (
    <section id="final-cta" style={{
      padding: "88px 5%", textAlign: "center", position: "relative", overflow: "hidden",
      background: dark ? "radial-gradient(ellipse at 50% 50%,rgba(185,28,28,.18) 0%,transparent 60%), linear-gradient(160deg,#070707,#100101,#070707)" : "#fff",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: dark ? "linear-gradient(rgba(185,28,28,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(185,28,28,.04) 1px,transparent 1px)" : "none", backgroundSize: "64px 64px", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto" }}>
        <span className="lbl" style={{ display: "inline-block" }}>This Is Your Moment</span>
        <h2 className="d" style={{ fontSize: "clamp(3rem,8vw,6rem)", lineHeight: .9, color: dark ? "#fff" : "#0A0A0A", marginBottom: 8 }}>
          {t.ctaFinal[0]}<br /><span style={{ color: "#EF4444" }}>{t.ctaFinal[1]}</span>
        </h2>
        <p style={{ fontSize: "1.2rem", color: dark ? "rgba(255,255,255,.55)" : "#555", lineHeight: 1.65, fontStyle: "italic", marginBottom: 18 }}>{t.ctaSubline}</p>
        <p className="body-t" style={{ maxWidth: 500, margin: "0 auto 48px" }}>{t.ctaBody}</p>
        {done ? (
          <div style={{ background: "rgba(185,28,28,.1)", border: "1px solid rgba(185,28,28,.38)", borderRadius: 16, padding: "36px 40px" }}>
            <div className="d" style={{ fontSize: "2.2rem", color: dark ? "#fff" : "#0A0A0A", marginBottom: 8 }}>YOU'RE IN.</div>
            <p className="body-t">We'll reach out when it's your turn. Stay consistent until then.</p>
          </div>
        ) : (
          <>
            <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <input type="email" className="email-in" placeholder={t.emailPH}
                value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit" className="btn-primary" style={{ height: 56, padding: "0 40px", borderRadius: 100, whiteSpace: "nowrap" }}>
                {t.ctaBtn}
              </button>
            </form>
            <p style={{ marginTop: 14, fontSize: ".8rem", color: dark ? "rgba(255,255,255,.24)" : "#999" }}>{t.ctaNote}</p>
          </>
        )}
      </div>
    </section>
  );
}

function Footer({ dark, t }) {
  return (
    <footer style={{ background: dark ? "#030303" : "#E0E0E0", borderTop: dark ? "1px solid #0F0F0F" : "1px solid #C8C8C8", padding: "44px 5% 28px" }}>
      <W>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 36, marginBottom: 44 }}>
          <div>
            <Logo size="1.5rem" />
            <p className="body-t" style={{ marginTop: 12, maxWidth: 240, fontSize: ".95rem" }}>
              Consistency over motivation.<br />Accountability over intention.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <a href="https://x.com/accountafit" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: "50%", background: "#000", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .2s", flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#B91C1C"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#2A2A2A"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.633 5.905-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com/accountafit" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", border: "1px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "opacity .2s", flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@accountafit" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: "50%", background: "#000", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .2s", flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#B91C1C"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#2A2A2A"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.08-.1z"/>
                </svg>
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", width: 160 }}>
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" style={{ width: "100%", height: "auto", display: "block" }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", width: 160 }}>
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" style={{ width: "100%", height: "auto", display: "block" }} />
              </a>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 52 }}>
            {[
              { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "How It Works", href: "#how-it-works" }, { label: "FAQ", href: "#faq" }] },
              { title: "Company", links: [{ label: "About", href: "#what-it-is" }, { label: "Contact", href: "#final-cta" }] },
              { title: "Legal",   links: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "Cookies", href: "#" }] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="bc footer-col-title">{title}</div>
                {links.map(({ label, href }) => (
                  <a key={label} href={href} style={{ display: "block", color: dark ? "#606060" : "#111", fontWeight: dark ? 400 : 600, fontSize: ".9rem", marginBottom: 7, transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#B91C1C"}
                    onMouseLeave={e => e.target.style.color = dark ? "#606060" : "#111"}>{label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: dark ? "linear-gradient(90deg,transparent,#2A2A2A,transparent)" : "linear-gradient(90deg,transparent,#C0C0C0,transparent)", marginBottom: 22 }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
          <p className="footer-bottom-text" style={{ fontSize: ".78rem", color: dark ? "rgba(255,255,255,.45)" : "#222", fontWeight: dark ? 400 : 600 }}>© 2026 AccountaFit. All rights reserved.</p>
          <p className="footer-bottom-text" style={{ fontSize: ".78rem", color: dark ? "rgba(255,255,255,.45)" : "#222", fontWeight: dark ? 400 : 600 }}>Built for people who don't quit.</p>
        </div>
      </W>
    </footer>
  );
}

function Modal({ onClose, dark, t }) {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim()) setDone(true); };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.9)", backdropFilter: "blur(14px)" }} />
      <div style={{ position: "relative", background: "#111", border: "1px solid #222", borderRadius: 20, padding: "52px 44px", maxWidth: 480, width: "100%", animation: "fadeUp .3s ease" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1.3rem" }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div className="d" style={{ fontSize: "2.2rem", color: "#fff", marginBottom: 12 }}>YOU'RE IN.</div>
            <p className="body-t">We'll reach out when it's your turn. Stay consistent until then.</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: 26, width: "100%", justifyContent: "center" }}>Close</button>
          </div>
        ) : (
          <>
            <span className="lbl">Early Access</span>
            <h3 className="d" style={{ fontSize: "2.6rem", color: "#fff", marginTop: 8, marginBottom: 14, lineHeight: .95 }}>
              JOIN THE<br /><span style={{ color: "#EF4444" }}>WAITLIST</span>
            </h3>
            <p className="body-t" style={{ marginBottom: 26 }}>Priority matching and free access to all features at launch.</p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="email" placeholder={t ? t.emailPH : "your@email.com"} value={email} onChange={e => setEmail(e.target.value)}
                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 10, color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", padding: "15px 18px", outline: "none", transition: "border-color .2s" }}
                onFocus={e => e.target.style.borderColor = "#B91C1C"} onBlur={e => e.target.style.borderColor = "#2A2A2A"} required />
              <button type="submit" className="btn-primary" style={{ justifyContent: "center", padding: "15px 0" }}>Claim My Spot →</button>
            </form>
            <p style={{ marginTop: 10, fontSize: ".78rem", color: "#555", textAlign: "center" }}>No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AccountaFit() {
  const [modal, setModal] = useState(false);
  const [dark, setDark]   = useState(true);
  const [lang, setLang]   = useState("en");
  const [showTop, setShowTop] = useState(false);
  const t = T[lang] || T.en;

  const lightOverrides = dark ? "" : `
    body { background: #F5F5F5 !important; color: #0A0A0A !important; }
    .body-t { color: #1A1A1A !important; }
    .lbl { color: #B91C1C !important; }
    .d { color: #0A0A0A !important; }
    .bc { color: inherit !important; }
    .nav-link { color: rgba(255,255,255,.9) !important; }
    .nav-link:hover { color: #fff !important; }
    .nav-join { color: #fff !important; border-color: rgba(220,38,38,.7) !important; }
    .hero-wordmark-white { color: #fff !important; }
    .hero-tagline { color: rgba(255,255,255,.95) !important; }
    .hero-sub-copy { color: rgba(255,255,255,.88) !important; }
    .hero-feat-title { color: #fff !important; }
    .hero-feat-body { color: rgba(255,255,255,.72) !important; }
    #what-it-is .d { color: #0A0A0A !important; }
    #what-it-is p { color: #1A1A1A !important; }
    #what-it-is span { color: #1A1A1A !important; }
    .card { background: #fff !important; border-color: #E0E0E0 !important; box-shadow: 0 2px 16px rgba(0,0,0,.07); }
    .card h3 { color: #0A0A0A !important; }
    .card p { color: #1A1A1A !important; }
    .card:hover { border-color: #B91C1C !important; }
    #stats-band { background: #fff !important; border-color: #E0E0E0 !important; }
    #stats-band::before { opacity: 0 !important; }
    #testimonials-section .d { color: #0A0A0A !important; }
    .tcard { background: #fff !important; border-color: #D0D0D0 !important; }
    .tcard p { color: #111 !important; font-weight: 500 !important; }
    .tcard-quote { color: rgba(185,28,28,.3) !important; }
    #faq .d { color: #0A0A0A !important; }
    .faq-item { background: #fff !important; border-color: #D0D0D0 !important; }
    .faq-item.open { border-color: rgba(185,28,28,.4) !important; }
    .faq-q { color: #0A0A0A !important; font-weight: 700 !important; }
    .faq-ans { color: #333 !important; }
    #final-cta { background: #fff !important; }
    #final-cta::before { opacity: 0 !important; }
    .step-num { background: #F0F0F0 !important; color: #B91C1C !important; border-color: #B91C1C !important; }
    .cmp-left { background: #DCDCDC !important; color: rgba(10,10,10,.45) !important; }
    .cmp-right { background: rgba(185,28,28,.07) !important; color: #0A0A0A !important; }
    .email-in { background: rgba(0,0,0,.06) !important; border-color: rgba(0,0,0,.15) !important; color: #0A0A0A !important; }
    .email-in::placeholder { color: #888 !important; }
    footer { background: #E8E8E8 !important; border-color: #D0D0D0 !important; }
    footer a { color: #111 !important; font-weight: 600 !important; }
    footer a:hover { color: #B91C1C !important; }
    .footer-col-title { color: #333 !important; font-weight: 700 !important; }
    .footer-bottom-text { color: #222 !important; font-weight: 600 !important; }
    .scroll-top { background: #B91C1C !important; }
  `;

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: G + lightOverrides }} />
      <div style={{ background: dark ? "#000" : "#F5F5F5", minHeight: "100vh", transition: "background .3s ease" }}>
        <Hero   onCTA={() => setModal(true)} dark={dark} onToggle={() => setDark(d => !d)} t={t} lang={lang} setLang={setLang} />
        <Problem dark={dark} t={t} />
        <WhatItIs onCTA={() => setModal(true)} dark={dark} t={t} />
        <HowItWorks dark={dark} t={t} />
        <WhyDifferent dark={dark} t={t} />
        <Features dark={dark} t={t} />
        <Stats dark={dark} t={t} />
        <Testimonials dark={dark} t={t} />
        <FAQ dark={dark} t={t} />
        <FinalCTA onCTA={() => setModal(true)} dark={dark} t={t} />
        <Footer dark={dark} t={t} />
        {modal && <Modal onClose={() => setModal(false)} dark={dark} t={t} />}
        <button className={`scroll-top${showTop ? " visible" : ""}`} onClick={scrollToTop} aria-label="Scroll to top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </div>
    </>
  );
}
