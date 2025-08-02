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
  { id: 35, rarity: 'super rara' }
];

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

function getRandomCards(quantity = 3) {
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
