import React from 'react';

class WorkItem extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {this.props.items
          ? this.props.items.map((item, index) => (
                this.props ? this.props.categories.add(item.category) : null,
                (
                  <div className="work-item" key={item.title} id={item.title} data-index={index}>
                    <div className="item-box">
                      <div className="item-cover">
                        <img
                          className="item-image"
                          alt={item.title}
                          data-flickity-lazyload-srcset={require(`../resources${item.cover}`)}
                          data-flickity-lazyload-src={require(`../resources${item.cover}`)}
                          draggable="false"
                        />
                      </div>
                      <div className="item-text">
                        <div className="item-artist">{item.artist}</div>
                        <div className="item-title">{item.title}</div>
                        <div className="item-more">
                          <p>
                            {item.year} - {item.genre}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))
          : null}
      </React.Fragment>
    );
  }
}

export default WorkItem;
