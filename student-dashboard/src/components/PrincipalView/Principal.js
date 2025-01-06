import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrincipalDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Principal Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-xl mb-6">Hi, Principal! Welcome back to your dashboard.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => handleNavigation("/class")}
            className="cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-bold mb-4">Seat Allocation</h2>
            <p className="text-gray-400">
              Manage and allocate seats for students during exams.
            </p>
          </div>

          <div
            onClick={() => handleNavigation("/students")}
            className="cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-bold mb-4">Student Module</h2>
            <p className="text-gray-400">
              View and manage student details, classes, and performance.
            </p>
          </div>

          <div
            onClick={() => handleNavigation("/fuzzySearch")}
            className="cursor-pointer bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-bold mb-4">Fuzzy Search Logic</h2>
            <p className="text-gray-400">
              Try fuzzy search with a difference of two
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
