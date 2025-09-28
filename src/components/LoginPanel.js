import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPanel = () => {
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Demo credentials
    const validCredentials = {
      student: { username: 'student', password: 'password' },
      teacher: { username: 'teacher', password: 'password' }
    };

    if (username === validCredentials[userType].username && 
        password === validCredentials[userType].password) {
      // Redirect based on user type
      if (userType === 'student') {
        navigate('/student');
      } else {
        navigate('/teacher');
      }
    } else {
      setError('Invalid credentials. For demo, use username: ' + validCredentials[userType].username + 
               ' and password: ' + validCredentials[userType].password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">DropoutGuard</h1>
          <p className="text-gray-600 mt-2">Student Dropout Prevention System</p>
        </div>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 ${userType === 'student' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-md focus:outline-none`}
            onClick={() => setUserType('student')}
          >
            Student
          </button>
          <button
            className={`flex-1 py-2 ${userType === 'teacher' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-md focus:outline-none`}
            onClick={() => setUserType('teacher')}
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Demo credentials:</p>
            <p>Student: username "student", password "password"</p>
            <p>Teacher: username "teacher", password "password"</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPanel;