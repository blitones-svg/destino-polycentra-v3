const STRATEGIES = {
  libertar: {
    id: "libertar",
    name: "Libertar Polycentra",
    description: "Expande a resistência civil e militar para derrubar o aparato dominante.",
    difficulties: { Militar: 4, Social: 2, "Política": 6, "Comunicação": 4 },
    bonusField: { Militar: "libMil", Social: "libSoc", "Política": "libPol", "Comunicação": "libCom" },
  },
  controlar: {
    id: "controlar",
    name: "Controlar Polycentra",
    description: "Concentra poder, neutraliza ruídos e reorganiza a cidade por controle sistêmico.",
    difficulties: { Militar: 6, Social: 4, "Política": 4, "Comunicação": 2 },
    bonusField: { Militar: "conMil", Social: "conSoc", "Política": "conPol", "Comunicação": "conCom" },
  },
};

const FRONTS = [
  { name: "Militar", icon: "⚔ Militar" },
  { name: "Social", icon: "👥 Social" },
  { name: "Política", icon: "🏛 Política" },
  { name: "Comunicação", icon: "📡 Comunicação" },
];

const LEADERS = ["Noah", "Chloe", "Detroit", "Jack", "Jolene"];
const SUPPORT_OPTIONS = ["Noah", "Chloe", "Detroit", "Jack", "Jolene", "Delilah", "Auron"];
const STORAGE_KEY = "destino_polycentra_v3_save";

const MISSIONS = [
  { front: "Militar", mission: "Pacto de Ferro", type: "Major", description: "Vex controla rotas, armas e logística pesada — e sabe disso. Negociar com ele pode garantir poder militar imediato, mas ao custo de influência dentro da cidade. O acordo pode definir quem realmente manda após a revolução.", skills: "Negotiation; Diplomacy; Fast-Talk; Streetwise", victory: "+3 Militar", failure: "-1 Social", modifier: "Aliança com Lysander -2", libMil: 3, libSoc: 0, libPol: 0, libCom: 0, conMil: 3, conSoc: 0, conPol: 0, conCom: 0, failMil: 0, failSoc: -1, failPol: 0, failCom: 0 },
  { front: "Militar", mission: "Cegar os Céus", type: "Major", description: "A rede de drones mantém Polycentra sob vigilância constante. Derrubá-la significa libertar os céus — e abrir espaço para o caos. Mas quando os olhos da cidade se fecham, outras forças também podem se mover nas sombras.", skills: "Electronics Operation; Computer Hacking; Security; Stealth", victory: "+1 Militar / +1 Comunicação", failure: "-1 Militar", modifier: "Tomar Rede +1", libMil: 1, libSoc: 0, libPol: 0, libCom: 1, conMil: 1, conSoc: 0, conPol: 0, conCom: 1, failMil: -1, failSoc: 0, failPol: 0, failCom: 0 },
  { front: "Militar", mission: "Golpe no Arsenal", type: "Minor", description: "Um depósito estratégico guarda armas suficientes para virar o jogo. Um ataque rápido pode equipar a revolução — ou transformar o local em uma explosão descontrolada. Precisão é tudo.", skills: "Tactics; Stealth; Explosives; Leadership", victory: "+1 Militar", failure: "-1 Militar", modifier: "Ajudar o Bairro +1", libMil: 1, libSoc: 0, libPol: 0, libCom: 0, conMil: 1, conSoc: 0, conPol: 0, conCom: 0, failMil: -1, failSoc: 0, failPol: 0, failCom: 0 },
  { front: "Militar", mission: "Barricadas da Revolução", type: "Minor", description: "As ruas são o campo de batalha. Organizar barricadas pode proteger bairros inteiros e dar tempo à população. Mas posições mal planejadas podem virar armadilhas.", skills: "Leadership; Tactics; Engineering; Streetwise", victory: "+1 Militar", failure: "-1 Social", modifier: "Unir Facções +1", libMil: 1, libSoc: 0, libPol: 0, libCom: 1, conMil: 1, conSoc: 0, conPol: 0, conCom: 1, failMil: 0, failSoc: -1, failPol: 0, failCom: 0 },
  { front: "Social", mission: "A Voz da Cidade", type: "Major", description: "Em meio ao caos, alguém precisa dar sentido à revolução. Um discurso pode unir milhares — ou dividir ainda mais uma cidade à beira do colapso. E nem todos querem que essa mensagem seja ouvida.", skills: "Public Speaking; Leadership; Performance", victory: "+2 Social / +1 Comunicação", failure: "-1 Social", modifier: "Pacto de Ferro -2", libMil: 0, libSoc: 2, libPol: 0, libCom: 1, conMil: 0, conSoc: 2, conPol: 0, conCom: 1, failMil: 0, failSoc: -1, failPol: 0, failCom: 0 },
  { front: "Social", mission: "Salvar o Bairro", type: "Minor", description: "Enquanto o poder muda, os civis pagam o preço. Resgatar vidas pode fortalecer a confiança da população. Ignorar o sofrimento pode custar mais do que qualquer batalha.", skills: "First Aid; Leadership; Psychology; Sociology", victory: "+1 Social", failure: "-1 Social", modifier: "Aliança com Lysander +1", libMil: 0, libSoc: 1, libPol: 0, libCom: 0, conMil: 0, conSoc: 1, conPol: 0, conCom: 0, failMil: 0, failSoc: -1, failPol: 0, failCom: 0 },
  { front: "Social", mission: "Neutralizar o Medo", type: "Major", description: "Algo está alimentando o pânico coletivo — e não é apenas político. Conter esse medo pode estabilizar a cidade… ou revelar forças muito mais profundas atuando nos bastidores.", skills: "Psychology; Diplomacy; Occultism", victory: "+1 Social / +1 Comunicação", failure: "-1 Comunicação", modifier: "Voz da Cidade +1", libMil: 0, libSoc: 1, libPol: 0, libCom: 1, conMil: 0, conSoc: 1, conPol: 0, conCom: 1, failMil: 0, failSoc: 0, failPol: 0, failCom: -1 },
  { front: "Social", mission: "Unir as Facções", type: "Minor", description: "Gangues, grupos locais e facções disputam poder nas ruas. Convencê-los a cooperar pode transformar caos em força organizada. Falhar pode acender conflitos internos irreversíveis.", skills: "Diplomacy; Savoir-Faire; Politics; Fast-Talk", victory: "+1 Social", failure: "-1 Social", modifier: "Elite Técnica -1", libMil: 0, libSoc: 1, libPol: 0, libCom: 0, conMil: 0, conSoc: 1, conPol: 0, conCom: 0, failMil: 0, failSoc: -1, failPol: 0, failCom: 0 },
  { front: "Política", mission: "Aliança com Lysander", type: "Major", description: "Lysander Kade é mais que um líder — ele é um símbolo. Protegê-lo e ganhar seu apoio pode legitimar a revolução. Perdê-lo pode custar o coração do movimento.", skills: "Diplomacy; Administration; Persuasion", victory: "+2 Política / +1 Social", failure: "-1 Política", modifier: "Elite Técnica -1", libMil: 0, libSoc: 1, libPol: 2, libCom: 0, conMil: 0, conSoc: 1, conPol: 2, conCom: 0, failMil: 0, failSoc: 0, failPol: -1, failCom: 0 },
  { front: "Política", mission: "Resgatar Prisioneiros", type: "Major", description: "Os líderes da resistência estão presos — mas não esquecidos. Libertá-los pode reacender a revolução com força total. Mas a operação pode desencadear uma resposta brutal do regime.", skills: "Politics; Leadership; Strategy; Steath", victory: "+2 Política / +1 Militar", failure: "-1 Política", modifier: "Salvar o Bairro +1", libMil: 1, libSoc: 0, libPol: 2, libCom: 0, conMil: 1, conSoc: 0, conPol: 2, conCom: 0, failMil: 0, failSoc: 0, failPol: -1, failCom: 0 },
  { front: "Política", mission: "Controle das Fábricas", type: "Minor", description: "Quem controla a produção, controla o futuro. Assumir as fábricas garante recursos e poder imediato. Mas pode alienar aqueles que lutam por liberdade, não por um novo regime.", skills: "Strategy; Combat; Engineering; Eletronics Operation", victory: "+1 Política", failure: "-1 Política", modifier: "Golpe no Arsenal +1", libMil: 0, libSoc: 0, libPol: 1, libCom: 0, conMil: 0, conSoc: 0, conPol: 1, conCom: 0, failMil: 0, failSoc: 0, failPol: -1, failCom: 0 },
  { front: "Política", mission: "Elite Técnica", type: "Minor", description: "Engenheiros e especialistas mantêm a cidade funcionando. Convencê-los pode garantir estabilidade e vantagem estratégica. Sem eles, Polycentra pode simplesmente parar.", skills: "Diplomacy; Administration; Engineering; Persuasion", victory: "+1 Política", failure: "-1 Comunicação", modifier: "Controle das Fabricas +1", libMil: 0, libSoc: 0, libPol: 1, libCom: 0, conMil: 0, conSoc: 0, conPol: 1, conCom: 0, failMil: 0, failSoc: 0, failPol: 0, failCom: -1 },
  { front: "Comunicação", mission: "Tomar Rede", type: "Major", description: "A guerra também é travada na informação. Controlar a mídia significa controlar a narrativa da revolução. Uma mensagem pode mudar tudo — ou expor o Syndicate ao mundo.", skills: "Combat; Stealth; Electronics Operation; Persuasion; Hacking; Public Speaking", victory: "+2 Comunicação / +1 Social", failure: "-1 Comunicação", modifier: "Voz da Cidade +1", libMil: 0, libSoc: 1, libPol: 0, libCom: 2, conMil: 0, conSoc: 1, conPol: 0, conCom: 2, failMil: 0, failSoc: 0, failPol: 0, failCom: -1 },
  { front: "Comunicação", mission: "Hackear Narrativa", type: "Minor", description: "Informação é poder invisível. Manipular redes digitais pode influenciar milhares sem um único tiro. Mas uma narrativa falsa pode sair do controle.", skills: "Computer Hacking; Public Speaking", victory: "+1 Comunicação", failure: "-1 Comunicação", modifier: "Cegar os Céus +1", libMil: 0, libSoc: 0, libPol: 0, libCom: 1, conMil: 0, conSoc: 0, conPol: 0, conCom: 1, failMil: 0, failSoc: 0, failPol: 0, failCom: -1 },
  { front: "Comunicação", mission: "Vazar a Verdade", type: "Minor", description: "Os segredos das corporações podem incendiar a cidade. Revelar a verdade pode virar a população contra o regime. Mas nem toda verdade fortalece quem a revela.", skills: "Research; Fast-Talk; Current Affairs", victory: "+1 Comunicação", failure: "-1 Política", modifier: "Neutralizar o Medo +1", libMil: 0, libSoc: 0, libPol: 0, libCom: 1, conMil: 0, conSoc: 0, conPol: 0, conCom: 1, failMil: 0, failSoc: 0, failPol: -1, failCom: 0 },
  { front: "Comunicação", mission: "Símbolo da Revolução", type: "Minor", description: "Toda revolução precisa de um símbolo. Criar uma identidade pode inspirar esperança e união. Ou transformar o movimento em algo que foge ao controle dos próprios líderes.", skills: "Public Speaking; Psychology; Performance", victory: "+1 Comunicação", failure: "-1 Social", modifier: "Barricadas da Revolução +1", libMil: 0, libSoc: 0, libPol: 0, libCom: 1, conMil: 0, conSoc: 0, conPol: 0, conCom: 1, failMil: 0, failSoc: -1, failPol: 0, failCom: 0 },
];

const state = {
  currentScreen: "menu",
  selectedStrategy: null,
  selectedFront: null,
  selections: {},
  audioEnabled: true,
  musicEnabled: true,
  musicVolume: 0.42,
  loadedSave: false,
};

const elements = {
  screens: {
    menu: document.querySelector("#screen-menu"),
    strategy: document.querySelector("#screen-strategy"),
    control: document.querySelector("#screen-control"),
  },
  menuFeedback: document.querySelector("#menu-feedback"),
  strategyGrid: document.querySelector("#strategy-grid"),
  strategyConfirm: document.querySelector("#strategy-confirm"),
  strategyBack: document.querySelector("#strategy-back"),
  activeStrategyName: document.querySelector("#active-strategy-name"),
  activeStrategyDescription: document.querySelector("#active-strategy-description"),
  missionGrid: document.querySelector("#mission-grid"),
  progressPanel: document.querySelector("#progress-panel"),
  selectedMissionsCount: document.querySelector("#selected-missions-count"),
  resolvedMissionsCount: document.querySelector("#resolved-missions-count"),
  modifierList: document.querySelector("#modifier-list"),
  missionModal: document.querySelector("#mission-modal"),
  modalTitle: document.querySelector("#modal-title"),
  modalBody: document.querySelector("#modal-body"),
  modalClose: document.querySelector("#modal-close"),
  monitorTemplate: document.querySelector("#mission-monitor-template"),
  missionCardTemplate: document.querySelector("#mission-card-template"),
  audioToggle: document.querySelector("#audio-toggle"),
  musicToggle: document.querySelector("#music-toggle"),
  musicVolume: document.querySelector("#music-volume"),
  saveProgress: document.querySelector("#save-progress"),
};

let audioContext;
let musicMasterGain = null;
let musicStarted = false;
let drumSchedulerId = null;
let drumNextTime = 0;
let musicAudio = null;

function init() {
  seedSelections();
  bindBaseEvents();
  renderStrategies();
  renderMonitors();
  syncAudioUi();
  syncMusicUi();
  renderAll();
}

function seedSelections() {
  MISSIONS.forEach((mission) => {
    state.selections[mission.mission] = {
      selected: false,
      outcome: "none",
      leader: "",
      support: "",
    };
  });
}

function bindBaseEvents() {
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      playUiSound(action === "continue" ? "warning" : "confirm");
      if (action === "continue") {
        const loaded = loadProgress();
        if (loaded) {
          elements.menuFeedback.textContent = "Progresso carregado. Retornando ao Centro de Controle.";
          switchScreen("control");
          renderStrategies();
          renderAll();
          return;
        }
        elements.menuFeedback.textContent = "Nenhum progresso salvo encontrado. Escolha uma estratégia para iniciar uma nova operação.";
      } else {
        resetProgress();
        elements.menuFeedback.textContent = "";
      }

      state.selectedStrategy = null;
      renderStrategies();
      switchScreen("strategy");
    });
  });

  elements.strategyBack.addEventListener("click", () => switchScreen("menu"));
  elements.strategyBack.addEventListener("click", () => playUiSound("soft"));

  elements.strategyConfirm.addEventListener("click", () => {
    if (!state.selectedStrategy) {
      return;
    }
    playUiSound("confirm");
    switchScreen("control");
    renderAll();
  });

  elements.modalClose.addEventListener("click", closeModal);
  elements.audioToggle.addEventListener("click", toggleAudio);
  elements.musicToggle.addEventListener("click", toggleMusic);
  elements.musicVolume.addEventListener("input", handleMusicVolumeChange);
  elements.saveProgress.addEventListener("click", saveProgress);
  elements.missionModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeModal === "true") {
      closeModal();
    }
  });
}

function switchScreen(screenKey) {
  state.currentScreen = screenKey;
  document.body.dataset.screen = screenKey;
  Object.entries(elements.screens).forEach(([key, screen]) => {
    screen.classList.toggle("screen-active", key === screenKey);
  });
}

function renderStrategies() {
  elements.strategyGrid.innerHTML = "";
  Object.values(STRATEGIES).forEach((strategy) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "strategy-card";
    card.classList.toggle("is-selected", state.selectedStrategy === strategy.id);
    card.innerHTML = `
      <h3>${strategy.name}</h3>
      <p>${strategy.description}</p>
      <ul>
        ${Object.entries(strategy.difficulties).map(([front, value]) => `<li>${front}: ${value} pts</li>`).join("")}
      </ul>
    `;
    card.addEventListener("click", () => {
      playUiSound("select");
      state.selectedStrategy = strategy.id;
      renderStrategies();
      elements.strategyConfirm.disabled = false;
    });
    elements.strategyGrid.appendChild(card);
  });
  elements.strategyConfirm.disabled = !state.selectedStrategy;
}

function renderMonitors() {
  elements.missionGrid.innerHTML = "";
  FRONTS.forEach((front) => {
    const fragment = elements.monitorTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".monitor-card");
    card.dataset.front = front.name;
    fragment.querySelector(".monitor-icon").textContent = front.icon;
    fragment.querySelector(".monitor-name").textContent = front.name;
    fragment.querySelector(".mission-open-btn").addEventListener("click", () => openModal(front.name));
    elements.missionGrid.appendChild(fragment);
  });
}

function renderAll() {
  enforceAssignmentLimits();
  renderStrategySummary();
  renderMonitorEntries();
  renderProgress();
  renderSummaryStats();
  renderModifiers();
}

function renderStrategySummary() {
  const strategy = STRATEGIES[state.selectedStrategy];
  elements.activeStrategyName.textContent = strategy ? strategy.name : "-";
  elements.activeStrategyDescription.textContent = strategy ? strategy.description : "";
}

function renderSummaryStats() {
  const selected = Object.values(state.selections).filter((item) => item.selected).length;
  const resolved = Object.values(state.selections).filter((item) => item.selected && item.outcome !== "none").length;
  elements.selectedMissionsCount.textContent = String(selected);
  elements.resolvedMissionsCount.textContent = String(resolved);
}

function buildAssignmentField(label, options, selectedValue, onChange, role, mission) {
  const wrapper = document.createElement("label");
  wrapper.className = "assignment-field";

  const labelText = document.createElement("span");
  labelText.className = "assignment-label";
  labelText.textContent = label;

  const select = document.createElement("select");
  select.className = "result-select assignment-select";
  const reserved = getReservedNames(role, mission.type, mission.mission);
  select.innerHTML = [`<option value="">Selecionar</option>`]
    .concat(
      options.map((option) => {
        const disabled = reserved.has(option) && option !== selectedValue ? " disabled" : "";
        return `<option value="${option}"${disabled}>${option}</option>`;
      })
    )
    .join("");
  select.value = selectedValue;
  select.addEventListener("change", (event) => onChange(event.target.value));

  wrapper.append(labelText, select);
  return wrapper;
}

function getReservedNames(role, missionType, currentMissionName) {
  const reserved = new Set();
  MISSIONS.forEach((mission) => {
    if (mission.type !== missionType || mission.mission === currentMissionName) {
      return;
    }
    const selection = state.selections[mission.mission];
    if (!selection.selected) {
      return;
    }
    const assigned = role === "leader" ? selection.leader : selection.support;
    if (assigned) {
      reserved.add(assigned);
    }
  });
  return reserved;
}

function enforceAssignmentLimits() {
  const usage = {
    leader: { Major: new Set(), Minor: new Set() },
    support: { Major: new Set(), Minor: new Set() },
  };

  MISSIONS.forEach((mission) => {
    const selection = state.selections[mission.mission];
    if (!selection.selected) {
      selection.leader = "";
      selection.support = "";
      return;
    }

    if (selection.leader) {
      if (usage.leader[mission.type].has(selection.leader)) {
        selection.leader = "";
      } else {
        usage.leader[mission.type].add(selection.leader);
      }
    }

    if (selection.support) {
      if (usage.support[mission.type].has(selection.support)) {
        selection.support = "";
      } else {
        usage.support[mission.type].add(selection.support);
      }
    }
  });
}

function renderModifiers() {
  elements.modifierList.innerHTML = "";
  const selectedMissions = MISSIONS.filter((mission) => state.selections[mission.mission].selected);

  if (!selectedMissions.length) {
    const empty = document.createElement("p");
    empty.className = "hint-text";
    empty.textContent = "Nenhum modificador ativo. Selecione missões para montar a leitura tática detalhada.";
    elements.modifierList.appendChild(empty);
    return;
  }

  selectedMissions.forEach((mission) => {
    const selection = state.selections[mission.mission];
    const card = document.createElement("article");
    card.className = "modifier-card";
    card.innerHTML = `
      <div class="modifier-card-head">
        <strong>${mission.mission}</strong>
        <span>${mission.front}</span>
      </div>
      <p class="modifier-text">${mission.modifier}</p>
      <p class="modifier-meta">Líder: ${selection.leader || "Não definido"} | Apoio: ${selection.support || "Não definido"} | Status: ${selection.outcome === "none" ? "Pendente" : selection.outcome === "success" ? "Sucesso" : "Falha"}</p>
    `;
    elements.modifierList.appendChild(card);
  });
}

function renderMonitorEntries() {
  document.querySelectorAll(".monitor-card").forEach((card) => {
    const frontName = card.dataset.front;
    const missionList = card.querySelector(".mission-list");
    missionList.innerHTML = "";

    const selectedMissions = MISSIONS.filter(
      (mission) => mission.front === frontName && state.selections[mission.mission].selected
    );

    if (!selectedMissions.length) {
      const empty = document.createElement("p");
      empty.className = "hint-text";
      empty.textContent = "Nenhuma missão vinculada a este monitor.";
      missionList.appendChild(empty);
      return;
    }

    selectedMissions.forEach((mission) => {
      const selection = state.selections[mission.mission];
      const entry = document.createElement("article");
      entry.className = "mission-entry";
      entry.innerHTML = `
        <div class="mission-title-row">
          <h4>${mission.mission}</h4>
          <span class="mission-type-badge ${mission.type === "Major" ? "is-major" : "is-minor"}">${mission.type}</span>
        </div>
        <p class="mission-entry-copy">${mission.description}</p>
        <p class="hint-text">Skills: ${mission.skills}</p>
      `;

      const meta = document.createElement("div");
      meta.className = "mission-entry-meta";
      const info = document.createElement("p");
      info.className = "hint-text";
      info.textContent = `${mission.type} | ${mission.victory} | Falha: ${mission.failure}`;

      const select = document.createElement("select");
      select.className = "result-select";
      select.innerHTML = `
        <option value="none">Selecionar status</option>
        <option value="success">Sucesso</option>
        <option value="failure">Falha</option>
      `;
      select.value = selection.outcome;
      select.addEventListener("change", (event) => {
        state.selections[mission.mission].outcome = event.target.value;
        playUiSound(event.target.value === "failure" ? "warning" : "confirm");
        renderProgress();
        renderSummaryStats();
        renderModifiers();
      });

      meta.append(info, select);
      entry.appendChild(meta);

      const assignmentGrid = document.createElement("div");
      assignmentGrid.className = "assignment-grid";

      const leaderField = buildAssignmentField(
        "Líder da Missão",
        LEADERS,
        selection.leader,
        (value) => {
          state.selections[mission.mission].leader = value;
          playUiSound("select");
          renderMonitorEntries();
          renderModifiers();
        },
        "leader",
        mission
      );

      const supportField = buildAssignmentField(
        "Apoio",
        SUPPORT_OPTIONS,
        selection.support,
        (value) => {
          state.selections[mission.mission].support = value;
          playUiSound("select");
          renderMonitorEntries();
          renderModifiers();
        },
        "support",
        mission
      );

      assignmentGrid.append(leaderField, supportField);
      entry.appendChild(assignmentGrid);
      missionList.appendChild(entry);
    });
  });
}

function renderProgress() {
  elements.progressPanel.innerHTML = "";
  const totals = calculateTotals();
  const strategy = STRATEGIES[state.selectedStrategy];

  FRONTS.forEach((front) => {
    const required = strategy ? strategy.difficulties[front.name] : 0;
    const bonus = totals[front.name];
    const saldo = bonus - required;
    const ratio = required ? bonus / required : 0;
    const fillHeight = Math.min(Math.abs(ratio) * 100, 160);

    const card = document.createElement("article");
    card.className = "progress-card";
    card.innerHTML = `
      <div class="progress-card-head">
        <strong>${front.icon}</strong>
        <span>${bonus} pts</span>
      </div>
      <div class="progress-stack">
        <div class="progress-rail">
          <div class="progress-fill ${bonus < 0 ? "is-negative" : ""}" style="height:${fillHeight}%"></div>
        </div>
        <div class="progress-copy">
          <p>Necessário: ${required} pts</p>
          <p>Acumulado: ${bonus} pts</p>
          <p class="${saldo >= 0 ? "status-positive" : "status-negative"}">Saldo: ${saldo >= 0 ? "+" : ""}${saldo} pts</p>
          <p>${buildTacticalReading(saldo)}</p>
        </div>
      </div>
    `;
    elements.progressPanel.appendChild(card);
  });
}

function calculateTotals() {
  const totals = { Militar: 0, Social: 0, "Política": 0, "Comunicação": 0 };
  if (!state.selectedStrategy) {
    return totals;
  }

  const strategy = STRATEGIES[state.selectedStrategy];

  MISSIONS.forEach((mission) => {
    const selection = state.selections[mission.mission];
    if (!selection.selected || selection.outcome === "none") {
      return;
    }

    if (selection.outcome === "success") {
      totals.Militar += mission[strategy.bonusField.Militar];
      totals.Social += mission[strategy.bonusField.Social];
      totals["Política"] += mission[strategy.bonusField["Política"]];
      totals["Comunicação"] += mission[strategy.bonusField["Comunicação"]];
    } else {
      totals.Militar += mission.failMil;
      totals.Social += mission.failSoc;
      totals["Política"] += mission.failPol;
      totals["Comunicação"] += mission.failCom;
    }
  });

  return totals;
}

function buildTacticalReading(saldo) {
  if (saldo >= 4) {
    return "Frente em vantagem operacional.";
  }
  if (saldo >= 0) {
    return "Pressão sustentada acima do mínimo estratégico.";
  }
  if (saldo <= -4) {
    return `Déficit crítico de ${Math.abs(saldo)} pts.`;
  }
  return `Faltam ${Math.abs(saldo)} pts para equilibrar a frente.`;
}

function openModal(frontName) {
  state.selectedFront = frontName;
  playUiSound("open");
  elements.modalTitle.textContent = frontName;
  elements.modalBody.innerHTML = "";

  MISSIONS.filter((mission) => mission.front === frontName).forEach((mission) => {
    const fragment = elements.missionCardTemplate.content.cloneNode(true);
    fragment.querySelector(".mission-name").textContent = mission.mission;
    fragment.querySelector(".mission-meta").innerHTML = `<span class="mission-type-badge ${mission.type === "Major" ? "is-major" : "is-minor"}">${mission.type}</span> Vitória: ${mission.victory} | Falha: ${mission.failure}`;
    fragment.querySelector(".mission-description").textContent = `Descrição: ${mission.description}`;
    fragment.querySelector(".mission-skills").textContent = `Skills: ${mission.skills}`;
    fragment.querySelector(".mission-modifier").textContent = `Modificadores: ${mission.modifier}`;

    const checkbox = fragment.querySelector(".mission-select");
    checkbox.checked = state.selections[mission.mission].selected;
    checkbox.addEventListener("change", (event) => {
      playUiSound(event.target.checked ? "select" : "soft");
      state.selections[mission.mission].selected = event.target.checked;
      if (!event.target.checked) {
        state.selections[mission.mission].outcome = "none";
        state.selections[mission.mission].leader = "";
        state.selections[mission.mission].support = "";
      }
      renderMonitorEntries();
      renderProgress();
      renderSummaryStats();
      renderModifiers();
    });

    elements.modalBody.appendChild(fragment);
  });

  elements.missionModal.classList.add("is-open");
  elements.missionModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  playUiSound("soft");
  elements.missionModal.classList.remove("is-open");
  elements.missionModal.setAttribute("aria-hidden", "true");
}

function saveProgress() {
  const payload = {
    selectedStrategy: state.selectedStrategy,
    selections: state.selections,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  elements.menuFeedback.textContent = "Progresso salvo no navegador.";
  playUiSound("confirm");
}

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return false;
  }

  try {
    const parsed = JSON.parse(raw);
    resetProgress();
    state.selectedStrategy = parsed.selectedStrategy || null;
    Object.entries(parsed.selections || {}).forEach(([missionName, value]) => {
      if (!state.selections[missionName]) {
        return;
      }
      state.selections[missionName] = {
        selected: Boolean(value.selected),
        outcome: value.outcome || "none",
        leader: value.leader || "",
        support: value.support || "",
      };
    });
    state.loadedSave = true;
    return true;
  } catch (error) {
    console.error("Falha ao carregar save", error);
    return false;
  }
}

function resetProgress() {
  state.selectedStrategy = null;
  state.loadedSave = false;
  Object.keys(state.selections).forEach((missionName) => {
    state.selections[missionName] = {
      selected: false,
      outcome: "none",
      leader: "",
      support: "",
    };
  });
}

function toggleAudio() {
  state.audioEnabled = !state.audioEnabled;
  syncAudioUi();
  playUiSound(state.audioEnabled ? "confirm" : "soft", true);
}

function toggleMusic() {
  state.musicEnabled = !state.musicEnabled;
  ensureMusicStarted();
  syncMusicUi();
  playUiSound(state.musicEnabled ? "confirm" : "soft", true);
}

function handleMusicVolumeChange(event) {
  state.musicVolume = Number(event.target.value) / 100;
  ensureMusicStarted();
  updateMusicGain();
}

function syncAudioUi() {
  document.body.dataset.audioEnabled = String(state.audioEnabled);
  elements.audioToggle.textContent = state.audioEnabled ? "Som: Ligado" : "Som: Desligado";
}

function syncMusicUi() {
  document.body.dataset.musicEnabled = String(state.musicEnabled);
  elements.musicToggle.textContent = state.musicEnabled ? "Música: Ligada" : "Música: Desligada";
  elements.musicVolume.value = String(Math.round(state.musicVolume * 100));
  updateMusicGain();
}

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function ensureMusicStarted() {
  const context = getAudioContext();
  if (!context || musicStarted) {
    updateMusicGain();
    return;
  }

  musicMasterGain = context.createGain();
  musicMasterGain.gain.setValueAtTime(0.0001, context.currentTime);
  musicMasterGain.connect(context.destination);

  startBassLoop(context);
  startPadLoop(context);
  startLeadLoop(context);
  startDrumLoop(context);

  musicStarted = true;
  updateMusicGain();
}

function updateMusicGain() {
  if (!musicMasterGain || !audioContext) {
    return;
  }
  const target = state.musicEnabled ? Math.max(state.musicVolume * 0.22, 0.0001) : 0.0001;
  musicMasterGain.gain.cancelScheduledValues(audioContext.currentTime);
  musicMasterGain.gain.setTargetAtTime(target, audioContext.currentTime, 0.18);
}

function startBassLoop(context) {
  const notes = [48, 48, 55, 48, 43, 48, 55, 50];
  const beat = 0.38;
  let index = 0;

  const schedule = () => {
    const now = context.currentTime;
    let time = now + 0.08;
    notes.forEach((midi, step) => {
      scheduleBassNote(context, midi, time + step * beat, beat * 0.9);
    });
    index += notes.length;
    setTimeout(schedule, notes.length * beat * 1000);
  };

  schedule();
}

function scheduleBassNote(context, midi, startTime, duration) {
  const freq = midiToFrequency(midi);
  const osc = context.createOscillator();
  const sub = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  osc.type = "sawtooth";
  sub.type = "triangle";
  osc.frequency.setValueAtTime(freq, startTime);
  sub.frequency.setValueAtTime(freq / 2, startTime);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(220, startTime);
  filter.Q.setValueAtTime(4, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(filter);
  sub.connect(filter);
  filter.connect(gain);
  gain.connect(musicMasterGain);

  osc.start(startTime);
  sub.start(startTime);
  osc.stop(startTime + duration);
  sub.stop(startTime + duration);
}

function startPadLoop(context) {
  const chords = [
    [60, 64, 67],
    [57, 60, 64],
    [53, 57, 60],
    [55, 59, 62],
  ];
  const chordLength = 3.04;

  const schedule = () => {
    const start = context.currentTime + 0.12;
    chords.forEach((chord, index) => {
      schedulePadChord(context, chord, start + index * chordLength, chordLength * 0.96);
    });
    setTimeout(schedule, chords.length * chordLength * 1000);
  };

  schedule();
}

function schedulePadChord(context, chord, startTime, duration) {
  chord.forEach((midi, idx) => {
    const osc = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    osc.type = idx === 0 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(midiToFrequency(midi), startTime);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.018, startTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(musicMasterGain);
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
}

function startLeadLoop(context) {
  const phrase = [72, 74, 79, 77, 74, 72, 74, 67];
  const step = 0.76;

  const schedule = () => {
    const start = context.currentTime + 0.22;
    phrase.forEach((midi, index) => {
      scheduleLeadNote(context, midi, start + index * step, step * 0.55);
    });
    setTimeout(schedule, phrase.length * step * 1000);
  };

  schedule();
}

function scheduleLeadNote(context, midi, startTime, duration) {
  const osc = context.createOscillator();
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(midiToFrequency(midi), startTime);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1400, startTime);
  filter.Q.setValueAtTime(6, startTime);

  lfo.type = "sine";
  lfo.frequency.setValueAtTime(5.2, startTime);
  lfoGain.gain.setValueAtTime(6, startTime);
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(0.014, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(musicMasterGain);

  lfo.start(startTime);
  osc.start(startTime);
  lfo.stop(startTime + duration);
  osc.stop(startTime + duration);
}

function startDrumLoop(context) {
  const beat = 0.19;
  drumNextTime = context.currentTime + 0.1;
  let step = 0;

  const tick = () => {
    while (drumNextTime < context.currentTime + 0.25) {
      const barStep = step % 16;
      if (barStep === 0 || barStep === 8) {
        scheduleKick(context, drumNextTime);
      }
      if (barStep === 4 || barStep === 12) {
        scheduleSnare(context, drumNextTime);
      }
      if (barStep % 2 === 0) {
        scheduleHat(context, drumNextTime, barStep % 8 === 6 ? 0.012 : 0.009);
      }
      if (barStep === 15) {
        scheduleHat(context, drumNextTime, 0.014);
      }
      drumNextTime += beat;
      step += 1;
    }
  };

  tick();
  drumSchedulerId = setInterval(tick, 50);
}

function scheduleKick(context, time) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, time);
  osc.frequency.exponentialRampToValueAtTime(42, time + 0.16);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(0.16, time + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
  osc.connect(gain);
  gain.connect(musicMasterGain);
  osc.start(time);
  osc.stop(time + 0.2);
}

function scheduleSnare(context, time) {
  const buffer = context.createBuffer(1, context.sampleRate * 0.18, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  noise.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.setValueAtTime(1400, time);
  gain.gain.setValueAtTime(0.09, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(musicMasterGain);
  noise.start(time);
}

function scheduleHat(context, time, level) {
  const buffer = context.createBuffer(1, context.sampleRate * 0.05, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  noise.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(9000, time);
  gain.gain.setValueAtTime(level, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(musicMasterGain);
  noise.start(time);
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function playUiSound(type, force = false) {
  if (!state.audioEnabled && !force) {
    return;
  }
  ensureMusicStarted();
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const profiles = {
    select: [
      { frequency: 430, duration: 0.06, gain: 0.025, wave: "triangle" },
      { frequency: 620, duration: 0.08, gain: 0.02, wave: "triangle", delay: 0.03 },
    ],
    confirm: [
      { frequency: 300, duration: 0.05, gain: 0.03, wave: "square" },
      { frequency: 520, duration: 0.08, gain: 0.026, wave: "triangle", delay: 0.04 },
    ],
    warning: [
      { frequency: 250, duration: 0.09, gain: 0.03, wave: "sawtooth" },
      { frequency: 180, duration: 0.11, gain: 0.026, wave: "sawtooth", delay: 0.05 },
    ],
    open: [
      { frequency: 340, duration: 0.05, gain: 0.02, wave: "triangle" },
      { frequency: 470, duration: 0.05, gain: 0.018, wave: "triangle", delay: 0.03 },
      { frequency: 690, duration: 0.06, gain: 0.014, wave: "sine", delay: 0.07 },
    ],
    soft: [
      { frequency: 260, duration: 0.05, gain: 0.015, wave: "sine" },
    ],
  };

  (profiles[type] || profiles.soft).forEach((tone) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const startTime = context.currentTime + (tone.delay || 0);
    const stopTime = startTime + tone.duration;

    oscillator.type = tone.wave;
    oscillator.frequency.setValueAtTime(tone.frequency, startTime);
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(tone.gain, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(stopTime);
  });
}

function ensureMusicStarted() {
  if (!musicAudio) {
    musicAudio = new Audio("./assets/Neon%20Back%20Alley%20Chase.mp3");
    musicAudio.loop = true;
    musicAudio.preload = "auto";
  }

  updateMusicGain();

  if (state.musicEnabled) {
    const playPromise = musicAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  } else {
    musicAudio.pause();
  }
}

function updateMusicGain() {
  if (!musicAudio) {
    return;
  }
  musicAudio.volume = state.musicEnabled ? state.musicVolume : 0;
}

function toggleMusic() {
  state.musicEnabled = !state.musicEnabled;
  ensureMusicStarted();
  syncMusicUi();
  playUiSound(state.musicEnabled ? "confirm" : "soft", true);
}

function handleMusicVolumeChange(event) {
  state.musicVolume = Number(event.target.value) / 100;
  ensureMusicStarted();
  updateMusicGain();
}

init();
