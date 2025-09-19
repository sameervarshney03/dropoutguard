import React from 'react';

const DownloadButton = ({ students }) => {
  const downloadDigest = () => {
    const highRiskStudents = students.filter(
      (student) => student.risk === 'HIGH' || student.risk === 'MEDIUM'
    );

    if (highRiskStudents.length === 0) {
      alert('No medium or high risk students to download.');
      return;
    }

    const csvContent = [
      ['student_id', 'name', 'attendance_percent', 'average_score', 'days_overdue', 'risk'].join(','),
      ...highRiskStudents.map((student) =>
        [
          student.student_id,
          student.name,
          student.attendance_percent,
          student.average_score,
          student.days_overdue,
          student.risk,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'weekly_digest.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadDigest}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Download Weekly Digest
    </button>
  );
};

export default DownloadButton;
