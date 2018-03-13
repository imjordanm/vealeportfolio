import React from 'react';
import Draggable from 'react-draggable';

class WorkBar extends React.Component {
  render() {
    return (
      <div className="work-bar">
        <div className="work-filter">All</div>
        <div className="work-progress">
          <Draggable axis="x" bounds=".work-progress">
            <span className="progress-bar" />
          </Draggable>
        </div>
      </div>
    );
  }
}

export default WorkBar;
