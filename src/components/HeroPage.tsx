import StarRating from "../StarRating";
import type { HeroProps, Movie } from "../types";

const HeroPage = ({
  selectedMovie,
  setSelectedMovie,
  watchedMovieRating,
  favorites,
  movies,
  search,
  setUserRating,
  userRating,
  setFavorites,
}: HeroProps) => {
  const fetchDetailData = async (id: string) => {
    const resp = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=97c9a473`,
    );

    const fetchedJsonResponse = await resp.json();
    setSelectedMovie(fetchedJsonResponse);
    // console.log("newly fetched data:", fetchedJsonResponse);
  };
  const addToList = (item: Movie) => {
    // 1. Get existing data
    const storageData = JSON.parse(localStorage.getItem("watched") || "");
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

  return (
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
                      userRating={userRating}
                    />
                  )}
                </div>
                <button
                  className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg ${
                    favorites?.some(
                      (data) => data.imdbID === selectedMovie.imdbID,
                    )
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700"
                      : "bg-green-600 text-white hover:bg-green-500 hover:-translate-y-1 active:scale-95 shadow-green-600/20"
                  }`}
                  onClick={() => addToList(selectedMovie)}
                  disabled={favorites?.some(
                    (data) => data.imdbID === selectedMovie.imdbID,
                  )}
                >
                  {favorites?.some(
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
              {movies?.length} Results for{" "}
              <span className="text-green-500">"{search}"</span>
            </h2>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
              See More
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {movies?.map((movie) => (
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
  );
};

export default HeroPage;
