import React, { useState, useEffect } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    console.log('검색 기록 불러오기(로컬스토리지', savedHistory); // DEBUG
    setSearchHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!searchHistory.includes(query)) {
      const updatedHistory = [query, ...searchHistory].slice(0, 10);
      setSearchHistory(updatedHistory);
    }
  };

  const handleDeleteHistory = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onSearch={handleSearch}
        searchHistory={searchHistory}
        onDeleteHistory={handleDeleteHistory}
      />
      <div className="flex flex-1">
        <Aside />
        <div className="flex flex-1 flex-col overflow-hidden">
          <CategorySlider />
          <YoutubeVideos searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default App;
