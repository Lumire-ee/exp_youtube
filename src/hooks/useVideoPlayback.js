import { useState } from "react";
//비디오 재생 상태 관리
const useVideoPlayback = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseOver = () => {
    setIsPlaying(true); // 마우스를 올릴 때 재생 상태로 변경
  };

  const handleMouseOut = () => {
    setIsPlaying(false); // 마우스를 떼면 정지 상태로 변경
  };

  return { isPlaying, handleMouseOver, handleMouseOut };
};

export default useVideoPlayback;
