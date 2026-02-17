import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./drawer.scss";

const Drawer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setOpen((v) => !v);
    window.addEventListener("drawer_toggle", toggle);
    return () => window.removeEventListener("drawer_toggle", toggle);
  }, []);

  return (
    <>
      <div
        className={`drawerOverlay ${open ? "isOpen" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`drawer ${open ? "isOpen" : ""}`} aria-hidden={!open}>
        <div className="drawer__top">
          <div className="drawer__brand">
            <span className="drawer__logo">FakeStore</span>
            <span className="drawer__tag">navigation</span>
          </div>

          <button className="drawer__close" onClick={() => setOpen(false)} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="drawer__nav">
          <Link to="/" onClick={() => setOpen(false)} className="drawer__link">
            <i className="bi bi-house-door" />
            Home
          </Link>

          <Link to="/cart" onClick={() => setOpen(false)} className="drawer__link">
            <i className="bi bi-cart3" />
            Cart
          </Link>

          <Link to="/wishlist" onClick={() => setOpen(false)} className="drawer__link">
            <i class="bi bi-star"></i>
            Wish list
          </Link>

          <Link to="/notification" onClick={() => setOpen(false)} className="drawer__link">
            <i class="bi bi-bell"></i>
            Notifications
          </Link>

          <Link to="/profile" onClick={() => setOpen(false)} className="drawer__link">
            <i class="bi bi-person"></i>
            Profile
          </Link>

          <Link to="/setting" onClick={() => setOpen(false)} className="drawer__link">
            <i class="bi bi-gear"></i>
            Settings
          </Link>
        </nav>

        <div className="drawer__footer">© FakeStore</div>
      </aside>
    </>
  );
};

export default Drawer;
