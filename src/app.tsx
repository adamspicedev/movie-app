import { useState } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import MovieCard from "./components/movie-card";
import Search from "./components/search";
import Spinner from "./components/spinner";
import { useDebounce } from "./hooks/use-debounce";
import { useInfiniteScroll } from "./hooks/use-infinite-scroll";
import { getMovies, loadTrendingMovies } from "./lib/tmdb";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["movies", debouncedSearchTerm],
    queryFn: ({ pageParam = 1 }) => getMovies(debouncedSearchTerm, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const loadMoreRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const {
    isPending: isTrendingMoviesPending,
    isError: isTrendingMoviesError,
    data: trendingMovies,
    error: trendingMoviesError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => loadTrendingMovies(),
  });

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./logo.png" alt="logo" className="w-28" />
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll enjoy
            without the hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies && trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            {isTrendingMoviesPending ? (
              <Spinner />
            ) : isTrendingMoviesError ? (
              <p className="text-red-500">{trendingMoviesError?.message}</p>
            ) : (
              <ul>
                {trendingMovies?.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isPending ? (
            <Spinner />
          ) : isError ? (
            <p className="text-red-500">{error?.message}</p>
          ) : (
            <ul>
              {data?.pages?.map((page) =>
                page.results?.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              )}
            </ul>
          )}

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="flex justify-center py-8">
            {isFetchingNextPage && <Spinner />}
            {!hasNextPage && data?.pages?.[0]?.results && (
              <p className="text-gray-500">No more movies to load</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
