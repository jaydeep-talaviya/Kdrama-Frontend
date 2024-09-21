import React from 'react';
import { Grid, Container } from '@mui/material';
import DramaCard from './DramaDisplay';

const MainContent = ({ dramas }) => {
  return (
    <Container >
      <Grid container spacing={4} sx={{ justifyContent: 'center', width: '100%', margin: "0px", padding: "0px" }}>
        {dramas.map((drama, index) => (
          <DramaCard key={index} drama={drama} />
        ))}
      </Grid>
    </Container>
  );
};

export default MainContent;
