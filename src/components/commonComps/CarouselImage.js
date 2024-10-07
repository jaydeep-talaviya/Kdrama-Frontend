import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box } from '@mui/material';
import './CarouselImage.css';

function CarouselItem({ item }) {
  return (
    <Paper sx={{ textAlign: 'center', height: '100%' }}>
      <img
        src={item.img}
        alt={item.title}
        style={{
          width: '100%',
          height: '100%',  // Set height to 100% to fill the container
        }}
      />
    </Paper>
  );
}

function CarouselImage({ images, title }) {
  return (
    <Box
      sx={{
        width: "100%",
        margin: '0 auto',  // Center horizontally
        height: '400px',   // Fixed height for the carousel
        pb:2
      }}
    >
      <Carousel
        autoPlay={true}
        indicators={true}
        navButtonsAlwaysVisible={true}
        sx={{
          height: '100%',  // Ensures the carousel fills the box
          width: '100%',
        }}
      >
        {images.map((image, index) => (
          <CarouselItem key={index} item={{ img: image, title: title }} />
        ))}
      </Carousel>
    </Box>
  );
}

export default CarouselImage;
