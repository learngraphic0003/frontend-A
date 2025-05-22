import React, { useState } from 'react';

import Navbar from '../components/Navbar';

import UploadForm from '../components/smallComponents/UploadForm';
import { Footer } from '../components/Footer';

const Upload = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br">
      <Navbar />

      {/* Notice */}
      <div className="py-6">
        <div className="max-w-4xl mx-auto bg-lime-100 rounded-lg p-4 text-center shadow">
          <p className="text-lg font-medium text-gray-800">
            It’s okay to upload the photos and videos to enhance the more views.
          </p>
        </div>
      </div>

      {/* Upload Form */}
     <UploadForm/>

     <Footer/>
    </div>
  );
};

export default Upload;
