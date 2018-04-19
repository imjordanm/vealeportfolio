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
          <div className="about-text">
            <div className="page-heading">
              <h1 className="re">I write and produce tailored</h1>
              <h1 className="te">work on tight deadlines.</h1>
            </div>
            <div className="page-subheading">
              I am a working composer based in Wellington, New Zealand. I completed a Master's
              degree in Film Scoring at the New Zealand School of Music. My specialty is in rapidly
              composing high quality music for advertising, films, and artistic projects.
            </div>
          </div>
          <div className="about-picture">
            <div className="picture-wrapper">
              <Img
                style={{
                  width: '100%',
                  height: '100%',
                }}
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
            <div className="page-heading">
              <h1>Let's collaborate!</h1>
            </div>
            <div className="page-subheading">
              <p>
                Find out more about what I can do for your next project by getting in touch
                via&nbsp;
                <a href="mailto:nickveale@gmail.com">email</a> or by filling out the form below. I
                am always down for a coffee.
              </p>
            </div>
            <form
              name="contact"
              className="contact-form"
              autoComplete="nope"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
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

    about: imageSharp(id: { regex: "/nickabout/" }) {
      sizes(maxWidth: 1200) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
