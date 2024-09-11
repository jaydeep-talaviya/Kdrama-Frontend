import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from './commonComps/LeftSidebar';
import RightSidebar from './commonComps/RightSidebar';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './headers/Header';
import kdrama_bg from '../images/kdrama_bg.jpg';
import './Main.css';

function Main({ child, isVisible }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [leftOpen, setLeftOpen] = useState(!isSmallScreen);
  const [rightOpen, setRightOpen] = useState(!isSmallScreen);
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef.current]);

  useEffect(() => {
    setLeftOpen(!isSmallScreen);
    setRightOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const toggleLeftDrawer = (open) => () => {
    setLeftOpen(open);
  };

  const toggleRightDrawer = (open) => () => {
    setRightOpen(open);
  };

  return (
    <div>
      {/* Header Section */}
      <Header ref={headerRef} className="header" />

      {isSmallScreen && (
        <>
          <Button className="toggle-btn left" onClick={toggleLeftDrawer(!leftOpen)}>
            <ArrowCircleRightIcon />
          </Button>
          <Button className="toggle-btn right" onClick={toggleRightDrawer(!rightOpen)}>
            <ArrowCircleLeftIcon />
          </Button>
        </>
      )}

      {isVisible && (
        <>
          {(!isSmallScreen || leftOpen) && <LeftSidebar isOpen={leftOpen} toggleDrawer={toggleLeftDrawer} />}
          {(!isSmallScreen || rightOpen) && <RightSidebar isOpen={rightOpen} toggleDrawer={toggleRightDrawer} />}
        </>
      )}

      {/* Main content area */}
      <Box
        sx={{
          position: 'relative',
          minHeight: `calc(100vh - ${headerHeight}px)`, // Subtract headerHeight from 100vh
          backgroundImage: `url(${kdrama_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust opacity as needed
            zIndex: 1, // Below content but above background
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2, // Above overlay
            color: 'white',
            textAlign: 'center',
            padding: '20px',
            height: '100%',
            display: 'flex', // Add flex to center content vertically
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {child}
        </Box>
      </Box>
    </div>
  );
}

export default Main;
