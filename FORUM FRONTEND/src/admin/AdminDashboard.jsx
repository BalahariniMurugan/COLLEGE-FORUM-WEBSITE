import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaChartPie, FaChartBar, FaTable, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import './AdminDashboard.css';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { currentUser: admin } = useAuth(); // Make sure this returns the correct user info
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    // Fetch students and faculty from local storage or API
    const fetchedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const fetchedFaculty = JSON.parse(localStorage.getItem('faculty')) || [];
    setStudents(fetchedStudents);
    setFaculty(fetchedFaculty);
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {admin.email}</p>
      </header>
      <nav className="admin-sidebar">
        <ul>
          <li>
            <Link to="/admin/students">
              <FaUserGraduate /> Manage Students
            </Link>
          </li>
          <li>
            <Link to="/admin/faculty">
              <FaChalkboardTeacher /> Manage Faculty
            </Link>
          </li>
          <li>
            <Link to="/admin/analytics">
              <FaChartPie /> Analytics
            </Link>
          </li>
          <li>
            <Link to="/admin/reports">
              <FaTable /> Reports
            </Link>
          </li>
        </ul>
      </nav>
      <main className="admin-content">
        <h2>Overview</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <FaUsers className="dashboard-icon" />
            <div className="dashboard-info">
              <h3>{students.length}</h3>
              <p>Students</p>
            </div>
          </div>
          <div className="dashboard-card">
            <FaUsers className="dashboard-icon" />
            <div className="dashboard-info">
              <h3>{faculty.length}</h3>
              <p>Faculty</p>
            </div>
          </div>
        </div>
        <div className="dashboard-charts">
          <div className="chart-container">
            <h3>Student vs Faculty</h3>
            <canvas id="studentFacultyChart"></canvas>
          </div>
          <div className="chart-container">
            <h3>Posts Activity</h3>
            <canvas id="postsActivityChart"></canvas>
          </div>
        </div>
        <div className="dashboard-table">
          <h3>Recent Activity</h3>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Render recent activity rows here */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
