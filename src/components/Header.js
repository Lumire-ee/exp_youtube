import React, { useEffect, useState } from 'react';
import { Menu, Youtube, Search, Bell, User, ArrowLeft } from 'lucide-react';

import Sidebar from './Sidebar';
import SearchVideos from './SearchVideos';

function Header({
  onSearch,
  searchHistory,
  onDeleteHistory,
  onCategorySelect,
  selectedCategory,
}) {
  const [showSearch, setShowSearch] = useState(false); // 검색창 표시 상태
  const [isLargeScreen, setIsLargeScreen] = useState(false); // 화면 크기 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 표시 상태

  useEffect(() => {
    // 화면 크기 변경 감지
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640); // 640px 이상일 때는 큰 화면으로 간주
      if (window.innerWidth >= 640) {
        setShowSearch(false); // 큰 화면에서는 검색창을 숨김
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-2">
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={24} className="cursor-pointer text-grayDark" />
          </button>
          <div className="flex items-center">
            <Youtube size={24} className="cursor-pointer text-red" />
            <span className="ml-2 text-large font-semibold text-black">
              YouTube
            </span>
          </div>
        </div>

        {showSearch && !isLargeScreen ? (
          <button onClick={() => setShowSearch(false)} className="sm:hidden">
            <ArrowLeft size={24} className="cursor-pointer text-grayDark" />
          </button>
        ) : null}
        {isLargeScreen || showSearch ? (
          <SearchVideos
            isLargeScreen={isLargeScreen}
            onClose={() => setShowSearch(false)}
            onSearch={onSearch}
            searchHistory={searchHistory}
            onDeleteHistory={onDeleteHistory}
          />
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="ml-64 sm:hidden"
          >
            <Search size={24} className="cursor-pointer text-grayDark" />
          </button>
        )}

        <div className="flex items-center space-x-4">
          <Bell size={24} className="cursor-pointer text-darkGray" />
          <User size={24} className="cursor-pointer text-darkGray" />
        </div>
      </header>

      {/* Sidebar Container (항상 DOM상에 존재) */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-60 overflow-y-auto bg-white transition-transform duration-300
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCategorySelect={onCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
}

export default Header;
