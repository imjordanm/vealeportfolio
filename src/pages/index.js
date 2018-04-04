import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Tilt from 'react-tilt';

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: pages } = data.allMarkdownRemark;

    return (
      <React.Fragment>
        {matchMedia('screen and (max-width: 900px)').matches ? (
          <Landing data={data} />
        ) : (
          <Tilt
            className="Tilt"
            options={{
              reverse: false,
              reset: true,
              max: 20,
              scale: 0.95,
            }}
          >
            <Landing data={data} />
          </Tilt>
        )}
      </React.Fragment>
    );
  }
}

const Landing = props => (
  <div className="landing-wrap">
    <div className="landing-text">
      <h1 className="heading">I am Nick Veale, a musician and film composer.</h1>
    </div>
    <div className="landing-picture">
      <Img
        style={{
          width: '100%',
          height: '100%',
        }}
        alt="Nick Veale portrait"
        sizes={props.data.portrait.sizes}
      />
    </div>
  </div>
);

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
                year
                genre
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
