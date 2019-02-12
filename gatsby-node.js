const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      }
    }

    if (node.frontmatter.relpath) {
      if (node.frontmatter.image) {
        const imagepath = node.frontmatter.relpath + node.frontmatter.image;

        createNodeField({
          node,
          name: 'imageLink',
          value: imagepath,
        });
      }
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('src/templates/page.js');

    resolve(graphql(`
        query {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                id
                frontmatter {
                  title
                  order
                }
                html
              }
            }
          }
        }
      `)
      .then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.templateKey) {
            createPage({
              path: edge.node.fields.slug,
              component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
              context: {
                id: edge.node.id,
              },
            });
          }
        });
        resolve();
      })
      .catch(err => {
        console.log(err);
      }));
  });
};

exports.onCreateWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-html') {
    config.loader('null', {
      test: /flickity/,
      loader: 'null-loader',
    });
  }
};
