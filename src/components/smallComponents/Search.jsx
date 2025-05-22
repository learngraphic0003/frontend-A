import React from "react";
import { Search as SearchIcon } from "lucide-react"; // Uses lucide icons

const Search = ({ query, setQuery, placeholder = "Search projects..." }) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md max-w-md w-full">
      <SearchIcon className="w-5 h-5 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm text-gray-800 font-medium placeholder:text-gray-400"
      />
    </div>
  );
};

export default Search;
