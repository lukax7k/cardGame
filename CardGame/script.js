// Inicializa PA
const storedPoints = parseInt(localStorage.getItem("lovePoints"), 10);
if (isNaN(storedPoints)) {
  localStorage.setItem("lovePoints", "0");
  window.lovePoints = 0;
} else {
  window.lovePoints = storedPoints;
}

const packContainer = document.getElementById("packContainer");
const cardReveal = document.getElementById("cardReveal");
const gallery = document.getElementById("gallery");
const galleryCards = document.getElementById("galleryCards");
const closeGallery = document.getElementById("closeGallery");
const dailyTimer = document.getElementById("dailyTimer");

const bgMusic = document.getElementById("backgroundMusic");
const openSound = document.getElementById("openSound");
let musicStarted = false;

document.addEventListener("click", () => {
  if (bgMusic && bgMusic.muted) {
    bgMusic.muted = false;
    bgMusic.play().catch(() => { });
  }
}, { once: true });

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
  rarityOrder.forEach(rarity => {
    const cardsOfRarity = CARD_DATA
      .filter(c => c.rarity === rarity && stored[c.id])
      .sort((a, b) => a.id - b.id);
    if (!cardsOfRarity.length) return;
    const title = document.createElement("h3");
    title.textContent = rarity.charAt(0).toUpperCase() + rarity.slice(1);
    galleryCards.append(title);
    const container = document.createElement("div");
    container.className = "rarity-section";
    cardsOfRarity.forEach(card => {
      const wrapper = document.createElement("div");
      wrapper.className = "gallery-card-container";
      const img = document.createElement("img");
      img.src = `./assets/portraits/${card.id}.png`;
      img.alt = `Carta ${card.id}`;
      img.addEventListener("click", () => showModal(card.id));
      wrapper.append(img);
      const count = stored[card.id];
      if (count > 1) {
        const badge = document.createElement("span");
        badge.className = "card-count";
        badge.textContent = `x${count}`;
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
  modal.innerHTML = `
    <div class="modal-content">
      <img src="./assets/portraits/${id}.png" alt="Carta ${id}" />
      ${count > 1 ? `<button id="tradeBtn">Trocar cópias</button>` : ""}
    </div>`;
  modal.classList.remove("hidden");
  if (count > 1) {
    document.getElementById("tradeBtn")
      .addEventListener("click", () => openTradeModal(id, count));
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
    <p>Raridade: ${rarity} (cada dá ${paPerCopy} PA)</p>
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
      document.getElementById("paDisplay")
        .textContent = `PA: ${window.lovePoints}`;

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
    const card = createCardElement(id);
    card.style.zIndex = `${cards.length - idx}`;
    card.style.pointerEvents = idx !== 0 ? "none" : "auto";
    cardReveal.append(card);
    return card;
  });
  cardElements.forEach((card, i) => {
    card.addEventListener("click", () => {
      const clickSound = new Audio("./assets/audio/click.mp3");
      clickSound.play();

      card.classList.add("dismissed");
      saveCardToCollection(cards[i]);
      if (cardElements[currentIndex + 1])
        cardElements[currentIndex + 1].style.pointerEvents = "auto";
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
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

function alreadyOpenedToday() {
  return localStorage.getItem("lastOpenDate") === new Date().toDateString();
}

packContainer.addEventListener("click", () => {
  if (packContainer.classList.contains("pack-open") || alreadyOpenedToday()) return;
  const cards = getRandomCards();
  revealCardsStacked(cards);
  packContainer.classList.add("pack-open");
  setTimeout(() => cardReveal.classList.add("visible"), 100);
  localStorage.setItem("lastOpenDate", new Date().toDateString());
  startMidnightCountdown();
});

closeGallery.addEventListener("click", () => gallery.classList.add("hidden"));

if (alreadyOpenedToday()) startMidnightCountdown();
