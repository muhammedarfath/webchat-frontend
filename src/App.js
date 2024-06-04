import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Authentication/Login';
import Signup from './Pages/Authentication/Signup';
import AppHome from './Pages/Home/AppHome';
import Home from './Pages/Home/Home';
import { useSelector } from 'react-redux';
import {Reels} from './Pages/Reels/Reels'
import People from './Pages/explore/People';
import Profile from './Pages/Profile/Profile';








function App() {
  const { email } = useSelector(state => state.auth);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppHome />} />
        <Route path="/profile/:username" element={<Profile/>} />
        <Route path='/people' element={<People/>} />
        <Route path='/reels' element={<Reels/>} />
        <Route
          path='/chathome'
          element={email ? <Home /> : <Navigate to="/login" />}
        />  
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
