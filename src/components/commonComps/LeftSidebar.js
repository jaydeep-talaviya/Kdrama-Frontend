import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const LeftSidebar = ({ isOpen, toggleDrawer }) => {
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      variant="persistent"  // Make the drawer persistent
      PaperProps={{
        sx: {
          position: 'absolute', // Absolute positioning to keep it from covering the main screen
          top: 'unset',  // Adjust according to the header's height
          width: '250px',  // Set fixed width for the drawer
          backgroundColor: '#f4f4f4',
        },
      }}
    >
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        style={{ width: 250, padding: '10px' }}
      >
        <h3>Left Sidebar Content</h3>
        {!isMediumScreenOrLarger && (
          <Button onClick={toggleDrawer(false)}>Close Sidebar</Button>
        )}
      </div>
    </Drawer>
  );
};

export default LeftSidebar;
