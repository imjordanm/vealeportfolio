import React from 'react';

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  return <section className="section" dangerouslySetInnerHTML={{ __html: page.html }} />;
}

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        path
        title
      }
      html
    }
  }
`;
