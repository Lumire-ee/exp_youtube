import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CategorySlider({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showArrows, setShowArrows] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const container = categoryRef.current;
      if (container) {
        setShowArrows(container.scrollWidth > container.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const scrollLeft = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollLeft += 200;
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative flex items-center bg-white py-2">
      {showArrows && (
        <button
          onClick={scrollLeft}
          className="rounded-full p-2 hover:bg-grayLighter"
        >
          <ChevronLeft size={24} className="cursor-pointer text-grayDark" />
        </button>
      )}
      <div
        ref={categoryRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-3"
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-grayLightest text-grayDark hover:bg-grayLighter'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {showArrows && (
        <button
          onClick={scrollRight}
          className="rounded-full p-2 hover:bg-grayLighter"
        >
          <ChevronRight size={24} className="cursor-pointer text-grayDark" />
        </button>
      )}
    </div>
  );
}

export default CategorySlider;
