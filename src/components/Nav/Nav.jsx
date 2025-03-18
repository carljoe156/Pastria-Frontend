import React from "react";
import { Link } from "react-router";
import "./Nav.css";

const Nav = ({ user, handleLogOut }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Pastria </h1>
      </div>
      <ul>
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Shop" className="link">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/about" className="link">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link">
            Cart
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={handleLogOut}>Logout</button>
          ) : (
            <Link to="/authentication">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
