import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemberLogin() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

   try {
  const res = await fetch("http://127.0.0.1:5000/member-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Parse JSON response
  const result = await res.json();

  if (res.status === 200 && result.success === true) {
    // VALID CREDENTIALS

    // Store role and member ID in localStorage
    localStorage.setItem("role", "member");
    localStorage.setItem("member_id", result.id); // ✅ use result.id

    // Navigate to member home
    navigate("/member-home");
  } else {
    // INVALID CREDENTIALS
    setMsg("Invalid Credentials");
  }
} catch (error) {
  console.error("Login error:", error);
  setMsg("Server Error");
}

  };

  return (
    <div className="mt-30p">
      <div className="card2 w-30 m-auto p-20">
        <form onSubmit={handleSubmit}>
          <div className="card-title txt-center">Member Login</div>

          {msg && (
            <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {msg}
            </div>
          )}

          <div className="mt-20">
            <label>Email:</label>
            <input
              type="email"
              className="form-input"
              placeholder="Please enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <label>Password:</label>
            <input
              type="password"
              className="form-input"
              placeholder="Please enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input type="submit" className="register-btn w-100 mt-20" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
