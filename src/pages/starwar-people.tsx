import { GraphQLClient } from "graphql-request";
import React from "react";
import { allPeopleQuery, getPostsQuery } from "./api/graphqlQueries";
import Navbar from "@/features/Navbar/Navbar";
import { People } from "@/features/StarWar/PeopleList/interface";
import PeopleList from "@/features/StarWar/PeopleList/PeopleList";
interface StarWarPeopleProps {
  people: People[];
}

const starwarPeople = ({ people }: StarWarPeopleProps) => {
  return (
    <>
      <Navbar />
      <PeopleList people={people}  />
    </>
  );
};
export default starwarPeople;

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient(
    "https://swapi-graphql.netlify.app/.netlify/functions/index"
  );
  try {

    const dataPeople: { allPeople: { people: People[] } } =
      await graphQLClient.request(allPeopleQuery);
    const people = dataPeople.allPeople.people;
    return { props: { people } };

  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { people: [] } };
  }
}
