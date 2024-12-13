import React from 'react';


const VideoItem = ({ video }) => {
  const videoUrl = `https://www.youtube.com/embed/${video.id}`;
  
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1)+'...':str;
};
    
    return (
        <div className="flex flex-col rounded-large bg-white shadow-md">
          <iframe
            className="w-full aspect-video rounded-large"
            src={videoUrl}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="text-center flex justify-between">
            <div className='rounded-lg'>
            
            </div>
            <div>
            <div className="flex-col font-medium text-black text-large">
              {truncate(video.snippet.title, 55)} </div>
            <p className="text-grayDark text-medium">{video.snippet.channelTitle}</p>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
        
          </div>
        </div>
      );
      
  };
  
  
  
  

export default VideoItem;