import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        userName: username,
        password,
        role: "student",
      });

      toast.success("Registration successful. You can now log in.");
      navigate("/student-dashboard", { state: { studentId: response?.id } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-100">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-400">Username</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded focus:ring focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-400">Password</label>
            <input
              type="password"
              className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition duration-200">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
