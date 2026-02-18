// Simula tu backend (MongoDB API)
// Más adelante, aquí cambias a fetch("http://tu-api/products") y listo.

const mockProducts = Array.from({ length: 24 }).map((_, idx) => {
  const id = idx + 1;

  const categories = [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Accessories",
    "Smart Home",
    "Games",
  ];

  const category = categories[idx % categories.length];

  return {
    id,
    title: `Product ${id}`,
    price: 79 + id * 7.35,
    description:
      "Mock product from productService. Later this comes from MongoDB API.",
    category,
    image:
      "https://images.unsplash.com/photo-1512446816042-444d64126780?auto=format&fit=crop&w=1200&q=70",
  };
});

// simula delay de red
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getProducts() {
  await sleep(250);
  return mockProducts;
}

export async function getProductById(id) {
  await sleep(200);
  return mockProducts.find((p) => p.id === Number(id)) || null;
}
