import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

export default class IndexPage extends React.Component {
  componentDidMount() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }

  mouseMove = e => {
    const x = (e.pageX - e.target.offsetLeft) / e.target.offsetWidth;
    const y = (e.pageY - e.target.offsetTop) / e.target.offsetHeight;
    const move = `rotateY(${x}deg) rotateX(${y}deg) translateZ(-1000px)`;
    const css = {
      move,
    };

    document.getElementsByClassName('landing-picture')[0].style.transform = move;
    e.preventDefault();
  };

  render() {
    const { data } = this.props;
    const { edges: pages } = data.allMarkdownRemark;

    return (
      <section className="section">
        <ul className="side-text">{/* <li className="left">Scroll down</li> */}</ul>
        <div className="landing-text">
          <h2 className="subheading">Musician and film composer</h2>
          <h1 className="heading">Nick Veale.</h1>
        </div>
        <p className="paragraph">
          For those with the courage, I compose for films and write and perform music at a
          dazzlingly high level.
        </p>
        <div className="landing-picture" onMouseMove={this.mouseMove} style={this.mouse}>
          <Img
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transform: 'translate(0, -20%)',
            }}
            title="Nick Veale portrait"
            alt="Nick Veale portrait"
            sizes={data.portrait.sizes}
          />
        </div>
        <div className="background-name">Nick Veale</div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query indexQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
          }
          html
        }
      }
    }
    portrait: imageSharp(id: { regex: "/nickveale/" }) {
      sizes(maxWidth: 2440) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
