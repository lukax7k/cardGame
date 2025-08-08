window.ACHIEVEMENTS = [
  {
  id: "open1Packs",
  name: "Iniciante",
  description: "Abra 1 pacote de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 1,
  reward: 5
},

 {
  id: "open5Packs",
  name: "Explorador",
  description: "Abra 5 pacotes de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 5,
  reward: 5
},
{
  id: "open10Packs",
  name: "Empolgado",
  description: "Abra 10 pacotes de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 10,
  reward: 5
},
{
  id: "open20Packs",
  name: "Viciado",
  description: "Abra 20 pacotes de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 20,
  reward: 5
},
{
  id: "open30Packs",
  name: "Acumulador",
  description: "Abra 30 pacotes de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 30,
  reward: 10
},
{
  id: "open50Packs",
  name: "Colecionador Sênior",
  description: "Abra 50 pacotes de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 50,
  reward: 10
},
{
  id: "open70Packs",
  name: "Incansável",
  description: "Abra 70 pacotes de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 70,
  reward: 15
},
{
  id: "open100Packs",
  name: "Devorador de Pacotes",
  description: "Abra 100 pacotes de cartas.",
  condition: () => parseInt(localStorage.getItem("openedPacks") || "0") >= 100,
  reward: 20
},

{
  id: "collect10Cards",
  name: "Amante de Cartas",
  description: "Colete 20 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 10,
  reward: 5
},
{
  id: "collect20Cards",
  name: "Amante de Cartas",
  description: "Colete 20 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 20,
  reward: 5
},
{
  id: "collect30Cards",
  name: "Curador de Cartas",
  description: "Colete 30 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 30,
  reward: 5
},
{
  id: "collect40Cards",
  name: "Galerista",
  description: "Colete 40 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 40,
  reward: 5
},
{
  id: "collect50Cards",
  name: "Enciclopédia Ilustrada",
  description: "Colete 50 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 50,
  reward: 10
},
{
  id: "collect60Cards",
  name: "Arqueólogo de Cartas",
  description: "Colete 60 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 60,
  reward: 10
},
{
  id: "collect70Cards",
  name: "Lenda das Cartas",
  description: "Colete 70 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 70,
  reward: 15
},
{
  id: "collect80Cards",
  name: "Colecionador Lendário",
  description: "Colete 80 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 80,
  reward: 20
},

{
  id: "collect80Cards",
  name: "Divindade Colecionadora",
  description: "Colete 90 cartas diferentes.",
  condition: () => Object.keys(JSON.parse(localStorage.getItem("collection") || "{}")).length >= 90,
  reward: 20
},

{
  id: "upgrade1Lvl1",
  name: "Primeira Melhoria",
  description: "Aprimore 1 carta ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 1,
  reward: 5
},
{
  id: "upgrade3Lvl1",
  name: "Melhorando Rápido",
  description: "Aprimore 3 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 3,
  reward: 5
},
{
  id: "upgrade5Lvl1",
  name: "Upgrade Intermediário",
  description: "Aprimore 5 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 5,
  reward: 5
},
{
  id: "upgrade10Lvl1",
  name: "Oficina de Melhorias",
  description: "Aprimore 10 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 10,
  reward: 5
},
{
  id: "upgrade20Lvl1",
  name: "Melhoria em Massa",
  description: "Aprimore 20 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 20,
  reward: 5
},
{
  id: "upgrade30Lvl1",
  name: "Especialista em Nível 1",
  description: "Aprimore 30 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 30,
  reward: 10
},
{
  id: "upgrade40Lvl1",
  name: "Aprimorador Mestre",
  description: "Aprimore 40 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 40,
  reward: 10
},
{
  id: "upgrade50Lvl1",
  name: "Aprimorador Supremo",
  description: "Aprimore 50 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 50,
  reward: 10
},
{
  id: "upgrade60Lvl1",
  name: "Engenheiro de Cartas",
  description: "Aprimore 60 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 60,
  reward: 10
},
{
  id: "upgrade70Lvl1",
  name: "Arquiteto de Cartas",
  description: "Aprimore 70 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 70,
  reward: 15
},
{
  id: "upgrade80Lvl1",
  name: "Mestre de Melhorias",
  description: "Aprimore 80 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 80,
  reward: 20
},

{
  id: "upgrade90Lvl1",
  name: "Beldade de Melhorias",
  description: "Aprimore 90 cartas ao nível 1.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 1).length >= 90,
  reward: 20
},

{
  id: "upgrade1Lvl2",
  name: "Foil Brilhante",
  description: "Aprimore 1 carta ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 1,
  reward: 5
},
{
  id: "upgrade3Lvl2",
  name: "Foilista",
  description: "Aprimore 3 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 3,
  reward: 5
},
{
  id: "upgrade5Lvl2",
  name: "Foilador",
  description: "Aprimore 5 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 5,
  reward: 5
},
{
  id: "upgrade10Lvl2",
  name: "Foil Avançado",
  description: "Aprimore 10 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 10,
  reward: 5
},
{
  id: "upgrade20Lvl2",
  name: "Colecionador Foil",
  description: "Aprimore 20 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 20,
  reward: 10
},
{
  id: "upgrade30Lvl2",
  name: "Mestre Foil",
  description: "Aprimore 30 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 30,
  reward: 10
},
{
  id: "upgrade40Lvl2",
  name: "Foil Supremo",
  description: "Aprimore 40 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 40,
  reward: 15
},
{
  id: "upgrade50Lvl2",
  name: "Rei do Foil",
  description: "Aprimore 50 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 50,
  reward: 15
},
{
  id: "upgrade60Lvl2",
  name: "Coleção Dourada",
  description: "Aprimore 60 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 60,
  reward: 20
},
{
  id: "upgrade70Lvl2",
  name: "Cartas Impecáveis",
  description: "Aprimore 70 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 70,
  reward: 20
},
{
  id: "upgrade80Lvl2",
  name: "Obra-prima de Cartas",
  description: "Aprimore 80 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 80,
  reward: 20
},
{
  id: "upgrade90Lvl2",
  name: "Dourado dourado dourado",
  description: "Aprimore 90 cartas ao nível 2.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 2).length >= 90,
  reward: 20
},

{
  id: "upgrade1Lvl3",
  name: "Brilho Superior",
  description: "Aprimore 1 carta ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 1,
  reward: 5
},
{
  id: "upgrade3Lvl3",
  name: "Trinca Reluzente",
  description: "Aprimore 3 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 3,
  reward: 5
},
{
  id: "upgrade5Lvl3",
  name: "Lapidador",
  description: "Aprimore 5 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 5,
  reward: 5
},
{
  id: "upgrade10Lvl3",
  name: "Aprimorador Sênior",
  description: "Aprimore 10 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 10,
  reward: 5
},
{
  id: "upgrade20Lvl3",
  name: "Especialista em Foil",
  description: "Aprimore 20 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 20,
  reward: 10
},
{
  id: "upgrade30Lvl3",
  name: "Encantador de Cartas",
  description: "Aprimore 30 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 30,
  reward: 10
},
{
  id: "upgrade40Lvl3",
  name: "Artesão Lendário",
  description: "Aprimore 40 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 40,
  reward: 15
},
{
  id: "upgrade50Lvl3",
  name: "Dourador Supremo",
  description: "Aprimore 50 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 50,
  reward: 15
},
{
  id: "upgrade60Lvl3",
  name: "Obra Dourada",
  description: "Aprimore 60 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 60,
  reward: 20
},
{
  id: "upgrade70Lvl3",
  name: "Forjador de Relíquias",
  description: "Aprimore 70 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 70,
  reward: 20
},
{
  id: "upgrade80Lvl3",
  name: "Legado Brilhante",
  description: "Aprimore 80 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 80,
  reward: 20
},
{
  id: "upgrade90Lvl3",
  name: "Mestre Absoluto do Foil",
  description: "Aprimore 90 cartas ao nível 3.",
  condition: () => Object.values(JSON.parse(localStorage.getItem("upgrades") || "{}")).filter(lv => lv >= 3).length >= 90,
  reward: 20
},

{
  id: "spin1",
  name: "Primeira Girada",
  description: "Gire a Roleta do Amor 1 vez.",
  condition: () => parseInt(localStorage.getItem("rouletteSpins") || "0") >= 1,
  reward: 5
},
{
  id: "spin2",
  name: "Girador Iniciante",
  description: "Gire a Roleta do Amor 2 vezes.",
  condition: () => parseInt(localStorage.getItem("rouletteSpins") || "0") >= 2,
  reward: 5
},
{
  id: "spin3",
  name: "Girador Frequente",
  description: "Gire a Roleta do Amor 3 vezes.",
  condition: () => parseInt(localStorage.getItem("rouletteSpins") || "0") >= 3,
  reward: 5
},
{
  id: "spin5",
  name: "Girador Viciado",
  description: "Gire a Roleta do Amor 5 vezes.",
  condition: () => parseInt(localStorage.getItem("rouletteSpins") || "0") >= 5,
  reward: 5
},
{
  id: "spin10",
  name: "Rodando o Destino",
  description: "Gire a Roleta do Amor 10 vezes.",
  condition: () => parseInt(localStorage.getItem("rouletteSpins") || "0") >= 10,
  reward: 10
},
{
  id: "spin20",
  name: "Roleta do Amor",
  description: "Gire a Roleta do Amor 20 vezes.",
  condition: () => parseInt(localStorage.getItem("rouletteSpins") || "0") >= 20,
  reward: 10
},
{
  id: "spin30",
  name: "Amor Giratório",
  description: "Gire a Roleta do Amor 30 vezes.",
  condition: () => parseInt(localStorage.getItem("rouletteSpins") || "0") >= 30,
  reward: 10
},

{
  id: "shopBuy1",
  name: "Primeira Compra",
  description: "Compre 1 cópia na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 1,
  reward: 5
},
{
  id: "shopBuy3",
  name: "Comprador Casual",
  description: "Compre 3 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 3,
  reward: 5
},
{
  id: "shopBuy5",
  name: "Cliente Frequente",
  description: "Compre 5 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 5,
  reward: 5
},
{
  id: "shopBuy10",
  name: "Fanático por Compras",
  description: "Compre 10 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 10,
  reward: 5
},
{
  id: "shopBuy20",
  name: "Comprador Compulsivo",
  description: "Compre 20 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 20,
  reward: 5
},
{
  id: "shopBuy30",
  name: "Mestre da Loja",
  description: "Compre 30 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 30,
  reward: 10
},

{
  id: "shopBuy40",
  name: "Cartão Fidelidade",
  description: "Compre 40 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 40,
  reward: 10
},

{
  id: "shopBuy50",
  name: "Dono da loja",
  description: "Compre 50 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 50,
  reward: 10
},

{
  id: "shopBuy60",
  name: "CEO",
  description: "Compre 60 cópias na loja.",
  condition: () => parseInt(localStorage.getItem("shopPurchases") || "0") >= 60,
  reward: 15
},


];
