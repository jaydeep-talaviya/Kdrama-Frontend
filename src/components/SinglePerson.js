import React, { useEffect, useState, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

function SinglePerson() {
    const contentRef = useRef(null); // Ref for the MainContent
    const [headerHeight, setHeaderHeight] = useState(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));  // Detect small screen
    const [leftOpen, setLeftOpen] = useState(false);
    
  
  return (
    <div>SinglePerson</div>
  )
}

export default SinglePerson