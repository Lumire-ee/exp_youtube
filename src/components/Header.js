import React, { useEffect, useState } from 'react';
import { Menu, Youtube, Search, Bell, User, Plus } from 'lucide-react'; // ArrowLeft 제거
import Sidebar from './Sidebar';
import SearchVideos from './SearchVideos';

function Header({ onSearch, searchHistory, onDeleteHistory }) {
  const [showSearch, setShowSearch] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
      if (window.innerWidth >= 640) setShowSearch(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar Container */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-60 bg-white transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Header */}
      <header className="relative flex items-center justify-between px-4 py-2">
        {/* Left Section */}
        <div className="flex items-center">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={24} className="mr-4 text-grayDark" />
          </button>
          <div className="flex items-center">
            <Youtube size={24} className="text-red" />
            <h1 className="ml-2 text-lg font-semibold text-black">YouTube</h1>
          </div>
        </div>

        {/* Center Section */}
        {isLargeScreen || showSearch ? (
          <SearchVideos
            isLargeScreen={isLargeScreen}
            onClose={() => setShowSearch(false)}
            onSearch={onSearch}
            searchHistory={searchHistory}
            onDeleteHistory={onDeleteHistory}
          />
        ) : null}

        {/* Right Section */}
        <div className="relative flex items-center space-x-4">
          {!isLargeScreen && !showSearch && (
            <button onClick={() => setShowSearch(true)}>
              <Search size={24} className="text-grayDark" />
            </button>
          )}
          <Plus size={24} className="cursor-pointer text-grayDark" />
          <Bell size={24} className="cursor-pointer text-grayDark" />
          <div className="relative">
            <User
              size={24}
              className="cursor-pointer text-grayDark"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-64 rounded-lg border bg-white shadow-lg">
                <div className="flex items-center gap-3 border-b p-4">
                  <User size={40} className="text-grayDark" />
                  <div>
                    <p className="font-semibold text-gray-800">사용자1</p>
                    <p className="text-sm text-gray-500">@사용자1</p>
                    <button
                      className="mt-2 text-sm font-medium text-blue-500"
                      onClick={() => (window.location.href = '/my-channel')}
                    >
                      내 채널 보기
                    </button>
                  </div>
                </div>
                <ul>
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    Google 계정
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    계정 전환
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    로그아웃
                  </li>
                  <hr />
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    설정
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    고객센터
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    YouTube 스튜디오
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
