// import { Film } from "../StarwarList/interface";

import { Film } from "../StarWarsListV2/interface";

export interface FavoriteFilmsProps {
    favorites: string[];
    data: Film[] | null;
    handleToggleFavorite: (film: Film) => void;
}

