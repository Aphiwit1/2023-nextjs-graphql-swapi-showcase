import React from "react";

import { Film, StarWarsListProps } from "./interface";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import FavoriteList from "../FavoriteList/FavoriteList";
import { WithStarWarsList } from "./WithStarWarsList";
import { FilmClass } from "@/models/Film";

const StarWarsList: React.FC<StarWarsListProps> = ({data,
  favorites,
  handleToggleFavorite}: any) => (
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

          {data && (
            <>
              <section className="flex flex-wrap justify-center">
                {data.map((film: FilmClass) => (
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
                    Release Date:  {film.releaseDate}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Director: {film.director}
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


const WrappedComponent = WithStarWarsList(StarWarsList);
export default WrappedComponent;