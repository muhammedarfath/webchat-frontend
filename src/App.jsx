import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import AppHome from "./Pages/Home/AppHome";
import ChatHome from "./Pages/exploreSocialMedia/ChatHome";
import { useSelector } from "react-redux";
import { Reels } from "./Pages/exploreSocialMedia/Reels";
import People from "./Pages/exploreSocialMedia/People";
import Profile from "./Pages/exploreSocialMedia/Profile";
import Layout from "./Components/Layout/Layout";
import RegisterEmail from "./Pages/Authentication/RegisterEmail";
import PasswordResetConfirmForm from "./Pages/Authentication/PasswordResetConfirm";
import Tags from "./Pages/exploreSocialMedia/Tags";
import ProfileSettings from "./Components/profile/ProfileSettings";
import Music from "./Pages/exploreSocialMedia/Music";
import News from "./Pages/exploreSocialMedia/ News";
import Otp from "./Pages/Authentication/Otp";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route element={<Layout />}>
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/people" element={<People />} />
            <Route path="/reels/:username" element={<Reels />} />
            <Route path="/music" element={<Music />} />
            <Route path="/tags/:title" element={<Tags />} />
            <Route path="/chathome" element={<ChatHome />} />
            <Route path="/news" element={<News />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp/>} />
          <Route path="/registeremail" element={<RegisterEmail />} />
          <Route
            path="/password-reset-confirm/:user_id"
            element={<PasswordResetConfirmForm />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
