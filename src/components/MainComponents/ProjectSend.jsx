import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectViewSection from "./ProjectViewSection";
import projectData from "../../data/project.json";

const categories = [
  { text: "C", txtimg: "C logo.svg" },
  { text: "C++", txtimg: "C++logo.svg" },
  { text: "Java", txtimg: "Javal.svg" },
  { text: "Python", txtimg: "Python.svg" },
  { text: "React", txtimg: "web.svg" }
];

const ProjectSend = () => {
  const navigate = useNavigate();

  const handleMoreClick = (category) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
      const params = new URLSearchParams({
        category,
        tags: category
      });
      navigate(`/allPage?${params.toString()}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col gap-16 px-4 md:px-8 lg:px-16">
      {categories.map(({ text, txtimg }, index) => {
        const hasProjects = projectData.some(project =>
          project.tags.map(tag => tag.toLowerCase()).includes(text.toLowerCase())
        );

        return hasProjects ? (
          <div key={index} className="w-full">
            <ProjectViewSection text={text} txtimg={txtimg} />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleMoreClick(text)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              >
                More
              </button>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default ProjectSend;
