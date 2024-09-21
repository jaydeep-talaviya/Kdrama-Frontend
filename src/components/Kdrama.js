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

  // Function to fetch dramas based on the current offset
  const fetchDramas = async () => {
    console.log(">offset", offset, "...limit", limit);
    if (loading) return; // Prevent fetching if already loading
    setLoading(true); // Set loading to true
    try {
      const response = await apiClient.get(`/drama?limit=${limit}&offset=${offset}`); // Fetch using limit and offset
      const newDramas = response.data.data;

      // Create a set of existing drama IDs
      const existingDramaIds = new Set(dramas.map(drama => drama._id)); // Adjust to match your drama's unique ID property

      // Filter out already existing dramas
      const filteredNewDramas = newDramas.filter(drama => !existingDramaIds.has(drama._id));

      // Update the dramas state with the unique entries
      setDramas(prevDramas => {
        const combinedDramas = [...prevDramas, ...filteredNewDramas];
        const uniqueDramas = Array.from(new Set(combinedDramas.map(drama => drama._id))) // Ensure uniqueness by ID
          .map(id => combinedDramas.find(drama => drama._id === id)); // Map back to the drama objects
        return uniqueDramas;
      });

      setOffset(prevOffset => prevOffset + limit); // Increment the offset
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Initial fetch of dramas
  useEffect(() => {
    if (dramas.length === 0) {
      fetchDramas();
    }
  }, [dramas.length]);

  // Scroll event listener inside MainContent
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = contentRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) { // Threshold of 50px from bottom
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
      <Main child={<MainContent dramas={dramas} />} contentRef={contentRef} left_props={left_props} isVisible={true} />
    </div>
  );
}

export default Kdrama;
