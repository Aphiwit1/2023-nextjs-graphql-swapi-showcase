import React, { useState, useEffect } from "react";
// import { AllFilmsResponse, Film, StarWarsListProps } from "../interface";
import { GraphQLClient } from "graphql-request";
import { AllFilmsResponse, Film, StarWarsListProps } from "./interface";

const WithStarwarsList = (Component: React.FC<StarWarsListProps>) => {
  const Hoc = () => {
    const [data, setData] = useState<Film[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
      const fetchStarWarsData = async () => {
        try {
          // const localData = localStorage.getItem("star-wars-films-data");
          const localData = false;
          if (localData) {
            const response = JSON.parse(localData);
            const filmsWithFavProp = response.allFilms.films.map(
              (film: Film) => ({
                ...film,
                isFav: favorites.includes(film.id),
              })
            );

            setData(filmsWithFavProp);
            setLoading(false);
          } else {
            const endpoint =
              "https://swapi-graphql.netlify.app/.netlify/functions/index";
            const query = `
              {
                allFilms {
                  films {
                    id
                    title
                    director
                    releaseDate
                  }
                }
              }
            `;

            const client = new GraphQLClient(endpoint);
            const response: AllFilmsResponse = await client.request(query);

            // localStorage.setItem(
            //   "star-wars-films-data",
            //   JSON.stringify(response)
            // );

            const filmsWithFavProp = response.allFilms.films.map(
              (film: Film) => ({
                ...film,
                isFav: favorites.includes(film.id),
              })
            );
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

export { WithStarwarsList };
