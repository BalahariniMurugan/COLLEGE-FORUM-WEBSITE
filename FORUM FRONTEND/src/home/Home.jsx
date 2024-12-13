import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="main-container">
      <div className="blur-circle1"></div>
      <div className="blur-circle2"></div>
      
      <div className="landing-page">
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Welcome to the SKCT Forum</h1>
              <p>Join the vibrant community of Sri Krishna College of Technology! Connect, share, and collaborate with fellow students and faculty. Let's build a thriving academic network together.</p>
              <Link to="/login"><button>Join Now</button></Link>
            </div>
            <div className="image">
              {/* Add any image or content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
