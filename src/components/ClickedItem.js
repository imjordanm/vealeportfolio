import React from 'react';
import Player from './Player';

const ClickedItem = props => (
  <React.Fragment>
    <div className="item-box-clicked">
      <div className="item-text-clicked">
        <div className="item-title-clicked">
          <h1>{props.item.title}</h1>
        </div>

        <div className="item-more-clicked">
          <div className="item-heading">{props.item.heading}</div>
          <div className="item-details">
            <div className="detail">
              <div className="detail-left">Client</div>
              <div className="detail-right">{props.item.artist}</div>
            </div>
            <div className="detail">
              <div className="detail-left">Year</div>
              <div className="detail-right">{props.item.year}</div>
            </div>
            <div className="detail">
              <div className="detail-left">Category</div>
              <div className="detail-right">{props.item.category}</div>
            </div>
            <div className="detail">
              <div className="detail-left">Genre</div>
              <div className="detail-right">{props.item.genre}</div>
            </div>
          </div>
        </div>

        <div className="item-line" />

        {props.item.video ? (
          <div className="item-video">
            <iframe
              src={props.item.video}
              title="Vimeo player"
              frameBorder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen
            />
            <script src="https://player.vimeo.com/api/player.js" />
          </div>
        ) : null}

        {props.item.music ? (
          <div className="item-music">
            <iframe
              title="Spotify"
              className="SpotifyPlayer"
              src={`https://embed.spotify.com/?uri=${props.item.music}&amp;theme=${'black'}`}
              width="100%"
              height="311"
              frameBorder="0"
              allowTransparency="true"
            />
          </div>
        ) : null}

        {props.item.music ? (
          <Player
            audio={[
              {
                name: props.item.title,
                artist: props.item.artist,
                url:
                  'https://cdn.discordapp.com/attachments/181618061588037632/457404051794165770/Advertising_Showreel_1.mp3',
                cover: props.item.cover,
              },
              {
                name: 'Flamingo',
                artist: props.item.artist,
                url:
                  'https://cdn.discordapp.com/attachments/181618061588037632/457404051794165770/Advertising_Showreel_1.mp3',
                cover: props.item.cover,
              },
            ]}
          />
        ) : null}

        <div className="item-description">{props.item.description}</div>
      </div>

      <button className="item-btn close" onClick={props.itemClose}>
        Close
      </button>
      <button className="item-btn prev" onClick={props.itemSwitch}>
        Previous
      </button>
      <button className="item-btn next" onClick={props.itemSwitch}>
        Next
      </button>
    </div>
  </React.Fragment>
);

export default ClickedItem;
