import React, { useEffect, useRef, useState } from 'react';
import { Search, ArrowLeft, History } from 'lucide-react';

function SearchVideos({
  isLargeScreen,
  onClose,
  onSearch,
  searchHistory,
  onDeleteHistory,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      console.log('검색어 전달', searchTerm); // DEBUG
      onSearch(searchTerm);
      setShowHistory(false);
    }
    console.log('검색어', searchTerm);
  };

  const handleHistoryClick = (query) => {
    setSearchTerm(query);
    onSearch(query);
    setShowHistory(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative mx-4 flex w-full max-w-3xl rounded-full border border-grayLighter"
    >
      <form
        onClick={() => setShowHistory(true)}
        onSubmit={handleSearch}
        className="flex w-full items-center rounded-full focus:border-bluePrimary focus:outline-none sm:text-base"
      >
        {!isLargeScreen && (
          <button onClick={onClose} className="px-4">
            <ArrowLeft size={24} className="text-grayDark" />
          </button>
        )}

        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowHistory(true);
          }}
          className="grow rounded-l-full border-0 border-grayLighter px-4 py-2 text-medium "
        />
        <button
          type="submit"
          className="rounded-r-full bg-grayLightest px-4 py-3 hover:bg-lightBlue"
        >
          <Search size={20} className="cursor-pointer text-grayDark" />
        </button>
      </form>

      {showHistory && searchHistory.length > 0 && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-medium bg-white">
          <ul>
            {searchHistory.map((query, index) => (
              <li
                key={index}
                className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-grayLighter"
              >
                <div
                  className="flex w-[90%] cursor-pointer items-center space-x-2"
                  onClick={() => handleHistoryClick(query)}
                >
                  <History size={18} className="text-grayDark" />
                  <span className="flex-1 truncate text-medium text-darkGray">
                    {query}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteHistory(index);
                  }}
                  className="text-medium text-bluePrimary hover:underline"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchVideos;
