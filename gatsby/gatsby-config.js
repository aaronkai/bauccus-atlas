require('dotenv').config({
  path: `.env.${process.env}`,
});

module.exports = {
  siteMetadata: {
    title: `Baccus' Atlas`,
    description: `A place to keep track of your wine.`,
  },
  // flags: {
  //   FAST_REFRESH: true,
  // },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wine Journal`,
        short_name: `Wine Journal`,
        description: `Keep track of your wine.`,
        lang: `en`,
        display: `standalone`,
        icon: `static/favicon.svg`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#fff`,
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '13dsh1bo',
        dataset: 'production',
        watchMode: false,
        token: process.env.SANITY_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-sanity-image',
      options: {
        // Sanity project info (required)
        projectId: '13dsh1bo',
        dataset: 'production',
      },
    },
  ],
};
