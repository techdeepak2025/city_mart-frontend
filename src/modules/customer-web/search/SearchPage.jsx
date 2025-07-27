import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MoveLeft, Search } from "lucide-react";
import Logo from "../header/Logo";
import CartButton from "../header/CartButton";

// Search Input Inline
function SearchInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Save to recent searches
    const prev = JSON.parse(localStorage.getItem("recentSearches")) || [];
    const updated = [query, ...prev.filter((item) => item !== query)].slice(
      0,
      10
    );
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    // Navigate
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products, brands, etc..."
        className="w-full bg-white shadow-lg border border-gray-400 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600"
      >
        <Search size={18} />
      </button>
    </form>
  );
}

// Desktop Top Bar
const DesktopTopBar = ({ cartCount }) => (
  <div className="hidden sm:grid grid-cols-[auto_1fr_auto] items-center gap-4 w-full">
    <div>
      <Logo />
    </div>
    <div className="w-full max-w-none">
      <SearchInput />
    </div>
    <div className="justify-self-end">
      <CartButton cartCount={cartCount} onClick={() => {}} />
    </div>
  </div>
);

// Mobile Top Bar
const MobileTopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex sm:hidden items-center gap-2">
      <button onClick={() => navigate(-1)} className="p-2 text-blue-600">
        <MoveLeft size={20} />
      </button>
      <div className="flex-1">
        <SearchInput />
      </div>
    </div>
  );
};

export default function SearchPage() {
  const [recentSearches, setRecentSearches] = useState([]);
  const cartCount = 0;

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const handleClearSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-tr from-purple-100 via-blue-200 to-blue-300 shadow-2xl border-b border-blue-200 backdrop-blur-md px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <DesktopTopBar cartCount={cartCount} />
          <MobileTopBar />
        </div>
      </div>

      {/* Recent Searches Section */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Searches
          </h2>
          {recentSearches.length > 0 && (
            <button
              onClick={handleClearSearches}
              className="text-sm text-red-500 hover:underline px-2 py-1 rounded transition"
            >
              Clear All
            </button>
          )}
        </div>

        {recentSearches.length === 0 ? (
          <p className="text-gray-500">No recent searches yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() =>
                  navigate(`/search?q=${encodeURIComponent(term)}`)
                }
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 shadow hover:bg-gray-100 transition"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
