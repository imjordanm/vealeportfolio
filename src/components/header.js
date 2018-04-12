import React from 'react';
import Link from 'gatsby-link';

const menuToggle = e => {
  if (document.getElementById('menu-toggle').checked) {
    document.getElementById('menu-toggle').checked = false;
  } else {
    document.getElementById('menu-toggle').checked = true;
  }
};

const hideMenu = e => {
  document.getElementById('menu-toggle').checked = false;
};

const Navigation = props => (
  <nav className="navigation">
    <input type="checkbox" className="menu-toggle" id="menu-toggle" />
    <div className="hamburger" onClick={menuToggle}>
      <div />
      <div />
      <div />
    </div>
    <div className="pages">
      <div className="pages-container">
        <ul className="nav-list">
          {props.pages.map(({ node }) => (
            <li key={node.frontmatter.title}>
              <Link activeClassName="active" to={node.frontmatter.path} onClick={hideMenu}>
                {node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

const Header = props => (
  <header className="header">
    <div className="logo" onClick={hideMenu}>
      <Link to="/">Nick Veale</Link>
    </div>
    <Navigation pages={props.pages} />
  </header>
);

export default Header;
