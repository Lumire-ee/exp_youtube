import { useEffect, useState } from 'react';

import VideoItem from './components/VideoItem';
import Header from './components/Header';
import Aside from './components/Aside';
import CategorySlider from './components/CategorySlider';
import YoutubeVideos from './components/YoutubeVideos';

import { getMostPopularVideos, getChannelDetails } from './api';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // 비디오 데이터 가져오기
  useEffect(() => {
    (async () => {
      try {
        const data = await getMostPopularVideos(20);
        // 각 비디오별 채널 썸네일 추가
        const detailedVideos = await Promise.all(
          data.map(async (video) => {
            const channelId = video.snippet.channelId;
            const channelData = await getChannelDetails(channelId);
            const channelThumbnail = channelData.snippet.thumbnails.default.url;
            return { ...video, channelThumbnail };
          }),
        );
        setVideos(detailedVideos);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // 로컬스토리지에서 검색 기록 불러오기
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory'));
    console.log('검색 기록 불러오기(로컬스토리지):', savedHistory); // DEBUG
    if (Array.isArray(savedHistory)) {
      setSearchHistory(savedHistory);
    } else {
      // savedHistory가 null 또는 올바르지 않은 형식일 경우 빈 배열로 대체
      setSearchHistory([]);
    }
  }, []);

  // 검색 기록 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 검색 실행
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!searchHistory.includes(query)) {
      const updatedHistory = [query, ...searchHistory].slice(0, 10);
      setSearchHistory(updatedHistory);
    }
  };

  // 검색 기록 삭제
  const handleDeleteHistory = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onSearch={handleSearch}
        searchHistory={searchHistory}
        onDeleteHistory={handleDeleteHistory}
      />
      <div className="flex flex-1">
        <Aside />
        <div className="flex flex-1 flex-col overflow-hidden">
          <CategorySlider onCategorySelect={handleSearch} />
          {searchQuery.trim() === '' ? (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {videos.map((video) => (
                <VideoItem key={video.id.videoId || video.id} video={video} />
              ))}
            </div>
          ) : (
            // 검색 결과 컴포넌트
            <div className="p-4">
              <YoutubeVideos searchQuery={searchQuery} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
