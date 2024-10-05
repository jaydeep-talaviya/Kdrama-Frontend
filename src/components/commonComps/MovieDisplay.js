import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';

const MovieCardStyled = styled(Card)({
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

const MovieImage = styled(CardMedia)({
  height: 280,
  objectFit:'unset',
  filter: 'brightness(100%)', // Full brightness initially
  transition: 'filter 0.3s ease', // Smooth transition for image brightness
  '&:hover': {
    filter: 'brightness(60%)', // Darken image slightly on hover
  },
});


const MovieOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width:"100%",
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly transparent black overlay
  color: 'white',
  opacity: 0, // Hidden by default
  transition: 'opacity 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  objectFit:'unset',
  padding:"10px",
  overflowY:"auto",
  paddingY:"30px"
});
const MovieTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  textAlign: 'center',
});


const MovieCard = ({ movie }) => {
  const { movie_name, image_url, other_names, duration, airing_date, extra_info } = movie;

  return (
    <MovieCardStyled>
      {/* Movie Image */}
      <MovieImage
        component="img"
        image={image_url}
        alt={movie_name}
      />
              <MovieTitle>{movie_name}</MovieTitle>

      {/* Overlay with details */}
      <MovieOverlay className="overlay">
        <Typography variant="body2"><strong>Other Names:</strong>{other_names.join(', ')}</Typography>
        <Typography variant="body1"><strong>Duration:</strong> {duration}</Typography>
        <Typography variant="body2"><strong>Airing Date:</strong> {airing_date}</Typography>

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
      </MovieOverlay>
    </MovieCardStyled>
  );
};


export default MovieCard;


