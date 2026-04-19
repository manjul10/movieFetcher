import { useEffect } from "react";
import { useState } from "react";
import type { Movie } from "./types";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import RightSideBar from "./components/RightSideBar";
import HeroPage from "./components/HeroPage";
function App() {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("watched") || "[]");
  });
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("avengers");
  const fetchData = async (search: string, signal: AbortSignal) => {
    try {
      const url = `https://www.omdbapi.com/?s=${search}&apikey=97c9a473`;
      const response = await fetch(url, { signal });
      const jsonResponse = await response.json();
      if (jsonResponse.Search) {
        setMovies(jsonResponse.Search);
      } else if (jsonResponse.Error) {
        setErr(jsonResponse.Error);
        setMovies(null);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Fetch Aborted");
      } else {
        console.error("Fetch Error:", err);
      }
    }
  };
  // console.log(selectedMovie);
  useEffect(() => {
    const controller = new AbortController();
    if (search.length < 3) {
      setMovies(null);
      setErr("");
      return;
    }
    fetchData(search, controller.signal);
    return () => controller.abort();
  }, [search]);

  const watchedMovieRating = favorites.find(
    (movie: Movie) => movie.imdbID === selectedMovie?.imdbID,
  )?.userRating;
  return (
    <div className="flex h-screen bg-[#0f0f10] text-gray-300 font-sans selection:bg-green-500/30">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Header setSearch={setSearch} search={search} />

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            {/* Left Column: Movies Grid and Selection */}
            <HeroPage
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              watchedMovieRating={watchedMovieRating}
              favorites={favorites}
              movies={movies}
              setUserRating={setUserRating}
              userRating={userRating}
              setFavorites={setFavorites}
              search={search}
              err={err}
            />

            {/* Right Column: Watchlist & Trailers */}
            <RightSideBar favorites={favorites} setFavorites={setFavorites} />
          </div>
        </main>
      </section>
    </div>
  );
}

export default App;
