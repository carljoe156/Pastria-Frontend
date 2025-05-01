import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Nav.css";

const Nav = ({ user, handleLogOut }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = () => {
    handleLogOut();
    setDropdownOpen(false);
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img
            src="/images/pastria-logo.png"
            alt="Pastria Logo"
            className="logo-img"
          />
        </Link>
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
          <Link to="/About" className="link">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/Contact" className="link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link">
            <FaShoppingCart size={25} />
          </Link>
        </li>
        <li className="profile-menu">
          {user ? (
            <div className="dropdown">
              <FaUserCircle
                size={24}
                className="icon-button"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogoutClick}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/authentication" className="link" title="Login">
              <FaUserCircle size={24} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
