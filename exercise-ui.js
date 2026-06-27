/**
 * Interface des exercices — consomme le module Exercises pour générer
 * les questions, et gère l'affichage successif + le scoring.
 */

const ExerciseUI = (function () {
  let overlay, body, closeBtn;
  let queue = [];
  let index = 0;
  let correctCount = 0;
  let currentLesson = null;
  let onFinishCallback = null;

  function ensureDom() {
    if (overlay) return;
    overlay = document.getElementById("exercise-overlay");
    body = document.getElementById("exercise-body");
    closeBtn = document.getElementById("exercise-close-btn");
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  }

  function open(lesson, onFinish) {
    ensureDom();
    currentLesson = lesson;
    onFinishCallback = onFinish || null;
    queue = window.Exercises.buildExerciseSet(lesson.words);
    index = 0;
    correctCount = 0;
    overlay.style.display = "flex";
    renderCurrent();
  }

  function close() {
    if (overlay) overlay.style.display = "none";
  }

  function renderProgressHeader(typeLabel) {
    const total = queue.length;
    const pct = Math.round((index / total) * 100);
    return `
      <span class="ex-progress">Exercice ${index + 1} / ${total}</span>
      <div class="ex-progress-bar"><div class="ex-progress-fill" style="width:${pct}%"></div></div>
      <span class="ex-type-label">${typeLabel}</span>
    `;
  }

  function renderCurrent() {
    const item = queue[index];
    if (!item) { renderResult(); return; }

    if (item.type === "qcm") renderQCM(item);
    else if (item.type === "matching") renderMatching(item);
    else if (item.type === "dictation") renderDictation(item);
    else if (item.type === "fillblank") renderFillBlank(item);
    else { index++; renderCurrent(); }
  }

  function goNext() {
    index++;
    renderCurrent();
  }

  /* ---------- QCM ---------- */
  function renderQCM(item) {
    body.innerHTML = `
      ${renderProgressHeader("Choix multiple")}
      <p class="ex-prompt">${item.prompt}</p>
      <p class="ex-hint">Choisissez la bonne traduction.</p>
      <div class="ex-options" id="ex-options"></div>
      <button class="ex-next" id="ex-next-btn">Suivant</button>
    `;
    const optsWrap = document.getElementById("ex-options");
    let answered = false;

    item.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "ex-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const isCorrect = i === item.answer;
        if (isCorrect) correctCount++;
        document.querySelectorAll(".ex-option").forEach((el, j) => {
          if (j === item.answer) el.classList.add("correct");
          else if (j === i) el.classList.add("incorrect");
        });
        document.getElementById("ex-next-btn").classList.add("enabled");
      });
      optsWrap.appendChild(btn);
    });

    document.getElementById("ex-next-btn").addEventListener("click", () => { if (answered) goNext(); });
  }

  /* ---------- Association (matching) ---------- */
  function renderMatching(item) {
    body.innerHTML = `
      ${renderProgressHeader("Association")}
      <p class="ex-prompt" style="font-size:1.1rem;">Reliez chaque mot espagnol à sa traduction.</p>
      <div class="matching-cols">
        <div class="matching-col" id="match-left"></div>
        <div class="matching-col" id="match-right"></div>
      </div>
      <button class="ex-next" id="ex-next-btn">Suivant</button>
    `;
    const leftWrap = document.getElementById("match-left");
    const rightWrap = document.getElementById("match-right");
    let selectedLeft = null;
    let matchedCount = 0;
    const total = item.pairs.length;

    item.leftOrder.forEach((es) => {
      const el = document.createElement("button");
      el.className = "match-item";
      el.textContent = es;
      el.dataset.es = es;
      el.addEventListener("click", () => {
        if (el.classList.contains("matched")) return;
        document.querySelectorAll("#match-left .match-item").forEach((e) => e.classList.remove("selected"));
        el.classList.add("selected");
        selectedLeft = es;
      });
      leftWrap.appendChild(el);
    });

    item.rightOrder.forEach((fr) => {
      const el = document.createElement("button");
      el.className = "match-item";
      el.textContent = fr;
      el.dataset.fr = fr;
      el.addEventListener("click", () => {
        if (el.classList.contains("matched") || !selectedLeft) return;
        const pair = item.pairs.find((p) => p.es === selectedLeft);
        const leftEl = document.querySelector(`#match-left .match-item[data-es="${CSS.escape(selectedLeft)}"]`);
        if (pair && pair.fr === fr) {
          el.classList.add("matched");
          leftEl.classList.add("matched");
          matchedCount++;
          if (matchedCount === total) {
            correctCount++;
            document.getElementById("ex-next-btn").classList.add("enabled");
          }
        } else {
          el.classList.add("wrong-flash");
          setTimeout(() => el.classList.remove("wrong-flash"), 400);
        }
        selectedLeft = null;
        document.querySelectorAll("#match-left .match-item").forEach((e) => e.classList.remove("selected"));
      });
      rightWrap.appendChild(el);
    });

    document.getElementById("ex-next-btn").addEventListener("click", () => {
      if (matchedCount === total) goNext();
    });
  }

  /* ---------- Dictée audio ---------- */
  function renderDictation(item) {
    body.innerHTML = `
      ${renderProgressHeader("Dictée audio")}
      <p class="ex-hint" style="text-align:center;">Écoutez puis écrivez le mot en espagnol.</p>
      <button class="ex-audio-btn" id="ex-play-btn" type="button" aria-label="Écouter">🔊</button>
      <input type="text" class="ex-input" id="ex-dictation-input" placeholder="Tapez ce que vous entendez..." autocomplete="off" />
      <div id="ex-feedback-wrap"></div>
      <button class="ex-next" id="ex-next-btn">Suivant</button>
    `;
    const playBtn = document.getElementById("ex-play-btn");
    const input = document.getElementById("ex-dictation-input");
    const feedbackWrap = document.getElementById("ex-feedback-wrap");
    let checked = false;

    const playAudio = () => window.Speech.speak(item.audioText, playBtn);
    playBtn.addEventListener("click", playAudio);
    setTimeout(playAudio, 300); // lecture automatique à l'ouverture

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !checked) checkAnswer();
    });

    function checkAnswer() {
      checked = true;
      const userVal = input.value.toLowerCase().trim();
      const isCorrect = userVal === item.answer;
      if (isCorrect) correctCount++;
      input.classList.add(isCorrect ? "correct" : "incorrect");
      input.disabled = true;
      feedbackWrap.innerHTML = isCorrect
        ? `<div class="ex-feedback correct">Correct ! « ${item.word.es} » signifie « ${item.hint} ».</div>`
        : `<div class="ex-feedback incorrect">La bonne réponse était « ${item.word.es} » (${item.hint}).</div>`;
      document.getElementById("ex-next-btn").classList.add("enabled");
    }

    // Bouton "vérifier" implicite : on ajoute un bouton dédié pour plus de clarté
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn-secondary";
    checkBtn.style.marginTop = "12px";
    checkBtn.style.width = "100%";
    checkBtn.textContent = "Vérifier";
    checkBtn.addEventListener("click", () => { if (!checked) checkAnswer(); });
    input.insertAdjacentElement("afterend", checkBtn);

    document.getElementById("ex-next-btn").addEventListener("click", () => { if (checked) goNext(); });
  }

  /* ---------- Texte à trous ---------- */
  function renderFillBlank(item) {
    body.innerHTML = `
      ${renderProgressHeader("Texte à trous")}
      <p class="ex-prompt" style="font-size:1.15rem;">${item.sentence}</p>
      <p class="ex-hint">Complétez la phrase en espagnol.</p>
      <input type="text" class="ex-input" id="ex-fill-input" placeholder="Votre réponse..." autocomplete="off" />
      <div id="ex-feedback-wrap"></div>
      <button class="ex-next" id="ex-next-btn">Suivant</button>
    `;
    const input = document.getElementById("ex-fill-input");
    const feedbackWrap = document.getElementById("ex-feedback-wrap");
    let checked = false;

    function checkAnswer() {
      checked = true;
      const userVal = input.value.toLowerCase().trim();
      const isCorrect = userVal === item.answer;
      if (isCorrect) correctCount++;
      input.classList.add(isCorrect ? "correct" : "incorrect");
      input.disabled = true;
      feedbackWrap.innerHTML = isCorrect
        ? `<div class="ex-feedback correct">Correct ! Phrase complète : « ${item.fullSentence} »</div>`
        : `<div class="ex-feedback incorrect">Réponse attendue : « ${item.answer} ». Phrase complète : « ${item.fullSentence} »</div>`;
      document.getElementById("ex-next-btn").classList.add("enabled");
    }

    input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !checked) checkAnswer(); });

    const checkBtn = document.createElement("button");
    checkBtn.className = "btn-secondary";
    checkBtn.style.marginTop = "12px";
    checkBtn.style.width = "100%";
    checkBtn.textContent = "Vérifier";
    checkBtn.addEventListener("click", () => { if (!checked) checkAnswer(); });
    input.insertAdjacentElement("afterend", checkBtn);

    document.getElementById("ex-next-btn").addEventListener("click", () => { if (checked) goNext(); });
  }

  /* ---------- Résultat final ---------- */
  function renderResult() {
    const total = queue.length;
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    if (window.Progress && currentLesson) {
      window.Progress.recordExerciseScore(currentLesson.id, correctCount, total);
      if (pct >= 70) window.Progress.markLessonCompleted(currentLesson.id);
    }

    body.innerHTML = `
      <div class="ex-result">
        <span class="badge">${correctCount}/${total}</span>
        <h3>${pct >= 70 ? "Bravo, leçon validée ! 🎉" : "Continuez à pratiquer 💪"}</h3>
        <p>Vous avez obtenu ${pct}% de bonnes réponses sur cette série d'exercices.</p>
        <button class="ex-next enabled" id="ex-finish-btn">Terminer</button>
      </div>
    `;

    document.getElementById("ex-finish-btn").addEventListener("click", () => {
      close();
      if (onFinishCallback) onFinishCallback();
    });
  }

  return { open, close };
})();

window.ExerciseUI = ExerciseUI;
