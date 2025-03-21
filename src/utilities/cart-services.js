import { useState, useEffect } from "react";
import axios from "axios";

export const useCart = (userId) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  const fetchCart = async () => {
    if (!userId || !isValidObjectId(userId)) {
      console.error("Invalid or missing userId:", userId);
      setCart([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );
      setCart(response.data?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Our Function to add items to the cart
  const addToCart = async (product) => {
    try {
      const existingItem = cart.find((item) => item.productId === product._id);
      if (existingItem) {
        alert(`${product.name} is already in the cart!`);
        return;
      } else {
        const updatedCart = [
          ...cart,
          {
            productId: product._id,
            quantity: 1,
            name: product.name,
            price: product.price,
          },
        ];
        setCart(updatedCart);

        await axios.post(`http://localhost:5000/api/cart/${userId}`, {
          productId: product._id,
          quantity: 1,
        });

        alert(`${product.name} added to cart!`);
      }
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  // Our Function to remove an item from the cart
  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${userId}/${itemId}`
      );

      // If successful, update the cart state by filtering out the removed item
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
      // fetchCart();

      console.log(response.data.message);
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  // Our Function to update the quantity of an item in the cart
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    try {
      console.log("Sending update request for:", userId, itemId, newQuantity);
      const response = await axios.put(
        `http://localhost:5000/api/cart/${userId}/${itemId}`,
        { quantity: newQuantity }
      );

      if (response.status === 200) {
        // If successful, update the local cart state
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating item quantity:", err);
      alert("Failed to update item quantity.");
    }
  };

  // Our Function to update the quantity of an item in the cart
  const deleteCart = async () => {
    try {
      console.log(cart);
      console.log(cart.length);
      if (cart.length === 0) {
        console.log(cart);
        // If the cart is empty, delete it automatically without asking
        const response = await axios.delete(
          `http://localhost:5000/api/cart/${userId}`
        );
        if (response.status === 200) {
          setCart([]);
          console.log("Cart is empty. Deleted automatically.");
        }
        return;
      }

      // If the cart is not empty, ask the user for confirmation
      const confirmDelete = window.confirm(
        "Your cart is not empty. Do you want to delete it before logging out?"
      );

      if (!confirmDelete) return;

      // Proceed to delete the cart if the user confirms
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${userId}`
      );

      if (response.status === 200) {
        setCart([]);
        alert("Cart successfully deleted.");
      }
    } catch (err) {
      console.error("Error deleting cart:", err);
      alert("Failed to delete cart.");
    }
  };

  return {
    cart,
    fetchCart,
    loading,
    addToCart,
    removeItem,
    updateQuantity,
    deleteCart,
  };
};
