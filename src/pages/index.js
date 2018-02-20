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

  render() {
    const { data } = this.props;
    const { edges: pages } = data.allMarkdownRemark;

    return (
      <section className="section">
        <ul className="side-text">{/* <li className="left">Scroll down</li> */}</ul>
        <div className="landing-text">
          <h2 className="subheading">Musician and composer</h2>
          <h1 className="heading">Nick Veale.</h1>
          <p className="paragraph">
            For those with the courage, I compose for films and write and perform music at a
            dazzlingly high level.
          </p>
        </div>
        <div className="landing-picture">
          <Img
            style={{
              width: '100%',
              height: '100%',
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
