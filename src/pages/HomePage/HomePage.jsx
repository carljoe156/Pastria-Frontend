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
    <div className="homepage-container">
      <section className="welcome-section">
        <Welcome />
      </section>

      <section className="products-section" id="products">
        <h2 className="section-title">Our Freshest Bakes</h2>

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
      </section>

      <section className="testimonials-section">
        <h2 className="section-title-testimonials">What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"These pastries are pure magic! 10/10!"</p>
            <span>- Sarah, NYC</span>
          </div>
          <div className="testimonial-card">
            <p>
              "Every bite feels like a hug. Highly recommend the croissants!"
            </p>
            <span>- Omar, Brooklyn</span>
          </div>
          <div className="testimonial-card">
            <p>
              "Best afternoon treat spot ever. The vibes and bakes are
              unmatched."
            </p>
            <span>- Lily, Queens</span>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <h2 className="section-title">Stay in the Pastry Loop</h2>
        <p>
          Get sweet updates, seasonal specials, and more straight to your inbox.
        </p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
