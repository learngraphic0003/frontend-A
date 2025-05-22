import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './components/MainComponents/Login';
import Signup from './components/MainComponents/SignUp';
import Explore from './pages/Explore';
import Upload from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import ViewProject from './pages/ViewProject';
import AboutPage from './pages/About';
import Contact from './pages/Contact';
import AdminPage from './pages/Admin';
import AllPage from './pages/AllPage';
import UploadForm from './components/smallComponents/UploadForm';
import ForgotPassword from './components/MainComponents/ForgotPassword';
import ResetPassword from './components/MainComponents/ResetPassword';
import UpdateProject from './pages/UpdateProject';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/uploadform" element={<UploadForm />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/update-project/:id" element={<UpdateProject />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/viewproject/:projectname" element={<ViewProject />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/allPage" element={<AllPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </>
  );
};

export default App;
