import React from 'react';

const VideoItem = ({ video }) => {
    if (!video || !video.snippet || !video.snippet.thumbnails?.medium?.url) {
      return <div className='text-center text-gray-500'>No video data available</div>;
    }
  
    const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;
    
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md w-full h-full max-w-md md:max-w-lg min-h-full">
          <iframe
            className="w-full h-64 sm:h-full md:h-full lg:h-full rounded-lg object-cover"
            src={videoUrl}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            
          />
          
          <div className="text-center">
            <div className="font-bold text-xl text-gray-900">
              {video.snippet.title || 'Untitled'}
            </div>
          </div>
        </div>
      );
      
  };
  
  
  
  

export default VideoItem;