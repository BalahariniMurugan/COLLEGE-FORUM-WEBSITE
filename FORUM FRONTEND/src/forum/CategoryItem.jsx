import React from 'react';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <li className="category-item">
      <span>{category.name}</span>
      <button onClick={() => onEdit(category)}>Edit</button>
      <button onClick={() => onDelete(category.id)}>Delete</button>
    </li>
  );
};

export default CategoryItem;
