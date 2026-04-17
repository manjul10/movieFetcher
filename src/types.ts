export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  userRating?: number;
  Released?: string;
  Runtime?: string;
  Type?: string;
  imdbRating?: number;
  Genre?: string;
  Plot?: string;
  Year?: number;
}

export interface HeroProps {
  selectedMovie: Movie | null;
  setSelectedMovie: (value: Movie | null) => void;
  watchedMovieRating: number;
  favorites: Movie[];
  movies: Movie[] | null;
  search: string;
  setUserRating: (value: number) => void;
  userRating: number;
  setFavorites: (value: Movie[]) => void;
}
