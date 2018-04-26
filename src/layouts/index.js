import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/header';
import { Scrollbars } from 'react-custom-scrollbars';

import '../styles/main.scss';

if (typeof window !== 'undefined') {
  if ('fonts' in document) {
    // Optimization for Repeat Views
    if (sessionStorage.fontsLoadedCriticalFoftDataUri) {
      // only stage 2 needed here, the subset isn’t needed anymore
      document.documentElement.className += ' fonts-loaded-2';
      // return;
    } else {
      document.fonts.load('700 1em Glacial IndifferenceSubset').then(() => {
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

export default ({ children, data }) => (
  <div>
    <Helmet
      title="Nick Veale - Film Composer"
      meta={[
        { name: 'description', content: 'Film composer and musician Nick Veale' },
        { name: 'keywords', content: 'Film composer and musician Nick Veale' },
      ]}
    />

    <Scrollbars autoHide autoHideTimeout={1000} style={{ width: '100%', minHeight: '100vh' }}>
      <main className="container">
        <Header pages={data.allMarkdownRemark.edges} />
        {children()}
      </main>
    </Scrollbars>
  </div>
);

export const pageQuery = graphql`
  query pagesQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      edges {
        node {
          frontmatter {
            path
            title
            order
          }
        }
      }
    }
  }
`;
