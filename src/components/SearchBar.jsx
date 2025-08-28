import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { setQuery } from "../features/moviesSlice";
import { Search, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const debouncedSearch = useCallback(
    debounce((query) => dispatch(setQuery(query)), 500),
    [dispatch]
  );

  const handleChange = (e) => {
    setInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  const clearInput = () => {
    setInput("");
    dispatch(setQuery(""));
  };

  return (
    <div className="relative w-full max-w-xl mx-auto sticky top-3 z-50">
      <input
        className={`w-full pl-12 pr-12 py-3 rounded-full border shadow-md backdrop-blur-md
          ${isDark
            ? "bg-gray-900/70 text-gray-100 placeholder-gray-400 border-gray-700"
            : "bg-white/70 text-gray-900 placeholder-gray-500 border-gray-300"}
          focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500
          transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20`}
        value={input}
        onChange={handleChange}
        placeholder="Search movies..."
        aria-label="Search movies"
      />
      <Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors
          ${isDark ? "text-gray-400" : "text-gray-600"}`}
      />
      {input && (
        <button
          onClick={clearInput}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
