import React from "react";
import { People, PeopleListProps } from "./interface";

const PeopleList: React.FC<PeopleListProps> = ({ people }: PeopleListProps) => (
  <div>
    <section className="flex flex-col items-center p-4 bg-slate-900">
      {/* People List */}
      <div className="bg-slate-900 m-4">
        <h1 className="text-2xl text-center m-5">
          <span className="bg-yellow-400 p-2">All Star Wars People</span>
        </h1>

        {people && (
          <>
            <section className="flex flex-wrap justify-center">
              {people.map((person: People) => (
                <div
                  key={"person" + person.id}
                  className="relative bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer lightSaberBlueClass "
                >
                  <h3 className="text-white mt-5 text-base font-medium tracking-tight">
                    {person.name}
                  </h3>
                  <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Gender: {person.gender}
                  </div>
                 
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </section>
  </div>
);

export default PeopleList;