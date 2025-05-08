import React from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./MerchDetails.css";

const MerchDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [merch, setMerch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/merch/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Merch not found");
        return response.json();
      })
      .then((data) => {
        setMerch(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load merch details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading merch details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="merch-details">
      <button onClick={() => navigate("/shop")} className="back-button">
        ⬅ Back
      </button>

      <img src={merch.imageUrl} alt={merch.name} className="merch-image" />
      <div className="merch-content">
        <h2>{merch.name}</h2>
        <p>{merch.description}</p>
        <p>
          <strong>Price:</strong> ${merch.price}
        </p>
        <p>
          <strong>In Stock:</strong> {merch.countInStock}
        </p>
      </div>
    </div>
  );
};

export default MerchDetails;
