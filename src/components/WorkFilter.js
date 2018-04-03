import React from 'react';

class WorkFilter extends React.PureComponent {
  render() {
    return (
      <div className="work-filter">
        <button
          className={this.props.toggledFilter === true ? 'filter-active toggled' : 'filter-active'}
          onClick={this.props.filterClick}
        >
          {`Viewing ${this.props.selectedCategory}`}
        </button>
        <div className="filter-list">
          <ul onClick={this.props.filterClick}>
            {this.props
              ? Array.from(this.props.categories).map(category => (
                <li
                  key={category}
                  id={category}
                  className={this.props.selectedCategory == category ? 'active' : ''}
                >
                  {category}
                </li>
                ))
              : null}
            <li key="All" id="All" className={this.props.selectedCategory == 'All' ? 'active' : ''}>
              All
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default WorkFilter;
