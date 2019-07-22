import React from 'react';
import Helmet from 'react-helmet';
import WorkList from '../components/WorkList';

export default class WorkPage extends React.PureComponent {
  render() {
    const { childMarkdownRemark: page } = this.props.data.file;

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
    file(relativePath: { eq: "page/work.md" }) {
      name
      childMarkdownRemark {
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
      }
    }
  }
`;
