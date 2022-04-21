import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

//components
import Header from './Components/Header/Header';
import SiderG from './Components/SiderG/SiderG';


import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Admin from './Containers/Admin/Admin';
import ActionsRecord from './Containers/ActionsRecord/ActionsRecord';
import Alarms from './Containers/Alarms/Alarms';
import Graph from './Containers/Graph/Graph';
import IndustrialPlant from './Containers/IndustrialPlant/IndustrialPlant';
import Map from './Containers/Map/Map';
import Profile from './Containers/Profile/Profile';
import Register from './Containers/Register/Register';



function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <SiderG/>
      <Header/>
      
        <Routes> 

          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* <Route path="/actionsRecord" element={<ActionsRecord />} /> */}
          {/* <Route path="/alarms" element={<Alarms />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/industrialPlant" element={<IndustrialPlant />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
