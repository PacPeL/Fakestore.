import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./app/components/layout/Layout";
import Home from "./app/pages/Home";
import Cart from "./app/pages/Cart";
import ProductDetail from "./app/pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
