import React from 'react';
import CategoryItem from './CategoryItem'; // Import CategoryItem component

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="category-list">
      <h3>Existing Categories</h3>
      <ul>
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
