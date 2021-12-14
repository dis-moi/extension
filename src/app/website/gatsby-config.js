// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadEnv = require('../../../loadEnv');

process.env.FACET = process.env.FACET || 'dismoi';

loadEnv({ path: path.resolve('../../../') });

module.exports = {
  siteMetadata: {
    title: process.env.FACET_NAME || 'DisMoi',
    description: `Notre projet est de **réinstaurer la liberté d’information partout sur le web**, afin de le rendre plus sûr, plus transparent et plus favorable aux alternatives. DisMoi est un réseau en surcouche du web qui permet aux internautes de **se conseiller et de
s’éclairer directement sur les pages du web qu’ils visitent**.`,
    author: `Dismoi Team`,
    siteUrl: process.env.WEBSITE_URL || 'https://'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    // {
    //   resolve: 'gatsby-plugin-copy-files-enhanced',
    //   options: {
    //     source: `${__dirname}/../../../node_modules/webextension-polyfill/dist/browser-polyfill.js`,
    //     destination: '/script/',
    //     purge: true
    //   }
    // },
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
        path:
          process.env.FACET === 'lmel'
            ? `${__dirname}/src/contentsLeMeme`
            : `${__dirname}/src/contentsDisMoi`
      }
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          'BACKEND_ORIGIN',
          'FACET',
          'FACET_NAME',
          'WEBSITE_URL',
          'CHROME_STORE_URL',
          'FIREFOX_STORE_URL'
        ]
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
