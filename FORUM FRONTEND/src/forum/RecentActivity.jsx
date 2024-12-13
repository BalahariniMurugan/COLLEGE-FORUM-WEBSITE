// src/components/RecentActivity.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecentActivity.css';

const RecentActivity = () => {
  const [recentThreads, setRecentThreads] = useState([]);

  useEffect(() => {
    // Simulated data for recent activity
    const threads = [
      {
        id: 3,
        title: 'Need help with JavaScript',
        lastActivity: '2024-08-04 10:00',
      },
      {
        id: 4,
        title: 'React best practices',
        lastActivity: '2024-08-04 09:30',
      },
    ];

    // Sort by last activity
    const sortedThreads = threads.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
    setRecentThreads(sortedThreads);
  }, []);

  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <ul>
        {recentThreads.map(thread => (
          <li key={thread.id}>
            <Link to={`/forum/thread/${thread.id}`}>
              {thread.title}
            </Link>
            <div className="thread-activity">
              <span>Last activity: {thread.lastActivity}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
