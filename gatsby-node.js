const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const pageTemplate = path.resolve('src/templates/page.js');

  return graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              title
              order
              items {
                item {
                  title
                  artist
                  cover
                  category
                  description
                  year
                  genre
                  video
                  heading
                  music
                }
              }
            }
            html
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: pageTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-html') {
    config.loader('null', {
      test: /flickity/,
      loader: 'null-loader',
    });
  }
};
