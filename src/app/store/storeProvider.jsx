import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

const CART_KEY = "fakestore_cart";

const defaultFilters = {
  categories: [], // ["Smartphones", "Laptops"...]
  priceMin: "",
  priceMax: "",
  sort: "popular", // popular | price_asc | price_desc | title_asc | title_desc
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ filtros globales
  const [filters, setFilters] = useState(defaultFilters);

  // ===== cart persist =====
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // ===== cart actions =====
  const addToCart = (product, qty = 1) => {
    const safeQty = Math.max(1, Number(qty) || 1);

    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + safeQty } : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title ?? product.name ?? "Product",
          price: Number(product.price || 0),
          image: product.image,
          qty: safeQty,
          category: product.category,
        },
      ];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id, qty) => {
    const safeQty = Math.max(1, Number(qty) || 1);
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: safeQty } : p)));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((a, b) => a + b.qty, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((a, b) => a + b.qty * b.price, 0), [cart]);

  // ===== filters actions =====
  const toggleCategory = (cat) => {
    setFilters((prev) => {
      const has = prev.categories.includes(cat);
      return {
        ...prev,
        categories: has ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat],
      };
    });
  };

  const setPriceMin = (v) => setFilters((prev) => ({ ...prev, priceMin: v }));
  const setPriceMax = (v) => setFilters((prev) => ({ ...prev, priceMax: v }));
  const setSort = (v) => setFilters((prev) => ({ ...prev, sort: v }));

  const clearFilters = () => setFilters(defaultFilters);

  return (
    <StoreContext.Provider
      value={{
        // cart
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,

        // search
        searchQuery,
        setSearchQuery,

        // filters
        filters,
        toggleCategory,
        setPriceMin,
        setPriceMax,
        setSort,
        clearFilters,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
