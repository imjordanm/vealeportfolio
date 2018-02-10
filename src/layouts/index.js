import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/header';
import Link from 'gatsby-link';

import '../styles/main.scss';

let WebFont;
if (typeof window !== 'undefined') {
  WebFont = require('webfontloader');
  WebFont.load({
    google: {
      families: ['Work+Sans:400,500,700'],
    },
    timeout: 2000,
  });
}

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Nick Veale"
      meta={[
        { name: 'description', content: 'musician and composer nick veale' },
        { name: 'keywords', content: 'musician, composer, artist, nick veale' },
      ]}
    />

    <main className="container">
      <Header />
      <ul className="side-text">
        <li className="left">Introduction</li>
        <li className="right">
          <Link to="/">Nick Veale</Link>
        </li>
      </ul>
      {children()}
    </main>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
