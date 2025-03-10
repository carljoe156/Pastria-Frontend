import React from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Nav />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
