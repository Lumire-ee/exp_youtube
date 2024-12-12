import { useEffect, useState } from 'react';
import { API_KEY, BASE_URL } from './config/api';
import axios from 'axios';
import VideoList from './components/VideoList';


export const getVideos = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        ...params,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error.response?.data || error.message);
    throw error;
  }
};

function App() {
  const [videos, setVideos] = useState([]);


  useEffect(() => {
   

    getVideos('videos', {
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode: 'KR',
      maxResults: 5,
    })
      .then((data) => {
        console.log('videos list', data.items);
        setVideos(data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
  <>
  
  <VideoList videos={videos} />
  
  </>
  );
}

export default App;