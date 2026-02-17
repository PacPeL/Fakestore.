import { useEffect, useState } from "react";
import { loadCart, getCartTotal, saveCart, removeFromCart, updateQty, clearCart } from "../services/cartService";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  const onRemove = (id) => {
    const next = removeFromCart(cart, id);
    setCart(next);
    saveCart(next);
  };

  const onQty = (id, qty) => {
    const next = updateQty(cart, id, qty);
    setCart(next);
    saveCart(next);
  };

  const total = getCartTotal(cart).toFixed(2);

  return (
    <div style={{ padding: 8 }}>
      <h1 style={{ marginTop: 0 }}>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: 10 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr auto",
                  gap: 12,
                  alignItems: "center",
                  padding: 12,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  boxShadow: "var(--shadow)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 90, height: 70, objectFit: "cover", borderRadius: 12 }}
                />

                <div>
                  <div style={{ fontWeight: 1000 }}>{item.name}</div>
                  <div style={{ color: "var(--muted)" }}>${item.price.toFixed(2)}</div>

                  <div style={{ display: "inline-flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                    <span style={{ color: "var(--muted)", fontWeight: 900 }}>Qty</span>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => onQty(item.id, e.target.value)}
                      style={{
                        width: 70,
                        padding: "8px 10px",
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    border: "none",
                    borderRadius: 12,
                    padding: "10px 12px",
                    cursor: "pointer",
                    background: "rgba(37, 99, 235, 0.10)",
                    color: "var(--primary)",
                    fontWeight: 1000,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <b>Total: ${total}</b>
            <button
              onClick={() => {
                clearCart();
                setCart([]);
              }}
              style={{
                border: "none",
                borderRadius: 12,
                padding: "10px 12px",
                cursor: "pointer",
                background: "var(--primary-2)",
                color: "#fff",
                fontWeight: 1000,
              }}
            >
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
