import React from "react";
import { useState, useEffect } from "react";
// import { Link } from "react-router";
import axios from "axios";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Welcome from "../../components/Welcome/Welcome";
import "./HomePage.css";

const HomePage = () => {
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

  if (loading) {
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Welcome />
      <ProductGrid products={products} />
    </div>
  );
};

export default HomePage;
