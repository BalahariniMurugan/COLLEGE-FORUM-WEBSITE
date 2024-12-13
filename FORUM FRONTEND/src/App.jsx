import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Navbar from './components/Navbar';
import UserProfile from './forum/UserProfile';
import ForumHome from './forum/ForumHome'; 
import Thread from './forum/Thread'; 
import Post from './forum/Post'; 
import Categories from './forum/Categories';
import PopularQuestions from './forum/PopularQuestions';
import RecentActivity from './forum/RecentActivity';
import TopContributors from './forum/TopContributors';
import Leaderboard from './forum/Leaderboard';
import Announcements from './forum/Announcements';
import ResourceSharing from './forum/ResourceSharing';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forum" element={<ProtectedRoute><ForumHome /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/forum/thread/:id" element={<ProtectedRoute><Thread /></ProtectedRoute>} />
          <Route path="/forum/post/:id" element={<ProtectedRoute><Post /></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/popular-questions" element={<ProtectedRoute><PopularQuestions /></ProtectedRoute>} />
          <Route path="/recent-activity" element={<ProtectedRoute><RecentActivity /></ProtectedRoute>} />
          <Route path="/top-contributors" element={<ProtectedRoute><TopContributors /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
          <Route path="/resource-sharing" element={<ProtectedRoute><ResourceSharing /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
