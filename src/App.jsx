import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Product from "./pages/Product/Product";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage/AuthPage";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout.jsx";
import { getUser, logOut } from "./utilities/users-services.js";
import { useCart } from "./utilities/cart-services.js";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import MerchDetails from "./pages/MerchDetails/MerchDetails.jsx";

function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setUser(getUser());
  }, []);

  function handleLogOut() {
    logOut();
    setUser(null);
  }
  const {
    cart,
    fetchCart,
    loading,
    addToCart,
    removeItem,
    updateQuantity,
    deleteCart,
  } = useCart(user?._id);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  return (
    <>
      <Layout handleLogOut={handleLogOut} user={user}>
        <Routes>
          <Route
            path="/"
            element={<HomePage addToCart={addToCart} user={user} />}
          />
          <Route
            path="/shop"
            element={<Shop addToCart={addToCart} user={user} />}
          />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/merch/:id" element={<MerchDetails />} />
          <Route
            path="/cart"
            element={
              <Cart
                userId={user?._id}
                cart={cart}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
                fetchCart={fetchCart}
                loading={loading}
                deleteCart={deleteCart}
              />
            }
          />
          <Route path="/checkout" element={<Checkout user={user} />} />
          <Route
            path="/authentication"
            element={<AuthPage setUser={setUser} />}
          />
          <Route path="/about" element={<About setUser={setUser} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
