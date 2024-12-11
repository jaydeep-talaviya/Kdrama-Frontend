import logo from './logo.svg';
import './App.css';
import Header from './components/headers/Header';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard/Dashboard'
import MainContent from './components/commonComps/MainContent';
import Kdrama from './components/Kdrama';
import KMovie from './components/KMovie';
import CommonLayout from './components/CommonLayout';
import SingleKdrama from './components/SingleKdrama';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleMovie from './components/SingleMovie';
import KPerson from './components/KPerson';
import SinglePerson from './components/SinglePerson';

// import Kdrama2 from './components/Kdrama2';

function App() {
  return (
    <div className="App"
   
    >


<BrowserRouter>
  <Routes>
        {/* Dashboard Route */}
        <Route path="/" element={<Dashboard />} />

        {/* Kdrama Route */}
        <Route path="/kdrama" element={<Kdrama />} />

        {/* KMovie Route */}
        <Route path="/kmovie" element={<KMovie />} />

         {/* KPerson Route */}
         <Route path="/kperson/:person_type" element={<KPerson />} />

        {/* Single Kdrama Route with dynamic ID */}
        <Route path="/kdrama/:drama_id" element={<SingleKdrama />} />
        <Route path="/kmovie/:movie_id" element={<SingleMovie />} />
        <Route path="/kactor/:person_id" element={<SinglePerson />} />

      </Routes>
    </BrowserRouter>

  
    </div>
  );
}

export default App;
