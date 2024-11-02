import React, { useState } from 'react';

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports & Outdoors",
  "Toys & Games",
  "Health & Beauty"
];

const CategorySelector = ({ selectedCategories = [], setSelectedCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
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
          {selectedCategories.map(category => (
            <span 
              key={category}
              className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-md"
            >
              {category}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category);
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
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span className="w-4 h-4 flex items-center justify-center border rounded-sm">
                {selectedCategories.includes(category) && "✓"}
              </span>
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;