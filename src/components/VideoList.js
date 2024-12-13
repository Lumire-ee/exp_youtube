import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos }) => {
  return (
    <div className='grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    {videos.map((video) => (
      <VideoItem 
      key={video.id} 
      video={video}
      channelThumbnail={video.channelThumbnail}
      />
    ))}
    </div>
    
  );
};

export default VideoList;
