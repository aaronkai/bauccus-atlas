import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

// export const query = graphql`
//   query($id: String) {
//     vintners: allSanityVintner(filter: { id: { eq: $id } }) {
//       totalCount
//       nodes {
//         country
//         id
//         image {
//           asset {
//             fluid(maxWidth: 400) {
//               ...GatsbySanityImageFluid
//             }
//           }
//         }
//         description
//         name
//         slug {
//           current
//         }
//       }
//     }
//   }
// `;

export const query = graphql`
  query($id: String) {
    vintner: sanityVintner(id: { eq: $id }) {
      id
      description
      country
      image {
        asset {
          fluid(maxWidth: 10) {
            ...GatsbySanityImageFluid
          }
        }
      }
      name
      slug {
        current
      }
    }
  }
`;

const VintnerGrid = styled.div`
  display: grid;
  grid-template-columns: 12.5% 75% 12.5%;
`;

const VintnerStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
  }
`;

export default function VintnerPage({ data: { vintner } }) {
  return (
    <>
      <SEO title="vintner.name" image={vintner.image.asset.src} />
      <VintnerGrid>
        <div />
        <VintnerStyles>
          <Link key={vintner.id} to={`/vintner/${vintner.slug.current}`}>
            <h2>
              <span className="mark">{vintner.name}</span>
            </h2>
          </Link>
          <Img fluid={vintner.image.asset.fluid} />
          <p className="description">{vintner.description}</p>
        </VintnerStyles>
      </VintnerGrid>
    </>
  );
}
