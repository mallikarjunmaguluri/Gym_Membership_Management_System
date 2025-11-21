import React, { useEffect, useState } from "react";
import "./Membership.css";

export default function Membership() {
  const [memberships, setMemberships] = useState([]);

  // Fetch all memberships
  useEffect(() => {
    fetch("http://localhost:5000/memberships")
      .then(res => res.json())
      .then(data => setMemberships(data))
      .catch(err => console.error("Error loading memberships:", err));
  }, []);

  return (
    <div className="membership-container">

      {/* -------- TOP BAR -------- */}
      <div className="membership-top">
        <h2 className="title">Memberships</h2>

        <div className="buttons">
          <button className="btn add-btn">Add Membership</button>
          <button className="btn view-btn">View Memberships</button>
        </div>
      </div>

      {/* -------- All Memberships Below -------- */}
      <div className="membership-list">
        <h3>All Memberships</h3>

        <table className="membership-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Plan Name</th>
              <th>Price</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {memberships.length > 0 ? (
              memberships.map((m, i) => (
                <tr key={i}>
                  <td>{m.id}</td>
                  <td>{m.plan_name}</td>
                  <td>{m.price}</td>
                  <td>{m.duration} months</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Memberships Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
