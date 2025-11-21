import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Gym Management System</h1>
      <p>Your fitness journey starts here!</p>

      <div className="card-container">
        <div className="card">
          <h3>Admin Login</h3>
          <p>Manage members, classes & reports.</p>
          <Link to="/admin-login" className="btn">Login as Admin</Link>
        </div>

        <div className="card">
          <h3>Member Login</h3>
          <p>Access your profile, membership & classes.</p>
          <Link to="/members-login" className="btn">Login as Member</Link>
          <br />
          <Link to="/register" className="register-link">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
}
