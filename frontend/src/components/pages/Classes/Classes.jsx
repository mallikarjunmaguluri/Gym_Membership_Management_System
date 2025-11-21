import React, { useEffect, useState } from "react";
import "../MembershipOptions/MembershipOptions.css";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors and classes
  useEffect(() => {
    // Fetch all instructors
    fetch("http://localhost:5000/instructors")
      .then((res) => res.json())
      .then((data) => setInstructors(data))
      .catch((err) => console.error("Error loading instructors:", err));

    // Fetch all classes
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error loading classes:", err));
  }, []);

  // Map instructor_id to instructor name
  const getInstructorName = (id) => {
    const inst = instructors.find((i) => i.instructor_id === id);
    return inst ? inst.name : "Unknown";
  };

  const handleAddClass = () => {
    window.location.href = "/add-class"; // Redirect to add class page
  };

  return (
    <div className="membership-container">
      {/* -------- TOP BAR -------- */}
      <div
        className="membership-top"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 className="title">View Classes</h2>
        <button className="btn add-btn" onClick={handleAddClass}>
          Add Class
        </button>
      </div>

      {/* -------- CLASSES TABLE -------- */}
      {classes.length > 0 ? (
        <table
          className="instructors-table"
          style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Class ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Instructor Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Start Time</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>End Time</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>No. of Members Allowed</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{cls.classes_id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {getInstructorName(cls.instructor_id)}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{cls.title}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{cls.class_start_time}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{cls.class_end_time}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{cls.no_of_members_allowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data" style={{ marginTop: "20px" }}>
          No Classes Found
        </p>
      )}
    </div>
  );
}
