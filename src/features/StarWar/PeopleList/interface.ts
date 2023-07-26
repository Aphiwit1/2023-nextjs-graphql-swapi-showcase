export interface People {
    id: string;
    gender: string;
    name: string;
    isFav?:boolean;
  }

  export interface PeopleListProps {
    favorites: string[];
    data: People[] | null;
    people: People[] | null;
    handleToggleFavorite: (film: People) => void;
}


