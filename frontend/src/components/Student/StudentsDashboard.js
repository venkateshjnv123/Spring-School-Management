import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [seatAllocation, setSeatAllocation] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // const token = Cookies.get("authToken");
        const token = localStorage.getItem("authToken");


        const studentResponse = await axios.get(`${process.env.REACT_APP_API_URL}/student/${state?.studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(studentResponse.data);

        const seatResponse = await axios.get(`${process.env.REACT_APP_API_URL}/class/student/${state?.studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSeatAllocation(seatResponse.data[0]);

        const subjectsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/subjects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjects(subjectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleLogout = () => {
    Cookies.remove("authToken");
localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleSubjectEnrollment = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSubjectEnrollmentSave = async () => {
    // const token = Cookies.get("authToken");
    const token = localStorage.getItem("authToken");
    if (selectedSubject == null || student?.subjectIds?.includes(selectedSubject)) {
      toast.error("Already enrolled");
    } else {
      try {
        const data = {
          subjectId: selectedSubject,
        };
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/student/${state?.studentId}/enroll`,
          data,
          { headers }
        );
        setStudent(response?.data);
        toast.success("Enrollment successful");
      } catch (error) {
        console.log("Error while updating data");
        toast.error("Failed to load API, try again");
      }
    }
  };

  const renderSeatGrid = () => {
    const rows = 5;
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
            className={`w-12 h-12 flex items-center justify-center border border-gray-700 ${isAllocated ? "bg-green-500 text-white" : "bg-gray-800 text-gray-400"
              }`}
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
    <div className="min-h-screen bg-gray-900 text-gray-200 flex justify-center">
      <div className="w-4/5 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
          >
            Logout
          </button>
        </div>
        {student && (
          <h2 className="text-xl font-semibold mb-4">Hi, {student.name}</h2>
        )}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Student Details</h2>
            <p>
              <strong>Name:</strong> {student?.name}
            </p>
            <p>
              <strong>Roll Number:</strong> {student?.rollNumber}
            </p>
            <p>
              <strong>Class:</strong> {student?.className}
            </p>
            <p>
              <strong>House:</strong> {student?.house}
            </p>
            <div>
              <strong>Enrolled Subjects:</strong>
              {student?.subjectIds?.map((item) => (
                <p key={item}>
                  {subjects.find((subject) => subject.id === item)?.name}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Scores</h2>
            {student && subjects.length > 0 ? (
              <ul>
                {subjects.map((subject) => (
                  <li key={subject.id} className="py-1">
                    <strong>{subject?.name}:</strong> {student?.scores?.[subject?.id] || "NA"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No scores available.</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Enroll in a Subject</h2>
          <select
            className="w-full p-2 border rounded-lg bg-gray-900 text-gray-200"
            value={selectedSubject || ""}
            onChange={(e) => handleSubjectEnrollment(e)}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubjectEnrollmentSave}
            className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
          >
            Save
          </button>
        </div>

        {seatAllocation && (
          <div className="bg-gray-800 my-4 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-2">Exam Seat Allocation</h2>
            <p>
              <strong>Class:</strong> {seatAllocation.className}
            </p>
            {renderSeatGrid()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
