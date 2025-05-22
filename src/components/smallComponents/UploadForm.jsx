import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../index.css";
import { UploadCloud } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Server } from '../../constant/constant';
import Navbar from '../../components/Navbar'
import { Footer } from '../Footer';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    category: '',
    tags: [],
    tagInput: '',
    image: null,
    video: null,
    file: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/login', { state: { from: '/upload' } });
    }
  }, [navigate]);

  const handleAddTag = () => {
    const trimmed = formData.tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmed], tagInput: '' }));
      toast.success('Tag added');
    } else if (formData.tags.includes(trimmed)) {
      toast.warning('Tag already exists!');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    toast.info('Tag removed');
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === 'image' && file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB');
      return;
    }

    if (name === 'video' && file.size > 100 * 1024 * 1024) {
      toast.error('Video must be less than 100MB');
      return;
    }

    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('status', formData.status);
    form.append('category', formData.category);
    form.append('tags', formData.tags.join(','));
    form.append('description', formData.description);
    if (formData.image) form.append('image', formData.image);
    if (formData.video) form.append('video', formData.video);
    if (formData.file) form.append('file', formData.file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${Server}/api/projects/upload`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('✅ Project uploaded successfully!');

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong!';
      toast.error(`❌ Upload failed: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='m-6 sm:m-4 '>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-[92%] sm:w-[80%] lg:w-[55%] mx-auto bg-white-opacity rounded-2xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-center text-white-700 mb-6">Upload Your Project</h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" className="form-input" required />

          <select name="status" value={formData.status} onChange={handleChange} className="form-input" required>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select>

          <select name="category" value={formData.category} onChange={handleChange} className="form-input" required>
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Other">Other</option>
          </select>

          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" className="form-input h-28 resize-none" required />

          <div className="flex flex-wrap gap-6 mt-4 justify-center">
            <label className="upload-card relative">
              <UploadCloud size={34} className="text-indigo-500" />
              <p className="text-sm mt-2">Upload Image</p>
              <input type="file" name="image" accept="image/*" hidden onChange={handleFileChange} />
              {formData.image && <span className="uploaded-label">✅ Uploaded</span>}
            </label>

            <label className="upload-card relative">
              <UploadCloud size={34} className="text-indigo-500" />
              <p className="text-sm mt-2">Upload Video</p>
              <input type="file" name="video" accept="video/*" hidden onChange={handleFileChange} />
              {formData.video && <span className="uploaded-label">✅ Uploaded</span>}
            </label>

            <label className="upload-card relative">
              <UploadCloud size={34} className="text-indigo-500" />
              <p className="text-sm mt-2">Upload File</p>
              <input type="file" name="file" accept=".zip,.pdf,.doc,.docx" hidden required onChange={handleFileChange} />
              {formData.file && <span className="uploaded-label">✅ Uploaded</span>}
            </label>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <input type="text" value={formData.tagInput} onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))} placeholder="Enter tag" className="form-input flex-grow" />
              <button type="button" onClick={handleAddTag} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tags.map((tag, i) => (
                <span key={i} onClick={() => removeTag(tag)} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-indigo-200">
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 text-center">
            <button type="submit" disabled={isLoading} className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
              {isLoading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default UploadForm;
