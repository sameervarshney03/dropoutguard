import React, { useState } from 'react';
import StudentCard from './StudentCard';
import StudentModal from './StudentModal';

const CardView = ({ students, showRisk = true, onCardClick }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortBy, setSortBy] = useState('risk');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sort students based on current sort criteria
  const sortedStudents = [...students].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'attendance':
        comparison = parseFloat(a.attendance_percent) - parseFloat(b.attendance_percent);
        break;
      case 'score':
        comparison = parseFloat(a.average_score) - parseFloat(b.average_score);
        break;
      case 'dues':
        comparison = parseInt(a.days_overdue) - parseInt(b.days_overdue);
        break;
      case 'risk':
        const riskOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'NONE': 0 };
        comparison = riskOrder[a.risk] - riskOrder[b.risk];
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleCardClick = (student) => {
    setSelectedStudent(student);
    // Pass the student to the parent component if onCardClick is provided
    if (onCardClick) {
      onCardClick(student);
    }
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-2">
        <button 
          onClick={() => handleSort('name')} 
          className={`px-3 py-1 text-sm rounded-full ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('attendance')} 
          className={`px-3 py-1 text-sm rounded-full ${sortBy === 'attendance' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Attendance {sortBy === 'attendance' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('score')} 
          className={`px-3 py-1 text-sm rounded-full ${sortBy === 'score' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Score {sortBy === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('dues')} 
          className={`px-3 py-1 text-sm rounded-full ${sortBy === 'dues' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Dues {sortBy === 'dues' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        {showRisk && (
          <button 
            onClick={() => handleSort('risk')} 
            className={`px-3 py-1 text-sm rounded-full ${sortBy === 'risk' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Risk {sortBy === 'risk' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedStudents.map((student) => (
          <StudentCard 
            key={student.student_id} 
            student={student} 
            showRisk={showRisk}
            onClick={() => handleCardClick(student)}
          />
        ))}
      </div>

      {/* Only show the modal if we're not using the external detail view */}
      {selectedStudent && !onCardClick && (
        <StudentModal student={selectedStudent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CardView;