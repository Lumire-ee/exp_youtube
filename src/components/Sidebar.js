import React from 'react';
import {
  House,
  Folders,
  CircleUserRound,
  Menu,
  Play,
  Clock,
  Heart,
  Youtube,
  Gamepad,
  Music,
  Newspaper,
  Film,
  Smile,
  Mic,
  ChefHat,
  Settings,
  AlertTriangle,
  HelpCircle,
  Send,
  AudioLines,
  UserPlus,
} from 'lucide-react';

const MenuSection = ({ title, items }) => (
  <div className="mb-4">
    {title && <p className="px-4 py-2 text-large text-grayDark">{title}</p>}
    <ul>
      {items.map(({ label, icon }) => (
        <li
          key={label}
          className="flex cursor-pointer items-center px-4 py-2 hover:rounded-large hover:bg-gray-100"
        >
          <span className="mr-6">{icon}</span>
          <p className="text-medium">{label}</p>
        </li>
      ))}
    </ul>
  </div>
);

function Sidebar({ onClose, isSidebarOpen }) {
  const mainMenu = [
    { label: '홈', icon: <House size={20} /> },
    { label: '구독', icon: <UserPlus size={20} /> },
  ];

  const myPageMenu = [
    { label: '시청 기록', icon: <Play size={20} /> },
    { label: '재생 목록', icon: <Folders size={20} /> },
    { label: '내 동영상', icon: <CircleUserRound size={20} /> },
    { label: '나중에 볼 동영상', icon: <Clock size={20} /> },
    { label: '좋아요 표시한 동영상', icon: <Heart size={20} /> },
  ];

  const categoriesMenu = [
    { label: '전체', icon: <Film size={20} /> },
    { label: '게임', icon: <Gamepad size={20} /> },
    { label: '음악', icon: <Music size={20} /> },
    { label: '뉴스', icon: <Newspaper size={20} /> },
    { label: '믹스', icon: <AudioLines size={20} /> },
    { label: '시트콤', icon: <Smile size={20} /> },
    { label: '힙합', icon: <Mic size={20} /> },
    { label: '요리', icon: <ChefHat size={20} /> },
  ];

  const settingsMenu = [
    { label: '설정', icon: <Settings size={20} /> },
    { label: '신고 기록', icon: <AlertTriangle size={20} /> },
    { label: '고객센터', icon: <HelpCircle size={20} /> },
    { label: '의견 보내기', icon: <Send size={20} /> },
  ];

  return (
    <div className="px-3">
      {/* Sidebar Header */}
      <div className="mb-3 flex items-center">
        <button onClick={onClose} className="p-4">
          <Menu
            size={24}
            className="cursor-pointer text-grayDark hover:text-grayDark"
          />
        </button>
        <div className="flex items-center">
          <Youtube size={24} className="cursor-pointer text-red" />
          <span className="ml-2 text-lg font-semibold text-black">YouTube</span>
        </div>
      </div>

      <MenuSection items={mainMenu} />
      <hr className="mb-4 border-grayLighter" />
      <MenuSection title="내 페이지" items={myPageMenu} />
      <hr className="mb-4 border-grayLighter" />
      <MenuSection title="카테고리" items={categoriesMenu} />
      <hr className="mb-4 border-grayLighter" />
      <MenuSection items={settingsMenu} />
      <hr className="mb-4 border-grayLighter" />
      <footer className="px-4 py-2 text-small text-grayDark">
        대충 회사 정보
      </footer>
    </div>
  );
}

export default Sidebar;