import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

//components
import Header from './Components/Header/Header';
import SiderG from './Components/SiderG/SiderG';


import Login from './Containers/0.Login/Login';
import Register from './Containers/0.Register/Register';

import Home from './Containers/1.Home/Home';
import Profile from './Containers/1.Profile/Profile';
import Graph from './Containers/1.Graph/Graph';
import Alarms from './Containers/1.Alarms/Alarms';
import ActionsRecord from './Containers/1.ActionsRecord/ActionsRecord';

import Installation from './Containers/2.Installation/Installation';

import AdminClient from './Containers/3.AdminClient/AdminClient';

import Maintenance from './Containers/4.Maintenance/Maintenance';

import Admin from './Containers/5.Admin/Admin';

import IndustrialPlant from './Containers/6.IndustrialPlant/IndustrialPlant';
import Map from './Containers/6.Map/Map';




function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <SiderG/>
      <Header/>
      
        <Routes> 

          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/graph" element={<Graph />} />
          <Route path="/alarms" element={<Alarms />} />
          <Route path="/actionsRecord" element={<ActionsRecord />} />

          <Route path="/installation" element={<Installation />} />

          <Route path="/clientAdmin" element={<AdminClient />} />

          <Route path="/maintennace" element={<Maintenance />} />

          
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/industrialPlant" element={<IndustrialPlant />} />
          <Route path="/map" element={<Map />} /> */}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
