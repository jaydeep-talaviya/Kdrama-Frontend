import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CustomDatePicker from './CustomDatePicker';

const RightSidebar = ({ isOpen,headerHeight, toggleDrawer }) => {
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      variant="persistent"  // Make the drawer persistent
      PaperProps={{
        sx: {
          position: 'absolute', // Absolute positioning to keep it from covering the main screen
          top: 'unset',  // Adjust according to the header's height
          backgroundColor: '#112e4a8c',
          height: `calc(100vh - ${headerHeight}px)`

        },
      }}
    >
      <div
        role="presentation"
        style={{ width: 250, padding: '10px' }}
      >
         <Box sx={{ padding: 4, 
          backgroundColor: '#1f3952a3', 
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", 
          maxWidth: 600, 
          margin: 'auto',
          color:'white',
          borderRadius:'10px'}}>
      {/* Genres Checkbox Group */}
      <Typography variant="h6" sx={{fontFamily: "Gloria Hallelujah",
          fontWeight: 700,textAlign:'center' }}>
            Select Dates
            </Typography>
            <Box sx={{ marginY: 4,borderRadius:'5%',background: "#1427468f",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
      }}>
        <CustomDatePicker/>
      </Box>
          </Box>
      </div>
    </Drawer>
  );
};

export default RightSidebar;
