import React from 'react';

export default class WorkBar extends React.PureComponent {
  render() {
    return (
      <div className="work-progress">
        <div className="progress-bar">
          <span className="progress-bar-line" />
        </div>
      </div>
    );
  }
}
