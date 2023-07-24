import React, { useEffect, useState } from "react";

import { Film } from "./interface";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import FavoriteList from "../FavoriteList/FavoriteList";
const StarWarsListV2: React.FC<any> = (props) => {
  const { films } = props;
  const [data, setData] = useState<Film[] | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('films >>>>', films)
  // useEffect(() => {
  //   const fetchStarWarsData = async () => {
  //     try {
  //       if (films) {
  //         const filmsWithFavProp = films.map((film: Film) => ({
  //           ...film,
  //           isFav: favorites.includes(film.id),
  //         }));

  //         setData(filmsWithFavProp);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       setError("Error fetching data.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchStarWarsData();
  // }, []);

  // useEffect(() => {
  //   setData((prevData) => {
  //     return (
  //       prevData?.map((film: Film) => ({
  //         ...film,
  //         isFav: favorites.includes(film.id),
  //       })) ?? []
  //     );
  //   });
  // }, [favorites]);


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  const handleToggleFavorite = (film: Film) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(film.id)
        ? prevFavorites.filter((favId) => favId !== film.id)
        : [...prevFavorites, film.id]
    );
  };



  return (
    <div>
      {/* Your component UI here */}
      <section className="flex flex-col items-center p-4 bg-slate-900">
        {/* Fav List */}
        <div>
          <FavoriteList
            favorites={favorites}
            data={data}
            handleToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/*  ALl List  */}
        <div className="bg-slate-900 m-4">
          <h1 className="text-2xl text-center m-5">
            <span className="bg-yellow-400 p-2 ">All Star Wars Films</span>
          </h1>

          {films && (
            <>
              <section className="flex flex-wrap justify-center">
                {films.map((film: Film) => (
                  <div
                    key={"film" + film.id}
                    className="relative bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer lightSaberBlueClass "
                  >
                    <div className="absolute top-2 right-2">
                      <span
                        onClick={() => handleToggleFavorite(film)}
                        className="inline-flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-400 rounded-md shadow-lg"
                      >
                        <button>
                          {film.isFav ? <AiFillStar /> : <AiOutlineStar />}
                        </button>
                      </span>
                    </div>

                    <h3 className="text-white mt-5 text-base font-medium tracking-tight">
                      {film.title}
                    </h3>
                    <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {film.releaseDate}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {film.director}
                    </p>
                  </div>
                ))}
              </section>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default StarWarsListV2;
