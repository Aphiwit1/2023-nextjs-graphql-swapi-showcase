import { PeopleClass } from "@/models/PeopleModel";
import { PeopleListProps, People } from "./interface";
import React, { useState, useEffect } from "react";
import { plainToClass } from "class-transformer";

interface StarWarPeopleProps {
  people: People[];
}

const WithPeopleList = (Component: React.FC<PeopleListProps>) => {
  const Hoc = (props: StarWarPeopleProps) => {
    const { people } = props;
    const [data, setData] = useState<People[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    const peopleArr = plainToClass(PeopleClass, people);

    const peopleWithFavProp = peopleArr.map((people: PeopleClass, index) => ({
      ...people,
      gender: people.getGender(),
      isFav: favorites.includes(people.id),
    }));

    const handleToggleFavorite = (people: People) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(people.id)
          ? prevFavorites.filter((favId) => favId !== people.id)
          : [...prevFavorites, people.id]
      );
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    const newProps = {
      data: peopleWithFavProp,
      loading,
      error,
      people,
      favorites,
      handleToggleFavorite,
    };

    return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithPeopleList };
