// ===========================
// ETAPA 1: Configuração inicial e estado local
// ===========================
const validCoupons = [
  "TEAMOINFINITO", "1501", "PRESENTINHO", "LUCARIO", "LOVELOVELOVE", "CHURRASQUINHO",
  "NICOLAU", "RAVENA", "CARTINHA", "PSYDUCK", "YUUMI", "PRINCESA", "MENINA", "AMORDAMINHAVIDA",
  "NEGAO", "BEIJINHO", "FLORZINHA", "CHOCOLATEQUENTE", "PRESENTE1", "PRESENTE2", "PRESENTE3",
  "PRESENTE4", "PRESENTE5", "PRESENTE6", "PRESENTE7", "PRESENTE8", "PRESENTE9", "PRESENTE10",
  "CODE1", "AMOR1", "AMOR2", "AMOR3", "LOJINHA", "TESTE10", "FOFURINHA", "GATINHO", "CABEÇUDO",
  "ZOIUDA", "BOLINHO", "AMORETERNO", "COSQUINHA", "NOVASCARTINHAS", "AMORAMORAMOR", "SOFA",
  "CAMINHADA", "STROGONOFF", "CUPCAKE", "EMY", "PRAIA", "CARTINHAS1", "CARTINHAS2", "CARTINHAS3",
  "PEITOS", "BUNDA", "GOSTOSA", "LINDEZA", "MAISUM", "ROLETINHA", "RESOLVIDO", "CONQUISTA",
  "5CARTAS", "5CARTAS2", "5CARTAS3", "BOM DIA", "OLHOSLINDOS", "MUITOPA", "1.3", "JURASSICWORLD", "AMOREMIO"
];

const usedCoupons = JSON.parse(localStorage.getItem("usedCoupons") || "[]");
window.lovePoints = parseInt(localStorage.getItem("lovePoints") || "0", 10);

// ⬇️ CORRIGIDO: usamos `window.presentPoints` no lugar de `packagePoints`
window.presentPoints = parseInt(localStorage.getItem("presentPoints") || "0", 10);
localStorage.setItem("presentPoints", window.presentPoints);

// ===========================
// ETAPA 2: Criação do menu e displays
// ===========================
const header = document.querySelector("header");
const menuWrapper = document.createElement("div");
menuWrapper.style.cssText = "display: flex; align-items: center; justify-content: flex-end; gap: 12px; position: relative;";

const paDisplay = document.createElement("div");
paDisplay.id = "paDisplay";
paDisplay.textContent = `PA: ${window.lovePoints}`;

const ppDisplay = document.createElement("div");
ppDisplay.id = "ppDisplay";
ppDisplay.textContent = `PP: ${window.presentPoints}`;

const dropdown = document.createElement("div");
dropdown.className = "dropdown";

const menuToggle = document.createElement("button");
menuToggle.id = "menuToggle";
menuToggle.innerHTML = "⋮";

const dropdownMenu = document.createElement("div");
dropdownMenu.id = "dropdownMenu";
dropdownMenu.className = "dropdown-menu";



// Botões do menu
const buttons = {
  openGalleryBtn: ["📁 Galeria", "openGallery"],
  openAchievementsBtn: ["🏆 Conquistas", "openAchievements"],
  openCouponBtn: ["🎟️ Inserir Cupom", "openCoupon"],
  buyPackBtn: ["🎁 Comprar", "buyPack"],
  openRouletteBtn: ["🎯 Roleta", "openRoulette"],
  openShopBtn: ["🛒 Loja", "openShop"]
};

for (const [key, [label, id]] of Object.entries(buttons)) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.innerHTML = label;
  buttons[key] = btn;
  dropdownMenu.appendChild(btn);
}

dropdown.append(menuToggle, dropdownMenu);
menuWrapper.append(paDisplay, ppDisplay, dropdown);
header.innerHTML = "";
header.appendChild(menuWrapper);

// Você pode continuar daqui com os modais, loja, roleta etc.
// Lembre-se de SEMPRE usar:
ppDisplay.textContent = `PP: ${window.presentPoints}`;
localStorage.setItem("presentPoints", window.presentPoints);

// Para garantir que tudo esteja sincronizado visualmente e no armazenamento local.


const spinSound = new Audio('./assets/audio/spin.mp3');

// ===========================
// ETAPA 3: Ações de clique no menu
// ===========================
menuToggle.addEventListener("click", e => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", e => {
  if (!dropdown.contains(e.target)) dropdownMenu.classList.remove("show");
});

buttons.openGalleryBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  document.getElementById("achievements")?.classList.add("hidden");
  document.getElementById("shop")?.remove();
  loadGallery();
  document.getElementById("gallery").classList.remove("hidden");
});

buttons.openCouponBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  showCouponModal();
});

buttons.buyPackBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  showBuyModal();
});

buttons.openRouletteBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  startRouletteModal();
});

buttons.openShopBtn.addEventListener("click", () => {
  document.getElementById("achievements")?.classList.add("hidden");
  dropdownMenu.classList.remove("show");
  showShopScreen();
});

buttons.openAchievementsBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  document.getElementById("shop")?.remove();
  document.getElementById("gallery")?.classList.add("hidden");
  showAchievementsScreen();
});

// ===========================
// ETAPA 4: Cupom Modal
// ===========================
const couponModal = document.createElement("div");
couponModal.id = "couponModal";
couponModal.className = "modal-overlay hidden";
couponModal.innerHTML = `
  <div class="modal-content">
    <h3>Insira seu cupom</h3>
    <input id="couponInput" type="text" placeholder="Digite o código" />
    <button id="submitCoupon" class="btn">Aplicar</button>
    <div id="couponMessage" style="margin-top:10px;"></div>
  </div>`;
document.body.append(couponModal);

couponModal.addEventListener("click", e => {
  if (e.target === couponModal) couponModal.classList.add("hidden");
});

document.getElementById("submitCoupon").addEventListener("click", handleCouponSubmit);

function showCouponModal() {
  couponModal.classList.remove("hidden");
  document.getElementById("couponInput").value = "";
  document.getElementById("couponMessage").textContent = "";
}

function handleCouponSubmit() {
  const code = document.getElementById("couponInput").value.trim().toUpperCase();
  const msg = document.getElementById("couponMessage");

  if (!validCoupons.includes(code)) {
    msg.innerHTML = `<span style="color:red;">❌ Código inválido.</span>`;
    return;
  }

  if (usedCoupons.includes(code)) {
    msg.innerHTML = `<span style="color:orange;">⚠️ Esse código já foi usado.</span>`;
    return;
  }

  usedCoupons.push(code);
  localStorage.setItem("usedCoupons", JSON.stringify(usedCoupons));

  if (code === "RESOLVIDO") {
    window.presentPoints += 50;
    localStorage.setItem("presentPoints", window.presentPoints);
    ppDisplay.textContent = `PP: ${window.presentPoints}`;

    msg.innerHTML = `<span style="color:green;">✅ Cupom RESOLVIDO resgatado: +50 PP!</span>`;
  } else {
    msg.innerHTML = `<span style="color:green;">✅ Cupom aceito! Você pode abrir um pacote.</span>`;
    playShopSound();
  }

  localStorage.removeItem("lastOpenDate");

  setTimeout(() => {
    couponModal.classList.add("hidden");
    updatePackAvailability?.();
    packContainer.classList.remove("pack-open");
    cardReveal.classList.remove("visible");
    cardReveal.innerHTML = "";
  }, 1200);
}

// ===========================
// ETAPA 5: Modal de compra com PA
// ===========================
const buyModal = document.createElement("div");
buyModal.id = "buyModal";
buyModal.className = "modal-overlay hidden";
buyModal.innerHTML = `
  <div class="modal-content">
    <h3>Deseja gastar 10 Pontos de Amor para abrir um novo pacote?</h3>
    <button id="confirmBuy" class="btn">Comprar</button>
    <button id="cancelBuy" class="btn">Cancelar</button>
    <div id="buyMessage" style="margin-top: 10px;"></div>
  </div>`;
document.body.append(buyModal);

buyModal.addEventListener("click", e => {
  if (e.target === buyModal) buyModal.classList.add("hidden");
});

document.getElementById("cancelBuy").addEventListener("click", () => {
  buyModal.classList.add("hidden");
});

document.getElementById("confirmBuy").addEventListener("click", () => {
  const msg = document.getElementById("buyMessage");
  if (window.lovePoints < 10) {
    msg.innerHTML = `<span style="color:red;">❌ Pontos insuficientes para comprar.</span>`;
    return;
  }

  window.lovePoints -= 10;
  localStorage.setItem("lovePoints", window.lovePoints);
  paDisplay.textContent = `PA: ${window.lovePoints}`;
  localStorage.removeItem("lastOpenDate");
  playShopSound();

  msg.innerHTML = `<span style="color:green;">✅ Pacote liberado! Você pode abrir agora.</span>`;

  setTimeout(() => {
    buyModal.classList.add("hidden");
    updatePackAvailability?.();
    packContainer.classList.remove("pack-open");
    cardReveal.classList.remove("visible");
    cardReveal.innerHTML = "";
  }, 1200);
});

function showBuyModal() {
  buyModal.classList.remove("hidden");
  document.getElementById("buyMessage").textContent = "";
}

// ===========================
// ETAPA 6: Modal e lógica da Roleta do Amor
// ===========================
const rouletteModal = document.createElement("div");
rouletteModal.id = "rouletteModal";
rouletteModal.className = "modal-overlay hidden";
rouletteModal.innerHTML = `
  <div class="modal-content">
    <h3>Roleta do Amor</h3>
    <div class="roulette-wrapper">
      <div class="roulette-arrow">▼</div>
      <img id="rouletteImage" src="./assets/roleta.png" alt="Roleta" />
    </div>
    <button id="spinRoulette" class="btn">Girar</button>
    <div id="rouletteMessage" style="margin-top: 10px;"></div>
  </div>`;
document.body.append(rouletteModal);

const rewards = [10, 15, 20, 25, 5];

rouletteModal.addEventListener("click", e => {
  if (e.target === rouletteModal) rouletteModal.classList.add("hidden");
});

document.getElementById("spinRoulette").addEventListener("click", () => {
  const msg = document.getElementById("rouletteMessage");
  const today = new Date().toDateString();

  if (localStorage.getItem("lastRouletteDate") === today) {
    msg.innerHTML = `<span style="color:orange;">⚠️ Você já girou a roleta hoje.</span>`;
    return;
  }

  spinSound.currentTime = 0;
  spinSound.play();

  const index = Math.floor(Math.random() * rewards.length);
  const reward = rewards[index];
  const angleStep = 360 / rewards.length;
  const offset = angleStep / 1.68;
  const finalAngle = 360 * 5 + index * angleStep + offset;
  let spins = parseInt(localStorage.getItem("rouletteSpins") || "0");
  localStorage.setItem("rouletteSpins", (spins + 1).toString());


  const wheel = document.getElementById("rouletteImage");
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${finalAngle}deg)`;

  wheel.addEventListener("transitionend", () => {
    window.lovePoints += reward;
    localStorage.setItem("lovePoints", window.lovePoints);
    localStorage.setItem("lastRouletteDate", today);
    paDisplay.textContent = `PA: ${window.lovePoints}`;
    msg.innerHTML = `<span style="color:green;">✅ Você ganhou ${reward} PA!</span>`;
  }, { once: true });
});

function startRouletteModal() {
  const msg = document.getElementById("rouletteMessage");
  const today = new Date().toDateString();

  msg.innerHTML = localStorage.getItem("lastRouletteDate") === today
    ? `<span style="color:orange;">⚠️ Você já girou a roleta hoje.</span>`
    : "";

  rouletteModal.classList.remove("hidden");
}

// ===========================
// ETAPA 7: Loja e compra com PP
// ===========================

function showShopScreen() {
  gallery.classList.add("hidden");
  document.getElementById("shop")?.remove();
  createShopDOM();
}

function createShopDOM() {
  const shop = document.createElement("div");
  shop.id = "shop";
  shop.className = "gallery";

  shop.innerHTML = `
    <button id="backShop" style="position:absolute; top:20px; left:20px; z-index:11; background: transparent; border: none; color: #d13f8c; font-size: 28px; cursor:pointer;">←</button>
    <h3 style="margin-top:60px; color:#d13f8c;">Loja de Pacotes (PP: ${window.presentPoints})</h3>
    <div id="shopGrid" style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px; padding:16px; margin-top:20px;"></div>
  `;
  document.body.append(shop);

  document.getElementById("backShop").addEventListener("click", () => {
    shop.remove();
  });

  const grid = shop.querySelector("#shopGrid");
  const collection = JSON.parse(localStorage.getItem("collection") || "{}");

  const rarityOrder = { comum: 0, rara: 1, 'épica': 2, 'super rara': 3 };
  const sortedCards = CARD_DATA.slice().sort((a, b) => {
    if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) {
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    }
    return a.id - b.id;
  });

  sortedCards.forEach(c => {
    const owned = collection[c.id] || 0;
    const price = { comum: 10, rara: 15, 'épica': 20, 'super rara': 30 }[c.rarity];

    const cardEl = document.createElement("div");
    cardEl.className = "gallery-card-container";
    cardEl.style.width = "80px";
    cardEl.style.margin = "4px";

    const imgEl = owned
      ? Object.assign(document.createElement("img"), {
        src: `./assets/portraits/${c.id}.png`,
        alt: `Carta ${c.id}`
      })
      : Object.assign(document.createElement("div"), {
        className: "not-owned",
        style: "width:90px; height:130px; background:#444; border-radius:10px;"
      });

    const priceLabel = document.createElement("div");
    priceLabel.className = "card-count";
    priceLabel.textContent = `Custo: ${price} PP`;
    priceLabel.style.cssText = "text-align:right; width:100%; padding-right:6px; margin-top:4px; font-size:12px; color:#d13f8c;";

    cardEl.append(imgEl, priceLabel);
    grid.append(cardEl);

    cardEl.addEventListener("click", () => {
      if (!owned) {
        showMessageModal("Você precisa liberar essa carta primeiro.");
      } else {
        showPurchaseModal(c.id, price);
      }
    });
  });
}

function showPurchaseModal(id, price) {
  const modalEl = document.createElement("div");
  modalEl.id = "purchaseModal";
  modalEl.classList.add("modal-overlay");

  modalEl.innerHTML = `
    <div class="modal-content">
      <h3 style="margin-bottom:10px;">Comprar carta ${id} por ${price} PP?</h3>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button id="cancelBuyCard" class="btn">Cancelar</button>
        <button id="confirmBuyCard" class="btn">Confirmar</button>
      </div>
      <div id="purchaseMessage" style="margin-top:10px;"></div>
    </div>`;
  document.body.append(modalEl);

  modalEl.onclick = e => { if (e.target === modalEl) modalEl.remove(); };
  modalEl.querySelector("#cancelBuyCard").onclick = () => modalEl.remove();

  modalEl.querySelector("#confirmBuyCard").onclick = () => {
    const msg = modalEl.querySelector("#purchaseMessage");
    if (window.presentPoints < price) {
      msg.innerHTML = `<span style="color:red;">PP insuficientes.</span>`;
      return;
    }

    let purchases = parseInt(localStorage.getItem("shopPurchases") || "0");
    localStorage.setItem("shopPurchases", (purchases + 1).toString());
    playShopSound();

    // Atualiza saldo
    window.presentPoints -= price;
    localStorage.setItem("presentPoints", window.presentPoints);
    document.getElementById("ppDisplay").textContent = `PP: ${window.presentPoints}`;

    // Atualiza coleção
    const col = JSON.parse(localStorage.getItem("collection") || "{}");
    col[id] = (col[id] || 0) + 1;
    localStorage.setItem("collection", JSON.stringify(col));

    msg.innerHTML = `<span style="color:green;">✅ Carta comprada!</span>`;

    setTimeout(() => {
      modalEl.remove();
      document.getElementById("shop").remove();
      showShopScreen(); // Recarrega a loja
    }, 800);
  };
}

function showMessageModal(text) {
  const msg = document.createElement("div");
  msg.id = "shopMsgModal";
  msg.className = "modal-overlay";
  msg.innerHTML = `
    <div class="modal-content">
      <p style="margin-bottom: 12px;">${text}</p>
      <button id="closeMsg" class="btn">OK</button>
    </div>`;
  document.body.append(msg);
  msg.onclick = e => { if (e.target === msg) msg.remove(); };
  msg.querySelector("#closeMsg").onclick = () => msg.remove();
}

// ===========================
// ETAPA 8: Tela de Conquistas
// ===========================
function showAchievementsScreen() {
  document.getElementById("achievements")?.remove();

  const container = document.createElement("div");
  container.id = "achievements";
  container.className = "gallery"; // reutiliza estilo da loja/galeria

  container.innerHTML = `
    <button id="backAchievements" style="position:absolute; top:20px; left:20px; z-index:11; background:transparent; border:none; color:#d13f8c; font-size:28px; cursor:pointer;">←</button>
    <h3 style="margin-top:60px; color:#d13f8c;">Conquistas</h3>
    <div id="achievementList" style="padding:20px; display:flex; flex-direction:column; gap:12px;"></div>
  `;
  const counterText = document.createElement("p");

  const totalAchievements = ACHIEVEMENTS.length;
  const claimedAchievements = JSON.parse(localStorage.getItem("claimedAchievements") || "[]");
  const completedAchievements = ACHIEVEMENTS.filter(a => a.condition() || claimedAchievements.includes(a.id)).length;

  counterText.textContent = `${completedAchievements}/${totalAchievements}`;
  counterText.style.fontSize = "16px";
  counterText.style.color = "#d13f8c";
  counterText.style.fontWeight = "bold";
  counterText.style.fontFamily = "'Quicksand', sans-serif";
  counterText.style.textAlign = "center";
  counterText.style.marginTop = "-30px";
  counterText.style.marginBottom = "10px";

  container.querySelector("#achievementList").before(counterText);

  document.body.append(container);

  document.getElementById("backAchievements").onclick = () => container.remove();


  const list = container.querySelector("#achievementList");

  const completed = [], incomplete = [];

  ACHIEVEMENTS.forEach(a => {
    const isComplete = a.condition();
    const isClaimed = claimedAchievements.includes(a.id);

    const div = document.createElement("div");
    div.style.cssText = `
      border: 1px solid #d13f8c;
      border-radius: 10px;
      padding: 12px;
      background: ${isClaimed ? '#8884' : 'white'};
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;

    const left = document.createElement("div");
    left.innerHTML = `<div style="font-weight:bold;">${a.name}</div><div style="font-size:13px;">${a.description}</div>`;

    const right = document.createElement("div");

    if (isClaimed) {
      right.innerHTML = `<span style="pink:gray; font-size:10px; ">Concluído</span>`;
    } else if (isComplete) {
      const btn = document.createElement("button");
      btn.textContent = `Resgatar +${a.reward} PA`;
      btn.className = "cbtn";
      btn.onclick = () => {
        window.lovePoints += a.reward;
        localStorage.setItem("lovePoints", window.lovePoints);
        paDisplay.textContent = `PA: ${window.lovePoints}`;
        claimedAchievements.push(a.id);
        localStorage.setItem("claimedAchievements", JSON.stringify(claimedAchievements));
        showAchievementsScreen(); // atualiza tela
        playCompleteSound();
      };
      right.appendChild(btn);
    } else {
      right.innerHTML = `<span style="color:#d13f8c; font-size:10px;">Em progresso</span>`;
    }

    div.append(left, right);
    (isClaimed ? completed : incomplete).push(div);
  });

  incomplete.concat(completed).forEach(div => list.appendChild(div));
}
