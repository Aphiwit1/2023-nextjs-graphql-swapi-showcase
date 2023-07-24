export interface Film {
  id: string
  title: string;
  director: string;
  releaseDate: string;
  isFav?: boolean;
}

export interface StarWarsListProps {
  data?: Film[] | null;
  films?: Film[] | null;
  loading?: boolean;
  error?: string | null;
  favorites?: string[] | undefined;
  handleToggleFavorite?: (film: Film) => void;
}

export interface AllFilmsResponse {
  allFilms: {
    films: Film[];
  };
}

export interface filmsProp {
  films: Film[] | null;
}

