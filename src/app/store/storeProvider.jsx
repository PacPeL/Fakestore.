import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const CART_KEY = "fakestore_cart";

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // cargar carrito al iniciar
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // guardar automáticamente
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // agregar producto
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title ?? product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  // eliminar
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // actualizar cantidad
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((a, b) => a + b.qty, 0);
  const totalPrice = cart.reduce((a, b) => a + b.qty * b.price, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
