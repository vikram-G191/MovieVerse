
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import Trending from '../components/Trending';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
   const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <main className={`mx-auto min-h-screen p-4 ${isDark?"bg-black":"bg-white"}  transition-colors`}>
      <Trending />
      <SearchBar/>
      <MovieList />
    </main>
  );
}
