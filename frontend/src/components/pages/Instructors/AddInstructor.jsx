import React, { useState } from "react";

export default function AddInstructor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    about: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/add-instructor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "duplicate_email") {
        setMessage("❌ Email already exists");
      } else if (data.status === "duplicate_phone") {
        setMessage("❌ Phone number already exists");
      } else if (data.status === "success") {
        setMessage("✅ Instructor added successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          experience: "",
          about: "",
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
          <div className="card-title txt-center">Add Instructor</div>

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
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter instructor name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-input"
              placeholder="Enter phone number"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Experience (years):</label>
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter experience in years"
              required
              value={form.experience}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>About:</label>
            <textarea
              name="about"
              className="form-input"
              placeholder="Write something about the instructor"
              rows={4}
              required
              value={form.about}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <input
              type="submit"
              className="register-btn w-100 mt-20"
              value="Add Instructor"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
