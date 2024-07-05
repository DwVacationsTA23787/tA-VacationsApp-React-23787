import React from 'react';
import './CategorySelection.css';

function CategorySelection({ selectedCategory, onCategorySelect }) {
  const categories = ['All', 'Adventure', 'Leisure', 'Cultural', 'Business', 'Family'];

  return (
    <div className='row mt-4'>
      <p className='ExploreText'>
        Explore Travels
      </p>
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelection;
