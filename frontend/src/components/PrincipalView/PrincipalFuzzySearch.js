import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const PrincipalFuzzy = () => {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = Cookies.get("authToken");
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search/students?query=${debouncedQuery}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, [debouncedQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="min-h-screen bg-gray-800 text-gray-200 p-6">
            <button><Link to='/principal' className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">Home</Link></button>
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-100">Students</h1>
            </header>
            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search students by name"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="bg-gray-700 border border-gray-600 shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer"
                    >
                        <h2 className="text-lg font-bold text-gray-100">{student.name[0]}</h2>
                        <p className="text-gray-300">Roll Number: {student.rollNumber[0]}</p>
                        <p className="text-gray-300">Class: {student.className[0]}</p>
                        <p className="text-gray-300">House: {student.house[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrincipalFuzzy;
