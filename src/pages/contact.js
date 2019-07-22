import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import ContactForm from '../components/ContactForm';

const md = new MarkdownIt({ html: true, linkify: true });

const ContactPageTemplate = ({ heading, description }) => (
  <section className="contact">
    <div className="contact-box">
      <div className="page-heading">
        <h1>{heading}</h1>
      </div>

      {description ? (
        <div
          className="contact-subheading"
          dangerouslySetInnerHTML={{
            __html: md.render(description.replace(/\n/g, '\n\n')),
          }}
        />
      ) : null}
      <ContactForm />
    </div>
  </section>
);

ContactPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ContactPageTemplate.defaultProps = {
  description: '',
};

export default class ContactPage extends React.PureComponent {
  render() {
    const { childMarkdownRemark: page } = this.props.data.file;

    return (
      <React.Fragment>
        <Helmet>
          <title>{page.frontmatter.metaTitle}</title>
          <meta name="description" content={page.frontmatter.metaDescription} />
          <script src="https://www.google.com/recaptcha/api.js" async defer />
        </Helmet>
        <ContactPageTemplate
          heading={page.frontmatter.heading}
          description={page.frontmatter.description}
        />
      </React.Fragment>
    );
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const contactPageQuery = graphql`
  query contactPage {
    file(relativePath: { eq: "page/contact.md" }) {
      name
      childMarkdownRemark {
        frontmatter {
          title
          heading
          metaTitle
          metaDescription
          description
        }
      }
    }
  }
`;
