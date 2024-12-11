import React, { useEffect, useState, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loader from './commonComps/Loader';
import { useTheme, CircularProgress, Typography } from '@mui/material';
import CommonLayout from './CommonLayout';
import CarouselImage from './commonComps/CarouselImage';
import PersonMainDetails from './commonComps/PersonMainDetails';
import { Grid, Container } from '@mui/material';
import CastInfo from './commonComps/CastInfo';
import { useParams } from 'react-router-dom';
import apiClient from '../AxiosIntercepter';
import DramaMovieInfo from './commonComps/DramaMovieInfo';

function SinglePerson() {
    const contentRef = useRef(null); // Ref for the MainContent
    const [headerHeight, setHeaderHeight] = useState(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));  // Detect small screen
    const [leftOpen, setLeftOpen] = useState(false);
    
      // State for data, loading, and error
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { person_id } = useParams();
  const fetchSinglePerson = async (person_id) => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      const response = await apiClient.get(`/person/${person_id}`);
      const singlePerson = response.data;
      console.log("Fetched Single Person:", singlePerson);
      
      setData(singlePerson); // Set fetched data
    } catch (err) {
      console.error("Error fetching person:", err);
      setError('Failed to load person data.');
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchSinglePerson(person_id);
  }, [person_id]);

  
  if (loading) {
      return (
        <CommonLayout
        contentRef={contentRef}
        leftOpen={leftOpen}
        isSmallScreen={true} 
        setHeaderHeight={setHeaderHeight}
        headerHeight={headerHeight}
        SinglePage={true}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Loader />  {/* Display a loading spinner */}
        </Container>
        </CommonLayout>
      );
    }
  
    if (error) {
      return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Typography variant="h6" color="error">{error}</Typography> {/* Display error message */}
        </Container>
      );
    }
  
    return (
      <CommonLayout
        contentRef={contentRef}
        leftOpen={leftOpen}
        isSmallScreen={true} 
        setHeaderHeight={setHeaderHeight}
        headerHeight={headerHeight}
        SinglePage={true}
      >
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          {data.person_images &&
          <Grid item xs={12} md={5} lg={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CarouselImage images={data.person_images} title={data.name} />
          </Grid>
          }
          <Grid item xs={12} md={4} lg={4}>
            <PersonMainDetails
              data={{
                name: data.name,
                jobs: data.jobs,
                other_names: data.other_names,
                gender: data.gender,
               
                birth_of_date: data.birth_of_date,
               

              }}
            />
          </Grid>
        </Grid>
        <DramaMovieInfo
         directed_by_movies={data.directed_by_movies}
         directed_by_dramas={data.directed_by_dramas}
        written_of_dramas= {data.written_of_dramas}
        written_of_movies= {data.written_of_movies}
         cast_of_dramas= {data.cast_of_dramas}
         cast_of_movies= {data.cast_of_movies}
        
        />
      </CommonLayout>  
  )
}

export default SinglePerson