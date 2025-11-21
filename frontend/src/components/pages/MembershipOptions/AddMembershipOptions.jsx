import React, { useState } from "react";
import axios from "axios";
import "./MembershipOptions.css";

export default function AddMembershipOptions({ onClose }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");

  const [message, setMessage] = useState("");   // Success message
  const [error, setError] = useState("");       // Error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/memberships/options/add", {
        title,
        price,
        validity_in_days: days
      });

      setMessage(res.data.message || "Membership added successfully!");

      // Optional: Clear form
      setTitle("");
      setPrice("");
      setDays("");

    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="card2 w-30 m-auto p-20 mt-30">
      <div className="form-card">
        <h2 className="card-title">Add Membership Option</h2>

        {/* ----- SHOW SUCCESS MESSAGE ----- */}
        {message && <p className="success-box">{message}</p>}

        {/* ----- SHOW ERROR MESSAGE ----- */}
        {error && <p className="error-box">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mt-30">
            <label>Plan Title</label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Enter Plan Title"
            />
          </div>

          <div className="mt-20">
            <label>Price (₹)</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
              placeholder="Enter Price"
            />
          </div>

          <div className="mt-20">
            <label>Validity (Days)</label>
            <input
              type="number"
              required
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="form-input"
              placeholder="Enter validity in days"
            />
          </div>

          <div className="mt-20">
            <button className="btn submit-btn w-100" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
