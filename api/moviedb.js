import axios from "axios";
import { apiKey } from "../constants";

//endpoints
const baseURL = "https://api.themoviedb.org/3";
const nowPlayingMoviesEndpoint = `${baseURL}/movie/now_playing?api_key=${apiKey}`;
const trendingMoviesEndpoint = `${baseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseURL}/movie/top_rated?api_key=${apiKey}`;
const popularMoviesEndpoint = `${baseURL}/movie/popular?api_key=${apiKey}`;

//dynamic endpoints
const movieDetailsEndpoint = (id) => `${baseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${baseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${baseURL}/movie/${id}/similar?api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;
export const fallbackMoviePoster =
  "https://img.freepik.com/premium-vector/clapper-film-movie-icon-design_24877-23150.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchNowPlayingMovies = () => {
  return apiCall(nowPlayingMoviesEndpoint);
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};
export const fetchPopularMovies = () => {
  return apiCall(popularMoviesEndpoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (movieId) => {
  return apiCall(similarMoviesEndpoint(movieId));
};
