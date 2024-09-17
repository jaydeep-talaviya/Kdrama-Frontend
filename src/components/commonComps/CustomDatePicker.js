import React, { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { styled } from '@mui/system';

const StyledDatePicker = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px 5px',
  borderRadius: '10px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  '& .MuiTextField-root': {
    borderRadius: '8px',
    '& .MuiInputBase-input': {
      padding: '10px',
      fontWeight: 'bold',
    },
  },
}));

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 500, margin: 'auto'}}>
        <Paper elevation={3} sx={{  borderRadius: 4 }}>
         

          <StyledDatePicker>
            {/* Start Date Picker */}
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />

            {/* End Date Picker */}
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </StyledDatePicker>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
