import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import MarkdownIt from 'markdown-it';
import Playlist from '../components/Playlist';

const md = new MarkdownIt({ html: true, linkify: true });

const AboutPageTemplate = ({
  heading, image, placeholder, sections,
}) => (
  <section className="about">
    <div className="about-text">
      <div className="page-heading">
        <h1 className="about-header">{heading}</h1>
      </div>
    </div>
    <div className="about-picture">
      <div className="picture-wrapper">
        {image ? (
          <Img
            style={{
              width: '100%',
              height: '100%',
            }}
            alt="About Nick Veale"
            fluid={image.childImageSharp.fluid}
          />
        ) : (
          <div
            style={{
              backgroundImage: `url(${placeholder})`,
            }}
          />
        )}
        <div className="picture-reveal" />
      </div>
    </div>
    {sections.section.map((section, index) => (
      <div className="about-section" key={section.heading}>
        <h2 className="about-section-heading">{section.heading}</h2>
        <div className="about-section-text">
          {section.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: md.render(section.description.replace(/\n/g, '\n\n')),
              }}
            />
          ) : null}

          {section.playlist ? (
            <div className="about-samples">
              <Playlist
                clientId="358b0fa53153c2425022d97d00261118"
                resolveUrl={section.playlist}
                preload="metadata"
                class="sample"
              />
            </div>
          ) : null}
        </div>
      </div>
    ))}
  </section>
);

export default class AboutPage extends React.PureComponent {
  render() {
    const { childMarkdownRemark: page } = this.props.data.file;

    return (
      <React.Fragment>
        <Helmet>
          <title>{page.frontmatter.metaTitle}</title>
          <meta name="description" content={page.frontmatter.metaDescription} />
        </Helmet>
        <AboutPageTemplate
          heading={page.frontmatter.heading}
          image={page.fields.imageLink}
          placeholder={page.frontmatter.image}
          sections={page.frontmatter.sections}
        />
      </React.Fragment>
    );
  }
}

export const aboutPageQuery = graphql`
  query aboutPage {
    file(relativePath: { eq: "page/about.md" }) {
      name
      childMarkdownRemark {
        fields {
          slug
          imageLink {
            childImageSharp {
              id
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        frontmatter {
          title
          heading
          metaTitle
          metaDescription
          image
          sections {
            section {
              heading
              description
              playlist
            }
          }
        }
      }
    }
  }
`;
