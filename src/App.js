import { useEffect, useState } from 'react';
import { API_KEY, BASE_URL } from './config/api';
import axios from 'axios';
import VideoList from './components/VideoList';
import Header from './components/Header';
import YoutubeVideos from './components/YoutubeVideos';
import Aside from './components/Aside';
import CategorySlider from './components/CategorySlider';

//video, channel api 추가
export const getVideosWithChannel = async (params = {}) => {
  try {
    const videoresponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        ...params,
        key: API_KEY,
      },
    });

    const videos = videoresponse.data.items;

    const videowithChannels = await Promise.all(
      videos.map(async (video) => {
        const channelRespone = await axios.get(`${BASE_URL}/channels`, {
          params: {
            part: 'snippet',
            id: video.snippet.channelId,
            key: API_KEY,
          },
        });

        const channelThumbnail =
          channelRespone.data.items[0]?.snippet.thumbnails.default.url;

        return { ...video, channelThumbnail };
      }),
    );

    return videowithChannels;
  } catch (error) {
    console.error(
      'Failed to fetch data:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // 비디오 데이터 가져오기
  useEffect(() => {
    getVideosWithChannel({
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode: 'KR',
      maxResults: 20, // 영상 갯수 조절
    })
      .then((data) => {
        console.log('videos list', data);
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 로컬스토리지에서 검색 기록 불러오기
  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    console.log('검색 기록 불러오기(로컬스토리지):', savedHistory); // DEBUG
    setSearchHistory(savedHistory);
  }, []);

  // 검색 기록 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 검색 실행
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!searchHistory.includes(query)) {
      const updatedHistory = [query, ...searchHistory].slice(0, 10); // 최대 10개
      setSearchHistory(updatedHistory);
    }
  };

  // 검색 기록 삭제
  const handleDeleteHistory = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
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
          <CategorySlider />
          <YoutubeVideos searchQuery={searchQuery} />
          <VideoList videos={videos} />
        </div>
      </div>
    </div>
  );
}

export default App;
