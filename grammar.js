/**
 * ESPAÑOL EN CASA — v2
 * Fiches de grammaire et de conjugaison, organisées par niveau CECRL.
 * Chaque fiche contient : titre, explication courte, un ou plusieurs
 * tableaux (ex. conjugaison), et des exemples.
 */

const GRAMMAR_LEVELS = [
  {
    id: "A1",
    sheets: [
      {
        id: "a1-articles",
        title: "Les articles (el, la, los, las, un, una)",
        icon: "📘",
        explanation:
          "En espagnol, chaque nom a un genre (masculin ou féminin) et un nombre (singulier ou pluriel). " +
          "Les articles définis sont « el » (m. sing.), « la » (f. sing.), « los » (m. pl.), « las » (f. pl.). " +
          "Les articles indéfinis sont « un » (m. sing.) et « una » (f. sing.).",
        examples: [
          { es: "el libro", fr: "le livre" },
          { es: "la mesa", fr: "la table" },
          { es: "los libros", fr: "les livres" },
          { es: "las mesas", fr: "les tables" },
          { es: "un perro", fr: "un chien" },
          { es: "una casa", fr: "une maison" }
        ]
      },
      {
        id: "a1-ser-estar",
        title: "Les verbes SER et ESTAR (présent)",
        icon: "🔑",
        explanation:
          "Le français n'a qu'un seul verbe « être », mais l'espagnol en a deux. " +
          "SER exprime une qualité permanente ou une identité (nationalité, métier, caractère). " +
          "ESTAR exprime un état temporaire, une émotion ou une localisation.",
        table: {
          headers: ["Pronom", "SER", "ESTAR"],
          rows: [
            ["yo", "soy", "estoy"],
            ["tú", "eres", "estás"],
            ["él / ella / usted", "es", "está"],
            ["nosotros/as", "somos", "estamos"],
            ["vosotros/as", "sois", "estáis"],
            ["ellos/as / ustedes", "son", "están"]
          ]
        },
        examples: [
          { es: "Soy marroquí.", fr: "Je suis marocain." },
          { es: "Estoy cansado.", fr: "Je suis fatigué." },
          { es: "Ella es médica.", fr: "Elle est médecin." },
          { es: "Madrid está en España.", fr: "Madrid est en Espagne." }
        ]
      },
      {
        id: "a1-presente-ar",
        title: "Présent des verbes réguliers en -AR",
        icon: "⚙️",
        explanation:
          "Les verbes du premier groupe se terminent par -AR à l'infinitif (hablar, trabajar, estudiar...). " +
          "On retire la terminaison -AR et on ajoute les terminaisons du présent.",
        table: {
          headers: ["Pronom", "HABLAR (parler)"],
          rows: [
            ["yo", "hablo"],
            ["tú", "hablas"],
            ["él / ella / usted", "habla"],
            ["nosotros/as", "hablamos"],
            ["vosotros/as", "habláis"],
            ["ellos/as / ustedes", "hablan"]
          ]
        },
        examples: [
          { es: "Hablo español todos los días.", fr: "Je parle espagnol tous les jours." },
          { es: "Trabajamos en Tánger.", fr: "Nous travaillons à Tanger." }
        ]
      }
    ]
  },
  {
    id: "A2",
    sheets: [
      {
        id: "a2-presente-er-ir",
        title: "Présent des verbes en -ER et -IR",
        icon: "⚙️",
        explanation:
          "Les verbes du deuxième groupe finissent en -ER (comer, beber) et ceux du troisième groupe en -IR (vivir, escribir). " +
          "Leurs terminaisons au présent diffèrent légèrement de celles en -AR.",
        table: {
          headers: ["Pronom", "COMER (manger)", "VIVIR (vivre)"],
          rows: [
            ["yo", "como", "vivo"],
            ["tú", "comes", "vives"],
            ["él / ella / usted", "come", "vive"],
            ["nosotros/as", "comemos", "vivimos"],
            ["vosotros/as", "coméis", "vivís"],
            ["ellos/as / ustedes", "comen", "viven"]
          ]
        },
        examples: [
          { es: "Comemos paella los domingos.", fr: "Nous mangeons de la paella le dimanche." },
          { es: "Vivo en Tánger desde 2020.", fr: "Je vis à Tanger depuis 2020." }
        ]
      },
      {
        id: "a2-passe-compose",
        title: "Le passé composé (pretérito perfecto)",
        icon: "🕰️",
        explanation:
          "Formé avec le verbe HABER au présent + participe passé. " +
          "Il décrit une action passée en lien avec le présent, ou très récente.",
        table: {
          headers: ["Pronom", "HABER", "+ participe (-ado / -ido)"],
          rows: [
            ["yo", "he", "hablado"],
            ["tú", "has", "comido"],
            ["él / ella", "ha", "vivido"],
            ["nosotros/as", "hemos", "trabajado"],
            ["vosotros/as", "habéis", "salido"],
            ["ellos/as", "han", "terminado"]
          ]
        },
        examples: [
          { es: "He terminado mi tarea.", fr: "J'ai fini mon devoir." },
          { es: "¿Has comido ya?", fr: "Tu as déjà mangé ?" }
        ]
      },
      {
        id: "a2-futur-proche",
        title: "Le futur proche : IR A + infinitif",
        icon: "🔮",
        explanation:
          "Pour exprimer une intention proche, on utilise le verbe IR au présent suivi de « a » et de l'infinitif du verbe.",
        table: {
          headers: ["Pronom", "IR", "+ a + infinitif"],
          rows: [
            ["yo", "voy", "a viajar"],
            ["tú", "vas", "a estudiar"],
            ["él / ella", "va", "a llegar"],
            ["nosotros/as", "vamos", "a comer"],
            ["ellos/as", "van", "a salir"]
          ]
        },
        examples: [
          { es: "Voy a viajar a España.", fr: "Je vais voyager en Espagne." },
          { es: "Vamos a comer juntos.", fr: "Nous allons manger ensemble." }
        ]
      }
    ]
  },
  {
    id: "B1",
    sheets: [
      {
        id: "b1-imparfait",
        title: "L'imparfait (pretérito imperfecto)",
        icon: "🕰️",
        explanation:
          "L'imparfait décrit une action habituelle ou en cours dans le passé, sans limite de temps précise — équivalent de l'imparfait français.",
        table: {
          headers: ["Pronom", "HABLAR", "COMER", "VIVIR"],
          rows: [
            ["yo", "hablaba", "comía", "vivía"],
            ["tú", "hablabas", "comías", "vivías"],
            ["él / ella", "hablaba", "comía", "vivía"],
            ["nosotros/as", "hablábamos", "comíamos", "vivíamos"],
            ["ellos/as", "hablaban", "comían", "vivían"]
          ]
        },
        examples: [
          { es: "Cuando era niño, vivía en Tetuán.", fr: "Quand j'étais enfant, je vivais à Tétouan." },
          { es: "Hablábamos todos los días.", fr: "Nous parlions tous les jours." }
        ]
      },
      {
        id: "b1-subjonctif-intro",
        title: "Introduction au subjonctif présent",
        icon: "🌀",
        explanation:
          "Le subjonctif s'utilise après des expressions de souhait, doute ou émotion (« quiero que », « espero que », « es importante que »).",
        table: {
          headers: ["Pronom", "HABLAR", "COMER", "VIVIR"],
          rows: [
            ["yo", "hable", "coma", "viva"],
            ["tú", "hables", "comas", "vivas"],
            ["él / ella", "hable", "coma", "viva"],
            ["nosotros/as", "hablemos", "comamos", "vivamos"],
            ["ellos/as", "hablen", "coman", "vivan"]
          ]
        },
        examples: [
          { es: "Quiero que hables más despacio.", fr: "Je veux que tu parles plus lentement." },
          { es: "Espero que vivas feliz.", fr: "J'espère que tu vives heureux." }
        ]
      }
    ]
  },
  {
    id: "B2",
    sheets: [
      {
        id: "b2-conditionnel",
        title: "Le conditionnel (condicional simple)",
        icon: "💭",
        explanation:
          "Utilisé pour exprimer une hypothèse, un conseil poli, ou une action future dans le passé. Se forme en ajoutant les terminaisons -ía, -ías... à l'infinitif complet.",
        table: {
          headers: ["Pronom", "HABLAR", "COMER", "VIVIR"],
          rows: [
            ["yo", "hablaría", "comería", "viviría"],
            ["tú", "hablarías", "comerías", "vivirías"],
            ["él / ella", "hablaría", "comería", "viviría"],
            ["nosotros/as", "hablaríamos", "comeríamos", "viviríamos"]
          ]
        },
        examples: [
          { es: "Me gustaría viajar a Sevilla.", fr: "J'aimerais voyager à Séville." },
          { es: "¿Podrías ayudarme?", fr: "Pourrais-tu m'aider ?" }
        ]
      },
      {
        id: "b2-si-hypothese",
        title: "Phrases hypothétiques avec SI",
        icon: "🔀",
        explanation:
          "Structure courante : SI + imparfait du subjonctif, + conditionnel — pour une hypothèse irréelle ou peu probable au présent.",
        examples: [
          { es: "Si tuviera tiempo, viajaría más.", fr: "Si j'avais le temps, je voyagerais plus." },
          { es: "Si fuera rico, compraría una casa.", fr: "Si j'étais riche, j'achèterais une maison." }
        ]
      }
    ]
  },
  {
    id: "C1",
    sheets: [
      {
        id: "c1-subjonctif-passe",
        title: "Le subjonctif imparfait et plus-que-parfait",
        icon: "🌀",
        explanation:
          "Formes utilisées dans un registre soutenu et dans les hypothèses complexes, notamment avec « si » au passé : « Si hubiera sabido... »",
        examples: [
          { es: "Si hubiera sabido, habría venido antes.", fr: "Si j'avais su, je serais venu plus tôt." },
          { es: "Ojalá hubiera estudiado más.", fr: "Si seulement j'avais étudié davantage." }
        ]
      },
      {
        id: "c1-discours-rapporte",
        title: "Le discours rapporté (estilo indirecto)",
        icon: "🗯️",
        explanation:
          "Lorsqu'on rapporte les paroles de quelqu'un, les temps verbaux et certains marqueurs temporels changent, comme en français.",
        examples: [
          { es: "Dijo que vendría al día siguiente.", fr: "Il a dit qu'il viendrait le lendemain." },
          { es: "Me preguntó si había terminado.", fr: "Il m'a demandé si j'avais terminé." }
        ]
      }
    ]
  }
];

window.GRAMMAR_LEVELS = GRAMMAR_LEVELS;
