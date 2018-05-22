import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Tilt from 'react-tilt';

export default class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tilt: true,
    };
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
            <Landing data={data} />
          </Tilt>
        ) : (
          <Landing data={data} />
        )}
      </React.Fragment>
    );
  }
}

const Landing = props => (
  <div className="landing-wrap">
    <div className="landing-text">
      {/* } <h1 className="heading-shadow">I am Nick Veale, a musician and film composer.</h1> */}
      <h1 className="heading">I am Nick Veale, a musician and film composer.</h1>
      <div className="item-more landing">
        <div className="more-icon">
          <div className="play" />
        </div>
        <p className="more-text">Watch my reel</p>
      </div>
    </div>
    <div className="landing-picture">
      <Img
        style={{
          position: 'unset',
        }}
        alt="Nick Veale portrait"
        sizes={props.data.portrait.sizes}
      />
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
