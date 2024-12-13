import {
  Menu,
  Youtube,
  Search,
  Bell,
  User,
  ArrowLeft,
  House,
  UserPlus,
  CircleUserRound,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CategorySlider from './CategorySlider';
import Sidebar from './Sidebar';

function Header() {
  const [showSearch, setShowSearch] = useState(false); // 검색창 표시 상태
  const [isLargeScreen, setIsLargeScreen] = useState(false); // 화면 크기 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 표시 상태

  const categories = [
    '전체',
    '게임',
    '음악',
    '뉴스',
    '믹스',
    '시트콤',
    '힙합',
    '요리',
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
    <div className="relative flex min-h-screen flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white">
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Sidebar Container (항상 DOM상에 존재) */}
        <div
          className={`fixed left-0 top-0 z-50 h-full w-60 overflow-y-auto bg-white transition-transform duration-300 
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        <header className="flex items-center justify-between px-4 py-2">
          {/* Left Section: 로고 및 메뉴 */}
          <div className="relative mr-5 flex items-center">
            {showSearch && !isLargeScreen ? (
              <button
                onClick={() => setShowSearch(false)}
                className="sm:hidden"
              >
                <ArrowLeft size={24} className="cursor-pointer text-grayDark" />
              </button>
            ) : (
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu size={24} className="mr-4 cursor-pointer text-grayDark" />
              </button>
            )}
            {!showSearch && (
              <div className="flex items-center">
                <Youtube size={24} className="cursor-pointer text-red" />
                <h1 className="ml-2 text-lg font-semibold text-black">
                  YouTube
                </h1>
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
      </div>

      <div className="flex flex-1">
        {/* Aside */}
        <aside className="sticky top-[56px] z-40 h-[calc(100%-56px)] w-20 ">
          <div className="flex flex-col space-y-7 py-3">
            <div className="flex flex-col items-center px-4">
              <House size={24} />
              <span className="text-xSmall text-grayDark">홈</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <UserPlus size={24} />
              <span className="text-xSmall text-grayDark">구독</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <CircleUserRound size={24} />
              <span className="text-xSmall text-grayDark">내 페이지</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}

        <div className="relative flex-1 overflow-hidden">
          {/* Category Slider */}
          <div className="sticky top-0 z-40 bg-white">
            <CategorySlider categories={categories} />
          </div>
          {/* Main Section */}
          <main className="p-4">
            <h1 className="text-xxLarge font-bold">메인 콘텐츠</h1>
            <div className="space-y-4">
              {Array.from({ length: 50 }, (_, index) => (
                <p key={index} className="text-grayDark">
                  스크롤 테스트용 더미 콘텐츠 {index + 1}
                </p>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Header;
