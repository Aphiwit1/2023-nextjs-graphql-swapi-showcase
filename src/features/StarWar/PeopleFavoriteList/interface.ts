import { People } from "../PeopleList/interface";

export interface FavoritePeopleProps {
    favorites: string[];
    data: People[] | null;
    handleToggleFavorite: (people: People) => void;
}
