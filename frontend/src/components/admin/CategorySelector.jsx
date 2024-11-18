import React, { useState } from 'react';

const CategorySelector = ({ 
  categories = [], // Now expects an array of category objects with _id and name
  selectedCategories = [], 
  setSelectedCategories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category._id)) {
      setSelectedCategories(selectedCategories.filter(id => id !== category._id));
    } else {
      setSelectedCategories([...selectedCategories, category._id]);
    }
  };

  // Helper function to find category name by id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : '';
  };

  return (
    <div className="w-full max-w-md border rounded-md">
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left flex justify-between items-center hover:bg-gray-50"
      >
        <span className="text-sm">
          {selectedCategories.length === 0 
            ? "Select categories..." 
            : `${selectedCategories.length} categories selected`}
        </span>
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Selected categories */}
      {selectedCategories.length > 0 && (
        <div className="px-3 py-2 border-t flex flex-wrap gap-2">
          {selectedCategories.map(categoryId => (
            <span 
              key={categoryId}
              className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-md"
            >
              {getCategoryName(categoryId)}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory({ _id: categoryId });
                }}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown menu */}
      {isOpen && (
        <div className="border-t max-h-60 overflow-y-auto">
          {categories.map(category => (
            <button
              key={category._id}
              type="button"
              onClick={() => toggleCategory(category)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span className="w-4 h-4 flex items-center justify-center border rounded-sm">
                {selectedCategories.includes(category._id) && "✓"}
              </span>
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;