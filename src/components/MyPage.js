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
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setShowAccountMenu(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-20">
      <div className="relative flex flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:px-6 sm:py-4">
        <div
          className="flex size-28 cursor-pointer items-center justify-center rounded-full border border-grayLighter bg-grayLightest"
          onClick={() => navigate('/mychannel')}
        >
          <UserRound size={80} className="text-grayDark" />
        </div>
        <div className="text-center sm:text-left">
          <h1
            className="cursor-pointer text-xxLarge font-semibold text-darkGray"
            onClick={() => navigate('/mychannel')}
          >
            사용자1
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
            <p className="text-grayDark">@사용자1</p>
            <button
              className="text-medium font-bold text-grayDark hover:text-black"
              onClick={() => navigate('/my-channel')}
            >
              채널 보기
            </button>
          </div>
          <div
            className="relative mt-4 flex justify-center gap-3 sm:justify-start"
            ref={accountMenuRef}
          >
            <div className="relative">
              <button
                className="rounded-full border bg-grayLightest px-4 py-2 text-medium font-bold text-darkGray hover:bg-grayLighter"
                onClick={toggleAccountMenu}
              >
                계정 전환
              </button>
              {showAccountMenu && (
                <div className="absolute left-0 z-10 mt-2 w-64 rounded-lg border border-grayLighter bg-white shadow-lg">
                  <div className="p-4">
                    <div
                      className="mb-2 flex cursor-pointer items-center gap-2"
                      onClick={() => navigate('/mychannel')}
                    >
                      <UserRound size={28} className="text-grayDark" />
                      <div>
                        <p className="text-medium font-semibold">사용자1</p>
                        <p className="text-small text-grayDark">
                          user1@gmail.com
                        </p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 text-left text-medium text-darkGray hover:bg-white">
                      모든 채널 보기
                    </button>
                  </div>
                  <hr />
                  <div className="p-4">
                    <button className="flex w-full items-center gap-2 rounded-lg p-2 text-medium text-darkGray hover:bg-white">
                      <PlusCircle size={18} />
                      <span>계정 추가</span>
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-lg p-2 text-medium text-darkGray hover:bg-white">
                      <LogOut size={18} />
                      <span>로그아웃</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="rounded-full border bg-grayLightest px-4 py-2 text-medium font-bold text-darkGray hover:bg-grayLighter">
              Google 계정
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between px-4 sm:mt-10">
        <h2 className="text-xl font-medium text-darkGray">기록</h2>
        <button className="rounded-full border border-grayLighter px-3 py-1 text-medium font-bold text-grayDark hover:bg-grayLightest">
          모두 보기
        </button>
      </div>

      <div
        className="mt-20 flex items-center px-4 sm:mt-20"
        ref={sortDropdownRef}
      >
        <h3 className="mr-3 text-large font-semibold text-darkGray">
          재생목록
        </h3>
        <div className="relative">
          <button
            onClick={handleSortClick}
            className="flex items-center gap-1 rounded-full border border-grayLighter px-3 py-1 text-medium font-bold text-grayDark hover:bg-grayLightest"
          >
            {sortOrder} <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <div className="absolute top-full mt-1 w-24 rounded-lg border border-grayLighter bg-white shadow-lg">
              <button
                onClick={() => handleSortChange('최신순')}
                className="block w-full px-4 py-2 text-left text-medium text-darkGray hover:bg-white"
              >
                최신순
              </button>
              <button
                onClick={() => handleSortChange('가나다순')}
                className="block w-full px-4 py-2 text-left text-medium text-darkGray hover:bg-white"
              >
                가나다순
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-20 px-4 sm:mt-20">
        <h4 className="mb-2 text-large font-semibold text-darkGray">
          나중에 볼 동영상
        </h4>
        <p className="text-grayDark">
          동영상을 나중에 볼 동영상에 저장해 보세요. 목록이 여기에 표시됩니다.
        </p>
      </div>

      <div className="mt-20 px-4 sm:mt-20">
        <h5 className="mb-2 text-large font-semibold text-darkGray">
          좋아요 표시한 동영상
        </h5>
        <p className="text-grayDark">
          마음에 드는 동영상에 좋아요 아이콘을 사용해 보세요. 목록이 여기에
          표시됩니다.
        </p>
      </div>

      <div className="mt-20 px-4 sm:mt-20">
        <h6 className="mb-2 text-large font-semibold text-darkGray">내 클립</h6>
        <p className="text-grayDark">
          마음에 드는 순간을 잘라서 공유해 보세요. 바로 여기에 목록이
          표시됩니다.
        </p>
      </div>
    </div>
  );
}

export default MyPage;
