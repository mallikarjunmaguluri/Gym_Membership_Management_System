import React, { useEffect, useState } from "react";

export default function MemberHome() {
  const [member, setMember] = useState(null);
  const [editMode, setEditMode] = useState(false); // toggle edit mode
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    goal: "",
    email: "",
  });

  useEffect(() => {
    const memberId = localStorage.getItem("member_id");

    if (!memberId) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:5000/members/${memberId}`)
      .then((res) => res.json())
      .then((data) => {
        setMember(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          age: data.age || "",
          goal: data.goal || "",
          email: data.email || "",
        });
      })
      .catch((err) => console.error("Error fetching member profile:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!member) return;

    try {
      const res = await fetch(`http://localhost:5000/members/${member.member_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.status === "success") {
        alert("✅ Profile updated successfully!");
        setMember(data.member);
        setEditMode(false); // go back to view mode
      } else {
        alert("❌ Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="member-home-container">
      <p className="welcome-txt text-center mt-30p">Welcome to Member Home!</p>

      {member ? (
        <div className="card2 w-30 p-20 m-auto">
          {editMode ? (
            <>
              <div className="mt-10">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="mt-20">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="mt-10">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="mt-10">
                <label>Goal:</label>
                <input
                  type="text"
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="mt-10">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <button className="btn update-btn mt-20" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn cancel-btn mt-10"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3><strong>Name:</strong> {member.name}</h3>
              <p><strong className="mt-20">Phone:</strong> {member.phone}</p>
              <p><strong>Age:</strong> {member.age}</p>
              <p><strong>Goal:</strong> {member.goal}</p>
              <p><strong>Email:</strong> {member.email}</p>

              <button
                className="btn update-btn mt-20"
                onClick={() => setEditMode(true)}
              >
                Update Profile
              </button>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
