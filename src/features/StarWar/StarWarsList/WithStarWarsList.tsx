import React, { useState, useEffect } from "react";
import { Film, StarWarsListProps, filmsProp } from "./interface";
import { FilmClass } from "@/models/Film";
import { plainToClass } from "class-transformer";

interface StarWarFilmProps {
  films: Film[];
}

const WithStarWarsList = (Component: React.FC<StarWarsListProps>) => {
  const Hoc = (props: StarWarFilmProps) => {
    const { films } = props;
    const [favorites, setFavorites] = useState<string[]>([]);

     const filmArr = plainToClass(FilmClass, films);
     const filmsWithFavProp = filmArr.map((film: FilmClass, index) => ({
       ...film,
       title: film.getTitleNameWithYear(),
       releaseDate: film.getDateFormat(),
       isFav: favorites.includes(film.id),
     }));
 
    const handleToggleFavorite = (film: Film) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(film.id)
          ? prevFavorites.filter((favId) => favId !== film.id)
          : [...prevFavorites, film.id]
      );
    };

    const newProps: StarWarsListProps = {
      data: filmsWithFavProp,
      films,
      favorites,
      handleToggleFavorite,
    };

    return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithStarWarsList };
