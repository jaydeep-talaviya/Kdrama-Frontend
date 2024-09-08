import React, { useState, useEffect,useRef } from 'react';
import LeftSidebar from './commonComps/LeftSidebar';
import MainContent from './commonComps/MainContent';
import RightSidebar from './commonComps/RightSidebar';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Main.css';
import Header from './headers/Header';

function Main() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Set initial state based on screen size
  const [leftOpen, setLeftOpen] = useState(!isSmallScreen);
  const [rightOpen, setRightOpen] = useState(!isSmallScreen);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Update sidebar state when screen size changes
    setLeftOpen(!isSmallScreen);
    setRightOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const toggleLeftDrawer = (open) => () => {
    setLeftOpen(open);
  };

  const toggleRightDrawer = (open) => () => {
    setRightOpen(open);
  };

  const headerRef = useRef(null);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef.current]);

  return (
    <div>
      <Header ref={headerRef} className="header" />

      {/* Toggle buttons only visible on small screens */}
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

      {/* Sidebars visible on medium and larger screens, toggleable on small screens */}
      {(!isSmallScreen || leftOpen) && <LeftSidebar isOpen={leftOpen} toggleDrawer={toggleLeftDrawer} />}
      {(!isSmallScreen || rightOpen) && <RightSidebar isOpen={rightOpen} toggleDrawer={toggleRightDrawer} />}

      {/* Main Content */}
      {/* dynamic component */}
      <MainContent /> 
    </div>
  );
}

export default Main;
