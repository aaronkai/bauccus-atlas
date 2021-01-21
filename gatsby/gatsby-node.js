import path from 'path';
import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function fetchRedWinesAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch a list of wines
  const resp = await fetch('https://api.sampleapis.com/wines/reds');
  const reds = await resp.json();
  // 2. Loop over each one
  for (const wine of reds) {
    const nodeMeta = {
      id: createNodeId(`wine-${wine.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Wine',
        mediaType: 'application/json',
        contentDigest: createContentDigest(wine),
      },
    };
    actions.createNode({
      ...wine,
      ...nodeMeta,
    });
  }
  // 3. Create a node for that wine
}

export async function sourceNodes(params) {
  await Promise.all([fetchRedWinesAndTurnIntoNodes(params)]);
}

async function turnWinesIntoPages({ graphql, actions }) {
  // 1.Get a template for this page
  const wineTemplate = path.resolve('./src/templates/Wine.js');
  // 2. Query all wines
  const { data } = await graphql(`
    query {
      wines: allSanityWine {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each Wine and create a page for it
  data.wines.nodes.forEach((wine) => {
    actions.createPage({
      path: `wine/${wine.slug.current}`,
      component: wineTemplate,
      context: {
        slug: wine.slug.current,
      },
    });
  });
}

async function turnColorsIntoPages({ graphql, actions }) {
  // 1.Get a template for this page
  const descriptorTemplate = path.resolve('./src/pages/wineList.js');
  // 2. Query all wines colors
  const { data } = await graphql(`
    query {
      wines: allSanityWine {
        nodes {
          color
        }
      }
    }
  `);

  const allColors = data.wines.nodes.map((wine) => wine.color);
  const uniqueColors = Array.from(new Set(allColors));
  uniqueColors.forEach((color) => {
    actions.createPage({
      path: `wineList/${color}`,
      component: descriptorTemplate,
      context: {
        color,
      },
    });
  });
}

async function turnCountriesIntoPages({ graphql, actions }) {
  // 1.Get a template for this page
  const countryTemplate = path.resolve('./src/pages/wineList.js');
  // 2. Query all wines
  const { data } = await graphql(`
    query {
      wines: allSanityWine {
        nodes {
          vintner {
            country
          }
        }
      }
    }
  `);
  // 3. Loop over each Wine and create a page for it
  const allCountries = data.wines.nodes.map((wine) => wine.vintner.country);
  const uniqueCountries = Array.from(new Set(allCountries));
  uniqueCountries.forEach((country) => {
    actions.createPage({
      path: `wineList/${country}`,
      component: countryTemplate,
      context: {
        country,
      },
    });
  });
}

async function turnVintnersIntoPages({ graphql, actions }) {
  // query all vintners
  const { data } = await graphql(`
    query MyQuery {
      allSanityVintner {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // turn each vintners into their own page
  // figure out how many pages there are based on how many slicemasters there are, and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.allSanityVintner.totalCount / pageSize);
  // loop from 1 to n and create pages for them
  for (let i = 0; i < pageCount; i++) {
    actions.createPage({
      path: `/vintners/${i + 1}`,
      component: path.resolve('./src/pages/vintners.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  }

  data.allSanityVintner.nodes.forEach((vintner) => {
    actions.createPage({
      path: `/vintner/${vintner.slug.current}`,
      component: path.resolve('./src/pages/vintner.js'),
      context: {
        id: vintner.id,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // 1.Wines
  await Promise.all([
    turnWinesIntoPages(params),
    turnColorsIntoPages(params),
    turnCountriesIntoPages(params),
    turnVintnersIntoPages(params),
  ]);
  // 2. Vintners?
}
