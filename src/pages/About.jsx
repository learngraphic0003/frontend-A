import React from "react";
import { motion } from "framer-motion";
import { LightBulbIcon, CurrencyDollarIcon, ArrowDownTrayIcon, UsersIcon } from "@heroicons/react/24/solid";

import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: <LightBulbIcon className="h-8 w-8 text-blue-500" />,
    title: "Explore Ideas",
    description: "Discover innovative solutions and inspiring builds.",
  },
  {
    icon: <CurrencyDollarIcon className="h-8 w-8 text-green-500" />,
    title: "Earn Revenue",
    description: "Monetize your projects by enabling paid downloads.",
  },
  {
    icon: <ArrowDownTrayIcon className="h-8 w-8 text-indigo-500" />,
    title: "Download & Learn",
    description: "Visitors can download full projects to study or build upon.",
  },
  {
    icon: <UsersIcon className="h-8 w-8 text-purple-500" />,
    title: "Community Driven",
    description: "A growing network of passionate makers & developers.",
  },
];

const About = () => {
  return (
    <>
    <Navbar/>
    <div className=" text-white min-h-screen px-4 sm:px-8 lg:px-16 py-12">
      {/* Hero / Intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Build. Share. Inspire.
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
          The hub where passion projects meet global impact. Share your work,
          inspire others, and grow your dev journey.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white-opacity rounded-xl p-6 shadow hover:shadow-xl transition"
          >
            {f.icon}
            <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
            <p className="text-gray-300 mt-2 text-sm">{f.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Vision & Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="mt-20 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">🌍 Our Vision</h2>
        <p className="text-gray-400 text-base mb-8">
          To be the world’s go-to platform where developers turn side-projects
          into inspiration, collaboration, and income.
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">🚀 Our Mission</h2>
        <p className="text-gray-400 text-base">
          Empower every coder, creator, and student to build, share, and earn
          through meaningful projects — helping the world learn, one repo at a
          time.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <h3 className="text-lg sm:text-xl text-gray-300 mb-4">
          Ready to share your next big idea?
        </h3>
        <a
          href="/upload"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium transition"
        >
          Upload Your Project
        </a>
      </motion.div>

      <Footer/>
    </div>
    </>
  );
};

export default About;
