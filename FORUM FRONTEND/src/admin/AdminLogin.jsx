import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css'; // Ensure this path is correct

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin13') {
      await login({ username, role: 'admin' });
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div id="admin-box">
      {error && <p id="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2 id="adminTitle">Admin Login</h2>
        <div className="user-box">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" " /* Add placeholder to support label animation */
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" " /* Add placeholder to support label animation */
          />
          <label>Password</label>
        </div>
        <button type="submit" id="loginBtn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
