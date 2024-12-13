import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './UserDashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboard = () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Forum Activity',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [65, 59, 80, 81, 56, 55]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333'
        }
      },
      title: {
        display: true,
        text: 'Forum Activity Over Time',
        padding: {
          top: 10,
          bottom: 30
        },
        color: '#333'
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#333'
        },
        title: {
          display: true,
          text: 'Months',
          color: '#333'
        }
      },
      y: {
        ticks: {
          color: '#333'
        },
        title: {
          display: true,
          text: 'Activity',
          color: '#333'
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <p>This is your personal space where you can manage your activities, view your profile, and more.</p>
      
      <div className="info-cards">
        <div className="card">
          <h3>Forum Activity</h3>
          <p>Stay updated with the latest posts and discussions in the forum.</p>
        </div>
        <div className="card">
          <h3>Your Contributions</h3>
          <p>View and manage the posts and comments you have made.</p>
        </div>
        <div className="card">
          <h3>Upcoming Events</h3>
          <p>Check out the upcoming events and deadlines in the college.</p>
        </div>
        <div className="card">
          <h3>Resources</h3>
          <p>Access study materials and other resources shared by the community.</p>
        </div>
      </div>

      <div className="info-table">
        <h3>Recent Forum Posts</h3>
        <table>
          <thead>
            <tr>
              <th>Post Title</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>How to prepare for exams?</td>
              <td>John Doe</td>
              <td>2024-07-29</td>
            </tr>
            <tr>
              <td>Project ideas for final year</td>
              <td>Jane Smith</td>
              <td>2024-07-28</td>
            </tr>
            <tr>
              <td>Best resources for learning React</td>
              <td>Alex Johnson</td>
              <td>2024-07-27</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default UserDashboard;
