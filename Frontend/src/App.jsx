import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import FormDashboard from './components/FormDashboard/FormDashboard';
import Setting from './components/settings/Setting';
import Workspace from './components/Workspace/Workspace';



const App = () => {
  return (
    <>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Formdashboard" element={<FormDashboard />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/workspace' element={<Workspace />} />
        </Routes>

    </>
  )
}

export default App;
