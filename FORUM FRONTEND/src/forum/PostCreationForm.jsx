import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './PostCreationForm.css';

const PostCreationForm = ({ onCreate }) => {
  const [content, setContent] = useState('');
  const { user } = useAuth(); // Fetch the logged-in user details

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      const post = {
        content,
        author: user.email, // Use logged-in user's email
        role: user.role, // Use the user's role directly
        date: new Date().toLocaleDateString(),
      };
      onCreate(post);
      setContent('');
    }
  };

  return (
    <form className="post-creation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="content">Post Content</label>
        <textarea
          className="form-control"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Post</button>
    </form>
  );
};

export default PostCreationForm;
