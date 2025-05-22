import React from "react";
import { motion } from "framer-motion";
import headerImg from "../assets/header_img.png";
import Arrowleft from "../assets/Arrowleft.png";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-darkblue py-12 px-6 md:px-16 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section with Animation */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
            Continue to grow with your support
          </h1>

          <motion.div
            className="flex items-center justify-center md:justify-start gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-lg text-gray-300">The magic begins here</p>
            <Link to="/explore">
              <img
                src={Arrowleft}
                alt="Arrow"
                className="w-8 h-8 object-contain cursor-pointer"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section with Animation */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src={headerImg}
            alt="Header"
            className="w-[300px] sm:w-[400px] md:w-[450px] mx-auto h-auto rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
