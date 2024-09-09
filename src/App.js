import logo from './logo.svg';
import './App.css';
import Header from './components/headers/Header';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard/Dashboard'
import MainContent from './components/commonComps/MainContent';

function App() {
  return (
    <div className="App"
   
    >
     {/* <Header/> */}
     {/* <MainLayout child={<MainContent />} isVisible={true} /> */}
     <MainLayout child={<Dashboard />} isVisible={false} />

     {/* <Dashboard/> */}
    </div>
  );
}

export default App;
