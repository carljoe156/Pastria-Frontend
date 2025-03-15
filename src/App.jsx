import React from "react";
import { Routes, Route } from "react-router";
import Product from "./pages/Product/Product";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
