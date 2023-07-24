
import Navbar from '@/features/Navbar/Navbar';
import StarWarsListV2 from '@/features/StarWarsListV2/StarWarsListV2';
import { GraphQLClient, gql } from 'graphql-request';


const getPostsQuery = gql`
  query {
    allFilms {
      films {
        id
        title
        director
        releaseDate
      }
    }
  }
`;

export default function Home({ films }:any) {
  return (
    <>
      <Navbar/>
      {/* <StarWarsList/> */}
      <StarWarsListV2 films={films}/>
    </>
  )
}

export async function getStaticProps() {
  // Create a GraphQL client instance pointing to your GraphQL API endpoint
  const graphQLClient = new GraphQLClient('https://swapi-graphql.netlify.app/.netlify/functions/index');

  try {
    // Fetch data using graphql-request and the getPostsQuery
    const data:any = await graphQLClient.request(getPostsQuery);

    // The data object will contain the result of your GraphQL query
    // In this example, we assume that the GraphQL response contains an "allFilms" property with a "films" array
    const films = data.allFilms.films;

    // Return the data as props to the component
    return { props: { films } };
  } catch (error) {
    // Handle errors appropriately (e.g., log, display a fallback, etc.)
    console.error('Error fetching data:', error);
    return { props: { films: [] } };
  }
}