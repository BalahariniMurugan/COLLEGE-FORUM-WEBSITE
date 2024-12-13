import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlusCircle, FaFire, FaBell, FaUser, FaTrophy, FaFolderOpen, FaBullhorn, FaFileUpload, FaThumbsUp, FaCommentAlt, FaEye ,FaFolder} from 'react-icons/fa';
import './ForumHome.css';
import { useAuth } from '../context/AuthContext';
import ThreadCreationForm from './ThreadCreationForm';

const ForumHome = () => {
  const [threads, setThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showThreadForm, setShowThreadForm] = useState(false);
  const { currentUser: user } = useAuth(); // Make sure this returns the correct user info

  useEffect(() => {
    // Simulate fetching threads from an API or state
    const fetchedThreads = [
      {
        id: 1,
        title: 'How to solve XYZ problem?',
        description: 'Can anyone help with XYZ problem? Here’s what I’ve tried so far...',
        author: 'student1@example.com',
        views: 150,
        replies: 3,
        likes: 10,
        comments: 5,
        answered: true
      },
      {
        id: 2,
        title: 'Best practices for ABC assignment',
        description: 'What are some best practices for the ABC assignment?',
        author: 'student2@example.com',
        views: 200,
        replies: 5,
        likes: 20,
        comments: 8,
        answered: false
      },
    ];
    setThreads(fetchedThreads);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredThreads = threads.filter(thread => thread.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setThreads(filteredThreads);
  };

  const handleCreateThread = (title) => {
    if (user) {
      const newThread = {
        id: Date.now(),
        title,
        description: `Description for ${title}`,
        author: user.email,
        views: 0,
        replies: 0,
        likes: 0,
        comments: 0,
        answered: false
      };
      setThreads([newThread, ...threads]);
      setShowThreadForm(false);
    }
  };

  const handleDeleteThread = (threadId) => {
    if (user && (user.role === 'faculty' || user.email === threads.find(thread => thread.id === threadId)?.author)) {
      setThreads(threads.filter(thread => thread.id !== threadId));
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="forum-home">
      <header className="forum-header">
        <div className="forum-logo">
          <h1>College Forum</h1>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </header>
      <div className="forum-container">
        <nav className="forum-sidebar">
          {/* <div className="sidebar-item">
            <FaFolderOpen className="sidebar-icon" />
            <Link to="/categories" className="sidebar-link">Category Management</Link>
          </div> */}
          {(user.role === 'faculty' || user.role === 'student') && (
            <div className="sidebar-item">
              <FaPlusCircle className="sidebar-icon" />
              <Link to="#" className="sidebar-link" onClick={() => setShowThreadForm(true)}>Create Thread</Link>
            </div>
          )}
          <div className="sidebar-item">
            <FaFire className="sidebar-icon" />
            <Link to="/popular-questions" className="sidebar-link">Popular Questions</Link>
          </div>
          <div className="sidebar-item">
            <FaBell className="sidebar-icon" />
            <Link to="/recent-activity" className="sidebar-link">Recent Activity</Link>
          </div>
          <div className="sidebar-item">
            <FaUser className="sidebar-icon" />
            <Link to="/top-contributors" className="sidebar-link">Top Contributors</Link>
          </div>
          <div className="sidebar-item">
            <FaFolder className="sidebar-icon" />
            <Link to="/studentpost" className="sidebar-link">Student Post</Link>
          </div>
          <div className="sidebar-item">
            <FaFolder className="sidebar-icon" />
            <Link to="/faculty" className="sidebar-link">Faculty Post</Link>
          </div>
          <div className="sidebar-item">
            <FaBullhorn className="sidebar-icon" />
            <Link to="/announcements" className="sidebar-link">Announcements</Link>
          </div>
          
        </nav>
        <main className="forum-content">
          {showThreadForm && <ThreadCreationForm onCreate={handleCreateThread} onClose={() => setShowThreadForm(false)} />}
          <h2>Forum Home</h2>
          <ul className="thread-list">
            {threads.map(thread => (
              <li key={thread.id} className="thread-item">
                <Link to={`/forum/thread/${thread.id}`}>
                  <h3>{thread.title}</h3>
                  <p>{thread.description}</p>
                </Link>
                <div className="thread-info">
                  <span><FaThumbsUp /> {thread.likes} Likes</span>
                  <span><FaCommentAlt /> {thread.comments} Comments</span>
                  <span><FaEye /> {thread.views} Views</span>
                </div>
                {(user.role === 'faculty' || user.email === thread.author) && (
                  <button className="delete-button" onClick={() => handleDeleteThread(thread.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ForumHome;
