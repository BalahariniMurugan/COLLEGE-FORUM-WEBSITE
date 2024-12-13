import React from 'react';
import './Footer.css'; // Import the CSS file for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
        
        <div className="footer-contact-info">
          <p>Email: contact@skct.edu.in</p>
          <p>Phone: +91 123 456 7890</p>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Sri Krishna College of Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
