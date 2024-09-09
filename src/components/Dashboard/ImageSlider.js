// ImageSlider.js
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <IconButton
        sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
        onClick={handlePrev}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default ImageSlider;
