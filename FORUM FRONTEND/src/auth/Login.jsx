import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '', role: 'student' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setValues({ ...values, email });
    setEmailError(validateEmail(email) ? '' : 'Invalid email format');
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setValues({ ...values, password });
    const requiredPasswordLength = values.role === 'student' ? 6 : 8;
    setPasswordError(password.length < requiredPasswordLength ? `Password must be at least ${requiredPasswordLength} characters long` : '');
  };

  const handleRoleChange = (event) => {
    setValues({ ...values, role: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const requiredPasswordLength = values.role === 'student' ? 6 : 8;

    if (values.email && validateEmail(values.email) && values.password.length >= requiredPasswordLength) {
      const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
      const matchingUser = registeredUsers.find(
        (user) => user.email === values.email && user.password === values.password && user.role === values.role
      );

      if (matchingUser) {
        await login(matchingUser);
        navigate('/forum');
      } else {
        setPasswordError('Invalid credentials. Please check your email, password, or role.');
      }
    } else {
      setEmailError(!values.email ? 'Email is required' : validateEmail(values.email) ? '' : 'Invalid email format');
      setPasswordError(!values.password ? 'Password is required' : values.password.length < requiredPasswordLength ? `Password must be at least ${requiredPasswordLength} characters long` : '');
    }
  };

  return (
    <div id="login-box">
      <form onSubmit={handleFormSubmit}>
        <h2 id="loginTitle">Login</h2>
        <div className="user-box">
          <input
            type="text"
            id="email"
            onChange={handleEmailChange}
            value={values.email}
          />
          <label htmlFor="email">Email</label>
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="user-box">
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={values.password}
          />
          <label htmlFor="password">Password</label>
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div className="user-box">
          <select id="role" value={values.role} onChange={handleRoleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          <label htmlFor="role">Role</label>
        </div>
        <button type="submit" id="loginBtn">Login</button>
        <div className="user-account">
          <h4>Don't have an account?</h4>
        </div>
        <button id="signupBtn">
          <Link to="/signup" className="no-underline">Sign up here</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
