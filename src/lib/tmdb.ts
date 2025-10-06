import { TMBD_API_BASE_URL, TMBD_API_KEY } from "../constants/tmdb";
import type { TMDBResponse } from "../types";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

export const getMovies = async (query: string = "", page: number = 1) => {
  const endpoint = query
    ? `${TMBD_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${TMBD_API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TMBD_API_KEY}`,
      },
    });
    const data = (await response.json()) as TMDBResponse;

    if (query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0]);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadTrendingMovies = async () => {
  try {
    const movies = await getTrendingMovies();

    return movies;
  } catch (error) {
    console.error(`Error fetching trending movies: ${error}`);
    throw error;
  }
};
