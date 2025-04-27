import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import MerchGrid from "../../components/MerchGrid/MerchGrid";
import "./Shop.css";

const Shop = ({ addToCart, user }) => {
  const [view, setView] = useState("products");
  const [products, setProducts] = useState([]);
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (view === "products" && products.length === 0) {
          const res = await axios.get("http://localhost:5000/api/product");
          setProducts(res.data);
        } else if (view === "merch" && merch.length === 0) {
          const res = await axios.get("http://localhost:5000/api/merch");
          setMerch(res.data);
        }
      } catch (err) {
        setError(`Failed to fetch ${view}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [view]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="shop-image">
      <img src="/images/pastria-baking.jpg" alt="Delicious-Pastries-Baked" />

      <div className="shop-page">
        <div className="shop-toggle">
          <button
            className={view === "products" ? "active" : ""}
            onClick={() => setView("products")}
          >
            Pastries
          </button>
          <button
            className={view === "merch" ? "active" : ""}
            onClick={() => setView("merch")}
          >
            Merch
          </button>
        </div>

        <h2>{view === "products" ? "Shop Our Pastries" : "Shop Our Merch"}</h2>

        {view === "products" ? (
          <ProductGrid products={products} addToCart={addToCart} user={user} />
        ) : (
          <MerchGrid merch={merch} addToCart={addToCart} user={user} />
        )}
      </div>
    </div>
  );
};

export default Shop;
