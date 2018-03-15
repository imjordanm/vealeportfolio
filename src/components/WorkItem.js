import React from 'react';

const WorkItem = props => (
  <div className="work-list">
    {props
      ? props.items.item.map(item => (
        <div className="work-item" key={item.title} id={item.title} title={item.title}>
          <div className="work-cover">
            <img src={item.cover} />
          </div>
          <span>{item.artist}</span>
          <p>{item.title}</p>
        </div>
        ))
      : null}
  </div>
);

export default WorkItem;
