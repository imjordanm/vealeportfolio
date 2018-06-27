import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import {
  PlayButton,
  PrevButton,
  NextButton,
  Progress,
  Timer,
  Icons,
  VolumeControl,
} from 'react-soundplayer/components';

class PlaylistSoundPlayer extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  playTrackAtIndex(playlistIndex) {
    const { soundCloudAudio } = this.props;

    this.setState({ activeIndex: playlistIndex });

    soundCloudAudio.play({ playlistIndex });
  }

  nextIndex() {
    const { playlist } = this.props;
    let { activeIndex } = this.state;

    if (activeIndex >= playlist.tracks.length - 1) {
      return;
    }

    if (activeIndex || activeIndex === 0) {
      this.setState({ activeIndex: ++activeIndex });
    }
  }

  prevIndex() {
    let { activeIndex } = this.state;

    if (activeIndex <= 0) {
      return;
    }

    if (activeIndex || activeIndex === 0) {
      this.setState({ activeIndex: --activeIndex });
    }
  }

  renderTrackList() {
    const { playlist } = this.props;

    if (!playlist) {
      return <div className="p2 center">Loading...</div>;
    }

    const tracks = playlist.tracks.map((track, i) => {
      const classNames = ClassNames(
        'flex flex-center full-width left-align button button-transparent player-track',
        {
          'is-active': this.props.soundCloudAudio._playlistIndex === i,
        },
      );

      return (
        <button key={track.id} className={classNames} onClick={this.playTrackAtIndex.bind(this, i)}>
          <span className="track-number">{i + 1}</span>
          <span className="track-title">{track.title}</span>
          <span className="track-duration">{Timer.prettyTime(track.duration / 1000)}</span>
        </button>
      );
    });

    return <div className="player-list">{tracks}</div>;
  }

  render() {
    const { playlist, currentTime, duration } = this.props;

    return (
      <div className={this.props.class ? `music-player ${this.props.class}` : 'music-player'}>
        <div className="player-top">
          <Progress value={(currentTime / duration) * 100 || 0} {...this.props} />
          <div className="player-controls">
            <div className="player-buttons">
              {' '}
              <PrevButton
                className="flex-none h3 button button-narrow button-transparent button-grow"
                onPrevClick={this.prevIndex.bind(this)}
                {...this.props}
              />
              <PlayButton
                className="flex-none h2 button button-transparent button-grow"
                {...this.props}
              />
              <NextButton
                className="flex-none h3 button button-narrow button-transparent button-grow"
                onNextClick={this.nextIndex.bind(this)}
                {...this.props}
              />
              <div className="playing-details">
                <Timer
                  className="playing-timer"
                  duration={duration || 0}
                  currentTime={currentTime}
                  {...this.props}
                />
                <span className="playing-title">
                  {playlist ? playlist.user.username : ''}
                  {' - '}
                  {playlist ? playlist.tracks[this.state.activeIndex].title : ''}
                </span>
              </div>
            </div>

            <VolumeControl
              className="flex flex-center"
              buttonClassName="flex-none h4 button button-transparent button-grow"
              {...this.props}
            />
          </div>
        </div>
        {this.renderTrackList()}
      </div>
    );
  }
}

PlaylistSoundPlayer.propTypes = {
  resolveUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

export default withSoundCloudAudio(PlaylistSoundPlayer);
