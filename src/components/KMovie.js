import React, { useEffect, useState, useRef } from 'react';
import Main from './MainLayout';
import MainContent from './commonComps/MainContent';
import Loader from './commonComps/Loader'; // Import Loader component
import apiClient from '../AxiosIntercepter';
import { debounce } from 'lodash'; // Make sure to install lodash


function KMovie() {
  return (
    <div>KMovie</div>
  )
}

export default KMovie