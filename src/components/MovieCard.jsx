
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoritesSlice";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.some((m) => m.id === movie.id);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group rounded-2xl overflow-hidden shadow-black shadow-md bg-gray-900/80 backdrop-blur-md 
                 hover:shadow-orange-500/30 showdow-xl transition-all duration-300 flex flex-col"
    >
      <Link to={`/movie/${movie.id}`} className="relative w-full block">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-yellow-500 text-black font-bold px-3 py-1 rounded-full shadow-md text-sm">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
        <button
  onClick={(e) => {
    e.preventDefault();
    dispatch(isFav ? removeFavorite(movie.id) : addFavorite(movie));
  }}
  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 
    ${isFav 
      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg shadow-pink-500/40 animate-pulse" 
      : "bg-white/80 hover:bg-white/40 text-pink-500 "
    }`}
>
  <Heart
    size={22}
    className={`transition-transform duration-300 ${isFav ? "scale-110" : "scale-100"}`}
    fill={isFav ? "currentColor" : "none"}
  />
</button>
      </Link>

      <div className="p-4 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent absolute bottom-0 w-full">
        <h3 className="font-bold text-lg text-white truncate">{movie.title}</h3>
        <p className="text-gray-300 text-sm">{movie.release_date?.slice(0, 4)}</p>
      </div>
    </motion.div>
  );
}
