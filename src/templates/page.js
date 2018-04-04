import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import WorkList from '../components/WorkList';

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  return (
    <React.Fragment>
      {page.frontmatter.path === '/about' ? (
        <section className="about">
          <div className="about-text" dangerouslySetInnerHTML={{ __html: page.html }} />
          <div className="about-picture">
            <Img
              style={{
                width: '100%',
                height: '100%',
                transform: 'translate(0, -5%)',
              }}
              alt="About Nick Veale"
              sizes={data.about.sizes}
            />
          </div>
        </section>
      ) : null}

      {page.frontmatter.path === '/work' ? <WorkList items={page.frontmatter.items} /> : null}

      {page.frontmatter.path === '/contact' ? (
        <section className="contact">
          <div className="contact-box">
            <h1>Let's collaborate!</h1>
            <div className="contact-text">
              <p>
                Find out more about what I can do for your next project by getting in touch
                via&nbsp;
                <a href="mailto:nickveale@gmail.com">email</a> or by filling out the form below.
              </p>
            </div>
            <form
              name="Contact Form"
              className="contact-form"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <div className="small-input name">
                <label htmlFor="name">Name</label>
                <input
                  className="input-form"
                  name="name"
                  type="text"
                  id="name"
                  placeholder="What's your name?"
                />
              </div>
              <div className="small-input email">
                <label htmlFor="email">Email</label>
                <input
                  className="input-form"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="What's your email?"
                />
              </div>
              <div className="big-input">
                <label htmlFor="message">Message</label>
                <textarea
                  className="input-form"
                  name="message"
                  id="message"
                  placeholder="What can I help you with?"
                />
              </div>
              <button type="submit" className="submitButton">
                Send message
              </button>
            </form>
          </div>
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
            year
            genre
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
