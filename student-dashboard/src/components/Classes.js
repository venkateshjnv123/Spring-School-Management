import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/classroom`);
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((classroom) => (
          <div
            key={classroom.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/class/${classroom.id}`, {state: { classId : classroom.id}})}
          >
            <h2 className="text-xl font-bold">{classroom.roomName}</h2>
            <p>Rows: {classroom.rows}</p>
            <p>Columns: {classroom.columns}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
