const CART_KEY = "fakestore_cart_v1";

export const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart_updated"));
  } catch {}
};

export const addToCart = (cart, product, qty = 1) => {
  const safeQty = Math.max(1, Number(qty) || 1);
  const existing = cart.find((i) => i.id === product.id);

  // ✅ compat: si algún día llega "name", lo convertimos
  const title = product.title ?? product.name ?? "Product";

  if (existing) {
    return cart.map((i) =>
      i.id === product.id ? { ...i, qty: i.qty + safeQty } : i
    );
  }

  return [
    ...cart,
    {
      id: product.id,
      title,
      price: product.price,
      image: product.image,
      qty: safeQty,
      category: product.category,
    },
  ];
};

export const updateQty = (cart, productId, qty) => {
  const safeQty = Math.max(1, Number(qty) || 1);
  return cart.map((i) => (i.id === productId ? { ...i, qty: safeQty } : i));
};

export const removeFromCart = (cart, productId) =>
  cart.filter((i) => i.id !== productId);

export const clearCart = () => {
  try {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new CustomEvent("cart_updated"));
  } catch {}
};

export const getCartCount = (cart) => cart.reduce((t, i) => t + i.qty, 0);
export const getCartTotal = (cart) => cart.reduce((t, i) => t + i.price * i.qty, 0);
