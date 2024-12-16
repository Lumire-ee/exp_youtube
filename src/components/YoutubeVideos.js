import React, { useEffect, useState } from 'react';
import { searchVideos, getVideoDetails, getChannelDetails } from '../api';
import VideoItem from './VideoItem';

const YoutubeVideos = ({ searchQuery = '' }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSearchedVideos = async () => {
      if (!searchQuery.trim()) {
        setVideos([]);
        return;
      }

      try {
        // 1. search 엔드포인트로 videoId 목록 가져오기
        const searchResults = await searchVideos(searchQuery, 30);
        const videoIds = searchResults.map((item) => item.id.videoId);

        // 2. videoId로 videos 엔드포인트 호출
        const videoDetails = await getVideoDetails(videoIds);

        // 3. 각 videoDetail에 대해 channelId로 채널 썸네일 조회
        const detailedVideos = await Promise.all(
          videoDetails.map(async (video) => {
            const channelId = video.snippet.channelId;
            const channelData = await getChannelDetails(channelId);
            const channelThumbnail = channelData.snippet.thumbnails.default.url;
            return { ...video, channelThumbnail };
          }),
        );

        setVideos(detailedVideos);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSearchedVideos();
  }, [searchQuery]);

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
