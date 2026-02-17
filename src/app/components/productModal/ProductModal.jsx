import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCart, saveCart, addToCart } from "../../services/cartService";
import "./productModal.scss";

const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  const total = (product.price * qty).toFixed(2);

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  const handleAdd = () => {
    const cart = loadCart();
    const updated = addToCart(cart, product, qty);
    saveCart(updated);
    onClose();
  };

  const goToPage = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="pmodal">
      <div className="pmodal__overlay" onClick={onClose} />

      <div
        className="pmodal__card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="pmodal__close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg" />
        </button>

        <div className="pmodal__content">
          <div className="pmodal__imgWrap">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="pmodal__info">
            <h2 className="pmodal__title">{product.title}</h2>

            <div className="pmodal__chips">
              <span className="chip">
                <i className="bi bi-tag" /> {product.category}
              </span>
            </div>

            <div className="pmodal__price">${product.price.toFixed(2)}</div>

            <p className="pmodal__desc">{product.description}</p>

            <div className="pmodal__qty">
              <span className="pmodal__label">Quantity</span>

              <div className="qtyBox">
                <button onClick={decrease} aria-label="Decrease">
                  <i className="bi bi-dash" />
                </button>
                <span>{qty}</span>
                <button onClick={increase} aria-label="Increase">
                  <i className="bi bi-plus" />
                </button>
              </div>
            </div>

            <div className="pmodal__total">
              Total: <b>${total}</b>
            </div>

            <div className="pmodal__actions">
              <button className="pmodal__add" onClick={handleAdd} type="button">
                <i className="bi bi-cart3" />
                Add to cart
              </button>

              <button className="pmodal__link" onClick={goToPage} type="button">
                <i className="bi bi-box-arrow-up-right" />
                View full page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
