import React from 'react';

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH':
        return 'text-red-500';
      case 'MEDIUM':
        return 'text-yellow-500';
      case 'LOW':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {student.name}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <strong>Student ID:</strong> {student.student_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Attendance:</strong> {student.attendance_percent}%
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Average Score:</strong> {student.average_score}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Fee Overdue:</strong> {student.days_overdue} days
                  </p>
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-800">Risk Analysis</h4>
                    <p className={`text-lg font-bold ${getRiskColor(student.risk)}`}>{student.risk}</p>
                    <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                      {student.flagDetails.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
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

export default StudentModal;
