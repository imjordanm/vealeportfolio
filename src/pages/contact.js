import React from 'react';
import Helmet from 'react-helmet';
import ContactForm from '../components/ContactForm';

const ContactPageTemplate = ({
  title, heading, image, placeholder, sections, content,
}) => (
  <section className="contact">
    <div className="contact-box">
      <div className="page-heading">
        <h1>Let's collaborate!</h1>
      </div>
      <div className="contact-subheading">
        <p>
          Find out more about what I can do for your next project by getting in touch via&nbsp;
          <a href="mailto:novingle@gmail.com">email</a> or by filling out the form below. I am
          always up for a coffee.
        </p>
      </div>
      <ContactForm />
    </div>
  </section>
);

export default class ContactPage extends React.PureComponent {
  render() {
    const { markdownRemark: page } = this.props.data;

    return (
      <React.Fragment>
        <Helmet>
          <title>{page.frontmatter.metaTitle}</title>
          <meta name="description" content={page.frontmatter.metaDescription} />
        </Helmet>
        <ContactPageTemplate
          title={page.frontmatter.title}
          heading={page.frontmatter.heading}
          sections={page.frontmatter.sections}
          content={page.html}
        />
      </React.Fragment>
    );
  }
}

export const contactPageQuery = graphql`
  query contactPage {
    markdownRemark(fields: { slug: { eq: "/contact" } }) {
      fields {
        slug
      }
      frontmatter {
        title
        heading
        metaTitle
        metaDescription
      }
      html
    }
  }
`;
