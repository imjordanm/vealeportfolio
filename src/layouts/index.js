import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
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
      document.fonts.load('700 1em Glacial IndifferenceSubset').then(() => {
        document.documentElement.className += ' fonts-loaded-1';
        Promise.all([
          document.fonts.load('400 1em Glacial Indifference'),
          document.fonts.load('700 1em Glacial Indifference'),
          document.fonts.load('700 1em Trueno ExBold'),
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
  <React.Fragment>
    <Helmet
      title="Nick Veale - Film Composer"
      meta={[
        {
          name: 'description',
          content:
            'Nick Veale is a professional composer based in Wellington, New Zealand. He composes and produces music for film, advertisements and creative projects.',
        },
        {
          name: 'keywords',
          content: 'Film composer advertisement ad New Zealand music producer musician Nick Veale',
        },
      ]}
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-16x16.png',
        },
      ]}
    />

    {typeof window !== 'undefined' && matchMedia('screen and (min-width: 901px)').matches ? (
      <Scrollbars
        universal
        hideTracksWhenNotNeeded
        renderTrackVertical={props => <div {...props} className="track-vertical" />}
      >
        <main className="container">
          <Header pages={data.allMarkdownRemark.edges} />
          {children()}
        </main>
      </Scrollbars>
    ) : (
      <main className="container">
        <Header pages={data.allMarkdownRemark.edges} />
        {children()}
      </main>
    )}
  </React.Fragment>
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
