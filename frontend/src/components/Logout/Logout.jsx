import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // Clear session
    localStorage.removeItem("role");

    // Redirect to home
    window.location.href = "/";
  }, []);

  return null; // No UI needed
}
