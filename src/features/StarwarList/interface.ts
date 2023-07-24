export interface Film {
    id: string
    title: string;
    director: string;
    releaseDate: string;
    isFav?: boolean;
}

export interface StarWarsListProps {
    data: Film[] | null;
    loading?: boolean;
    error?: string | null;
    favorites: string[];
    handleToggleFavorite: (film: Film) => void;
  }

export interface AllFilmsResponse {
    allFilms: {
      films: Film[];
    };
  }

