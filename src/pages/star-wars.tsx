import React from "react";

import { GraphQLClient } from "graphql-request";
import { AllFilmsResponse, Film } from "@/features/StarWarsListV2/interface";
import StarWarsListV2 from "@/features/StarWarsListV2/StarWarsListV2";

const StarWarsPage = ({ data }:any) => {
  console.log('')
  return <StarWarsListV2 data={data} />;
};

export async function getStaticProps() {
  console.log('getStaticProps call >>>>>', )
  const apiUrl = "https://swapi-graphql.netlify.app/.netlify/functions/index";
  const query = `
    {
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

  try {
    const client = new GraphQLClient(apiUrl);
    const response: AllFilmsResponse = await client.request(query);

    // You can perform any data manipulation here if needed
    const filmsWithFavProp = response.allFilms.films.map((film: Film) => ({
      ...film,
      isFav: false, // We don't have 'favorites' during build time, so set to false by default
    }));

    console.log('filmsWithFavProp >>>>>', filmsWithFavProp)

    return {
      props: {
        data: filmsWithFavProp,
      },
      revalidate: 3600, // Optional: Number of seconds after which to revalidate the data (1 hour in this case)
    };
  } catch (error) {
    return {
      props: {
        error: "Error fetching data.",
      },
    };
  }
}

export default StarWarsPage;