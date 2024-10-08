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

        {/* Single Kdrama Route with dynamic ID */}
        <Route path="/kdrama/:drama_id" element={<SingleKdrama />} />
      </Routes>
    </BrowserRouter>

  
    </div>
  );
}

export default App;
