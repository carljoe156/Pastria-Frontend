import React from "react";
import { Link } from "react-router";

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Link to={`/product/${product.id}`} className="product-link">
                View Details
              </Link>
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
