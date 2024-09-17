import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CheckboxGroup from './FilterCheckboxes';




const LeftSidebar = ({ isOpen,left_props, headerHeight, toggleDrawer }) => {
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up('md'));

  const {genres,tv_channels} = left_props;
  console.log(">>>>>>>left_props",left_props,genres,tv_channels)

// States to store selected genres and TV channels
const [selectedGenres, setSelectedGenres] = useState([]);
const [selectedTvChannels, setSelectedTvChannels] = useState([]);

// Handler for selecting/unselecting genres
const handleGenreSelect = (id) => {
  setSelectedGenres((prevSelected) =>
    prevSelected.includes(id) ? prevSelected.filter((genreId) => genreId !== id) : [...prevSelected, id]
  );
};

// Handler for selecting/unselecting TV channels
const handleTvChannelSelect = (id) => {
  setSelectedTvChannels((prevSelected) =>
    prevSelected.includes(id) ? prevSelected.filter((channelId) => channelId !== id) : [...prevSelected, id]
  );
};


  return (
    <Drawer
      anchor="left"
      open={isOpen}
      // onClose={toggleDrawer(false)}
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
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
        style={{ width: 250, padding: '10px' }}
      >
        {/* start */}
        <h3>Left Sidebar Content</h3>
        <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: 4, maxWidth: 600, margin: 'auto' }}>
      {/* Genres Checkbox Group */}
      <CheckboxGroup
        label="Select Genres"
        items={genres}
        selectedItems={selectedGenres}
        handleSelect={handleGenreSelect}
      />

      {/* TV Channels Checkbox Group */}
      <CheckboxGroup
        label="Select TV Channels"
        items={tv_channels}
        selectedItems={selectedTvChannels}
        handleSelect={handleTvChannelSelect}
      />
    </Box>
        {/* end */}
        {!isMediumScreenOrLarger && (
          <Button onClick={toggleDrawer(false)}>Close Sidebar</Button>
        )}
      </div>
    </Drawer>
  );
};

export default LeftSidebar;
