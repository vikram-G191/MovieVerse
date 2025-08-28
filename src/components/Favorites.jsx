import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Favorites() {
  const favorites = useSelector((s) => s.favorites.items);
 const { theme } = useTheme();
    const isDark = theme === 'dark';
  return (
    <div className={`min-h-screen ${isDark?"bg-gradient-to-b from-gray-900 via-black to-gray-900":"bg-white"}  py-10 px-6`}>
      <div className="flex items-center gap-3 mb-8 justify-center">
        <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 drop-shadow-lg">
          Your Favorites
        </h2>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <Heart className="w-14 h-14 text-gray-500 mb-4" />
          <p className="text-lg md:text-xl font-medium">
            No favorite movies yet 💔
          </p>
          <p className="text-sm text-gray-500">
            Start exploring and add movies you love!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
