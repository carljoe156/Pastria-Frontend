import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import Nav from "./components/Nav/Nav";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
