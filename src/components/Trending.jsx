import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending } from "../features/moviesSlice";
import MovieCard from "./MovieCard";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Trending() {
  const dispatch = useDispatch();
  const { trending } = useSelector((s) => s.movies);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (!trending.length) return null;

  return (
    <div className="mb-8 relative">
      <h2
        className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 drop-shadow-lg mb-4 tracking-wide`}
      >
        Trending This Week
      </h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 text-black p-2 rounded-full shadow-md hover:bg-black/60 hover:text-white transition"
      >
        <ChevronLeft size={28} />
      </motion.button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {trending.slice(0, 19).map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] snap-start transform hover:scale-105 transition-transform duration-300"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 text-black p-2 rounded-full shadow-md hover:bg-black/60 hover:text-white transition"
      >
        <ChevronRight size={28} />
      </motion.button>
    </div>
  );
}
