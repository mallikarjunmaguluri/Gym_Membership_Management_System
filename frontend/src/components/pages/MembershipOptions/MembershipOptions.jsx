import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MembershipOptions.css";

export default function MembershipOptions() {
  const [memberships, setMemberships] = useState([]);
  const [role, setRole] = useState(""); // store user role
  const [memberId, setMemberId] = useState(null); // store member ID
  const navigate = useNavigate();

  // Fetch all memberships and role/member ID
  useEffect(() => {
    fetch("http://localhost:5000/memberships/options")
      .then((res) => res.json())
      .then((data) => setMemberships(data))
      .catch((err) => console.error("Error loading memberships:", err));

    // Get role and memberId from localStorage
    const storedRole = localStorage.getItem("role"); 
    const storedMemberId = localStorage.getItem("member_id"); // member ID stored on login

    if (storedRole) setRole(storedRole);
    if (storedMemberId) setMemberId(storedMemberId);
  }, []);

  const handleAddMembership = () => {
    window.location.href = "/add-membership-options";
  };

  const handleEnroll = (membership) => {
    if (!memberId) {
      alert("Member not logged in!");
      return;
    }

    // Navigate to MembershipEnroll page with full membership details
    navigate("/membership-enroll", {
      state: { 
        memberId,
        membershipOptionId: membership.membershipOption_id,
        title: membership.title,
        price: membership.price,
        validity_in_days: membership.validity_in_days
      },
    });
  };

  return (
    <div className="membership-container">
      {/* -------- TOP BAR -------- */}
      <div className="membership-top">
        <h2 className="title">View Memberships</h2>

        <div className="buttons">
          {role === "admin" && (
            <button className="btn add-btn" onClick={handleAddMembership}>
              Add Membership Options
            </button>
          )}
        </div>
      </div>

      {/* -------- MEMBERSHIP CARDS -------- */}
      <div className="membership-card-grid">
        {memberships.length > 0 ? (
          memberships.map((m) => (
            <div className="membership-card" key={m.membershipOption_id}>
              <h3 className="card-title">{m.title}</h3>
              <div className="card-info">
                <p><strong>Price:</strong> ${m.price}</p>
                <p><strong>Validation In Days:</strong> {m.validity_in_days} days</p>
              </div>

              {/* Enroll button only for members */}
              {role === "member" && (
                <button
                  className="card-btn"
                  onClick={() => handleEnroll(m)} // pass entire membership object
                >
                  Enroll
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-data">No Memberships Found</p>
        )}
      </div>
    </div>
  );
}
