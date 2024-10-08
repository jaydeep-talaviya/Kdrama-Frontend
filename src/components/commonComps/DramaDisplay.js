import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip,Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

// Create styled components
const DramaCardStyled = styled(Card)({
  position: 'relative',
  width: 250,
  margin: 20,
  borderRadius: 15,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  objectFit:'unset',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  },
  '&:hover .overlay': {
    opacity: 1,  // Show the details on hover
  },
});

const DramaImage = styled(CardMedia)({
  height: 280,
  objectFit:'unset',
  filter: 'brightness(100%)', // Full brightness initially
  transition: 'filter 0.3s ease', // Smooth transition for image brightness
  '&:hover': {
    filter: 'brightness(60%)', // Darken image slightly on hover
  },
});

const DramaOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width:'100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly transparent black overlay
  color: 'white',
  opacity: 0, // Hidden by default
  transition: 'opacity 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  objectFit:'unset',
  overflowY:"auto",
  paddingY:"30px"
});

const DramaTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  textAlign: 'center',
});
const NavigationButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#2196f3',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
});

const DramaCard = ({ drama }) => {
  const { _id,drama_name, image_url, other_names, tv_channel, airing_dates_start, airing_dates_end, extra_info } = drama;
  return (
    <DramaCardStyled>
      {/* Drama Image */}
      <DramaImage
        component="img"
        image={image_url}
        alt={drama_name}
      />
              <DramaTitle>{drama_name}</DramaTitle>

      {/* Overlay with details */}
      <DramaOverlay className="overlay">
        <Typography variant="body2"><strong>Other Names:</strong>{other_names.join(', ')}</Typography>
        <Typography variant="body1"><strong>TV Channel:</strong> {tv_channel}</Typography>
        <Typography variant="body2"><strong>Airing Dates:</strong> {airing_dates_start} - {airing_dates_end}</Typography>

        {/* Genres */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', 
            gap: '8px', marginTop: '20px',marginBottom: '20px',
            justifyContent:'center'}}>
          {extra_info.genres.map((genre, index) => (
            <Chip
              key={index}
              label={genre}
              sx={{
                backgroundColor: '#e0f7fa',
                color: '#00695c',
                fontWeight: 'bold',
              }}
            />
          ))}
        </Box>
        <Link to={`/kdrama/${_id}`}>
          <NavigationButton variant="contained">View Details</NavigationButton>
        </Link>
      </DramaOverlay>
    </DramaCardStyled>
  );
};

// Example component to render the DramaCard
// const DramaDisplay = ({ dramas }) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//       {dramas.map((drama, index) => (
//         <DramaCard key={index} drama={drama} />
//       ))}
//     </Box>
//   );
// };

export default DramaCard;
