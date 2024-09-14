export const up = async (db, client) => {
  const wines = [
    { id: 1, name: "MCC Brut Blanc DE Noir", type: "Sparkling", price: 178.00, image: "./assets/wine/mcc_brut_blanc_de_noi.png", description: "A crisp and elegant sparkling wine with notes of citrus and brioche." },
    { id: 2, name: "Syrah", type: "Red", price: 157.00, image: "./assets/wine/syrah.png", description: "A bold and spicy red wine with flavors of blackberry and pepper." },
    { id: 3, name: "Sauvignon Blanc", type: "White", price: 110.00, image: "./assets/wine/sauvignon_blanc.png", description: "A refreshing white wine with vibrant notes of grapefruit and green apple." },
    { id: 4, name: "Pinot Noir", type: "Red-Dry", price: 244.00, image: "./assets/wine/pinot_noir.png", description: "A delicate red wine with aromas of cherry and earthy undertones." },
    { id: 5, name: "Merlot", type: "Red", price: 110.00, image: "./assets/wine/merlot.png", description: "A smooth red wine with flavors of plum and chocolate." },
    { id: 6, name: "Cabernet Sauvignon", type: "Red", price: 110.00, image: "./assets/wine/cabernet_sauvignon.png", description: "A full-bodied red wine with rich flavors of blackcurrant and oak." },
    { id: 7, name: "Chardonnay", type: "White", price: 110.00, image: "./assets/wine/chardonnay.png", description: "A buttery white wine with notes of vanilla and tropical fruits." },
    { id: 14, name: "Sweet Red", type: "Sweet", price: 110.00, image: "./assets/wine/sweet_red.png", description: "A luscious sweet red wine with flavors of ripe berries and a smooth finish." },
    { id: 15, name: "Custom", type: "Custom", price: 200.00, image: "./assets/wine/custom.png", description: "A unique blend crafted to your specific taste preferences." },
  ];

  await db.collection('products').insertMany(wines);
};

export const down = async (db, client) => {
  await db.collection('products').deleteMany({
    name: { $in: [
      "MCC Brut Blanc DE Noir",
      "Syrah",
      "Sauvignon Blanc",
      "Pinot Noir",
      "Merlot",
      "Cabernet Sauvignon",
      "Chardonnay",
      "Sweet Red",
      "Custom"
    ]}
  });
};