import { useEffect } from 'react';
import { API_KEY, BASE_URL } from './config/api';
import axios from 'axios';

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
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

function App() {
  useEffect(() => {
    getVideos('videos', {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: 'KR',
      maxResults: 10,
    })
      .then((data) => {
        console.log('videos list', data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <></>;
}

export default App;