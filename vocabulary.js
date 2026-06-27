/**
 * ESPAÑOL EN CASA — v2
 * Base de données du vocabulaire, organisée par niveau CECRL puis par leçon.
 * Chaque mot possède : forme espagnole, traduction française, catégorie
 * grammaticale, phrase d'exemple, et un niveau de difficulté (1-3) utilisé
 * pour pondérer les exercices.
 */

const VOCAB_LEVELS = [
  {
    id: "A1",
    title: "A1 — Découverte",
    description: "Les bases : se présenter, compter, le quotidien, la maison.",
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
          { es: "Hasta luego", fr: "À plus tard", cat: "expression", example: "Hasta luego, amigo." },
          { es: "Por favor", fr: "S'il vous plaît", cat: "expression", example: "Un café, por favor." },
          { es: "Gracias", fr: "Merci", cat: "interjection", example: "Gracias por tu ayuda." },
          { es: "De nada", fr: "De rien", cat: "expression", example: "— Gracias. — De nada." },
          { es: "Perdón", fr: "Pardon", cat: "interjection", example: "Perdón, ¿dónde está la estación?" },
          { es: "¿Cómo te llamas?", fr: "Comment t'appelles-tu ?", cat: "question", example: "Hola, ¿cómo te llamas?" },
          { es: "Mucho gusto", fr: "Enchanté(e)", cat: "expression", example: "Mucho gusto, soy Carlos." },
          { es: "¿Qué tal?", fr: "Comment ça va ?", cat: "question", example: "Hola, ¿qué tal?" },
          { es: "Bien, gracias", fr: "Bien, merci", cat: "expression", example: "— ¿Qué tal? — Bien, gracias." }
        ]
      },
      {
        id: "a1-nombres",
        title: "Les nombres (0–100)",
        icon: "🔢",
        words: [
          { es: "Cero", fr: "Zéro", cat: "nombre", example: "Empezamos desde cero." },
          { es: "Uno", fr: "Un", cat: "nombre", example: "Tengo uno." },
          { es: "Dos", fr: "Deux", cat: "nombre", example: "Dos cafés, por favor." },
          { es: "Tres", fr: "Trois", cat: "nombre", example: "Son las tres." },
          { es: "Cuatro", fr: "Quatre", cat: "nombre", example: "Cuatro hermanos." },
          { es: "Cinco", fr: "Cinq", cat: "nombre", example: "Cinco minutos." },
          { es: "Seis", fr: "Six", cat: "nombre", example: "Seis personas." },
          { es: "Siete", fr: "Sept", cat: "nombre", example: "Siete días." },
          { es: "Ocho", fr: "Huit", cat: "nombre", example: "Ocho horas de sueño." },
          { es: "Nueve", fr: "Neuf", cat: "nombre", example: "Nueve meses." },
          { es: "Diez", fr: "Dix", cat: "nombre", example: "Diez euros." },
          { es: "Quince", fr: "Quinze", cat: "nombre", example: "Quince días." },
          { es: "Veinte", fr: "Vingt", cat: "nombre", example: "Veinte años." },
          { es: "Treinta", fr: "Trente", cat: "nombre", example: "Treinta minutos." },
          { es: "Cincuenta", fr: "Cinquante", cat: "nombre", example: "Cincuenta por ciento." },
          { es: "Cien", fr: "Cent", cat: "nombre", example: "Cien por ciento seguro." }
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
          { es: "El abuelo", fr: "Le grand-père", cat: "nom (m.)", example: "Mi abuelo cuenta historias." },
          { es: "La abuela", fr: "La grand-mère", cat: "nom (f.)", example: "La abuela hace pan." },
          { es: "El hijo", fr: "Le fils", cat: "nom (m.)", example: "Su hijo estudia medicina." },
          { es: "La hija", fr: "La fille", cat: "nom (f.)", example: "La hija de Ana es médica." },
          { es: "El tío", fr: "L'oncle", cat: "nom (m.)", example: "Mi tío vive en Madrid." },
          { es: "La tía", fr: "La tante", cat: "nom (f.)", example: "Mi tía es profesora." },
          { es: "El primo", fr: "Le cousin", cat: "nom (m.)", example: "Mi primo juega al fútbol." },
          { es: "La esposa", fr: "L'épouse", cat: "nom (f.)", example: "Su esposa es ingeniera." },
          { es: "El esposo", fr: "L'époux", cat: "nom (m.)", example: "El esposo prepara la cena." }
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
          { es: "Blanco", fr: "Blanc", cat: "adjectif", example: "La nieve es blanca." },
          { es: "Naranja", fr: "Orange", cat: "adjectif", example: "La naranja es naranja." },
          { es: "Morado", fr: "Violet", cat: "adjectif", example: "La flor es morada." },
          { es: "Rosa", fr: "Rose", cat: "adjectif", example: "Su vestido es rosa." },
          { es: "Gris", fr: "Gris", cat: "adjectif", example: "El cielo está gris hoy." }
        ]
      },
      {
        id: "a1-maison",
        title: "La maison",
        icon: "🏠",
        words: [
          { es: "La casa", fr: "La maison", cat: "nom (f.)", example: "Mi casa es grande." },
          { es: "La cocina", fr: "La cuisine", cat: "nom (f.)", example: "La cocina está limpia." },
          { es: "El dormitorio", fr: "La chambre", cat: "nom (m.)", example: "Mi dormitorio es pequeño." },
          { es: "El baño", fr: "La salle de bain", cat: "nom (m.)", example: "El baño está al fondo." },
          { es: "La sala", fr: "Le salon", cat: "nom (f.)", example: "Vemos la tele en la sala." },
          { es: "La puerta", fr: "La porte", cat: "nom (f.)", example: "Cierra la puerta, por favor." },
          { es: "La ventana", fr: "La fenêtre", cat: "nom (f.)", example: "Abre la ventana." },
          { es: "La mesa", fr: "La table", cat: "nom (f.)", example: "La mesa es de madera." },
          { es: "La silla", fr: "La chaise", cat: "nom (f.)", example: "Siéntate en la silla." },
          { es: "La cama", fr: "Le lit", cat: "nom (f.)", example: "Mi cama es cómoda." }
        ]
      },
      {
        id: "a1-jours",
        title: "Jours, mois, saisons",
        icon: "📅",
        words: [
          { es: "Lunes", fr: "Lundi", cat: "nom (m.)", example: "El lunes empiezo a trabajar." },
          { es: "Martes", fr: "Mardi", cat: "nom (m.)", example: "Tengo clase el martes." },
          { es: "Miércoles", fr: "Mercredi", cat: "nom (m.)", example: "Hoy es miércoles." },
          { es: "Jueves", fr: "Jeudi", cat: "nom (m.)", example: "El jueves voy al médico." },
          { es: "Viernes", fr: "Vendredi", cat: "nom (m.)", example: "¡Por fin es viernes!" },
          { es: "Sábado", fr: "Samedi", cat: "nom (m.)", example: "El sábado no trabajo." },
          { es: "Domingo", fr: "Dimanche", cat: "nom (m.)", example: "Domingo es día de descanso." },
          { es: "Enero", fr: "Janvier", cat: "nom (m.)", example: "Enero es el primer mes." },
          { es: "Verano", fr: "Été", cat: "nom (m.)", example: "Me gusta el verano." },
          { es: "Invierno", fr: "Hiver", cat: "nom (m.)", example: "En invierno hace frío." }
        ]
      }
    ]
  },
  {
    id: "A2",
    title: "A2 — Élémentaire",
    description: "Décrire son quotidien, exprimer ses goûts, voyager, faire les courses.",
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
          { es: "La verdura", fr: "Le légume", cat: "nom (f.)", example: "Comemos verdura todos los días." },
          { es: "El arroz", fr: "Le riz", cat: "nom (m.)", example: "El arroz con pollo es delicioso." },
          { es: "La carne", fr: "La viande", cat: "nom (f.)", example: "No come carne." },
          { es: "El pescado", fr: "Le poisson", cat: "nom (m.)", example: "El pescado es fresco hoy." },
          { es: "El huevo", fr: "L'œuf", cat: "nom (m.)", example: "Desayuno un huevo cada día." },
          { es: "La leche", fr: "Le lait", cat: "nom (f.)", example: "Bebo leche por la mañana." },
          { es: "El queso", fr: "Le fromage", cat: "nom (m.)", example: "Me encanta el queso manchego." },
          { es: "La sopa", fr: "La soupe", cat: "nom (f.)", example: "La sopa está caliente." },
          { es: "El postre", fr: "Le dessert", cat: "nom (m.)", example: "¿Qué hay de postre?" }
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
          { es: "La playa", fr: "La plage", cat: "nom (f.)", example: "Vamos a la playa este verano." },
          { es: "El pasaporte", fr: "Le passeport", cat: "nom (m.)", example: "No olvides tu pasaporte." },
          { es: "La frontera", fr: "La frontière", cat: "nom (f.)", example: "Cruzamos la frontera en coche." },
          { es: "El tren", fr: "Le train", cat: "nom (m.)", example: "El tren sale a las ocho." },
          { es: "La reserva", fr: "La réservation", cat: "nom (f.)", example: "Tengo una reserva para dos." },
          { es: "El mapa", fr: "La carte (plan)", cat: "nom (m.)", example: "Necesito un mapa de la ciudad." }
        ]
      },
      {
        id: "a2-achats",
        title: "Les courses et le marché",
        icon: "🛒",
        words: [
          { es: "El mercado", fr: "Le marché", cat: "nom (m.)", example: "Voy al mercado los sábados." },
          { es: "La tienda", fr: "Le magasin", cat: "nom (f.)", example: "La tienda cierra a las nueve." },
          { es: "El precio", fr: "Le prix", cat: "nom (m.)", example: "¿Cuál es el precio?" },
          { es: "Barato", fr: "Bon marché", cat: "adjectif", example: "Este mercado es barato." },
          { es: "Caro", fr: "Cher", cat: "adjectif", example: "El hotel es muy caro." },
          { es: "La caja", fr: "La caisse", cat: "nom (f.)", example: "Paga en la caja." },
          { es: "El descuento", fr: "La réduction", cat: "nom (m.)", example: "Hay un descuento del veinte por ciento." },
          { es: "¿Cuánto cuesta?", fr: "Combien ça coûte ?", cat: "question", example: "¿Cuánto cuesta este libro?" }
        ]
      },
      {
        id: "a2-corps",
        title: "Le corps et la santé",
        icon: "🩺",
        words: [
          { es: "La cabeza", fr: "La tête", cat: "nom (f.)", example: "Me duele la cabeza." },
          { es: "El brazo", fr: "Le bras", cat: "nom (m.)", example: "Me rompí el brazo." },
          { es: "La pierna", fr: "La jambe", cat: "nom (f.)", example: "Tiene la pierna hinchada." },
          { es: "El estómago", fr: "L'estomac", cat: "nom (m.)", example: "Me duele el estómago." },
          { es: "La fiebre", fr: "La fièvre", cat: "nom (f.)", example: "Tiene fiebre alta." },
          { es: "El médico", fr: "Le médecin", cat: "nom (m.)", example: "Voy al médico hoy." },
          { es: "La farmacia", fr: "La pharmacie", cat: "nom (f.)", example: "La farmacia está cerca." },
          { es: "Estar enfermo", fr: "Être malade", cat: "expression", example: "Estoy enfermo desde ayer." }
        ]
      }
    ]
  },
  {
    id: "B1",
    title: "B1 — Intermédiaire",
    description: "Argumenter, raconter, gérer l'imprévu, le monde du travail.",
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
          { es: "No estoy seguro/a", fr: "Je ne suis pas sûr(e)", cat: "expression", example: "No estoy seguro de eso." },
          { es: "Me parece que", fr: "Il me semble que", cat: "expression", example: "Me parece que llueve." },
          { es: "Por un lado... por otro lado", fr: "D'un côté... de l'autre", cat: "expression", example: "Por un lado quiero ir, por otro lado no tengo tiempo." },
          { es: "Sin embargo", fr: "Cependant", cat: "connecteur", example: "Es caro, sin embargo lo compro." },
          { es: "Además", fr: "De plus", cat: "connecteur", example: "Además, es muy útil." }
        ]
      },
      {
        id: "b1-travail",
        title: "Le monde du travail",
        icon: "💼",
        words: [
          { es: "El trabajo", fr: "Le travail", cat: "nom (m.)", example: "Busco trabajo desde hace un mes." },
          { es: "La entrevista", fr: "L'entretien", cat: "nom (f.)", example: "Tengo una entrevista mañana." },
          { es: "El sueldo", fr: "Le salaire", cat: "nom (m.)", example: "El sueldo es razonable." },
          { es: "El jefe", fr: "Le patron", cat: "nom (m.)", example: "Mi jefe es exigente." },
          { es: "La empresa", fr: "L'entreprise", cat: "nom (f.)", example: "Trabajo en una empresa internacional." },
          { es: "El contrato", fr: "Le contrat", cat: "nom (m.)", example: "Firmé el contrato ayer." },
          { es: "Las vacaciones", fr: "Les vacances", cat: "nom (f. pl.)", example: "Necesito vacaciones." },
          { es: "Renunciar", fr: "Démissionner", cat: "verbe", example: "Decidió renunciar a su puesto." }
        ]
      },
      {
        id: "b1-emotions",
        title: "Les émotions et sentiments",
        icon: "🎭",
        words: [
          { es: "Estar feliz", fr: "Être heureux", cat: "expression", example: "Estoy feliz de verte." },
          { es: "Tener miedo", fr: "Avoir peur", cat: "expression", example: "Tengo miedo de las arañas." },
          { es: "Estar triste", fr: "Être triste", cat: "expression", example: "Está triste por la noticia." },
          { es: "Sentirse orgulloso", fr: "Se sentir fier", cat: "expression", example: "Me siento orgulloso de ti." },
          { es: "Estar enojado", fr: "Être en colère", cat: "expression", example: "Está enojado conmigo." },
          { es: "Tener celos", fr: "Être jaloux", cat: "expression", example: "Tiene celos de su hermano." },
          { es: "Sorprenderse", fr: "Être surpris", cat: "verbe", example: "Me sorprendí mucho." }
        ]
      }
    ]
  },
  {
    id: "B2",
    title: "B2 — Avancé",
    description: "Nuances, registres, débats, actualité et environnement.",
    color: "#8A4A6B",
    lessons: [
      {
        id: "b2-environnement",
        title: "Environnement et écologie",
        icon: "🌍",
        words: [
          { es: "El cambio climático", fr: "Le changement climatique", cat: "expression", example: "El cambio climático es alarmante." },
          { es: "La contaminación", fr: "La pollution", cat: "nom (f.)", example: "La contaminación afecta a las ciudades." },
          { es: "Reciclar", fr: "Recycler", cat: "verbe", example: "Es importante reciclar el plástico." },
          { es: "La energía renovable", fr: "L'énergie renouvelable", cat: "expression", example: "Invierten en energía renovable." },
          { es: "El medio ambiente", fr: "L'environnement", cat: "expression", example: "Debemos proteger el medio ambiente." },
          { es: "La sequía", fr: "La sécheresse", cat: "nom (f.)", example: "La sequía afecta a la agricultura." },
          { es: "Sostenible", fr: "Durable", cat: "adjectif", example: "Buscamos un modelo sostenible." }
        ]
      },
      {
        id: "b2-debat",
        title: "Débattre et nuancer",
        icon: "🗣️",
        words: [
          { es: "Cabe destacar que", fr: "Il convient de souligner que", cat: "expression", example: "Cabe destacar que el proyecto avanza bien." },
          { es: "Desde mi punto de vista", fr: "De mon point de vue", cat: "expression", example: "Desde mi punto de vista, es arriesgado." },
          { es: "No obstante", fr: "Néanmoins", cat: "connecteur", example: "No obstante, hay que considerar los riesgos." },
          { es: "A pesar de", fr: "Malgré", cat: "expression", example: "A pesar de la lluvia, salimos." },
          { es: "En cuanto a", fr: "En ce qui concerne", cat: "expression", example: "En cuanto al precio, es razonable." },
          { es: "Plantear una duda", fr: "Soulever un doute", cat: "expression", example: "Quiero plantear una duda sobre esto." }
        ]
      }
    ]
  },
  {
    id: "C1",
    title: "C1 — Autonome",
    description: "Maîtrise fine, registre soutenu, expressions idiomatiques.",
    color: "#5F4A3A",
    lessons: [
      {
        id: "c1-idiomes",
        title: "Expressions idiomatiques",
        icon: "🦋",
        words: [
          { es: "Costar un ojo de la cara", fr: "Coûter les yeux de la tête", cat: "idiome", example: "Ese coche cuesta un ojo de la cara." },
          { es: "Estar en las nubes", fr: "Être dans la lune", cat: "idiome", example: "Siempre estás en las nubes." },
          { es: "Tirar la toalla", fr: "Jeter l'éponge", cat: "idiome", example: "No voy a tirar la toalla." },
          { es: "Ponerse las pilas", fr: "Se mettre au travail sérieusement", cat: "idiome", example: "Tienes que ponerte las pilas." },
          { es: "Hablar por los codos", fr: "Être bavard", cat: "idiome", example: "Mi tía habla por los codos." },
          { es: "Dar en el clavo", fr: "Mettre le doigt sur le problème", cat: "idiome", example: "Has dado en el clavo." }
        ]
      },
      {
        id: "c1-registre",
        title: "Registre soutenu",
        icon: "📜",
        words: [
          { es: "Por consiguiente", fr: "Par conséquent", cat: "connecteur", example: "Por consiguiente, se aprobó la ley." },
          { es: "En aras de", fr: "Dans l'intérêt de", cat: "expression", example: "En aras de la transparencia, publicamos los datos." },
          { es: "Cabe señalar", fr: "Il faut signaler", cat: "expression", example: "Cabe señalar que los resultados varían." },
          { es: "Sin perjuicio de", fr: "Sans préjudice de", cat: "expression", example: "Sin perjuicio de lo anterior, continuamos." }
        ]
      }
    ]
  }
];

window.VOCAB_LEVELS = VOCAB_LEVELS;
