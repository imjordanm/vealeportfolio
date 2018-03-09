import React from 'react';
import Link from 'gatsby-link';

class WorkList extends React.Component {
  render() {
    return (
      <div className="work-list">
        <div className="item">
          <div className="cover" />
          <div className="description">Item 1</div>
        </div>
        <div className="item">
          <div className="cover" />Item 1
        </div>
        <div className="item">
          <div className="cover" />Item 1
        </div>
        <div className="item">
          <div className="cover" />Item 1
        </div>
        <div className="item">
          <div className="cover" />Item 1
        </div>
        <div className="item">
          <div className="cover" />Item 1
        </div>
        <div className="item">
          <div className="cover" />Item 1
        </div>
        <div className="item">
          <div className="cover" />Item 1
        </div>
      </div>
    );
  }
}

export default WorkList;
