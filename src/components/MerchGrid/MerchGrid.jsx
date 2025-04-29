import React from "react";
import { Link } from "react-router";
import "./MerchGrid.css";

const MerchGrid = ({ merch, addToCart, user }) => {
  return (
    <div className="merch-grid">
      {Array.isArray(merch) && merch.length > 0 ? (
        merch.map((item) => (
          <div key={item._id} className="merch-card">
            <img
              src={item.imageUrl || "/default-image.jpg"}
              alt={item.name}
              className="merch-image"
            />
            <div className="merch-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <Link to={`/merch/${item._id}`} className="merch-link">
                View Details
              </Link>
              <button
                className="merch-button"
                onClick={() => addToCart(item)}
                disabled={!user}
              >
                {user ? "Add to Cart" : "Login to add to cart"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No merch available</div>
      )}
    </div>
  );
};

export default MerchGrid;
