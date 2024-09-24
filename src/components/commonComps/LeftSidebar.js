import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CheckboxGroup from './FilterCheckboxes';
import CustomDatePicker from './CustomDatePicker';
import dayjs from 'dayjs';



const LeftSidebar = ({ isOpen, handleFilter,handleClear, left_props, headerHeight, toggleDrawer }) => {
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up('md'));

  const { genres, tv_channels } = left_props;

  // States to store selected genres and TV channels
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTvChannels, setSelectedTvChannels] = useState([]);
  const [startDate, setStartDate] = useState(dayjs('1924-01-01'));
  const [endDate, setEndDate] = useState(dayjs());

  const handleSubmit = () => {
  
    const start_date = startDate.$d.toLocaleDateString('en-CA');
    const end_date = endDate.$d.toLocaleDateString('en-CA');
   console.log(">start_dat",startDate)
    handleFilter({'start_date':start_date,'end_date':end_date,
      'genres':selectedGenres,"tv_channels":selectedTvChannels})
  }
  const handleReset=()=>{
    handleClear()
  }


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
          backgroundColor: '#112e4a8c',
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
        <Box sx={{
          padding: 4,
          backgroundColor: '#1f3952a3',
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          maxWidth: 600,
          margin: 'auto',
          color: 'white',
          borderRadius: '10px'
        }}>
         
          <Box sx={{
            display:"flex",justifyContent:"center",marginY:3
          }}>
          <Button variant="contained" onClick={()=>handleSubmit()} sx={{justifyContent:"center"}}>
          <Typography variant="p" sx={{
            fontFamily: "Gloria Hallelujah",
            fontWeight: 700, textAlign: 'center'
          }}>
            Apply Filter
          </Typography>
          </Button>
        </Box>
        <Box sx={{
            display:"flex",justifyContent:"center",marginY:3
          }}>
          <Button variant="contained" onClick={()=>handleSubmit()} sx={{justifyContent:"center"}}>
          <Typography variant="p" sx={{
            fontFamily: "Gloria Hallelujah",
            fontWeight: 700, textAlign: 'center'
          }}>
            Clear
          </Typography>
          </Button>
        </Box>

          <Typography variant="h6" sx={{
            fontFamily: "Gloria Hallelujah",
            fontWeight: 700, textAlign: 'center'
          }}>
            Select Dates
          </Typography>
          <Box sx={{
            marginY: 4, borderRadius: '5%', background: "#1427468f",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
          }}>
            <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </Box>


          {/* Genres Checkbox Group */}
          <Typography variant="h6" sx={{
            fontFamily: "Gloria Hallelujah",
            fontWeight: 700, textAlign: 'center'
          }}>Select Genres</Typography>
          <CheckboxGroup
            label="Select Genres"
            items={genres}
            selectedItems={selectedGenres}
            handleSelect={handleGenreSelect}
          />

          {/* TV Channels Checkbox Group */}
          <Typography variant="h6" sx={{
            fontFamily: "Gloria Hallelujah",
            fontWeight: 700, textAlign: 'center'
          }}>Select TV Channels</Typography>
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