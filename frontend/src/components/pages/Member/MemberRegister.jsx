import React, { useState } from "react";

export default function MemberRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    goal: "",
    password: "",
    gender: "",
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
      const res = await fetch("http://localhost:5000/register-member", {
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
        setMessage("✅ Member registered successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          age: "",
          goal: "",
          password: "",
          gender: "",
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
          <div className="card-title txt-center">Member Registration</div>

          {message && (
            <p style={{ color: message.includes("❌") ? "red" : "green", marginTop: 10 }}>
              {message}
            </p>
          )}

          <div className="mt-20">
            <label>Name:</label>
            <input type="text" name="name" className="form-input"
              placeholder="Please enter your name"
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
              placeholder="Please enter email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Phone:</label>
            <input
              type="number"
              name="phone"
              className="form-input"
              placeholder="Please enter phone"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              className="form-input"
              placeholder="Please enter age"
              required
              value={form.age}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label>Goal:</label>
            <input
              type="text"
              name="goal"
              className="form-input"
              placeholder="Please enter goal"
              required
              value={form.goal}
              onChange={handleChange}
            />
          </div>

          <div className="mt-10">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Please enter your password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="mt-20">
            <label className="gender-label">Gender</label>

            <div className="gender-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  required
                  checked={form.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  required
                  checked={form.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  required
                  checked={form.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

          <div>
            <input type="submit" className="register-btn w-100 mt-20" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}
