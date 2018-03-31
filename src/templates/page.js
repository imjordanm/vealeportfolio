import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import ContactForm from '../components/contact-form';
import WorkList from '../components/WorkList';

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  return (
    <React.Fragment>
      {page.frontmatter.path === '/about' ? (
        <section className="about">
          <div className="about-box">
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
        </section>
      ) : null}

      {page.frontmatter.path === '/work' ? <WorkList items={page.frontmatter.items} /> : null}

      {page.frontmatter.path === '/contact' ? (
        <section className="contact">
          <div className="contact-box">
            <h1>Let's collaborate!</h1>
            <div>
              <p>
                To find out more about what I can do for your next project you can get in touch by
                <a href="mailto:nickveale@gmail.com">email</a> me or fill out the form below.
              </p>
            </div>
            <ContactForm />
          </div>
          {/* <div className="contact-text" dangerouslySetInnerHTML={{ __html: page.html }} /> */}
        </section>
      ) : null}
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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

    about: imageSharp(id: { regex: "/aboutnick2/" }) {
      sizes(maxWidth: 1200) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
