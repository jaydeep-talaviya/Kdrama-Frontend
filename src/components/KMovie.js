import React, { useEffect, useState, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CommonLayout from './CommonLayout';
import LeftSidebar from './commonComps/LeftSidebar';
import Loader from './commonComps/Loader'; // Import Loader component
import MainContent from './commonComps/MainContent';
import apiClient from '../AxiosIntercepter';
import { debounce } from 'lodash'; // Make sure to install lodash


function KMovie() {
  const [all_genres, SetAllGenres] = useState([]);
  const [movies, setMovies] = useState([]); // State to hold the movie list
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [loading, setLoading] = useState(false); // Loading state for infinite scroll
  const [initialLoading, setInitialLoading] = useState(true); // Loading state for the initial fetch or filter
  const limit = 12; // Limit of items per fetch
  const [filters, setFilters] = useState({});
  const contentRef = useRef(); // Ref for the MainContent
  const fetchCalledRef = useRef(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [leftOpen, setLeftOpen] = useState(!isSmallScreen);
  const [headerHeight, setHeaderHeight] = useState(0);

  const toggleLeftDrawer = (open) => () => {
    setLeftOpen(open);
  };
  const handleClear = () => {
    setFilters({});
    resetMovies(); // Clear current movies and reset the offset
    fetchCalledRef.current = false; // Mark as called
    
  };

// Fetch genres
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_genres = await apiClient.get('/drama/genres?limit=200');
        SetAllGenres(response_genres.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);


    // Function to reset movies and offset
    const resetMovies = () => {
      // console.log(">>>step 222")
      setMovies([]); // Clear movies
      setOffset(0);  // Reset the offset to 0
      
    };
  
    // Function to fetch movies based on the current offset
    const fetchMovies = async () => {
      // console.log(">>>>>loading",loading)
      if (loading) return; // Prevent fetching if already loading
      setLoading(true); // Set loading to true
      try {
        let filter_condition = '&order_by=airing_date&direction=desc';
        
        if (Object.keys(filters).length > 0) {
          if (filters.start_date) {
            filter_condition += `&start_date=${filters.start_date.replaceAll("-","/")}&end_date=${filters.end_date.replaceAll("-","/")}`;
          }
          if (filters.genres && filters.genres.length > 0) {
            filters.genres.forEach((genre) => {
              filter_condition += `&genres=${genre}`;
            });
          }
          
        }
  
        const response = await apiClient.get(`/movie?limit=${limit}&offset=${offset}${filter_condition}`);
        const newMovies = response.data.data;
  
        // Filter out existing movies by ID
        const existingMovieIds = new Set(movies.map((movie) => movie._id));
        const filteredNewMovies = newMovies.filter((movie) => !existingMovieIds.has(movie._id));
        console.log(">>>>",existingMovieIds,newMovies,filteredNewMovies)
        // Update the movies state with unique entries
        setMovies((prevMovies) => [...prevMovies, ...filteredNewMovies]);
  
        // Update offset by the number of newly fetched movies
        console.log(">>>>>>>offeset",filteredNewMovies.length)
        setOffset((prevOffset) => prevOffset + filteredNewMovies.length);
  
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setError(error.message);
      } finally {
        // console.log(">>>>>>comming in finally",loading)
        setLoading(false); // Reset loading state
        setInitialLoading(false); // Mark initial loading as false after first fetch
      }
    };
  
    // Trigger fetching movies when filters are applied or cleared
    useEffect(() => {
      setInitialLoading(true); // Show loader only for initial load
  
      resetMovies(); // Clear movies and reset the offset when filters change
      if (Object.keys(filters).length > 0){
        fetchCalledRef.current = false; // Mark as called
  
      }
    
      // console.log(">>>>>>>>>>",filters)
    }, [filters]);
  
    // Fetch new movies when offset is reset or on initial load
    useEffect(() => {
      // console.log(">>>>>>>", offset, movies.length,fetchCalledRef.current, loading,initialLoading);
  
      if (offset === 0 && movies.length === 0 && !loading && !fetchCalledRef.current) {
  
        fetchMovies();
        fetchCalledRef.current = true; // Mark as called
  
      }
    }, [offset, loading,fetchCalledRef.current]);
  
    // Scroll event listener inside MainContent
  
    const handleScroll = debounce(() => {
      if (contentRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = contentRef.current;
  
        if (scrollTop !== 0 && scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
          fetchMovies(); // Fetch more movies when scrolled near bottom
        }
      }
    }, 200); // Adjust the delay as needed
  
  
    useEffect(() => {
      const refCurrent = contentRef.current;
      if (refCurrent) {
        refCurrent.addEventListener('scroll', handleScroll);
      }
      
      return () => {
        if (refCurrent) {
          refCurrent.removeEventListener('scroll', handleScroll);
        }
      };
    }, [loading]); // Add loading to dependencies if necessary
    
    useEffect(() => {
      setLeftOpen(!isSmallScreen);
    }, [isSmallScreen]);
  


  const left_props = { genres: all_genres, tv_channels: [],jobs:[] };

  return (
    <div>
    <CommonLayout
    contentRef={contentRef}
    leftOpen={leftOpen}
    isSmallScreen={isSmallScreen} 
    setHeaderHeight={setHeaderHeight}
    headerHeight={headerHeight}
      >
      {isSmallScreen && (
          <>
          <Button className="toggle-btn left" onClick={toggleLeftDrawer(!leftOpen)}>
              <ArrowCircleRightIcon />
          </Button>
          
          </>
      )}
     
      {(!isSmallScreen || leftOpen) && <LeftSidebar isOpen={leftOpen} handleFilter={setFilters} filters={filters} handleClear={handleClear} left_props={left_props} headerHeight={headerHeight}  toggleDrawer={toggleLeftDrawer} />}
     
        <>
          {initialLoading ? <Loader /> : <MainContent dramas_movies_persons={movies} type={"movie"} />} {/* Conditionally show loader */}
        </>
    </CommonLayout>
  </div>

  )
}

export default KMovie