import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovies, getTrendingMovies, getMovieDetails } from '../api/tmdb';

export const fetchMovies = createAsyncThunk('movies/fetch', async ({ query, page }) => {
  const res = await searchMovies(query, page);
    // console.log(query,page,res.data,"datatata");
  return res.data;
});

export const fetchTrending = createAsyncThunk('movies/trending', async () => {
  const res = await getTrendingMovies();

  
  return res.data.results;
});

export const fetchMovieDetail = createAsyncThunk('movies/detail', async (id) => {
  const res = await getMovieDetails(id);
  return res.data;
});

const initialState = {
  items: [],
  trending: [],
  detail: null,
  loading: false,
  error: null,
  totalPages: 1,
  page: 1,
  query: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
      state.items = [];
    },
    incrementPage(state) {
      state.page += 1;
    },
    clearDetail(state) {
      state.detail = null;
    },
    reset(state) {
      state.items = [];
      state.page = 1;
      state.query = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => { state.loading = true; })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload.results];
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
      });
  },
});

export const { setQuery, incrementPage,clearDetail,reset } = moviesSlice.actions;
export default moviesSlice.reducer;
