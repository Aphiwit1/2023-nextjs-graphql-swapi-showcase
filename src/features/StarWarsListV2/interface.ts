export interface Film {
    id: string
    title: string;
    director: string;
    releaseDate: string;
    isFav?: boolean;
}

export interface StarWarsListV2Props {
    data: Film[] | null;
    loading?: boolean;
  }

export interface AllFilmsResponse {
    allFilms: {
      films: Film[];
    };
  }

