import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import FormDashboard from './components/FormDashboard/FormDashboard';
import Setting from './components/settings/Setting';
import Workspace from './components/Workspace/Workspace';
import ChatbotForm from './components/ChatBotPage/ChatBot';



const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Formdashboard" element={<FormDashboard />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/workspace/:folderId/:formId' element={<Workspace />} />
          <Route path='/chatbot/:linkId' element={<ChatbotForm/>} />
        </Routes>

    </>
  )
}

export default App;
