import { useEffect, useState } from 'react';

import Header from './components/Header';
import Aside from './components/Aside';
import CategorySlider from './components/CategorySlider';
import YoutubeVideos from './components/YoutubeVideos';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchHistory, setSearchHistory] = useState([]);

  // 로컬스토리지에서 검색 기록 불러오기
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory'));
    console.log('검색 기록 불러오기(로컬스토리지):', savedHistory); // DEBUG
    if (Array.isArray(savedHistory)) {
      setSearchHistory(savedHistory);
    } else {
      // savedHistory가 null 또는 올바르지 않은 형식일 경우 빈 배열로 대체
      setSearchHistory([]);
    }
  }, []);

  // 검색 기록 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 검색 실행
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('');

    if (!searchHistory.includes(query)) {
      const updatedHistory = [query, ...searchHistory].slice(0, 10);
      setSearchHistory(updatedHistory);
    }
  };

  // 카테고리 선택
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  // 검색 기록 삭제
  const handleDeleteHistory = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onSearch={handleSearch}
        searchHistory={searchHistory}
        onDeleteHistory={handleDeleteHistory}
        onCategorySelect={handleCategorySelect}
      />
      <div className="flex flex-1">
        <Aside />
        <div className="flex flex-1 flex-col overflow-hidden">
          <CategorySlider onCategorySelect={handleCategorySelect} />
          <div className="flex-1 overflow-auto p-4">
            <YoutubeVideos
              searchQuery={searchQuery}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
