import { Link } from "react-router-dom";
import { useStore } from "../../store/storeProvider";
import "./header.scss";

const Header = () => {
  const { totalItems, searchQuery, setSearchQuery } = useStore();

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
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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
          {totalItems > 0 && <span className="topbar__badge">{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
