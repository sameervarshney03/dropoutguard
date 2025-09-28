import React, { useState, useEffect, useCallback } from 'react';
import CardView from './CardView';
import DataTable from './DataTable';
import DownloadButton from '../components/DownloadButton';
import StudentDetailView from './StudentDetailView';

// Dummy student data for fallback
const dummyStudents = [
  {
    name: "John Smith",
    student_id: "STU12345",
    attendance_percent: "82",
    average_score: "76",
    days_overdue: "0",
    risk: "LOW",
    flagDetails: []
  },
  {
    name: "Emma Johnson",
    student_id: "STU12346",
    attendance_percent: "65",
    average_score: "58",
    days_overdue: "5",
    risk: "HIGH",
    flagDetails: ["Low attendance", "Poor test scores"]
  },
  {
    name: "Michael Brown",
    student_id: "STU12347",
    attendance_percent: "92",
    average_score: "88",
    days_overdue: "0",
    risk: "LOW",
    flagDetails: []
  },
  {
    name: "Sophia Williams",
    student_id: "STU12348",
    attendance_percent: "78",
    average_score: "72",
    days_overdue: "2",
    risk: "MEDIUM",
    flagDetails: ["Missing assignments"]
  },
  {
    name: "James Davis",
    student_id: "STU12349",
    attendance_percent: "45",
    average_score: "52",
    days_overdue: "10",
    risk: "HIGH",
    flagDetails: ["Low attendance", "Poor test scores", "Missing assignments"]
  }
];

const TeacherPortal = () => {
  const [students, setStudents] = useState([]);
  const [viewMode, setViewMode] = useState('card');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      if (data && data.length > 0) {
        setStudents(data);
      } else {
        // Use dummy data if API returns empty array
        setStudents(dummyStudents);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Use dummy data if API call fails
      setStudents(dummyStudents);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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