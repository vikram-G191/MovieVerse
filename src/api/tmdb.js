import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';


export const searchMovies = async (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page },
  });

export const getTrendingMovies = async () =>
  axios.get(`${BASE_URL}/trending/movie/week`, {
    params: { api_key: API_KEY },
  });

export const getMovieDetails = async (id) =>
  axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY, append_to_response: 'credits,videos' },
  });
