import React from 'react';
import Projectcomponent from '../smallComponents/Projectcomponent';
import { Card } from '../smallComponents/Card';
import projectData from '../../data/project.json';

const ProjectViewSection = ({text,txtimg}) => {
  const filterText = text;

  // Filter and limit to 8
  const filteredProjects = projectData
  .filter(project => 
    project.tags.map(tag => tag.toLowerCase()).includes(filterText.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12">

      {/* Section Heading */}
      <div className="mb-6">
        <Projectcomponent text={filterText} img={txtimg} />
      </div>

      {/* Responsive Grid for Cards */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
        {filteredProjects.map((project, index) => (
          <Card key={index} project={project} />
        ))}
      </div>


    </div>
  );
};


export default ProjectViewSection;
