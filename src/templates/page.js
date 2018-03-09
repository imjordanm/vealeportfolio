import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import ContactForm from '../components/contact-form';
import WorkList from '../components/WorkList';

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  return (
    <section className="section">
      {page.frontmatter.path === '/about' ? (
        <div className="about">
          <div className="about-text" dangerouslySetInnerHTML={{ __html: page.html }} />
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
        </div>
      ) : null}

      {page.frontmatter.path === '/work' ? (
        <div className="work">
          <WorkList />
        </div>
      ) : null}

      {page.frontmatter.path === '/contact' ? (
        <div className="contact">
          <div className="section-container">
            <div className="contact-box">
              <h2>
                Looking to work together <br />or just want to say hello?
              </h2>
              <ContactForm />
            </div>
            <div className="contact-text" dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        </div>
      ) : null}
    </section>
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
