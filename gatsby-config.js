const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

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
        postCssPlugins: [autoprefixer({ browsers: ['last 2 versions'] }), cssnano()],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
  ],
};
