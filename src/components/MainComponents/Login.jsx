import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Footer } from "../Footer";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Server } from '../../constant/constant';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  // Random avatar fallback
  const getRandomAvatar = () => {
    const avatars = ['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar4.jpg', 'avatar5.jpg'];
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return `/avatar/${avatars[randomIndex]}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Both fields are required');
      return;
    }

    try {
      const response = await axios.post(`${Server}/api/auth/login`, {
        email,
        password,
      }, { withCredentials: true });

      const { token, user } = response.data;
      const profileImage = user.avatar && user.avatar !== "" ? user.avatar : getRandomAvatar();

      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('profileImage', profileImage);
      localStorage.setItem('isAuthenticated', 'true');

      toast.success(`Welcome, ${user.username}!`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
      });

      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Invalid credentials');
      } else if (error.request) {
        toast.error('Network error. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-darkblue px-4 py-12 md:py-0 gap-10">
        <div className="bg-transparent p-6 rounded-md shadow-md w-full max-w-md animate-fadeIn">
          <h2 className="text-2xl mb-6 text-center text-white font-semibold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-white">Email</label>
              <input
                type="text"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md text-black"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-white">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-md text-black"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right text-sm mb-4">
              <Link to="/forgot-password" className="text-blue-400 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md mb-4 hover:bg-blue-700 transition-all duration-300"
            >
              Login
            </button>

            <Link to='/signup'>
              <p className='text-center text-white'>
                Don't have an account? <span className='text-green-400 hover:underline'>Sign up</span>
              </p>
            </Link>
          </form>
        </div>

        <div className="w-full max-w-sm md:block hidden animate-fadeInUp">
          <img
            src="robo2.png"
            alt="AI Robot"
            className="w-full rounded-lg animate-float drop-shadow-xl"
          />
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default Login;
