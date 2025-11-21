import React, { useState, useEffect } from "react";

export default function AddClasses() {
  const [form, setForm] = useState({
    instructor_id: "",
    title: "",
    class_start_time: "",
    class_end_time: "",
    no_of_members_allowed: "",
  });

  const [message, setMessage] = useState("");
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors to populate dropdown
useEffect(() => {
  fetch("http://localhost:5000/instructors")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched instructors:", data); // check what is actually coming
      setInstructors(data);
    })
    .catch((err) => console.error("Error loading instructors:", err));
}, []);


  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/add-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage("✅ Class added successfully!");
        setForm({
          instructor_id: "",
          title: "",
          class_start_time: "",
          class_end_time: "",
          no_of_members_allowed: "",
        });
      } else {
        setMessage("❌ Something went wrong");
      }
    } catch (err) {
      setMessage("❌ Server error");
      console.error(err);
    }
  };

  return (
    <div className="mt-30">
      <div className="card2 w-30 m-auto p-20">
        <form onSubmit={handleSubmit}>
          <div className="card-title txt-center">Add Class</div>

          {message && (
            <p
              style={{
                color: message.includes("❌") ? "red" : "green",
                marginTop: 10,
              }}
            >
              {message}
            </p>
          )}

          <div className="mt-20">
              <label>Instructor:</label>
              <select
                name="instructor_id"
                className="form-input"
                required
                value={form.instructor_id}
                onChange={handleChange}
              >
                <option value="">Select Instructor</option>
                {instructors.map((inst) => (
                  <option key={inst.instructor_id} value={inst.instructor_id}>
                    {inst.name} ({inst.email})
                  </option>
                ))}
              </select>
            </div>


          <div className="mt-20">
            <label>Class Title:</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="Enter class title"
              required
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Start Time:</label>
            <input
              type="time"
              name="class_start_time"
              className="form-input"
              required
              value={form.class_start_time}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>End Time:</label>
            <input
              type="time"
              name="class_end_time"
              className="form-input"
              required
              value={form.class_end_time}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Number of Members Allowed:</label>
            <input
              type="number"
              name="no_of_members_allowed"
              className="form-input"
              placeholder="Enter max members"
              required
              value={form.no_of_members_allowed}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="submit"
              className="register-btn w-100 mt-20"
              value="Add Class"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
