import React, { useEffect, useState } from "react";
import "./MembershipOptions.css";

export default function MembershipOptions() {
  const [memberships, setMemberships] = useState([]);

  // Fetch all memberships
  useEffect(() => {
    fetch("http://localhost:5000/memberships/options")
      .then((res) => res.json())
      .then((data) => setMemberships(data))
      .catch((err) => console.error("Error loading memberships:", err));
  }, []);

  const handleAddMembership = () => {
    window.location.href = "/add-membership-options";
  };

  return (
    <div className="membership-container">

      {/* -------- TOP BAR -------- */}
      <div className="membership-top">
        <h2 className="title">View Memberships</h2>

        <div className="buttons">
          <button className="btn add-btn" onClick={handleAddMembership}>
            Add Membership Options
          </button>
        </div>
      </div>

      {/* -------- MEMBERSHIP CARDS -------- */}
      <div className="membership-card-grid">
        {memberships.length > 0 ? (
          memberships.map((m, idx) => (
            <div className="membership-card" key={idx}>
              
              <h3 className="card-title">{m.title}</h3>

              <div className="card-info">
                <p><strong>Price:</strong> ${m.price}</p>
                <p><strong>Valiadatin In days:</strong> {m.validity_in_days} months</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No Memberships Found</p>
        )}
      </div>
    </div>
  );
}
