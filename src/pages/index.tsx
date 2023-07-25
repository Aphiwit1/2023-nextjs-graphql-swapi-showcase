
import Navbar from '@/features/Navbar/Navbar';
import StarWarsListV2 from '@/features/StarWarsListV2/StarWarsListV2';
import { GraphQLClient } from 'graphql-request';
import { allPeopleQuery, getPostsQuery } from './api/graphqlQueries';
// import { filmsProp } from '@/features/StarWarsListV2/interface';
import PeopleList from '@/features/PeopleList/PeopleList';
import { Film } from '@/features/StarWarsListV2/interface';
import { People } from '@/features/PeopleList/interface';

interface HomeProps {
  films: Film[];
  people: People[];
}

export default function Home({ films, people }: HomeProps) {

  return (
    <>
      <Navbar />
      <StarWarsListV2 films={films} />
      <PeopleList people={people}/>
    </>
  );
}

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient('https://swapi-graphql.netlify.app/.netlify/functions/index');

  try {
    const data: { allFilms: { films: Film[] } } = await graphQLClient.request(getPostsQuery);
    console.log('data >>>>', data);
    const films = data.allFilms.films;

    const dataPeople: { allPeople: { people: People[] } } = await graphQLClient.request(allPeopleQuery);
    console.log('dataPeople >>>>', dataPeople);
    const people = dataPeople.allPeople.people;

    return { props: { films, people } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { films: [], people: [] } };
  }
}