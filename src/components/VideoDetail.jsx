import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Videos, Loader } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import zIndex from '@mui/material/styles/zIndex';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, description },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  const descriptionRaw = description.split(/\r?\n/);

  return (
    <Box
      minHeight='95vh'
      style={{ backgroundColor: '#141414', paddingTop: '.5rem' }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1} style={{ overflowY: 'auto', height: '100%' }}>
          <Box
            sx={{
              width: '100%',
              position: 'sticky',
              // top: '10px',
            }}
          >
            {/* Player */}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className='react-player'
              controls
            />
            {/* Title */}
            <Typography
              color='#fff'
              variant='h5'
              fontWeight='bold'
              p={2}
              style={{ marginTop: '.5rem', paddingBottom: '0' }}
            >
              {title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >
              {/* Channel Title */}
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: 'subtitle1', md: 'h6' }}
                  color='#fff'
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontSize: '1.1rem',
                  }}
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                    style={{ fontSize: '1rem' }}
                  />
                </Typography>
              </Link>
              {/* Likes and Views */}
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  <i
                    class='fa-solid fa-thumbs-up'
                    style={{ marginRight: '8px' }}
                  ></i>
                  {parseInt(likeCount).toLocaleString()}{' '}
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  <i class='fa-solid fa-eye' style={{ marginRight: '8px' }}></i>
                  {parseInt(viewCount).toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
            {/* Read Description Button */}
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '0',
                  padding: '0',
                  fontWeight: 'normal',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
                onClick={() => setReadMore(!readMore)}
              >
                View Description
                {!readMore ? (
                  <i
                    class='fa-solid fa-angle-down'
                    style={{ marginLeft: '5px' }}
                  ></i>
                ) : (
                  <i
                    class='fa-solid fa-angle-up'
                    style={{ marginLeft: '5px' }}
                  ></i>
                )}
              </button>
            </Stack>
            {/* Description */}
            {readMore && (
              <Stack
                direction='column'
                justifyContent='space-between'
                sx={{ color: '#fff' }}
                py={1}
                px={2}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                }}
              >
                {descriptionRaw.map((item, i) => {
                  const splitItem = item.split(' ');

                  for (let httpsItem of splitItem) {
                    if (httpsItem.slice(0, 5) === 'https') {
                      return (
                        <a
                          href={httpsItem}
                          style={{ color: '#3da3e7', paddingLeft: '1.2rem' }}
                        >
                          {httpsItem}
                        </a>
                      );
                    }
                  }

                  return (
                    <p
                      style={{
                        margin: '.2rem',
                        padding: '0',
                        paddingLeft: '1rem',
                      }}
                      key={i}
                    >
                      {item}
                    </p>
                  );
                })}
              </Stack>
            )}
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent='center'
          alignItems='center'
          style={{ width: '350px' }}
        >
          <Videos videos={videos} direction='column' />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
