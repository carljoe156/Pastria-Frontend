import React from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-hero">
      <div className="welcome-text">
        <h1>Welcome to Pastria 🍰</h1>
        <p>
          We’re thrilled to have you here! Browse our delightful selection of
          pastries crafted with love and care.
        </p>
        <a href="#products" className="cta-button">
          Explore the Menu
        </a>
      </div>
      <div className="welcome-image">
        <img src="/images/pastria-hero.avif" alt="Delicious-Pastries" />
      </div>
    </div>
  );
};

export default Welcome;
