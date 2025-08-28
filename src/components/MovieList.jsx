import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, incrementPage } from "../features/moviesSlice";
import LoadingSpinner from "./LoadingSpinner";
import MovieCard from "./MovieCard";
import { useTheme } from "../context/ThemeContext";

export default function MovieList() {
  const dispatch = useDispatch();
  const { items, query, page, loading, totalPages } = useSelector(s => s.movies);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    dispatch(fetchMovies({ query, page }));
  }, [query, page, dispatch]);

  const handleScroll = useCallback(() => {
    if (
      !loading &&
      page < totalPages &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 400
    ) {
      dispatch(incrementPage());
    }
  }, [loading, page, totalPages, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {items.map((movie, ind) => (
          <MovieCard key={ind} movie={movie} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center py-6">
          <LoadingSpinner />
        </div>
      )}
      {!items.length && !loading && (
        <div className={`text-center ${isDark?"text-gray-400":"text-gray-900"} py-[39vw] md:py-[5vw]  px-4`}>No movies found.</div>
      )}
    </>
  );
}
