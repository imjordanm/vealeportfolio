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
      <div className="landing-wrap">
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
        <div className="landing-text">
          <h1 className="heading">
            I am Nick Veale,<br />a musician and<br />film composer.
          </h1>
          <p className="paragraph">
            For those with the cheddar, I compose for films and write and perform music at a
            dazzlingly high level. Reach me here for astounding collaborative adventures or die
            unhappy.
          </p>
        </div>
      </div>
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
