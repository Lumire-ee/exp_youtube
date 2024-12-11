import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos }) => {
  const renderedVideos = videos.map((video) => {
    if (!video.id || !video.id.videoId) {
      return null;
    }

    return <VideoItem key={video.id.videoId} video={video} />;
  });

  return (
    <div className="flex justify-center">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {renderedVideos}
      </div>
    </div>
  );
};

export default VideoList;
