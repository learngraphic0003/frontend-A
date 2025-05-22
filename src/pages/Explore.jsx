import React from 'react';
import Navbar from '../components/Navbar';
import { UploadHead } from '../components/smallComponents/Upload';


import ProjectSend from '../components/MainComponents/ProjectSend';
import SearchSection from '../components/SearchSection';

const Explore = () => {
  return (
    <>
      <Navbar />

      <div>
        <SearchSection/>
      </div>

      <div className='my-16 sm:my-3 md:my-4 lg:my-10'>
        <UploadHead />
      </div>

      <ProjectSend/>

    </>
  );
};

export default Explore;
