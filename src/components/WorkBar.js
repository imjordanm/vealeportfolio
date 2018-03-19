import React from 'react';
import Draggable from 'react-draggable';

const WorkBar = props => (
  <div className="work-bar">
    <div className="work-filter">
      <ul className="filter-list" onClick={props.handleClick}>
        {props
          ? Array.from(props.categories).map(category => (
            <li
              key={category}
              id={category}
              title={category}
              className={props.selectedCategory == category ? 'active' : ''}
            >
              {category}
            </li>
            ))
          : null}
        <li
          key="All"
          id="All"
          title="All"
          className={props.selectedCategory == 'All' ? 'active' : ''}
        >
          All
        </li>
      </ul>
      <button className="filter-active" onClick={props.displayFilters}>
        {props.selectedCategory}
      </button>
    </div>
    <div className="work-progress">
      <Draggable axis="x" bounds=".work-progress">
        <span className="progress-bar" />
      </Draggable>
    </div>
  </div>
);

export default WorkBar;
