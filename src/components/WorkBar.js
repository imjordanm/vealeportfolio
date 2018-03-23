import React from 'react';
import Draggable from 'react-draggable';

const WorkBar = props => (
  <div className="work-progress">
    <Draggable
      axis="x"
      bounds="parent"
      position={{ x: (props.position - props.position * 2) / 2.749, y: 0 }}
      onDrag={props.drag}
    >
      <div className="progress-bar">
        <span className="progress-bar-line" />
      </div>
    </Draggable>
  </div>
);

export default WorkBar;
