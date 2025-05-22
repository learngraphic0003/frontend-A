import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'


import { UploadHead } from '../components/smallComponents/Upload'
import Nextheader from '../assets/projectimg/Next header.svg'

import SearchSection from '../components/SearchSection'
import { Footer } from '../components/Footer'
import ProgressBar from '../components/smallComponents/ProgressBar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="flex justify-center mt-8"> 
        <UploadHead />
      </div>

      <SearchSection/>

      <ProgressBar/>

      <img src={Nextheader} alt="" />


      <Footer/>
    </div>
  )
}

export default Home
