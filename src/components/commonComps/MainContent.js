import React from 'react';
import { Grid, Container } from '@mui/material';
import DramaCard from './DramaDisplay';
import MovieCard from './MovieDisplay';

// make it to dynamic
const MainContent = ({ dramas_movies_persons,type }) => {
  // console.log(">>>>>",dramas_movies_persons)
  return (
    <Container >
      <Grid container spacing={4} sx={{ justifyContent: 'center', width: '100%', margin: "0px", padding: "0px" }}>
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
      </Grid>
    </Container>
  );
};

export default MainContent;
