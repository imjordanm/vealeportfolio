import React from 'react';
import Link from 'gatsby-link';

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const Navigation = () => (
  <nav className="navigation">
    <ul className="nav-list">
      <ListLink to="/">Nick Veale</ListLink>
      <ListLink to="/">Menu</ListLink>
    </ul>
  </nav>
);

const Header = () => (
  <header className="header">
    <Navigation />
  </header>
);

export default Header;
