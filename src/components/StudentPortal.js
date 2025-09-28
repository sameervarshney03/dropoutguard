import React, { useState } from 'react';
import StudentCard from './StudentCard';
import StudentDetailView from './StudentDetailView';

const StudentPortal = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [inputMethod, setInputMethod] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m your psychological support assistant. How are you feeling today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Demo classes data
  const demoClasses = [
    { id: 1, name: 'Mathematics 101', time: '9:00 AM - 10:30 AM', teacher: 'Dr. Smith', room: 'A-101' },
    { id: 2, name: 'Computer Science Fundamentals', time: '11:00 AM - 12:30 PM', teacher: 'Prof. Johnson', room: 'B-205' },
    { id: 3, name: 'Physics Lab', time: '2:00 PM - 3:30 PM', teacher: 'Dr. Williams', room: 'C-310' },
    { id: 4, name: 'English Literature', time: '4:00 PM - 5:30 PM', teacher: 'Ms. Davis', room: 'D-102' }
  ];

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

  const markAttendance = (classId) => {
    setAttendanceMarked(prev => ({
      ...prev,
      [classId]: true
    }));
    // In a real implementation, this would send attendance data to the server
  };

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I understand how you feel. Would you like to talk more about it?";
      
      if (chatInput.toLowerCase().includes('stress') || chatInput.toLowerCase().includes('stressed')) {
        botResponse = "I'm sorry to hear you're feeling stressed. Remember to take breaks and practice deep breathing. Would you like some stress management techniques?";
      } else if (chatInput.toLowerCase().includes('sad') || chatInput.toLowerCase().includes('unhappy')) {
        botResponse = "I'm here for you. It's normal to feel sad sometimes. Would you like to talk about what's bothering you?";
      } else if (chatInput.toLowerCase().includes('anxious') || chatInput.toLowerCase().includes('anxiety')) {
        botResponse = "Anxiety can be challenging. Have you tried any mindfulness exercises? They can help ground you in the present moment.";
      } else if (chatInput.toLowerCase().includes('help') || chatInput.toLowerCase().includes('need help')) {
        botResponse = "I'm here to help. Would you like to talk about academic concerns or personal well-being?";
      }
      
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
    
    setChatInput('');
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
        
        {/* Navigation Tabs */}
        <div className="flex border-b mb-6">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'classes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('classes')}
          >
            My Classes
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'chatbot' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('chatbot')}
          >
            Psychological Support
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {demoClasses.slice(0, 2).map(cls => (
                <div key={cls.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{cls.name}</p>
                    <p className="text-sm text-gray-600">{cls.time} • {cls.room}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {attendanceMarked[cls.id] ? 
                      <span className="text-green-600">✓ Present</span> : 
                      <button 
                        onClick={() => markAttendance(cls.id)} 
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Mark Attendance
                      </button>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">My Classes</h3>
            <div className="space-y-4">
              {demoClasses.map(cls => (
                <div key={cls.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{cls.name}</h4>
                      <p className="text-sm text-gray-600">{cls.teacher}</p>
                      <p className="text-sm text-gray-600">{cls.time} • {cls.room}</p>
                    </div>
                    <div>
                      {attendanceMarked[cls.id] ? 
                        <span className="text-green-600 font-medium">✓ Present</span> : 
                        <button 
                          onClick={() => markAttendance(cls.id)} 
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Mark Attendance
                        </button>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chatbot' && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Psychological Support Assistant</h3>
            <div className="border border-gray-200 rounded-lg h-96 flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 flex">
                <input
                  type="text"
                  value={chatInput}
                  onChange={handleChatInputChange}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                />
                <button
                  onClick={sendChatMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

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