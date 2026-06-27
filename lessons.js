/**
 * Base de données pédagogique du site d'apprentissage de l'espagnol.
 * Structure extensible : chaque niveau CECRL (A1 à C1) contient des leçons,
 * chaque leçon contient des mots/expressions avec traduction, catégorie
 * grammaticale et une phrase d'exemple.
 *
 * Pour ajouter du contenu plus tard : il suffit d'enrichir le tableau
 * "words" de la leçon concernée ou d'ajouter une nouvelle leçon à un niveau.
 */

const LEVELS = [
  {
    id: "A1",
    title: "A1 — Découverte",
    description: "Les bases : se présenter, compter, le quotidien.",
    color: "#1E3A5F",
    lessons: [
      {
        id: "a1-salutations",
        title: "Salutations et politesse",
        icon: "👋",
        words: [
          { es: "Hola", fr: "Salut / Bonjour", cat: "interjection", example: "Hola, ¿qué tal?" },
          { es: "Buenos días", fr: "Bonjour (matin)", cat: "expression", example: "Buenos días, señora." },
          { es: "Buenas tardes", fr: "Bon après-midi", cat: "expression", example: "Buenas tardes a todos." },
          { es: "Buenas noches", fr: "Bonsoir / Bonne nuit", cat: "expression", example: "Buenas noches, hasta mañana." },
          { es: "Adiós", fr: "Au revoir", cat: "interjection", example: "Adiós, nos vemos pronto." },
          { es: "Por favor", fr: "S'il vous plaît", cat: "expression", example: "Un café, por favor." },
          { es: "Gracias", fr: "Merci", cat: "interjection", example: "Gracias por tu ayuda." },
          { es: "De nada", fr: "De rien", cat: "expression", example: "— Gracias. — De nada." },
          { es: "Perdón", fr: "Pardon", cat: "interjection", example: "Perdón, ¿dónde está la estación?" },
          { es: "¿Cómo te llamas?", fr: "Comment t'appelles-tu ?", cat: "question", example: "Hola, ¿cómo te llamas?" }
        ]
      },
      {
        id: "a1-nombres",
        title: "Les nombres (0–20)",
        icon: "🔢",
        words: [
          { es: "Cero", fr: "Zéro", cat: "nombre", example: "Empezamos desde cero." },
          { es: "Uno", fr: "Un", cat: "nombre", example: "Tengo uno." },
          { es: "Dos", fr: "Deux", cat: "nombre", example: "Dos cafés, por favor." },
          { es: "Tres", fr: "Trois", cat: "nombre", example: "Son las tres." },
          { es: "Cuatro", fr: "Quatre", cat: "nombre", example: "Cuatro hermanos." },
          { es: "Cinco", fr: "Cinq", cat: "nombre", example: "Cinco minutos." },
          { es: "Diez", fr: "Dix", cat: "nombre", example: "Diez euros." },
          { es: "Quince", fr: "Quinze", cat: "nombre", example: "Quince días." },
          { es: "Veinte", fr: "Vingt", cat: "nombre", example: "Veinte años." }
        ]
      },
      {
        id: "a1-famille",
        title: "La famille",
        icon: "👨‍👩‍👧",
        words: [
          { es: "La madre", fr: "La mère", cat: "nom (f.)", example: "Mi madre cocina bien." },
          { es: "El padre", fr: "Le père", cat: "nom (m.)", example: "El padre trabaja mucho." },
          { es: "El hermano", fr: "Le frère", cat: "nom (m.)", example: "Mi hermano es alto." },
          { es: "La hermana", fr: "La sœur", cat: "nom (f.)", example: "Tengo una hermana." },
          { es: "Los abuelos", fr: "Les grands-parents", cat: "nom (m. pl.)", example: "Visito a mis abuelos." },
          { es: "El hijo", fr: "Le fils", cat: "nom (m.)", example: "Su hijo estudia medicina." },
          { es: "La hija", fr: "La fille", cat: "nom (f.)", example: "La hija de Ana es médica." }
        ]
      },
      {
        id: "a1-couleurs",
        title: "Les couleurs",
        icon: "🎨",
        words: [
          { es: "Rojo", fr: "Rouge", cat: "adjectif", example: "El coche es rojo." },
          { es: "Azul", fr: "Bleu", cat: "adjectif", example: "El cielo es azul." },
          { es: "Verde", fr: "Vert", cat: "adjectif", example: "La hierba es verde." },
          { es: "Amarillo", fr: "Jaune", cat: "adjectif", example: "El sol es amarillo." },
          { es: "Negro", fr: "Noir", cat: "adjectif", example: "El gato es negro." },
          { es: "Blanco", fr: "Blanc", cat: "adjectif", example: "La nieve es blanca." }
        ]
      }
    ]
  },
  {
    id: "A2",
    title: "A2 — Élémentaire",
    description: "Décrire son quotidien, exprimer ses goûts, voyager.",
    color: "#2D5F8A",
    lessons: [
      {
        id: "a2-nourriture",
        title: "La nourriture",
        icon: "🍽️",
        words: [
          { es: "El pan", fr: "Le pain", cat: "nom (m.)", example: "Compro pan cada mañana." },
          { es: "El agua", fr: "L'eau", cat: "nom (f.)", example: "Necesito un vaso de agua." },
          { es: "La fruta", fr: "Le fruit", cat: "nom (f.)", example: "Me gusta la fruta fresca." },
          { es: "El arroz", fr: "Le riz", cat: "nom (m.)", example: "El arroz con pollo es delicioso." },
          { es: "La carne", fr: "La viande", cat: "nom (f.)", example: "No come carne." },
          { es: "El pescado", fr: "Le poisson", cat: "nom (m.)", example: "El pescado es fresco hoy." }
        ]
      },
      {
        id: "a2-voyage",
        title: "Le voyage",
        icon: "✈️",
        words: [
          { es: "El billete", fr: "Le billet", cat: "nom (m.)", example: "¿Dónde compro el billete?" },
          { es: "El aeropuerto", fr: "L'aéroport", cat: "nom (m.)", example: "Llegamos al aeropuerto a tiempo." },
          { es: "La maleta", fr: "La valise", cat: "nom (f.)", example: "Mi maleta es muy pesada." },
          { es: "El hotel", fr: "L'hôtel", cat: "nom (m.)", example: "Reservé el hotel ayer." },
          { es: "La playa", fr: "La plage", cat: "nom (f.)", example: "Vamos a la playa este verano." }
        ]
      }
    ]
  },
  {
    id: "B1",
    title: "B1 — Intermédiaire",
    description: "Argumenter, raconter, gérer l'imprévu.",
    color: "#C75D3A",
    lessons: [
      {
        id: "b1-opinion",
        title: "Exprimer une opinion",
        icon: "💬",
        words: [
          { es: "Creo que", fr: "Je crois que", cat: "expression", example: "Creo que tienes razón." },
          { es: "En mi opinión", fr: "À mon avis", cat: "expression", example: "En mi opinión, es injusto." },
          { es: "Estoy de acuerdo", fr: "Je suis d'accord", cat: "expression", example: "Estoy de acuerdo contigo." },
          { es: "No estoy seguro/a", fr: "Je ne suis pas sûr(e)", cat: "expression", example: "No estoy seguro de eso." }
        ]
      }
    ]
  },
  {
    id: "B2",
    title: "B2 — Avancé",
    description: "Nuances, registres, débats. (Contenu à venir)",
    color: "#8A4A6B",
    lessons: []
  },
  {
    id: "C1",
    title: "C1 — Autonome",
    description: "Maîtrise fine, registre soutenu. (Contenu à venir)",
    color: "#5F4A3A",
    lessons: []
  }
];

/**
 * Banque de questions pour le test de positionnement.
 * Chaque question est rattachée à un niveau cible (le niveau qu'elle évalue).
 * Le score final orientera l'utilisateur vers le niveau de départ recommandé.
 */
const PLACEMENT_TEST = [
  {
    level: "A1",
    question: "Comment dit-on « Bonjour » en espagnol ?",
    options: ["Hola", "Adiós", "Gracias", "Por favor"],
    answer: 0
  },
  {
    level: "A1",
    question: "Que signifie « Gracias » ?",
    options: ["Pardon", "Merci", "S'il vous plaît", "Au revoir"],
    answer: 1
  },
  {
    level: "A1",
    question: "Comment dit-on « trois » en espagnol ?",
    options: ["Dos", "Cuatro", "Tres", "Cinco"],
    answer: 2
  },
  {
    level: "A2",
    question: "Quel mot signifie « valise » ?",
    options: ["El billete", "La maleta", "El hotel", "La playa"],
    answer: 1
  },
  {
    level: "A2",
    question: "Complétez : « Me ____ la fruta fresca. »",
    options: ["gusta", "gustan", "gustar", "gusto"],
    answer: 0
  },
  {
    level: "B1",
    question: "Quelle expression sert à donner son opinion ?",
    options: ["Por favor", "En mi opinión", "Buenas noches", "De nada"],
    answer: 1
  },
  {
    level: "B1",
    question: "« Estoy de acuerdo » signifie :",
    options: ["Je suis fatigué", "Je suis d'accord", "Je suis en retard", "Je suis désolé"],
    answer: 1
  },
  {
    level: "B2",
    question: "Quel registre utilise-t-on dans une lettre formelle ?",
    options: ["Tuteo (tú)", "Voseo (vos)", "Usted", "Argot familier"],
    answer: 2
  }
];

// Exposition des données au reste de l'application (chargement via balise <script>)
window.LEVELS = LEVELS;
window.PLACEMENT_TEST = PLACEMENT_TEST;
