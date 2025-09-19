import React from 'react';

const StudentCard = ({ student, showRisk = true, onClick }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH':
        return 'bg-red-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressColor = (value, thresholds) => {
    if (value < thresholds.low) return 'bg-red-500';
    if (value < thresholds.medium) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getInverseProgressColor = (value, thresholds) => {
    if (value > thresholds.high) return 'bg-red-500';
    if (value > thresholds.medium) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Calculate progress percentages
  const attendanceProgress = parseInt(student.attendance_percent);
  const scoreProgress = (parseInt(student.average_score) / 100) * 100;
  const duesProgress = Math.min(parseInt(student.days_overdue), 90) / 90 * 100;

  // Get colors based on thresholds
  const attendanceColor = getProgressColor(attendanceProgress, { low: 75, medium: 85 });
  const scoreColor = getProgressColor(scoreProgress, { low: 40, medium: 60 });
  const duesColor = getInverseProgressColor(parseInt(student.days_overdue), { medium: 15, high: 30 });

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-600">ID: {student.student_id}</p>
          </div>
          {showRisk && (
            <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${getRiskColor(student.risk)}`}>
              {student.risk}
            </span>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-700 mb-1">
              <span>Attendance</span>
              <span>{attendanceProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${attendanceColor}`} 
                style={{ width: `${attendanceProgress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-700 mb-1">
              <span>Score</span>
              <span>{student.average_score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${scoreColor}`} 
                style={{ width: `${scoreProgress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-700 mb-1">
              <span>Dues (Days Overdue)</span>
              <span>{student.days_overdue}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${duesColor}`} 
                style={{ width: `${duesProgress}%` }}
              ></div>
            </div>
          </div>

          {showRisk && student.flagDetails && student.flagDetails.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Risk Factors:</p>
              <ul className="text-xs text-gray-600 list-disc list-inside">
                {student.flagDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;