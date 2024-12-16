import React from 'react';
import useTimeAgo from '../hooks/useTimeAgo';
import useViewCount from '../hooks/useViewCount';


const VideoItem = ({ video }) => {
  const videoId = typeof video.id === 'object' ? video.id.videoId : video.id;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&fs=0`;
  const channelThumbnail = video.channelThumbnail;
  const viewCount = useViewCount(video.statistics.viewCount); // 조회수
  const timeAgo = useTimeAgo(video.snippet.publishedAt); // 업로드

  
    return (
        <div className="flex flex-col rounded-large">
          <iframe
            className="mb-3 aspect-video min-h-fit rounded-large "
            src={videoUrl}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture "
            allowFullScreen
          />
          <div className="flex justify-between ">
            <div className='object-cover'>
            <img
              src={channelThumbnail}
              alt={video.snippet.channelTitle}
              className='size-10 rounded-full'
            />
            </div>
            <div className='mx-1 box-border h-auto w-32 grow'>
              <div className="box-border flex h-12 w-full text-large font-medium text-black text-clip overflow-hidden ...">
                {video.snippet.title} </div>
              <p className="text-medium text-grayDark">{video.snippet.channelTitle}</p>
              <p className="text-sm text-gray-500">
                조회수 {viewCount}회 • {timeAgo}
              </p>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
            </svg>
            </div>
          </div>
        </div>
      );
    
  };
  

export default VideoItem;