import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Videos from './Videos';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Loader from './Loader';




const VideoDetail = () => {
  const [ videoDetail, setVideoDetail ] = useState(null);
  const [ videos, setVideos ] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${ id }`)
      .then((data) => setVideoDetail(data.items[ 0 ]));
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${ id }&type=video`)
      .then((data) => setVideos(data.items));
  },
    [ id ]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: {title, channelId, channelTitle}, statistics:{viewCount, likeCount}} = videoDetail;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{xs:'column', md: 'row'}}>
        <Box flex="1">
          <Box sx={ { width: '100%', position: 'sticky', top: '86px' } }>
            <ReactPlayer url={ `//www.youtube.com/watch?v=${ id }` }
              className="react-player" controls config={{ youtube: { playerVars: { origin: 'https://www.youtube.com' } } }}
            />
            <Typography color='#fff' variant='h5' fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{color: '#fff'}} py={1} px={2}>
              <Link to={ `/channel/${ channelId }` }>
                <Typography color='#FFF' variant={ { sm: 'subtitle1', md: 'h6' } }>
                  { channelTitle }
                  <CheckCircle sx={{fontSize:14, color: 'gray', ml:'5px' }} />
                </Typography>
                </Link>
            </Stack>
            <Stack direction='row' gap="20px" alignItems="center">
              <Typography variant='body1' sx={{opacity: '0.7'}}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant='body1' sx={{opacity: '0.7'}}>
                {parseInt(likeCount).toLocaleString()} likes
                </Typography>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems='center'>
            <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail;