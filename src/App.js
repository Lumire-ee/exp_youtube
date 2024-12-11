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
  return <></>;
}

export default App;
