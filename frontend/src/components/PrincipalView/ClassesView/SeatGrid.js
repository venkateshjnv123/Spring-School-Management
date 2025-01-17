import React from "react";

const SeatGrid = ({ rows, columns, seatAllocation, onSeatClick }) => {
  return (
    <div className="grid grid-cols-5 gap-2 bg-gray-800 p-4 rounded-md">
      {Array.from({ length: rows * columns }, (_, index) => {
        const row = Math.floor(index / columns) + 1;
        const column = (index % columns) + 1;
        const isAllocated =
          seatAllocation.find(
            (item) => item.row === row && item.column === column
          ) || null;

        return (
          <button
            key={index}
            onClick={() => onSeatClick(row, column, isAllocated)}
            className={`w-12 h-12 flex items-center justify-center border ${
              isAllocated
                ? "bg-green-500 text-white"
                : "bg-transparent border-gray-500 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {isAllocated ? "✔" : `${row}-${column}`}
          </button>
        );
      })}
    </div>
  );
};

export default SeatGrid;
