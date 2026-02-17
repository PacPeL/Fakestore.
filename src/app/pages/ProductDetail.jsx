import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/pages/_productDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();

  // ✅ temporal: mock con tu schema (luego viene del backend)
  const product = useMemo(() => {
    const pid = Number(id);
    return {
      id: pid,
      title: `Product ${pid}`,
      price: 120 + (pid - 1) * 18,
      description:
        "Full product page. Here you show full description, specs, seller info, reviews etc. Later it comes from MongoDB API.",
      category: pid % 2 === 0 ? "Smartphones" : "Accessories",
      image:
        "https://images.unsplash.com/photo-1512446816042-444d64126780?auto=format&fit=crop&w=1400&q=70",
    };
  }, [id]);

  return (
    <div className="pdetail">
      <div className="pdetail__crumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <b>{product.title}</b>
      </div>

      <div className="pdetail__grid">
        <div className="pdetail__img">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="pdetail__info">
          <h1 className="pdetail__title">{product.title}</h1>

          <div className="pdetail__meta">
            <span className="muted">
              <i className="bi bi-tag" /> {product.category}
            </span>
          </div>

          <div className="pdetail__price">${product.price.toFixed(2)}</div>

          <p className="pdetail__desc">{product.description}</p>

          <div className="pdetail__panel">
            <div className="pdetail__panelTitle">Specs (placeholder)</div>
            <ul>
              <li>Brand: Example</li>
              <li>Warranty: 12 months</li>
              <li>Shipping: 2-5 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
