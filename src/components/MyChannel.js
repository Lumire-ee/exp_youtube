import React, { useState } from 'react';
import {
  UserRound,
  Globe,
  UsersRound,
  SquarePlay,
  TrendingUp,
  CircleAlert,
  SquarePen,
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
      <div className="relative mx-auto h-60 max-w-[95%] overflow-hidden rounded-[30px] bg-grayLightest">
        <img
          src="/banner-placeholder.jpg"
          alt="Banner"
          className="size-full rounded-[30px] object-cover"
        />
      </div>

      <div className="mt-4 flex items-center p-6">
        <div className="flex size-32 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-grayLightest">
          <UserRound size={80} className="text-grayDark" />
        </div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold text-black">사용자1</h1>
          <p className="mt-1 text-large text-grayDark">
            @사용자1 · 구독자 4명 · 동영상 70개
          </p>
          <p className="mt-2 text-medium text-gray-500">
            채널 정보입니다.{' '}
            <span
              className="cursor-pointer text-black"
              onClick={() => setShowModal(true)}
            >
              더보기
            </span>
          </p>
        </div>
      </div>

      <div className="flex border-b border-grayLighter px-6">
        {['홈', '동영상', '커뮤니티'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-6 pb-2 text-large font-medium ${
              activeTab === tab
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === '홈' && (
        <div className="p-6">
          <section>
            <h2 className="mb-4 text-xLarge font-semibold">추천</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {videos.slice(0, 3).map((video) => (
                <div key={video.id} className="rounded-lg bg-white">
                  <div className="relative h-40 bg-grayLightest">
                    <span className="absolute bottom-2 right-2 rounded bg-black px-2 py-1 text-small font-semibold text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-medium font-bold text-black">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-small text-grayDark">
                      조회수 {video.views}회 · {video.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-xLarge font-semibold">동영상</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {videos.map((video) => (
                <div key={video.id} className="rounded-lg bg-white">
                  <div className="relative h-40 bg-grayLightest">
                    <span className="absolute bottom-2 right-2 rounded bg-black px-2 py-1 text-small font-semibold text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-medium font-bold text-black">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-small text-grayDark">
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
          <div className="mb-4 flex items-center gap-4">
            {['최신순', '인기순', '날짜순'].map((option) => (
              <button
                key={option}
                onClick={() => setSortOption(option)}
                className={`rounded-full px-4 py-2 text-medium font-bold ${
                  sortOption === option
                    ? 'bg-black text-white'
                    : 'bg-grayLightest text-black hover:bg-grayLightest'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {getSortedVideos().map((video) => (
              <div key={video.id} className="rounded-lg bg-white">
                <div className="relative h-40 bg-grayLightest">
                  <span className="absolute bottom-2 right-2 rounded bg-black px-2 py-1 text-small font-semibold text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-medium font-bold text-black">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-small text-grayDark">
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
          onClick={handleBackgroundClick}
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-grayLightest">
              <UserRound size={30} className="text-grayDark" />{' '}
              {/* 커뮤니티 탭의 아이콘 */}
            </div>
            <div>
              <h2 className="text-large font-bold text-black">사용자1</h2>
            </div>
          </div>

          <textarea
            className="mb-4 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-grayLighter"
            placeholder="새로운 소식을 올려보세요."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          />

          <div className="mb-4 flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePostSubmit();
              }}
              className="ml-auto rounded-full bg-black px-4 py-2 text-medium font-bold text-white hover:bg-darkGray"
            >
              게시
            </button>
          </div>

          <h2 className="mb-4 mt-10 text-xLarge font-semibold">게시됨</h2>
          <hr className="mb-4 border-grayLighter" />
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <SquarePen size={50} className="mb-4" />
              <p className="text-large font-semibold">게시물 올리기</p>
              <p>게시 후에 게시물이 여기에 표시되고 커뮤니티에 공개됩니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="rounded-lg bg-white p-4">
                  {post.type === 'image' && post.content && (
                    <img
                      src={post.content}
                      alt={`Post ${index}`}
                      className="h-auto max-w-full rounded"
                    />
                  )}
                  {post.type === null && post.content && (
                    <p className="text-black">{post.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-96 rounded-lg bg-white p-6">
            <button
              className="absolute right-4 top-4 text-grayDark hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>
            <h2 className="mb-4 text-xLarge font-bold text-black">정보</h2>
            <p className="mb-4 text-grayDark">채널 정보</p>
            <h3 className="mb-2 text-large font-semibold text-black">
              채널 세부정보
            </h3>
            <ul className="space-y-2 text-grayDark">
              <li className="flex items-center">
                <Globe size={20} className="mr-2 text-black" />
                www.youtube.com/@사용자1
              </li>
              <li className="flex items-center">
                <UsersRound size={20} className="mr-2 text-black" />
                구독자 4명
              </li>
              <li className="flex items-center">
                <SquarePlay size={20} className="mr-2 text-black" />
                동영상 70개
              </li>
              <li className="flex items-center">
                <TrendingUp size={20} className="mr-2 text-black" />
                조회수 1,635회
              </li>
              <li className="flex items-center">
                <CircleAlert size={20} className="mr-2 text-black" />
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
