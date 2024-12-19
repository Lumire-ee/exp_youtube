import { UserRound, ChevronDown, LogOut, PlusCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('최신순');

  const navigate = useNavigate();
  const accountMenuRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const handleSortClick = () => setShowDropdown(!showDropdown);
  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowDropdown(false);
  };

  const toggleAccountMenu = () => setShowAccountMenu(!showAccountMenu);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen pl-4 pr-4 sm:pl-20 sm:pr-20">
      <div className="flex flex-col sm:flex-row items-center gap-4 px-4 py-6 sm:px-6 sm:py-4 relative">
        <div
          className="size-28 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 cursor-pointer"
          onClick={() => navigate('/mychannel')}>
          <UserRound size={80} className="text-gray-600" />
        </div>
        <div className="text-center sm:text-left">
          <h1
            className="text-2xl font-semibold text-gray-800 cursor-pointer"
            onClick={() => navigate('/mychannel')}>
            사용자1
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <p className="text-gray-600">@사용자1</p>
            <button
              className="text-sm font-bold text-gray-600 hover:text-black"
              onClick={() => navigate('/mychannel')}>
              채널 보기
            </button>
          </div>
          <div className="mt-4 flex justify-center sm:justify-start gap-3 relative" ref={accountMenuRef}>
            <div className="relative">
              <button
                className="rounded-full border bg-gray-200 px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-300"
                onClick={toggleAccountMenu}
              >
                계정 전환
              </button>
              {showAccountMenu && (
                <div className="absolute left-0 mt-2 w-64 rounded-lg border border-gray-300 bg-white shadow-lg z-10">
                  <div className="p-4">
                    <div
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                      onClick={() => navigate('/mychannel')}>
                      <UserRound size={28} className="text-gray-600" />
                      <div>
                        <p className="text-sm font-semibold">사용자1</p>
                        <p className="text-xs text-gray-500">user1@gmail.com</p>
                      </div>
                    </div>
                    <button className="w-full text-left text-sm px-4 py-2 text-gray-700 hover:bg-gray-100">
                      모든 채널 보기
                    </button>
                  </div>
                  <hr />
                  <div className="p-4">
                    <button className="flex w-full items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                      <PlusCircle size={18} />
                      <span>계정 추가</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut size={18} />
                      <span>로그아웃</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="rounded-full border bg-gray-200 px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-300">
              Google 계정
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 mt-10 sm:mt-10">
        <h2 className="text-xl font-medium text-gray-800">기록</h2>
        <button className="rounded-full border border-gray-300 px-3 py-1 text-sm font-bold text-gray-600 hover:bg-gray-200">
          모두 보기
        </button>
      </div>

      <div className="flex items-center px-4 mt-20 sm:mt-20" ref={sortDropdownRef}>
        <h3 className="text-lg font-semibold text-gray-800 mr-3">재생목록</h3>
        <div className="relative">
          <button
            onClick={handleSortClick}
            className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-sm font-bold text-gray-600 hover:bg-gray-200">
            {sortOrder} <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <div className="absolute top-full mt-1 w-24 rounded-lg border border-gray-300 bg-white shadow-lg">
              <button
                onClick={() => handleSortChange('최신순')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100">
                최신순
              </button>
              <button
                onClick={() => handleSortChange('가나다순')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100">
                가나다순
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 mt-20 sm:mt-20">
        <h4 className="mb-2 text-lg font-semibold text-gray-800">나중에 볼 동영상</h4>
        <p className="text-gray-600">
          동영상을 나중에 볼 동영상에 저장해 보세요. 목록이 여기에 표시됩니다.
        </p>
      </div>

      <div className="px-4 mt-20 sm:mt-20">
        <h5 className="mb-2 text-lg font-semibold text-gray-800">좋아요 표시한 동영상</h5>
        <p className="text-gray-600">
          마음에 드는 동영상에 좋아요 아이콘을 사용해 보세요. 목록이 여기에 표시됩니다.
        </p>
      </div>

      <div className="px-4 mt-20 sm:mt-20">
        <h6 className="mb-2 text-lg font-semibold text-gray-800">내 클립</h6>
        <p className="text-gray-600">
          마음에 드는 순간을 잘라서 공유해 보세요. 바로 여기에 목록이 표시됩니다.
        </p>
      </div>
    </div>
  );
}

export default MyPage;
