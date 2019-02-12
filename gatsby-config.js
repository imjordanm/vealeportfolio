const cssnano = require('cssnano');
const flexbugs = require('postcss-flexbugs-fixes');

module.exports = {
  siteMetadata: {
    title: 'Nick Veale',
    subtitle: 'Composer and Musician',
    siteUrl: 'https://www.nickveale.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-lodash',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/layout/index.js'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static/images',
        path: `${__dirname}/static/images`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [cssnano(), flexbugs()],
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.nickveale.com',
        sitemap: 'https://www.nickveale.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/', disallow: '/home' }],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.nickveale.com',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
  ],
};
