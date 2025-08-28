import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Film } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`left-0 w-full backdrop-blur-md border-b shadow-md transition-colors duration-300 
        ${isDark
          ? "bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 border-gray-800"
          : "bg-gradient-to-r from-white/80 via-gray-100/70 to-white/80 border-gray-300"
        }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 drop-shadow-sm"
        >
          <Film className="w-7 h-7 text-pink-500" />
          MovieVerse
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" isDark={isDark}>Home</NavLink>
          <NavLink to="/favorites" isDark={isDark}>Favorites</NavLink>
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </nav>
        <button
          className={`md:hidden transition 
            ${isDark ? "text-gray-200 hover:text-pink-400" : "text-gray-800 hover:text-pink-500"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col items-center gap-4 py-4 backdrop-blur-md shadow-xl animate-slideDown border-t 
            ${isDark ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-300"}`}
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)} isDark={isDark}>
            Home
          </NavLink>
          <NavLink to="/favorites" onClick={() => setMenuOpen(false)} isDark={isDark}>
            Favorites
          </NavLink>
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children, onClick, isDark }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative text-lg font-medium transition duration-300
        ${isDark ? "text-gray-300 hover:text-pink-400" : "text-gray-700 hover:text-pink-500"}`}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full
          ${isDark ? "bg-pink-500" : "bg-pink-600"}`}
      ></span>
    </Link>
  );
}
