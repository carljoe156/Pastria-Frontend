import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Welcome from "../../components/Welcome/Welcome";
import "./HomePage.css";

const HomePage = ({ addToCart, user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Welcome />

      {loading && (
        <div className="loading">
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <ProductGrid products={products} addToCart={addToCart} user={user} />
      )}
    </div>
  );
};

export default HomePage;
