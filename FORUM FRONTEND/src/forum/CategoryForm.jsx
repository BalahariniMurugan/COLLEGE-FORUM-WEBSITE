import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [name, setName] = useState(category ? category.name : '');

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name);
  };

  return (
    <div className="category-form">
      <h3>{category ? 'Edit Category' : 'Add Category'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CategoryForm;
