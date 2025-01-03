import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ClassesSeat = () => {
    const location = useLocation();
    const state = location.state;
  const [seatAllocation, setSeatAllocation] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [className, setClassName] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const seatResponse = await axios.get(`http://localhost:8080/class/${state.classId}`);
        setSeatAllocation(seatResponse.data);

        const studentsResponse = await axios.get("http://localhost:8080/student");
        setStudents(studentsResponse.data);

        // Assuming className comes from API
        setClassName("Class A"); // Replace this with actual data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const postAllotmentDetails = async (row, column, studentId) => {
    try {
      const selectedStudentDetails = students.find((student) => student.id === studentId);
      if (!selectedStudentDetails) {
        alert("Invalid student selection.");
        return;
      }
  
      // Validation: No two students in the same class can sit in the same row or column
      const sameClassConflict = seatAllocation.some(
        (seat) =>
          (seat.row === row || seat.column === column) &&
          students.find((s) => s.id === seat.studentId)?.className === selectedStudentDetails.className
      );
  
      if (sameClassConflict) {
        alert("A student from the same class is already seated in the same row or column.");
        return;
      }
  
      // Validation: No two students in the same house can be adjacent
      const adjacentSeats = [
        { row: row - 1, column }, // Above
        { row: row + 1, column }, // Below
        { row, column: column - 1 }, // Left
        { row, column: column + 1 }, // Right
        { row: row - 1, column: column - 1 }, // Top-left diagonal
        { row: row - 1, column: column + 1 }, // Top-right diagonal
        { row: row + 1, column: column - 1 }, // Bottom-left diagonal
        { row: row + 1, column: column + 1 }, // Bottom-right diagonal
      ];
  
      const sameHouseConflict = adjacentSeats.some((adjacent) =>
        seatAllocation.some(
          (seat) =>
            seat.row === adjacent.row &&
            seat.column === adjacent.column &&
            students.find((s) => s.id === seat.studentId)?.house === selectedStudentDetails.house
        )
      );
  
      if (sameHouseConflict) {
        alert("A student from the same house is already seated adjacent to this seat.");
        return;
      }
  
      // Proceed with allocation if validations pass
      const response = await axios.post(`http://localhost:8080/class/postSeating/${state.classId}`, {
        studentId,
        classId: state.classId,
        row,
        column,
      });
  
      if (response.status === 200) {
        alert("Seat allocated successfully!");
        setSeatAllocation((prev) => [
          ...prev,
          { row, column, studentId, house: selectedStudentDetails.house },
        ]);
        setPopupVisible(false);
        setSelectedSeat(null);
      }
    } catch (error) {
      console.error("Error allocating seat:", error);
      alert("Failed to allocate seat. Please try again.");
    }
  };
  

  const handleSeatClick = (row, column) => {
    setSelectedSeat({ row, column });
    setPopupVisible(true);
  };

  const renderSeatGrid = () => {
    const rows = 5; // Example grid dimensions
    const columns = 5;

    return (
      <div className="grid grid-cols-5 gap-2 bg-gray-50 p-4 rounded-md">
        {Array.from({ length: rows * columns }, (_, index) => {
          const row = Math.floor(index / columns) + 1;
          const column = (index % columns) + 1;
          const isAllocated = seatAllocation?.some(
            (seat) => seat.row === row && seat.column === column
          );

          return (
            <button
              key={index}
              onClick={() => handleSeatClick(row, column)}
              className={`w-12 h-12 flex items-center justify-center border ${
                isAllocated ? "bg-red-500 text-white cursor-not-allowed" : "bg-green-200 hover:bg-green-300"
              }`}
              disabled={isAllocated}
            >
              {isAllocated ? "X" : `${row}-${column}`}
            </button>
          );
        })}
      </div>
    );
  };

  const renderPopup = () => {
    if (!popupVisible || !selectedSeat) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] w-[90vw] max-w-md overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Select a Student for Seat</h2>
          <p className="mb-2">Class: {className}</p>
          <p className="mb-4">
            Seat: Row {selectedSeat.row}, Column {selectedSeat.column}
          </p>
          <select
            className="w-full p-2 border rounded-lg mb-4"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="" disabled>
              Select a student
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {`${student.name} (${student.className}, ${student.house})`}
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              onClick={() => setPopupVisible(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() =>
                selectedStudent &&
                postAllotmentDetails(selectedSeat.row, selectedSeat.column, selectedStudent)
              }
              disabled={!selectedStudent}
            >
              Allocate Seat
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Class Seat Allocation</h1>
      {renderSeatGrid()}
      {renderPopup()}
    </div>
  );
};

export default ClassesSeat;
