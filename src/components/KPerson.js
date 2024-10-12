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
import { useParams } from 'react-router-dom';


function KPerson() {
  const { person_type } = useParams();

  const [all_jobs, SetAllJobs] = useState([]);
  const [persons, setPersons] = useState([]); // State to hold the person list
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [loading, setLoading] = useState(false); // Loading state for infinite scroll
  const [initialLoading, setInitialLoading] = useState(true); // Loading state for the initial fetch or filter
  const limit = 12; // Limit of items per fetch
  const [filters, setFilters] = useState({});
  const contentRef = useRef(null); // Ref for the MainContent
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
    resetPersons(); // Clear current persons and reset the offset
    fetchCalledRef.current = false; // Mark as called
    
  };

  // Fetch genres
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_jobs = await apiClient.get('/movie/jobs');
        SetAllJobs(response_jobs.data.data[0].jobs);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

   // Function to reset persons and offset
   const resetPersons = () => {
    // console.log(">>>step 222")
    setPersons([]); // Clear persons
    setOffset(0);  // Reset the offset to 0
    
  };

  // Function to fetch persons based on the current offset
  const fetchPersons = async () => {
    // console.log(">>>>>loading",loading)
    if (loading) return; // Prevent fetching if already loading
    setLoading(true); // Set loading to true
    try {
      let filter_condition = '&order_by=birth_of_date&direction=desc';
      
      if (person_type == 'actor'){
            filter_condition += `&gender=Male`;
        }
      if (person_type == 'actress'){
          filter_condition += `&gender=Female`;
      }
      if (filters.jobs && filters.jobs.length > 0) {
        filters.jobs.forEach((job) => {
          filter_condition += `&jobs=${job}`;
        });
      }
      if (Object.keys(filters).length > 0) {
        if (filters.start_date) {
          filter_condition += `&start_date=${filters.start_date.replaceAll("-","/")}&end_date=${filters.end_date.replaceAll("-","/")}`;
        }
        
        
      }

      const response = await apiClient.get(`/person?limit=${limit}&offset=${offset}${filter_condition}`);
      const newPersons = response.data.data;

      // Filter out existing persons by ID
      const existingPersonIds = new Set(persons.map((person) => person._id));
      const filteredNewPersons = newPersons.filter((person) => !existingPersonIds.has(person._id));
      // Update the persons state with unique entries
      setPersons((prevPersons) => [...prevPersons, ...filteredNewPersons]);

      // Update offset by the number of newly fetched persons
      setOffset((prevOffset) => prevOffset + filteredNewPersons.length);

    } catch (error) {
      console.error("Error fetching persons:", error.message);
      setError(error.message);
    } finally {
      // console.log(">>>>>>comming in finally",loading)
      setLoading(false); // Reset loading state
      setInitialLoading(false); // Mark initial loading as false after first fetch
    }
  };

  // Trigger fetching persons when filters are applied or cleared
  useEffect(() => {
    setInitialLoading(true); // Show loader only for initial load

    resetPersons(); // Clear persons and reset the offset when filters change
    if (Object.keys(filters).length > 0){
      fetchCalledRef.current = false; // Mark as called

    }
  
    // console.log(">>>>>>>>>>",filters)
  }, [filters]);

   // Fetch new persons when offset is reset or on initial load
   useEffect(() => {
    // console.log(">>>>>>>", offset, persons.length,fetchCalledRef.current, loading,initialLoading);

    if (offset === 0 && persons.length === 0 && !loading && !fetchCalledRef.current) {

      fetchPersons();
      fetchCalledRef.current = true; // Mark as called

    }
  }, [offset, loading,fetchCalledRef.current]);

  // Scroll event listener inside MainContent

  const handleScroll = debounce(() => {
    if (contentRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = contentRef.current;

      if (scrollTop !== 0 && scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
        fetchPersons(); // Fetch more persons when scrolled near bottom
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


  const left_props = { genres: [], tv_channels: [],jobs:all_jobs.filter((x)=>x !== (person_type=='actor'?"Actress":'Actor')).sort() };

  console.log(">>>>>person_type",person_type)
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
          {initialLoading ? <Loader /> : <MainContent dramas_movies_persons={persons} type={"person"} />} {/* Conditionally show loader */}
        </>
    </CommonLayout>
  </div>

  )
}

export default KPerson