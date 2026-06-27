/**
 * Test de positionnement.
 * Pose une série de questions de difficulté croissante (A1 → B2) et
 * recommande un niveau de départ en fonction du score obtenu.
 */

(function () {
  "use strict";

  const overlay = document.getElementById("test-overlay");
  const openBtn = document.getElementById("open-test-btn");
  const closeBtn = document.getElementById("test-close-btn");
  const testBody = document.getElementById("test-body");

  let currentIndex = 0;
  let score = 0;
  let answered = false;

  function openTest() {
    currentIndex = 0;
    score = 0;
    answered = false;
    overlay.classList.add("visible");
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

    testBody.innerHTML = `
      <span class="test-progress">Question ${currentIndex + 1} / ${total} — Niveau visé : ${q.level}</span>
      <div class="test-progress-bar"><div class="test-progress-fill" style="width:${progressPct}%"></div></div>
      <p class="test-question">${q.question}</p>
      <div class="test-options" id="test-options"></div>
      <button class="test-next" id="test-next-btn">Suivant</button>
    `;

    const optionsWrap = document.getElementById("test-options");
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "test-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const isCorrect = idx === q.answer;
        if (isCorrect) score++;

        document.querySelectorAll(".test-option").forEach((el, i) => {
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
    if (ratio >= 0.85) return "B1";
    if (ratio >= 0.6) return "A2";
    return "A1";
  }

  function renderResult() {
    const recommended = recommendLevel();
    const total = PLACEMENT_TEST.length;

    testBody.innerHTML = `
      <div class="test-result">
        <span class="badge">${score}/${total}</span>
        <h3>Niveau recommandé : ${recommended}</h3>
        <p>Sur la base de vos réponses, nous vous conseillons de commencer par le niveau <strong>${recommended}</strong>. Vous pouvez bien sûr explorer librement tous les niveaux.</p>
        <button class="test-next enabled" id="test-goto-level">Commencer au niveau ${recommended}</button>
      </div>
    `;

    document.getElementById("test-goto-level").addEventListener("click", () => {
      closeTest();
      // Déclenche un évènement personnalisé que app.js pourrait écouter
      // pour basculer directement sur le niveau recommandé.
      window.dispatchEvent(new CustomEvent("placement-result", { detail: { level: recommended } }));
    });
  }

  openBtn.addEventListener("click", openTest);
  closeBtn.addEventListener("click", closeTest);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeTest();
  });
})();
