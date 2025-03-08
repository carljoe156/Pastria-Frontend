import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Our Left Section */}
        <div className="footer-left">
          <p>
            &copy; {new Date().getFullYear()} Pastria, A ServeSpoon Company. All
            rights reserved.
          </p>
        </div>

        {/* Our Center Section */}
        <div className="footer-center">
          <p>Follow me on:</p>
          <div className="social-links">
            <a
              href="https://github.com/carljoe156"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://linkedin.com/in/carljoseph156"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://linkedin.com/in/carljoseph156"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Personal Website
            </a>
          </div>
        </div>

        {/* Our Right Section */}
        <div className="footer-right">
          <a href="/guestbook" className="footer-link">
            GuestBook
          </a>
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="footer-link">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
