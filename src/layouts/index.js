import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/header';

import '../styles/main.scss';

if (typeof window !== 'undefined') {
  if ('fonts' in document) {
    // Optimization for Repeat Views
    if (sessionStorage.fontsLoadedCriticalFoftDataUri) {
      // only stage 2 needed here, the subset isn’t needed anymore
      document.documentElement.className += ' fonts-loaded-2';
      // return;
    } else {
      document.fonts.load('1em Glacial IndifferenceSubset').then(() => {
        document.documentElement.className += ' fonts-loaded-1';
        Promise.all([
          document.fonts.load('400 1em Glacial Indifference'),
          document.fonts.load('700 1em Glacial Indifference'),
          document.fonts.load('italic 1em Glacial Indifference'),
        ]).then(() => {
          document.documentElement.className += ' fonts-loaded-2';
          // Optimization for Repeat Views
          sessionStorage.fontsLoadedCriticalFoftDataUri = true;
        });
      });
    }
  }
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
