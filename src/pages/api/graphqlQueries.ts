import { gql } from 'graphql-request';

export const getPostsQuery = gql`
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