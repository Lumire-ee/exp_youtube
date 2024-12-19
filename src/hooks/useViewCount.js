// 조회수 변환
const useViewCount = (viewCount) => {
    if (!viewCount) return '조회수 정보 없음';
    //조회수 단위 변환
    if (viewCount >= 10000) {
      return `${Math.floor(viewCount / 10000).toFixed()}만회`;
    } else if (viewCount >= 1000) {
      return `${Math.floor(viewCount / 1000).toFixed()}천회`;
    } else {
      return `${viewCount}회`;
    }
  };
  
  export default useViewCount;
  