import React, { useState, useRef } from 'react';
import useTimeAgo from '../hooks/useTimeAgo';
import useViewCount from '../hooks/useViewCount';
import OptionMenu from './OptionMenu/index';
import useOnClickOutside from '../hooks/useOnClickOutside';

const VideoItem = ({ video }) => {
  const videoId = typeof video.id === 'object' ? video.id.videoId : video.id;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&amp;fs=0&amp;showinfo=0&controls=0&color=white&fs=0&autoplay=1&mute=1&cc_load_policy=0&modestbranding=1`;
  const channelThumbnail = video.channelThumbnail;
  const viewCount = useViewCount(video.statistics.viewCount); // 조회수 rel=0&amp;fs=0&amp;showinfo=0
  const timeAgo = useTimeAgo(video.snippet.publishedAt); // 업로드
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const optionRef = useRef();

  const handleMouseOver = () => {
    setIsPlaying(true);
  };
  const handleMouseOut = () => {
    setIsPlaying(false);
  };

  const handleOptionClick = (e) => {
    e.stopPropagation();
    setIsOptionOpen(!isOptionOpen);
  };
  useOnClickOutside(optionRef, () => setIsOptionOpen(false));
  
    return (
        <div className="flex flex-col rounded-large">
          {!isPlaying ? (
        <div
          className="mb-3 aspect-video min-h-fit rounded-large"
          style={{
            backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            cursor: 'pointer',
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          
        </div>
      ) : (
        <iframe
          className="mb-3 aspect-video min-h-fit" 
          src={videoUrl}
          title={video.snippet.title}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
          allow-scripts
          volume="0"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      )}
          <div className="flex justify-between ">
            <div className='object-cover'>
            <img
              src={channelThumbnail}
              alt={video.snippet.channelTitle}
              className='size-10 rounded-full'
            />
            </div>
            <div className='mx-1 box-border h-auto w-32 grow'>
              <div className="box-border flex h-12 w-full text-large font-medium text-black text-ellipsis overflow-hidden (`...`)">
                {video.snippet.title} </div>
              <p className="text-medium text-grayDark">{video.snippet.channelTitle}</p>
              <p className="text-sm text-gray-500">
                조회수 {viewCount}회 • {timeAgo}
              </p>
            </div>
            <div className="relative">
        <svg 
          onClick={handleOptionClick}
          xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 -960 960 960" 
          width="24px" 
          fill="#5f6368"
          className="cursor-pointer"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
        </svg>
        {isOptionOpen && (
          <div ref={optionRef} className="absolute inset-y-0 left-48  top-6 mt-0 z-10">
            <OptionMenu onClose={() => setIsOptionOpen(false)} />
          </div>
        )}
      </div>
          </div>
        </div>
        
      );
      
    
  };
  

export default VideoItem;

