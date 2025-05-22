import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const dummyData = [
  { id: 1, name: "John Doe", project: "Chat App", status: "Published" },
  { id: 2, name: "Alice Smith", project: "E-commerce", status: "Draft" },
  { id: 3, name: "Bob Johnson", project: "Portfolio", status: "Published" },
];

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(dummyData);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this entry?");
    if (confirmed) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto  rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">
          Admin Panel
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-6 px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className=" text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Project</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.project}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPage;
