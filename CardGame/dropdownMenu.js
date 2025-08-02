const validCoupons = ["TEAMOINFINITO", "1501", "PRESENTINHO", "LUCARIO", "SHAYMIN",
  "LOVELOVELOVE", "CHURRASQUINHO", "NICOLAU", "RAVENA", "CARTINHA",
  "PSYDUCK", "YUUMI", "PRINCESA", "MENINA", "AMORDAMINHAVIDA",
  "PRESENTE1", "PRESENTE2", "PRESENTE3"];
const usedCoupons = JSON.parse(localStorage.getItem("usedCoupons") || "[]");

const header = document.querySelector("header");
const menuWrapper = document.createElement("div");
menuWrapper.style.display = "flex";
menuWrapper.style.alignItems = "center";
menuWrapper.style.justifyContent = "flex-end";
menuWrapper.style.gap = "12px";
menuWrapper.style.position = "relative";

const paDisplay = document.createElement("div");
paDisplay.id = "paDisplay";
paDisplay.textContent = `PA: ${window.lovePoints}`;

const dropdown = document.createElement("div");
dropdown.className = "dropdown";
const menuToggle = document.createElement("button");
menuToggle.id = "menuToggle";
menuToggle.innerHTML = "⋮";

const dropdownMenu = document.createElement("div");
dropdownMenu.id = "dropdownMenu";
dropdownMenu.className = "dropdown-menu";

const openGalleryBtn = document.createElement("button");
openGalleryBtn.id = "openGallery";
openGalleryBtn.innerHTML = "📁 Galeria";

const openCouponBtn = document.createElement("button");
openCouponBtn.id = "openCoupon";
openCouponBtn.innerHTML = "🎟️ Inserir Cupom";

const buyPackBtn = document.createElement("button");
buyPackBtn.id = "buyPack";
buyPackBtn.innerHTML = "🎁 Comprar";

const openRouletteBtn = document.createElement("button");
openRouletteBtn.id = "openRoulette";
openRouletteBtn.innerHTML = "🎯 Roleta";

dropdownMenu.append(openGalleryBtn, openCouponBtn, buyPackBtn, openRouletteBtn);
dropdown.append(menuToggle, dropdownMenu);
menuWrapper.append(paDisplay, dropdown);
header.innerHTML = "";
header.append(menuWrapper);

menuToggle.addEventListener("click", e => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("show");
});
document.addEventListener("click", e => {
  if (!dropdown.contains(e.target)) dropdownMenu.classList.remove("show");
});

// Coupon Modal
const couponModal = document.createElement("div");
couponModal.id = "couponModal";
couponModal.classList.add("hidden");
couponModal.innerHTML = `
  <div class="modal-content">
    <h3>Inserir Código Promocional</h3>
    <input id="couponInput" type="text" placeholder="Digite o código" />
    <button id="submitCoupon">Aplicar</button>
    <div id="couponMessage"></div>
  </div>`;
document.body.append(couponModal);

// Buy Modal
const buyModal = document.createElement("div");
buyModal.id = "buyModal";
buyModal.classList.add("hidden");
buyModal.innerHTML = `
  <div class="modal-content">
    <h3>Deseja gastar 10 PA para abrir um novo pacote?</h3>
    <button id="confirmBuy">Comprar</button>
    <button id="cancelBuy">Cancelar</button>
    <div id="buyMessage"></div>
  </div>`;
document.body.append(buyModal);

// Roulette Modal
const rouletteModal = document.createElement("div");
rouletteModal.id = "rouletteModal";
rouletteModal.classList.add("hidden");
rouletteModal.innerHTML = `
  <div class="modal-content">
    <h3>Roleta do Amor 🎁</h3>
    <div class="roulette-wrapper">
      <div class="roulette-arrow">▼</div>
      <img id="rouletteImage" src="./assets/roleta.png" alt="Roleta" />
    </div>
    <button id="spinRoulette">Girar</button>
    <div id="rouletteMessage"></div>
  </div>`;
document.body.append(rouletteModal);

// Modal open actions
openGalleryBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  loadGallery();
  document.getElementById("gallery").classList.remove("hidden");
});

openCouponBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  couponModal.classList.remove("hidden");
  document.getElementById("couponInput").value = "";
  document.getElementById("couponMessage").textContent = "";
});

buyPackBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  buyModal.classList.remove("hidden");
  document.getElementById("buyMessage").textContent = "";
});

openRouletteBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  startRouletteModal();
});

// Coupon logic
couponModal.addEventListener("click", e => {
  if (e.target === couponModal) couponModal.classList.add("hidden");
});
document.getElementById("submitCoupon").addEventListener("click", () => {
  const input = document.getElementById("couponInput");
  const msg = document.getElementById("couponMessage");
  const code = input.value.trim().toUpperCase();
  if (!validCoupons.includes(code)) {
    msg.innerHTML = `<span style="color: red;">❌ Código inválido.</span>`;
    return;
  }
  if (usedCoupons.includes(code)) {
    msg.innerHTML = `<span style="color: orange;">⚠️ Esse código já foi usado.</span>`;
    return;
  }
  usedCoupons.push(code);
  localStorage.setItem("usedCoupons", JSON.stringify(usedCoupons));
  localStorage.removeItem("lastOpenDate");
  msg.innerHTML = `<span style="color: green;">✅ Código aceito! Você pode abrir um pacote.</span>`;
  setTimeout(() => {
    couponModal.classList.add("hidden");
    if (typeof startMidnightCountdown === "function") startMidnightCountdown();
    const pack = document.getElementById("packContainer");
    pack.classList.remove("pack-open");
    const reveal = document.getElementById("cardReveal");
    if (reveal) {
      reveal.classList.remove("visible");
      reveal.innerHTML = "";
    }
  }, 1200);
});

// Buy logic
buyModal.addEventListener("click", e => {
  if (e.target === buyModal) buyModal.classList.add("hidden");
});
document.getElementById("cancelBuy").addEventListener("click", () => {
  buyModal.classList.add("hidden");
});
document.getElementById("confirmBuy").addEventListener("click", () => {
  const msg = document.getElementById("buyMessage");
  if (window.lovePoints < 10) {
    msg.innerHTML = `<span style="color: red;">❌ Pontos insuficientes para comprar.</span>`;
    return;
  }
  window.lovePoints -= 10;
  localStorage.setItem("lovePoints", window.lovePoints);
  paDisplay.textContent = `PA: ${window.lovePoints}`;
  localStorage.removeItem("lastOpenDate");
  msg.innerHTML = `<span style="color: green;">✅ Pacote liberado! Você pode abrir agora.</span>`;
  setTimeout(() => {
    buyModal.classList.add("hidden");
    if (typeof startMidnightCountdown === "function") startMidnightCountdown();
    const pack = document.getElementById("packContainer");
    pack.classList.remove("pack-open");
    const reveal = document.getElementById("cardReveal");
    if (reveal) {
      reveal.classList.remove("visible");
      reveal.innerHTML = "";
    }
  }, 1200);
});

// Roleta
const rewards = [3, 15, 10, 8, 5];

function startRouletteModal() {
  const msg = document.getElementById("rouletteMessage");
  const lastSpin = localStorage.getItem("lastRouletteDate");

  if (lastSpin === new Date().toDateString()) {
    msg.innerHTML = `<span style="color: orange;">⚠️ Você já girou a roleta hoje.</span>`;
  } else {
    msg.innerHTML = "";
  }

  rouletteModal.classList.remove("hidden");
}

rouletteModal.addEventListener("click", e => {
  if (e.target === rouletteModal) rouletteModal.classList.add("hidden");
});

document.getElementById("spinRoulette").addEventListener("click", () => {
  const msg = document.getElementById("rouletteMessage");

  if (localStorage.getItem("lastRouletteDate") === new Date().toDateString()) {
    msg.innerHTML = `<span style="color: orange;">⚠️ Você já girou a roleta hoje.</span>`;
    return;
  }

  const index = Math.floor(Math.random() * rewards.length);
  const reward = rewards[index];
  const angleStep = 360 / rewards.length;
  const offset = angleStep / 2;
  const finalAngle = 360 * 5 + index * angleStep + offset;

  const wheel = document.getElementById("rouletteImage");
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${finalAngle}deg)`;

  wheel.addEventListener("transitionend", () => {
    window.lovePoints += reward;
    localStorage.setItem("lovePoints", window.lovePoints);
    localStorage.setItem("lastRouletteDate", new Date().toDateString());
    paDisplay.textContent = `PA: ${window.lovePoints}`;
    msg.innerHTML = `<span style="color: green;">✅ Você ganhou ${reward} PA!</span>`;
  }, { once: true });
});
