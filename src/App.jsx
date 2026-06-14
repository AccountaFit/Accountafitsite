import { useState, useEffect, useRef } from "react";

/* IMAGE CONSTANTS - embedded app screenshots */
const IMG_WOLF = "/images/pact-wolf.webp";
const IMG_HOME = "/images/pact-home.webp";
const IMG_MATCH = "/images/pact-match.webp";
const IMG_LIBRARY = "/images/pact-library.webp";
const IMG_SCHEDULE = "/images/pact-schedule.webp";
const IMG_PROGRAMS_SEL = "/images/pact-programs-sel.webp";
const IMG_PROGRAM_FORM = "/images/pact-program-form.webp";
const IMG_PROGRAM_GEN = "/images/pact-program-gen.webp";
const IMG_COMMUNITY = "/images/pact-community.webp";
const IMG_PROFILE = "/images/pact-profile.webp";


const IMG_LOGO_FULL = "/images/pact-logo-full.webp";

/* -
   LANGUAGE SYSTEM
- */
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
  hi: { name: "हिन्दी",    flag: "🇮🇳" },
  sv: { name: "Svenska",    flag: "🇸🇪" },
  nl: { name: "Nederlands", flag: "🇳🇱" },
};

const T = {
  en: {
    nav: ["How It Works", "Features", "Programs", "Community", "FAQ"],
    joinWaitlist: "Join Waitlist",
    eyebrow: "BY ACCOUNTAFIT CORP",
    heroH1a: "FIND YOUR", heroH1b: "FITNESS", heroH1c: "PARTNER.",
    heroSub: "PACT matches you with a real accountability partner based on your goals, schedule, and commitment level. Train smarter. Stay consistent. Never start over.",
    heroCTA: "Get Early Access", heroGhost: "See How It Works",
    stat1v: "200+", stat1l: "Workout benchmarks",
    stat2v: "12+",  stat2l: "AI sport programs",
    stat3v: "48H",  stat3l: "Avg. match time",
    introEyebrow: "INTRODUCING PACT",
    introH: "The World's First Fitness Accountability Matching Platform",
    introSub: "AccountaFit Corp didn't build another workout tracker. We built something the fitness world has never seen — a partner-matching system designed around the one thing that determines whether you succeed:",
    introSub2: "who's with you.",
    howEyebrow: "How It Works",
    howH: "Four steps. One system. No more restarting.",
    steps: [
      { n:"01", t:"Match with Your Partner",  b:"Tell us your goals, schedule, and commitment level. Our algorithm finds your perfect accountability partner in 48 hours — filtered by sport, level, and location." },
      { n:"02", t:"Check In Daily",           b:"A quick daily check-in keeps both of you locked in. Log workouts, share progress, and hold each other accountable." },
      { n:"03", t:"Build Your Training",      b:"Use the AI program builder to generate a fully personalized plan across 12+ sports with customizable goals and weekly periodization." },
      { n:"04", t:"Compete and Grow",         b:"Hit daily benchmarks, climb the King/Queen of the Workout leaderboard, and grow inside Communities with people who share your discipline." },
    ],
    featEyebrow: "Features",
    featH: "Built different. Because the problem is different.",
    features: [
      { t:"Smart Partner Matching",  b:"Paired by sport, goals, schedule, and intensity. Swipe, connect, and make a pact you will not break.",                        accent:"var(--blue2)" },
      { t:"AI Program Builder",      b:"Generate fully personalized training programs across 12+ sports. Choose your phase: Base Build Peak, Aggressive Build, or Maintenance.", accent:"var(--cyan)"  },
      { t:"King/Queen of the WOD",   b:"A new benchmark every day. Log your score and compete on the real-time leaderboard. Claim the throne.",                       accent:"#FBBF24"      },
      { t:"Schedule & Calendar",     b:"Plan your training week. Add workouts, goals, habits, and events. Your calendar synced to your commitment.",                   accent:"var(--blue2)" },
      { t:"Workout Library",         b:"200+ pre-built workouts across Bodybuilding, CrossFit, Hyrox, Powerlifting and more. Ready to use or customize.",             accent:"#34D399"      },
      { t:"Communities",             b:"Join or create Communities around your gym, sport, or training style. Shared workouts, group chats, and collective progress.", accent:"#A78BFA"      },
      { t:"Goals & Events",          b:"Set fitness goals, register for upcoming events, and track daily habits all in one unified training hub.",                     accent:"var(--cyan)"  },
      { t:"Personal Records",        b:"Search, add, and manage your PRs across every movement. See your strength story grow week over week.",                        accent:"#34D399"      },
      { t:"Direct Partner Chat",     b:"A private, direct line to your accountability partner. No feed noise. Just the two of you staying on track.",                 accent:"var(--blue2)" },
    ],
    progEyebrow: "AI Program Builder", progH: "Your coach. Powered by AI.",
    progSub: "Select your sport, set your goal, and PACT's AI generates a fully periodized training program tailored to you — weeks of structured programming in one tap.",
    libEyebrow: "Workout Library", libH: "200+ workouts. Zero guesswork.",
    libSub: "From HYROX benchmarks to CrossFit WODs, from powerlifting templates to custom sessions — PACT's library has pre-built workouts ready to log, share, or add to your schedule.",
    commEyebrow: "Communities", commH: "Your gym. Your crew. Your community.",
    commSub: "Create or join Communities built around your gym, sport, or training style. Share workouts, chat with members, and grow together.",
    commFeatures: [
      { lbl:"COMM", t:"Create a Community", b:"Start your own space — name it, set the level, and invite your training crew." },
      { lbl:"CHAT", t:"Community Chat",      b:"A dedicated group chat for every community. Share WODs, results, and motivation." },
      { lbl:"WOD",  t:"Shared Workouts",     b:"Post workouts to your community. Members log scores and compete together on a shared leaderboard." },
      { lbl:"LOCK", t:"Private or Public",   b:"Keep your community open to all or restricted to your inner circle. Your space, your rules." },
    ],
    waitlistEyebrow: "Your Move",
    waitlistH: "Your next restart doesn't have to happen.",
    waitlistSub: "Find someone who won't let you quit. Join the PACT waitlist and get first access when we launch on iOS and Android.",
    waitlistNote: "FREE TO JOIN - NO CREDIT CARD REQUIRED - iOS AND ANDROID COMING SOON",
    emailPH: "Enter your email", joinBtn: "Join the Waitlist",
    faqEyebrow: "FAQ", faqH: "Real questions.",
    faqSub: "Everything you need to know about PACT before you make yours.",
    faqs: [
      { q:"Is PACT a dating app?",                           a:"No. Partner matching is 100% based on fitness goals, schedule, and commitment level. This is accountability, not socializing." },
      { q:"What sports does the AI program builder support?", a:"12+ disciplines including Bodybuilding, CrossFit, Hyrox, Powerlifting, Olympic Lifting, Running, Marathon, Triathlon, Swimming, and General Fitness. Each program is fully personalized to your goal, phase preference, and timeline." },
      { q:"What is King/Queen of the Workout?",              a:"Every day a new benchmark Workout of the Day is posted. Athletes log their score and compete on a real-time leaderboard to claim the throne — King or Queen of the Workout." },
      { q:"How does partner matching work?",                  a:"Think Tinder for fitness. You browse profiles matched to your goals, fitness level, and location. When both sides connect, you make a Pact and start training together with shared accountability." },
      { q:"When does PACT launch?",                          a:"PACT is in active development. iOS and Android launch is coming soon. Join the waitlist to get early access and be the first to know." },
      { q:"Is it free to use?",                              a:"Core features including partner matching, workout library, and scheduling are free. Premium AI programs and advanced analytics will be available on a subscription plan." },
    ],
    footerTagline: "The fitness accountability matching platform by AccountaFit Corp. Find your partner. Make your pact. Never start over.",
    footerCopy: "YOUR DISCIPLINE STARTS NOW",
    footerProduct: "PRODUCT", footerCompany: "COMPANY", footerLegal: "LEGAL",
    productLinks: ["Features","How It Works","AI Programs","Workout Library","Communities"],
    companyLinks: ["About AccountaFit","Careers","Contact","Press"],
    chatGreeting: "Hey! I'm your PACT guide. Ask me anything about the app, features, or how to get matched with your fitness partner.",
    chatPlaceholder: "Ask about PACT...",
  },

  fr: {
    nav: ["Comment ça marche", "Fonctionnalités", "Programmes", "Communauté", "FAQ"],
    joinWaitlist: "Rejoindre la liste",
    eyebrow: "PAR ACCOUNTAFIT CORP",
    heroH1a: "TROUVEZ", heroH1b: "VOTRE", heroH1c: "PARTENAIRE.",
    heroSub: "PACT vous connecte à un véritable partenaire de responsabilité selon vos objectifs, votre emploi du temps et votre niveau d'engagement. Entraînez-vous mieux. Restez constant.",
    heroCTA: "Accès anticipé", heroGhost: "Comment ça marche",
    stat1v: "200+", stat1l: "Séances de référence",
    stat2v: "12+",  stat2l: "Programmes sportifs IA",
    stat3v: "48H",  stat3l: "Temps de match moyen",
    introEyebrow: "DÉCOUVREZ PACT",
    introH: "La première plateforme mondiale de jumelage de responsabilité fitness",
    introSub: "AccountaFit Corp n'a pas créé un autre traqueur d'entraînement. Nous avons créé quelque chose que le monde du fitness n'a jamais vu — un système de jumelage de partenaires conçu autour de la seule chose qui détermine si vous réussissez :",
    introSub2: "qui est avec vous.",
    howEyebrow: "Comment ça marche",
    howH: "Quatre étapes. Un système. Plus de recommencements.",
    steps: [
      { n:"01", t:"Trouvez votre partenaire",        b:"Partagez vos objectifs, votre emploi du temps et votre niveau d'engagement. Notre algorithme trouve votre partenaire idéal en 48 heures." },
      { n:"02", t:"Pointez chaque jour",             b:"Un check-in rapide chaque jour vous maintient tous les deux sur la bonne voie. Enregistrez vos séances et partagez vos progrès." },
      { n:"03", t:"Construisez votre entraînement",  b:"Utilisez le générateur de programme IA pour créer un plan entièrement personnalisé sur 12+ sports." },
      { n:"04", t:"Compétez et progressez",          b:"Atteignez les benchmarks quotidiens, montez dans le classement et grandissez au sein des Communautés." },
    ],
    featEyebrow: "Fonctionnalités",
    featH: "Conçu différemment. Parce que le problème est différent.",
    features: [
      { t:"Jumelage intelligent",          b:"Associé par sport, objectifs, emploi du temps et intensité. Swipez, connectez-vous et faites un pacte que vous ne briserez pas.", accent:"var(--blue2)" },
      { t:"Générateur de programmes IA",   b:"Générez des programmes d'entraînement entièrement personnalisés sur 12+ sports.", accent:"var(--cyan)"  },
      { t:"Roi/Reine du WOD",             b:"Un nouveau benchmark chaque jour. Enregistrez votre score et compétez sur le classement en temps réel.", accent:"#FBBF24" },
      { t:"Planning & Calendrier",         b:"Planifiez votre semaine d'entraînement. Ajoutez des séances, objectifs et événements.", accent:"var(--blue2)" },
      { t:"Bibliothèque de séances",       b:"200+ séances prédéfinies sur la musculation, CrossFit, Hyrox, Powerlifting et plus.", accent:"#34D399" },
      { t:"Communautés",                   b:"Rejoignez ou créez des communautés autour de votre salle, sport ou style d'entraînement.", accent:"#A78BFA" },
      { t:"Objectifs & Événements",        b:"Fixez des objectifs fitness, inscrivez-vous à des événements et suivez vos habitudes quotidiennes.", accent:"var(--cyan)" },
      { t:"Records personnels",            b:"Recherchez, ajoutez et gérez vos records pour chaque mouvement. Regardez votre progression.", accent:"#34D399" },
      { t:"Chat direct partenaire",        b:"Une ligne directe et privée avec votre partenaire de responsabilité. Pas de bruit. Juste vous deux.", accent:"var(--blue2)" },
    ],
    progEyebrow: "Générateur de programmes IA", progH: "Votre coach. Propulsé par l'IA.",
    progSub: "Sélectionnez votre sport, fixez votre objectif et l'IA de PACT génère un programme d'entraînement entièrement périodisé adapté à vous.",
    libEyebrow: "Bibliothèque de séances", libH: "200+ séances. Zéro approximation.",
    libSub: "Des benchmarks HYROX aux WODs CrossFit, des modèles de powerlifting aux séances personnalisées — la bibliothèque PACT a des séances prêtes à enregistrer.",
    commEyebrow: "Communautés", commH: "Votre salle. Votre équipe. Votre communauté.",
    commSub: "Créez ou rejoignez des Communautés autour de votre salle, sport ou style d'entraînement. Partagez des séances et progressez ensemble.",
    commFeatures: [
      { lbl:"COMM", t:"Créer une communauté",   b:"Démarrez votre propre espace — nommez-le, définissez le niveau et invitez votre équipe." },
      { lbl:"CHAT", t:"Chat communautaire",      b:"Un chat de groupe dédié à chaque communauté. Partagez WODs, résultats et motivation." },
      { lbl:"WOD",  t:"Séances partagées",       b:"Publiez des séances dans votre communauté. Les membres enregistrent leurs scores et s'affrontent." },
      { lbl:"LOCK", t:"Privé ou public",         b:"Gardez votre communauté ouverte à tous ou restreinte à votre cercle intime." },
    ],
    waitlistEyebrow: "À vous de jouer",
    waitlistH: "Votre prochain recommencement n'a pas à arriver.",
    waitlistSub: "Trouvez quelqu'un qui ne vous laissera pas abandonner. Rejoignez la liste d'attente PACT.",
    waitlistNote: "GRATUIT - SANS CARTE BANCAIRE - iOS ET ANDROID BIENTÔT",
    emailPH: "Entrez votre email", joinBtn: "Rejoindre la liste",
    faqEyebrow: "FAQ", faqH: "Vraies questions.",
    faqSub: "Tout ce que vous devez savoir sur PACT avant de faire le vôtre.",
    faqs: [
      { q:"PACT est-il une application de rencontre ?",               a:"Non. Le jumelage est basé à 100% sur les objectifs fitness, l'emploi du temps et le niveau d'engagement." },
      { q:"Quels sports le générateur IA supporte-t-il ?",           a:"12+ disciplines dont la musculation, CrossFit, Hyrox, Powerlifting, Haltérophilie, Course, Marathon, Triathlon et Natation." },
      { q:"Qu'est-ce que le Roi/Reine du Workout ?",                 a:"Chaque jour, un nouveau WOD de référence est publié. Les athlètes enregistrent leur score et s'affrontent sur le classement en temps réel." },
      { q:"Comment fonctionne le jumelage de partenaires ?",         a:"Pensez à Tinder pour le fitness. Parcourez des profils correspondant à vos objectifs, votre niveau et votre localisation." },
      { q:"Quand PACT sera-t-il disponible ?",                       a:"PACT est en développement actif. Le lancement iOS et Android arrive bientôt. Rejoignez la liste d'attente pour un accès anticipé." },
      { q:"Est-ce gratuit ?",                                        a:"Les fonctionnalités de base sont gratuites. Les programmes IA avancés et les analyses seront disponibles via abonnement." },
    ],
    footerTagline: "La plateforme de jumelage de responsabilité fitness par AccountaFit Corp. Trouvez votre partenaire. Faites votre pacte.",
    footerCopy: "VOTRE DISCIPLINE COMMENCE MAINTENANT",
    footerProduct: "PRODUIT", footerCompany: "ENTREPRISE", footerLegal: "LÉGAL",
    productLinks: ["Fonctionnalités","Comment ça marche","Programmes IA","Bibliothèque","Communautés"],
    companyLinks: ["À propos","Carrières","Contact","Presse"],
    chatGreeting: "Salut ! Je suis votre guide PACT. Posez-moi n'importe quelle question sur l'application ou les fonctionnalités.",
    chatPlaceholder: "Demandez à propos de PACT...",
  },

  es: {
    nav: ["Cómo funciona", "Funciones", "Programas", "Comunidad", "FAQ"],
    joinWaitlist: "Únete a la lista",
    eyebrow: "POR ACCOUNTAFIT CORP",
    heroH1a: "ENCUENTRA", heroH1b: "TU", heroH1c: "COMPAÑERO.",
    heroSub: "PACT te conecta con un compañero de responsabilidad real según tus objetivos, horario y nivel de compromiso. Entrena más inteligente. Mantente consistente.",
    heroCTA: "Acceso anticipado", heroGhost: "Cómo funciona",
    stat1v: "200+", stat1l: "Entrenamientos de referencia",
    stat2v: "12+",  stat2l: "Programas deportivos IA",
    stat3v: "48H",  stat3l: "Tiempo promedio de match",
    introEyebrow: "PRESENTANDO PACT",
    introH: "La primera plataforma mundial de emparejamiento de responsabilidad fitness",
    introSub: "AccountaFit Corp no construyó otro rastreador de entrenamientos. Construimos algo que el mundo del fitness nunca ha visto — un sistema de emparejamiento diseñado alrededor de lo único que determina si tienes éxito:",
    introSub2: "quién está contigo.",
    howEyebrow: "Cómo funciona",
    howH: "Cuatro pasos. Un sistema. Sin más reinicios.",
    steps: [
      { n:"01", t:"Emparéjate con tu compañero",    b:"Cuéntanos tus objetivos, horario y nivel de compromiso. Nuestro algoritmo encuentra tu compañero perfecto en 48 horas." },
      { n:"02", t:"Haz check-in diario",             b:"Un check-in rápido diario mantiene a ambos enfocados. Registra entrenamientos y comparte progreso." },
      { n:"03", t:"Construye tu entrenamiento",      b:"Usa el generador de programas IA para crear un plan completamente personalizado en 12+ deportes." },
      { n:"04", t:"Compite y crece",                 b:"Alcanza benchmarks diarios, sube en el clasificador Rey/Reina del WOD y crece en Comunidades." },
    ],
    featEyebrow: "Funciones",
    featH: "Construido diferente. Porque el problema es diferente.",
    features: [
      { t:"Emparejamiento inteligente",    b:"Emparejado por deporte, objetivos, horario e intensidad. Desliza, conecta y haz un pacto que no romperás.", accent:"var(--blue2)" },
      { t:"Generador de programas IA",     b:"Genera programas de entrenamiento completamente personalizados en 12+ deportes.",                            accent:"var(--cyan)"  },
      { t:"Rey/Reina del WOD",            b:"Un nuevo benchmark cada día. Registra tu puntuación y compite en el clasificador en tiempo real.",            accent:"#FBBF24"      },
      { t:"Horario & Calendario",          b:"Planifica tu semana de entrenamiento. Agrega entrenamientos, objetivos y eventos.",                          accent:"var(--blue2)" },
      { t:"Biblioteca de entrenamientos",  b:"200+ entrenamientos prediseñados en Musculación, CrossFit, Hyrox, Powerlifting y más.",                     accent:"#34D399"      },
      { t:"Comunidades",                   b:"Únete o crea Comunidades alrededor de tu gimnasio, deporte o estilo de entrenamiento.",                      accent:"#A78BFA"      },
      { t:"Objetivos & Eventos",           b:"Establece objetivos fitness, regístrate en eventos próximos y rastrea hábitos diarios.",                     accent:"var(--cyan)"  },
      { t:"Récords personales",            b:"Busca, agrega y gestiona tus récords en cada movimiento. Ve crecer tu historia de fuerza.",                  accent:"#34D399"      },
      { t:"Chat directo con compañero",    b:"Una línea directa y privada con tu compañero de responsabilidad. Sin ruido. Solo ustedes dos.",              accent:"var(--blue2)" },
    ],
    progEyebrow: "Generador de programas IA", progH: "Tu entrenador. Impulsado por IA.",
    progSub: "Selecciona tu deporte, establece tu objetivo y la IA de PACT genera un programa completamente periodizado adaptado a ti.",
    libEyebrow: "Biblioteca de entrenamientos", libH: "200+ entrenamientos. Sin adivinanzas.",
    libSub: "Desde benchmarks HYROX hasta WODs CrossFit — la biblioteca de PACT tiene entrenamientos listos para registrar.",
    commEyebrow: "Comunidades", commH: "Tu gimnasio. Tu equipo. Tu comunidad.",
    commSub: "Crea o únete a Comunidades alrededor de tu gimnasio, deporte o estilo de entrenamiento.",
    commFeatures: [
      { lbl:"COMM", t:"Crear una comunidad", b:"Empieza tu propio espacio — nómbralo, establece el nivel e invita a tu equipo." },
      { lbl:"CHAT", t:"Chat comunitario",    b:"Un chat grupal dedicado para cada comunidad. Comparte WODs, resultados y motivación." },
      { lbl:"WOD",  t:"Entrenamientos compartidos", b:"Publica entrenamientos en tu comunidad. Los miembros registran puntuaciones y compiten juntos." },
      { lbl:"LOCK", t:"Privado o público",   b:"Mantén tu comunidad abierta a todos o restringida a tu círculo íntimo." },
    ],
    waitlistEyebrow: "Tu turno",
    waitlistH: "Tu próximo reinicio no tiene que ocurrir.",
    waitlistSub: "Encuentra a alguien que no te deje renunciar. Únete a la lista de espera de PACT.",
    waitlistNote: "GRATIS - SIN TARJETA DE CRÉDITO - iOS Y ANDROID PRÓXIMAMENTE",
    emailPH: "Ingresa tu correo", joinBtn: "Unirse a la lista",
    faqEyebrow: "FAQ", faqH: "Preguntas reales.",
    faqSub: "Todo lo que necesitas saber sobre PACT antes de hacer el tuyo.",
    faqs: [
      { q:"¿Es PACT una aplicación de citas?",                         a:"No. El emparejamiento se basa 100% en objetivos de fitness, horario y nivel de compromiso." },
      { q:"¿Qué deportes soporta el generador de programas IA?",      a:"12+ disciplinas incluyendo Musculación, CrossFit, Hyrox, Powerlifting, Halterofilia, Running, Maratón, Triatlón y Natación." },
      { q:"¿Qué es Rey/Reina del Workout?",                           a:"Cada día se publica un nuevo WOD de referencia. Los atletas registran su puntuación y compiten en el clasificador en tiempo real." },
      { q:"¿Cómo funciona el emparejamiento?",                        a:"Piensa en Tinder para fitness. Navega por perfiles que coincidan con tus objetivos, nivel y ubicación." },
      { q:"¿Cuándo se lanza PACT?",                                   a:"PACT está en desarrollo activo. El lanzamiento en iOS y Android llega pronto. Únete a la lista de espera." },
      { q:"¿Es gratis?",                                              a:"Las funciones principales son gratuitas. Los programas IA avanzados estarán disponibles por suscripción." },
    ],
    footerTagline: "La plataforma de emparejamiento de responsabilidad fitness de AccountaFit Corp. Encuentra tu compañero. Haz tu pacto.",
    footerCopy: "TU DISCIPLINA EMPIEZA AHORA",
    footerProduct: "PRODUCTO", footerCompany: "EMPRESA", footerLegal: "LEGAL",
    productLinks: ["Funciones","Cómo funciona","Programas IA","Biblioteca","Comunidades"],
    companyLinks: ["Sobre AccountaFit","Carreras","Contacto","Prensa"],
    chatGreeting: "¡Hola! Soy tu guía de PACT. Pregúntame cualquier cosa sobre la app o las funciones.",
    chatPlaceholder: "Pregunta sobre PACT...",
  },

  de: {
    nav: ["So funktioniert es", "Funktionen", "Programme", "Community", "FAQ"],
    joinWaitlist: "Warteliste beitreten",
    eyebrow: "VON ACCOUNTAFIT CORP",
    heroH1a: "FINDE", heroH1b: "DEINEN", heroH1c: "PARTNER.",
    heroSub: "PACT verbindet dich mit einem echten Accountability-Partner basierend auf deinen Zielen, Zeitplan und Engagement-Level. Trainiere klüger. Bleib konsistent.",
    heroCTA: "Frühen Zugang erhalten", heroGhost: "So funktioniert es",
    stat1v: "200+", stat1l: "Workout-Benchmarks",
    stat2v: "12+",  stat2l: "KI-Sportprogramme",
    stat3v: "48H",  stat3l: "Durchschnittliche Matchzeit",
    introEyebrow: "EINFÜHRUNG PACT",
    introH: "Die weltweit erste Fitness-Accountability-Matching-Plattform",
    introSub: "AccountaFit Corp hat keinen weiteren Workout-Tracker gebaut. Wir haben etwas gebaut, das die Fitnesswelt noch nie gesehen hat — ein Partner-Matching-System, das auf der einzigen Sache aufgebaut ist, die entscheidet, ob du erfolgreich bist:",
    introSub2: "wer mit dir ist.",
    howEyebrow: "So funktioniert es",
    howH: "Vier Schritte. Ein System. Kein Neustart mehr.",
    steps: [
      { n:"01", t:"Mit deinem Partner matchen",    b:"Teile uns deine Ziele, Zeitplan und Engagement mit. Unser Algorithmus findet deinen perfekten Accountability-Partner in 48 Stunden." },
      { n:"02", t:"Täglich einchecken",            b:"Ein kurzes tägliches Check-in hält euch beide auf Kurs. Logge Workouts und teile Fortschritte." },
      { n:"03", t:"Dein Training aufbauen",        b:"Nutze den KI-Programm-Generator, um einen vollständig personalisierten Plan über 12+ Sportarten zu erstellen." },
      { n:"04", t:"Kompetieren und wachsen",       b:"Erreiche tägliche Benchmarks, erklimme das King/Queen-of-the-Workout-Leaderboard und wachse in Communities." },
    ],
    featEyebrow: "Funktionen",
    featH: "Anders gebaut. Weil das Problem anders ist.",
    features: [
      { t:"Intelligentes Partner-Matching",  b:"Gepaart nach Sport, Zielen, Zeitplan und Intensität. Swipen, verbinden und einen Pakt schließen.", accent:"var(--blue2)" },
      { t:"KI-Programm-Generator",           b:"Generiere vollständig personalisierte Trainingsprogramme über 12+ Sportarten.",                     accent:"var(--cyan)"  },
      { t:"König/Königin des WOD",           b:"Täglich ein neuer Benchmark. Logge dein Ergebnis und kämpfe um den Thron.",                         accent:"#FBBF24"      },
      { t:"Zeitplan & Kalender",             b:"Plane deine Trainingswoche. Füge Workouts, Ziele und Events hinzu.",                                accent:"var(--blue2)" },
      { t:"Workout-Bibliothek",              b:"200+ vorgefertigte Workouts aus Bodybuilding, CrossFit, Hyrox, Powerlifting und mehr.",             accent:"#34D399"      },
      { t:"Communities",                     b:"Tritt Communities bei oder erstelle sie rund um dein Gym, Sport oder Trainingstil.",                accent:"#A78BFA"      },
      { t:"Ziele & Events",                  b:"Setze Fitnessziele, melde dich für Events an und verfolge tägliche Gewohnheiten.",                  accent:"var(--cyan)"  },
      { t:"Persönliche Rekorde",             b:"Suche, füge hinzu und verwalte deine PRs für jede Bewegung.",                                       accent:"#34D399"      },
      { t:"Direkter Partner-Chat",           b:"Eine direkte, private Verbindung zu deinem Accountability-Partner. Kein Lärm. Nur ihr beide.",      accent:"var(--blue2)" },
    ],
    progEyebrow: "KI-Programm-Generator", progH: "Dein Coach. Angetrieben durch KI.",
    progSub: "Wähle deinen Sport, setze dein Ziel und PACTs KI generiert ein vollständig periodisiertes Trainingsprogramm für dich.",
    libEyebrow: "Workout-Bibliothek", libH: "200+ Workouts. Null Rätselraten.",
    libSub: "Von HYROX-Benchmarks bis CrossFit-WODs — PACTs Bibliothek hat vorgefertigte Workouts zum Loggen, Teilen oder Hinzufügen.",
    commEyebrow: "Communities", commH: "Dein Gym. Deine Crew. Deine Community.",
    commSub: "Erstelle oder tritt Communities bei, die um dein Gym, Sport oder Trainingstil herum aufgebaut sind.",
    commFeatures: [
      { lbl:"COMM", t:"Community erstellen", b:"Starte deinen eigenen Raum — benenne ihn, setze das Level und lade deine Crew ein." },
      { lbl:"CHAT", t:"Community-Chat",      b:"Ein dedizierter Gruppen-Chat für jede Community. Teile WODs, Ergebnisse und Motivation." },
      { lbl:"WOD",  t:"Gemeinsame Workouts", b:"Poste Workouts in deiner Community. Mitglieder loggen Punkte und treten gegeneinander an." },
      { lbl:"LOCK", t:"Privat oder öffentlich", b:"Halte deine Community offen oder beschränkt auf deinen inneren Kreis." },
    ],
    waitlistEyebrow: "Dein Zug",
    waitlistH: "Dein nächster Neustart muss nicht passieren.",
    waitlistSub: "Finde jemanden, der dich nicht aufhören lässt. Tritt der PACT-Warteliste bei.",
    waitlistNote: "KOSTENLOS - KEINE KREDITKARTE - iOS UND ANDROID BALD",
    emailPH: "E-Mail eingeben", joinBtn: "Warteliste beitreten",
    faqEyebrow: "FAQ", faqH: "Echte Fragen.",
    faqSub: "Alles, was du über PACT wissen musst, bevor du deinen machst.",
    faqs: [
      { q:"Ist PACT eine Dating-App?",                              a:"Nein. Das Matching basiert zu 100% auf Fitnesszielen, Zeitplan und Engagement-Level." },
      { q:"Welche Sportarten unterstützt der KI-Generator?",       a:"12+ Disziplinen darunter Bodybuilding, CrossFit, Hyrox, Powerlifting, Gewichtheben, Laufen, Marathon, Triathlon und Schwimmen." },
      { q:"Was ist König/Königin des Workouts?",                   a:"Täglich wird ein neuer WOD gepostet. Athleten loggen ihr Ergebnis und kämpfen im Echtzeit-Leaderboard um den Thron." },
      { q:"Wie funktioniert das Partner-Matching?",                a:"Denk an Tinder für Fitness. Sieh dir Profile an, die zu deinen Zielen, Level und Standort passen." },
      { q:"Wann startet PACT?",                                    a:"PACT ist in aktiver Entwicklung. iOS und Android-Launch kommt bald. Tritt der Warteliste bei." },
      { q:"Ist es kostenlos?",                                     a:"Kernfunktionen sind kostenlos. Erweiterte KI-Programme sind über ein Abonnement verfügbar." },
    ],
    footerTagline: "Die Fitness-Accountability-Matching-Plattform von AccountaFit Corp. Finde deinen Partner. Schließe deinen Pakt.",
    footerCopy: "DEINE DISZIPLIN BEGINNT JETZT",
    footerProduct: "PRODUKT", footerCompany: "UNTERNEHMEN", footerLegal: "RECHTLICHES",
    productLinks: ["Funktionen","So funktioniert es","KI-Programme","Bibliothek","Communities"],
    companyLinks: ["Über AccountaFit","Karriere","Kontakt","Presse"],
    chatGreeting: "Hey! Ich bin dein PACT-Guide. Frag mich alles über die App oder Funktionen.",
    chatPlaceholder: "Frag nach PACT...",
  },

  pt: {
    nav: ["Como funciona", "Funcionalidades", "Programas", "Comunidade", "FAQ"],
    joinWaitlist: "Entrar na lista",
    eyebrow: "PELA ACCOUNTAFIT CORP",
    heroH1a: "ENCONTRE", heroH1b: "SEU", heroH1c: "PARCEIRO.",
    heroSub: "PACT conecta você a um parceiro de responsabilidade real com base em seus objetivos, horário e nível de compromisso. Treine melhor. Mantenha a consistência.",
    heroCTA: "Acesso antecipado", heroGhost: "Como funciona",
    stat1v:"200+",stat1l:"Treinos de referência",stat2v:"12+",stat2l:"Programas IA",stat3v:"48H",stat3l:"Tempo médio de match",
    introEyebrow:"APRESENTANDO O PACT",introH:"A primeira plataforma mundial de correspondência de responsabilidade fitness",
    introSub:"A AccountaFit Corp não criou mais um rastreador de treinos. Criamos algo que o mundo do fitness nunca viu.",introSub2:"quem está com você.",
    howEyebrow:"Como funciona",howH:"Quatro passos. Um sistema. Sem mais recomeços.",
    steps:[{n:"01",t:"Encontre seu parceiro",b:"Compartilhe seus objetivos e horário. Nosso algoritmo encontra seu parceiro perfeito em 48 horas."},{n:"02",t:"Check-in diário",b:"Um check-in rápido mantém vocês dois no caminho certo."},{n:"03",t:"Construa seu treino",b:"Use o gerador de programas IA para criar um plano personalizado em 12+ esportes."},{n:"04",t:"Compita e cresça",b:"Alcance benchmarks diários e suba no placar Rei/Rainha do WOD."}],
    featEyebrow:"Funcionalidades",featH:"Construído diferente. Porque o problema é diferente.",
    features:[{t:"Correspondência inteligente",b:"Pareado por esporte, objetivos e intensidade. Deslize, conecte-se e faça um pacto.",accent:"var(--blue2)"},{t:"Gerador de programas IA",b:"Gere programas de treinamento personalizados em 12+ esportes.",accent:"var(--cyan)"},{t:"Rei/Rainha do WOD",b:"Um novo benchmark todo dia. Registre sua pontuação e compita.",accent:"#FBBF24"},{t:"Agenda & Calendário",b:"Planeje sua semana de treino.",accent:"var(--blue2)"},{t:"Biblioteca de treinos",b:"200+ treinos pré-criados em Musculação, CrossFit, Hyrox e mais.",accent:"#34D399"},{t:"Comunidades",b:"Crie ou entre em Comunidades ao redor do seu esporte.",accent:"#A78BFA"},{t:"Objetivos & Eventos",b:"Defina metas fitness e registre-se em eventos.",accent:"var(--cyan)"},{t:"Recordes pessoais",b:"Gerencie seus recordes em cada movimento.",accent:"#34D399"},{t:"Chat direto",b:"Uma linha privada com seu parceiro de responsabilidade.",accent:"var(--blue2)"}],
    progEyebrow:"Gerador de programas IA",progH:"Seu treinador. Impulsionado por IA.",progSub:"Selecione seu esporte e a IA do PACT gera um programa periodizado completo para você.",
    libEyebrow:"Biblioteca de treinos",libH:"200+ treinos. Zero achismos.",libSub:"De benchmarks HYROX a WODs CrossFit — a biblioteca do PACT tem treinos prontos para registrar.",
    commEyebrow:"Comunidades",commH:"Sua academia. Sua turma. Sua comunidade.",commSub:"Crie ou entre em Comunidades ao redor da sua academia ou esporte.",
    commFeatures:[{lbl:"COMM",t:"Criar comunidade",b:"Inicie seu próprio espaço e convide sua turma."},{lbl:"CHAT",t:"Chat comunitário",b:"Chat em grupo para cada comunidade."},{lbl:"WOD",t:"Treinos compartilhados",b:"Publique treinos e compita com os membros."},{lbl:"LOCK",t:"Privado ou público",b:"Controle quem entra na sua comunidade."}],
    waitlistEyebrow:"Sua vez",waitlistH:"Seu próximo recomeço não precisa acontecer.",waitlistSub:"Encontre alguém que não deixará você desistir. Entre na lista de espera do PACT.",waitlistNote:"GRÁTIS - SEM CARTÃO - iOS E ANDROID EM BREVE",
    emailPH:"Digite seu email",joinBtn:"Entrar na lista",
    faqEyebrow:"FAQ",faqH:"Perguntas reais.",faqSub:"Tudo que você precisa saber sobre o PACT.",
    faqs:[{q:"PACT é um app de namoro?",a:"Não. A correspondência é 100% baseada em objetivos fitness, horário e comprometimento."},{q:"Que esportes o gerador IA suporta?",a:"12+ disciplinas incluindo Musculação, CrossFit, Hyrox, Powerlifting, Corrida, Maratona, Triatlo e Natação."},{q:"O que é Rei/Rainha do Workout?",a:"Todo dia um novo WOD de referência. Registre sua pontuação e compita no placar em tempo real."},{q:"Como funciona a correspondência?",a:"Pense no Tinder para fitness. Veja perfis que combinam com seus objetivos e localização."},{q:"Quando o PACT é lançado?",a:"Em desenvolvimento ativo. Lançamento iOS e Android em breve."},{q:"É grátis?",a:"Funcionalidades principais são gratuitas. Programas IA avançados estarão disponíveis por assinatura."}],
    footerTagline:"A plataforma de correspondência de responsabilidade fitness pela AccountaFit Corp.",footerCopy:"SUA DISCIPLINA COMEÇA AGORA",footerProduct:"PRODUTO",footerCompany:"EMPRESA",footerLegal:"LEGAL",
    productLinks:["Funcionalidades","Como funciona","Programas IA","Biblioteca","Comunidades"],companyLinks:["Sobre a AccountaFit","Carreiras","Contato","Imprensa"],
    chatGreeting:"Olá! Sou seu guia PACT. Pergunte qualquer coisa sobre o app.",chatPlaceholder:"Pergunte sobre o PACT...",
  },

  it: {
    nav:["Come funziona","Funzionalità","Programmi","Comunità","FAQ"],joinWaitlist:"Unisciti alla lista",
    eyebrow:"DA ACCOUNTAFIT CORP",heroH1a:"TROVA",heroH1b:"IL TUO",heroH1c:"COMPAGNO.",
    heroSub:"PACT ti abbina a un vero compagno di responsabilità in base ai tuoi obiettivi, orario e livello di impegno. Allenati meglio. Rimani costante.",
    heroCTA:"Accesso anticipato",heroGhost:"Come funziona",
    stat1v:"200+",stat1l:"Allenamenti di riferimento",stat2v:"12+",stat2l:"Programmi IA",stat3v:"48H",stat3l:"Tempo medio di match",
    introEyebrow:"PRESENTAZIONE DI PACT",introH:"La prima piattaforma mondiale di matching per la responsabilità fitness",
    introSub:"AccountaFit Corp non ha creato un altro tracker di allenamento. Abbiamo creato qualcosa che il mondo del fitness non ha mai visto.",introSub2:"chi è con te.",
    howEyebrow:"Come funziona",howH:"Quattro passi. Un sistema. Nessun altro ricominciamento.",
    steps:[{n:"01",t:"Fai match con il tuo compagno",b:"Condividi i tuoi obiettivi e orario. Il nostro algoritmo trova il tuo compagno perfetto in 48 ore."},{n:"02",t:"Check-in giornaliero",b:"Un rapido check-in giornaliero mantiene entrambi in carreggiata."},{n:"03",t:"Costruisci il tuo allenamento",b:"Usa il generatore di programmi IA per creare un piano personalizzato su 12+ sport."},{n:"04",t:"Competi e cresci",b:"Raggiungi benchmark giornalieri e scala la classifica Re/Regina del WOD."}],
    featEyebrow:"Funzionalità",featH:"Costruito diversamente. Perché il problema è diverso.",
    features:[{t:"Matching intelligente",b:"Abbinato per sport, obiettivi e intensità. Scorri, connettiti e fai un patto.",accent:"var(--blue2)"},{t:"Generatore programmi IA",b:"Genera programmi di allenamento personalizzati su 12+ sport.",accent:"var(--cyan)"},{t:"Re/Regina del WOD",b:"Un nuovo benchmark ogni giorno. Registra il tuo punteggio e competi.",accent:"#FBBF24"},{t:"Programma & Calendario",b:"Pianifica la tua settimana di allenamento.",accent:"var(--blue2)"},{t:"Biblioteca allenamenti",b:"200+ allenamenti predefiniti in Bodybuilding, CrossFit, Hyrox e altro.",accent:"#34D399"},{t:"Comunità",b:"Unisciti o crea Comunità attorno al tuo sport.",accent:"#A78BFA"},{t:"Obiettivi & Eventi",b:"Imposta obiettivi fitness e iscriviti a eventi.",accent:"var(--cyan)"},{t:"Record personali",b:"Gestisci i tuoi record per ogni movimento.",accent:"#34D399"},{t:"Chat diretta",b:"Una linea privata con il tuo compagno di responsabilità.",accent:"var(--blue2)"}],
    progEyebrow:"Generatore programmi IA",progH:"Il tuo allenatore. Alimentato dall'IA.",progSub:"Seleziona il tuo sport e l'IA di PACT genera un programma periodizzato completo per te.",
    libEyebrow:"Biblioteca allenamenti",libH:"200+ allenamenti. Zero congetture.",libSub:"Da benchmark HYROX a WOD CrossFit — la biblioteca di PACT ha allenamenti pronti.",
    commEyebrow:"Comunità",commH:"La tua palestra. La tua squadra. La tua comunità.",commSub:"Crea o unisciti a Comunità attorno alla tua palestra o sport.",
    commFeatures:[{lbl:"COMM",t:"Crea una comunità",b:"Inizia il tuo spazio e invita la tua squadra."},{lbl:"CHAT",t:"Chat comunitaria",b:"Chat di gruppo per ogni comunità."},{lbl:"WOD",t:"Allenamenti condivisi",b:"Pubblica allenamenti e competi con i membri."},{lbl:"LOCK",t:"Privato o pubblico",b:"Controlla chi entra nella tua comunità."}],
    waitlistEyebrow:"La tua mossa",waitlistH:"Il tuo prossimo ricominciamento non deve accadere.",waitlistSub:"Trova qualcuno che non ti lascerà mollare. Unisciti alla lista d'attesa PACT.",waitlistNote:"GRATUITO - SENZA CARTA - iOS E ANDROID PRESTO",
    emailPH:"Inserisci la tua email",joinBtn:"Unisciti alla lista",
    faqEyebrow:"FAQ",faqH:"Domande reali.",faqSub:"Tutto quello che devi sapere su PACT.",
    faqs:[{q:"PACT è un'app di incontri?",a:"No. Il matching si basa al 100% su obiettivi fitness, orario e impegno."},{q:"Quali sport supporta il generatore IA?",a:"12+ discipline tra cui Bodybuilding, CrossFit, Hyrox, Powerlifting, Corsa, Maratona, Triathlon e Nuoto."},{q:"Cos'è Re/Regina del Workout?",a:"Ogni giorno un nuovo WOD. Gli atleti registrano il punteggio e competono nella classifica in tempo reale."},{q:"Come funziona il matching?",a:"Pensa a Tinder per il fitness. Esplora profili che corrispondono ai tuoi obiettivi e posizione."},{q:"Quando viene lanciato PACT?",a:"In sviluppo attivo. Lancio iOS e Android presto."},{q:"È gratuito?",a:"Le funzionalità principali sono gratuite. I programmi IA avanzati saranno disponibili tramite abbonamento."}],
    footerTagline:"La piattaforma di matching per la responsabilità fitness di AccountaFit Corp.",footerCopy:"LA TUA DISCIPLINA INIZIA ORA",footerProduct:"PRODOTTO",footerCompany:"AZIENDA",footerLegal:"LEGALE",
    productLinks:["Funzionalità","Come funziona","Programmi IA","Biblioteca","Comunità"],companyLinks:["Su AccountaFit","Carriere","Contatto","Stampa"],
    chatGreeting:"Ciao! Sono la tua guida PACT. Chiedimi qualsiasi cosa sull'app.",chatPlaceholder:"Chiedi di PACT...",
  },

  ja: {
    nav:["使い方","機能","プログラム","コミュニティ","FAQ"],joinWaitlist:"ウェイトリストに参加",
    eyebrow:"ACCOUNTAFIT CORP より",heroH1a:"フィットネス",heroH1b:"パートナーを",heroH1c:"見つけよう。",
    heroSub:"PACTは、あなたの目標、スケジュール、コミットメントレベルに基づいて、本物のアカウンタビリティパートナーをマッチングします。",
    heroCTA:"早期アクセスを取得",heroGhost:"使い方を見る",
    stat1v:"200+",stat1l:"ワークアウトベンチマーク",stat2v:"12+",stat2l:"AIスポーツプログラム",stat3v:"48H",stat3l:"平均マッチ時間",
    introEyebrow:"PACTを紹介",introH:"世界初のフィットネス・アカウンタビリティ・マッチングプラットフォーム",
    introSub:"AccountaFit Corpは、別のワークアウトトラッカーを作りませんでした。フィットネス界が見たことのないものを構築しました。",introSub2:"誰があなたと一緒にいるか。",
    howEyebrow:"使い方",howH:"4ステップ。1つのシステム。もう再スタートしない。",
    steps:[{n:"01",t:"パートナーとマッチ",b:"目標、スケジュール、コミットメントを教えてください。48時間以内に最適なパートナーが見つかります。"},{n:"02",t:"毎日チェックイン",b:"毎日の簡単なチェックインでお互いの軌道を維持。"},{n:"03",t:"トレーニングを構築",b:"AIプログラムジェネレーターで12以上のスポーツにわたる完全個別化プランを作成。"},{n:"04",t:"競争して成長",b:"毎日のベンチマークを達成し、King/Queen of the WODリーダーボードで競争。"}],
    featEyebrow:"機能",featH:"違う方法で構築。問題が違うから。",
    features:[{t:"スマートパートナーマッチング",b:"スポーツ、目標、スケジュールと強度でマッチング。スワイプして繋がり、破れないPactを結ぶ。",accent:"var(--blue2)"},{t:"AIプログラムビルダー",b:"12以上のスポーツにわたる完全個別化トレーニングプログラムを生成。",accent:"var(--cyan)"},{t:"King/Queen of the WOD",b:"毎日新しいベンチマーク。スコアを記録してリアルタイムリーダーボードで競争。",accent:"#FBBF24"},{t:"スケジュール&カレンダー",b:"トレーニング週を計画。ワークアウト、目標、イベントを追加。",accent:"var(--blue2)"},{t:"ワークアウトライブラリ",b:"ボディビル、CrossFit、Hyrox、パワーリフティングなどの200以上のプリビルドワークアウト。",accent:"#34D399"},{t:"コミュニティ",b:"あなたのジム、スポーツ、またはトレーニングスタイルのコミュニティに参加または作成。",accent:"#A78BFA"},{t:"目標&イベント",b:"フィットネス目標を設定し、イベントに登録し、日々の習慣を追跡。",accent:"var(--cyan)"},{t:"パーソナルレコード",b:"すべての動作のPRを検索、追加、管理。",accent:"#34D399"},{t:"直接パートナーチャット",b:"アカウンタビリティパートナーへのプライベートな直接ライン。",accent:"var(--blue2)"}],
    progEyebrow:"AIプログラムビルダー",progH:"あなたのコーチ。AIで動く。",progSub:"スポーツを選択し、目標を設定するとPACTのAIがあなた専用の完全な周期化トレーニングプログラムを生成します。",
    libEyebrow:"ワークアウトライブラリ",libH:"200以上のワークアウト。推測ゼロ。",libSub:"HYROXベンチマークからCrossFit WODまで — PACTのライブラリには記録、共有、スケジュール追加の準備ができたワークアウトがあります。",
    commEyebrow:"コミュニティ",commH:"あなたのジム。あなたのクルー。あなたのコミュニティ。",commSub:"あなたのジム、スポーツ、またはトレーニングスタイルのコミュニティを作成または参加。",
    commFeatures:[{lbl:"COMM",t:"コミュニティを作成",b:"自分のスペースを開始 — 名前を付けて、クルーを招待。"},{lbl:"CHAT",t:"コミュニティチャット",b:"各コミュニティ専用のグループチャット。"},{lbl:"WOD",t:"共有ワークアウト",b:"コミュニティにワークアウトを投稿。メンバーがスコアを記録して競争。"},{lbl:"LOCK",t:"プライベートまたはパブリック",b:"コミュニティを全員に公開するかインナーサークルに制限するか。"}],
    waitlistEyebrow:"あなたの番",waitlistH:"次のリセットは必要ない。",waitlistSub:"諦めさせない人を見つけよう。PACTウェイトリストに参加してiOS & Androidリリース時に最初のアクセスを取得。",waitlistNote:"無料参加 · クレジットカード不要 · iOS & Android 近日公開",
    emailPH:"メールアドレスを入力",joinBtn:"ウェイトリストに参加",
    faqEyebrow:"FAQ",faqH:"本物の質問。",faqSub:"PACTについてあなたのPactを作る前に知っておくべきこと。",
    faqs:[{q:"PACTはマッチングアプリですか？",a:"いいえ。パートナーマッチングはフィットネス目標、スケジュール、コミットメントレベルに100%基づいています。"},{q:"AIプログラムビルダーはどのスポーツをサポートしていますか？",a:"ボディビル、CrossFit、Hyrox、パワーリフティング、重量挙げ、ランニング、マラソン、トライアスロン、水泳などの12以上の種目。"},{q:"King/Queen of the Workoutとは？",a:"毎日新しいベンチマークWODが投稿されます。アスhletes がスコアを記録しリアルタイムリーダーボードで競います。"},{q:"パートナーマッチングはどのように機能しますか？",a:"フィットネスのTinderを思い浮かべて。目標、レベル、場所に合ったプロフィールを閲覧。"},{q:"PACTはいつリリースされますか？",a:"積極的に開発中。iOS & Androidのリリース近日予定。ウェイトリストに参加してください。"},{q:"無料ですか？",a:"コア機能は無料。高度なAIプログラムはサブスクリプションで利用可能。"}],
    footerTagline:"AccountaFit Corpによるフィットネスアカウンタビリティマッチングプラットフォームパートナーを見つけて。PACTを作って。",footerCopy:"あなたの規律は今始まる",footerProduct:"製品",footerCompany:"会社",footerLegal:"法的事項",
    productLinks:["機能","使い方","AIプログラム","ライブラリ","コミュニティ"],companyLinks:["AccountaFitについて","採用","お問い合わせ","プレス"],
    chatGreeting:"こんにちは！PACTガイドです。アプリや機能について何でも聞いてください。",chatPlaceholder:"PACTについて質問...",
  },

  zh: {
    nav:["如何运作","功能","计划","社区","常见问题"],joinWaitlist:"加入等候名单",
    eyebrow:"由 ACCOUNTAFIT CORP 出品",heroH1a:"找到你的",heroH1b:"健身",heroH1c:"伙伴。",
    heroSub:"PACT 根据你的目标、时间表和承诺水平为你匹配真实的问责伙伴。更聪明地训练。保持一致性。",
    heroCTA:"获取早期访问",heroGhost:"了解如何运作",
    stat1v:"200+",stat1l:"基准训练",stat2v:"12+",stat2l:"AI运动计划",stat3v:"48H",stat3l:"平均匹配时间",
    introEyebrow:"介绍 PACT",introH:"全球首个健身问责匹配平台",
    introSub:"AccountaFit Corp 没有构建另一个锻炼追踪器。我们构建了健身界从未见过的东西——一个围绕决定你是否成功的唯一事物设计的伙伴匹配系统：",introSub2:"谁与你同行。",
    howEyebrow:"如何运作",howH:"四个步骤。一个系统。不再重新开始。",
    steps:[{n:"01",t:"与你的伙伴匹配",b:"告诉我们你的目标、时间表和承诺水平。我们的算法在48小时内找到你的完美问责伙伴。"},{n:"02",t:"每日签到",b:"快速的每日签到让你们两个都保持正轨。记录训练，分享进度。"},{n:"03",t:"构建你的训练",b:"使用AI计划生成器创建跨12+运动的完全个性化计划。"},{n:"04",t:"竞争并成长",b:"达到每日基准，爬上健身之王/后排行榜，在社区中成长。"}],
    featEyebrow:"功能",featH:"不同的构建。因为问题不同。",
    features:[{t:"智能伙伴匹配",b:"按运动、目标、时间表和强度配对。滑动、连接并做一个你不会打破的承诺。",accent:"var(--blue2)"},{t:"AI计划构建器",b:"在12+运动中生成完全个性化的训练计划。",accent:"var(--cyan)"},{t:"健身之王/后",b:"每天一个新基准。记录你的分数并在实时排行榜上竞争。",accent:"#FBBF24"},{t:"时间表与日历",b:"计划你的训练周。添加训练、目标和活动。",accent:"var(--blue2)"},{t:"训练库",b:"200+预建训练，涵盖健美、CrossFit、Hyrox、力量举等。",accent:"#34D399"},{t:"社区",b:"加入或创建围绕你的健身房、运动或训练风格的社区。",accent:"#A78BFA"},{t:"目标与活动",b:"设定健身目标，注册即将到来的活动，追踪日常习惯。",accent:"var(--cyan)"},{t:"个人记录",b:"搜索、添加和管理每个动作的个人记录。",accent:"#34D399"},{t:"直接伙伴聊天",b:"与问责伙伴的私人直接连线。没有噪音。只有你们两个。",accent:"var(--blue2)"}],
    progEyebrow:"AI计划构建器",progH:"你的教练。由AI驱动。",progSub:"选择你的运动，设定目标，PACT的AI为你生成完全周期化的训练计划。",
    libEyebrow:"训练库",libH:"200+训练。零猜测。",libSub:"从HYROX基准到CrossFit WOD——PACT的库有准备好记录、分享或添加到时间表的训练。",
    commEyebrow:"社区",commH:"你的健身房。你的团队。你的社区。",commSub:"创建或加入围绕你的健身房、运动或训练风格构建的社区。",
    commFeatures:[{lbl:"COMM",t:"创建社区",b:"开始你自己的空间——命名它并邀请你的团队。"},{lbl:"CHAT",t:"社区聊天",b:"每个社区的专用群聊。"},{lbl:"WOD",t:"共享训练",b:"向你的社区发布训练。成员记录分数并一起竞争。"},{lbl:"LOCK",t:"私人或公开",b:"将你的社区对所有人开放或限制在你的内部圈子。"}],
    waitlistEyebrow:"你的行动",waitlistH:"你的下一次重新开始不必发生。",waitlistSub:"找一个不会让你放弃的人。加入PACT等候名单，在iOS和Android上启动时获得第一次访问。",waitlistNote:"免费加入 · 无需信用卡 · iOS和Android即将推出",
    emailPH:"输入你的电子邮件",joinBtn:"加入等候名单",
    faqEyebrow:"常见问题",faqH:"真实的问题。",faqSub:"在你做出你的承诺之前你需要了解的关于PACT的一切。",
    faqs:[{q:"PACT是约会应用吗？",a:"不。伙伴匹配100%基于健身目标、时间表和承诺水平。"},{q:"AI计划构建器支持哪些运动？",a:"12+学科包括健美、CrossFit、Hyrox、力量举、举重、跑步、马拉松、铁人三项和游泳。"},{q:"什么是健身之王/后？",a:"每天发布一个新的基准训练。运动员记录他们的分数并在实时排行榜上竞争。"},{q:"伙伴匹配如何运作？",a:"想象一下健身版Tinder。浏览与你的目标、水平和位置匹配的个人资料。"},{q:"PACT什么时候推出？",a:"PACT正在积极开发中。iOS和Android即将推出。加入等候名单获取早期访问。"},{q:"是免费的吗？",a:"核心功能免费。高级AI计划将通过订阅计划提供。"}],
    footerTagline:"AccountaFit Corp的健身问责匹配平台。找到你的伙伴。做出你的承诺。",footerCopy:"你的纪律从现在开始",footerProduct:"产品",footerCompany:"公司",footerLegal:"法律",
    productLinks:["功能","如何运作","AI计划","训练库","社区"],companyLinks:["关于AccountaFit","职业","联系","媒体"],
    chatGreeting:"嗨！我是你的PACT向导。随时问我关于应用或功能的问题。",chatPlaceholder:"询问关于PACT...",
  },

  ko: {
    nav:["작동 방식","기능","프로그램","커뮤니티","FAQ"],joinWaitlist:"대기 목록 참가",
    eyebrow:"ACCOUNTAFIT CORP 제공",heroH1a:"피트니스",heroH1b:"파트너를",heroH1c:"찾으세요.",
    heroSub:"PACT는 목표, 일정 및 헌신 수준에 따라 실제 책임 파트너를 매칭해 드립니다. 더 스마트하게 훈련하세요.",
    heroCTA:"조기 액세스 받기",heroGhost:"작동 방식 보기",
    stat1v:"200+",stat1l:"운동 벤치마크",stat2v:"12+",stat2l:"AI 스포츠 프로그램",stat3v:"48H",stat3l:"평균 매칭 시간",
    introEyebrow:"PACT 소개",introH:"세계 최초 피트니스 책임 매칭 플랫폼",
    introSub:"AccountaFit Corp는 또 다른 운동 추적기를 만들지 않았습니다. 피트니스 세계가 본 적 없는 것을 만들었습니다.",introSub2:"누가 당신과 함께 있는가.",
    howEyebrow:"작동 방식",howH:"네 단계. 하나의 시스템. 더 이상 재시작 없음.",
    steps:[{n:"01",t:"파트너와 매칭",b:"목표, 일정, 헌신 수준을 알려주세요. 알고리즘이 48시간 내에 완벽한 파트너를 찾아드립니다."},{n:"02",t:"매일 체크인",b:"빠른 일일 체크인으로 둘 다 궤도를 유지합니다."},{n:"03",t:"훈련 구축",b:"AI 프로그램 생성기를 사용해 12개 이상의 스포츠에 걸쳐 완전히 개인화된 계획을 만드세요."},{n:"04",t:"경쟁하고 성장하기",b:"일일 벤치마크를 달성하고 King/Queen of the WOD 리더보드를 오르세요."}],
    featEyebrow:"기능",featH:"다르게 구축되었습니다. 문제가 다르기 때문입니다.",
    features:[{t:"스마트 파트너 매칭",b:"스포츠, 목표, 일정 및 강도로 매칭. 스와이프하고 연결하고 깨지지 않을 약속을 하세요.",accent:"var(--blue2)"},{t:"AI 프로그램 빌더",b:"12개 이상의 스포츠에 걸쳐 완전히 개인화된 훈련 프로그램을 생성하세요.",accent:"var(--cyan)"},{t:"King/Queen of the WOD",b:"매일 새로운 벤치마크. 점수를 기록하고 실시간 리더보드에서 경쟁하세요.",accent:"#FBBF24"},{t:"스케줄 & 캘린더",b:"훈련 주를 계획하세요. 운동, 목표, 이벤트를 추가하세요.",accent:"var(--blue2)"},{t:"운동 라이브러리",b:"보디빌딩, CrossFit, Hyrox, 파워리프팅 등 200개 이상의 사전 구축된 운동.",accent:"#34D399"},{t:"커뮤니티",b:"체육관, 스포츠 또는 훈련 스타일을 중심으로 커뮤니티에 참가하거나 만드세요.",accent:"#A78BFA"},{t:"목표 & 이벤트",b:"피트니스 목표를 설정하고 이벤트에 등록하고 일일 습관을 추적하세요.",accent:"var(--cyan)"},{t:"개인 기록",b:"모든 동작에 걸쳐 PR을 검색하고 추가하고 관리하세요.",accent:"#34D399"},{t:"직접 파트너 채팅",b:"책임 파트너와의 개인적인 직접 라인. 소음 없음. 둘만.",accent:"var(--blue2)"}],
    progEyebrow:"AI 프로그램 빌더",progH:"당신의 코치. AI로 구동됩니다.",progSub:"스포츠를 선택하고 목표를 설정하면 PACT의 AI가 완전히 주기화된 훈련 프로그램을 생성합니다.",
    libEyebrow:"운동 라이브러리",libH:"200개 이상의 운동. 추측 제로.",libSub:"HYROX 벤치마크부터 CrossFit WOD까지 — PACT의 라이브러리에는 기록, 공유 또는 일정에 추가할 준비가 된 운동이 있습니다.",
    commEyebrow:"커뮤니티",commH:"당신의 체육관. 당신의 크루. 당신의 커뮤니티.",commSub:"체육관, 스포츠 또는 훈련 스타일을 중심으로 구축된 커뮤니티를 만들거나 참가하세요.",
    commFeatures:[{lbl:"COMM",t:"커뮤니티 만들기",b:"자신만의 공간을 시작하세요 — 이름을 짓고 크루를 초대하세요."},{lbl:"CHAT",t:"커뮤니티 채팅",b:"모든 커뮤니티를 위한 전용 그룹 채팅."},{lbl:"WOD",t:"공유 운동",b:"커뮤니티에 운동을 게시하세요. 회원들이 점수를 기록하고 함께 경쟁합니다."},{lbl:"LOCK",t:"비공개 또는 공개",b:"커뮤니티를 모든 사람에게 열어두거나 내부 서클로 제한하세요."}],
    waitlistEyebrow:"당신의 차례",waitlistH:"다음 재시작은 일어날 필요가 없습니다.",waitlistSub:"당신을 포기하게 두지 않을 사람을 찾으세요. PACT 대기 목록에 참가하세요.",waitlistNote:"무료 참가 · 신용카드 불필요 · iOS & Android 출시 예정",
    emailPH:"이메일을 입력하세요",joinBtn:"대기 목록 참가",
    faqEyebrow:"FAQ",faqH:"실제 질문.",faqSub:"당신의 PACT를 만들기 전에 알아야 할 모든 것.",
    faqs:[{q:"PACT는 데이팅 앱인가요?",a:"아니요. 파트너 매칭은 피트니스 목표, 일정 및 헌신 수준에 100% 기반합니다."},{q:"AI 프로그램 빌더는 어떤 스포츠를 지원하나요?",a:"보디빌딩, CrossFit, Hyrox, 파워리프팅, 역도, 달리기, 마라톤, 철인3종경기, 수영 등 12개 이상의 종목."},{q:"King/Queen of the Workout이 무엇인가요?",a:"매일 새로운 벤치마크 WOD가 게시됩니다. 운동 선수들이 점수를 기록하고 실시간 리더보드에서 경쟁합니다."},{q:"파트너 매칭은 어떻게 작동하나요?",a:"피트니스용 Tinder를 생각해 보세요. 목표, 수준 및 위치와 일치하는 프로필을 탐색하세요."},{q:"PACT는 언제 출시되나요?",a:"PACT는 활발히 개발 중입니다. iOS 및 Android 출시가 곧 다가옵니다."},{q:"무료인가요?",a:"핵심 기능은 무료입니다. 고급 AI 프로그램은 구독 플랜을 통해 이용 가능합니다."}],
    footerTagline:"AccountaFit Corp의 피트니스 책임 매칭 플랫폼. 파트너를 찾으세요. 약속을 하세요.",footerCopy:"당신의 규율은 지금 시작됩니다",footerProduct:"제품",footerCompany:"회사",footerLegal:"법적",
    productLinks:["기능","작동 방식","AI 프로그램","라이브러리","커뮤니티"],companyLinks:["AccountaFit 소개","채용","연락처","보도자료"],
    chatGreeting:"안녕하세요! 저는 당신의 PACT 가이드입니다. 앱이나 기능에 대해 무엇이든 물어보세요.",chatPlaceholder:"PACT에 대해 물어보세요...",
  },

  hi: {
    nav:["यह कैसे काम करता है","विशेषताएं","कार्यक्रम","समुदाय","सामान्य प्रश्न"],joinWaitlist:"वेटलिस्ट में शामिल हों",
    eyebrow:"ACCOUNTAFIT CORP द्वारा",heroH1a:"अपना फिटनेस",heroH1b:"पार्टनर",heroH1c:"खोजें।",
    heroSub:"PACT आपके लक्ष्यों, शेड्यूल और प्रतिबद्धता स्तर के आधार पर एक वास्तविक जवाबदेही भागीदार से मिलाता है।",
    heroCTA:"जल्दी पहुंच पाएं",heroGhost:"यह कैसे काम करता है देखें",
    stat1v:"200+",stat1l:"वर्कआउट बेंचमार्क",stat2v:"12+",stat2l:"AI खेल कार्यक्रम",stat3v:"48H",stat3l:"औसत मैच समय",
    introEyebrow:"PACT का परिचय",introH:"विश्व का पहला फिटनेस जवाबदेही मैचिंग प्लेटफॉर्म",
    introSub:"AccountaFit Corp ने एक और वर्कआउट ट्रैकर नहीं बनाया। हमने कुछ ऐसा बनाया जो फिटनेस की दुनिया ने कभी नहीं देखा।",introSub2:"कौन आपके साथ है।",
    howEyebrow:"यह कैसे काम करता है",howH:"चार कदम। एक प्रणाली। अब और पुनः आरंभ नहीं।",
    steps:[{n:"01",t:"अपने पार्टनर से मिलें",b:"हमें अपने लक्ष्य, शेड्यूल और प्रतिबद्धता बताएं। हमारा एल्गोरिदम 48 घंटों में आपका परफेक्ट पार्टनर ढूंढता है।"},{n:"02",t:"रोजाना चेक-इन करें",b:"एक त्वरित दैनिक चेक-इन आप दोनों को ट्रैक पर रखता है।"},{n:"03",t:"अपना प्रशिक्षण बनाएं",b:"12+ खेलों में पूरी तरह से व्यक्तिगत योजना बनाने के लिए AI प्रोग्राम जेनरेटर का उपयोग करें।"},{n:"04",t:"प्रतिस्पर्धा करें और बढ़ें",b:"दैनिक बेंचमार्क हासिल करें और King/Queen of the WOD लीडरबोर्ड पर चढ़ें।"}],
    featEyebrow:"विशेषताएं",featH:"अलग तरह से बनाया गया। क्योंकि समस्या अलग है।",
    features:[{t:"स्मार्ट पार्टनर मैचिंग",b:"खेल, लक्ष्य, शेड्यूल और तीव्रता के आधार पर जोड़ा गया।",accent:"var(--blue2)"},{t:"AI प्रोग्राम बिल्डर",b:"12+ खेलों में पूरी तरह से व्यक्तिगत प्रशिक्षण कार्यक्रम उत्पन्न करें।",accent:"var(--cyan)"},{t:"King/Queen of the WOD",b:"हर दिन एक नया बेंचमार्क। अपना स्कोर लॉग करें और रियल-टाइम लीडरबोर्ड पर प्रतिस्पर्धा करें।",accent:"#FBBF24"},{t:"शेड्यूल और कैलेंडर",b:"अपने प्रशिक्षण सप्ताह की योजना बनाएं।",accent:"var(--blue2)"},{t:"वर्कआउट लाइब्रेरी",b:"बॉडीबिल्डिंग, CrossFit, Hyrox, पावरलिफ्टिंग आदि में 200+ प्री-बिल्ट वर्कआउट।",accent:"#34D399"},{t:"समुदाय",b:"अपने जिम, खेल या प्रशिक्षण शैली के आसपास समुदायों में शामिल हों या बनाएं।",accent:"#A78BFA"},{t:"लक्ष्य और कार्यक्रम",b:"फिटनेस लक्ष्य निर्धारित करें और आगामी कार्यक्रमों में पंजीकरण करें।",accent:"var(--cyan)"},{t:"व्यक्तिगत रिकॉर्ड",b:"हर मूवमेंट के लिए अपने PR खोजें, जोड़ें और प्रबंधित करें।",accent:"#34D399"},{t:"सीधा पार्टनर चैट",b:"अपने जवाबदेही पार्टनर के साथ निजी सीधी लाइन।",accent:"var(--blue2)"}],
    progEyebrow:"AI प्रोग्राम बिल्डर",progH:"आपका कोच। AI द्वारा संचालित।",progSub:"अपना खेल चुनें, अपना लक्ष्य निर्धारित करें और PACT का AI आपके लिए पूरी तरह से व्यक्तिगत प्रशिक्षण कार्यक्रम तैयार करता है।",
    libEyebrow:"वर्कआउट लाइब्रेरी",libH:"200+ वर्कआउट। शून्य अनुमान।",libSub:"HYROX बेंचमार्क से CrossFit WOD तक — PACT की लाइब्रेरी में लॉग, शेयर या शेड्यूल में जोड़ने के लिए तैयार वर्कआउट हैं।",
    commEyebrow:"समुदाय",commH:"आपका जिम। आपकी क्रू। आपका समुदाय।",commSub:"अपने जिम, खेल या प्रशिक्षण शैली के आसपास बने समुदाय बनाएं या उनमें शामिल हों।",
    commFeatures:[{lbl:"COMM",t:"समुदाय बनाएं",b:"अपना स्थान शुरू करें और अपनी क्रू को आमंत्रित करें।"},{lbl:"CHAT",t:"समुदाय चैट",b:"हर समुदाय के लिए समर्पित ग्रुप चैट।"},{lbl:"WOD",t:"साझा वर्कआउट",b:"अपने समुदाय में वर्कआउट पोस्ट करें। सदस्य स्कोर लॉग करते हैं और एक साथ प्रतिस्पर्धा करते हैं।"},{lbl:"LOCK",t:"निजी या सार्वजनिक",b:"अपने समुदाय को सभी के लिए खुला रखें या अपने आंतरिक सर्कल तक सीमित करें।"}],
    waitlistEyebrow:"आपकी बारी",waitlistH:"आपका अगला पुनः आरंभ होना जरूरी नहीं।",waitlistSub:"कोई ऐसा व्यक्ति खोजें जो आपको छोड़ने नहीं देगा। PACT वेटलिस्ट में शामिल हों।",waitlistNote:"शामिल होना मुफ्त है · कोई क्रेडिट कार्ड की जरूरत नहीं · iOS और Android जल्द आ रहा है",
    emailPH:"अपना ईमेल दर्ज करें",joinBtn:"वेटलिस्ट में शामिल हों",
    faqEyebrow:"सामान्य प्रश्न",faqH:"असली सवाल।",faqSub:"PACT के बारे में वह सब कुछ जो आपको जानना चाहिए।",
    faqs:[{q:"क्या PACT एक डेटिंग ऐप है?",a:"नहीं। पार्टनर मैचिंग 100% फिटनेस लक्ष्यों, शेड्यूल और प्रतिबद्धता स्तर पर आधारित है।"},{q:"AI प्रोग्राम बिल्डर कौन से खेल का समर्थन करता है?",a:"बॉडीबिल्डिंग, CrossFit, Hyrox, पावरलिफ्टिंग, वेटलिफ्टिंग, रनिंग, मैराथन, ट्रायथलॉन और स्विमिंग सहित 12+ विषय।"},{q:"King/Queen of the Workout क्या है?",a:"हर दिन एक नया बेंचमार्क WOD पोस्ट किया जाता है। एथलीट अपना स्कोर लॉग करते हैं और रियल-टाइम लीडरबोर्ड पर प्रतिस्पर्धा करते हैं।"},{q:"पार्टनर मैचिंग कैसे काम करती है?",a:"फिटनेस के लिए Tinder की तरह सोचें। अपने लक्ष्यों, स्तर और स्थान से मेल खाने वाली प्रोफाइल ब्राउज़ करें।"},{q:"PACT कब लॉन्च होगा?",a:"PACT सक्रिय विकास में है। iOS और Android लॉन्च जल्द आ रहा है। वेटलिस्ट में शामिल हों।"},{q:"क्या यह मुफ्त है?",a:"मुख्य विशेषताएं मुफ्त हैं। उन्नत AI प्रोग्राम सदस्यता योजना के माध्यम से उपलब्ध होंगे।"}],
    footerTagline:"AccountaFit Corp का फिटनेस जवाबदेही मैचिंग प्लेटफॉर्म। अपना पार्टनर खोजें। अपना वादा करें।",footerCopy:"आपका अनुशासन अभी शुरू होता है",footerProduct:"उत्पाद",footerCompany:"कंपनी",footerLegal:"कानूनी",
    productLinks:["विशेषताएं","यह कैसे काम करता है","AI कार्यक्रम","लाइब्रेरी","समुदाय"],companyLinks:["AccountaFit के बारे में","करियर","संपर्क","प्रेस"],
    chatGreeting:"नमस्ते! मैं आपका PACT गाइड हूं। ऐप या सुविधाओं के बारे में कुछ भी पूछें।",chatPlaceholder:"PACT के बारे में पूछें...",
  },

  sv: {
    nav:["Hur det fungerar","Funktioner","Program","Gemenskap","Vanliga frågor"],joinWaitlist:"Gå med i väntelistan",
    eyebrow:"AV ACCOUNTAFIT CORP",heroH1a:"HITTA DIN",heroH1b:"FITNESS",heroH1c:"PARTNER.",
    heroSub:"PACT matchar dig med en riktig ansvarskamrat baserat på dina mål, schema och åtagandenivå.",
    heroCTA:"Få tidig åtkomst",heroGhost:"Se hur det fungerar",
    stat1v:"200+",stat1l:"Träningsbenchmarks",stat2v:"12+",stat2l:"AI-sportprogram",stat3v:"48H",stat3l:"Genomsnittlig matchtid",
    introEyebrow:"PRESENTERAR PACT",introH:"Världens första plattform för fitness-ansvarsmatchning",
    introSub:"AccountaFit Corp byggde inte ännu en träningsspårare. Vi byggde något som träningsvärlden aldrig sett.",introSub2:"vem som är med dig.",
    howEyebrow:"Hur det fungerar",howH:"Fyra steg. Ett system. Inga fler omstarter.",
    steps:[{n:"01",t:"Matcha med din partner",b:"Berätta om dina mål och schema. Vår algoritm hittar din perfekta partner inom 48 timmar."},{n:"02",t:"Checka in dagligen",b:"En snabb daglig incheckning håller er båda på rätt spår."},{n:"03",t:"Bygg din träning",b:"Använd AI-programgeneratorn för att skapa en personlig plan inom 12+ sporter."},{n:"04",t:"Tävla och väx",b:"Nå dagliga benchmarks och klättra på King/Queen of the WOD-tavlan."}],
    featEyebrow:"Funktioner",featH:"Byggt annorlunda. Eftersom problemet är annorlunda.",
    features:[{t:"Smart partnermatchning",b:"Matchad efter sport, mål och intensitet. Swipa, anslut och gör ett pakt.",accent:"var(--blue2)"},{t:"AI-programbyggare",b:"Generera personliga träningsprogram inom 12+ sporter.",accent:"var(--cyan)"},{t:"Kung/Drottning av WOD",b:"Nytt benchmark varje dag. Logga ditt resultat och tävla.",accent:"#FBBF24"},{t:"Schema & Kalender",b:"Planera din träningsvecka.",accent:"var(--blue2)"},{t:"Träningsbibliotek",b:"200+ färdiga träningar i Bodybuilding, CrossFit, Hyrox och mer.",accent:"#34D399"},{t:"Gemenskaper",b:"Gå med i eller skapa gemenskaper kring ditt gym eller sport.",accent:"#A78BFA"},{t:"Mål & Evenemang",b:"Sätt upp fitnessmål och registrera dig för evenemang.",accent:"var(--cyan)"},{t:"Personliga rekord",b:"Hantera dina PR för varje rörelse.",accent:"#34D399"},{t:"Direkt partnerchat",b:"En privat direktlinje med din ansvarskamrat.",accent:"var(--blue2)"}],
    progEyebrow:"AI-programbyggare",progH:"Din tränare. Driven av AI.",progSub:"Välj din sport och PACT:s AI genererar ett fullständigt periodiserat träningsprogram för dig.",
    libEyebrow:"Träningsbibliotek",libH:"200+ träningar. Noll gissningar.",libSub:"Från HYROX-benchmarks till CrossFit-WODs — PACT:s bibliotek har färdiga träningar.",
    commEyebrow:"Gemenskaper",commH:"Ditt gym. Ditt crew. Din gemenskap.",commSub:"Skapa eller gå med i gemenskaper kring ditt gym eller sport.",
    commFeatures:[{lbl:"COMM",t:"Skapa en gemenskap",b:"Starta ditt eget utrymme och bjud in ditt crew."},{lbl:"CHAT",t:"Gemenskapschat",b:"Dedikerad gruppchatt för varje gemenskap."},{lbl:"WOD",t:"Delade träningar",b:"Publicera träningar i din gemenskap."},{lbl:"LOCK",t:"Privat eller offentlig",b:"Kontrollera vem som går med i din gemenskap."}],
    waitlistEyebrow:"Ditt drag",waitlistH:"Din nästa omstart behöver inte hända.",waitlistSub:"Hitta någon som inte låter dig sluta. Gå med i PACT-väntelistan.",waitlistNote:"GRATIS ATT GÅ MED · INGET KREDITKORT · iOS OCH ANDROID SNART",
    emailPH:"Ange din e-post",joinBtn:"Gå med i väntelistan",
    faqEyebrow:"Vanliga frågor",faqH:"Riktiga frågor.",faqSub:"Allt du behöver veta om PACT.",
    faqs:[{q:"Är PACT en dejtingapp?",a:"Nej. Matchning baseras 100% på fitnessmål, schema och åtagandenivå."},{q:"Vilka sporter stöder AI-generatorn?",a:"12+ discipliner inklusive Bodybuilding, CrossFit, Hyrox, Powerlifting, Tyngdlyftning, Löpning, Maraton, Triathlon och Simning."},{q:"Vad är Kung/Drottning av Workout?",a:"Varje dag publiceras ett nytt benchmark-WOD. Idrottare loggar sina poäng och tävlar på topplistan."},{q:"Hur fungerar partnermatchning?",a:"Tänk Tinder för fitness. Bläddra bland profiler som matchar dina mål och plats."},{q:"När lanseras PACT?",a:"PACT är under aktiv utveckling. iOS och Android-lansering kommer snart."},{q:"Är det gratis?",a:"Kärnfunktioner är gratis. Avancerade AI-program kommer att vara tillgängliga via prenumeration."}],
    footerTagline:"Fitness-ansvarsmatchningsplattformen av AccountaFit Corp. Hitta din partner. Gör ditt pakt.",footerCopy:"DIN DISCIPLIN BÖRJAR NU",footerProduct:"PRODUKT",footerCompany:"FÖRETAG",footerLegal:"JURIDISKT",
    productLinks:["Funktioner","Hur det fungerar","AI-program","Bibliotek","Gemenskaper"],companyLinks:["Om AccountaFit","Karriärer","Kontakt","Press"],
    chatGreeting:"Hej! Jag är din PACT-guide. Fråga mig vad som helst om appen.",chatPlaceholder:"Fråga om PACT...",
  },

  nl: {
    nav:["Hoe het werkt","Functies","Programma's","Gemeenschap","FAQ"],joinWaitlist:"Doe mee met de wachtlijst",
    eyebrow:"DOOR ACCOUNTAFIT CORP",heroH1a:"VIND JE",heroH1b:"FITNESS",heroH1c:"PARTNER.",
    heroSub:"PACT koppelt je aan een echte verantwoordelijkheidspartner op basis van je doelen, schema en toewijdingsniveau.",
    heroCTA:"Vroegtijdige toegang",heroGhost:"Hoe het werkt",
    stat1v:"200+",stat1l:"Workout benchmarks",stat2v:"12+",stat2l:"AI sportprogramma's",stat3v:"48H",stat3l:"Gemiddelde matchtijd",
    introEyebrow:"INTRODUCTIE PACT",introH:"'s Werelds eerste fitness verantwoordelijkheids-matchingplatform",
    introSub:"AccountaFit Corp heeft geen andere workouttracker gebouwd. We hebben iets gebouwd dat de fitnesswereld nog nooit heeft gezien.",introSub2:"wie er bij je is.",
    howEyebrow:"Hoe het werkt",howH:"Vier stappen. Één systeem. Geen herstart meer.",
    steps:[{n:"01",t:"Match met je partner",b:"Vertel ons je doelen en schema. Ons algoritme vindt je perfecte partner binnen 48 uur."},{n:"02",t:"Dagelijks inchecken",b:"Een snelle dagelijkse check-in houdt jullie beiden op koers."},{n:"03",t:"Bouw je training",b:"Gebruik de AI-programmagenerator voor een volledig gepersonaliseerd plan."},{n:"04",t:"Concurreer en groei",b:"Bereik dagelijkse benchmarks en klim op het King/Queen of the WOD-scorebord."}],
    featEyebrow:"Functies",featH:"Anders gebouwd. Omdat het probleem anders is.",
    features:[{t:"Slim partnermatching",b:"Gekoppeld op sport, doelen en intensiteit. Swipe, verbind en maak een pact.",accent:"var(--blue2)"},{t:"AI-programmabuilder",b:"Genereer volledig gepersonaliseerde trainingsprogramma's voor 12+ sporten.",accent:"var(--cyan)"},{t:"Koning/Koningin van de WOD",b:"Elke dag een nieuw benchmark. Log je score en concurreer.",accent:"#FBBF24"},{t:"Schema & Kalender",b:"Plan je trainingsweek.",accent:"var(--blue2)"},{t:"Workoutbibliotheek",b:"200+ kant-en-klare workouts in Bodybuilding, CrossFit, Hyrox en meer.",accent:"#34D399"},{t:"Gemeenschappen",b:"Word lid van of maak gemeenschappen rond je gym of sport.",accent:"#A78BFA"},{t:"Doelen & Evenementen",b:"Stel fitnessdoelen en schrijf je in voor evenementen.",accent:"var(--cyan)"},{t:"Persoonlijke records",b:"Beheer je PR's voor elke beweging.",accent:"#34D399"},{t:"Directe partnerchat",b:"Een privé directe lijn met je verantwoordelijkheidspartner.",accent:"var(--blue2)"}],
    progEyebrow:"AI-programmabuilder",progH:"Jouw coach. Aangedreven door AI.",progSub:"Kies je sport en PACT's AI genereert een volledig geperiodiseerd trainingsprogramma voor jou.",
    libEyebrow:"Workoutbibliotheek",libH:"200+ workouts. Nul giswerk.",libSub:"Van HYROX-benchmarks tot CrossFit WODs — PACT's bibliotheek heeft kant-en-klare workouts.",
    commEyebrow:"Gemeenschappen",commH:"Jouw gym. Jouw crew. Jouw gemeenschap.",commSub:"Maak of word lid van gemeenschappen rond jouw gym of sport.",
    commFeatures:[{lbl:"COMM",t:"Maak een gemeenschap",b:"Start je eigen ruimte en nodig je crew uit."},{lbl:"CHAT",t:"Gemeenschapschat",b:"Toegewijde groepschat voor elke gemeenschap."},{lbl:"WOD",t:"Gedeelde workouts",b:"Post workouts in je gemeenschap. Leden loggen scores en concurreren samen."},{lbl:"LOCK",t:"Privé of openbaar",b:"Controleer wie lid wordt van je gemeenschap."}],
    waitlistEyebrow:"Jouw beurt",waitlistH:"Je volgende herstart hoeft niet te gebeuren.",waitlistSub:"Vind iemand die je niet laat opgeven. Doe mee met de PACT-wachtlijst.",waitlistNote:"GRATIS OM MEE TE DOEN · GEEN CREDITCARD · iOS EN ANDROID BINNENKORT",
    emailPH:"Voer je e-mailadres in",joinBtn:"Doe mee met de wachtlijst",
    faqEyebrow:"FAQ",faqH:"Echte vragen.",faqSub:"Alles wat je moet weten over PACT.",
    faqs:[{q:"Is PACT een datingapp?",a:"Nee. Matching is 100% gebaseerd op fitnessdoelen, schema en toewijdingsniveau."},{q:"Welke sporten ondersteunt de AI-generator?",a:"12+ disciplines waaronder Bodybuilding, CrossFit, Hyrox, Powerlifting, Gewichtheffen, Hardlopen, Marathon, Triathlon en Zwemmen."},{q:"Wat is Koning/Koningin van de Workout?",a:"Elke dag wordt een nieuwe benchmark WOD geplaatst. Atleten loggen hun score en concurreren op het scorebord."},{q:"Hoe werkt partnermatching?",a:"Denk aan Tinder voor fitness. Blader door profielen die overeenkomen met je doelen en locatie."},{q:"Wanneer wordt PACT gelanceerd?",a:"PACT is in actieve ontwikkeling. iOS en Android lancering komt binnenkort."},{q:"Is het gratis?",a:"Kernfuncties zijn gratis. Geavanceerde AI-programma's zijn beschikbaar via een abonnement."}],
    footerTagline:"Het fitness verantwoordelijkheids-matchingplatform van AccountaFit Corp. Vind je partner. Maak je pact.",footerCopy:"JOUW DISCIPLINE BEGINT NU",footerProduct:"PRODUCT",footerCompany:"BEDRIJF",footerLegal:"JURIDISCH",
    productLinks:["Functies","Hoe het werkt","AI-programma's","Bibliotheek","Gemeenschappen"],companyLinks:["Over AccountaFit","Carrières","Contact","Pers"],
    chatGreeting:"Hoi! Ik ben je PACT-gids. Stel me alles over de app.",chatPlaceholder:"Vraag over PACT...",
  },
};

/* GLOBAL CSS */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:#05090f;color:#EEF2FF;overflow-x:hidden;-webkit-font-smoothing:antialiased;line-height:1.6}
::selection{background:rgba(59,123,255,.35);color:#fff}
:root{
  --bg:#05090f;--navy:#0a1020;--navy-mid:#0f1830;--navy-hi:#172040;--navy-card:#111828;
  --blue:#3B7BFF;--blue2:#5B94FF;--blue-dim:rgba(59,123,255,.18);
  --cyan:#00D4FF;--cyan-dim:rgba(0,212,255,.15);
  --purple:#7C5CFC;--frost:#EEF2FF;--gray:#9AAAC8;--gray2:#6B7FA3;--gray3:#3D4F70;
  --glass-1:rgba(255,255,255,.045);--glass-2:rgba(255,255,255,.07);--glass-3:rgba(255,255,255,.10);
  --glass-border:rgba(255,255,255,.08);--glass-border-hi:rgba(255,255,255,.16);
  --glass-shine:linear-gradient(135deg,rgba(255,255,255,.11) 0%,rgba(255,255,255,0) 60%);
  --blur-sm:blur(12px);--blur-md:blur(24px);--blur-lg:blur(40px);
  --r-sm:12px;--r-md:18px;--r-lg:24px;--r-xl:32px;
}
.rajdhani{font-family:'Rajdhani',sans-serif;letter-spacing:.03em}
.mono{font-family:'JetBrains Mono',monospace}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes floatB{0%,100%{transform:translateY(-6px)}50%{transform:translateY(6px)}}
@keyframes floatC{0%,100%{transform:translateY(-10px) rotate(-1deg)}50%{transform:translateY(4px) rotate(1deg)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes scanline{0%{top:-40%}100%{top:140%}}
@keyframes afDot{0%,100%{opacity:.3}50%{opacity:1;background:var(--blue)}}

.page-bg{
  position:fixed;inset:0;z-index:-1;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 55% at 75% -5%,rgba(59,123,255,.25) 0%,transparent 60%),
    radial-gradient(ellipse 55% 45% at -5% 35%,rgba(59,123,255,.18) 0%,transparent 55%),
    radial-gradient(ellipse 65% 55% at 105% 75%,rgba(124,92,252,.15) 0%,transparent 55%),
    radial-gradient(ellipse 80% 70% at 50% 105%,rgba(0,212,255,.10) 0%,transparent 60%),
    linear-gradient(160deg,#05090f 0%,#080e1c 40%,#0b1225 70%,#060a14 100%);
}
.page-bg-noise{
  position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.03;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:256px;
}

.glass-panel{background:var(--glass-2);backdrop-filter:var(--blur-md);-webkit-backdrop-filter:var(--blur-md);border:1px solid var(--glass-border);border-radius:var(--r-lg);position:relative;overflow:hidden}
.glass-panel::before{content:'';position:absolute;inset:0;background:var(--glass-shine);pointer-events:none;z-index:0}
.glass-panel>*{position:relative;z-index:1}

.glass-card{background:var(--glass-1);backdrop-filter:var(--blur-sm);-webkit-backdrop-filter:var(--blur-sm);border:1px solid var(--glass-border);border-radius:var(--r-md);position:relative;overflow:hidden;transition:background .3s,border-color .3s,transform .3s,box-shadow .3s}
.glass-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);pointer-events:none}
.glass-card:hover{background:var(--glass-2);border-color:rgba(59,123,255,.3);transform:translateY(-5px);box-shadow:0 28px 56px rgba(0,0,0,.4),0 0 40px rgba(59,123,255,.08)}

.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);margin-bottom:18px}
.eyebrow::before{content:'';display:block;width:20px;height:1.5px;background:var(--cyan);flex-shrink:0}

.btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#fff;border:none;border-radius:100px;cursor:pointer;padding:16px 40px;background:linear-gradient(135deg,#3B7BFF 0%,#2563EB 100%);box-shadow:0 8px 32px rgba(59,123,255,.45),inset 0 1px 0 rgba(255,255,255,.22);transition:all .25s ease;position:relative;overflow:hidden}
.btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.14) 0%,transparent 60%);pointer-events:none}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 48px rgba(59,123,255,.6),inset 0 1px 0 rgba(255,255,255,.22)}
.btn-primary:active{transform:translateY(0)}

.btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--frost);border-radius:100px;cursor:pointer;padding:15px 40px;background:var(--glass-1);backdrop-filter:var(--blur-sm);-webkit-backdrop-filter:var(--blur-sm);border:1px solid var(--glass-border-hi);transition:all .25s ease}
.btn-ghost:hover{background:var(--glass-2);border-color:rgba(59,123,255,.5);color:var(--blue2);transform:translateY(-2px)}

.nav-link{color:var(--gray);font-size:.88rem;font-weight:400;transition:color .2s;cursor:pointer;white-space:nowrap}
.nav-link:hover{color:var(--frost)}

.sec{padding:112px 0;position:relative}
.wrap{max-width:1200px;margin:0 auto;padding:0 5%}
.sec-divider{height:1px;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.07) 30%,rgba(255,255,255,.11) 50%,rgba(255,255,255,.07) 70%,transparent 100%);margin:0 5%}

.marquee-track{display:flex;width:max-content;animation:marquee 26s linear infinite}
.marquee-item{display:flex;align-items:center;gap:24px;padding:0 32px;font-family:'Rajdhani',sans-serif;font-size:1.6rem;font-weight:600;letter-spacing:.1em;white-space:nowrap;color:rgba(154,170,200,.45);border-right:1px solid rgba(255,255,255,.07)}
.marquee-item.hi{color:var(--cyan)}

.phone-shell{width:100%;max-width:270px;background:linear-gradient(160deg,#161e30 0%,#0d1423 100%);border-radius:40px;border:1.5px solid rgba(255,255,255,.12);box-shadow:0 0 0 1px rgba(255,255,255,.05),0 40px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.15);position:relative;overflow:hidden;aspect-ratio:9/19.5;flex-shrink:0}
.phone-shell::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:90px;height:28px;background:#090e1a;border-radius:0 0 18px 18px;z-index:10;box-shadow:0 0 0 1.5px rgba(255,255,255,.08)}
.phone-screen{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
.phone-screen img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
.phone-shell::after{content:'';position:absolute;left:0;right:0;height:40%;background:linear-gradient(180deg,rgba(255,255,255,.04) 0%,transparent 100%);animation:scanline 4s linear infinite;z-index:5;pointer-events:none}

.faq-row{background:var(--glass-1);border:1px solid var(--glass-border);border-radius:var(--r-sm);overflow:hidden;margin-bottom:4px;transition:background .2s,border-color .2s}
.faq-row.open{background:rgba(59,123,255,.06);border-color:rgba(59,123,255,.25)}
.faq-btn{width:100%;background:none;border:none;cursor:pointer;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px}
.faq-q{font-family:'Inter',sans-serif;font-weight:600;color:var(--frost);font-size:.93rem;flex:1;text-align:left}
.faq-a{padding:0 24px 20px;color:var(--gray);line-height:1.8;font-size:.9rem}
.faq-icon{color:var(--blue);font-size:1.3rem;line-height:1;transition:transform .25s;flex-shrink:0}

.af-chat-btn{position:fixed;bottom:28px;right:28px;z-index:800;border-radius:100px;cursor:pointer;background:rgba(59,123,255,.14);backdrop-filter:var(--blur-sm);-webkit-backdrop-filter:var(--blur-sm);border:1px solid rgba(59,123,255,.3);display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 4px 24px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.1);transition:all .25s ease;padding:0 20px;height:48px;white-space:nowrap}
.af-chat-btn:hover{background:rgba(59,123,255,.26);border-color:rgba(59,123,255,.55);transform:translateY(-2px)}
.af-chat-btn.open{width:48px;height:48px;padding:0;border-radius:50%}
.af-chat-win{position:fixed;bottom:88px;right:28px;z-index:800;width:350px;background:rgba(10,16,32,.93);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-xl);overflow:hidden;box-shadow:0 28px 72px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.05);display:flex;flex-direction:column;animation:fadeIn .25s ease;max-height:520px;backdrop-filter:var(--blur-lg);-webkit-backdrop-filter:var(--blur-lg)}
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

.tag{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;font-weight:500}
.tag-blue{color:var(--blue2);background:rgba(59,123,255,.12);border-color:rgba(59,123,255,.25)}
.tag-cyan{color:var(--cyan);background:rgba(0,212,255,.1);border-color:rgba(0,212,255,.22)}
.tag-purple{color:#A78BFA;background:rgba(124,92,252,.12);border-color:rgba(124,92,252,.25)}
.tag-green{color:#34D399;background:rgba(52,211,153,.1);border-color:rgba(52,211,153,.22)}
.tag-amber{color:#FBBF24;background:rgba(251,191,36,.1);border-color:rgba(251,191,36,.22)}

.step-num{width:52px;height:52px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;background:rgba(59,123,255,.12);border:1.5px solid rgba(59,123,255,.3);color:var(--blue2)}
.stat-pill{display:flex;flex-direction:column;align-items:center;gap:4px;background:var(--glass-1);border:1px solid var(--glass-border);border-radius:var(--r-md);padding:24px 20px;flex:1;min-width:110px}
.feat-icon{width:52px;height:52px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:rgba(59,123,255,.12);border:1px solid rgba(59,123,255,.22);margin-bottom:20px}

@media(max-width:960px){
  .hide-m{display:none!important}
  .sec{padding:80px 0}
  .two-col{grid-template-columns:1fr!important;gap:48px!important}
  .three-col{grid-template-columns:1fr 1fr!important}
  .feat-grid{grid-template-columns:1fr 1fr!important}
  .four-col{grid-template-columns:1fr 1fr!important}
  .hero-h1{font-size:clamp(3.5rem,12vw,5.5rem)!important}
  .faq-grid{grid-template-columns:1fr!important;gap:32px!important}
}

.lang-btn{position:relative;display:inline-flex;align-items:center;gap:7px;background:var(--glass-1);border:1px solid var(--glass-border);border-radius:100px;padding:7px 14px;cursor:pointer;transition:all .2s;font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.08em;color:var(--gray);white-space:nowrap}
.lang-btn:hover{background:var(--glass-2);border-color:rgba(59,123,255,.3);color:var(--frost)}
.lang-dropdown{position:absolute;top:calc(100% + 8px);right:0;background:rgba(8,14,28,.96);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-md);overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.7);z-index:600;min-width:180px;backdrop-filter:var(--blur-lg);-webkit-backdrop-filter:var(--blur-lg)}
.lang-opt{display:flex;align-items:center;gap:10px;padding:11px 16px;cursor:pointer;transition:background .15s;font-family:'Inter',sans-serif;font-size:.82rem;color:var(--gray)}
.lang-opt:hover{background:rgba(59,123,255,.1);color:var(--frost)}
.lang-opt.active{background:rgba(59,123,255,.12);color:var(--blue2)}
.lang-opt .flag{font-size:1rem}

@media(max-width:600px){
  .three-col{grid-template-columns:1fr!important}
  .four-col{grid-template-columns:1fr!important}
  .feat-grid{grid-template-columns:1fr!important}
  .hero-h1{font-size:clamp(3rem,14vw,4.5rem)!important}
  .hero-btns{flex-direction:column;align-items:stretch!important}
  .stat-pill{min-width:80px!important;padding:16px 12px!important}
}
`;



/* LANGUAGE SWITCHER COMPONENT */
function LangSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="lang-btn" onClick={() => setOpen(o => !o)}>
        <span>{LANGS[lang].flag}</span>
        <span>{LANGS[lang].name}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className="lang-dropdown">
          {Object.entries(LANGS).map(([code, info]) => (
            <div key={code} className={`lang-opt${lang === code ? " active" : ""}`}
              onClick={() => { setLang(code); setOpen(false); }}>
              <span className="flag">{info.flag}</span>
              <span>{info.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


const PACT_CONTEXT = `You are the PACT app AI assistant embedded on the PACT website. PACT is a fitness partner-matching and training platform built by AccountaFit Corp. Key features: Tinder-style partner matching by fitness goals, schedule and level; AI-powered training program builder supporting 12+ sports (Bodybuilding, CrossFit, Hyrox, Running, Marathon, Powerlifting, Olympic Lifting, General Fitness, Weight Loss, Strength Training, Triathlon, Swimming); 178+ workout library with benchmarks; King/Queen of the Workout daily leaderboard; Communities feature for group training; scheduling/calendar; Goals and Events tracking; Personal Records; and Movements catalog. PACT is coming soon to iOS and Android. Be concise, enthusiastic, and fitness-focused.`;

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "bot", text: T.en.chatGreeting }
  ]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, loading]);

  const send = async () => {
    const text = inp.trim();
    if (!text || loading) return;
    setInp("");
    setMsgs(m => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const history = msgs.map(m => ({
        role: m.role === "bot" ? "model" : "user",
        parts: [{ text: m.text }]
      }));
      history.push({ role: "user", parts: [{ text }] });
      const key = process.env.REACT_APP_GEMINI_KEY;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: PACT_CONTEXT }] },
            contents: history
          })
        }
      );
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response right now.";
      setMsgs(m => [...m, { role: "bot", text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: "bot", text: "Connection error — please try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="af-chat-win">
          <div className="af-chat-hd">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="af-av">P</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#EEF2FF" }}>PACT Assistant</div>
                <div style={{ fontSize: 11, color: "#6B7FA3" }}>Powered by Gemini</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#6B7FA3", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>x</button>
          </div>
          <div className="af-chat-msgs" ref={msgsRef}>
            {msgs.map((m, i) => m.role === "bot" ? (
              <div key={i} className="af-msg-bot">
                <div className="af-av">P</div>
                <div className="af-bubble-bot">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="af-msg-user">
                <div className="af-bubble-user">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="af-msg-bot">
                <div className="af-av">P</div>
                <div className="af-bubble-bot" style={{ display: "flex", gap: 6, alignItems: "center", padding: "14px 16px" }}>
                  <div className="af-dot" /><div className="af-dot" /><div className="af-dot" />
                </div>
              </div>
            )}
          </div>
          <div className="af-chat-inp">
            <input className="af-inp" placeholder={T.en.chatPlaceholder} value={inp}
              onChange={e => setInp(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()} />
            <button className="af-send" onClick={send}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>
      )}
      <button className={`af-chat-btn${open ? " open" : ""}`} onClick={() => setOpen(o => !o)}>
        {open
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EEF2FF" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          : (<>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EEF2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", letterSpacing: ".1em", color: "#EEF2FF" }}>ASK PACT AI</span>
          </>)
        }
      </button>
    </>
  );
}

function Phone({ src, style = {}, float = "A" }) {
  return (
    <div className="phone-shell" style={{ animation: `float${float} ${float === "A" ? "5.5s" : float === "B" ? "6.8s" : "7.4s"} ease-in-out infinite`, ...style }}>
      <div className="phone-screen">
        <img src={src} alt="PACT app screen" loading="lazy" />
      </div>
    </div>
  );
}

function FaqRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-row${open ? " open" : ""}`}>
      <button className="faq-btn" onClick={() => setOpen(o => !o)}>
        <span className="faq-q">{q}</span>
        <span className="faq-icon" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

function WaitlistForm({ placeholder = "Enter your email", btnText = "Join the Waitlist", style = {} }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mnjwagoo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email })
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div style={{ background: "rgba(59,123,255,.1)", border: "1px solid rgba(59,123,255,.3)", borderRadius: 100, padding: "16px 32px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", letterSpacing: ".1em", color: "#93C5FD", ...style }}>
      YOU ARE ON THE LIST - WE WILL BE IN TOUCH
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 12, flexWrap: "wrap", ...style }}>
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, minWidth: 220, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 100, color: "#EEF2FF", fontFamily: "'Inter',sans-serif", fontSize: 14, padding: "14px 22px", outline: "none", transition: "border-color .2s" }}
        onFocus={e => e.target.style.borderColor = "rgba(59,123,255,.5)"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"} />
      <button type="submit" className="btn-primary" style={{ opacity: status === "loading" ? .6 : 1 }}>
        {status === "loading" ? "JOINING..." : btnText}
      </button>
    </form>
  );
}

const SPORTS = [
  { icon: "BB", label: "Bodybuilding" }, { icon: "GF", label: "General Fitness" },
  { icon: "WL", label: "Weight Loss" }, { icon: "ST", label: "Strength Training" },
  { icon: "PL", label: "Powerlifting" }, { icon: "OL", label: "Olympic Lifting" },
  { icon: "CF", label: "CrossFit" }, { icon: "HX", label: "Hyrox" },
  { icon: "RN", label: "Running" }, { icon: "MA", label: "Marathon" },
  { icon: "TR", label: "Triathlon" }, { icon: "SW", label: "Swimming" },
];

export default function PactSite() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lang, setLang] = useState("en");
  const t = T[lang] || T.en;

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const faqs = [
    { q: "Is PACT a dating app?", a: "No. Partner matching is 100% based on fitness goals, schedule, and commitment level. This is accountability, not socializing." },
    { q: "What sports does the AI program builder support?", a: "12+ disciplines including Bodybuilding, CrossFit, Hyrox, Powerlifting, Olympic Lifting, Running, Marathon, Triathlon, Swimming, and General Fitness. Each program is fully personalized to your goal, phase preference, and timeline." },
    { q: "What is King/Queen of the Workout?", a: "Every day a new benchmark Workout of the Day is posted. Athletes log their score and compete on a real-time leaderboard to claim the throne — King or Queen of the Workout." },
    { q: "How does partner matching work?", a: "Think Tinder for fitness. You browse profiles matched to your goals, fitness level, and location. When both sides connect, you make a Pact and start training together with shared accountability." },
    { q: "When does PACT launch?", a: "PACT is in active development. iOS and Android launch is coming soon. Join the waitlist to get early access and be the first to know." },
    { q: "Is it free to use?", a: "Core features including partner matching, workout library, and scheduling are free. Premium AI programs and advanced analytics will be available on a subscription plan." },
  ];


  return (
    <>
      <style>{G}</style>
      <div className="page-bg" />
      <div className="page-bg-noise" />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, background: navSolid ? "rgba(5,9,15,.9)" : "transparent", backdropFilter: navSolid ? "blur(24px)" : "none", WebkitBackdropFilter: navSolid ? "blur(24px)" : "none", borderBottom: navSolid ? "1px solid rgba(255,255,255,.07)" : "none", transition: "all .35s ease", padding: "0 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <img src={IMG_LOGO_FULL} alt="PACT" style={{ height: 44, width: "auto", filter: "drop-shadow(0 0 12px rgba(59,123,255,.5))" }} />
          </div>
          <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV_LINKS.map(([l, id]) => (
              <button key={id} className="nav-link" style={{ background: "none", border: "none" }} onClick={() => scrollTo(id)}>{l}</button>
            ))}
          </div>
          <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LangSwitcher lang={lang} setLang={setLang} />
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: ".72rem" }} onClick={() => scrollTo("waitlist")}>{t.joinWaitlist}</button>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#EEF2FF", padding: 4, display: "none" }} className="mob-ham" onClick={() => setMobileMenu(o => !o)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenu ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
        {mobileMenu && (
          <div style={{ background: "rgba(5,9,15,.97)", borderTop: "1px solid rgba(255,255,255,.07)", padding: "20px 5% 28px" }}>
            {t.nav.map((l, i) => (
              <button key={i} onClick={() => scrollTo(["how","features","programs","community","faq"][i])} style={{ display: "block", background: "none", border: "none", color: "#9AAAC8", fontFamily: "'Inter',sans-serif", fontSize: "1rem", padding: "13px 0", width: "100%", textAlign: "left", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,.05)" }}>{l}</button>
            ))}
            <div style={{ marginTop: 16, marginBottom: 4 }}><LangSwitcher lang={lang} setLang={setLang} /></div>
            <button className="btn-primary" style={{ marginTop: 12, width: "100%", justifyContent: "center" }} onClick={() => scrollTo("waitlist")}>{t.joinWaitlist}</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="sec" style={{ paddingTop: 160, paddingBottom: 80, minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="wrap" style={{ width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }} className="two-col">
            <div style={{ animation: "fadeUp .7s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24, background: "rgba(59,123,255,.1)", border: "1px solid rgba(59,123,255,.22)", borderRadius: 100, padding: "6px 18px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", animation: "glow 2s ease infinite" }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", color: "var(--cyan)" }}>BY ACCOUNTAFIT CORP</span>
              </div>

              <h1 className="hero-h1" style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(4rem,9vw,7rem)", fontWeight: 700, lineHeight: .95, letterSpacing: ".03em", marginBottom: 28 }}>
                <span style={{ display: "block", color: "#EEF2FF" }}>{t.heroH1a}</span>
                <span style={{ display: "block", background: "linear-gradient(135deg,#3B7BFF 0%,#00D4FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.heroH1b}</span>
                <span style={{ display: "block", color: "#EEF2FF" }}>{t.heroH1c}</span>
              </h1>

              <p style={{ fontSize: "1.1rem", color: "var(--gray)", lineHeight: 1.75, maxWidth: 500, marginBottom: 36 }}>
                PACT matches you with a real accountability partner based on your goals, schedule, and commitment level. Train smarter. Stay consistent. Never start over.
              </p>

              <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
                <button className="btn-primary" onClick={() => scrollTo("waitlist")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2 .82h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {t.heroCTA}
                </button>
                <button className="btn-ghost" onClick={() => scrollTo("how")}>{t.heroGhost}</button>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[[t.stat1v, t.stat1l], [t.stat2v, t.stat2l], [t.stat3v, t.stat3l]].map(([v, l]) => (
                  <div key={l} className="stat-pill">
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1.8rem", background: "linear-gradient(135deg,#3B7BFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{v}</span>
                    <span style={{ fontSize: ".68rem", color: "var(--gray2)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".08em", textAlign: "center" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hide-m" style={{ display: "flex", gap: 20, alignItems: "flex-end", justifyContent: "center", position: "relative", padding: "40px 20px" }}>
              <div style={{ position: "absolute", inset: "-40px", background: "radial-gradient(ellipse 60% 70% at 50% 50%,rgba(59,123,255,.22) 0%,transparent 70%)", pointerEvents: "none" }} />
              <Phone src={IMG_MATCH} float="A" style={{ marginBottom: 40 }} />
              <Phone src={IMG_HOME} float="B" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="marquee-track">
          {["Partner Matching", "AI Programs", "200+ Workouts", "Daily Leaderboard", "Communities", "Goals & Events", "Personal Records", "Schedule Tracking", "12+ Sports", "Accountability Partner", "Partner Matching", "AI Programs", "200+ Workouts", "Daily Leaderboard", "Communities", "Goals & Events", "Personal Records", "Schedule Tracking", "12+ Sports", "Accountability Partner"].map((t, i) => (
            <div key={i} className={`marquee-item${i % 4 === 1 ? " hi" : ""}`}>{t}</div>
          ))}
        </div>
      </div>


      {/* HOW IT WORKS */}
      <section id="how" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
            <div>
              <div className="eyebrow">How It Works</div>
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: ".03em", marginBottom: 48 }}>
                {t.howH}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {t.steps.map((s, i, arr) => (
                  <div key={s.n} style={{ display: "flex", gap: 20, position: "relative", paddingBottom: i < arr.length - 1 ? 40 : 0 }}>
                    {i < arr.length - 1 && (
                      <div style={{ position: "absolute", left: 26, top: 52, bottom: 0, width: 1.5, background: "linear-gradient(180deg,rgba(59,123,255,.3) 0%,transparent 100%)" }} />
                    )}
                    <div className="step-num" style={{ zIndex: 1, flexShrink: 0 }}>{s.n}</div>
                    <div style={{ paddingTop: 12 }}>
                      <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1.15rem", letterSpacing: ".03em", marginBottom: 8 }}>{s.t}</h3>
                      <p style={{ color: "var(--gray)", fontSize: ".9rem", lineHeight: 1.75 }}>{s.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hide-m" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: "-60px", background: "radial-gradient(ellipse 60% 70% at 50% 50%,rgba(0,212,255,.15) 0%,transparent 70%)", pointerEvents: "none" }} />
              <Phone src={IMG_SCHEDULE} float="C" style={{ maxWidth: 280 }} />
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* FEATURES */}
      <section id="features" className="sec">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Features</div>
            <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3.2rem)", lineHeight: 1.05, letterSpacing: ".03em" }}>
              {t.featH}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="feat-grid">
            {t.features.map(f => (
              <div key={f.t} className="glass-card" style={{ padding: 28 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: f.accent, marginBottom: 20, boxShadow: `0 0 12px ${f.accent}` }} />
                <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1.15rem", letterSpacing: ".02em", marginBottom: 10, color: "var(--frost)" }}>{f.t}</h3>
                <p style={{ color: "var(--gray)", fontSize: ".88rem", lineHeight: 1.75 }}>{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* AI PROGRAMS */}
      <section id="programs" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
            <div>
              <div className="eyebrow">AI Program Builder</div>
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: ".03em", marginBottom: 20 }}>
                {t.progH}
              </h2>
              <p style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 32 }}>
                Select your sport, set your goal, and PACT's AI generates a fully periodized training program tailored to you — weeks of structured programming, phase preferences, and flexible timeline modes in one tap.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {SPORTS.map(s => (
                  <div key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(59,123,255,.08)", border: "1px solid rgba(59,123,255,.18)", borderRadius: 100, padding: "6px 14px", fontFamily: "'Inter',sans-serif", fontSize: ".78rem", color: "var(--gray)", cursor: "default", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,123,255,.18)"; e.currentTarget.style.color = "#EEF2FF"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,123,255,.08)"; e.currentTarget.style.color = "var(--gray)"; }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".55rem", color: "var(--blue2)" }}>{s.icon}</span>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="hide-m" style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "flex-end", position: "relative" }}>
              <div style={{ position: "absolute", inset: "-40px", background: "radial-gradient(ellipse 60% 70% at 50% 50%,rgba(59,123,255,.2) 0%,transparent 70%)", pointerEvents: "none" }} />
              <Phone src={IMG_PROGRAMS_SEL} float="A" style={{ maxWidth: 230, marginBottom: 30 }} />
              <Phone src={IMG_PROGRAM_FORM} float="B" style={{ maxWidth: 230 }} />
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* WORKOUT LIBRARY */}
      <section className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
            <div className="hide-m" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: "-40px", background: "radial-gradient(ellipse 60% 70% at 50% 50%,rgba(124,92,252,.2) 0%,transparent 70%)", pointerEvents: "none" }} />
              <Phone src={IMG_LIBRARY} float="A" style={{ maxWidth: 280 }} />
            </div>
            <div>
              <div className="eyebrow">Workout Library</div>
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: ".03em", marginBottom: 20 }}>
                {t.libH}
              </h2>
              <p style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 32 }}>
                From HYROX benchmarks to CrossFit WODs, from powerlifting templates to custom sessions — PACT's library has pre-built workouts ready to log, share, or add to your schedule.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {[["All", "tag-blue"], ["Bodybuilding", "tag-amber"], ["CrossFit", "tag-green"], ["Hyrox", "tag-cyan"], ["Powerlifting", "tag-purple"]].map(([l, c]) => (
                  <span key={l} className={`tag ${c}`}>{l}</span>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["200+", "Saved Benchmarks", "var(--blue2)"], ["12+", "Sport Categories", "var(--cyan)"]].map(([v, l, c]) => (
                  <div key={l} style={{ background: "var(--glass-1)", border: "1px solid var(--glass-border)", borderRadius: "var(--r-sm)", padding: "20px 18px" }}>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "2rem", color: c, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: ".75rem", color: "var(--gray2)", marginTop: 4, fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".08em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* COMMUNITY */}
      <section id="community" className="sec">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto", marginBottom: 64 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Communities</div>
            <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3.2rem)", lineHeight: 1.05, letterSpacing: ".03em", marginBottom: 18 }}>
              {t.commH}
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8 }}>
              Create or join Communities built around your gym, sport, or training style. Share workouts, chat with members, and grow together.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="two-col">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              t.commFeatures.map(f => (
                <div key={f.t} className="glass-card" style={{ padding: "22px 24px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(124,92,252,.12)", border: "1px solid rgba(124,92,252,.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: ".5rem", letterSpacing: ".1em", color: "#A78BFA", flexShrink: 0 }}>{f.lbl}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: ".03em", marginBottom: 5 }}>{f.t}</h3>
                    <p style={{ color: "var(--gray)", fontSize: ".88rem", lineHeight: 1.65 }}>{f.b}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hide-m" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: "-40px", background: "radial-gradient(ellipse 60% 70% at 50% 50%,rgba(124,92,252,.2) 0%,transparent 70%)", pointerEvents: "none" }} />
              <Phone src={IMG_COMMUNITY} float="B" style={{ maxWidth: 280 }} />
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* WAITLIST */}
      <section id="waitlist" className="sec">
        <div className="wrap">
          <div className="glass-panel" style={{ padding: "80px 60px", textAlign: "center", background: "linear-gradient(135deg,rgba(59,123,255,.09) 0%,rgba(0,212,255,.05) 100%)", border: "1px solid rgba(59,123,255,.2)" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Your Move</div>
            <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,3.6rem)", lineHeight: 1.05, letterSpacing: ".03em", marginBottom: 16 }}>
              {t.waitlistH}
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 40px" }}>
              {t.waitlistSub}
            </p>
            <WaitlistForm placeholder={t.emailPH} btnText={t.joinBtn} style={{ justifyContent: "center", maxWidth: 520, margin: "0 auto 20px" }} />
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", letterSpacing: ".14em", color: "var(--gray3)" }}>
              FREE TO JOIN - NO CREDIT CARD REQUIRED - iOS AND ANDROID COMING SOON
            </p>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* FAQ */}
      <section id="faq" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }} className="two-col faq-grid">
            <div>
              <div className="eyebrow">FAQ</div>
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,2.8rem)", lineHeight: 1.1, letterSpacing: ".03em", marginBottom: 16 }}>Real questions.</h2>
              <p style={{ color: "var(--gray)", fontSize: ".95rem", lineHeight: 1.75 }}>Everything you need to know about PACT before you make yours.</p>
            </div>
            <div>{t.faqs.map(f => <FaqRow key={f.q} q={f.q} a={f.a} />)}</div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* FOOTER */}
      <footer style={{ padding: "60px 5% 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }} className="four-col">
            <div>
              <div style={{ marginBottom: 20 }}>
                <img src={IMG_LOGO_FULL} alt="PACT" style={{ height: 38, width: "auto", filter: "drop-shadow(0 0 8px rgba(59,123,255,.4))" }} />
              </div>
              <p style={{ color: "var(--gray2)", fontSize: ".88rem", lineHeight: 1.75, maxWidth: 260, marginBottom: 20 }}>
                {t.footerTagline}
              </p>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".12em", color: "var(--gray3)", lineHeight: 1.8 }}>
                2026 ACCOUNTAFIT CORP<br />DELAWARE, USA
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".18em", color: "var(--gray3)", marginBottom: 20 }}>PRODUCT</div>
              {t.productLinks.map(l => (
                <div key={l} style={{ marginBottom: 12, color: "var(--gray2)", fontSize: ".88rem", cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#EEF2FF"} onMouseLeave={e => e.target.style.color = "var(--gray2)"}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".18em", color: "var(--gray3)", marginBottom: 20 }}>COMPANY</div>
              {t.companyLinks.map(l => (
                <div key={l} style={{ marginBottom: 12, color: "var(--gray2)", fontSize: ".88rem", cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#EEF2FF"} onMouseLeave={e => e.target.style.color = "var(--gray2)"}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".18em", color: "var(--gray3)", marginBottom: 20 }}>LEGAL</div>
              {[["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["Community Guidelines", "/guidelines"], ["Safety Policy", "/safety"]].map(([l, href]) => (
                <a key={l} href={href} style={{ display: "block", marginBottom: 12, color: "var(--gray2)", fontSize: ".88rem", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#EEF2FF"} onMouseLeave={e => e.target.style.color = "var(--gray2)"}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".12em", color: "var(--gray3)" }}>YOUR DISCIPLINE STARTS NOW</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["iOS", "Android", "Instagram", "Twitter"].map(l => (
                <a key={l} href="#" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".12em", color: "var(--gray3)", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#EEF2FF"} onMouseLeave={e => e.target.style.color = "var(--gray3)"}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <Chatbot />
    </>
  );
}

