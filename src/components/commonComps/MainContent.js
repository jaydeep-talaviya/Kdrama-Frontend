import React from 'react';
import { Grid, Container } from '@mui/material';
import DramaCard from './DramaDisplay';
import MovieCard from './MovieDisplay';
import PersonCard from './PersonCard';

// make it to dynamic
const MainContent = ({ dramas_movies_persons,type }) => {
  // console.log(">>>>>",dramas_movies_persons)
  return (
    <Container >
      <Grid container spacing={4} sx={{ justifyContent: 'center', width: '100%', margin: "0px", padding: "0px" }}>
        {dramas_movies_persons.length == 0 && 
        <h1>No Any {type} Found ! Try Again</h1>
        }
        
        {type == 'drama' &&
        dramas_movies_persons.map((drama, index) => (
          <DramaCard key={index} drama={drama} />
        ))
      }
      {type == 'movie' &&
        dramas_movies_persons.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))
      }
      {type == 'person' &&
        dramas_movies_persons.map((person, index) => (
          <PersonCard key={index} person={person} />
        ))
      }
      
      </Grid>
    </Container>
  );
};

export default MainContent;
