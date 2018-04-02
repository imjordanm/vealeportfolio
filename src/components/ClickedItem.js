import React from 'react';

const ClickedItem = props => (
  <div
    className="work-item clicked"
    key={props.item.title}
    id={props.item.title}
    title={props.item.title}
  >
    <div className="item-cover clicked">
      <img
        className="item-image clicked"
        alt={props.item.title}
        srcSet={require(`../resources${props.item.cover}`)}
      />
    </div>
    <div className="item-text clicked">
      <div className="item-artist clicked">
        <h3>{props.item.artist}</h3>
      </div>
      <div className="item-title clicked">
        <h6>{props.item.title}</h6>
      </div>
      <div className="item-more clicked">
        <div className="item-year">{props.item.year}</div>
        <div className="item-genre">{props.item.genre}</div>
        <div className="item-link" />
        <div className="item-description">{props.item.description}</div>
      </div>
    </div>
  </div>
);

export default ClickedItem;
