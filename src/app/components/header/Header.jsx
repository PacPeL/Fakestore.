import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadCart, getCartCount } from "../../services/cartService";
import "./header.scss";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const cart = loadCart();
      setCartCount(getCartCount(cart));
    };

    updateCart();
    window.addEventListener("cart_updated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          className="topbar__menuBtn"
          type="button"
          aria-label="Open menu"
          onClick={() => window.dispatchEvent(new Event("drawer_toggle"))}
        >
          <i className="bi bi-list" />
        </button>

        <Link to="/" className="topbar__logo" aria-label="FakeStore Home">
          FakeStore
        </Link>
      </div>

      <div className="topbar__search">
        <input placeholder="Search products..." />
        <button type="button" aria-label="Search">
          <i className="bi bi-search" />
        </button>
      </div>

      <div className="topbar__right">
        <button className="topbar__iconBtn" type="button" aria-label="Notifications">
          <i className="bi bi-bell" />
        </button>

        <Link to="/cart" className="topbar__iconBtn" aria-label="Cart">
          <i className="bi bi-cart3" />
          {cartCount > 0 && <span className="topbar__badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
