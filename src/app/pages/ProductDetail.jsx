import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/pages/_productDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();

  const product = useMemo(() => {
    const pid = Number(id);
    return {
      id: pid,
      name: `Product ${pid}`,
      price: 120 + (pid - 1) * 18,
      rating: 4,
      stock: 12,
      image:
        "https://s1.significados.com/foto/producto-og.jpg",
      description:
        "This is the full product page. Later this will come from your backend (MongoDB API).",
    };
  }, [id]);

  return (
    <div className="pdetail">
      <div className="pdetail__crumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Product</span>
        <span>/</span>
        <b>{product.name}</b>
      </div>

      <div className="pdetail__grid">
        <div className="pdetail__img">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="pdetail__info">
          <h1 className="pdetail__title">{product.name}</h1>

          <div className="pdetail__meta">
            <span className="stars">
              <i className="bi bi-star-fill" />
              <b>{product.rating}</b>
              <span className="muted">/ 5</span>
            </span>

            <span className="muted">•</span>
            <span className="muted">Stock: {product.stock}</span>
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
