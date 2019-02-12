import React from 'react';
import Helmet from 'react-helmet';
import WorkList from '../components/WorkList';

export default class WorkPage extends React.PureComponent {
  render() {
    const { markdownRemark: page } = this.props.data;

    return (
      <React.Fragment>
        <Helmet>
          <title>{page.frontmatter.metaTitle}</title>
          <meta name="description" content={page.frontmatter.metaDescription} />
        </Helmet>
        <WorkList items={page.frontmatter.items} />
      </React.Fragment>
    );
  }
}

export const workPageQuery = graphql`
  query workPage {
    markdownRemark(fields: { slug: { eq: "/work" } }) {
      fields {
        slug
      }
      frontmatter {
        title
        heading
        metaTitle
        metaDescription
        items {
          item {
            title
            artist
            cover
            category
            description
            year
            genre
            heading
            soundcloud
            spotify
            colour
          }
        }
      }
      html
    }
  }
`;
