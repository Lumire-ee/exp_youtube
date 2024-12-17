import React from 'react';

function MyChannel() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 프로필 섹션 */}
      <div className="flex items-center gap-4 px-6 py-4">
        {/* 프로필 이미지 */}
        <img
          src="/profile.png"
          alt="프로필"
          className="size-20 border border-gray-300 rounded-full"
        />
        {/* 프로필 정보 */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">빙글빙글도라도라</h1>
          <p className="text-gray-600">@빙글빙글도라도라</p>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex gap-4 px-6 mt-2">
        <button className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300">
          계정 전환
        </button>
        <button className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300">
          Google 계정
        </button>
      </div>

      {/* 기록 섹션 */}
      <div className="flex items-center justify-between px-6 mt-6">
        <h2 className="text-xl font-medium text-gray-800">기록</h2>
        <button className="text-sm text-blue-600 hover:underline">모두 보기</button>
      </div>

      {/* 재생목록 섹션 */}
      <div className="px-6 mt-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">재생목록</h3>
        <ul className="space-y-2 text-gray-700">
          <li>동영상 없음</li>
          <li>나중에 볼 동영상</li>
          <li>좋아요 표시한 동영상</li>
        </ul>
      </div>
    </div>
  );
}

export default MyChannel;
