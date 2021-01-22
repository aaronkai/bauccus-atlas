import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const AdjectiveStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 0 1rem;
      align-items: center;
      padding 5px;
      background: var(--grey);
      border-radius: 2px;
      font-size: clamp(1.5rem, 1.5vw, 2.5rem);
      .count {
          background: white;
          padding 2px 5px;
      }
      &[aria-current="page"] {
          background: var(--yellow);
      }
  }
`;

function countWineAttibutes(wines) {
  const attributeCounts = wines
    .map((wine) => [wine.color, wine.vintner.country])
    .flat()
    .reduce((acc, attribute) => {
      const existingAttribute = acc[attribute];
      if (existingAttribute) {
        existingAttribute.count += 1;
      } else {
        acc[attribute] = {
          name: attribute,
          count: 1,
        };
      }
      return acc;
    }, {});

  const attributesSortedArray = Object.values(attributeCounts).sort(
    (a, b) => b.count - a.count
  );
  return attributesSortedArray;
}

export default function WineFilter() {
  // get list of all wine-colors, wine country, ratings, maybe price groups eventually
  const wineQuery = useStaticQuery(graphql`
    query MyQuery {
      wines: allSanityWine {
        nodes {
          id
          color
          price
          rating
          vintner {
            country
          }
        }
      }
    }
  `);

  return (
    <AdjectiveStyles>
      <Link key="allStyles" to="/wineList">
        <span className="name">All</span>
        <span className="count">{wineQuery.wines.nodes.length}</span>
      </Link>
      {countWineAttibutes(wineQuery.wines.nodes).map((attribute) => (
        <Link key={attribute.name} to={`/wineList/${attribute.name}`}>
          <span className="attribute">{attribute.name}</span>
          <span className="count">{attribute.count}</span>
        </Link>
      ))}
    </AdjectiveStyles>
  );
}
