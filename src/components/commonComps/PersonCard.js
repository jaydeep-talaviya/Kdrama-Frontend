import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import kdrama_bg from '../../images/kdrama_bg.jpg';

const PersonCardStyled = styled(Card)({
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

const PersonImage = styled(CardMedia)({
  height: 280,
  objectFit:'unset',
  filter: 'brightness(100%)', // Full brightness initially
  transition: 'filter 0.3s ease', // Smooth transition for image brightness
  '&:hover': {
    filter: 'brightness(60%)', // Darken image slightly on hover
  },
});


const PersonOverlay = styled(Box)({
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
  overflowY:"auto",
  paddingY:"30px",
  overflowWrap:"anywhere"
});
const PersonTitle = styled(Typography)({
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

const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
const isValidDate = (date) => {
  return dateRegex.test(date);
};

const PersonCard = ({ person }) => {

  const { _id,name, person_image, jobs, gender, other_names, birth_of_date } = person;

  return (
    <PersonCardStyled>
      {/* Person Image */}
      <PersonImage
        component="img"
        image={person_image||kdrama_bg}
        alt={name}
      />
              <PersonTitle>{name}</PersonTitle>

      {/* Overlay with details */}
      <PersonOverlay className="overlay">
      {gender &&
        <Typography variant="body2"><strong>Gender:</strong> {gender}</Typography>
        }
        {birth_of_date && isValidDate(birth_of_date) &&
        <Typography variant="body2"><strong>Birth:</strong> {birth_of_date}</Typography>
        }
        {other_names && other_names !=='None' &&
            <Typography variant="body2"><strong>Other Names:</strong>{other_names}</Typography>
        }
        {jobs && jobs.length &&
        <Typography variant="body1"><strong>Jobs:</strong> {jobs.join(",")}</Typography>
        }
       

       
        
      </PersonOverlay>
    </PersonCardStyled>
  );
};


export default PersonCard;


