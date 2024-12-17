import React, { useEffect, useState } from 'react';
import {
  searchVideos,
  getMostPopularVideos,
  getVideoDetails,
  getChannelDetails,
} from '../api';
import VideoItem from './VideoItem';

const YoutubeVideos = ({ searchQuery = '', category = '' }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let videoIds = [];
        let searchResults = [];

        // 검색어, 카테고리 또는 인기 비디오를 가져오는 조건
        if (searchQuery.trim() !== '') {
          searchResults = await searchVideos(searchQuery, 20);
        } else if (category && category !== '전체') {
          searchResults = await searchVideos(category, 20);
        } else {
          searchResults = await getMostPopularVideos(20);
        }

        // 비디오 ID 추출 및 유효성 필터링
        videoIds = searchResults
          .map((item) => item.id.videoId || item.id) // 비디오 ID가 다를 수 있음
          .filter(Boolean);

        // 비디오 상세 정보와 채널 썸네일 가져오기
        if (videoIds.length > 0) {
          const videoDetails = await getVideoDetails(videoIds);
          const detailedVideos = await addChannelThumbnails(videoDetails);
          setVideos(detailedVideos);
        }
      } catch (error) {
        console.error('비디오를 가져오지 못했습니다:', error);
      }
    };

    fetchVideos();
  }, [searchQuery, category]);

  // 채널 썸네일을 각 비디오에 추가하는 함수
  const addChannelThumbnails = async (videos) => {
    return await Promise.all(
      videos.map(async (video) => {
        const channelData = await getChannelDetails(video.snippet.channelId);
        return {
          ...video,
          channelThumbnail: channelData.snippet.thumbnails.default.url,
        };
      }),
    );
  };

  return (
    <div>
      {console.log('비디오 검색결과:', videos)}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <VideoItem key={video.id.videoId || video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default YoutubeVideos;
