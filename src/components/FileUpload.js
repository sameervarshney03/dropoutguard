import React, { useState } from 'react';

const FileUpload = ({ onUpload }) => {
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [testsFile, setTestsFile] = useState(null);
  const [feesFile, setFeesFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('attendance', attendanceFile);
    formData.append('tests', testsFile);
    formData.append('fees', feesFile);

    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      onUpload();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Upload New Data</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="attendance-file" className="block text-sm font-medium text-gray-700">
            Attendance CSV
          </label>
          <input
            id="attendance-file"
            type="file"
            accept=".csv"
            onChange={(e) => setAttendanceFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label htmlFor="tests-file" className="block text-sm font-medium text-gray-700">
            Tests CSV
          </label>
          <input
            id="tests-file"
            type="file"
            accept=".csv"
            onChange={(e) => setTestsFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label htmlFor="fees-file" className="block text-sm font-medium text-gray-700">
            Fees CSV
          </label>
          <input
            id="fees-file"
            type="file"
            accept=".csv"
            onChange={(e) => setFeesFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={!attendanceFile || !testsFile || !feesFile}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Upload and Process
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
