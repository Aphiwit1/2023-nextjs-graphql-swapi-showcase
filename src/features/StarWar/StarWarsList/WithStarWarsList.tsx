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
    const [data, setData] = useState<Film[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

     // Preprocess the data outside of the component and store it in 'data'
     const filmArr = plainToClass(FilmClass, films);
     const filmsWithFavProp = filmArr.map((film: FilmClass, index) => ({
       ...film,
       title: film.getTitleNameWithYear(),
       releaseDate: film.getDateFormat(),
       isFav: favorites.includes(film.id),
     }));
 

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    const handleToggleFavorite = (film: Film) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(film.id)
          ? prevFavorites.filter((favId) => favId !== film.id)
          : [...prevFavorites, film.id]
      );
    };

    const newProps: StarWarsListProps = {
      data: filmsWithFavProp,
      loading,
      error,
      films,
      favorites,
      handleToggleFavorite,
    };

    return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithStarWarsList };
