import { Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/s"); 
  };

  return (
    <div
      onClick={handleClick}
      className="w-full px-4 py-2 border border-gray-300 shadow-sm rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer flex items-center gap-2"
    >
      <Search className="w-4 h-4 text-gray-500" />
      <span className="text-sm sm:text-base text-gray-500">
        Search for products...
      </span>
    </div>
  );
}
