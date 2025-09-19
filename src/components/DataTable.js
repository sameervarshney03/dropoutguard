import React, { useState } from 'react';
import StudentModal from './StudentModal';

const DataTable = ({ students, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'risk', direction: 'descending' });
  const [selectedStudent, setSelectedStudent] = useState(null);

  const sortedStudents = React.useMemo(() => {
    let sortableItems = [...students];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [students, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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

  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('risk')}>
                      Risk Level
                      {sortConfig.key === 'risk' && (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedStudents.map((student) => (
                    <tr 
                      key={student.student_id} 
                      onClick={() => {
                        setSelectedStudent(student);
                        if (onRowClick) {
                          onRowClick(student);
                        }
                      }} 
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendance_percent}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.average_score}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.days_overdue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getRiskColor(student.risk)}`}>
                          {student.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Only show the modal if we're not using the external detail view */}
      {selectedStudent && !onRowClick && <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </>
  );
};

export default DataTable;
