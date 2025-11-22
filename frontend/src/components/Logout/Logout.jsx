import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all session/local storage (optional: you can clear only specific keys)
    localStorage.clear();      // removes all keys from localStorage
    sessionStorage.clear();    // removes all keys from sessionStorage

    // Redirect to home page
    navigate("/");
  }, [navigate]);

  return null; // No UI needed
}
