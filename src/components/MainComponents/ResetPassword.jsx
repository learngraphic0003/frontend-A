import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Server } from '../../constant/constant';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the token from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');  // Get the token from the query string

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${Server}/api/auth/reset-password`, {
        token,
        newPassword: password, // ✅ FIXED key name
      });

      toast.success('Password reset successfully. You can now log in.', {
        position: 'top-center',
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const message = err.response?.data?.message || 'Reset failed. Please try again.';
      toast.error(message, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-transparent p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Reset Password</h2>
        <form onSubmit={handleReset}>
          <label className="block mb-2 text-white">New Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded mb-4 text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />

          <label className="block mb-2 text-white">Confirm Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded mb-4 text-gray-800"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
