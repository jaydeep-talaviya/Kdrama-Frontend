import React, { useEffect, useState, useRef } from 'react';
import Main from './MainLayout';
import MainContent from './commonComps/MainContent';
import apiClient from '../AxiosIntercepter';

function Kdrama() {
  const [all_genres, SetAllGenres] = useState([]);
  const [all_tv_channels, SetAllTvChannels] = useState([]);
  const [dramas, setDramas] = useState([]); // State to hold the drama list
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const limit = 12; // Limit of items per fetch
  const [filters, setFilters] = useState({});
  const contentRef = useRef(); // Ref for the MainContent

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
    setFilters({});
    resetDramas(); // Clear current dramas and reset the offset
  };

  // Function to reset dramas and offset
  const resetDramas = () => {
    setDramas([]); // Clear dramas
    setOffset(0);  // Reset the offset to 0
  };

  // Function to fetch dramas based on the current offset
  const fetchDramas = async () => {
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

      console.log("Fetching:", `/drama?limit=${limit}&offset=${offset}${filter_condition}`);
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
      setLoading(false); // Reset loading state
    }
  };

  // Trigger fetching dramas when filters are applied or cleared
  useEffect(() => {
    resetDramas(); // Clear dramas and reset the offset when filters change
  }, [filters]);

  // Fetch new dramas when offset is reset
  useEffect(() => {
    if (offset === 0 && dramas.length === 0) {
      fetchDramas(); // Fetch new dramas after resetting the offset
    }
  }, [offset, dramas]);

  // Scroll event listener inside MainContent
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = contentRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
          fetchDramas(); // Fetch more dramas when scrolled near bottom
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll); // Cleanup listener on unmount
      }
    };
  }, [loading]);

  const left_props = { genres: all_genres, tv_channels: all_tv_channels };

  return (
    <div>
      <Main child={<MainContent dramas={dramas} />} contentRef={contentRef} setFilters={setFilters} handleClear={handleClear} filters={filters} left_props={left_props} isVisible={true} />
    </div>
  );
}

export default Kdrama;
