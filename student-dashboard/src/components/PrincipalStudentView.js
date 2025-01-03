import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PrincipalStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/student"); 
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const results = students.filter((student) =>
      student.name.toLowerCase().includes(query)
    );
    setFilteredStudents(results);
  };

  const handleStudentClick = (studentId) => {
    navigate(`/`, { state: { studentId: studentId } }); // Redirect to student profile page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700">Students</h1>
      </header>
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search students by name"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-gray-300 shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer"
            onClick={() => handleStudentClick(student.id)}
          >
            <h2 className="text-lg font-bold text-blue-700">{student.name}</h2>
            <p className="text-gray-700">Roll Number: {student.rollNumber}</p>
            <p className="text-gray-700">Class: {student.className}</p>
            <p className="text-gray-700">House: {student.house}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipalStudentsPage;
