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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const fetchStarWarsData = async () => {
          try {
            if (films) {
            const filmArr = plainToClass(FilmClass, films);
              const filmsWithFavProp = filmArr.map((film: FilmClass, index) => ({
                ...film,
                title: film.getTitleNameWithYear(),
                releaseDate: film.getDateFormat(),
                isFav: favorites.includes(film.id),
              }));

              // console.log('mockFilm>>>', mockFilm[0].getTitleNameWithYear())
    
              setData(filmsWithFavProp);
              console.log('>>>>>>', data)
              setLoading(false);
            }
          } catch (error) {
            setError("Error fetching data.");
            setLoading(false);
          }
        };
    
        fetchStarWarsData();
      }, []);

    useEffect(() => {
      setData((prevData) => {
        return (
          prevData?.map((film: Film) => ({
            ...film,
            isFav: favorites.includes(film.id),
          })) ?? []
        );
      });
    }, [favorites]);

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
      data,
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
