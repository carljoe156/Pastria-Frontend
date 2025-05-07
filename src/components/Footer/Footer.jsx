import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Our Company Info */}
        <div className="footer-section">
          <h4>About Pastria</h4>
          <p>
            Pastria is a modern bakery platform by ServeSpoon. We bring
            handcrafted delights to your door with innovation and heart.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Pastria, A ServeSpoon Company.
          </p>
        </div>

        {/* Center: Our Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/carljoe156"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/carljoseph156"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/carljoseph156"
                target="_blank"
                rel="noopener noreferrer"
              >
                Personal Website
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Our Site Links */}
        <div className="footer-section">
          <h4>Useful Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/guestbook">GuestBook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
