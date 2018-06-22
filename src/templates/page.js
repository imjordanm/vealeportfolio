import React from 'react';
import Img from 'gatsby-image';
import WorkList from '../components/WorkList';
import Link from 'gatsby-link';

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  return (
    <React.Fragment>
      {page.frontmatter.path === '/about' ? (
        <section className="about">
          <div className="about-text">
            <div className="page-heading">
              <h1 className="about-header">
                I compose music for advertising and film that perfectly fits your goals.
              </h1>
            </div>
          </div>
          <div className="about-container">
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
                <div className="picture-reveal" />
              </div>
            </div>
            <div className="about-section">
              <h2 className="about-section-heading">Who am I?</h2>
              <p>
                I am a composer and musician based in Wellington New Zealand. I finished my Master’s
                degree in Composition at the New Zealand School of Music in 2018.
              </p>
            </div>
          </div>
          <div className="about-section">
            <h2 className="about-section-heading">What can I do?</h2>
            <p>
              My area of expertise is in composing music for film, advertising and creative
              projects. Every project I undertake is crafted with passion through the vision of the
              client.
            </p>
          </div>
          <div className="about-section">
            <h2 className="about-section-heading">What have I done?</h2>
            <p>
              I have produced the music for large scale advertisements and for a number of feature
              length and short films. You can play samples of my work below or by visiting the&nbsp;<Link to="/work">work</Link> page.
            </p>
          </div>

          {/* }
          <footer className="about-footer">
            <div className="about-footer wrapper">
              <h4>
                See my work <Link to="/work">here.</Link>
              </h4>
              <h4>
                Or start the <Link to="/contact">conversation.</Link>
              </h4>
            </div>
          </footer> */}
        </section>
      ) : null}

      {page.frontmatter.path === '/work' ? <WorkList items={page.frontmatter.items} /> : null}

      {page.frontmatter.path === '/contact' ? (
        <section className="contact">
          <div className="contact-box">
            <div className="page-heading">
              <h1>Let's collaborate!</h1>
            </div>
            <div className="contact-subheading">
              <p>
                Find out more about what I can do for your next project by getting in touch
                via&nbsp;
                <a href="mailto:novingle@gmail.com">email</a> or by filling out the form below. I am
                always up for a coffee.
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
            video
            heading
            music
            colour
          }
        }
      }
      html
    }

    about: imageSharp(id: { regex: "/nature/" }) {
      sizes(maxWidth: 1800) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
