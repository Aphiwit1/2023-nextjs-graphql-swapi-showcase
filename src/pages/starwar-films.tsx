import StarWarsList from '@/features/StarWar/StarWarsList/StarWarsList'
import { GraphQLClient } from 'graphql-request'
import React from 'react'
import { getPostsQuery } from './api/graphqlQueries'
import { Film } from '@/features/StarWar/StarWarsList/interface'
import Navbar from '@/features/Navbar/Navbar'

interface StarWarFilmProps {
  films: Film[];
}

const starwarFilm = ({films}: StarWarFilmProps) => {
  return (
    <>
        <Navbar />
        <StarWarsList films={films} />
    </>
  )
}
export default starwarFilm

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient('https://swapi-graphql.netlify.app/.netlify/functions/index');

  try {
    const data: { allFilms: { films: Film[] } } = await graphQLClient.request(getPostsQuery);
    const films = data.allFilms.films;
    // console.log(">>", films)

    return { props: { films } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { films: [] } };
  }
}