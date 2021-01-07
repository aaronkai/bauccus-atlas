import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

export const query = graphql`
  query($slug: String!) {
    wine: sanityWine(slug: { current: { eq: $slug } }) {
      id
      name
      color
      region
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      vintner {
        name
        country
        image {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const SingleWineStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export default function SingleWinePage({ data: { wine } }) {
  return (
    <SingleWineStyles>
      <Img fluid={wine.image.asset.fluid} alt={wine.name} />
      <div>
        <h2 className="mark"> {wine.name}</h2>
        <ul>
          <li> {wine.color} </li>
          <li>
            {wine.region}, {wine.vintner.country}
          </li>
          <li>Vintner: {wine.vintner.name}</li>
        </ul>
      </div>
    </SingleWineStyles>
  );
}
