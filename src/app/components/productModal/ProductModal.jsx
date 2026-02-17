import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/storeProvider"; 
import "./productModal.scss";

const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [qty, setQty] = useState(1);

  if (!product) return null;

  // ✅ bloquear scroll + cerrar con ESC
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

  const title = product.title ?? product.name ?? "Product";
  const category = product.category ?? null;

  const safePrice = Number(product.price || 0);
  const total = (safePrice * qty).toFixed(2);

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  const handleAdd = () => {
    addToCart(product, qty);
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
          {/* IMAGE */}
          <div className="pmodal__imgWrap">
            <img src={product.image} alt={title} />
          </div>

          {/* INFO */}
          <div className="pmodal__info">
            <h2 className="pmodal__title">{title}</h2>

            {category && (
              <div className="pmodal__chips">
                <span className="pmodal__chip">
                  <i className="bi bi-tag" />
                  {category}
                </span>
              </div>
            )}

            <div className="pmodal__price">${safePrice.toFixed(2)}</div>

            {product.description && (
              <p className="pmodal__desc">{product.description}</p>
            )}

            <div className="pmodal__qty">
              <span className="pmodal__label">Quantity</span>

              <div className="qtyBox">
                <button onClick={decrease} type="button" aria-label="Decrease quantity">
                  <i className="bi bi-dash" />
                </button>

                <span>{qty}</span>

                <button onClick={increase} type="button" aria-label="Increase quantity">
                  <i className="bi bi-plus" />
                </button>
              </div>
            </div>

            <div className="pmodal__total">
              Total: <b>${total}</b>
            </div>

            {/* ✅ gap bonito + botones pro */}
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
