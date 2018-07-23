const autoprefixer = require('autoprefixer');
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
    'gatsby-plugin-react-next',
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
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
        name: 'img',
        path: `${__dirname}/src/resources/images`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [
          autoprefixer({ browsers: ['last 2 versions', '> 1% in US', 'iOS >= 6'] }),
          cssnano(),
          flexbugs(),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.nickveale.com',
        sitemap: 'https://www.nickveale.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
  ],
};
