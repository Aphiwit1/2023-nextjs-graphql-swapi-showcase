
import Navbar from '@/features/Navbar/Navbar';
import StarWarsListV2 from '@/features/StarWarsListV2/StarWarsListV2';
import { GraphQLClient } from 'graphql-request';
import { getPostsQuery } from './api/graphqlQueries';
import { filmsProp } from '@/features/StarWarsListV2/interface';
import PeopleList from '@/features/PeopleList/PeopleList';


// Type แปลกๆ อย่าลืมมาดูด้วยนะ 
export default function Home({ films }:filmsProp) {
  return (
    <>
      <Navbar/>
      {/* <StarWarsList/> */}
      <StarWarsListV2 films={films}/>
      <PeopleList/>
    </>
  )
}


export async function getStaticProps() {
  const graphQLClient = new GraphQLClient('https://swapi-graphql.netlify.app/.netlify/functions/index');
  try {
    const data:any = await graphQLClient.request(getPostsQuery);
    console.log('data >>>>', data)
    const films = data.allFilms.films;

    return { props: { films } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { films: [] } };
  }
}