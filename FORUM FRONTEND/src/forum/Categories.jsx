import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import './Categories.css';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch categories from API or state
    const fetchedCategories = [
      { id: 1, name: 'General Discussion' },
      { id: 2, name: 'Assignments' },
    ];
    setCategories(fetchedCategories);
  }, []);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSaveCategory = (name) => {
    if (editingCategory) {
      // Update category logic
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, name } : cat
      ));
    } else {
      // Add category logic
      const newCategory = { id: Date.now(), name };
      setCategories([newCategory, ...categories]);
    }
    setShowForm(false);
  };

  const handleDeleteCategory = (id) => {
    // Delete category logic
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="categories">
      <h2>Category Management</h2>
      <button onClick={handleAddCategory}>Add New Category</button>
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={handleCancel}
        />
      )}
      <CategoryList
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
};

export default Categories;
