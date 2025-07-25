import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { BASE_URL } from "../../../utils/axiosInstance";
import UserAvatar from "../../../ui/avatar/UserAvatar";

export default function UserCard({ user, onEdit, onDelete }) {
  const avatarUrl = user.avatar?.url || null;

  const formatRole = (role) => {
    const name = typeof role === "object" ? role?.name : role;
    return name
      ? name
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "N/A";
  };

  const formatAccess = (accessScope) => {
    if (!accessScope || !accessScope.type) return "🌐 Global";
    const ref = accessScope.refId;
    const name = typeof ref === "object" ? ref?.name || ref?.storeNumber : ref;
    if (accessScope.type === "store") return `🏬 Store: ${name}`;
    if (accessScope.type === "city") return `🏙️ City: ${name}`;
    return "🌐 Global";
  };

  const isProtected = formatRole(user.role) === "Admin";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex justify-between items-start gap-4"
    >
      {/* Left: Avatar and Info */}
      <div className="flex gap-4 items-start">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover border border-gray-400"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
          />
        ) : (
          <UserAvatar name={user.name} />
        )}

        <div className="text-sm space-y-0.5">
          <p className="font-medium text-gray-800">{user.name}</p>
          <p className="text-gray-600">{user.mobile || "N/A"}</p>
          <p className="text-gray-500">{formatRole(user.role)}</p>
          <p className="text-xs text-gray-400">
            {formatAccess(user.accessScope)}
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onEdit(user)}
          className="text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        {isProtected ? (
          <button
            className="text-gray-400 cursor-not-allowed"
            title="Protected - cannot delete"
            disabled
          >
            <Trash2 size={16} />
          </button>
        ) : (
          <button
            onClick={() => onDelete(user)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
