import React from 'react';
import Img from 'gatsby-image';
import WorkList from '../components/WorkList';
import Link from 'gatsby-link';
import Playlist from '../components/Playlist';

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
            <div className="about-section-text">
              <p>
                I am a composer and musician based in Wellington New Zealand. I finished my Master’s
                degree in Composition at the New Zealand School of Music in 2018.
              </p>
            </div>
          </div>
          <div className="about-section">
            <h2 className="about-section-heading">What can I do?</h2>
            <div className="about-section-text">
              <p>
                My area of expertise is in composing music for film, advertising and creative
                projects. Every project I undertake is crafted with passion through the vision of
                the client.
              </p>
            </div>
          </div>
          <div className="about-section">
            <h2 className="about-section-heading">What have I done?</h2>
            <div className="about-section-text">
              <p>
                I have produced music for large scale advertisements and for various feature length
                and short films. You can play samples of my work below or hear everything on
                the&nbsp;<Link to="/work">work</Link> page.
              </p>
              <div className="about-samples">
                <Playlist
                  clientId="358b0fa53153c2425022d97d00261118"
                  resolveUrl="https://soundcloud.com/nick-veale/sets/lounge"
                  preload="metadata"
                  class="fixed sample"
                />
                {/* <div className="sample">
                  <p>Advertising Reel</p>
                  <div className="more-icon">
                    <div className="play" />
                  </div>
                </div>
                <div className="sample">
                  <p>Film Reel</p>
                  <div className="more-icon">
                    <div className="play" />
                  </div>
                </div> */}
              </div>
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
