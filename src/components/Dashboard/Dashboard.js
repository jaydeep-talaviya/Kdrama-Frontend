import React from 'react';
import { Box, Typography } from '@mui/material';
import DynContainerDivs from './DynContainerDivs';
import InfiniteSlider from './InfiniteSlider';

function Dashboard() {
  return (
 
        <>
          <DynContainerDivs/>
          <InfiniteSlider/>
        </>
     
  );
}

export default Dashboard;
