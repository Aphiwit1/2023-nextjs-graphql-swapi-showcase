import { FavoritePeopleProps } from './interface';
import { People } from '../PeopleList/interface';
import { WithPeopleFavoriteList } from './WithPeopleFavoriteList';
import { AiFillStar } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";

const PeopleFavoriteList = ({
    favorites,
    data,
    handleToggleFavorite,
  }: FavoritePeopleProps) => {
  return (
    <div>
       {favorites.length !== 0 && (
        <section className="p-3 border-double border-4 border-yellow-500">
          <h2 className="text-2xl text-center m-5">
            <span className="bg-yellow-400 p-2 ">Favorite Star Wars People</span>
          </h2>

          <ul className="flex flex-wrap justify-center">
            {favorites.map((favId: any) => {
              const favPeople = data?.find(
                (people: People) => people.id === favId
              );
              return (
                <>
                  {favPeople && (
                    <div
                      key={'fav' + favPeople.id}
                      className="relative bg-slate-700 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer lightSaberYellow"
                    >
                      <div className="absolute top-2 right-2">
                        <span
                          onClick={() => handleToggleFavorite(favPeople)}
                          className="inline-flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-400 rounded-md shadow-lg"
                        >
                          <button>{<AiFillStar />}</button>
                        </span>
                      </div>

                      <div className="absolute top-2 left-2 text-yellow-400">
                        {<BsFillBookmarkFill />}
                      </div>

                      <h3 className="text-yellow-500 dark:text-yellow-500 mt-5 text-base font-medium tracking-tight">
                        {favPeople.name}
                      </h3>
                      <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                        {favPeople.gender}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  )
}



const WrappedComponent = WithPeopleFavoriteList(PeopleFavoriteList);
export default WrappedComponent;