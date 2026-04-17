import { useCallback, useEffect } from "react";
import { useState } from "react";
import StarRating from "./StarRating";
function App() {
  const [movies, setMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [userRating, setUserRating] = useState();
  const [faovorites, setFavorites] = useState(() => {
    return (JSON.parse(localStorage.getItem("watched")) && userRating) || [];
  });
  const [hoverRating, SetHoverRating] = useState(0);
  const [search, setSearch] = useState("avengers");
  const fetchData = async () => {
    const url = `https://www.omdbapi.com/?s=${search}&apikey=97c9a473`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (jsonResponse.Search) {
      setMovies(jsonResponse);
    }
  };

  const fetchDetailData = async (id) => {
    const resp = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=97c9a473`,
    );

    const fetchedJsonResponse = await resp.json();
    setSelectedMovie(fetchedJsonResponse);
    // console.log("newly fetched data:", fetchedJsonResponse);
  };

  const addToList = (item) => {
    // 1. Get existing data
    const storageData = JSON.parse(localStorage.getItem("watched")) || [];
    const key = "userRating";
    item[key] = userRating;
    // 2. Create the NEW array
    const updatedData = [...storageData, item];

    // 3. Update State (UI updates instantly)
    setFavorites(updatedData);

    // 4. Update LocalStorage (Persists for refresh)
    localStorage.setItem("watched", JSON.stringify(updatedData));

    setSelectedMovie(null);
  };

  const deleteFromList = (item) => {
    const lists = JSON.parse(localStorage.getItem("watched"));
    const filteredMovie = lists.filter((movie) => {
      let isYearSame = movie.Year === item.Year;
      let isMovieNameSame = movie.Title === item.Title;
      if (!isYearSame && !isMovieNameSame) {
        return movie;
      }
    });
    localStorage.setItem("watched", JSON.stringify(filteredMovie));
    setFavorites(filteredMovie);
  };

  useEffect(() => {
    fetchData();
  }, [search]);
  const watchedMovieRating = faovorites.find(
    (movie) => movie.imdbID === selectedMovie?.imdbID,
  )?.userRating;
  return (
    <div className="flex h-screen bg-[#0f0f10] text-gray-300 font-sans selection:bg-green-500/30">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[#0f0f10] p-8 hidden lg:flex flex-col gap-10 border-r border-gray-800/50">
        <div className="flex items-center gap-3 text-green-500">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-green-500"
          >
            <path d="M4 4h10a2 2 0 012 2v4.5l4-3v9l-4-3V18a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
            <circle cx="7" cy="9" r="1" fill="#0f0f10" />
            <circle cx="11" cy="9" r="1" fill="#0f0f10" />
          </svg>
          <span className="font-bold text-xl tracking-tight text-white uppercase">
            Movie<br></br>
            Fetcher
          </span>
        </div>

        <nav className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Genre
            </h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li className="text-green-500 cursor-pointer">Action</li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Horror
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Comedy
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Adventure
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Drama
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Sci-Fi
              </li>
              <li className="text-gray-600 text-xs cursor-pointer italic mt-1">
                More ...
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Language
            </h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">
                English
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Hindi
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Tamil
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Telugu
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Marathi
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Punjabi
              </li>
              <li className="text-gray-600 text-xs cursor-pointer italic mt-1">
                More ...
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-24 flex items-center justify-between px-10 flex-shrink-0">
          <div className="relative w-full max-w-xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search any movies or tv shows"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="w-full bg-[#1a1a1b] border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-green-500/50 transition-all outline-none placeholder:text-gray-600 font-medium"
            />
          </div>

          <nav className="flex items-center gap-8 ml-8">
            <ul className="flex items-center gap-8 text-sm font-bold tracking-wide">
              <li className="text-white cursor-pointer">Movies</li>
              <li className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                TV Shows
              </li>
              <li className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                Watchlist
              </li>
            </ul>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800 cursor-pointer hover:border-green-500 transition-all">
              <img src="https://i.pravatar.cc/100" alt="Profile" />
            </div>
          </nav>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            {/* Left Column: Movies Grid and Selection */}
            <div className="xl:col-span-3">
              {selectedMovie ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-500 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Results
                  </button>

                  <div className="bg-[#1a1a1b] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                    <img
                      src={
                        selectedMovie?.Poster !== "N/A"
                          ? selectedMovie?.Poster
                          : "https://placehold.co/400x600/1a1a1b/green?text=No+Poster"
                      }
                      alt={selectedMovie?.Title}
                      className="w-full md:w-80 h-auto object-cover"
                    />
                    <div className="p-10 flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black text-white leading-tight">
                          {selectedMovie?.Title}
                        </h1>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                          <span>{selectedMovie?.Released}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                          <span>{selectedMovie?.Runtime}</span>
                          <span className="px-2 py-0.5 rounded bg-gray-800 text-green-500 uppercase">
                            {selectedMovie?.Type || "Movie"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500 text-xl">⭐</span>
                          <div className="flex flex-col">
                            <span className="text-lg font-black text-white">
                              {selectedMovie?.imdbRating}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                              IMDb Rating
                            </span>
                          </div>
                        </div>
                        <div className="h-8 w-px bg-gray-800"></div>
                        <p className="text-sm font-medium text-gray-400 italic leading-relaxed max-w-md">
                          {selectedMovie?.Genre}
                        </p>
                      </div>

                      <p className="text-gray-400 leading-relaxed text-sm">
                        {selectedMovie?.Plot}
                      </p>

                      <div className="pt-4">
                        <div className="flex gap-2">
                          {watchedMovieRating ? (
                            <div className="text-red-400 my-3">
                              You Have Rated {selectedMovie?.Title} with {""}
                              {watchedMovieRating} stars
                            </div>
                          ) : (
                            <StarRating
                              maxRating={8}
                              size={24}
                              onSetRating={setUserRating}
                            />
                          )}
                        </div>
                        <button
                          className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg ${
                            faovorites?.some(
                              (data) => data.imdbID === selectedMovie.imdbID,
                            )
                              ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700"
                              : "bg-green-600 text-white hover:bg-green-500 hover:-translate-y-1 active:scale-95 shadow-green-600/20"
                          }`}
                          onClick={() => addToList(selectedMovie)}
                          disabled={faovorites?.some(
                            (data) => data.imdbID === selectedMovie.imdbID,
                          )}
                        >
                          {faovorites?.some(
                            (data) => data.imdbID === selectedMovie.imdbID,
                          )
                            ? "In Watchlist"
                            : "Add To Watchlist"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white tracking-tight italic uppercase">
                      Results for{" "}
                      <span className="text-green-500">"{search}"</span>
                    </h2>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                      See More
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    {movies?.Search?.map((movie) => (
                      <div
                        key={movie.imdbID}
                        onClick={() => fetchDetailData(movie.imdbID)}
                        className="group flex flex-col gap-4 cursor-pointer"
                      >
                        <div className="relative aspect-[2/3] overflow-hidden rounded-3xl bg-[#1a1a1b] shadow-lg transition-all group-hover:-translate-y-2 group-hover:shadow-green-500/10 border border-transparent group-hover:border-green-500/50">
                          <img
                            src={
                              movie?.Poster !== "N/A"
                                ? movie?.Poster
                                : "https://placehold.co/400x600/1a1a1b/green?text=No+Poster"
                            }
                            alt={movie?.Title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">
                              Quick View
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="font-bold text-sm text-gray-200 line-clamp-1 group-hover:text-green-500 transition-colors">
                            {movie?.Title}
                          </h3>
                          <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 tracking-wider">
                            <span>{movie?.Year}</span>
                            <span className="text-yellow-500">⭐ 8.1</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Watchlist & Trailers */}
            <div className="flex flex-col gap-12 relative">
              {/* <div className="flex flex-col gap-6">
                <h2 className="text-xl font-black text-white tracking-tighter italic uppercase border-b border-gray-800 pb-4">
                  New Trailers
                </h2>
                <div className="flex flex-col gap-6">
                  {[
                    { title: "Avengers: Endgame", subtitle: "Official Trailer", img: "https://placehold.co/300x160/1a1a1b/green?text=Avengers" },
                    { title: "Aladdin Official Trailer", subtitle: "In Theathers May 24!", img: "https://placehold.co/300x160/1a1a1b/green?text=Aladdin" }
                  ].map((trailer, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1a1a1b] mb-3">
                        <img src={trailer.img} alt={trailer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-green-500 transition-all shadow-xl">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-[13px] font-bold text-gray-200 group-hover:text-green-500 transition-colors">{trailer.title}</h4>
                      <p className="text-[10px] font-medium text-gray-500 italic">{trailer.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="flex flex-col gap-6 ">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <h2 className="text-xl font-black text-white tracking-tighter italic uppercase">
                    Watchlist
                  </h2>
                  <span className="w-6 h-6 rounded-full bg-green-600 text-[10px] font-bold flex items-center justify-center text-white">
                    {faovorites?.length || 0}
                  </span>
                </div>

                <div className="sticky top-0   flex flex-col gap-5 max-h-[90vh] overflow-y-auto pr-2 custom-scrollbar">
                  {faovorites?.length > 0 ? (
                    faovorites?.map((movie, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#1a1a1b] shadow-lg">
                          <img
                            src={
                              movie.Poster !== "N/A"
                                ? movie.Poster
                                : "https://placehold.co/100x150/1a1a1b/green?text=No+Poster"
                            }
                            alt={movie.Title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center gap-1.5 flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-200 line-clamp-1 group-hover:text-green-500 transition-colors uppercase tracking-tight">
                            {movie.Title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                            <span className="text-yellow-500">
                              ⭐ {movie.imdbRating}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                            <span>{movie.Runtime}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteFromList(movie)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500/10 hover:text-red-500 transition-all self-center opacity-0 group-hover:opacity-100"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 gap-2 opacity-30 italic">
                      <p className="text-xs font-bold uppercase tracking-widest text-center">
                        Your watchlist is empty
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default App;
