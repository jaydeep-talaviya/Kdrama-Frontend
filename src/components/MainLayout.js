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

function Main({ child,contentRef,setFilters,handleClear,filters,left_props, isVisible }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [leftOpen, setLeftOpen] = useState(!isSmallScreen);
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef(null);


  const handleFilter=(filterData)=>{
    setFilters(filterData)
  }

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef.current]);

  useEffect(() => {
    setLeftOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const toggleLeftDrawer = (open) => () => {
    setLeftOpen(open);
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
          
        </>
      )}

      {isVisible && (
        <>
          {(!isSmallScreen || leftOpen) && <LeftSidebar isOpen={leftOpen} handleFilter={handleFilter} filters={filters} handleClear={handleClear} left_props={left_props} headerHeight={headerHeight} toggleDrawer={toggleLeftDrawer} />}
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
          {child}
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Main;
