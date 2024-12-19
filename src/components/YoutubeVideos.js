import React, { useEffect, useState, useCallback } from 'react';
import {
  searchVideos,
  getMostPopularVideos,
  getVideoDetails,
  getChannelDetails,
} from '../api';
import VideoItem from './VideoItem';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const YoutubeVideos = ({ searchQuery = '', category = '' }) => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 비디오 콜백 함수
  const fetchVideos = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      let searchResults = [];
      const pageToken =
        videos.length > 0 ? videos[videos.length - 1].nextPageToken : '';

      if (searchQuery.trim() !== '') {
        searchResults = await searchVideos(searchQuery, 5, pageToken);
      } else if (category && category !== '전체') {
        searchResults = await searchVideos(category, 5, pageToken);
      } else {
        searchResults = await getMostPopularVideos(5, pageToken);
      }

      // 비디오 ID 추출 및 유효성 필터링
      const videoIds = searchResults
        .map((item) => item.id.videoId || item.id)
        .filter(Boolean);

      // 비디오 상세 정보와 채널 썸네일 가져오기
      if (videoIds.length > 0) {
        const videoDetails = await getVideoDetails(videoIds);
        const detailedVideos = await addChannelThumbnails(videoDetails);
        setVideos((prevVideos) => [...prevVideos, ...detailedVideos]);
        setHasMore(detailedVideos.length === 5);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('비디오를 가져오지 못했습니다:', error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, category, videos]);

  useEffect(() => {
    setVideos([]);
    setHasMore(true);
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, category]);

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

  const loader = useInfiniteScroll(fetchVideos, hasMore);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {videos.map((video) => (
          <VideoItem key={video.id.videoId || video.id} video={video} />
        ))}
      </div>
      {loading && <p></p>}
      {!hasMore && <p>No more videos to load</p>}
      <div ref={loader} />
    </div>
  );
};

export default YoutubeVideos;
