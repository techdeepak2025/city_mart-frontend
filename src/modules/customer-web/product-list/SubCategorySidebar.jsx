import React from "react";

export default function SubCategorySidebar({
  subcategories,
  selectedSubcategorySlug,
  onSelect,
}) {
  return (
    <aside className="w-full md:w-[80px] overflow-x-auto md:overflow-y-auto md:sticky top-20 bg-gray-50 p-2 rounded shadow-sm scrollbar-thin">
      <div className="flex md:flex-col gap-2">
        {subcategories.map((sub) => (
          <button
            key={sub._id}
            onClick={() => onSelect(sub.slug)}
            className="flex flex-col items-center text-left rounded min-w-[60px]"
          >
            <img
              src={sub.image?.url || "/default-subcategory.png"}
              alt={sub.name}
              className={`w-[50px] h-[50px] object-contain p-1 border rounded-sm ${
                selectedSubcategorySlug === sub.slug
                  ? "bg-sky-100 border-sky-300"
                  : "hover:bg-sky-100 border-transparent"
              }`}
            />
            <span
              className={`text-xs text-center text-gray-800 ${
                selectedSubcategorySlug === sub.slug ? "font-semibold" : ""
              }`}
            >
              {sub.name}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
