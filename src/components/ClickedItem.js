import React from 'react';

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
          <iframe
            width="100%"
            height="450"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/303337927&color=%23fbfbf7&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
          />
        ) : null}

        <div className="item-description">{props.item.description}</div>
      </div>

      <button className="item-close" onClick={props.itemClose} />
    </div>
  </React.Fragment>
);

export default ClickedItem;
