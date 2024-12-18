import { useEffect, useRef } from "react";

const useInfiniteScroll = (callback, hasMore) => {
  const loader = useRef(null);

//스크롤 조건부 콜백 함수 실행
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          callback(); // 데이터 로딩 함수 호출
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }
//값에 따라 추가 데이터 로딩을 제어
    return () => observer.disconnect();
  }, [callback, hasMore]);

  return loader;
};

export default useInfiniteScroll;
