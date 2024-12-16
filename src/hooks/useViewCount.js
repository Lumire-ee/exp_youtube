// hooks/useViewCount.js
const useViewCount = (viewCount) => {
    if (!viewCount) return '조회수 정보 없음';
  
    if (viewCount >= 10000) {
      return `${(viewCount / 10000).toFixed(1)}만회`;
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}천회`;
    } else {
      return `${viewCount}회`;
    }
  };
  
  export default useViewCount;
  