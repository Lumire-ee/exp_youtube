import React, {useState, useEffect} from "react";
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
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    onTermSubmit('react');
  },[]);

  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search',{
      params: {
        q: term,
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
    <>
      <div>초기설정</div>
    </>
  );
}

export default App;
