import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

export const query = graphql`
  query externalWineQuery {
    allWine {
      nodes {
        wine
        winery
        location
        image
        id
        rating {
          average
          reviews
        }
      }
    }
  }
`;

const WineStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
`;

function SingleWine({ wine }) {
  return (
    <>
      <SEO title="External Partners" />
      <WineStyles>
        <img src={wine.image} alt={wine.wine} />
        <h3>
          <span className="mark">{wine.wine}</span>
        </h3>
        <p>
          Winery: {wine.winery}, {wine.location}
        </p>
      </WineStyles>
    </>
  );
}

const WineGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export default function ExternalWinesPage({
  data: {
    allWine: { nodes: wines },
  },
}) {
  return (
    <>
      <h1 className="center">Check out these wines from our partners!</h1>

      <WineGridStyles>
        {wines.map((wine) => (
          <SingleWine key={wine.id} wine={wine} />
        ))}
      </WineGridStyles>
    </>
  );
}
