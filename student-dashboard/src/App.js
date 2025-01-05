import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from './components/StudentsDashboard';
import PrincipalStudentsPage from './components/PrincipalView/PrincipalStudentView';
import Classes from './components/PrincipalView/ClassesView/Classes';
import ClassSeats from './components/PrincipalView/ClassesView/ClassSeats';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import PrincipalDashboard from './components/PrincipalView/Principal';
import PrincipalScores from './components/PrincipalView/PrincipalScores';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <Router>
      <ToastContainer/>
    <div className="min-h-screen bg-gray-100">
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/class" element={<Classes />} />
        <Route path="/class/:classId" element={<ClassSeats />} />
        <Route path="/students" element={<PrincipalStudentsPage />} />
        <Route path='/principal' element={<PrincipalDashboard/>} />
        <Route path='/principal/scores' element={<PrincipalScores/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
