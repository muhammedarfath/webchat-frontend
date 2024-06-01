
import Login from './Pages/Authentication/Login';
import Signup from './Pages/Authentication/Signup';
import AppHome from './Pages/Home/AppHome';
import Home from './Pages/Home/Home';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Reels } from './Pages/Reels/Reels';

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={AppHome} path='/apphome'/>
        <Route Component={Reels} path='/'/>
        <Route Component={Home} path='/chathome'/>
        <Route Component={Login} path='/login'/>
        <Route Component={Signup} path='/signup'/>
      </Routes>
    </Router>

  );
}

export default App;
