import { useEffect } from 'react';

//컨텍스트바 외부 클릭 시 창 닫기
const useOnClickOutside = (ref, handler) => {
  //외부 클릭을 감지하는 함수
  useEffect(() => {
    const listener = (event) => {
      //ref가 현재 존재하지 않거나, 클릭된 대상이 ref 내부라면 아무 작업도 하지 않음
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);//ref 외부에서 클릭이 발생했을 때 handler 실행
    };
    //마우스 클릭과 터치 이벤트 감지
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    //컴포넌트가 언마운트 될 때 이벤트 리스너를 정리
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); //변경 될 때만 효과 실행
};

export default useOnClickOutside;
