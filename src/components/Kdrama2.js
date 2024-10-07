import React, { useEffect, useState, useRef } from 'react';
import Main from './MainLayout';
import MainContent from './commonComps/MainContent';
import Loader from './commonComps/Loader'; // Import Loader component
import apiClient from '../AxiosIntercepter';
import { debounce } from 'lodash'; // Make sure to install lodash

function Kdrama2() {
  const [all_genres, SetAllGenres] = useState([]);
  const [all_tv_channels, SetAllTvChannels] = useState([]);
  const [dramas, setDramas] = useState([]); // State to hold the drama list
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [loading, setLoading] = useState(false); // Loading state for infinite scroll
  const [initialLoading, setInitialLoading] = useState(true); // Loading state for the initial fetch or filter
  const limit = 12; // Limit of items per fetch
  const [filters, setFilters] = useState({});
  const contentRef = useRef(null); // Ref for the MainContent
  const fetchCalledRef = useRef(false);

  // Fetch genres and TV channels
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_genres = await apiClient.get('/drama/genres?limit=200');
        const response_tv_channels = await apiClient.get('/drama/tv_channels?limit=500');
        SetAllGenres(response_genres.data.data);
        SetAllTvChannels(response_tv_channels.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClear = () => {
    console.log(">>>> handle clear")
    setFilters({});
    resetDramas(); // Clear current dramas and reset the offset
    fetchCalledRef.current = false; // Mark as called
    
  };

  // Function to reset dramas and offset
  const resetDramas = () => {
    // console.log(">>>step 222")
    setDramas([]); // Clear dramas
    setOffset(0);  // Reset the offset to 0
    
  };

  // Function to fetch dramas based on the current offset
  const fetchDramas = async () => {
    console.log(">>>>>loading",loading)
    if (loading) return; // Prevent fetching if already loading
    setLoading(true); // Set loading to true
    try {
      let filter_condition = '&order_by=airing_dates_start&direction=desc';
      
      if (Object.keys(filters).length > 0) {
        if (filters.start_date) {
          filter_condition += `&start_date=${filters.start_date}&end_date=${filters.end_date}`;
        }
        if (filters.genres && filters.genres.length > 0) {
          filters.genres.forEach((genre) => {
            filter_condition += `&genres=${genre}`;
          });
        }
        if (filters.tv_channels && filters.tv_channels.length > 0) {
          filters.tv_channels.forEach((channel) => {
            filter_condition += `&tv_channels=${channel}`;
          });
        }
      }

      const response = await apiClient.get(`/drama?limit=${limit}&offset=${offset}${filter_condition}`);
      const newDramas = response.data.data;

      // Filter out existing dramas by ID
      const existingDramaIds = new Set(dramas.map((drama) => drama._id));
      const filteredNewDramas = newDramas.filter((drama) => !existingDramaIds.has(drama._id));

      // Update the dramas state with unique entries
      setDramas((prevDramas) => [...prevDramas, ...filteredNewDramas]);

      // Update offset by the number of newly fetched dramas
      setOffset((prevOffset) => prevOffset + filteredNewDramas.length);

    } catch (error) {
      console.error("Error fetching dramas:", error.message);
      setError(error.message);
    } finally {
      // console.log(">>>>>>comming in finally",loading)
      setLoading(false); // Reset loading state
      setInitialLoading(false); // Mark initial loading as false after first fetch
    }
  };

  // Trigger fetching dramas when filters are applied or cleared
  useEffect(() => {
    setInitialLoading(true); // Show loader only for initial load

    resetDramas(); // Clear dramas and reset the offset when filters change
    if (Object.keys(filters).length > 0){
      fetchCalledRef.current = false; // Mark as called

    }
    // else{
    //   fetchDramas()
    // }
    console.log(">>>>>>>>>>",filters)
  }, [filters]);

  // Fetch new dramas when offset is reset or on initial load
  useEffect(() => {
    console.log(">>>>>>>", offset, dramas.length,fetchCalledRef.current, loading,initialLoading);

    if (offset === 0 && dramas.length === 0 && !loading && !fetchCalledRef.current) {

      fetchDramas();
      fetchCalledRef.current = true; // Mark as called

    }
  }, [offset, loading,fetchCalledRef.current]);

  // Scroll event listener inside MainContent

  const handleScroll = debounce(() => {
    if (contentRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = contentRef.current;

      if (scrollTop !== 0 && scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
        fetchDramas(); // Fetch more dramas when scrolled near bottom
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


  const left_props = { genres: all_genres, tv_channels: all_tv_channels };

  return (
    <div>
      <Main
        child={
          <>
            {/* Show loader only for initial loading or when filters are applied */}
            {initialLoading ? <Loader /> : <MainContent dramas={dramas} />} {/* Conditionally show loader */}
          </>
        }
        contentRef={contentRef}  // for scrolling -> kdrama,kmovie, kperson
        setFilters={setFilters} // for 3 all
        handleClear={handleClear} // for 3 all
        filters={filters} // for 2 all
        left_props={left_props} //for 3 all
        isVisible={true} // change if single drama then dont show else list -> show
      />
    </div>
  );
}

export default Kdrama2;
