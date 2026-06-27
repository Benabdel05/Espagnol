/**
 * Banque de questions pour le test de positionnement.
 * Difficulté croissante de A1 à B2 ; recommande un niveau de départ.
 */

const PLACEMENT_TEST = [
  { level: "A1", question: "Comment dit-on « Bonjour » en espagnol ?", options: ["Hola", "Adiós", "Gracias", "Por favor"], answer: 0 },
  { level: "A1", question: "Que signifie « Gracias » ?", options: ["Pardon", "Merci", "S'il vous plaît", "Au revoir"], answer: 1 },
  { level: "A1", question: "Comment dit-on « trois » en espagnol ?", options: ["Dos", "Cuatro", "Tres", "Cinco"], answer: 2 },
  { level: "A1", question: "Quel article précède « casa » (féminin singulier) ?", options: ["el", "la", "los", "las"], answer: 1 },
  { level: "A2", question: "Quel mot signifie « valise » ?", options: ["El billete", "La maleta", "El hotel", "La playa"], answer: 1 },
  { level: "A2", question: "Conjuguez COMER à la 1ère personne du singulier : « yo ___ »", options: ["come", "comes", "como", "comemos"], answer: 2 },
  { level: "A2", question: "Quelle structure exprime un futur proche ?", options: ["Haber + participe", "Ir a + infinitif", "Estar + gérondif", "Ser + adjectif"], answer: 1 },
  { level: "B1", question: "Quelle expression sert à donner son opinion ?", options: ["Por favor", "En mi opinión", "Buenas noches", "De nada"], answer: 1 },
  { level: "B1", question: "« Estoy de acuerdo » signifie :", options: ["Je suis fatigué", "Je suis d'accord", "Je suis en retard", "Je suis désolé"], answer: 1 },
  { level: "B1", question: "Quel temps utilise-t-on pour une action habituelle dans le passé ?", options: ["Présent", "Passé composé", "Imparfait", "Futur"], answer: 2 },
  { level: "B2", question: "Quel registre utilise-t-on dans une lettre formelle ?", options: ["Tuteo (tú)", "Voseo (vos)", "Usted", "Argot familier"], answer: 2 },
  { level: "B2", question: "Complétez : « Si tuviera tiempo, ___ más. »", options: ["viajo", "viajaría", "viajé", "viajaba"], answer: 1 },
  { level: "B2", question: "« No obstante » signifie :", options: ["De plus", "Néanmoins", "Par conséquent", "C'est pourquoi"], answer: 1 }
];

window.PLACEMENT_TEST = PLACEMENT_TEST;
