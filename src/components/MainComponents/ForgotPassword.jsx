import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Server } from '../../constant/constant';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${Server}/api/auth/forgot-password`, { email });

      toast.success('Password reset email sent. Please check your inbox.', {
        position: 'top-center',
      });
      setEmail('');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send reset email.';
      toast.error(message, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkblue px-4">
      <div className="bg-transparent p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <label className="block mb-2 text-white">Enter your email</label>
          <input
            type="email"
            className="w-full border p-3 rounded mb-4 text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your registered email"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-white hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
