
import Navbar from '@/features/Navbar/Navbar';
import { GraphQLClient } from 'graphql-request';
import { allPeopleQuery, getPostsQuery } from './api/graphqlQueries';
import { People } from '@/features/StarWar/PeopleList/interface';
import { Film } from '@/features/StarWar/StarWarsList/interface';
import StarWarsList from '@/features/StarWar/StarWarsList/StarWarsList';
import PeopleList from '@/features/StarWar/PeopleList/PeopleList';


interface HomeProps {
  films: Film[];
  people: People[];
}

export default function Home({ films, people }: HomeProps) {

  return (
    <>
      <Navbar />
      <StarWarsList films={films} />
      <PeopleList people={people}/>
    </>
  );
}

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient('https://swapi-graphql.netlify.app/.netlify/functions/index');

  try {
    const data: { allFilms: { films: Film[] } } = await graphQLClient.request(getPostsQuery);
    const films = data.allFilms.films;

    const dataPeople: { allPeople: { people: People[] } } = await graphQLClient.request(allPeopleQuery);
    const people = dataPeople.allPeople.people;

    return { props: { films, people } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { films: [], people: [] } };
  }
}