import logo from './logo.svg';
import './App.css';
import Header from './components/headers/Header';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard/Dashboard'
import MainContent from './components/commonComps/MainContent';
import Kdrama from './components/Kdrama';

function App() {
  return (
    <div className="App"
   
    >
     {/* <Header/> */}
     {/* <MainLayout child={<MainContent />} isVisible={true} /> */}
     {/* <MainLayout child={<Dashboard />} isVisible={false} /> */}

     {/* <Dashboard/> */}
     <Kdrama/>
    </div>
  );
}

export default App;
