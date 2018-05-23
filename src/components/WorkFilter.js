import React from 'react';

class WorkFilter extends React.PureComponent {
  render() {
    return (
      <div className="work-filter">
        <button
          className={this.props.toggledFilter === true ? 'filter-active toggled' : 'filter-active'}
          onClick={this.props.filterClick}
        >
          {`Filter ${this.props.selectedCategory}`}
          <div className="arrow" />
        </button>
        <div className="filter-list">
          <ul onClick={this.props.filterClick}>
            <li
              key="All"
              id="All"
              className={this.props.selectedCategory === 'All' ? 'active' : ''}
            >
              All
            </li>
            {this.props
              ? Array.from(this.props.categories).map(category => (
                <li
                  key={category}
                  id={category}
                  className={this.props.selectedCategory === category ? 'active' : ''}
                >
                  {category}
                </li>
                ))
              : null}
          </ul>
        </div>
        <button className="item-close filter" onClick={this.props.filterClick} />
      </div>
    );
  }
}

export default WorkFilter;
