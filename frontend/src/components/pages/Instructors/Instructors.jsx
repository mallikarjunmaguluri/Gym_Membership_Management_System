import React, { useEffect, useState } from "react";
import "../MembershipOptions/MembershipOptions.css"; // You can reuse styles or create new CSS for instructors

export default function Instructor() {
  const [instructors, setInstructors] = useState([]);

  // Fetch all instructors from backend
  useEffect(() => {
  fetch("http://localhost:5000/instructors")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // <-- add this to check what JSON arrives
      setInstructors(data);
    })
    .catch((err) => console.error(err));
}, []);


  const handleAddInstructor = () => {
    window.location.href = "/add-instructor"; // Replace with your add instructor page
  };

  return (
    <div className="membership-container">
      {/* -------- TOP BAR -------- */}
      <div className="membership-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="title">View Instructors</h2>
        <button className="btn add-btn" onClick={handleAddInstructor}>
          Add Instructor
        </button>
      </div>

      {/* -------- INSTRUCTORS TABLE -------- */}
      {instructors.length > 0 ? (
        <table className="instructors-table" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Experience</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>About</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((inst, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{inst.instructor_id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{inst.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{inst.email}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{inst.phone}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{inst.experience}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{inst.about}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data" style={{ marginTop: "20px" }}>No Instructors Found</p>
      )}
    </div>
  );
}
