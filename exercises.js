/**
 * Module d'exercices interactifs pour une leçon de vocabulaire donnée.
 * Quatre types d'exercices générés automatiquement à partir de la liste
 * de mots de la leçon :
 *   1. QCM (choisir la bonne traduction)
 *   2. Association (relier ES ↔ FR)
 *   3. Dictée audio (écouter puis écrire le mot espagnol)
 *   4. Texte à trous (compléter une phrase d'exemple)
 */

const Exercises = (function () {

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickDistractors(words, correctWord, count) {
    const pool = words.filter((w) => w.es !== correctWord.es);
    return shuffle(pool).slice(0, count);
  }

  /** Génère une série de questions QCM (traduction ES → FR). */
  function buildQCM(words, n) {
    const chosen = shuffle(words).slice(0, Math.min(n, words.length));
    return chosen.map((word) => {
      const distractors = pickDistractors(words, word, 3);
      const options = shuffle([word, ...distractors].map((w) => w.fr));
      return {
        type: "qcm",
        prompt: word.es,
        options,
        answer: options.indexOf(word.fr),
        word
      };
    });
  }

  /** Génère des paires à associer (ES ↔ FR), affichées en deux colonnes mélangées. */
  function buildMatching(words, n) {
    const chosen = shuffle(words).slice(0, Math.min(n, words.length));
    return {
      type: "matching",
      pairs: chosen.map((w) => ({ es: w.es, fr: w.fr })),
      leftOrder: shuffle(chosen.map((w) => w.es)),
      rightOrder: shuffle(chosen.map((w) => w.fr))
    };
  }

  /** Génère des exercices de dictée audio : on entend le mot, on doit le taper. */
  function buildDictation(words, n) {
    const chosen = shuffle(words).slice(0, Math.min(n, words.length));
    return chosen.map((word) => ({
      type: "dictation",
      audioText: word.es,
      answer: word.es.toLowerCase().trim(),
      hint: word.fr,
      word
    }));
  }

  /** Génère des textes à trous à partir des phrases d'exemple. */
  function buildFillBlank(words, n) {
    const eligible = words.filter((w) => w.example && w.example.toLowerCase().includes(w.es.toLowerCase().split(" ")[0]));
    const chosen = shuffle(eligible.length ? eligible : words).slice(0, Math.min(n, words.length));
    return chosen.map((word) => {
      const firstTerm = word.es.split(" ")[0];
      const regex = new RegExp(firstTerm, "i");
      const blanked = word.example.replace(regex, "_____");
      return {
        type: "fillblank",
        sentence: blanked,
        answer: firstTerm.toLowerCase(),
        fullSentence: word.example,
        word
      };
    });
  }

  /**
   * Construit un set d'exercices mixte pour une leçon.
   * @param {Array} words - mots de la leçon
   * @param {object} [opts] - { qcmCount, matchingCount, dictationCount, fillCount }
   */
  function buildExerciseSet(words, opts) {
    const o = Object.assign({ qcmCount: 5, matchingCount: 6, dictationCount: 4, fillCount: 4 }, opts || {});
    const set = [];
    buildQCM(words, o.qcmCount).forEach((q) => set.push(q));
    if (words.length >= 4) set.push(buildMatching(words, o.matchingCount));
    buildDictation(words, o.dictationCount).forEach((q) => set.push(q));
    buildFillBlank(words, o.fillCount).forEach((q) => set.push(q));
    return shuffle(set);
  }

  return { buildQCM, buildMatching, buildDictation, buildFillBlank, buildExerciseSet };
})();

window.Exercises = Exercises;
