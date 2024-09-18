import React from 'react';
import DramaCard from './DramaDisplay';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

const MainContent = () => {

const drama = {
  drama_name: "100 Days My Prince 00 Days My Prince ",
  image_url: "https://photos.hancinema.net/photos/photo996064.jpg",
  other_names: ["백일의 낭군님 ", "baek-il-eui nang-gun-nim","baek-il-eui nang-gun-nim","baek-il-eui nang-gun-nim"],
  tv_channel: "tvN (tvN)",
  airing_dates_start: "2018/09/10",
  airing_dates_end: "2018/10/30",
  extra_info: {
    genres: ["Drama", "Historical", "Romance","Drama","Drama","Historical", "Romance"],
  },
};
  return (
    <div className="main-content">
          <Container>
          <Grid container spacing={4} sx={{justifyContent:'center',width:'100%',margin:"0px",padding:"0px"}}>

        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        <DramaCard drama={drama}/>
        </Grid>
        </Container>

    </div>
  );
};

export default MainContent;
