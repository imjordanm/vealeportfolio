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
      families: ['Nunito Sans:400,700'],
    },
    timeout: 2000,
  });
}

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Nick Veale"
      meta={[
        { name: 'description', content: 'Film composer and musician Nick Veale' },
        { name: 'keywords', content: 'Film composer and musician Nick Veale' },
      ]}
    />

    <main className="container">
      <Header />
      {children()}
    </main>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
