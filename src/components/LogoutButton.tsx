import React from "react";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token"); // remove JWT
    navigate("/signin"); // redirect to login page
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-8 py-4 mt-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer font-medium"
    >
      Logout
    </button>
  );
}
