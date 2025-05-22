import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./smallComponents/Search";
import { Card } from "./smallComponents/Card";
import projectsData from "../data/project.json";
import { Server } from "../constant/constant";

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [backendProjects, setBackendProjects] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${Server}/api/projects/all`);

        const formatted = response.data.map((p) => ({
          _id: p._id, // ✅ REQUIRED for routing to project detail
          projectimage: p.image || "/fallback.jpg",
          projectname: p.name || "Untitled",
          username: p.createdBy?.email || "Unknown",
          status: p.status?.toLowerCase() || "pending",
          description: p.description || "",
          tags: p.tags || [],
        }));

        setBackendProjects(formatted);
      } catch (error) {
        console.error("Error fetching backend projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Combine backend + static projects
  const allProjects = [...projectsData, ...backendProjects];

  // Filter projects by name, username, or tags
  const filteredProjects = allProjects
    .filter((project) =>
      [project.projectname, project.username, ...(project.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .slice(0, 12); // Limit to 12 cards

  return (
    <div className="p-6 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 flex justify-start">
          <img
            src="Mark.svg"
            alt="Search Visual"
            className="max-w-[220px] max-h-[90px] w-auto h-auto rounded-2xl transform transition duration-500 ease-in-out hover:rotate-[360deg] hover:scale-90"
          />
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Search query={query} setQuery={setQuery} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <Card key={index} project={project} />
          ))
        ) : (
          <p className="text-white text-lg font-medium">No matching projects found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
