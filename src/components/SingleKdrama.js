import React, { useEffect, useState, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, CircularProgress, Typography } from '@mui/material';
import CommonLayout from './CommonLayout';
import CarouselImage from './commonComps/CarouselImage';
import MainDetails from './commonComps/MainDetails';
import { Grid, Container } from '@mui/material';
import CastInfo from './commonComps/CastInfo';
import { useParams } from 'react-router-dom';
import apiClient from '../AxiosIntercepter';
import Loader from './commonComps/Loader'; // Import Loader component

function SingleKdrama() {
  const contentRef = useRef(null); // Ref for the MainContent
  const [headerHeight, setHeaderHeight] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));  // Detect small screen
  const [leftOpen, setLeftOpen] = useState(false);
  
  // State for data, loading, and error
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { drama_id } = useParams();
  
  const fetchSingleDrama = async (drama_id) => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      const response = await apiClient.get(`/drama/${drama_id}`);
      const singleDrama = response.data;
      console.log("Fetched Single Drama:", singleDrama);
      
      setData(singleDrama); // Set fetched data
    } catch (err) {
      console.error("Error fetching drama:", err);
      setError('Failed to load drama data.');
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchSingleDrama(drama_id);
  }, [drama_id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Loader />  {/* Display a loading spinner */}
      </Container>
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
        <Grid item xs={12} md={5} lg={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CarouselImage images={data.extra_info?.images} title={data.drama_name} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <MainDetails
            data={{
              title: data.drama_name,
              genres: data.extra_info?.genres,
              image_url: data.image_url,
              other_names: data.other_names,
              tv_channel: data.tv_channel,
              airing_dates_start: data.airing_dates_start,
              airing_dates_end: data.airing_dates_end,
              last_paragraph: data.last_paragraph,
            }}
          />
        </Grid>
      </Grid>
      <CastInfo
        directed_bys={data.extra_info?.directed_bys}
        written_bys={data.extra_info?.written_bys}
        casts_info={data.extra_info?.casts_info}
      />
    </CommonLayout>
  );
}

export default SingleKdrama;
