import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';

import '../styles/main.scss';

let WebFont;
if (typeof window !== 'undefined') {
  WebFont = require('webfontloader');
  WebFont.load({
    google: {
      families: ['Nunito Sans:400,700'],
    },
    timeout: 2000,
  });
}

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

export default ({ children, data }) => (
  <div>
    <Helmet
      title="Nick Veale"
      meta={[
        { name: 'description', content: 'Film composer and musician Nick Veale' },
        { name: 'keywords', content: 'Film composer and musician Nick Veale' },
      ]}
    />

    <main className="container">
      <Header pages={data.allMarkdownRemark.edges} />
      {children()}
    </main>
  </div>
);

export const pageQuery = graphql`
  query pagesQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`;
