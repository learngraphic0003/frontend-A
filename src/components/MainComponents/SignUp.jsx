import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Footer } from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Server } from '../../constant/constant';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error("All fields are required", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${Server}/api/auth/register`, {
        username,
        email,
        password,
      });

      toast.success("Registration successful! Redirecting to login...", {
        position: "top-center",
      });

      setFormData({ username: '', email: '', password: '' });

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Registration failed';
        toast.error(errorMessage, { position: "top-center" });
      } else if (error.request) {
        toast.error('Network error. Please try again later.', { position: "top-center" });
      } else {
        toast.error('An unexpected error occurred. Please try again.', { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-darkblue flex-wrap relative overflow-hidden">
        {/* Left Image */}
        <div className="p-0 w-96 h-96 mx-4 hidden md:block lg:block animate-fadeInUp scale-x-[-1]">
          <img
            src="robo4.png"
            alt="AI Robot"
            className="h-full w-full object-contain rounded-lg animate-float drop-shadow-xl"
          />
        </div>

        {/* Signup Form */}
        <div className="bg-transparent p-6 rounded-md shadow-md w-96 animate-fadeIn">
          <h2 className="text-2xl mb-6 text-center text-white">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-white">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-black"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-white">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-black"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-white">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-black"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>

            <Link to="/login">
              <span className="mt-4 ml-2 text-white block text-center">
                Already have an account? <span className="text-blue-400 hover:underline">Login</span>
              </span>
            </Link>
          </form>
        </div>

        {/* Right Image */}
        <div className="p-0 w-96 h-96 mx-4 hidden lg:block animate-fadeInUp">
          <img
            src="robo4.png"
            alt="AI Robot"
            className="h-full w-full object-contain rounded-lg animate-float drop-shadow-xl"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
