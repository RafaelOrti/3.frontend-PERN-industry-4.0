import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.scss'

// components
import Header from './Components/Header/Header'
import SiderG from './Components/SiderG/SiderG'

import Login from './Containers/Login/Login'
import Register from './Containers/Register/Register'

import Home from './Containers/Home/Home'
import Profile from './Containers/Profile/Profile'
import Graph from './Containers/Graph/Graph'
import Alarms from './Containers/Alarms/Alarms'
import ActionsRecord from './Containers/ActionsRecord/ActionsRecord'

import Installation from './Containers/Installation/Installation'
import InstallationAV from './Containers/InstallationAV/InstallationAV'

import AdminClient from './Containers/AdminClient/AdminClient'
import AdminClientCreate from './Containers/AdminClientCreate/AdminClientCreate'
import AdminClientUpdate from './Containers/AdminClientUpdate/AdminClientUpdate'
import AdminClientDelete from './Containers/AdminClientDelete/AdminClientDelete'

import Maintenance from './Containers/Maintenance/Maintenance'

import Admin from './Containers/Admin/Admin'

import IndustrialPlant from './Containers/IndustrialPlant/IndustrialPlant'
import Map from './Containers/Map/Map'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <SiderG />
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <Login />
      }
          /> <Route
            path='/register'
            element={
              <Register />
      }
             />

          <Route
            path='/home'
            element={
              <Home />
      }
          /> <Route
            path='/profile'
            element={
              <Profile />
      }
             /> <Route
               path='/clientAdmin'
               element={
                 <AdminClient />
      }
                /> <Route
                  path='/clientAdminCreate'
                  element={
                    <AdminClientCreate />
      }
                   /> <Route
                     path='/clientAdminUpdate'
                     element={
                       <AdminClientUpdate />
      }
                      /> <Route
                        path='/clientAdminDelete'
                        element={
                          <AdminClientDelete />
      }
                         /> <Route
                           path='/admin'
                           element={
                             <Admin />
      }
                            />

          <Route
            path='/graph'
            element={
              <Graph />
      }
          /> <Route
            path='/alarms'
            element={
              <Alarms />
      }
             /> {
      /* <Route path="/actionsRecord" element={<ActionsRecord />} /> */
    }

          <Route
            path='/installation'
            element={
              <Installation />
  }
          /> <Route
            path='/installationAV'
            element={
              <InstallationAV />
  }
             />

          {
    /* <Route path="/maintenance" element={<Maintenance />} /> */
  }

          {
    /* <Route path="/industrialPlant" element={<IndustrialPlant />} />
              <Route path="/map" element={<Map />} /> */
  }

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
