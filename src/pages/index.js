import React from 'react';
import Link from 'gatsby-link';
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
    const { data } = this.props;

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
            <Landing data={data} showPlayer={this.showPlayer} />
          </Tilt>
        ) : (
          <Landing data={data} showPlayer={this.showPlayer} />
        )}
        <Playlist
          clientId="358b0fa53153c2425022d97d00261118"
          resolveUrl="https://soundcloud.com/nick-veale/sets/lounge"
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
      <h1 className="heading">I am Nick Veale, a musician and film composer.</h1>
      <div className="item-more-landing" onClick={props.showPlayer}>
        <div className="more-icon">
          <div className="play" />
        </div>
        <p className="more-text">Listen to my reel</p>
      </div>
    </div>
    <div className="landing-picture">
      <div style={{ overflow: 'hidden', height: '100%' }}>
        <div className="picture-wrapper">
          <Img
            style={{
              position: 'unset',
            }}
            alt="Nick Veale portrait"
            sizes={props.data.portrait.sizes}
          />
          <div className="picture-reveal" />
        </div>
      </div>
    </div>
  </div>
);

export const pageQuery = graphql`
  query indexQuery {
    portrait: imageSharp(id: { regex: "/portrait/" }) {
      sizes(maxWidth: 1400) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
