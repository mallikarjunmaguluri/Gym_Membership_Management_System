import "./Navbar.css";
import { Link } from "react-router-dom";

export default function MemberNavbar() {
  return (
   
    <nav className="navbar" >
      <h2 className="logo">GymMS</h2>

      <ul className="nav-links">
        <li><Link to="/member-home">Member Home</Link></li>
        <li><Link to="/memberships">view Memberships</Link></li>
        <li><Link to="/enrolled-memberships">Enrolled Memberships </Link></li>
        <li><Link to="/classes">View Join or Exit Classes </Link></li>
        <li><Link className="register-btn "  to="/" onClick={() => localStorage.removeItem("role")}>Logout</Link></li>

      </ul>
    </nav>
  );
}
