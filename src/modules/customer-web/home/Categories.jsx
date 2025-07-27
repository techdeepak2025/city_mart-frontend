import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import DotsLoader from "../../../ui/loader/DotsLoader"; // optional, use your own loader

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // renamed

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sorted);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="p-2 sm:p-4">
      {isLoading ? (
        <div className="flex justify-center items-center py-10 text-sm text-gray-500">
          <span className="mr-2">Loading categories</span>
          <DotsLoader />
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/${cat.slug}`}
              className="flex flex-col items-center hover:bg-sky-50 h-18 gap-1 rounded-md hover:scale-105 hover:shadow transition"
            >
              <img
                src={cat.image?.url}
                alt={cat.name}
                className="w-full h-[50px] object-contain"
              />
              <span className="text-[12px] text-gray-700 font-medium text-center truncate w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
