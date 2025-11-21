import "./Navbar.css";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
   
    <nav className="navbar" >
      <h2 className="logo">GymMS</h2>

      <ul className="nav-links">
        <li><Link to="/admin-home">Admin Home</Link></li>
        <li><Link to="/MembershipOptions">Membership Options</Link></li>
        <li><Link to="/instructors">Instructors </Link></li>
        <li><Link to="/classes">Classes </Link></li>
        <li><Link to="/view-membership-enrollments">View Membership Enrollments</Link></li>
        <li><Link to="/view-classes-enrollments">View Classes Enrollments </Link></li>
        <li><Link className="register-btn "  to="/" onClick={() => localStorage.removeItem("role")}>Logout</Link></li>
      </ul>
    </nav>
  );
}
