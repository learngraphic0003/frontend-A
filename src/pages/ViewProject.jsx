// ViewProject.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import projectData from '../data/project.json';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';

const avatarImages = [
  '/avatar/avatar1.jpg',
  '/avatar/avatar2.jpg',
  '/avatar/avatar3.jpg',
  '/avatar/avatar4.jpg',
  '/avatar/avatar5.jpg',
];

const ViewProject = () => {
  const { projectname } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projects/all', {
          withCredentials: true,
        });
        const backendProjects = response.data.map((p) => ({
          projectimage: p.image || '/fallback.jpg',
          projectname: p.name,
          username: p.createdBy?.email || 'Unknown',
          status: p.status?.toLowerCase() || 'pending',
          description: p.description || '',
          tags: p.tags || [],
          video: p.video || '',
          file: { url: p.file },
          userimage: p.createdBy?.avatar || '',
        }));

        const backendProject = backendProjects.find(
          (p) => p.projectname === projectname
        );

        if (backendProject) {
          setProject(backendProject);
          return;
        }
      } catch (err) {
        console.error('Error fetching from backend:', err);
      }

      const staticProject = projectData.find((p) => p.projectname === projectname);
      setProject(staticProject || null);
    };

    fetchData();
  }, [projectname]);

  if (!project) {
    return <div className="text-center mt-10 text-xl text-white">Project not found or loading...</div>;
  }

  const {
    projectimage,
    projectname: name,
    username,
    status,
    description,
    tags = [],
    userimage,
    file,
    video,
  } = project;

  const avatarImage = userimage || avatarImages[Math.floor(Math.random() * avatarImages.length)];

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-12 space-y-10 max-w-screen-xl mx-auto text-white">
        <div className="flex flex-col lg:flex-row gap-6 border p-8 rounded-xl shadow-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800">
          <div className="flex-shrink-0">
            <img
              src={avatarImage}
              alt={username}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-extrabold">{username}</h2>
            <p><strong>Project:</strong> {name}</p>
            <p><strong>Status:</strong>{' '}
              <span className={status === 'complete' ? 'text-green-400' : 'text-yellow-400'}>
                {status}
              </span>
            </p>
            <p><strong>Description:</strong> {description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-green-600 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* File Download Only */}
            {file?.url && (
              <div className="mt-6 space-y-2">
                <h3 className="text-xl font-semibold">Attached File:</h3>
                <a
                  href={file.url}
                  download
                  className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
                >
                  Download File
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Image and Video Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 rounded-xl shadow-xl p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {projectimage ? (
                <img
                  src={projectimage}
                  alt="Project Screenshot"
                  className="w-full h-[350px] object-cover rounded-xl"
                />
              ) : (
                <div className="text-center text-gray-300">No project image available</div>
              )}
            </div>
            <div className="flex-1">
              {video ? (
                <video
                  controls
                  className="w-full h-[350px] object-cover rounded-xl"
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-center text-gray-300">No video available</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewProject;
