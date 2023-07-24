import React, { useState, useEffect } from "react";
import { Film, StarWarsListProps } from "./interface";

const WithStarwarsListV2 = (Component: React.FC<StarWarsListProps>) => {
  const Hoc: React.FC<StarWarsListProps> = (props) => {
    const { films } = props;
    const [data, setData] = useState<Film[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const fetchStarWarsData = async () => {
          try {
            if (films) {
              const filmsWithFavProp = films.map((film: Film) => ({
                ...film,
                isFav: favorites.includes(film.id),
              }));
    
              setData(filmsWithFavProp);
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
      favorites,
      handleToggleFavorite,
    };

    return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithStarwarsListV2 };
