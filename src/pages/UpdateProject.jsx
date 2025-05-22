import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'

const UpdateProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    status: '',
    category: '',
    tags: '',
    description: '',
  })

  const [newImage, setNewImage] = useState(null)
  const [newVideo, setNewVideo] = useState(null)
  const [newFile, setNewFile] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:8000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const { name, status, category, tags, description } = res.data

      setFormData({
        name,
        status,
        category,
        tags: tags.join(','),
        description,
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching project')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const data = new FormData()
      data.append('name', formData.name)
      data.append('status', formData.status)
      data.append('category', formData.category)
      data.append('tags', formData.tags)
      data.append('description', formData.description)
      if (newImage) data.append('image', newImage)
      if (newVideo) data.append('video', newVideo)
      if (newFile) data.append('file', newFile)

      await axios.put(`http://localhost:8000/api/projects/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess('Project updated successfully')
      setTimeout(() => {
        navigate('/profile')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white-opacity p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Update Your Project
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading project...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
              {['name', 'category', 'tags', 'description'].map((field) => (
                <div key={field}>
                  <label className="block mb-1 font-medium text-white capitalize">{field}</label>
                  {field === 'description' ? (
                    <textarea
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border bg-darkblue text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border bg-darkblue text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}

              {/* Status Dropdown */}
              <div>
                <label className="block mb-1 font-medium text-white">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-darkblue text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              {/* Upload New Image */}
              <div>
                <label className="block mb-1 font-medium text-white">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="w-full bg-darkblue text-white p-3 rounded-lg"
                />
              </div>

              {/* Upload New Video */}
              <div>
                <label className="block mb-1 font-medium text-white">Upload Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setNewVideo(e.target.files[0])}
                  className="w-full bg-darkblue text-white p-3 rounded-lg"
                />
              </div>

              {/* Upload New File */}
              <div>
                <label className="block mb-1 font-medium text-white">Upload File</label>
                <input
                  type="file"
                  accept=".zip,.pdf,.doc,.docx"
                  onChange={(e) => setNewFile(e.target.files[0])}
                  className="w-full bg-darkblue text-white p-3 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-medium"
              >
                Save Changes
              </button>

              {error && <p className="text-red-600 font-medium text-center">{error}</p>}
              {success && <p className="text-green-600 font-medium text-center">{success}</p>}
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UpdateProject
