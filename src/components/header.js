import React from 'react';
import Link from './Link';

const menuToggle = () => {
  if (document.getElementsByClassName('header toggled')[0]) {
    document.getElementsByClassName('pages toggled')[0].className = 'pages';
    document.getElementsByClassName('hamburger toggled')[0].className = 'hamburger';
    document.getElementsByClassName('header toggled')[0].className = 'header';
  } else if (document.getElementsByClassName('header')[0]) {
    document.getElementsByClassName('pages')[0].className = 'pages toggled';
    document.getElementsByClassName('hamburger')[0].className = 'hamburger toggled';
    document.getElementsByClassName('header')[0].className = 'header toggled';
  }
};

const hideMenu = () => {
  if (document.getElementsByClassName('header toggled')[0]) {
    document.getElementsByClassName('pages toggled')[0].className = 'pages';
    document.getElementsByClassName('hamburger toggled')[0].className = 'hamburger';
    document.getElementsByClassName('header toggled')[0].className = 'header';
  }
};

const Navigation = props => (
  <nav className="navigation">
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
              <Link activeClassName="active" to={node.fields.slug} onClick={hideMenu}>
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
  <header className="header" id="top">
    <div className="logo" onClick={hideMenu}>
      <Link to="/">Nick Veale</Link>
    </div>

    <Navigation pages={props.pages} />
  </header>
);

export default Header;
