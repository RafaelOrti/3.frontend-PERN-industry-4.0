import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

//components
import Header from './Components/Header/Header';
import SiderG from './Components/SiderG/SiderG';


import Login from './Containers/Login.0/Login';
import Register from './Containers/Register.0/Register';

import Home from './Containers/Home.1/Home';
import Alarms from './Containers/Alarms.1/Alarms';
import Graph from './Containers/Graph.1/Graph';
import ActionsRecord from './Containers/ActionsRecord.1/ActionsRecord';
import Profile from './Containers/Profile.1/Profile';

import Admin from './Containers/Admin.5/Admin';
import AdminClient from './Containers/AdminClient.3/AdminClient';





import IndustrialPlant from './Containers/IndustrialPlant/IndustrialPlant';
import Map from './Containers/Map/Map';


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

          
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminClient" element={<AdminClient />} />
          <Route path="/actionsRecord" element={<ActionsRecord />} />

          <Route path="/graph" element={<Graph />} />
          <Route path="/alarms" element={<Alarms />} />
          
          <Route path="/industrialPlant" element={<IndustrialPlant />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
