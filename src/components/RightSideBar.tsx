import type { Movie } from "../types";

interface SidebarProps {
  setFavorites: (value: Movie[]) => void;
  favorites: Movie[];
}

const RightSideBar = ({ favorites, setFavorites }: SidebarProps) => {
  const deleteFromList = (item: Movie) => {
    const lists = JSON.parse(localStorage.getItem("watched") || "");
    const filteredMovie = lists.filter((movie: Movie) => {
      let isYearSame = movie.Year === item.Year;
      let isMovieNameSame = movie.Title === item.Title;
      if (!isYearSame && !isMovieNameSame) {
        return movie;
      }
    });
    localStorage.setItem("watched", JSON.stringify(filteredMovie));
    setFavorites(filteredMovie);
  };
  return (
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
            {favorites?.length || 0}
          </span>
        </div>

        <div className="sticky top-0   flex flex-col gap-5 max-h-[90vh] overflow-y-auto pr-2 custom-scrollbar">
          {favorites?.length > 0 ? (
            favorites?.map((movie, i) => (
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
  );
};

export default RightSideBar;
