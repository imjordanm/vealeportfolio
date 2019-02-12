import React from 'react';

export default function Template({ data }) {
  return (
    <React.Fragment>
      <div>Empty template</div>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query PageByPath($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
