import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StudentDetailView = ({ student, onClose }) => {
  if (!student) return null;

  // Generate dummy data for attendance over time
  const generateAttendanceData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const attendanceData = months.map(() => Math.floor(Math.random() * 30) + 70); // Random between 70-100%
    
    // Make the trend match the current attendance percentage
    const currentAttendance = parseInt(student.attendance_percent);
    attendanceData[attendanceData.length - 1] = currentAttendance;
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Attendance %',
          data: attendanceData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3,
        },
      ],
    };
  };

  // Generate dummy data for marks in different subjects
  const generateMarksData = () => {
    const subjects = ['Math', 'Science', 'English', 'History', 'Computer'];
    const marksData = subjects.map(() => Math.floor(Math.random() * 40) + 60); // Random between 60-100
    
    // Make the average match the current average score
    const currentAverage = parseInt(student.average_score);
    const sum = marksData.reduce((a, b) => a + b, 0);
    const avg = sum / marksData.length;
    const factor = currentAverage / avg;
    const adjustedMarks = marksData.map(mark => Math.min(100, Math.floor(mark * factor)));
    
    return {
      labels: subjects,
      datasets: [
        {
          label: 'Subject Scores',
          data: adjustedMarks,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Generate dummy data for attendance reasons
  const generateAttendanceReasonData = () => {
    // Create realistic reasons for absence
    return {
      labels: ['Health Issues', 'Family Reasons', 'Transportation', 'Other'],
      datasets: [
        {
          label: 'Absence Reasons',
          data: [40, 30, 20, 10], // Percentages
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Generate dummy data for performance comparison
  const generatePerformanceComparisonData = () => {
    const currentAverage = parseInt(student.average_score);
    return {
      labels: ['Your Score', 'Class Average'],
      datasets: [
        {
          label: 'Score Comparison',
          data: [currentAverage, Math.floor(Math.random() * 10) + 65], // Random class average between 65-75
          backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
        },
      ],
    };
  };

  const attendanceData = generateAttendanceData();
  const marksData = generateMarksData();
  const attendanceReasonData = generateAttendanceReasonData();
  const performanceComparisonData = generatePerformanceComparisonData();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {student.name} - Detailed Performance
                  </h3>
                  <p className="text-sm text-gray-500">
                    <strong>Student ID:</strong> {student.student_id}
                  </p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Attendance Trend */}
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-md font-medium text-gray-800 mb-2">Attendance Trend</h4>
                    <Line data={attendanceData} options={chartOptions} />
                  </div>
                  
                  {/* Subject Marks */}
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-md font-medium text-gray-800 mb-2">Subject Performance</h4>
                    <Bar data={marksData} options={barOptions} />
                  </div>
                  
                  {/* Attendance Reasons */}
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-md font-medium text-gray-800 mb-2">Absence Reasons</h4>
                    <Pie data={attendanceReasonData} options={pieOptions} />
                  </div>
                  
                  {/* Performance Comparison */}
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-md font-medium text-gray-800 mb-2">Performance Comparison</h4>
                    <Bar data={performanceComparisonData} options={barOptions} />
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 className="text-md font-medium text-gray-800 mb-2">Performance Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Current Attendance</p>
                      <p className={`text-xl font-bold ${parseInt(student.attendance_percent) < 75 ? 'text-red-500' : 'text-green-500'}`}>
                        {student.attendance_percent}%
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Average Score</p>
                      <p className={`text-xl font-bold ${parseInt(student.average_score) < 60 ? 'text-red-500' : 'text-green-500'}`}>
                        {student.average_score}/100
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Fee Status</p>
                      <p className={`text-xl font-bold ${parseInt(student.days_overdue) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {parseInt(student.days_overdue) > 0 ? `${student.days_overdue} days overdue` : 'Paid'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailView;