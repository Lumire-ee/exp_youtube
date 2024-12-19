import axios from 'axios';
import { API_KEY, BASE_URL } from './config/api';

// 검색어로 영상 검색 (videoId 목록 얻기)
export const searchVideos = async (query, maxResults = 20) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: 'snippet',
      q: query,
      maxResults,
      type: 'video',
      key: API_KEY,
      regionCode: 'KR',
    },
  });
  return response.data.items;
};

// videoId로 상세 정보 얻기
export const getVideoDetails = async (videoIds) => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: 'snippet,contentDetails,statistics',
      id: videoIds.join(','),
      key: API_KEY,
      regionCode: 'KR',
    },
  });
  return response.data.items;
};

// 채널 상세 정보 얻기
export const getChannelDetails = async (channelId) => {
  const response = await axios.get(`${BASE_URL}/channels`, {
    params: {
      part: 'snippet',
      id: channelId,
      key: API_KEY,
    },
  });
  return response.data.items[0];
};

// 인기 동영상 가져오기
export const getMostPopularVideos = async (maxResults = 20) => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode: 'KR',
      maxResults,
      key: API_KEY,
    },
  });
  return response.data.items;
};
