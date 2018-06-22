import React from 'react';

let ReactAplayer;
let ready;

if (typeof window !== 'undefined' && !ready) {
  ready = true;
  ReactAplayer = require('react-aplayer').default;
}

export default class Player extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {ready === true ? (
          <ReactAplayer
            {...this.props}
            audio={this.props.audio}
            theme="#242424"
            preload="metadata"
            volume={0.2}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
