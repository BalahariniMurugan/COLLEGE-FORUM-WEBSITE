import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!values.name) newErrors.name = 'Name is required';
    if (!values.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = 'Invalid email format';

    if (!values.password) newErrors.password = 'Password is required';
    if (!values.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (values.password !== values.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Save user details (You can replace this with actual backend logic)
      const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = registeredUsers.some((user) => user.email === values.email);

      if (userExists) {
        setErrors({ email: 'User with this email already exists' });
      } else {
        registeredUsers.push({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        });

        localStorage.setItem('users', JSON.stringify(registeredUsers));
        alert('Sign up successful! You can now log in.');
        navigate('/login');
      }
    }
  };

  return (
    <div id="signup-box">
      <form onSubmit={handleSubmit}>
        <h2 id="signupTitle">Sign Up</h2>
        <div className="user-box">
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          <label htmlFor="name">Name</label>
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="user-box">
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
          <label htmlFor="email">Email</label>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="user-box">
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          <label htmlFor="password">Password</label>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="user-box">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>
        <div className="user-box">
          <select id="role" name="role" value={values.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          <label htmlFor="role">Role</label>
        </div>
        <button type="submit" id="signupBtn">Sign Up</button>
        <div className="user-account">
          <h4>Already have an account?</h4>
        </div>
        <button id="loginBtn">
          <Link to="/login" className="no-underline">Login here</Link>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
