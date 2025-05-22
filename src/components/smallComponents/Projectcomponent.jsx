import React from 'react';

const Projectcomponent = ({ text, img }) => {
  return (
    <div className="m-4 ml-6 sm:ml-10 flex items-center font-bold poppins-bold space-x-4">
      <h1 className="text-xl sm:text-2xl md:text-4xl leading-none">
        Project with {text}
      </h1>
      <img 
        src={img} 
        alt="project logo" 
        className="h-6 sm:h-8 md:h-10 lg:h-12 object-contain"
      />
    </div>
  );
};

export default Projectcomponent;
