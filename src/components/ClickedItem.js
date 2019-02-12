import React from 'react';
import MarkdownIt from 'markdown-it';
import Playlist from './Playlist';

const md = new MarkdownIt({ html: true, linkify: true });

const ClickedItem = props => (
  <React.Fragment>
    <div className="item-box-clicked">
      <div className="item-text-clicked">
        <div className="item-title-clicked">
          <h1>{props.item.title}</h1>
          <div className="item-line" />
        </div>

        <div className="item-more-clicked">
          <div className="item-description">
            <div className="item-heading">{props.item.heading}</div>
            {props.item.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: md.render(props.item.description.replace(/\n/g, '\n\n')),
                }}
              />
            ) : null}
          </div>
          <div className="item-details">
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

        {props.item.soundcloud ? (
          <Playlist
            key={props.item.title}
            clientId="358b0fa53153c2425022d97d00261118"
            resolveUrl={props.item.soundcloud}
            preload="metadata"
          />
        ) : null}

        {props.item.spotify ? (
          <div className="item-music">
            <iframe
              title="Spotify"
              className="SpotifyPlayer"
              src={`https://embed.spotify.com/?uri=${props.item.spotify}&amp;theme=${'black'}`}
              width="100%"
              height="311"
              frameBorder="0"
              allowTransparency="true"
            />
          </div>
        ) : null}
      </div>

      <button className="item-btn close" onClick={props.itemClose}>
        Back
      </button>
      <button className="item-btn prev" onClick={props.itemSwitch}>
        Prev
      </button>
      <button className="item-btn next" onClick={props.itemSwitch}>
        Next
      </button>
    </div>
  </React.Fragment>
);

export default ClickedItem;
