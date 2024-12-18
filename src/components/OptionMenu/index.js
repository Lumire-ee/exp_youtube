import React from 'react';

const OptionMenu = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
      <div className="py-1">
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">현재 재생목록에 추가</p>
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">나중에 볼 동영상에 저장</p>
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">재생목록에 저장</p>
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">오프라인 저장</p>
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">공유</p>
        <hr className="my-1" />
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">관심 없음</p>
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">채널 추천 안함</p>
        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">신고</p>
      </div>
    </div>
  );
};

export default OptionMenu;
  

