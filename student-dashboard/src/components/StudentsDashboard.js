import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [seatAllocation, setSeatAllocation] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const location = useLocation();
 const state = location.state;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentResponse = await axios.get(`http://localhost:8080/student/${state?.studentId}`);
        setStudent(studentResponse.data);

        const seatResponse = await axios.get(`http://localhost:8080/class/student/${state?.studentId}`);
        setSeatAllocation(seatResponse.data[0]);

        const subjectsResponse = await axios.get(`http://localhost:8080/subjects`);
        setSubjects(subjectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleSubjectEnrollment = (e) => {
    setSelectedSubject(e.target.value);
  };

  const renderSeatGrid = () => {
    const rows = 5; // Example grid dimensions
    const columns = 5;
    const grid = [];

    for (let row = 1; row <= rows; row++) {
      const rowItems = [];
      for (let column = 1; column <= columns; column++) {
        const isAllocated =
          seatAllocation && row === seatAllocation.row && column === seatAllocation.column;
        rowItems.push(
          <div
            key={`${row}-${column}`}
            className={`w-12 h-12 flex items-center justify-center border border-gray-300 ${isAllocated ? "bg-green-500 text-white" : "bg-gray-100"}`}
          >
            {isAllocated ? "You" : ""}
          </div>
        );
      }
      grid.push(
        <div key={row} className="flex space-x-2">
          {rowItems}
        </div>
      );
    }

    return <div className="space-y-2">{grid}</div>;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Student Dashboard</h1>

      {student ?  (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">Student Details</h2>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Roll Number:</strong> {student.rollNumber}</p>
          <p><strong>Class:</strong> {student.className}</p>
          <p><strong>House:</strong> {student.house}</p>
        </div>
      )
    :
    <p>Unable to get the Student Details</p>}

{seatAllocation ? (
        <div className="bg-green-100 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">Exam Seat Allocation</h2>
          <p><strong>Class:</strong> {seatAllocation.className}</p>
          {renderSeatGrid()}
        </div>
      )
    :
    <p>No seat Allocation is present for the student</p>}

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Scores</h2>
        {student && subjects.length > 0 ? (
          <ul>
            {subjects.map((subject) => (
              <li key={subject.id} className="py-1">
                <strong>{subject?.name}:</strong> {student?.scores[subject?.id] || "NA"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No scores available.</p>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Enroll in a Subject</h2>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedSubject || ""}
          onChange={handleSubjectEnrollment}
        >
          <option value="" disabled>Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        {selectedSubject && (
          <p className="mt-2 text-sm text-green-500">Selected subject: {subjects.find((sub) => sub.id === selectedSubject)?.name}</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
