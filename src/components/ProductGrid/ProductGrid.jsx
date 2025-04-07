import React from "react";
import { Link } from "react-router";
import "./ProductGrid";

const ProductGrid = ({ products, addToCart, user }) => {
  return (
    <div className="product-grid">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl || "/default-image.jpg"}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <Link to={`/product/${product._id}`} className="product-link">
                View Details
              </Link>
              <button
                className="product-button"
                onClick={() => addToCart(product)}
                disabled={!user}
              >
                {user ? "Add to Cart" : "Login to add to cart"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default ProductGrid;
