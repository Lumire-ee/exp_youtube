import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../config/api';

const YoutubeVideos = ({ searchQuery = '' }) => {
  // 기본값은 빈 문자열
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!searchQuery.trim()) {
        setVideos([]); // 검색어가 없을 경우 빈 결과
        return;
      }

      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              type: 'video',
              regionCode: 'KR',
              maxResults: 30,
              q: searchQuery,
              key: API_KEY,
            },
          },
        );
        setVideos(response.data.items);
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchVideos(); // 검색어가 있을 경우만 API 호출
    }
  }, [searchQuery]);

  return (
    <div>
      {console.log('비디오 검색결과:', videos)}
      <main className="p-4">
        <h1 className="text-xxLarge font-bold">메인 콘텐츠</h1>
        <div className="space-y-4">
          {Array.from({ length: 50 }, (_, index) => (
            <p key={index} className="text-grayDark">
              스크롤 테스트용 더미 콘텐츠 {index + 1}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
};

export default YoutubeVideos;
