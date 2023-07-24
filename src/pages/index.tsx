
import Navbar from '@/features/Navbar/Navbar';
import StarWarsListV2 from '@/features/StarWarsListV2/StarWarsListV2';
import { GraphQLClient } from 'graphql-request';
import { getPostsQuery } from './api/graphqlQueries';
import { Film, filmsProp } from '@/features/StarWarsListV2/interface';


// Type แปลกๆ อย่าลืมมาดูด้วยนะ 
export default function Home({ films }:filmsProp) {
  return (
    <>
      <Navbar/>
      {/* <StarWarsList/> */}
      <StarWarsListV2 films={films}/>
    </>
  )
}

interface GraphQLResponse {
  allFilms: {
    films: Film[];
  };
}

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient('https://swapi-graphql.netlify.app/.netlify/functions/index');
  try {
    const data:GraphQLResponse = await graphQLClient.request(getPostsQuery);
    console.log('data >>>>', data)
    const films = data.allFilms.films;

    return { props: { films } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { films: [] } };
  }
}