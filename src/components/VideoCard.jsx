import { Link } from "react-router-dom"

import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import {demoThumbnailUrl, demoChannelTitle, demoProfilePicture, demoVideoTitle, demoChannelUrl, demoVideoUrl } from '../utils/constants';

const VideoCard = ({ video : {id:{videoID}, snippet}}) => {
  return (
    <Card sx={ {
      width: { md: '320px', xs: '100%' },
      boxShadow:'none', borderRadius: 'none'
    }}>
      <Link to={videoID ? `/video/${videoID}` : demoVideoUrl}>
        <CardMedia
          image={ snippet?.thumbnails?.high?.url }
          alt={ snippet?.title }
          sx={{width: 358, height: 180}}
        />
      </Link>
      <CardContent sx={ {
        backgroundColor:'#1e1e1e', height: '106px'
      }}>
        <Link to={ videoID ? `/video/${ videoID }` : demoVideoUrl }>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            { snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60) }
          </Typography>
        </Link>
        <Link to={ snippet?.channelId ? `/channel/${ snippet?.channelId }` : demoChannelUrl }>
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            { snippet?.channelTitle || demoChannelTitle }
            <CheckCircle sx={{fontSize:12, color: 'gray', ml:'5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default VideoCard