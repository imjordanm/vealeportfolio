import React from 'react';

class WorkItem extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {this.props.items
          ? this.props.items.map((item, index) => (
                this.props.categories.add(item.category),
                (
                  <div className="work-item" key={item.title} id={item.title} data-index={index}>
                    <div className="item-box">
                      <div className="item-cover">
                        <img
                          className="item-image"
                          alt={item.title}
                          data-flickity-lazyload-srcset={item.cover}
                          data-flickity-lazyload-src={item.cover}
                          draggable="false"
                        />
                      </div>
                      <div className="item-text">
                        <h2 className="item-title">{item.title}</h2>
                        <div className="item-more">
                          <div className="more-icon">
                            <div className="play" />
                          </div>
                          <p className="more-text">Read more or listen</p>
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
