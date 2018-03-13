import React from 'react';
import Draggable from 'react-draggable';

class WorkList extends React.Component {
  render() {
    return (
      <div className="work-list">
        <Draggable axis="x">
          <div>
            <div>
              <div className="item">
                <div className="cover" />Item 1
              </div>
              <div className="item">
                <div className="cover" />Item 2
              </div>
              <div className="item">
                <div className="cover" />Item 3
              </div>
              <div className="item">
                <div className="cover" />Item 4
              </div>
              <div className="item">
                <div className="cover" />Item 5
              </div>
              <div className="item">
                <div className="cover" />Item 6
              </div>
              <div className="item">
                <div className="cover" />Item 7
              </div>
              <div className="item">
                <div className="cover" />Item 8
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default WorkList;
