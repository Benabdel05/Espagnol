/**
 * Module de synthèse vocale (Web Speech API).
 * Isolé dans son propre fichier pour éviter qu'une erreur ailleurs
 * n'empêche la prononciation de fonctionner, et inversement.
 */

const Speech = (function () {
  let cachedVoices = [];

  function refreshVoices() {
    if ("speechSynthesis" in window) {
      cachedVoices = window.speechSynthesis.getVoices();
    }
  }

  if ("speechSynthesis" in window) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }

  function pickSpanishVoice() {
    if (!cachedVoices.length) refreshVoices();
    return (
      cachedVoices.find((v) => v.lang === "es-ES") ||
      cachedVoices.find((v) => v.lang && v.lang.startsWith("es")) ||
      null
    );
  }

  /**
   * Prononce un texte en espagnol.
   * @param {string} text
   * @param {HTMLElement} [buttonEl] - bouton à animer pendant la lecture
   */
  function speak(text, buttonEl) {
    if (!("speechSynthesis" in window)) {
      console.warn("SpeechSynthesis non disponible sur ce navigateur.");
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickSpanishVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = "es-ES";
    utterance.rate = 0.92;
    utterance.pitch = 1;

    if (buttonEl) {
      buttonEl.classList.add("speaking");
      const stop = () => buttonEl.classList.remove("speaking");
      utterance.onend = stop;
      utterance.onerror = stop;
    }

    window.speechSynthesis.speak(utterance);
  }

  return { speak };
})();

window.Speech = Speech;
