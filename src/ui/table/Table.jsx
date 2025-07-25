import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function Table({ columns, data, searchable = true }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(columns.map((col) => col.key));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleColumnVisibility = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        !searchQuery
          ? true
          : Object.values(item)
              .join(" ")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (!sortBy) return 0;
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (typeof valA === "number") return valA - valB;
        return String(valA).localeCompare(String(valB));
      });
  }, [data, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, data, pageSize]);

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {searchable && (
          <div className="relative flex-1 min-w-[200px] bg-white">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 border border-gray-300 shadow-sm rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-2 flex-none">
          <label className="text-sm font-medium text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 border border-neutral-300 shadow-sm rounded text-sm outline-none"
          >
            <option value="">None</option>
            {columns
              .filter((col) => col.sortable)
              .map((col) => (
                <option key={col.key} value={col.key}>
                  {col.label}
                </option>
              ))}
          </select>
        </div>

        <div className="relative flex-none" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="px-3 py-1 border border-neutral-300 bg-white shadow-sm rounded text-sm flex items-center gap-1"
          >
            Columns <ChevronDown className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 z-20 bg-white border border-neutral-300 shadow-lg rounded w-48 max-h-64 overflow-auto p-2 space-y-1">
              {columns.map((col) => (
                <label key={col.key} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumnVisibility(col.key)}
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg shadow bg-white overflow-hidden">
        <div className="max-h-[350px] overflow-y-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-sky-200 text-blue-800 uppercase text-xs sticky top-0 z-10">
              <tr>
                {columns
                  .filter((col) => visibleColumns.includes(col.key))
                  .map((col, idx, arr) => (
                    <th
                      key={col.key}
                      className={`p-3 font-bold whitespace-nowrap sticky top-0 border-r border-white ${
                        idx === arr.length - 1 ? "border-r-0" : ""
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-neutral-200 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-neutral-50"
                    } hover:bg-gray-200`}
                  >
                    {columns
                      .filter((col) => visibleColumns.includes(col.key))
                      .map((col) => (
                        <td key={col.key} className="p-3 whitespace-nowrap text-gray-700">
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </td>
                      ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={visibleColumns.length} className="text-center py-6 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination + Page Size */}
      <div className="flex flex-wrap justify-between items-center mt-2 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <div>
            Showing {(currentPage - 1) * pageSize + 1}
            –
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} items
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm">Items per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
