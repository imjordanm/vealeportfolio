import React from 'react';
import Img from 'gatsby-image';
import Tilt from 'react-tilt';
import Playlist from '../components/Playlist';

export default class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tilt: true,
      display: 'hide',
    };

    this.showPlayer = this.showPlayer.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.checkScreen();
    }
  }

  checkScreen() {
    if (matchMedia('screen and (max-width: 900px)').matches) {
      this.setState({ tilt: false });
    }
  }

  showPlayer() {
    if (this.state.display !== 'show') {
      this.setState({ display: 'show' });
    }
  }

  render() {
    const { markdownRemark: page } = this.props.data;
    const frontmatter = page.frontmatter;
    const social = frontmatter.social;

    return (
      <React.Fragment>
        {this.state.tilt ? (
          <Tilt
            className="Tilt"
            options={{
              reverse: false,
              reset: true,
              max: 20,
              scale: 0.95,
            }}
          >
            <Landing
              heading={frontmatter.heading}
              social={social}
              image={page.fields.imageLink}
              placeholder={frontmatter.image}
              showPlayer={this.showPlayer}
            />
          </Tilt>
        ) : (
          <Landing
            heading={frontmatter.heading}
            social={social}
            image={page.fields.imageLink}
            placeholder={frontmatter.image}
            showPlayer={this.showPlayer}
          />
        )}
        <div className="social-icons desktop">
          {social.map(item => (
            <a href={item.link} target="_blank" key={item.icon}>
              <i className={`icon-${item.icon}`} />
            </a>
          ))}
        </div>
        <Playlist
          clientId="358b0fa53153c2425022d97d00261118"
          resolveUrl={frontmatter.playlist}
          preload="metadata"
          class={`fixed landing ${this.state.display}`}
        />
      </React.Fragment>
    );
  }
}

const Landing = props => (
  <div className="landing-wrap">
    <div className="landing-text">
      <h1 className="heading">{props.heading}</h1>
      <div className="item-more-landing" onClick={props.showPlayer}>
        <div className="more-icon">
          <div className="play" />
        </div>
        <span className="more-text">Listen to my reel</span>
      </div>
    </div>
    <div className="landing-picture">
      <div style={{ overflow: 'hidden', height: '100%' }}>
        <div className="picture-wrapper">
          {props.image ? (
            <Img
              style={{
                width: '100%',
                height: '100%',
              }}
              alt="About Nick Veale"
              fluid={props.image.childImageSharp.fluid}
            />
          ) : (
            <div
              style={{
                backgroundImage: `url(${props.placeholder})`,
              }}
            />
          )}
          <div className="picture-reveal" />
        </div>
      </div>
      <div className="item-more-landing mobile" onClick={props.showPlayer}>
        <div className="more-icon">
          <div className="play" />
        </div>
        <span className="more-text">Listen to my reel</span>
      </div>
      <div className="social-icons mobile">
        {props.social.map(item => (
          <a href={item.link} target="_blank" key={item.icon}>
            <i className={`icon-${item.icon}`} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export const indexQuery = graphql`
  query indexPage {
    markdownRemark(fields: { slug: { eq: "/home" } }) {
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
        image
        playlist
        social {
          icon
          link
        }
      }
    }
  }
`;
