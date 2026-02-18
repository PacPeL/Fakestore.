import { useEffect, useMemo, useState } from "react";
import "../styles/pages/_home.scss";
import ProductModal from "../components/productModal/ProductModal";
import { useStore } from "../store/storeProvider";
import { getProducts } from "../services/productService";
import FiltersPanel from "../components/filters/filtersPanel";

const Home = () => {
  const { searchQuery, filters, toggleCategory, clearFilters } = useStore();

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const data = await getProducts();
      if (!mounted) return;
      setProducts(data);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onFiltersClick = () => {
    if (isMobile) setMobileFilters(true);
    else setFiltersOpen((v) => !v);
  };

  const availableCategories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    const min = filters.priceMin === "" ? null : Number(filters.priceMin);
    const max = filters.priceMax === "" ? null : Number(filters.priceMax);

    let result = products;

    // search
    if (q) {
      result = result.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        return title.includes(q) || desc.includes(q) || cat.includes(q);
      });
    }

    // categories
    if (filters.categories.length) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // price
    if (min !== null && !Number.isNaN(min)) {
      result = result.filter((p) => Number(p.price || 0) >= min);
    }
    if (max !== null && !Number.isNaN(max)) {
      result = result.filter((p) => Number(p.price || 0) <= max);
    }

    // sort
    const sorted = [...result];
    switch (filters.sort) {
      case "price_asc":
        sorted.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case "price_desc":
        sorted.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      case "title_asc":
        sorted.sort((a, b) => String(a.title).localeCompare(String(b.title)));
        break;
      case "title_desc":
        sorted.sort((a, b) => String(b.title).localeCompare(String(a.title)));
        break;
      default:
        sorted.sort((a, b) => a.id - b.id);
    }

    return sorted;
  }, [products, searchQuery, filters]);

  return (
    <div className="shop">
      {/* categories bar (sincronizada con filtros) */}
      <div className="shop__cats">
        <button
          className={`cat ${filters.categories.length === 0 ? "active" : ""}`}
          onClick={clearFilters}
          type="button"
        >
          All
        </button>

        {availableCategories.map((cat) => {
          const isActive = filters.categories.includes(cat);

          return (
            <button
              key={cat}
              className={`cat ${isActive ? "active" : ""}`}
              onClick={() => toggleCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className={`shop__body ${filtersOpen ? "" : "filters-collapsed"}`}>
        {/* desktop filters */}
        {!isMobile && (
          <aside className="filters">
            <FiltersPanel availableCategories={availableCategories} />
          </aside>
        )}

        <section className="catalog">
          <div className="catalog__top">
            <button className="filtersToggle" onClick={onFiltersClick} type="button">
              <i className="bi bi-sliders" />
              <span>Filters</span>
            </button>

            <div className="catalog__meta">
              {loading ? (
                <span>Loading products...</span>
              ) : (
                <>
                  Showing <b>{filteredProducts.length}</b> product(s)
                </>
              )}
            </div>
          </div>

          <div className="grid">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => (
                  <div className="card skeleton" key={i}>
                    <div className="card__img" />
                    <div className="card__body">
                      <div className="skLine" />
                      <div className="skLine sm" />
                      <div className="skBtn" />
                    </div>
                  </div>
                ))
              : filteredProducts.map((p) => (
                  <article className="card" key={p.id} onClick={() => setSelectedProduct(p)}>
                    <div className="card__img">
                      <img src={p.image} alt={p.title} loading="lazy" />
                    </div>

                    <div className="card__body">
                      <div className="card__title">{p.title}</div>

                      <div className="card__meta">
                        <span className="dot">{p.category}</span>
                        <span className="dot">•</span>
                        <span className="price">${Number(p.price || 0).toFixed(2)}</span>
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

          {!loading && filteredProducts.length === 0 && (
            <div style={{ padding: 14, color: "var(--muted)", fontWeight: 900 }}>
              No products match your filters.
            </div>
          )}
        </section>
      </div>

      {/* mobile filters panel */}
      {mobileFilters && (
        <div className="filtersModal">
          <div className="filtersModal__overlay" onClick={() => setMobileFilters(false)} />

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

            <FiltersPanel availableCategories={availableCategories} />

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
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default Home;
