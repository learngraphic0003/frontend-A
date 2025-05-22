import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import projectData from '../data/project.json';
import { Card } from '../components/smallComponents/Card';

const AllPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Support both `search` and `tags` parameters
  const searchTerm = params.get('search')?.toLowerCase() || params.get('tags')?.toLowerCase() || '';

  // Filter projects based on tags matching searchTerm
  const filteredProjects = projectData.filter(project =>
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );

  return (
    <>
      <Navbar />

      <div className="px-6 mt-6">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Results for: <span className="text-green-400">{searchTerm || 'All'}</span>
        </h2>

        {filteredProjects.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {filteredProjects.map((project, index) => (
              <Card key={index} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No projects found.</p>
        )}
      </div>
    </>
  );
};

export default AllPage;
