import React from 'react';
import { Stack, Box } from '@mui/material';

import { ChannelCard, Loader, VideoCard } from './';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <Loader />;

  return (
    <div className='grid-feed'>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </div>
  );
};

export default Videos;
