import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        username,
        password,
      });

      if (res.data.success) {
        // Set role in localStorage
        localStorage.setItem("role", "admin");

        // Update role state in parent or context
        if (setRole) setRole("admin");

        // Redirect to admin home
        navigate("/admin-home");
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Server Error. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="mt-30p">
      <div className="card2 w-30 m-auto p-20">
        <form onSubmit={handleSubmit}>
          <div className="card-title txt-center">Admin Login</div>

          {error && (
            <p style={{ color: "red", marginTop: 10, textAlign: "center" }}>
              {error}
            </p>
          )}

          <div className="mt-20">
            <label>Username:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <label>Password:</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" className="register-btn w-100 mt-20">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
