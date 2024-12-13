import React, { useState, useEffect } from 'react';
import './Announcements.css';
import { useAuth } from '../context/AuthContext';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const { currentUser: user } = useAuth();

  useEffect(() => {
    // Simulate fetching announcements from an API or state
    const fetchedAnnouncements = [
      { id: 1, text: 'Midterm exams will start next week.', author: 'faculty1@example.com' },
      { id: 2, text: 'New assignment has been posted.', author: 'faculty2@example.com' },
    ];
    setAnnouncements(fetchedAnnouncements);
  }, []);

  const handleCreateAnnouncement = () => {
    if (user && user.role === 'faculty' && newAnnouncement.trim()) {
      const newAnn = {
        id: Date.now(),
        text: newAnnouncement,
        author: user.email
      };
      setAnnouncements([newAnn, ...announcements]);
      setNewAnnouncement('');
    }
  };

  return (
    <div className="announcements">
      <h2>Announcements</h2>
      {user.role === 'faculty' && (
        <div className="announcement-creation">
          <input
            type="text"
            placeholder="Write an announcement..."
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
          />
          <button onClick={handleCreateAnnouncement}>Post Announcement</button>
        </div>
      )}
      <ul className="announcement-list">
        {announcements.map(announcement => (
          <li key={announcement.id} className="announcement-item">
            <p>{announcement.text}</p>
            <span className="announcement-author">Posted by: {announcement.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
