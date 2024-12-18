import React, { useState } from 'react';
import { UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MyChannel() {
  const [activeTab, setActiveTab] = useState('홈');
  const [sortOption, setSortOption] = useState('최신순'); // 정렬 상태 추가
  const navigate = useNavigate();

  const videos = [
    { id: 1, title: '영상1', views: 1, date: '2024-12-10', duration: '4:01' },
    { id: 2, title: '영상2', views: 300, date: '2024-12-01', duration: '3:42' },
    { id: 3, title: '영상3', views: 150, date: '2024-11-15', duration: '3:57' },
    { id: 4, title: '영상4', views: 400, date: '2024-11-20', duration: '4:20' },
    { id: 5, title: '영상5', views: 50, date: '2024-12-15', duration: '5:30' },
    { id: 6, title: '영상6', views: 700, date: '2024-11-25', duration: '3:52' },
  ];

  // 정렬 함수
  const getSortedVideos = () => {
    const sortedVideos = [...videos];
    if (sortOption === '최신순') {
      return sortedVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === '인기순') {
      return sortedVideos.sort((a, b) => b.views - a.views);
    } else if (sortOption === '날짜순') {
      return sortedVideos.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return sortedVideos;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 배너 섹션 */}
      <div className="relative h-60 bg-gray-200 rounded-t-[30px] rounded-b-[30px] overflow-hidden mx-auto max-w-[95%]">
        <img
          src="/banner-placeholder.jpg"
          alt="Banner"
          className="h-full w-full object-cover rounded-t-[30px] rounded-b-[30px]"
        />
      </div>

      {/* 프로필 섹션 */}
      <div className="flex items-center px-6 py-6 mt-4">
        <div
          className="size-48 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={() => navigate('/mychannel')}>
          <UserRound size={100} className="text-gray-600" />
        </div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold text-gray-800">사용자1</h1>
          <p className="text-lg text-gray-600 mt-1">
            @사용자1 · 구독자 n명 · 동영상 nn개
          </p>
          <p className="mt-2 text-sm text-gray-500">
            채널 설명{' '}
            <span className="text-gray-800 cursor-pointer hover:underline">더보기</span>
          </p>
        </div>
      </div>

      {/* 내비게이션 탭 */}
      <div className="flex border-b border-gray-300 px-6">
        {['홈', '동영상', '커뮤니티'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-6 pb-2 text-lg font-medium ${
              activeTab === tab
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-gray-800'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* 홈 탭 */}
      {activeTab === '홈' && (
        <div className="p-6">
          {/* 추천 섹션 */}
          <section>
            <h2 className="text-xl font-semibold mb-4">추천</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {videos.slice(0, 3).map((video) => (
                <div key={video.id} className="rounded-lg bg-gray-50">
                  <div className="relative h-40 bg-gray-300">
                    <span className="absolute bottom-2 right-2 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-800">{video.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">
                      조회수 {video.views}회 · {video.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 동영상 섹션 */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">동영상</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {videos.map((video) => (
                <div key={video.id} className="rounded-lg bg-gray-50">
                  <div className="relative h-40 bg-gray-300">
                    <span className="absolute bottom-2 right-2 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-800">{video.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">
                      조회수 {video.views}회 · {video.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 동영상 탭 */}
      {activeTab === '동영상' && (
        <div className="p-6">
          {/* 정렬 옵션 */}
          <div className="flex items-center gap-4 mb-4">
            {['최신순', '인기순', '날짜순'].map((option) => (
              <button
                key={option}
                onClick={() => setSortOption(option)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  sortOption === option
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}>
                {option}
              </button>
            ))}
          </div>

          {/* 동영상 리스트 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {getSortedVideos().map((video) => (
              <div key={video.id} className="rounded-lg bg-gray-50">
                <div className="relative h-40 bg-gray-300">
                  <span className="absolute bottom-2 right-2 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-800">{video.title}</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    조회수 {video.views}회 · {video.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyChannel;
