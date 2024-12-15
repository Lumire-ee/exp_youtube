import {
  Menu,
  Youtube,
  Search,
  Bell,
  User,
  ArrowLeft,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import CategorySlider from "./CategorySlider";
import Sidebar from "./Sidebar";

function Header() {
  const [showSearch, setShowSearch] = useState(false); 
  const [isLargeScreen, setIsLargeScreen] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [cursorStyle, setCursorStyle] = useState("default"); 

  const categories = [
    "전체",
    "게임",
    "음악",
    "뉴스",
    "믹스",
    "시트콤",
    "힙합",
    "요리",
    "최근에 업로드된 동영상",
    "감상한 동영상",
    "새로운 맞춤 동영상",
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlusButtonClick = () => {
    setCursorStyle("pointer"); 
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar Container */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-60 overflow-y-auto bg-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <header className="relative flex items-center justify-between px-4 py-2">
        {/* Left Section: 로고 및 메뉴 */}
        <div className="mr-5 flex items-center">
          {showSearch && !isLargeScreen ? (
            <button onClick={() => setShowSearch(false)} className="sm:hidden">
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

        {/* Right Section: 검색 버튼, 알림 및 +만들기 버튼 */}
        <div className="relative flex items-center">
          <button
            onClick={() => setShowSearch(true)}
            className="mr-3 sm:hidden"
          >
            <Search size={24} className="cursor-pointer text-grayDark" />
          </button>

          <button
            onClick={handlePlusButtonClick}
            className="mr-4"
            style={{ cursor: cursorStyle }}
          >
            <Plus size={24} className="text-grayDark" />
          </button>

          <Bell size={24} className="mr-6 cursor-pointer text-grayDark" />

          {/* 드롭다운 메뉴 */}
          <User
            size={24}
            className="cursor-pointer text-grayDark"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div
              className="absolute right-0 top-12 w-64 bg-white shadow-lg rounded-lg border z-50"
              style={{ zIndex: 1000 }}
            >
              <div className="p-4 flex items-center gap-3 border-b">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">사용자1</p>
                  <p className="text-sm text-gray-500">@사용자1</p>
                  <button
                    className="text-blue-500 text-sm font-medium mt-2 hover:underline"
                    onClick={() => (window.location.href = "/my-channel")}
                  >
                    내 채널 보기
                  </button>
                </div>
              </div>
              <ul>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  Google 계정
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  계정 전환
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  로그아웃
                </li>
                <hr />
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  설정
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  고객센터
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  YouTube 스튜디오
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Category Slider */}
      <CategorySlider categories={categories} />
    </div>
  );
}

export default Header;
