import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Cart.css";

function Cart({
  cart,
  userId,
  removeItem,
  updateQuantity,
  fetchCart,
  loading,
}) {
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotal = () => {
    return cart.reduce(
      (acc, item) =>
        item?.productId?.price
          ? acc + item.quantity * item.productId.price
          : acc,
      0
    );
  };

  useEffect(() => {
    if (!userId) return;
    fetchCart();
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [cart]);

  const filteredCart = cart.filter(
    (item) =>
      item?.productId && item?.productId?.price > 0 && item?.quantity > 0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {loading ? (
        <p className="cart-loading">Loading your cart...</p>
      ) : filteredCart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {filteredCart.map((item) => (
            <li key={`${item.productId._id}-${item._id}`} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.productId?.imageUrl}
                  alt={item.productId?.name}
                  className="cart-item-img"
                />

                <span className="cart-item-name">{item.productId?.name}</span>

                <span className="cart-item-quantity">
                  ${item.cproductId?.price} x {item.quantity}
                </span>
              </div>
              <div className="cart-item-buttons">
                <button
                  onClick={() => removeItem(item._id)}
                  className="cart-item-btn remove-btn"
                >
                  Remove
                </button>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="cart-item-btn increase-btn"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="cart-item-btn decrease-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        Total: <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="proceed-btn-container">
        <Link to="/checkout" state={{ cart: filteredCart, totalPrice }}>
          <button className="proceed-btn">Proceed to checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
