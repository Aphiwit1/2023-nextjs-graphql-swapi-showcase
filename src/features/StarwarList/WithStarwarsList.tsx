import React, { useState } from "react";
import { GraphQLClient } from "graphql-request";
import { AllFilmsResponse, Film, StarWarsListProps } from "./interface";

const WithStarwarsList = (Component: React.FC<StarWarsListProps>) => {
  const Hoc = ({ data, loading, error }: StarWarsListProps) => {
    const [favorites, setFavorites] = useState<string[]>([]);

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

export async function getStaticProps() {
  const endpoint = "https://swapi-graphql.netlify.app/.netlify/functions/index";
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
  try {
    const response: AllFilmsResponse = await client.request(query);

    const filmsWithFavProp = response.allFilms.films.map((film: Film) => ({
      ...film,
      isFav: false, // As this is SSG, we can't know the user's favorites at build time, so initialize isFav to false.
    }));

    return {
      props: {
        data: filmsWithFavProp,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        loading: false,
        error: "Error fetching data.",
      },
    };
  }
}