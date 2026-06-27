/**
 * Application "Español en casa"
 * Logique de navigation, rendu dynamique et synthèse vocale.
 */

(function () {
  "use strict";

  const state = {
    currentLevel: LEVELS[0].id,
    currentLesson: null,
  };

  const root = document.getElementById("main-content");
  const levelNav = document.getElementById("level-nav");

  /* =====================  SYNTHÈSE VOCALE  ===================== */

  /**
   * Prononce un mot ou une phrase en espagnol via l'API Web Speech.
   * Tente de sélectionner une voix es-ES ; à défaut, une voix es-* générique.
   */
  function speak(text, buttonEl) {
    if (!("speechSynthesis" in window)) {
      alert("La synthèse vocale n'est pas disponible sur ce navigateur.");
      return;
    }
    window.speechSynthesis.cancel(); // évite l'empilement de plusieurs lectures

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const esVoice =
      voices.find((v) => v.lang === "es-ES") ||
      voices.find((v) => v.lang && v.lang.startsWith("es"));
    if (esVoice) utterance.voice = esVoice;
    utterance.lang = "es-ES";
    utterance.rate = 0.92;

    if (buttonEl) {
      buttonEl.classList.add("speaking");
      utterance.onend = () => buttonEl.classList.remove("speaking");
      utterance.onerror = () => buttonEl.classList.remove("speaking");
    }

    window.speechSynthesis.speak(utterance);
  }

  // Certains navigateurs chargent les voix de manière asynchrone.
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  /* =====================  NAVIGATION NIVEAUX  ===================== */

  function renderLevelNav() {
    levelNav.innerHTML = "";
    LEVELS.forEach((level) => {
      const btn = document.createElement("button");
      btn.className = "level-nav-item" + (level.id === state.currentLevel ? " active" : "");
      btn.innerHTML = `<span class="level-dot" style="background:${level.color}"></span>${level.title}`;
      btn.addEventListener("click", () => {
        state.currentLevel = level.id;
        state.currentLesson = null;
        renderLevelNav();
        renderMain();
      });
      levelNav.appendChild(btn);
    });
  }

  /* =====================  VUE : LISTE DES LEÇONS  ===================== */

  function renderLessonList(level) {
    const wrap = document.createElement("div");

    const header = document.createElement("div");
    header.className = "level-header";
    header.innerHTML = `
      <span class="eyebrow">Niveau CECRL</span>
      <h2>${level.title}</h2>
      <p>${level.description}</p>
    `;
    wrap.appendChild(header);

    if (level.lessons.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `<p>Aucune leçon pour ce niveau pour le moment.<br>Le contenu sera ajouté progressivement.</p>`;
      wrap.appendChild(empty);
      root.appendChild(wrap);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "lesson-grid";

    level.lessons.forEach((lesson) => {
      const card = document.createElement("button");
      card.className = "lesson-card";
      card.innerHTML = `
        <span class="icon">${lesson.icon}</span>
        <h3>${lesson.title}</h3>
        <span class="count">${lesson.words.length} mots</span>
      `;
      card.addEventListener("click", () => {
        state.currentLesson = lesson.id;
        renderMain();
      });
      grid.appendChild(card);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);
  }

  /* =====================  VUE : CARREAUX DE VOCABULAIRE  ===================== */

  function renderLessonView(level, lesson) {
    const wrap = document.createElement("div");

    const header = document.createElement("div");
    header.className = "lesson-view-header";
    header.innerHTML = `
      <div>
        <button class="back-link" id="back-btn">← Retour aux leçons</button>
        <h2 style="margin-top:8px;color:${level.color}">${lesson.icon} ${lesson.title}</h2>
      </div>
    `;
    wrap.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "tile-grid";

    lesson.words.forEach((word) => {
      const tile = document.createElement("div");
      tile.className = "word-tile";
      tile.innerHTML = `
        <div class="word-tile-inner">
          <div class="tile-face tile-front">
            <span class="word-cat">${word.cat}</span>
            <span class="word-es">${word.es}</span>
            <span class="tile-hint">cliquer pour traduire</span>
          </div>
          <div class="tile-face tile-back">
            <span class="word-fr">${word.fr}</span>
            <span class="word-example">« ${word.example} »</span>
            <button class="speak-btn" type="button" aria-label="Écouter la prononciation">🔊</button>
          </div>
        </div>
      `;

      tile.addEventListener("click", (e) => {
        // Le bouton audio ne doit pas retourner le carreau, juste déclencher la lecture.
        if (e.target.closest(".speak-btn")) {
          e.stopPropagation();
          speak(word.es, e.target.closest(".speak-btn"));
          return;
        }
        tile.classList.toggle("flipped");
      });

      grid.appendChild(tile);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);

    document.getElementById("back-btn").addEventListener("click", () => {
      state.currentLesson = null;
      renderMain();
    });
  }

  /* =====================  RENDU PRINCIPAL  ===================== */

  function renderMain() {
    root.innerHTML = "";
    const level = LEVELS.find((l) => l.id === state.currentLevel);

    if (state.currentLesson) {
      const lesson = level.lessons.find((ls) => ls.id === state.currentLesson);
      renderLessonView(level, lesson);
    } else {
      renderLessonList(level);
    }
  }

  /* =====================  INITIALISATION  ===================== */

  renderLevelNav();
  renderMain();

  // Le bouton de test de positionnement est géré dans test.js,
  // mais on expose speak() pour qu'il puisse l'utiliser si besoin.
  window.appSpeak = speak;

  // Lorsque le test de positionnement recommande un niveau, on y bascule.
  window.addEventListener("placement-result", (e) => {
    const recommendedId = e.detail.level;
    if (LEVELS.some((l) => l.id === recommendedId)) {
      state.currentLevel = recommendedId;
      state.currentLesson = null;
      renderLevelNav();
      renderMain();
    }
  });
})();
