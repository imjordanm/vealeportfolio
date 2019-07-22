import React from 'react';
import Helmet from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../components/header';
import { StaticQuery, graphql } from 'gatsby';

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

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query pagesQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___order], order: ASC }
          filter: { frontmatter: { order: { ne: null } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                order
              }
              parent {
                ... on File {
                  name
                }
              }
            }
          }
        }
        file(relativePath: { eq: "page/home.md" }) {
          name
          childMarkdownRemark {
            frontmatter {
              metaTitle
              metaDescription
              keywords
            }
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <Helmet>
          <title>{data.file.childMarkdownRemark.frontmatter.metaTitle}</title>
          <meta
            name="description"
            content={data.file.childMarkdownRemark.frontmatter.metaDescription}
          />
          <meta name="keywords" content={data.file.childMarkdownRemark.frontmatter.keywords} />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </Helmet>

        {typeof window !== 'undefined' && matchMedia('screen and (min-width: 901px)').matches ? (
          <Scrollbars
            universal
            hideTracksWhenNotNeeded
            renderTrackVertical={props => <div {...props} className="track-vertical" />}
          >
            <main className="container">
              <Header pages={data.allMarkdownRemark.edges} />
              {children}
            </main>
          </Scrollbars>
        ) : (
          <main className="container">
            <Header pages={data.allMarkdownRemark.edges} />
            {children}
          </main>
        )}
      </React.Fragment>
    )}
  />
);
