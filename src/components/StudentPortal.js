import React, { useState } from 'react';
import StudentCard from './StudentCard';
import StudentDetailView from './StudentDetailView';

const StudentPortal = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [inputMethod, setInputMethod] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  // Dummy student data
  const dummyStudent = {
    name: "John Smith",
    student_id: "STU12345",
    attendance_percent: "82",
    average_score: "76",
    days_overdue: "0",
    risk: "LOW",
    flagDetails: []
  };

  const handleCardClick = () => {
    setSelectedStudent(dummyStudent);
    setShowDetailView(true);
  };

  const handleCloseDetailView = () => {
    setShowDetailView(false);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop voice recording
    if (isRecording) {
      // Simulate voice recording completion
      setTimeout(() => {
        setTextInput('Voice input converted to text would appear here');
        setIsRecording(false);
      }, 1000);
    }
  };

  const handleInputMethodChange = (method) => {
    setInputMethod(method);
    setTextInput('');
    setIsRecording(false);
  };

  const markAttendance = () => {
    setAttendanceMarked(true);
    // In a real implementation, this would send attendance data to the server
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Student Portal</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">Welcome, {dummyStudent.name}</h3>
          <p className="text-sm text-gray-600">Here's your current academic status:</p>
        </div>
        
        <div className="mb-8">
          <StudentCard 
            student={dummyStudent} 
            showRisk={false} 
            onClick={handleCardClick}
          />
        </div>

        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-3">Mark Attendance</h4>
          <button 
            onClick={markAttendance}
            disabled={attendanceMarked}
            className={`px-4 py-2 rounded ${attendanceMarked ? 'bg-green-200 text-green-800' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {attendanceMarked ? 'Attendance Marked ✓' : 'Mark Today\'s Attendance'}
          </button>
        </div>

        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-3">Communication Center</h4>
          <div className="flex space-x-2 mb-3">
            <button 
              onClick={() => handleInputMethodChange('text')} 
              className={`px-3 py-1 rounded ${inputMethod === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Text Input
            </button>
            <button 
              onClick={() => handleInputMethodChange('voice')} 
              className={`px-3 py-1 rounded ${inputMethod === 'voice' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Voice Input
            </button>
          </div>
          
          {inputMethod === 'text' ? (
            <div>
              <textarea 
                value={textInput}
                onChange={handleTextInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
                placeholder="Type your message here..."
              ></textarea>
            </div>
          ) : (
            <div className="text-center">
              <button 
                onClick={toggleRecording}
                className={`px-4 py-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              {textInput && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p>{textInput}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-2">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={!textInput}
            >
              Send Message
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Academic Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h5 className="font-medium text-blue-700">Study Materials</h5>
              <p className="text-sm text-gray-600">Access course notes and study guides</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h5 className="font-medium text-green-700">Tutoring Services</h5>
              <p className="text-sm text-gray-600">Schedule a session with a tutor</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h5 className="font-medium text-purple-700">Academic Calendar</h5>
              <p className="text-sm text-gray-600">View important dates and deadlines</p>
            </div>
          </div>
        </div>
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

export default StudentPortal;