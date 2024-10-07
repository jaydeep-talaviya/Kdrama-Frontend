import React,{useState,useRef} from 'react';
import { Box, Typography } from '@mui/material';
import DynContainerDivs from './DynContainerDivs';
import InfiniteSlider from './InfiniteSlider';
import CommonLayout from '../CommonLayout';

function Dashboard() {
  const contentRef = useRef(); // Ref for the MainContent
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
 
        <CommonLayout
      contentRef={contentRef}
      leftOpen={false}
      isSmallScreen={true} 
      setHeaderHeight={setHeaderHeight}
      headerHeight={headerHeight}
      SinglePage={true}
    >
          <DynContainerDivs/>
          <InfiniteSlider/>
        </CommonLayout>
     
  );
}

export default Dashboard;
