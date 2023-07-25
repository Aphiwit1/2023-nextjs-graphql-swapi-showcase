import { FavoriteFilmsProps } from "./interface";
import { AiFillStar } from "react-icons/ai";
import { WithFavoriteList } from "./WithFavoriteList";
import { BsFillBookmarkFill } from "react-icons/bs";
import { Film } from "../StarWarsList/interface";


const FavoriteList = ({
  favorites,
  data,
  handleToggleFavorite,
}: FavoriteFilmsProps) => (
  //   const { favorites, data, handleToggleFavorite } = props;
  <>
    {favorites.length !== 0 && (
      <section className="p-3 border-double border-4 border-yellow-500">
        <h2 className="text-2xl text-center m-5">
          <span className="bg-yellow-400 p-2 ">Favorite Star Wars Films</span>
        </h2>

        <ul className="flex flex-wrap justify-center">
          {favorites.map((id: string) => {
            const favFilm = data?.find((film: Film) => film.id === id);
            return (
              <>
                {favFilm && (
                  <div
                    key={'fav' + favFilm.id}
                    className="relative bg-slate-700 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer lightSaberBlue"
                  >
                    <div className="absolute top-2 right-2">
                      <span
                        onClick={() => handleToggleFavorite(favFilm)}
                        className="inline-flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-400 rounded-md shadow-lg"
                      >
                        <button>{<AiFillStar />}</button>
                      </span>
                    </div>

                    <div className="absolute top-2 left-2 text-yellow-400">
                      {<BsFillBookmarkFill />}
                    </div>

                    <h3 className="text-yellow-500 dark:text-yellow-500 mt-5 text-base font-medium tracking-tight">
                      {favFilm.title}
                    </h3>
                    <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {favFilm.releaseDate}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {favFilm.director}
                    </p>
                  </div>
                )}
              </>
            );
          })}
        </ul>
      </section>
    )}
  </>
);

const WrappedComponent = WithFavoriteList(FavoriteList);
export default WrappedComponent;
