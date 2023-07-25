import { AllPeopleResponse, PeopleListProps, People } from "./interface";
import React, { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

const WithPeopleList = (Component: React.FC<PeopleListProps>) => {
  const Hoc = () => {
    const [data, setData] = useState<People[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
      const fetchStarWarsData = async () => {
        try {
          const localData = localStorage.getItem("star-wars-people-data");
          if (localData) {
            const response = JSON.parse(localData);
            const peopleWithFavProp = response.allPeople.people.map(
              (people: People) => ({
                ...people,
                isFav: favorites.includes(people.id),
              })
            );

            setData(peopleWithFavProp);
            setLoading(false);
          } else {
            const endpoint =
              "https://swapi-graphql.netlify.app/.netlify/functions/index";
            const query = `
          {
                        allPeople {
                          people {
                            id
                            gender
                            name
                           
                          }
                        }
                      }
          `;

            const client = new GraphQLClient(endpoint);
            const response: AllPeopleResponse = await client.request(query);

            localStorage.setItem(
              "star-wars-people-data",
              JSON.stringify(response)
            );

            const peopleWithFavProp = response.allPeople.people.map(
              (people: People) => ({
                ...people,
                isFav: favorites.includes(people.id),
              })
            );
            setData(peopleWithFavProp);
            setLoading(false);
          }
        } catch (error) {
          setError("Error fetching data.");
          setLoading(false);
        }
      };

      fetchStarWarsData();
    }, [favorites]);

    const handleToggleFavorite = (film: People) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(film.id)
          ? prevFavorites.filter((favId) => favId !== film.id)
          : [...prevFavorites, film.id]
      );
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    const newProps = {
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

export { WithPeopleList };
