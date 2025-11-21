import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import AdminNavbar from "./components/Navbar/AdminNavbar";

import Home from "./components/pages/Home/Home";
import AdminLogin from "./components/pages/Admin/AdminLogin";
import AdminHome from "./components/pages/Admin/AdminHome";

import MemberLogin from "./components/pages/Member/MemeberLogin";
import MemberRegister from "./components/pages/Member/MemberRegister";
import MemeberHome from "./components/pages/Member/MemberHome";
import MemberNavbar from "./components/Navbar/MemberNavbar";
import Logout from "./components/Logout/Logout";
import MembershipOptions from "./components/pages/MembershipOptions/MembershipOptions";
import AddMembershipOptions from "./components/pages/MembershipOptions/AddMembershipOptions";
import AddInstructor from "./components/pages/Instructors/AddInstructor";
import Instructor from "./components/pages/Instructors/instructors";

function Layout() {
  const location = useLocation();
  const role = localStorage.getItem("role"); // read session

  function getNavbar() {
    if (role === "admin") return <AdminNavbar />;
    if (role === "member") return <MemberNavbar />;

    // When not logged in — check by URL
    const path = location.pathname;

    if (path === "/admin-login") return <Navbar />;
    if (path === "/members-login" || path === "/register") return <Navbar />;

    return <Navbar />;
  }

  return (
    <>
      {getNavbar()}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />


        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/MembershipOptions" element={<MembershipOptions />} />
        <Route path="/add-membership-options" element={<AddMembershipOptions />} />
        <Route path="/instructors" element={<Instructor />} />
        <Route path="/add-instructor" element={<AddInstructor />} />

        {/* Member Routes */}
        <Route path="/members-login" element={<MemberLogin />} />
        <Route path="/register" element={<MemberRegister />} />
        <Route path="/member-home" element={<MemeberHome />} />
      </Routes>
    </>
  );
}



export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
