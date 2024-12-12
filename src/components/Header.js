import { Menu, Youtube, Search, Bell, User, ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CategorySlider from './CategorySlider';

function Header() {
  const [showSearch, setShowSearch] = useState(false); // 검색창 표시 상태
  const [isLargeScreen, setIsLargeScreen] = useState(false); // 화면 크기 상태
  const categories = [
    '전체',
    '게임',
    '뉴스',
    '음악',
    '믹스',
    '스케치 코미디',
    '요리 프로그램',
    '최근에 업로드된 동영상',
    '감상한 동영상',
    '새로운 맞춤 동영상',
  ];

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
    <div className="sticky top-0 z-50 bg-white">
      <header className="flex items-center justify-between px-4 py-2">
        {/* Left Section: 로고 및 메뉴 */}
        <div className="mr-5 flex items-center">
          {showSearch && !isLargeScreen ? (
            <button onClick={() => setShowSearch(false)} className="sm:hidden">
              <ArrowLeft size={24} className="cursor-pointer text-grayDark" />
            </button>
          ) : (
            <Menu size={24} className="mr-4 cursor-pointer text-grayDark" />
          )}
          {!showSearch && (
            <div className="flex items-center">
              <Youtube size={24} className="cursor-pointer text-red" />
              <h1 className="ml-2 text-lg font-semibold text-black">YouTube</h1>
            </div>
          )}
        </div>

        {/* Center Section: 검색창 */}
        {isLargeScreen || showSearch ? (
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
          <button
            onClick={() => setShowSearch(true)}
            className="mr-3 sm:hidden"
          >
            <Search size={24} className="cursor-pointer text-grayDark" />
          </button>
          <Bell size={24} className="mr-6 cursor-pointer text-grayDark" />
          <User size={24} className="mr-3 cursor-pointer text-grayDark" />
        </div>
      </header>

      {/* Category Slider: 카테고리 버튼, 양옆 슬라이드 */}
      <CategorySlider categories={categories} />
    </div>
  );
}

export default Header;
