import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        userName: username,
        password,
      });

      const { role, student, token } = response.data;

      // Store the token in cookies
      Cookies.set("authToken", token, { expires: 7, secure: true });

      if (role === "student") {
        navigate("/student-dashboard", { state: { studentId: student?.id } });
      } else if (role === "principal") {
        navigate("/principal");
      } else {
        setError("Invalid role.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-100">
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
          {error && (
            <p className="text-red-500 text-sm mb-4 font-semibold">{error}</p>
          )}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition duration-200">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
