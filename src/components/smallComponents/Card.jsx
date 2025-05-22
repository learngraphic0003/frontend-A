// import React from "react";
// import { useNavigate } from "react-router-dom";

// export const Card = ({ project }) => {
//   const navigate = useNavigate();

//   if (!project) return null;

//   const {
//     projectimage,
//     projectname,
//     username,
//     status,
//     description,
//     tags = [],
//   } = project;

//   // Handle protected navigation
//   const handleClick = (e) => {
//     e.preventDefault();

//     const isAuthenticated = localStorage.getItem("isAuthenticated");

//     if (isAuthenticated === "true") {
//       navigate(`/viewproject/${projectname}`);
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="cursor-pointer no-underline"
//     >
//       <div className="w-full max-w-[340px] bg-[#191b58] rounded-[30px] overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
//         {/* Project Image */}
//         <div className="w-full h-[150px]">
//           <img
//             src={projectimage}
//             alt={projectname}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Card Content */}
//         <div className="p-4 space-y-2 text-white font-jetbrains">
//           <div className="text-lg font-extrabold flex justify-between">
//             <span>Project Name:</span>
//             <span className="text-right">{projectname}</span>
//           </div>

//           <div className="text-md font-extrabold flex justify-between items-center">
//             <span>Owner:</span>
//             <div className="flex items-center gap-2">
//               <span className="text-right">{username}</span>
//             </div>
//           </div>

//           <div className="text-md font-extrabold flex justify-between">
//             <span>Status:</span>
//             <span
//               className={
//                 status === "complete"
//                   ? "text-green-400"
//                   : "text-yellow-400"
//               }
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </span>
//           </div>

//           <div className="text-sm font-extrabold">
//             <span>Description:</span>
//             <p className="mt-1 text-white text-opacity-80 leading-snug line-clamp-3">
//               {description}
//             </p>
//           </div>

//           <div className="mt-2 flex flex-wrap gap-2">
//             {tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="bg-white bg-opacity-10 text-white text-xs px-2 py-1 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useNavigate } from "react-router-dom";

export const Card = ({ project }) => {
  const navigate = useNavigate();

  if (!project) return null;

  const {
    projectimage,
    projectname,
    username,
    status,
    description,
    tags = [],
  } = project;

  const handleClick = (e) => {
    e.preventDefault();
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
      navigate(`/viewproject/${projectname}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer no-underline">
      <div className="w-full max-w-[340px] bg-[#191b58] rounded-[30px] overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
        <div className="w-full h-[150px]">
          <img
            src={projectimage}
            alt={projectname}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 space-y-2 text-white font-jetbrains">
          <div className="text-lg font-extrabold flex justify-between">
            <span>Project Name:</span>
            <span className="text-right">{projectname}</span>
          </div>

          <div className="text-md font-extrabold flex justify-between items-center">
            <span>Owner:</span>
            <span className="text-right">{username}</span>
          </div>

          <div className="text-md font-extrabold flex justify-between">
            <span>Status:</span>
            <span
              className={
                status === "complete"
                  ? "text-green-400"
                  : "text-yellow-400"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          <div className="text-sm font-extrabold">
            <span>Description:</span>
            <p className="mt-1 text-white text-opacity-80 leading-snug line-clamp-3">
              {description}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white bg-opacity-10 text-white text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
