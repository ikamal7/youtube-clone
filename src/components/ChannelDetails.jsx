import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { ChannelCard, Videos } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetails = () => {

  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setvideos] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${ id }`)
      .then((data) => setChannelDetail(data?.items[ 0 ]));
    
    fetchFromAPI(`search?channelId=${ id }&part=snippet&order=date`)
      .then((data) => setvideos(data?.items));
  }, [ id ]);
  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={ {
          background : 'linear-gradient(90deg, rgba(42,213,212,1) 0%, rgba(19,22,144,1) 100%)',
          zIndex: 10,
          height:'300px'
        }}
        />
        <ChannelCard channelDetail={ channelDetail } marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr: {sm: '100px'}}} />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetails;