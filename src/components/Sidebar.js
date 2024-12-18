import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 추가
import {
  House,
  Folders,
  CircleUserRound,
  Play,
  Clock,
  Heart,
  Youtube,
  Menu,
} from 'lucide-react';

const MenuSection = ({ title, items, onMenuClick }) => (
  <div className="mb-4">
    {title && <p className="px-4 py-2 text-large text-grayDark">{title}</p>}
    <ul>
      {items.map(({ label, icon }) => (
        <li
          key={label}
          className="flex cursor-pointer items-center px-4 py-2 hover:rounded-large hover:bg-gray-100"
          onClick={() => onMenuClick(label)} // 클릭 이벤트 추가
        >
          <span className="mr-6">{icon}</span>
          <p className="text-medium">{label}</p>
        </li>
      ))}
    </ul>
  </div>
);

function Sidebar({ onClose }) {
  const navigate = useNavigate(); // 수정된 부분: 페이지 이동 기능 추가

  // 메인 메뉴
  const mainMenu = [
    { label: '홈', icon: <House size={20} /> },
    { label: '구독', icon: <Youtube size={20} /> },
  ];

  // 내 페이지 메뉴
  const myPageMenu = [
    { label: '시청 기록', icon: <Play size={20} /> },
    { label: '재생 목록', icon: <Folders size={20} /> },
    { label: '내 동영상', icon: <CircleUserRound size={20} /> },
    { label: '나중에 볼 동영상', icon: <Clock size={20} /> },
    { label: '좋아요 표시한 동영상', icon: <Heart size={20} /> },
  ];

  // 카테고리 메뉴
  const categoriesMenu = [
    { label: '전체', icon: <House size={20} /> },
    { label: '게임', icon: <Play size={20} /> },
    { label: '음악', icon: <Youtube size={20} /> },
  ];

  // 메뉴 클릭 이벤트 핸들러
  const handleMenuClick = (label) => {
    if (label === '내 동영상') {
      navigate('/'); // 수정된 부분: 내 동영상 클릭 시 페이지 이동
    }
  };

  return (
    <div className="w-60 bg-white shadow-lg h-full">
      {/* Sidebar Header */}
      <div className="flex items-center px-4 py-4">
        <button onClick={onClose} className="mr-4">
          <Menu size={24} className="text-grayDark" />
        </button>
        <div className="flex items-center">
          <Youtube size={24} className="text-red" />
          <span className="ml-2 text-lg font-semibold text-gray-800">
            YouTube
          </span>
        </div>
      </div>

      {/* 메뉴 섹션 */}
      <MenuSection title="" items={mainMenu} onMenuClick={handleMenuClick} />
      <hr className="border-grayLighter" />
      <MenuSection title="내 페이지" items={myPageMenu} onMenuClick={handleMenuClick} />
      <hr className="border-grayLighter" />
      <MenuSection title="카테고리" items={categoriesMenu} onMenuClick={handleMenuClick} />
      <hr className="border-grayLighter" />

      {/* Footer */}
      <footer className="p-4 text-sm text-grayDark">
        © 2024 YouTube Clone
      </footer>
    </div>
  );
}

export default Sidebar;
