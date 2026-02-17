import { Link } from "react-router-dom";
import { useStore } from "../store/storeProvider";

const Cart = () => {
  const { cart, totalItems, totalPrice, removeFromCart, updateQty, clearCart } =
    useStore();

  if (!cart || cart.length === 0) {
    return (
      <div style={{ padding: 8 }}>
        <h1 style={{ marginTop: 0 }}>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" style={{ color: "var(--primary)", fontWeight: 900 }}>
          Go back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Cart</h1>
          <p style={{ margin: "6px 0 0", color: "var(--muted)", fontWeight: 700 }}>
            {totalItems} item(s) in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          style={{
            border: "none",
            borderRadius: 12,
            padding: "10px 12px",
            cursor: "pointer",
            background: "rgba(37, 99, 235, 0.10)",
            color: "var(--primary)",
            fontWeight: 1000,
          }}
          type="button"
        >
          <i className="bi bi-trash3" /> Clear
        </button>
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "96px 1fr auto",
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
              alt={item.title ?? item.name}
              style={{
                width: 96,
                height: 76,
                objectFit: "cover",
                borderRadius: 12,
                background: "#f1f5f9",
              }}
            />

            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 1000 }}>
                {item.title ?? item.name}
              </div>

              <div style={{ color: "var(--muted)", fontWeight: 800 }}>
                ${Number(item.price || 0).toFixed(2)}
              </div>

              <div style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "var(--muted)", fontWeight: 900 }}>Qty</span>

                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item.id, Math.max(1, Number(e.target.value) || 1))
                  }
                  style={{
                    width: 80,
                    padding: "8px 10px",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
              <div style={{ fontWeight: 1000 }}>
                ${(Number(item.price || 0) * Number(item.qty || 1)).toFixed(2)}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  border: "none",
                  borderRadius: 12,
                  padding: "10px 12px",
                  cursor: "pointer",
                  background: "rgba(37, 99, 235, 0.10)",
                  color: "var(--primary)",
                  fontWeight: 1000,
                }}
                type="button"
              >
                <i className="bi bi-x-circle" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: 14,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{ color: "var(--muted)", fontWeight: 900 }}>
          Total
        </div>

        <div style={{ fontSize: 18, fontWeight: 1000 }}>
          ${Number(totalPrice || 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
