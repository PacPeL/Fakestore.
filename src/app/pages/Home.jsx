import { useEffect, useMemo, useState } from "react";
import "../styles/pages/_home.scss";
import ProductModal from "../components/productModal/ProductModal";

const Home = () => {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ mock products (schema real: title/category/description/image/price)
  // + fallback (name/rating) para no romper mientras migras
  const products = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, idx) => ({
        id: idx + 1,
        title: `Product ${idx + 1}`,
        price: 120 + idx * 18,
        description:
          "Quick preview description. Full details will be available in product page and API later.",
        category: idx % 2 === 0 ? "Smartphones" : "Accessories",
        image:
          "https://images.unsplash.com/photo-1512446816042-444d64126780?auto=format&fit=crop&w=1200&q=70",
        // opcional (si tu UI lo usa todavía)
        rating: 4,
        // compat por si aún tienes código que usa name
        name: `Product ${idx + 1}`,
      })),
    []
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onFiltersClick = () => {
    if (isMobile) setMobileFilters(true);
    else setFiltersOpen((v) => !v);
  };

  const getTitle = (p) => p.title ?? p.name ?? "Product";
  const getCategory = (p) => p.category ?? "—";

  return (
    <div className="shop">
      {/* categories bar */}
      <div className="shop__cats">
        <button className="cat active">All</button>
        <button className="cat">Smartphones</button>
        <button className="cat">Laptops</button>
        <button className="cat">Tablets</button>
        <button className="cat">Accessories</button>
        <button className="cat">Smart Home</button>
        <button className="cat">Games</button>
      </div>

      <div className={`shop__body ${filtersOpen ? "" : "filters-collapsed"}`}>
        {/* desktop filters */}
        {!isMobile && (
          <aside className="filters">
            <div className="filters__top">
              <div className="filters__title">Filters</div>
              <div className="filters__hint">Refine results</div>
            </div>
            <FiltersContent />
          </aside>
        )}

        {/* catalog */}
        <section className="catalog">
          <div className="catalog__top">
            <button
              className="filtersToggle"
              onClick={onFiltersClick}
              type="button"
            >
              <i className="bi bi-sliders" />
              <span>Filters</span>
            </button>

            <div className="catalog__meta">
              Showing <b>1-9</b> of <b>156</b> products
            </div>

            <div className="catalog__sort">
              <span>Sort:</span>
              <select>
                <option>Most popular</option>
                <option>Best rating</option>
                <option>Lowest price</option>
                <option>Highest price</option>
              </select>
            </div>
          </div>

          <div className="grid">
            {products.map((p) => (
              <article
                className="card"
                key={p.id}
                onClick={() => setSelectedProduct(p)}
              >
                <div className="card__img">
                  <img src={p.image} alt={getTitle(p)} loading="lazy" />
                </div>

                <div className="card__body">
                  <div className="card__title">{getTitle(p)}</div>

                  <div className="card__meta">
                    {/* ✅ si quieres mantener rating, lo dejamos */}
                    {typeof p.rating === "number" ? (
                      <>
                        <span className="stars">
                          <i className="bi bi-star-fill" />
                          {p.rating}
                        </span>
                        <span className="dot">•</span>
                      </>
                    ) : null}

                    {/* ✅ category del schema real */}
                    <span className="dot">{getCategory(p)}</span>
                    <span className="dot">•</span>

                    {/* ✅ price seguro */}
                    <span className="price">
                      ${Number(p.price || 0).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="card__btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(p);
                    }}
                    type="button"
                  >
                    <i className="bi bi-eye" />
                    Quick view
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* mobile filters panel */}
      {mobileFilters && (
        <div className="filtersModal">
          <div
            className="filtersModal__overlay"
            onClick={() => setMobileFilters(false)}
          />

          <div className="filtersModal__panel">
            <div className="filtersModal__header">
              <span>Filters</span>
              <button
                onClick={() => setMobileFilters(false)}
                aria-label="Close filters"
                type="button"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <FiltersContent />

            <button
              className="filtersModal__apply"
              onClick={() => setMobileFilters(false)}
              type="button"
            >
              Apply filters
            </button>
          </div>
        </div>
      )}

      {/* product modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

const FiltersContent = () => (
  <>
    <div className="filters__section">
      <div className="filters__label">Category</div>
      <label className="check">
        <input type="checkbox" /> Smartphones
      </label>
      <label className="check">
        <input type="checkbox" /> Laptops
      </label>
      <label className="check">
        <input type="checkbox" /> Tablets
      </label>
      <label className="check">
        <input type="checkbox" /> Accessories
      </label>
    </div>

    <div className="filters__section">
      <div className="filters__label">Brand</div>
      <label className="check">
        <input type="checkbox" /> Apple
      </label>
      <label className="check">
        <input type="checkbox" /> Samsung
      </label>
      <label className="check">
        <input type="checkbox" /> Xiaomi
      </label>
      <label className="check">
        <input type="checkbox" /> Dell
      </label>
    </div>

    <div className="filters__section">
      <div className="filters__label">Rating</div>
      <label className="radio">
        <input name="r" type="radio" /> 5 stars
      </label>
      <label className="radio">
        <input name="r" type="radio" /> 4+ stars
      </label>
      <label className="radio">
        <input name="r" type="radio" /> 3+ stars
      </label>
    </div>
  </>
);

export default Home;
