// src/components/PopularQuestions.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PopularQuestions.css';

const PopularQuestions = () => {
  const [popularThreads, setPopularThreads] = useState([]);

  useEffect(() => {
    // Simulated data for popular threads
    const threads = [
      {
        id: 1,
        title: 'How to solve XYZ problem?',
        views: 150,
        likes: 10,
        comments: 5,
      },
      {
        id: 2,
        title: 'Best practices for ABC assignment',
        views: 200,
        likes: 20,
        comments: 8,
      },
    ];

    // Sort by views, likes, and comments
    const sortedThreads = threads.sort((a, b) => (b.views + b.likes + b.comments) - (a.views + a.likes + a.comments));
    setPopularThreads(sortedThreads);
  }, []);

  return (
    <div className="popular-questions">
      <h3>Popular Questions</h3>
      <ul>
        {popularThreads.map(thread => (
          <li key={thread.id}>
            <Link to={`/forum/thread/${thread.id}`}>
              {thread.title}
            </Link>
            <div className="thread-metrics">
              <span>{thread.views} Views</span> | 
              <span>{thread.likes} Likes</span> | 
              <span>{thread.comments} Comments</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularQuestions;
