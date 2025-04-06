import React from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)} className="back-button">
        ⬅ Back
      </button>
      <h2>{product.name}</h2>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
    </div>
  );
};

export default ProductDetails;
