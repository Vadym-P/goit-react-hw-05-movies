const API_KEY = '314078decde40d05c195cb57177619fd';
const BASE_URL = 'https://api.themoviedb.org/3/';

async function fetchMovies(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendMovies() {
  return fetchMovies(`${BASE_URL}trending/movie/week?api_key=${API_KEY}`);
}

export function fetchSearchMovies(query) {
  return fetchMovies(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`,
  );
}

export function fetchMovieId(movieId) {
  return fetchMovies(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`);
}

export function fetchMovieIdCast(movieId) {
  return fetchMovies(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`);
}

export function fetchMovieIdReviews(movieId) {
  return fetchMovies(`${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`);
}
