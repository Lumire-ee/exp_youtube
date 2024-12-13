import { API_KEY, BASE_URL } from './config/api';
import axios from 'axios';

import Header from './components/Header';
import YoutubeVideos from './components/YoutubeVideos';
import Aside from './components/Aside';
import CategorySlider from './components/CategorySlider';

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
    </div>
  );
}

export default App;
