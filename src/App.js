import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Precautions from './pages/Precautions';
import Conditions from './pages/Conditions';
import Treatment from './pages/Treatment';
import Awareness from './pages/Awareness';
import Teleconsultation from './pages/Teleconsultation';
import Report from './pages/Report';
import Meeting from './pages/Meeting';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tele" element={<Teleconsultation/>}></Route>
        <Route path="/meeting/:roomName" element={<Meeting />} />
        <Route path="/precautions" element={<Precautions />} />
        <Route path="/report" element={<Report/>}></Route>
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/treatment" element={<Treatment />} />
        <Route path="/awareness" element={<Awareness />} />
      </Routes>
    </Router>
  );
}

export default App;
