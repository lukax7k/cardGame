const CARD_DATA = [
  { id: 1, rarity: 'comum' },
  { id: 2, rarity: 'comum' },
  { id: 3, rarity: 'comum' },
  { id: 4, rarity: 'comum' },
  { id: 5, rarity: 'comum' },
  { id: 6, rarity: 'comum' },
  { id: 7, rarity: 'comum' },
  { id: 8, rarity: 'comum' },
  { id: 9, rarity: 'rara' },
  { id: 10, rarity: 'rara' },
  { id: 11, rarity: 'rara' },
  { id: 12, rarity: 'rara' },
  { id: 13, rarity: 'épica' },
  { id: 14, rarity: 'épica' },
  { id: 15, rarity: 'épica' },
  { id: 16, rarity: 'épica' },
  { id: 17, rarity: 'super rara' },
  { id: 18, rarity: 'super rara' },
  { id: 19, rarity: 'super rara' },
  { id: 20, rarity: 'super rara' },
  { id: 21, rarity: 'comum' },
  { id: 22, rarity: 'comum' },
  { id: 23, rarity: 'comum' },
  { id: 24, rarity: 'rara' },
  { id: 25, rarity: 'rara' },
  { id: 26, rarity: 'épica' },
  { id: 27, rarity: 'épica' },
  { id: 28, rarity: 'super rara' },
  { id: 29, rarity: 'super rara' },
  { id: 30, rarity: 'super rara' },
  { id: 31, rarity: 'comum' },
  { id: 32, rarity: 'comum' },
  { id: 33, rarity: 'épica' },
  { id: 34, rarity: 'super rara' },
  { id: 35, rarity: 'super rara' },
  { id: 36, rarity: 'comum' },
  { id: 37, rarity: 'rara' },
  { id: 38, rarity: 'rara' },
  { id: 39, rarity: 'rara' },
  { id: 40, rarity: 'épica' },
  { id: 41, rarity: 'rara' },
  { id: 42, rarity: 'rara' },
  { id: 43, rarity: 'épica' },
  { id: 44, rarity: 'rara' },
  { id: 45, rarity: 'super rara' },
  { id: 46, rarity: 'comum' },
  { id: 47, rarity: 'comum' },
  { id: 48, rarity: 'rara' },
  { id: 49, rarity: 'rara' },
  { id: 50, rarity: 'épica' },
  { id: 51, rarity: 'comum' },
  { id: 52, rarity: 'comum' },
  { id: 53, rarity: 'comum' },
  { id: 54, rarity: 'rara' },
  { id: 55, rarity: 'rara' },
  { id: 56, rarity: 'épica' },
  { id: 57, rarity: 'épica' },
  { id: 58, rarity: 'épica' },
  { id: 59, rarity: 'épica' },
  { id: 60, rarity: 'super rara' },
  { id: 61, rarity: 'super rara' },
  { id: 62, rarity: 'super rara' },
  { id: 63, rarity: 'super rara' },
  { id: 64, rarity: 'rara' },
  { id: 65, rarity: 'comum' },
  { id: 66, rarity: 'comum' },
  { id: 67, rarity: 'rara' },
  { id: 68, rarity: 'rara' },
  { id: 69, rarity: 'épica' },
  { id: 70, rarity: 'épica' },
  { id: 71, rarity: 'comum' },
  { id: 72, rarity: 'comum' },
  { id: 73, rarity: 'comum' },
  { id: 74, rarity: 'comum' },
  { id: 75, rarity: 'rara' },
  { id: 76, rarity: 'rara' },
  { id: 77, rarity: 'rara' },
  { id: 78, rarity: 'rara' },
  { id: 79, rarity: 'épica' },
  { id: 80, rarity: 'épica' },
  { id: 81, rarity: 'épica' },
  { id: 82, rarity: 'super rara' },
  { id: 83, rarity: 'super rara' },
  { id: 84, rarity: 'super rara' },
  { id: 85, rarity: 'comum' },
  { id: 86, rarity: 'comum' },
  { id: 87, rarity: 'rara' },
  { id: 88, rarity: 'rara' },
  { id: 89, rarity: 'épica' },
  { id: 90, rarity: 'épica' },
  { id: 91, rarity: 'épica' },
  { id: 92, rarity: 'super rara' },
  { id: 93, rarity: 'super rara' },
];

// comuns: 27 | raras: 25 | épicas: 20 | super raras: 19

const rarityWeights = {
  'comum': 40,
  'rara': 30,
  'épica': 20,
  'super rara': 10
};



function getCardsByRarity(rarity) {
  return CARD_DATA.filter(card => card.rarity === rarity);
}

function getRandomRarity() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    cumulative += weight;
    if (rand <= cumulative) return rarity;
  }
  return 'comum';
}

function getWeightedRandomCard() {
  const rarity = getRandomRarity();
  const pool = getCardsByRarity(rarity);
  const randomCard = pool[Math.floor(Math.random() * pool.length)];
  return randomCard.id;
}

function getRandomCards(quantity = 5) {
  const selected = new Set();

  while (selected.size < quantity) {
    const id = getWeightedRandomCard();
    selected.add(id);
  }

  return [...selected];
}

function createCardElement(id) {
  const div = document.createElement("div");
  div.className = "card";
  div.dataset.cardId = id;

  const img = document.createElement("img");
  img.src = `./assets/portraits/${id}.png`;
  img.alt = `Carta ${id}`;
  div.appendChild(img);

  return div;
}
