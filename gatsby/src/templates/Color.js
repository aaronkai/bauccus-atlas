// import { graphql, Link } from 'gatsby';
// import React from 'react';
// import Img from 'gatsby-image';
// import styled from 'styled-components';
// import WineFilter from '../components/wineFilter';

// export const query = graphql`
//   query($color: String!) {
//     wines: allSanityWine(filter: { color: { eq: $color } }) {
//       nodes {
//         id
//         name
//         color
//         region
//         year
//         slug {
//           current
//         }
//         image {
//           asset {
//             fluid(maxWidth: 800) {
//               ...GatsbySanityImageFluid
//             }
//           }
//         }
//         vintner {
//           name
//           country
//           image {
//             asset {
//               fluid(maxWidth: 800) {
//                 ...GatsbySanityImageFluid
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const WineStyles = styled.div`
//   display: grid;
//   /*Take your row sizing not from wineStyles div but from the WineGridStyles grid */
//   @supports not (grid-template-rows: subgrid) {
//     --rows: auto auto 1fr;
//   }
//   grid-template-rows: var(--rows, subgrid);
//   grid-row: span 3;
//   grid-gap: 1rem;
//   h2,
//   p {
//     margin: 0;
//   }
// `;

// function SingleWine({ wine }) {
//   return (
//     <WineStyles>
//       <Link to={`/wine/${wine.slug.current}`}>
//         <h2>
//           <span className="mark">{wine.name}</span>
//         </h2>
//       </Link>

//       <p>
//         {wine.region}, {wine.year}
//       </p>
//       <Img fluid={wine.image.asset.fluid} alt={wine.name} />
//     </WineStyles>
//   );
// }

// const WineGridStyles = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 4rem;
//   grid-auto-rows: auto auto 400px;
// `;

// export default function WineColorList(props) {
//   return (
//     <>
//       <WineFilter />
//       <WineGridStyles>
//         {props.data.wines.nodes.map((wine) => (
//           <SingleWine key={wine.id} wine={wine} />
//         ))}
//       </WineGridStyles>
//     </>
//   );
// }
