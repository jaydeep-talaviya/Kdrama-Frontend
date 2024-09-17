import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
          width: '250px',  // Set fixed width for the drawer
          backgroundColor: '#f4f4f4',
          height: `calc(100vh - ${headerHeight}px)`
        },
      }}
    >
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        style={{ width: 250, padding: '10px' }}
      >
        <h3>Right Sidebar Content</h3>
        {!isMediumScreenOrLarger && (
          <Button onClick={toggleDrawer(false)}>Close Sidebar</Button>
        )}
      </div>
    </Drawer>
  );
};

export default RightSidebar;
