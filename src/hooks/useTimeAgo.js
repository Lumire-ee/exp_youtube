// 업로드 날짜 변환
const useTimeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
  
    if (isNaN(publishedDate.getTime())) {
      return 'Invalid date';
    }
    //날짜 단위 변환
    const diffInSeconds = Math.max(0, (now - publishedDate) / 1000);
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;
  //업로드 날짜 기준 지정
    if (diffInSeconds < secondsInMinute) {
      return `방금 전`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes}분 전`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours}시간 전`;
    } else if (diffInSeconds < secondsInMonth) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days}일 전`;
    } else if (diffInSeconds < secondsInYear) {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months}개월 전`;
    } else {
      const years = Math.floor(diffInSeconds / secondsInYear);
      return `${years}년 전`;
    }
  };
  
  export default useTimeAgo;
  