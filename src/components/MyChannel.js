import React, { useState } from 'react';
import {
  UserRound,
  Globe,
  UsersRound,
  SquarePlay,
  TrendingUp,
  CircleAlert,
  Image,
  ChartBarDecreasing,
  SquareCheckBig,
  SquarePen,
  Upload,
  X,
} from 'lucide-react';

function MyChannel() {
  const [activeTab, setActiveTab] = useState('홈');
  const [sortOption, setSortOption] = useState('최신순');
  const [showModal, setShowModal] = useState(false);
  const [postType, setPostType] = useState(null); // Post type: 'image', 'survey', 'quiz'
  const [uploadedImage, setUploadedImage] = useState(null); // Uploaded image state
  const [textContent, setTextContent] = useState(''); // Text content state
  const [posts, setPosts] = useState([]); // List of posts

  const videos = [
    { id: 1, title: '영상1', views: 1, date: '2024-12-10', duration: '4:01' },
    { id: 2, title: '영상2', views: 300, date: '2024-12-01', duration: '3:42' },
    { id: 3, title: '영상3', views: 150, date: '2024-11-15', duration: '3:57' },
    { id: 4, title: '영상4', views: 400, date: '2024-11-20', duration: '4:20' },
    { id: 5, title: '영상5', views: 50, date: '2024-12-15', duration: '5:30' },
    { id: 6, title: '영상6', views: 700, date: '2024-11-25', duration: '3:52' },
  ];

  const handlePostSubmit = () => {
    if (postType || textContent.trim()) {
      setPosts([
        ...posts,
        { type: postType, content: uploadedImage || textContent || null },
      ]);
      setPostType(null);
      setUploadedImage(null);
      setTextContent('');
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'community-background') {
      setPostType(null);
      setUploadedImage(null);
    }
  };

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
      <div className="relative h-60 bg-gray-200 rounded-t-[30px] rounded-b-[30px] overflow-hidden mx-auto max-w-[95%]">
        <img
          src="/banner-placeholder.jpg"
          alt="Banner"
          className="h-full w-full object-cover rounded-t-[30px] rounded-b-[30px]"
        />
      </div>

      <div className="flex items-center px-6 py-6 mt-4">
        <div
          className="size-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center cursor-pointer">
          <UserRound size={80} className="text-gray-600" /> {/* 아이콘 크기 증가 */}
        </div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold text-gray-800">사용자1</h1>
          <p className="text-lg text-gray-600 mt-1">
            @사용자1 · 구독자 4명 · 동영상 70개
          </p>
          <p className="mt-2 text-sm text-gray-500">
            채널 정보입니다.{' '}
            <span
              className="text-gray-800 cursor-pointer"
              onClick={() => setShowModal(true)}>
              더보기
            </span>
          </p>
        </div>
      </div>

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

      {activeTab === '동영상' && (
        <div className="p-6">
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

      {activeTab === '커뮤니티' && (
        <div
          id="community-background"
          className="p-6"
          onClick={handleBackgroundClick}>
          <div className="flex items-center gap-4 mb-4">
            <div className="size-10 rounded-full bg-gray-300 flex items-center justify-center">
              <UserRound size={30} className="text-gray-600" /> {/* 커뮤니티 탭의 아이콘 */}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">사용자1</h2>
            </div>
          </div>

          <textarea
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="새로운 소식을 올려보세요."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          />

          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePostSubmit();
              }}
              className="ml-auto rounded-full bg-gray-800 text-white px-4 py-2 text-sm font-bold hover:bg-gray-700">
              게시
            </button>
          </div>

          <h2 className="text-xl font-semibold mt-10 mb-4">게시됨</h2>
          <hr className="mb-4 border-gray-300" />
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <SquarePen size={50} className="mb-4" />
              <p className="text-lg font-semibold">게시물 올리기</p>
              <p>게시 후에 게시물이 여기에 표시되고 커뮤니티에 공개됩니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50">
                  {post.type === 'image' && post.content && (
                    <img src={post.content} alt={`Post ${index}`} className="max-w-full h-auto rounded" />
                  )}
                  {post.type === null && post.content && <p className="text-gray-800">{post.content}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}>
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">정보</h2>
            <p className="text-gray-600 mb-4">채널 정보</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">채널 세부정보</h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <Globe size={20} className="mr-2 text-gray-800" />
                www.youtube.com/@사용자1
              </li>
              <li className="flex items-center">
                <UsersRound size={20} className="mr-2 text-gray-800" />
                구독자 4명
              </li>
              <li className="flex items-center">
                <SquarePlay size={20} className="mr-2 text-gray-800" />
                동영상 70개
              </li>
              <li className="flex items-center">
                <TrendingUp size={20} className="mr-2 text-gray-800" />
                조회수 1,635회
              </li>
              <li className="flex items-center">
                <CircleAlert size={20} className="mr-2 text-gray-800" />
                가입일: 2022. 11. 25
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyChannel;
