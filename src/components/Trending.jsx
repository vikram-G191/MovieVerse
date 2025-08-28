import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrending } from '../features/moviesSlice';
import MovieCard from './MovieCard';
import { useTheme } from '../context/ThemeContext';

export default function Trending() {
  const dispatch = useDispatch();
  const { trending } = useSelector(s => s.movies);

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  if (!trending.length) return null;

    const { theme } = useTheme();
    const isDark = theme === 'dark';
  return (
<div className="mb-8">
  <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 drop-shadow-lg   mb-4 tracking-wide`}>
    Trending This Week
  </h2>
  <div
    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
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
</div>

  );
}
