import React from 'react';
import Draggable from 'react-draggable';
import WorkItem from './WorkItem';

export default class WorkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  componentDidMount() {
    this.bounds();
  }

  bounds() {
    if (!document.getElementsByClassName('container')[0]) {
      return;
    }
    const container = document.getElementsByClassName('container')[0];
    const contWidth = container.getBoundingClientRect().width;

    const workList = document.getElementsByClassName('work-list')[0];
    const listWidth = workList.getBoundingClientRect().width;

    const width = contWidth - listWidth;

    this.setState({ width });
  }

  render() {
    console.log(this.props.items);
    return (
      <Draggable axis="x" bounds={{ left: this.state.width, right: 0 }}>
        <div>
          <WorkItem items={this.props.items} />
        </div>
      </Draggable>
    );
  }
}
