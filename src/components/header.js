import React from 'react';
import Link from 'gatsby-link';

const ListLink = props => (
  <li>
    <Link activeClassName="active" to={props.to}>
      {props.children}
    </Link>
  </li>
);

const Navigation = () => (
  <nav className="navigation">
    <ul className="nav-list">
      <ListLink to="/about">About</ListLink>
      <ListLink to="/work">Work</ListLink>
      <ListLink to="/contact">Contact</ListLink>
    </ul>
    <div className="menu">Menu</div>
  </nav>
);

const Header = () => (
  <header className="header">
    <div className="logo">
      <Link to="/">Nick Veale</Link>
    </div>
    <Navigation />
  </header>
);

export default Header;
