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
        const channelRespone = await axios.get(`${BASE_URL}/channels`,{
          params: {
            part: 'snippet',
            id: video.snippet.channelId,
            key: API_KEY,
          },
        });

        const channelThumbnail=
        channelRespone.data.items[0]?.snippet.thumbnails.default.url;

        return {...video, channelThumbnail};
      })
    );

    return videowithChannels;
  } catch (error) {
    console.error('Failed to fetch data:', error.response?.data || error.message);
    throw error;
  }
};

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideosWithChannel({
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode: 'KR',
      maxResults: 20,//영상 갯수 조절
    })
      .then((data) => {
        console.log('videos list', data);
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Aside />
        <div className="flex flex-1 flex-col">
          <CategorySlider />
          <YoutubeVideos />
        </div>
      </div>
     <VideoList 
    videos={videos}
  />
    </div>
  );
}

export default App;