import React from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = ({ children, handleLogOut, user }) => {
  return (
    <div className="layout-container">
      <Nav handleLogOut={handleLogOut} user={user} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
