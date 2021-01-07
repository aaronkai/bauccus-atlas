import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    vintners: allSanityVintner(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        country
        id
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        description
        name
        slug {
          current
        }
      }
    }
  }
`;

const VintnerGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
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

export default function VintnersPage({
  data: {
    vintners: { nodes: vintners },
  },
}) {
  console.log(vintners);
  return (
    <>
      <VintnerGrid>
        {vintners.map((vintner) => (
          <VintnerStyles>
            <Link key={vintner.id} to={`/vintner/${vintner.slug.current}`} />
            <h2>
              <span className="mark">{vintner.name}</span>
            </h2>
            <Img fluid={vintner.image.asset.fluid} />
            <p className="description">{vintner.description}</p>
          </VintnerStyles>
        ))}
      </VintnerGrid>
    </>
  );
}