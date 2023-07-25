import { AllPeopleResponse, PeopleListProps, People } from "./interface";
import React, { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

const WithPeopleList = (Component: React.FC<PeopleListProps>) => {
  const Hoc = (props: any) => {
    const { people } = props
    const [data, setData] = useState<People[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    console.log('people >>>', people)

    useEffect(() => {
      const fetchStarWarsData = async () => {
        try {
            const peopleWithFavProp = people.map(
              (people: People) => ({
                ...people,
                isFav: favorites.includes(people.id),
              })
            );

            setData(peopleWithFavProp);
            setLoading(false);
          
        } catch (error) {
          setError("Error fetching data.");
          setLoading(false);
        }
      };

      fetchStarWarsData();
    }, [favorites]);

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
