/**
 * Test de positionnement.
 * Pose une série de questions de difficulté croissante (A1 → B2) et
 * recommande un niveau de départ en fonction du score obtenu.
 */

(function () {
  "use strict";

  let overlay, body, openBtn, closeBtn;
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  function ensureDom() {
    if (overlay) return true;
    overlay = document.getElementById("test-overlay");
    body = document.getElementById("test-body");
    openBtn = document.getElementById("open-test-btn");
    closeBtn = document.getElementById("test-close-btn");
    if (!overlay || !body || !openBtn || !closeBtn) return false;

    openBtn.addEventListener("click", openTest);
    closeBtn.addEventListener("click", closeTest);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeTest(); });
    return true;
  }

  function openTest() {
    currentIndex = 0;
    score = 0;
    answered = false;
    overlay.style.display = "flex";
    renderQuestion();
  }

  function closeTest() {
    overlay.style.display = "none";
  }

  function renderQuestion() {
    answered = false;
    const total = PLACEMENT_TEST.length;
    const q = PLACEMENT_TEST[currentIndex];
    const progressPct = Math.round((currentIndex / total) * 100);

    body.innerHTML = `
      <span class="ex-progress">Question ${currentIndex + 1} / ${total} — Niveau visé : ${q.level}</span>
      <div class="ex-progress-bar"><div class="ex-progress-fill" style="width:${progressPct}%"></div></div>
      <p class="ex-prompt">${q.question}</p>
      <div class="ex-options" id="test-options"></div>
      <button class="ex-next" id="test-next-btn">Suivant</button>
    `;

    const optionsWrap = document.getElementById("test-options");
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "ex-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const isCorrect = idx === q.answer;
        if (isCorrect) score++;

        document.querySelectorAll("#test-options .ex-option").forEach((el, i) => {
          if (i === q.answer) el.classList.add("correct");
          else if (i === idx) el.classList.add("incorrect");
        });

        document.getElementById("test-next-btn").classList.add("enabled");
      });
      optionsWrap.appendChild(btn);
    });

    document.getElementById("test-next-btn").addEventListener("click", () => {
      if (!answered) return;
      currentIndex++;
      if (currentIndex < PLACEMENT_TEST.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    });
  }

  function recommendLevel() {
    const ratio = score / PLACEMENT_TEST.length;
    if (ratio >= 0.85) return "B2";
    if (ratio >= 0.65) return "B1";
    if (ratio >= 0.4) return "A2";
    return "A1";
  }

  function renderResult() {
    const recommended = recommendLevel();
    const total = PLACEMENT_TEST.length;

    body.innerHTML = `
      <div class="ex-result">
        <span class="badge">${score}/${total}</span>
        <h3>Niveau recommandé : ${recommended}</h3>
        <p>Sur la base de vos réponses, nous vous conseillons de commencer par le niveau <strong>${recommended}</strong>. Vous pouvez bien sûr explorer librement tous les niveaux.</p>
        <button class="ex-next enabled" id="test-goto-level">Commencer au niveau ${recommended}</button>
      </div>
    `;

    document.getElementById("test-goto-level").addEventListener("click", () => {
      closeTest();
      window.dispatchEvent(new CustomEvent("placement-result", { detail: { level: recommended } }));
    });
  }

  function init() {
    if (!ensureDom()) {
      console.error("Éléments DOM du test de positionnement introuvables.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
