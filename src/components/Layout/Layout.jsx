import React from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = ({ children, handleLogOut }) => {
  return (
    <div className="layout-container">
      <Nav handleLogOut={handleLogOut} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
