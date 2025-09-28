import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TeacherPortal from './TeacherPortal';
import StudentPortal from './StudentPortal';
import LoginPanel from './LoginPanel';

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isLoggedIn && (
          <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold">DropoutGuard</div>
                <div className="space-x-4">
                  <Link to="/teacher" className="hover:text-blue-200 transition-colors duration-200">Teacher Portal</Link>
                  <Link to="/student" className="hover:text-blue-200 transition-colors duration-200">Student Portal</Link>
                  <button 
                    onClick={() => setIsLoggedIn(false)} 
                    className="hover:text-blue-200 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<LoginPanel />} />
          <Route path="/login" element={<LoginPanel />} />
          <Route path="/teacher" element={<TeacherPortal />} />
          <Route path="/student" element={<StudentPortal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;