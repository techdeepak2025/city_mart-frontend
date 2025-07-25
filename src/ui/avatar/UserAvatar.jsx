import React from "react";

export default function UserAvatar({ name = "User" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="w-15 h-12 flex items-center justify-center rounded-full border border-gray-400 bg-gray-200 text-gray-600 font-medium text-sm"
      title={name}
    >
      {initials}
    </div>
  );
}
