import { CircleUserRound, House, UserPlus } from 'lucide-react';
import React from 'react';

function Aside() {
  return (
    <aside className="sticky top-16 z-40 flex h-[calc(100vh-4rem)] w-20 flex-col items-center space-y-7 py-3">
      <button className="flex flex-col items-center px-4">
        <House size={24} className="text-grayDark" />
        <span className="mt-2 text-xSmall text-grayDark">홈</span>
      </button>
      <button className="flex flex-col items-center p-2">
        <UserPlus size={24} className="text-grayDark" />
        <span className="mt-2 text-xSmall text-grayDark">구독</span>
      </button>
      <button className="flex flex-col items-center p-2">
        <CircleUserRound size={24} className="text-small text-grayDark" />
        <span className="mt-2 text-xSmall text-grayDark">내 페이지</span>
      </button>
    </aside>
  );
}

export default Aside;
