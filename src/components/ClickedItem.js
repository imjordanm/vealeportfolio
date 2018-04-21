import React from 'react';

const ClickedItem = props => (
  <React.Fragment>
    <div
      className="work-item-clicked"
      key={props.item.title}
      id={props.item.title}
      onClick={props.itemClose}
    />
    <div className="item-box-clicked">
      <div className="item-text-clicked">
        <div className="item-title-clicked">
          <h1>{props.item.title}</h1>
        </div>

        <div className="item-more-clicked">
          <div className="item-details">
            <div className="item-artist">{props.item.artist}</div>
            <div className="item-year">{props.item.year}</div>
          </div>
          <div className="item-details">
            <div className="item-category">{props.item.category}</div>
            <div className="item-genre">{props.item.genre}</div>
          </div>
        </div>
        <div className="item-description">{props.item.description}</div>
      </div>
      {/*
      <div className="item-cover-clicked">
        <img
          className="item-image-clicked"
          alt={props.item.title}
          srcSet={require(`../resources${props.item.cover}`)}
          src={require(`../resources${props.item.cover}`)}
        />
      </div> */}

      <button className="item-close" onClick={props.itemClose}>
        Go back
      </button>
    </div>
  </React.Fragment>
);

export default ClickedItem;
