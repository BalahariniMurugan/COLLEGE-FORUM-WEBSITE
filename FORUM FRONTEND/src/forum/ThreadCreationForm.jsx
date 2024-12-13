import React, { useState } from 'react';
import './ThreadCreationForm.css';

const ThreadCreationForm = ({ onCreate, onClose }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onCreate(title);
      setTitle('');
    }
  };

  return (
    <form className="thread-creation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Thread Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Thread</button>
      <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
    </form>
  );
};

export default ThreadCreationForm;
