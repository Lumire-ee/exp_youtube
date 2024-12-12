import React from 'react';


const VideoItem = ({ video }) => {
  const videoUrl = `https://www.youtube.com/embed/${video.id}`;
    
    return (
        <div className="flex flex-col rounded-lg bg-white shadow-md">
          <iframe
            className="w-full aspect-video rounded-lg"
            src={videoUrl}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="text-center flex justify-between">
            <div className='rounded-lg'>
            <img
              src={video.snippet.forUsername} // URL로 이미지를 가져옵니다.
              alt="Channel Thumbnail"
              className="rounded-lg w-16 h-16" // 스타일로 크기와 모양 조절
            />  
            </div>
            <div>
            <div className="flex-col text-1.6rem font-bold text-gray-900">
              {video.snippet.title}</div>
            <p className="text-gray-600">{video.snippet.channelTitle}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
          
          </div>
        </div>
      );
      
  };
  
  
  
  

export default VideoItem;