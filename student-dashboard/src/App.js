import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from './components/StudentsDashboard';
import PrincipalStudentsPage from './components/PrincipalStudentView';
import Classes from './components/Classes';
import ClassSeats from './components/ClassSeats';

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/class" element={<Classes />} />
        <Route path="/class/:classId" element={<ClassSeats />} />
        <Route path="/principal/students" element={<PrincipalStudentsPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
