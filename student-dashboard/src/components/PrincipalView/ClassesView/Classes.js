import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/classroom`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
            <button><Link to='/principal' className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">Home</Link></button>
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((classroom) => (
          <div
            key={classroom.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-transform"
            onClick={() =>
              navigate(`/class/${classroom.id}`, { state: { classId: classroom.id } })
            }
          >
            <h2 className="text-xl font-bold text-blue-300">{classroom.roomName}</h2>
            <p className="text-gray-400">Rows: {classroom.rows}</p>
            <p className="text-gray-400">Columns: {classroom.columns}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
