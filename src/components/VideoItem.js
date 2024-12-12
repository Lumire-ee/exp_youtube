import React from 'react';

const VideoItem = ({ video }) => {
    if (!video || !video.snippet || !video.snippet.thumbnails?.medium?.url) {
      return <div className='text-center text-gray-500'>No video data available</div>;
    }
  
    const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;
    
    return (
        <div className="flex size-full min-h-full max-w-md flex-col items-center justify-center rounded-lg bg-white shadow-md md:max-w-lg">
          <iframe
            className="h-64 w-full rounded-lg object-cover sm:h-full md:h-full lg:h-full"
            src={videoUrl}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            
          />
          
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">
              {video.snippet.title || 'Untitled'}
            </div>
          </div>
        </div>
      );
      
  };
  
  
  
  

export default VideoItem;