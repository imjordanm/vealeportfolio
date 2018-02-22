import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import ContactForm from '../components/contact-form';

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  return (
    <div>
      <section className="section">
        {page.frontmatter.path === '/about' ? (
          <div className="about">
            <div className="about-picture">
              <Img
                style={{
                  width: '100%',
                  height: '100%',
                  transform: 'translate(0, -5%)',
                }}
                title="About Nick Veale"
                alt="About Nick Veale"
                sizes={data.about.sizes}
              />
            </div>
            <div className="about-text" dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        ) : null}

        {page.frontmatter.path === '/contact' ? (
          <div className="contact">
            <div className="contact-box">
              <h2>Ready to jam, lads?</h2>
              <p>Leave a message and we can talk about your next project.</p>
              <ContactForm />
            </div>
            <div className="contact-text" dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        ) : null}

        <div className="background-name">Nick Veale</div>
      </section>
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

    about: imageSharp(id: { regex: "/aboutnick2/" }) {
      sizes(maxWidth: 2440) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
