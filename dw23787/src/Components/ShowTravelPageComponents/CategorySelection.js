import React from 'react';
import './CategorySelection.css';
import { useAppContext } from '../AppContext';
import { ShowTravelsphrases } from '../../Utils/language';

function CategorySelection({ selectedCategory, onCategorySelect }) {
  const categories = ['All', 'Adventure', 'Leisure', 'Cultural', 'Business', 'Family'];

  // App context variables for language conversion.
  const { language } = useAppContext();
  const {
      explore,
      tipo1,
      tipo2,
      tipo3,
      tipo4,
      tipo5,
      tipo6,
  } = ShowTravelsphrases[language];

  // In order to display the categorys in the different languages.
  const tipos = [tipo1, tipo2, tipo3, tipo4, tipo5, tipo6];

  return (
    <div className='row mt-4 ml-1'>
      <p className='ExploreText'>
       {explore}
      </p>
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {tipos[index]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelection;
