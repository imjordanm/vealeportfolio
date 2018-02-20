import React from 'react';
import Link from 'gatsby-link';

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  return (
    <div>
      <section className="section" dangerouslySetInnerHTML={{ __html: page.html }} />
      <div className="background-name">Nick Veale</div>
    </div>
  );
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
