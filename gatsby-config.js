const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  siteMetadata: {
    title: 'Nick Veale',
    subtitle: 'Musician and Film Composer',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [autoprefixer({ browsers: ['last 2 versions'] }), cssnano()],
      },
    },
  ],
};
