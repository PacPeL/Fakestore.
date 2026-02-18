import { useMemo } from "react";
import { useStore } from "../../store/storeProvider";
import "./filtersPanel.scss";

const FiltersPanel = ({ availableCategories = [] }) => {
  const {
    filters,
    toggleCategory,
    setPriceMin,
    setPriceMax,
    setSort,
    clearFilters,
  } = useStore();

  const categories = useMemo(() => {
    return availableCategories.length ? availableCategories : [];
  }, [availableCategories]);

  return (
    <div className="fpanel">
      <div className="fpanel__head">
        <div>
          <div className="fpanel__title">Filters</div>
          <div className="fpanel__sub">Refine results</div>
        </div>

        <button className="fpanel__clear" onClick={clearFilters} type="button">
          <i className="bi bi-arrow-counterclockwise" />
          Clear
        </button>
      </div>

      <div className="fpanel__section">
        <div className="fpanel__label">Category</div>

        <div className="fpanel__list">
          {categories.map((cat) => (
            <label className="fpanel__check" key={cat}>
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="fpanel__section">
        <div className="fpanel__label">Price</div>

        <div className="fpanel__priceRow">
          <div className="fpanel__priceBox">
            <span>Min</span>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="0"
              min={0}
            />
          </div>

          <div className="fpanel__priceBox">
            <span>Max</span>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="999"
              min={0}
            />
          </div>
        </div>
      </div>

      <div className="fpanel__section">
        <div className="fpanel__label">Sort</div>

        <select value={filters.sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popular">Most popular</option>
          <option value="price_asc">Lowest price</option>
          <option value="price_desc">Highest price</option>
          <option value="title_asc">Title A-Z</option>
          <option value="title_desc">Title Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersPanel;
