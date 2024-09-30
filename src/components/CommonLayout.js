import React, { useState, useEffect, useRef } from 'react';
import Header from './headers/Header'
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LeftSidebar from './commonComps/LeftSidebar';
import { Box, Typography } from '@mui/material';
import kdrama_bg from '../images/kdrama_bg.jpg';


function CommonLayout({children,contentRef,leftOpen,isSmallScreen,setHeaderHeight,headerHeight}) {
    
    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
          setHeaderHeight(headerRef.current.offsetHeight);
        }
      }, [headerRef.current]);
    
      
  return (
    <div>
    {/* Header Section */}
    <Header ref={headerRef} className="header" />


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
          paddingBottom: '0',
          display: 'flex', // Add flex to center content vertically
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: leftOpen && !isSmallScreen ? '250px' : '0', // Adjust margin when sidebar is open
          transition: 'margin-left 0.3s ease',  // Smooth transition effect  
        }}
      >
          <div style={{height: `calc(100vh - ${headerHeight+30}px)`,
          overflowY:"auto",  overflowX: "hidden" /* Prevent horizontal scrolling */        }} 
          ref={contentRef}>
            {children}

          </div>
      </Box>
    </Box>
  </div>

  )
}

export default CommonLayout