/**
 * Application "Español en casa" v2
 * Orchestre la navigation entre les sections (Vocabulaire / Grammaire / Tableau de bord),
 * le rendu dynamique du contenu, et l'intégration des exercices et de la progression.
 *
 * Note de robustesse : chaque fonction de rendu vérifie l'existence des données
 * avant de les utiliser, et toute erreur est capturée et affichée à l'écran
 * plutôt que de bloquer silencieusement tout le script.
 */

(function () {
  "use strict";

  const state = {
    section: "vocab",      // "vocab" | "grammar" | "dashboard"
    currentLevel: "A1",
    currentLesson: null,   // id de leçon en cours de consultation
  };

  const root = document.getElementById("main-content");
  const navList = document.getElementById("nav-list");

  /* =====================  GARDE-FOUS  ===================== */

  function dataReady() {
    return (
      typeof window.VOCAB_LEVELS !== "undefined" &&
      Array.isArray(window.VOCAB_LEVELS) &&
      window.VOCAB_LEVELS.length > 0
    );
  }

  function renderFatalError(err) {
    root.innerHTML = `
      <div class="empty-state" style="border-color:#C75D3A;">
        <p><strong>Une erreur est survenue lors de l'affichage.</strong></p>
        <p style="font-family:monospace;font-size:0.8rem;margin-top:10px;">${String(err && err.message ? err.message : err)}</p>
        <p style="margin-top:14px;">Vérifiez que tous les fichiers (data/*.js, js/*.js) sont bien chargés dans l'ordre attendu.</p>
      </div>
    `;
  }

  /* =====================  NAVIGATION LATÉRALE  ===================== */

  function renderNav() {
    navList.innerHTML = "";

    // Section "Tableau de bord"
    const dashBtn = document.createElement("button");
    dashBtn.className = "nav-item" + (state.section === "dashboard" ? " active" : "");
    dashBtn.innerHTML = `📊 Tableau de bord`;
    dashBtn.addEventListener("click", () => {
      state.section = "dashboard";
      state.currentLesson = null;
      renderNav();
      renderMain();
    });
    navList.appendChild(dashBtn);

    const sep1 = document.createElement("div");
    sep1.className = "sidebar-section-label";
    sep1.style.marginTop = "10px";
    sep1.textContent = "Niveaux";
    navList.appendChild(sep1);

    window.VOCAB_LEVELS.forEach((level) => {
      const btn = document.createElement("button");
      const isActive = (state.section === "vocab" || state.section === "grammar") && level.id === state.currentLevel;
      btn.className = "nav-item" + (isActive ? " active" : "");

      let progressLabel = "";
      if (window.Progress) {
        const stats = window.Progress.getGlobalStats(window.VOCAB_LEVELS);
        const levelStat = stats.perLevel.find((l) => l.id === level.id);
        if (levelStat) progressLabel = `<span class="progress-mini">${levelStat.percent}%</span>`;
      }

      btn.innerHTML = `<span class="level-dot" style="background:${level.color}"></span>${level.id}${progressLabel}`;
      btn.addEventListener("click", () => {
        state.currentLevel = level.id;
        state.currentLesson = null;
        if (state.section === "dashboard") state.section = "vocab";
        renderNav();
        renderMain();
      });
      navList.appendChild(btn);
    });
  }

  /* =====================  ONGLETS VOCABULAIRE / GRAMMAIRE  ===================== */

  function renderTabs(level) {
    const tabRow = document.createElement("div");
    tabRow.className = "tab-row";

    const tabs = [
      { id: "vocab", label: "📚 Vocabulaire" },
      { id: "grammar", label: "🧩 Grammaire & conjugaison" }
    ];

    tabs.forEach((t) => {
      const btn = document.createElement("button");
      btn.className = "tab-btn" + (state.section === t.id ? " active" : "");
      btn.textContent = t.label;
      btn.addEventListener("click", () => {
        state.section = t.id;
        state.currentLesson = null;
        renderMain();
      });
      tabRow.appendChild(btn);
    });

    return tabRow;
  }

  /* =====================  VUE : LISTE DES LEÇONS DE VOCABULAIRE  ===================== */

  function renderLessonList(level) {
    const wrap = document.createElement("div");

    const header = document.createElement("div");
    header.className = "page-header";
    header.innerHTML = `
      <span class="eyebrow">Niveau CECRL</span>
      <h2>${level.title}</h2>
      <p>${level.description}</p>
    `;
    wrap.appendChild(header);
    wrap.appendChild(renderTabs(level));

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

      const learnedCount = window.Progress ? window.Progress.countLearnedInLesson(lesson.id, lesson.words.map((w) => w.es)) : 0;
      const total = lesson.words.length;
      const pct = total > 0 ? Math.round((learnedCount / total) * 100) : 0;
      const isComplete = window.Progress && window.Progress.isLessonCompleted(lesson.id);

      card.innerHTML = `
        ${isComplete ? '<span class="complete-badge">✅</span>' : ""}
        <span class="icon">${lesson.icon}</span>
        <h3>${lesson.title}</h3>
        <span class="count">${total} mots · ${pct}% vu</span>
        <div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%;background:${level.color}"></div></div>
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
      <div class="lesson-actions">
        <button class="btn-primary" id="start-exercises-btn">🎯 S'exercer</button>
      </div>
    `;
    wrap.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "tile-grid";

    lesson.words.forEach((word) => {
      const learned = window.Progress && window.Progress.isWordLearned(lesson.id, word.es);
      const tile = document.createElement("div");
      tile.className = "word-tile";
      tile.innerHTML = `
        <div class="word-tile-inner">
          <div class="tile-face tile-front${learned ? " learned" : ""}">
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
        if (e.target.closest(".speak-btn")) {
          e.stopPropagation();
          window.Speech.speak(word.es, e.target.closest(".speak-btn"));
          return;
        }
        tile.classList.toggle("flipped");
        if (tile.classList.contains("flipped") && window.Progress) {
          window.Progress.markWordLearned(lesson.id, word.es);
          tile.querySelector(".tile-front").classList.add("learned");
        }
      });

      grid.appendChild(tile);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);

    document.getElementById("back-btn").addEventListener("click", () => {
      state.currentLesson = null;
      renderMain();
    });

    document.getElementById("start-exercises-btn").addEventListener("click", () => {
      if (window.ExerciseUI) {
        window.ExerciseUI.open(lesson, () => renderMain());
      }
    });
  }

  /* =====================  VUE : GRAMMAIRE  ===================== */

  function renderGrammarView(level) {
    const wrap = document.createElement("div");

    const header = document.createElement("div");
    header.className = "page-header";
    header.innerHTML = `
      <span class="eyebrow">Niveau CECRL</span>
      <h2>${level.title} — Grammaire</h2>
      <p>Règles, conjugaisons et exemples pour ce niveau.</p>
    `;
    wrap.appendChild(header);
    wrap.appendChild(renderTabs(level));

    const grammarLevel = (window.GRAMMAR_LEVELS || []).find((g) => g.id === level.id);

    if (!grammarLevel || !grammarLevel.sheets || grammarLevel.sheets.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `<p>Aucune fiche de grammaire pour ce niveau pour le moment.</p>`;
      wrap.appendChild(empty);
      root.appendChild(wrap);
      return;
    }

    const list = document.createElement("div");
    list.className = "grammar-list";

    grammarLevel.sheets.forEach((sheet) => {
      const card = document.createElement("div");
      card.className = "grammar-sheet";

      let tableHtml = "";
      if (sheet.table) {
        tableHtml = `<table class="conj-table"><thead><tr>${sheet.table.headers
          .map((h) => `<th>${h}</th>`)
          .join("")}</tr></thead><tbody>${sheet.table.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
          .join("")}</tbody></table>`;
      }

      const examplesHtml = (sheet.examples || [])
        .map(
          (ex) => `
        <div class="example-row">
          <span class="es">${ex.es}</span>
          <span class="fr">${ex.fr}</span>
          <button class="speak-btn" type="button" data-text="${ex.es.replace(/"/g, "&quot;")}" aria-label="Écouter">🔊</button>
        </div>`
        )
        .join("");

      card.innerHTML = `
        <h3>${sheet.icon || "📘"} ${sheet.title}</h3>
        <p class="explanation">${sheet.explanation || ""}</p>
        ${tableHtml}
        <div class="example-list">${examplesHtml}</div>
      `;
      list.appendChild(card);
    });

    wrap.appendChild(list);
    root.appendChild(wrap);

    // Délégation des clics sur les boutons d'écoute des exemples de grammaire
    list.querySelectorAll(".speak-btn[data-text]").forEach((btn) => {
      btn.addEventListener("click", () => window.Speech.speak(btn.getAttribute("data-text"), btn));
    });
  }

  /* =====================  VUE : TABLEAU DE BORD  ===================== */

  function renderDashboard() {
    const wrap = document.createElement("div");

    const header = document.createElement("div");
    header.className = "page-header";
    header.innerHTML = `
      <span class="eyebrow">Votre progression</span>
      <h2>Tableau de bord</h2>
      <p>Suivi de votre apprentissage, sauvegardé localement sur cet appareil.</p>
    `;
    wrap.appendChild(header);

    const stats = window.Progress.getGlobalStats(window.VOCAB_LEVELS);

    const statGrid = document.createElement("div");
    statGrid.className = "stat-grid";
    statGrid.innerHTML = `
      <div class="stat-card"><div class="value">${stats.globalPercent}%</div><div class="label">Progression globale</div></div>
      <div class="stat-card"><div class="value">${stats.learnedWords}/${stats.totalWords}</div><div class="label">Mots vus</div></div>
      <div class="stat-card"><div class="value">${stats.completedLessons}/${stats.totalLessons}</div><div class="label">Leçons complétées</div></div>
    `;
    wrap.appendChild(statGrid);

    const subHeader = document.createElement("h3");
    subHeader.style.marginBottom = "16px";
    subHeader.style.color = "var(--cobalt)";
    subHeader.style.fontSize = "1.1rem";
    subHeader.textContent = "Progression par niveau";
    wrap.appendChild(subHeader);

    const levelList = document.createElement("div");
    levelList.className = "level-progress-list";
    stats.perLevel.forEach((lvl) => {
      const row = document.createElement("div");
      row.className = "level-progress-row";
      row.innerHTML = `
        <span class="level-label">${lvl.id}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${lvl.percent}%;background:${lvl.color}"></div></div>
        <span class="pct">${lvl.percent}%</span>
      `;
      levelList.appendChild(row);
    });
    wrap.appendChild(levelList);

    root.appendChild(wrap);
  }

  /* =====================  RENDU PRINCIPAL  ===================== */

  function renderMain() {
    try {
      root.innerHTML = "";

      if (!dataReady()) {
        renderFatalError(new Error("Les données de vocabulaire (VOCAB_LEVELS) ne sont pas chargées."));
        return;
      }

      if (state.section === "dashboard") {
        renderDashboard();
        return;
      }

      const level = window.VOCAB_LEVELS.find((l) => l.id === state.currentLevel);
      if (!level) {
        renderFatalError(new Error(`Niveau introuvable : ${state.currentLevel}`));
        return;
      }

      if (state.section === "grammar") {
        renderGrammarView(level);
        return;
      }

      // section === "vocab"
      if (state.currentLesson) {
        const lesson = level.lessons.find((ls) => ls.id === state.currentLesson);
        if (!lesson) {
          renderFatalError(new Error(`Leçon introuvable : ${state.currentLesson}`));
          return;
        }
        renderLessonView(level, lesson);
      } else {
        renderLessonList(level);
      }
    } catch (err) {
      renderFatalError(err);
      console.error(err);
    }
  }

  /* =====================  INITIALISATION  ===================== */

  function init() {
    try {
      renderNav();
      renderMain();
    } catch (err) {
      renderFatalError(err);
      console.error(err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Lorsque le test de positionnement recommande un niveau, on y bascule.
  window.addEventListener("placement-result", (e) => {
    const recommendedId = e.detail.level;
    if (window.Progress) window.Progress.setPlacementLevel(recommendedId);
    if (window.VOCAB_LEVELS.some((l) => l.id === recommendedId)) {
      state.currentLevel = recommendedId;
      state.currentLesson = null;
      state.section = "vocab";
      renderNav();
      renderMain();
    }
  });

  // Permet à d'autres modules (ex. fin d'exercice) de déclencher un re-rendu.
  window.appRerender = renderMain;
})();
