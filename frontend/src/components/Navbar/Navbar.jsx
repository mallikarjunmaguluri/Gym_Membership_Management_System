import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
   
    <nav className="navbar" >
      <h2 className="logo">GymMS</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin-login">Admin Login</Link></li>
        <li><Link to="/members-login">Member</Link></li>
        <li><Link to="/register">Member Registe</Link></li>
      </ul>
    </nav>
  );
}
