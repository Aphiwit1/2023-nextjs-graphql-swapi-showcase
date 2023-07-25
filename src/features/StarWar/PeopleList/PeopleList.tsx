import { PeopleListProps, People } from "./interface";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { WithPeopleList } from "./WithPeopleList";
import PeopleFavoriteList from "../PeopleFavoriteList/PeopleFavoriteList";

const PeopleList = ({
  data,
  favorites,
  handleToggleFavorite,
}: PeopleListProps) => (
  <section className="flex flex-col items-center p-4 bg-slate-900">
    {/* Fav List */}
    <PeopleFavoriteList
      favorites={favorites}
      data={data}
      handleToggleFavorite={handleToggleFavorite}
    />

    {/*  ALl List  */}
    <div className="bg-slate-900 m-4">
      <h1 className="text-2xl text-center m-5">
        <span className="bg-yellow-400 p-2 ">All Star Wars People</span>
      </h1>
      {data && (
        <>
          <section className="flex flex-wrap justify-center">
            {data.map((film: People) => (
              <div
                key={film.id}
                className="relative bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer lightSaberYellowClass"
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
                  {film.name}
                </h3>
                <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                  {film.gender}
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  </section>
);

const WrappedComponent = WithPeopleList(PeopleList);
export default WrappedComponent;
