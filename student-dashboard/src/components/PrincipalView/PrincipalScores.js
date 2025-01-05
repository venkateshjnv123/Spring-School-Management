import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const subjectName = {
  "67782a2fa9f6e259968df436": "english",
  "67782a36a9f6e259968df437": "maths",
  "67782a3ba9f6e259968df438": "science",
  "67782a42a9f6e259968df439": "social",
  "67782a47a9f6e259968df43a": "hindi"
};

const PrincipalScores = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [seatAllocation, setSeatAllocation] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [enroled, setEnroled] = useState(null);
  const [scores, setScores] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = Cookies.get("authToken");

        const studentPromise = axios.get(`${process.env.REACT_APP_API_URL}/student/${state?.studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const seatPromise = axios.get(`${process.env.REACT_APP_API_URL}/class/student/${state?.studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const subjectsPromise = axios.get(`${process.env.REACT_APP_API_URL}/subjects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const [studentResponse, seatResponse, subjectsResponse] = await Promise.all([
          studentPromise,
          seatPromise,
          subjectsPromise,
        ]);

        setStudent(studentResponse.data);
        setScores(studentResponse?.data?.scores || {});
        setSeatAllocation(seatResponse.data[0]); // Assuming the first element contains the data
        setSubjects(subjectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleScoreChange = (subjectId, value) => {
    setScores((prevScores) => {
      return {
        ...prevScores,
        [subjectId]: value,
      };
    });
  };

  const handleSaveScores = async (subjectId) => {
    const token = Cookies.get("authToken");
    console.log(scores);

    try {
      const data = {
        subjectId: subjectId,
        score: scores[subjectId]
      };
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/student/${state?.studentId}/add-score`, // URL
        data,
        {
          headers: headers,
        }
      );
      toast.success("Score updated successfully!");
    } catch (Error) {
      console.log("Error while updating data");
      toast.error("Failed to load API, try again");
    }
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
            className={`w-12 h-12 flex items-center justify-center border ${
                isAllocated
                  ? "bg-green-500 text-white"
                  : "bg-transparent border-gray-500 hover:bg-gray-700 text-gray-300"
              }`}
          >
            {isAllocated ? "Seat" : ""}
          </div>
        );
      }
      grid.push(
        <div key={row} className="grid grid-cols-5 gap-2 bg-gray-800 p-4 rounded-md">
          {rowItems}
        </div>
      );
    }

    return <div className="space-y-2">{grid}</div>;
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Student Dashboard</h1>
      <button><Link to='/principal' className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">Home</Link></button>
      {student ? (
        <div className="flex space-x-6 my-3">
          <div className="bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
            <h2 className="text-xl font-bold mb-2">Student Details</h2>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll Number:</strong> {student.rollNumber}</p>
            <p><strong>Class:</strong> {student.className}</p>
            <p><strong>House:</strong> {student.house}</p>
            <div ><strong>Enrolled Subjects:  </strong>
              {student?.subjectIds.map((item) => {
                return <li key={item}>{subjects.find(subject => subject.id === item)?.name}</li>;
              })}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
            <h2 className="text-xl font-bold mb-2">Scores</h2>
            {subjects.length > 0 ? (
              <ul>
                {subjects.map((subject) => (
                  <li key={subject.id} className="py-2 flex items-center">
                    <span className="font-semibold mr-4">{subject?.name}:</span>
                    <input
                      type="number"
                      value={scores[subject?.id] || ""}
                      onChange={(e) => handleScoreChange(subject?.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-16"
                      min="0"
                      max="100"
                    />
                    <button
                      onClick={() => handleSaveScores(subject?.id)}
                      className="ml-4 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 focus:outline-none"
                    >
                      Save
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No subjects or scores available.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Unable to get the Student Details</p>
      )}

      {seatAllocation ? (
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">Exam Seat Allocation</h2>
          <p><strong>Class:</strong> {seatAllocation.className}</p>
          {renderSeatGrid()}
        </div>
      ) : (
        <p>No seat allocation is present for the student.</p>
      )}
    </div>
  );
};

export default PrincipalScores;
