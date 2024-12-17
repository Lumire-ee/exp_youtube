import { useState, useEffect } from 'react';
import {
  searchVideos,
  getMostPopularVideos,
  getVideoDetails,
  getChannelDetails,
} from '../api';

const useCategoryVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [loading, setLoading] = useState(false);

  // 카테고리 변경 시 비디오 가져오기
  const fetchVideos = async (category) => {
    setLoading(true);
    try {
      if (category === '전체') {
        // 전체 선택 시 초기화면 (인기비디오?)
        const data = await getMostPopularVideos(20);
        setVideos(data);
      } else {
        // 카테고리 검색 시 search 엔드포인트 호출
        const searchResults = await searchVideos(category, 20);
        const videoIds = searchResults.map((item) => item.id.videoId);

        const videoDetails = await Promise.all(
          videoIds.map(async (id) => {
            const [video] = await getVideoDetails([id]);
            const channelData = await getChannelDetails(
              video.snippet.channelId,
            );
            const channelThumbnail = channelData.snippet.thumbnails.default.url;
            return { ...video, channelThumbnail };
          }),
        );

        setVideos(videoDetails);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(selectedCategory);
  }, [selectedCategory]);

  return {
    videos,
    loading,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useCategoryVideos;
