
// Inicializa PA (lovePoints)
const storedPoints = parseInt(localStorage.getItem("lovePoints"), 10);
if (isNaN(storedPoints)) {
  localStorage.setItem("lovePoints", "0");
  window.lovePoints = 0;
} else {
  window.lovePoints = storedPoints;
}

// Inicializa PP (presentPoints)
const storedPP = parseInt(localStorage.getItem("presentPoints"), 10);
if (isNaN(storedPP)) {
  localStorage.setItem("presentPoints", "0");
  window.presentPoints = 0;
} else {
  window.presentPoints = storedPP;
}



// Aguarda DOM estar carregado para atualizar valores na tela
window.addEventListener("DOMContentLoaded", () => {
  const ppDisplay = document.getElementById("ppDisplay");
  if (ppDisplay) {
    ppDisplay.textContent = `PP: ${window.presentPoints}`;
  }

  const paDisplay = document.getElementById("paDisplay");
  if (paDisplay) {
    paDisplay.textContent = `PA: ${window.lovePoints}`;
  }
});

const packContainer = document.getElementById("packContainer");
const cardReveal = document.getElementById("cardReveal");
const gallery = document.getElementById("gallery");
const galleryCards = document.getElementById("galleryCards");
const closeGallery = document.getElementById("closeGallery");
const dailyTimer = document.getElementById("dailyTimer");

const bgMusic = document.getElementById("backgroundMusic");
const openSound = document.getElementById("openSound");
let musicStarted = false;

function playCompleteSound() {
  const audio = new Audio("assets/audio/complete.mp3");
  audio.play();
}

function playShopSound() {
  const audio = new Audio("assets/audio/shop.mp3");
  audio.play();
}

function playUpgradeSound() {
  const audio = new Audio("assets/audio/upgrade.mp3");
  audio.play();
}

// Ativa a música somente na primeira interação
document.addEventListener("click", () => {
  if (bgMusic && bgMusic.muted) {
    bgMusic.muted = false;
    bgMusic.play().catch(() => { });
  }
}, { once: true });

let wasPlaying = false;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    wasPlaying = !bgMusic.paused;
    bgMusic.pause();
  } else {
    if (wasPlaying && !bgMusic.muted) {
      bgMusic.play().catch((e) => {
        console.warn("Falha ao retomar música:", e);
      });
    }
  }
});

window.addEventListener("pagehide", () => {
  bgMusic.pause();
});

const modal = document.createElement("div");
modal.id = "cardModal";
modal.classList.add("hidden");
document.body.append(modal);
modal.addEventListener("click", () => modal.classList.add("hidden"));

function saveCardToCollection(id) {
  if (!id) return;
  const stored = JSON.parse(localStorage.getItem("collection") || "{}");
  stored[id] = (stored[id] || 0) + 1;
  localStorage.setItem("collection", JSON.stringify(stored));
}

window.loadGallery = function () {
  galleryCards.innerHTML = "";
  const stored = JSON.parse(localStorage.getItem("collection") || "{}");
  const rarityOrder = ["comum", "rara", "épica", "super rara"];
  const validIds = CARD_DATA.map(c => c.id.toString());
  const obtainedIds = validIds.filter(id => stored[id] >= 1);
  const totalCards = CARD_DATA.length;
  const obtainedCards = obtainedIds.length;

  const counterText = document.createElement("p");
  counterText.textContent = `${obtainedCards}/${totalCards}`;
  counterText.style.fontSize = "16px";
  counterText.style.color = "#d13f8c";
  counterText.style.fontWeight = "bold";
  counterText.style.fontFamily = "'Quicksand', sans-serif";  // mesma do título
  counterText.style.textAlign = "center";
  counterText.style.marginTop = "-60px";
  counterText.style.marginBottom = "10px";

  galleryCards.appendChild(counterText);


  rarityOrder.forEach(rarity => {
  const allCardsOfRarity = CARD_DATA.filter(c => c.rarity === rarity);
  const obtainedCardsOfRarity = allCardsOfRarity.filter(c => stored[c.id]);

  if (!obtainedCardsOfRarity.length) return;

  const title = document.createElement("h3");
  title.textContent = rarity.charAt(0).toUpperCase() + rarity.slice(1);
  galleryCards.append(title);

  // Novo: contador por raridade
  const rarityCounter = document.createElement("p");
  rarityCounter.textContent = `${obtainedCardsOfRarity.length}/${allCardsOfRarity.length}`;
  rarityCounter.style.fontSize = "14px";
  rarityCounter.style.color = "#d13f8c";
  rarityCounter.style.fontWeight = "bold";
  rarityCounter.style.fontFamily = "'Quicksand', sans-serif";
  rarityCounter.style.textAlign = "center";
  rarityCounter.style.marginTop = "-12px";
  rarityCounter.style.marginBottom = "8px";
  galleryCards.append(rarityCounter);

  const container = document.createElement("div");
  container.className = "rarity-section";

  obtainedCardsOfRarity.sort((a, b) => a.id - b.id).forEach(card => {
    const wrapper = document.createElement("div");
    wrapper.className = "gallery-card-container";
    const img = document.createElement("img");
    img.src = `./assets/portraits/${card.id}.png`;
    img.alt = `Carta ${card.id}`;
    img.addEventListener("click", () => showModal(card.id));
    wrapper.append(img);

    const count = stored[card.id];
    const upgrades = JSON.parse(localStorage.getItem("upgrades") || "{}");
    const upgradeLevel = upgrades[card.id] || 0;

    if (count > 1) {
      const badge = document.createElement("span");
      badge.className = "card-count";
      badge.textContent = `x${count}`;
      wrapper.append(badge);
    }

    if (upgradeLevel >= 1 && upgradeLevel <= 3) {
      const badge = document.createElement("span");
      badge.className = `upgrade-badge level-${upgradeLevel}`;
      wrapper.append(badge);
    }

    container.append(wrapper);
  });

  galleryCards.append(container);
});

};

function showModal(id) {
  const stored = JSON.parse(localStorage.getItem("collection") || "{}");
  const count = stored[id] || 1;

  const upgrades = JSON.parse(localStorage.getItem("upgrades") || "{}");
  const upgradeLevel = upgrades[id] || 0;

  let wrapperClass = "";
  if (upgradeLevel === 1) {
    wrapperClass = "foil-wrapper border-blue";
  } else if (upgradeLevel === 2) {
    wrapperClass = "foil-wrapper border-gold fancy-glow";
  } else if (upgradeLevel === 3) {
    wrapperClass = "foil-wrapper border-gold fancy-glow level-3";
  } else {
    wrapperClass = "foil-wrapper";
  }



  const foil = upgradeLevel >= 1 ? `<div class="foil-overlay"></div>` : "";

  modal.innerHTML = `
  <div class="modal-content">
    <div class="${wrapperClass}">
      <img src="./assets/portraits/${id}.png" alt="Carta ${id}" />
      ${foil}
    </div>
    ${count > 1 ? `<button id="tradeBtn">Trocar cópias</button>` : ""}
  </div>
`;

  if (upgradeLevel === 3) {
    const butterflies = document.createElement("div");
    butterflies.id = "butterflyOverlay";
    modal.appendChild(butterflies);
  }


  modal.classList.remove("hidden");

  if (count > 1) {
    document.getElementById("tradeBtn")
      .addEventListener("click", () => openChoiceModal(id, count));
  }
}

function onPackOpened() {
  window.presentPoints += 5;
  localStorage.setItem("presentPoints", window.presentPoints);

  const ppDisplay = document.getElementById("ppDisplay");
  if (ppDisplay) {
    ppDisplay.textContent = `PP: ${window.presentPoints}`;
  }
}



function openChoiceModal(id, count) {
  const choiceModal = document.createElement("div");
  choiceModal.id = "choiceModal";
  choiceModal.classList.add("modal-overlay");

  const upgrades = JSON.parse(localStorage.getItem("upgrades") || "{}");
  const currentLevel = upgrades[id] || 0;
  const isMaxed = currentLevel >= 3;

  choiceModal.innerHTML = `
    <div class="modal-content">
      <h3>Que tipo de troca deseja fazer?</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button id="tradePA">Trocar por PA</button>
        <button id="tradeUpgrade" ${isMaxed ? 'class="disabled-btn" disabled' : ''}>Melhorias</button>
      </div>
    </div>
  `;

  document.body.append(choiceModal);

  choiceModal.addEventListener("click", (e) => {
    if (e.target === choiceModal) choiceModal.remove();
  });

  document.getElementById("tradePA").addEventListener("click", () => {
    openTradeModal(id, count);
    choiceModal.remove();
  });

  const upgradeBtn = document.getElementById("tradeUpgrade");
  if (!isMaxed) {
    upgradeBtn.addEventListener("click", () => {
      openUpgradeModal(id, count);
      choiceModal.remove();
    });
  }
}

function openUpgradeModal(id, count) {
  const upgradeModal = document.createElement("div");
  upgradeModal.id = "upgradeModal";
  upgradeModal.classList.add("modal-overlay"); // ⬅ nova classe para estilo compartilhado
  const rarity = CARD_DATA.find(c => c.id === id).rarity;
  const costPerLevel = { comum: 4, rara: 3, "épica": 2, "super rara": 1 }[rarity];
  const upgradeData = JSON.parse(localStorage.getItem("upgrades") || "{}");
  const currentLevel = upgradeData[id] || 0;

  if (currentLevel >= 3) {

    return;
  }

  const nextLevel = currentLevel + 1;
  const cost = costPerLevel;
  const canUpgrade = count - cost >= 1;

  upgradeModal.innerHTML = `
    <div class="modal-content">
      <h3>Melhorar Carta ${id}</h3>
      <p>Raridade: ${rarity} • Nível atual: ${currentLevel}</p>
      <p>Esta melhoria (${nextLevel}/3) custará <strong>${cost}</strong> cópias.</p>
      <p>Cópias disponíveis: ${count}</p>
      ${!canUpgrade
      ? `<p style="color: red;">❌ Você precisa manter pelo menos uma cópia. Não é possível melhorar agora.</p>`
      : `<button id="confirmUpgrade">Confirmar melhoria</button>`
    }
    </div>
  `;

  document.body.append(upgradeModal);

  upgradeModal.addEventListener("click", (e) => {
    if (e.target === upgradeModal) upgradeModal.remove();
  });

  if (canUpgrade) {
    document.getElementById("confirmUpgrade").addEventListener("click", () => {
      const collection = JSON.parse(localStorage.getItem("collection") || "{}");
      collection[id] -= cost;
      localStorage.setItem("collection", JSON.stringify(collection));

      upgradeData[id] = nextLevel;
      playUpgradeSound();
      localStorage.setItem("upgrades", JSON.stringify(upgradeData));

      upgradeModal.remove();
      modal.classList.add("hidden");
      if (!gallery.classList.contains("hidden")) loadGallery();


    });
  }
}

function openTradeModal(id, count) {
  const tradeModal = document.createElement("div");
  tradeModal.id = "tradeModal";
  const rarity = CARD_DATA.find(c => c.id === id).rarity;
  const paPerCopy = { comum: 1, rara: 2, "épica": 3, "super rara": 5 }[rarity];
  tradeModal.innerHTML = `
  <div class="modal-content">
    <h3>Trocar Cópias da Carta ${id}</h3>
    <p>Raridade: ${rarity} (Vale ${paPerCopy} PA)</p>
    <label>Quantidade a trocar (máximo ${count - 1}):</label>
    <input id="tradeCount" type="number" min="1" max="${count - 1}" value="1"/>
    <button id="confirmTrade">Trocar</button>
    <div id="tradeMessage" style="height: 20px; margin-top: 8px;"></div>
  </div>`;
  document.body.append(tradeModal);
  tradeModal.addEventListener("click", e => {
    if (e.target === tradeModal) tradeModal.remove();
  });
  document.getElementById("confirmTrade")
    .addEventListener("click", () => {
      const qty = parseInt(document.getElementById("tradeCount").value, 10);
      const msg = document.getElementById("tradeMessage");
      if (qty < 1 || qty >= count) {
        msg.innerHTML = `<span style="color: red;">❌ Quantidade inválida.</span>`;
        return;
      }
      const points = qty * paPerCopy;
      const stored = JSON.parse(localStorage.getItem("collection") || "{}");
      stored[id] -= qty;
      localStorage.setItem("collection", JSON.stringify(stored));
      window.lovePoints += points;
      localStorage.setItem("lovePoints", window.lovePoints);
      document.getElementById("paDisplay").textContent = `PA: ${window.lovePoints}`;
      modal.classList.add("hidden");
      tradeModal.remove();
      if (!gallery.classList.contains("hidden")) loadGallery();
    });
}

function revealCardsStacked(cards) {
  if (!musicStarted) {
    bgMusic.play().catch(() => { });
    musicStarted = true;
  }
  openSound.play().catch(() => { });
  cardReveal.innerHTML = "";
  let currentIndex = 0;
  const cardElements = cards.map((id, idx) => {
    const el = createCardElement(id);
    el.style.zIndex = `${cards.length - idx}`;
    el.style.pointerEvents = idx !== 0 ? "none" : "auto";
    cardReveal.append(el);
    return el;
  });
  cardElements.forEach((card, i) => {
    card.addEventListener("click", () => {
      const clickSound = new Audio("./assets/audio/click.mp3");
      clickSound.play();
      card.classList.add("dismissed");
      saveCardToCollection(cards[i]);
      if (cardElements[currentIndex + 1]) {
        cardElements[currentIndex + 1].style.pointerEvents = "auto";
      }
      currentIndex++;
    });
  });
}

function startMidnightCountdown() {
  function updateTimer() {
    const now = new Date();
    const mid = new Date();
    mid.setHours(24, 0, 0, 0);
    const diff = mid - now;
    if (diff <= 0) {
      localStorage.removeItem("lastOpenDate");
      dailyTimer.classList.add("hidden");
      location.reload();
      return;
    }
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    dailyTimer.textContent = `🕒 Próximo pacote em ${hrs}h ${mins}m ${secs}s`;
    dailyTimer.classList.remove("hidden");
    updatePackAvailability();
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

function alreadyOpenedToday() {
  return localStorage.getItem("lastOpenDate") === new Date().toDateString();
}

function updatePackAvailability() {
  const opened = alreadyOpenedToday();
  packContainer.classList.toggle("disabled", opened);
}

// Evento clique para abrir pacote
packContainer.addEventListener("click", () => {
  if (packContainer.classList.contains("pack-open") || alreadyOpenedToday()) return;
  const cards = getRandomCards();
  revealCardsStacked(cards);
  packContainer.classList.add("pack-open");
  localStorage.setItem("lastOpenDate", new Date().toDateString());
  let opened = parseInt(localStorage.getItem("openedPacks") || "0");
  opened += 1;
  localStorage.setItem("openedPacks", opened);
  setTimeout(() => cardReveal.classList.add("visible"), 100);
  onPackOpened();  // garante +5 PP
  updatePackAvailability();
  startMidnightCountdown();
});

// fechar galeria
closeGallery.addEventListener("click", () => gallery.classList.add("hidden"));

// Inicializa estado visual
if (alreadyOpenedToday()) {
  updatePackAvailability();
  startMidnightCountdown();
}

