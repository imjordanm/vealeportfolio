const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const flexbugs = require('postcss-flexbugs-fixes');

module.exports = {
  siteMetadata: {
    title: 'Nick Veale',
    subtitle: 'Musician and Film Composer',
    siteUrl: 'https://heuristic-bhabha-2bbf33.netlify.com/',
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
      resolve: 'gatsby-plugin-sitemap',
    },
  ],
};
