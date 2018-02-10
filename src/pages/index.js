import React from 'react';

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
        <div>
          <h2 className="heading">Nick Veale</h2>
          <h3 className="subheading">musician and composer</h3>
        </div>
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
  }
`;
