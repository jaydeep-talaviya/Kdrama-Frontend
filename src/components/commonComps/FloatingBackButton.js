import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FloatingBackButton = () => {
  const navigate = useNavigate();

  return (
    <Fab
      color="primary"
      aria-label="back"
      onClick={() => navigate(-1)} // Go back to the previous page
      sx={{
        position: 'fixed',
        top: '200px',   // Distance from bottom
        right: '20px',    // Distance from right
        zIndex: 1000,     // Ensure it stays on top
      }}
    >
      <ArrowBackIcon />
    </Fab>
  );
};

export default FloatingBackButton;
