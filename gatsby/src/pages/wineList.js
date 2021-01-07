import React from 'react';
import { graphql } from 'gatsby';
import WineList from '../components/WineList';
import WineFilter from '../components/wineFilter';

export default function WineListPage({
  data: {
    wines: { nodes: wines },
  },
}) {
  return (
    <>
      <WineFilter />
      <WineList wines={wines} />
    </>
  );
}

export const query = graphql`
  query WineQuery($color: String, $country: String) {
    wines: allSanityWine(
      filter: { color: { eq: $color }, vintner: { country: { eq: $country } } }
    ) {
      nodes {
        id
        name
        color
        region
        price
        year
        rating
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        vintner {
          name
        }
      }
    }
  }
`;
// export const query = graphql`
//   query WineQuery($color: String, $country: String) {
//     wines: allSanityWine(
//       filter: { color: { eq: $color }, vintner: { country: { eq: $country } } }
//     ) {
//       nodes {
//         id
//         name
//         color
//         region
//         price
//         year
//         rating
//         description
//         slug {
//           current
//         }
//         image {
//           ...ImageWithPreview
//         }
//         vintner {
//           name
//         }
//       }
//     }
//   }
// `;
