import React from 'react';

const WorkItem = props => (
  <div className="work-list">
    {props.items
      ? props.items.map(item => (
            props ? props.categories.add(item.category) : null,
            (
              <div className="work-item" key={item.title} id={item.title} title={item.title}>
                <div className="work-cover">
                  <img alt={item.title} src={item.cover} draggable="false" />
                </div>
                <span>{item.artist}</span>
                <p>{item.title}</p>
              </div>
            )
          ))
      : null}
  </div>
);

export default WorkItem;
