import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetail, fetchMovieDetail } from "../features/moviesSlice";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { addFavorite, removeFavorite } from "../features/favoritesSlice";
import { Heart, HeartOff, Play } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail, loading } = useSelector((s) => s.movies);
  const favorites = useSelector((state) => state.favorites.items);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const isFav = favorites.some((m) =>{ 
   return m.id === parseInt(id)
  });
  // console.log(detail?.videos?.results.find((v)=> v.type === "Trailer" && v.site === "YouTube"),'reoirjerj');
  const YoutubeDetails = detail?.videos?.results.find((v)=> v.type === "Trailer" && v.site === "YouTube")

  

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  if (loading || !detail) return <LoadingSpinner />;

  return (
    <div className="relative w-full min-h-screen">
  <div className="absolute inset-0">
    <img
      src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
      alt={detail.title}
      className="w-full h-full object-cover"
    />
    <div
      className={`absolute inset-0 
        ${isDark 
          ? "bg-gradient-to-b from-black/80 via-black/60 to-black" 
          : "bg-gradient-to-b from-white/50 via-white/30 to-white/10"
        }`}
    ></div>
  </div>

  <div className="relative container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
    <motion.img
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`}
      alt={detail.title}
      className="w-72 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
    />
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`${isDark ? "text-white" : "text-gray-900"} max-w-2xl`}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        {detail.title}
        <span className={`${isDark ? "text-gray-400" : "text-gray-600"} text-2xl`}>
          {" "}({detail.release_date?.slice(0, 4)})
        </span>
      </h1>

      <p className={`${isDark ? "text-gray-300" : "text-gray-900 font-semibold"} text-lg mb-6 leading-relaxed`}>
        {detail.overview}
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {detail.genres?.map((g) => (
          <span
            key={g.id}
            className={`text-sm px-3 py-1 rounded-full shadow-md 
              ${isDark ? "bg-white/20" : "bg-gray-200 text-gray-800"}`}
          >
            {g.name}
          </span>
        ))}
        <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full">
          ⭐ {detail.vote_average.toFixed(1)}
        </span>
        <span className={`${isDark ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-900"} px-3 py-1 rounded-full`}>
          ⏱ {detail.runtime} mins
        </span>
      </div>
      <div className="flex gap-4 mb-6">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={YoutubeDetails ? `https://www.youtube.com/watch?v=${YoutubeDetails.key}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold shadow-lg transition
            ${YoutubeDetails 
              ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white" 
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
        >
          <Play size={18} /> {YoutubeDetails ? "Watch Trailer" : "Trailer Unavailable"}
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            dispatch(isFav ? removeFavorite(parseInt(id)) : addFavorite(detail));
          }}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold shadow-lg transition
            ${isFav
              ? (isDark 
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white" 
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300")
              : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white"
            }`}
        >
          {isFav ? (
            <>
              <HeartOff size={18} /> Remove Favorite
            </>
          ) : (
            <>
              <Heart size={18} /> Add to Favorites
            </>
          )}
        </motion.button>
      </div>

      <div>
        <strong className="text-lg block mb-2">Cast:</strong>
        <div className="flex flex-wrap gap-2">
          {detail.credits?.cast.slice(0, 6).map((a) => (
            <span
              key={a.cast_id}
              className={`${isDark 
                ? "bg-white/20 text-white hover:bg-white/30" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"} px-3 py-1 rounded-full text-sm transition`}
            >
              {a.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
</div>
  );
}
