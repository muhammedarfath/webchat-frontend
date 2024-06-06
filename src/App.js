import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import AppHome from "./Pages/Home/AppHome";
import ChatHome from "./Pages/exploreSocialMedia/ChatHome";
import { useSelector } from "react-redux";
import { Reels } from "./Pages/exploreSocialMedia/Reels";
import People from "./Pages/exploreSocialMedia/People";
import Profile from "./Pages/exploreSocialMedia/Profile";
import Layout from "./Components/Layout/Layout";

function App() {
  const { email } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route element={<Layout />}>
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/people" element={<People />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/chathome" element={<ChatHome />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
