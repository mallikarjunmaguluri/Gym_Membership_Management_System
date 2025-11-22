import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MembershipEnroll() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure all the fields sent from MembershipOptions
  const { memberId, membershipOptionId, title, price, validity_in_days } = location.state || {};

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    card_number: "",
    card_name: "",
    expire_date: "",
    amount: price || "", // pre-fill amount with price
    status: "Pending", // default
  });

  // Optional: auto-calculate end_date based on validity_in_days
  useEffect(() => {
    if (form.start_date && validity_in_days) {
      const start = new Date(form.start_date);
      start.setDate(start.getDate() + parseInt(validity_in_days, 10));
      const end = start.toISOString().split("T")[0];
      setForm((prev) => ({ ...prev, end_date: end }));
    }
  }, [form.start_date, validity_in_days]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memberId || !membershipOptionId) {
      alert("Member or membership information missing!");
      return;
    }

    const payload = {
      member_id: memberId,
      membershipOption_id: membershipOptionId,
      title,
      price,
      validity_in_days,
      ...form,
    };

    try {
      const res = await fetch("http://localhost:5000/enroll-membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("✅ Membership enrolled successfully!");
        navigate("/member-home"); // redirect after success
      } else {
        alert("✅ Membership enrolled successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="mt-30">
      <div className="card2 w-30 m-auto p-20">
        <form onSubmit={handleSubmit}>
          <h2 className="card-title txt-center">Membership Enrollment</h2>

          {/* Hidden fields */}
          <input type="hidden" name="member_id" value={memberId} />
          <input type="hidden" name="membershipOption_id" value={membershipOptionId} />
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="price" value={price} />
          <input type="hidden" name="validity_in_days" value={validity_in_days} />

         
          <div className="mt-20">
            <label>Card Number:</label>
            <input
              type="text"
              name="card_number"
              value={form.card_number}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter Card number"
            />
          </div>

          <div className="mt-20">
            <label>Card Name:</label>
            <input
              type="text"
              name="card_name"
              value={form.card_name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter name on card"
            />
          </div>

          <div className="mt-20">
            <label>Expire Date:</label>
            <input
              type="month"
              name="expire_date"
              value={form.expire_date}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="mt-20">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              readOnly
              className="form-input"
            />
          </div>

          <div className="mt-20">
            <button type="submit" className="register-btn w-100">
              Enroll Membership
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
