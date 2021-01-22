import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

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
  grid-template-columns: repeat(auto-fill, minmax(250px, 450px));
  justify-content: center;
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
    vintners: { totalCount, nodes: vintners },
  },
  pageContext,
}) {
  return (
    <>
      <SEO title={`Vintners - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/vintners"
      />
      <VintnerGrid>
        {vintners.map((vintner) => (
          <VintnerStyles key={vintner.id}>
            <Link key={vintner.id} to={`/vintner/${vintner.slug.current}`}>
              <h2>
                <span className="mark">{vintner.name}</span>
              </h2>
            </Link>
            <Img fluid={vintner.image.asset.fluid} />
            <p className="description">{vintner.description}</p>
          </VintnerStyles>
        ))}
      </VintnerGrid>
    </>
  );
}
