import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Tilt from 'react-tilt';

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
      <Tilt
        className="Tilt"
        options={{
          reverse: false,
          reset: true,
          max: 20,
          scale: 0.95,
        }}
      >
        <div className="landing-wrap">
          <div className="landing-text">
            <h1 className="heading">
              I am Nick Veale,<br />a musician and<br />film composer.
            </h1>
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
        </div>
      </Tilt>
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
            items {
              item {
                title
                artist
                cover
                category
                description
              }
            }
          }
          html
        }
      }
    }
    portrait: imageSharp(id: { regex: "/landingnick/" }) {
      sizes(maxWidth: 1200) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
