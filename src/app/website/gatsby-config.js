// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: path.resolve(__dirname, '../../../', `.env.${process.env.NODE_ENV}`)
});

module.exports = {
  siteMetadata: {
    title: `Dismoi website`,
    description: `Notre projet est de **réinstaurer la liberté d’information partout sur le web**, afin de le rendre plus sûr, plus transparent et plus favorable aux alternatives. DisMoi est un réseau en surcouche du web qui permet aux internautes de **se conseiller et de
s'éclairer directement sur les pages du web qu’ils visitent**.`,
    author: `Dismoi Team`,
    siteUrl: `https://dismoi.io/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/src/contents`
      }
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ['BACKEND_ORIGIN']
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-mdx',
    'gatsby-plugin-i18n',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: `${__dirname}/src/components/Layout.tsx`
      }
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        app: [path.join(__dirname, '../../', 'app')],
        components: [path.join(__dirname, '../../', 'components')],
        libs: [path.join(__dirname, '../../', 'libs')],
        utils: [path.join(__dirname, '../../', 'utils')],
        assets: [path.join(__dirname, '../../', 'assets')],
        types: [path.join(__dirname, '../../', 'types')]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
