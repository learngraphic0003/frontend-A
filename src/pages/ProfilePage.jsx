import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const [user, setUser] = useState({})
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfileAndProjects = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        // Decode token (simplified - you can also use jwt-decode package)
        const resUser = await axios.get('http://localhost:8000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUser(resUser.data.user)

        const resProjects = await axios.get('http://localhost:8000/api/projects/all')
        const myProjects = resProjects.data.filter(
          p => p.createdBy?._id === resUser.data.user._id
        )
        setProjects(myProjects)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileAndProjects()
  }, [])

  const handleUpdate = id => {
    navigate(`/update-project/${id}`)
  }

  const handleDelete = async id => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`http://localhost:8000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProjects(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) return <p className="p-4">Loading profile...</p>

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-6">
        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={user.avatar || '/avatardemo.jpg'}
            alt="User"
            className="w-20 h-20 rounded-full object-cover"
          />
          <h2 className="text-xl sm:text-2xl font-semibold">{user.email}</h2>
        </div>

        {/* Projects */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white-opacity border rounded-lg shadow text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-600 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Published Date</th>
                <th className="p-3">Views</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-t">
                  <td className="p-3">{project.name}</td>
                  <td className="p-3">{project.status}</td>
                  <td className="p-3">{formatDate(project.createdAt)}</td>
                  <td className="p-3">{project.views || 0}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleUpdate(project._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No projects uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProfilePage
