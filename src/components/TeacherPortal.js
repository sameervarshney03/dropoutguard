import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import DataTable from './DataTable';
import DownloadButton from '../components/DownloadButton';
import StudentDetailView from './StudentDetailView';

const TeacherPortal = () => {
  const [students, setStudents] = useState([]);
  const [viewMode, setViewMode] = useState('card');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (student) => {
    setSelectedStudent(student);
    setShowDetailView(true);
  };

  const handleCloseDetailView = () => {
    setShowDetailView(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Teacher Dashboard</h2>
          <div className="flex space-x-4">
            <DownloadButton students={students} />
          </div>
        </div>
        
        <div className="mb-4">
          <button 
            className={`px-4 py-2 ${viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-blue-600 mr-2`}
            onClick={() => setViewMode('card')}
          >
            Card View
          </button>
          <button 
            className={`px-4 py-2 ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-gray-300`}
            onClick={() => setViewMode('table')}
          >
            Table View
          </button>
        </div>
        
        {viewMode === 'card' ? (
          <CardView students={students} showRisk={true} onCardClick={handleCardClick} />
        ) : (
          <DataTable students={students} onRowClick={handleCardClick} />
        )}
      </div>

      {showDetailView && (
        <StudentDetailView 
          student={selectedStudent} 
          onClose={handleCloseDetailView} 
        />
      )}
    </div>
  );
};

export default TeacherPortal;