import React from 'react';

class WorkItem extends React.PureComponent {
  render() {
    return (
      <div className="work-list">
        {this.props.items
          ? this.props.items.map(
              item => (
                this.props ? this.props.categories.add(item.category) : null,
                (
                  <div className="work-item" key={item.title} id={item.title} title={item.title}>
                    <div className="work-cover">
                      <img
                        alt={item.title}
                        src={require(`../resources${item.cover}`)}
                        draggable="false"
                      />
                    </div>
                    <div className="item-text">
                      <div className="item-artist">{item.artist}</div>
                      <div className="item-title">{item.title}</div>
                      <div className="item-more">
                        <div className="item-description">{item.description}</div>
                        <div className="item-year" />
                        <div className="item-genre" />
                        <div className="item-link" />
                      </div>
                    </div>
                  </div>
                )
              ),
            )
          : null}
      </div>
    );
  }
  shouldComponentUpdate: false;
}

export default WorkItem;
