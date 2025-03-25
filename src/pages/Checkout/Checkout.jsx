import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import "./Checkout.css";

function Checkout({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: user.email,
    address: "",
    phoneNumber: "",
  });

  const [orderSummary, setOrderSummary] = useState({
    cart: location.state.cart || [],
    totalPrice: location.state.totalPrice || 0,
  });

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // Our default Stripe payments

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const paymentSuccess = mockPayment(paymentMethod);

      if (paymentSuccess) {
        const orderData = {
          userId: formData.email,
          items: orderSummary.cart.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          totalPrice: orderSummary.totalPrice,
          shippingAddress: formData.address,
          email: formData.email,
          phone: formData.phoneNumber,
          paymentMethod: paymentMethod,
          date: new Date().toISOString(),
        };

        await axios.post("http://localhost:5000/api/orders/create", orderData);
        setLoading(false);
        alert(
          "Your order has been placed. Confirmation has been sent to your email."
        );
        navigate("/");
      } else {
        setLoading(false);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the order:", error);
      setLoading(false);
    }
  };

  const mockPayment = (method) => {
    // A simulation of an successful payment, for the purpose of demostration
    if (method === "stripe") {
      return true;
    } else if (method === "googlePay") {
      return true;
    } else if (method === "paypal") {
      return true;
    } else if (method === "applePay") {
      return true;
    } else if (method === "creditCard") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!orderSummary.cart.length) {
      navigate("/cart");
    }
  }, [orderSummary.cart, navigate]);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <ul className="checkout-items">
          {orderSummary.cart.map((item) => (
            <li key={item._id} className="checkout-item">
              <div className="checkout-item-details">
                <img
                  src={item.productId?.imageUrl}
                  alt={item.productId?.name}
                  className="checkout-item-img"
                />
                <span className="checkout-item-name">
                  {item.productId?.name}
                </span>
                <span className="checkout-item-quantity">
                  ${item.productId?.price} x {item.quantity}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          Total: <span>${orderSummary.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
            <option value="googlePay">Google Pay</option>
            <option value="applePay">Apple Pay</option>
          </select>
        </div>

        <div className="checkout-buttons">
          <button type="submit" className="checkout-btn" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
