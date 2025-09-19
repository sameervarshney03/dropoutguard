import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeacherPortal from './TeacherPortal';
import StudentPortal from './StudentPortal';

const AppRouter = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">DropoutGuard</div>
              <div className="space-x-4">
                <Link to="/" className="hover:text-blue-200 transition-colors duration-200">Teacher Portal</Link>
                <Link to="/student" className="hover:text-blue-200 transition-colors duration-200">Student Portal</Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<TeacherPortal />} />
          <Route path="/student" element={<StudentPortal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;