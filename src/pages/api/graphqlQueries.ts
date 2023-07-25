import { gql } from "graphql-request";

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
export const allPeopleQuery = gql`
  query {
    allPeople {
      people {
        id
        gender
        name
      }
    }
  }
`;
