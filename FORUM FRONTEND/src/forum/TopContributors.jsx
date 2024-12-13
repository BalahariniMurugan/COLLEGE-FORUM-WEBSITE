// src/components/TopContributors.jsx
import React, { useEffect, useState } from 'react';
import './TopContributors.css';

const TopContributors = () => {
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    // Simulated data for top contributors
    const contributors = [
      {
        id: 1,
        name: 'John Doe',
        posts: 50,
        likes: 200,
        comments: 100,
      },
      {
        id: 2,
        name: 'Jane Smith',
        posts: 45,
        likes: 180,
        comments: 90,
      },
    ];

    // Sort by total contributions (posts + likes + comments)
    const sortedContributors = contributors.sort((a, b) => (b.posts + b.likes + b.comments) - (a.posts + a.likes + a.comments));
    setTopContributors(sortedContributors);
  }, []);

  return (
    <div className="top-contributors">
      <h3>Top Contributors</h3>
      <ul>
        {topContributors.map(contributor => (
          <li key={contributor.id}>
            <span>{contributor.name}</span> - 
            <span>{contributor.posts} Posts</span> | 
            <span>{contributor.likes} Likes</span> | 
            <span>{contributor.comments} Comments</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
