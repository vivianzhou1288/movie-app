import axios from "axios";
import { apiKey } from "../constants";

//endpoints
const baseURL = "https://api.themoviedb.org/3";

const trendingEndpoint = `${baseURL}/trending/all/day?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseURL}/movie/top_rated?api_key=${apiKey}`;
const popularMoviesEndpoint = `${baseURL}/movie/popular?api_key=${apiKey}`;
const searchMoviesEndpoint = `${baseURL}/search/movie?api_key=${apiKey}`;
const discoverMoviesEndpoint = `${baseURL}/discover/movie?api_key=${apiKey}`;
const searchTvEndpoint = `${baseURL}/search/tv?api_key=${apiKey}`;
const discoverTvEndpoint = `${baseURL}/discover/tv?api_key=${apiKey}`;

//dynamic endpoints
const movieDetailsEndpoint = (id) => `${baseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${baseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${baseURL}/movie/${id}/similar?api_key=${apiKey}`;
const tvDetailsEndpoint = (id) => `${baseURL}/tv/${id}?api_key=${apiKey}`;
const tvCreditsEndpoint = (id) =>
  `${baseURL}/tv/${id}/credits?api_key=${apiKey}`;
const similarTvEndpoint = (id) =>
  `${baseURL}/tv/${id}/similar?api_key=${apiKey}`;
const videosEndpoint = (id) =>
  `${baseURL}/movie/${id}/videos?api_key=${apiKey}`;
const videosTvEndpoint = (id) => `${baseURL}/tv/${id}/videos?api_key=${apiKey}`;

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

export const fetchTrending = () => {
  return apiCall(trendingEndpoint);
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

export const fetchTvDetails = (id) => {
  return apiCall(tvDetailsEndpoint(id));
};

export const fetchTvCredits = (id) => {
  return apiCall(tvCreditsEndpoint(id));
};

export const fetchSimilarTv = (tvId) => {
  return apiCall(similarTvEndpoint(tvId));
};

export const fetchVideos = (id) => {
  return apiCall(videosEndpoint(id));
};

export const fetchTvVideos = (id) => {
  return apiCall(videosTvEndpoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};

export const searchTv = (params) => {
  return apiCall(searchTvEndpoint, params);
};

export const fetchDiscoverMovies = () => {
  return apiCall(discoverMoviesEndpoint);
};

export const fetchDiscoverTv = () => {
  return apiCall(discoverTvEndpoint);
};
