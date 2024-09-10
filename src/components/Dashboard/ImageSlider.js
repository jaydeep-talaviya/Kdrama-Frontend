import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import kdrama_1 from '../../images/kdrama_1.jpg';
import kdrama_2 from '../../images/kdrama_2.jpg';
import kdrama_3 from '../../images/kdrama_3.jpg';
import kdrama_4 from '../../images/kdrama_4.jpg';
import kdrama_5 from '../../images/kdrama_5.jpg';
import kdrama_6 from '../../images/kdrama_6.jpg';
import kdrama_7 from '../../images/kdrama_7.jpg';

const images = [kdrama_1, kdrama_2, kdrama_3, kdrama_4, kdrama_5, kdrama_6, kdrama_7];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true); // For controlling fade effect

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex]);

  const handleNext = () => {
    setFadeState(false); // Trigger fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeState(true); // Trigger fade-in after image changes
    }, 500); // Match the fade-out duration
  };

  const handlePrev = () => {
    setFadeState(false); // Trigger fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setFadeState(true); // Trigger fade-in after image changes
    }, 500); // Match the fade-out duration
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeState ? 1 : 0, // Fades in or out depending on the state
        }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
        onClick={handlePrev}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
        }}
      >
        {images.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === idx ? 'white' : 'rgba(255, 255, 255, 0.5)',
              transition: 'background-color 0.3s',
              cursor: 'pointer',
            }}
            onClick={() => {
              setFadeState(false); // Fade out before switching
              setTimeout(() => {
                setCurrentIndex(idx);
                setFadeState(true); // Fade in after the new image is shown
              }, 500);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
