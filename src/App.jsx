import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Product from "./pages/Product/Product";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage/AuthPage";
import { getUser, logOut } from "./utilities/users-services.js";

function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setUser(getUser());
  }, []);

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <>
      <Layout handleLogOut={handleLogOut} user={user}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/authentication"
            element={<AuthPage setUser={setUser} />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
