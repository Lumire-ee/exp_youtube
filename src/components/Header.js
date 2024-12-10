import { Menu, Youtube, Search, Bell, User, ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function Header() {
  const [showSearch, setShowSearch] = useState(false); // 검색창 표시 상태
  const [isLargeScreen, setIsLargeScreen] = useState(false); // 화면 크기 상태

  useEffect(() => {
    // 화면 크기 변경 감지
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640); // 640px 이상일 때는 큰 화면으로 간주
      if (window.innerWidth >= 640) {
        setShowSearch(false); // 큰 화면에서는 검색창을 숨김
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <header className="flex items-center justify-between px-4 py-2">
        {/* Left Section: 로고 및 메뉴 */}
        <div className="mr-5 flex items-center">
          {/* 640px 미만일 때 검색창이 열려있으면 뒤로가기 버튼 추가 */}
          {showSearch && !isLargeScreen ? (
            <button onClick={() => setShowSearch(false)} className="sm:hidden">
              <ArrowLeft size={24} className="cursor-pointer text-grayDark" />
            </button>
          ) : (
            <Menu size={24} className="mr-4 cursor-pointer text-grayDark" />
          )}
          {/* 검색창이 열려있지 않으면 로고와 메뉴 표시 */}
          {!showSearch && (
            <div className="flex items-center">
              <Youtube size={24} className="cursor-pointer text-red" />
              <h1 className="text-lg font-semibold text-black">YouTube</h1>
            </div>
          )}
        </div>

        {/* Center Section: 검색창 */}
        {isLargeScreen || showSearch ? (
          // 640px 이상이거나 검색 버튼이 눌려있을때 검색창 표시
          <div className="mr-5 flex w-full max-w-3xl rounded-full border border-grayLighter">
            <input
              type="text"
              placeholder="검색"
              className="grow rounded-l-full border-0 border-grayLighter px-4 py-2 text-sm focus:border-bluePrimary focus:outline-none sm:text-base"
            />
            <button
              onClick={() => setShowSearch(false)}
              className="rounded-r-full border-0 border-grayLighter bg-grayLightest px-4 py-2 hover:bg-lightBlue"
            >
              <Search size={20} className="cursor-pointer text-grayDark" />
            </button>
          </div>
        ) : null}

        {/* Right Section: 검색 버튼, 알림 및 사용자 아이콘 */}
        <div className="flex items-center">
          {/* 640px 미만일 때 검색 버튼 표시 */}
          <button
            onClick={() => setShowSearch(true)}
            className="mr-3 sm:hidden"
          >
            <Search size={24} className="cursor-pointer text-grayDark" />
          </button>
          <Bell size={24} className="mr-3 cursor-pointer text-grayDark" />
          <User size={24} className="mr-3 cursor-pointer text-grayDark" />
        </div>
      </header>
    </div>
  );
}

export default Header;
