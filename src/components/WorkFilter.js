import React from 'react';

class WorkFilter extends React.PureComponent {
  render() {
    return (
      <div className="work-filter">
        <ul className="filter-list" onClick={this.props.filterClick}>
          {this.props
            ? Array.from(this.props.categories).map(category => (
              <li
                key={category}
                id={category}
                title={category}
                className={this.props.selectedCategory == category ? 'active' : ''}
              >
                {category}
              </li>
              ))
            : null}
          <li
            key="All"
            id="All"
            title="All"
            className={this.props.selectedCategory == 'All' ? 'active' : ''}
          >
            All
          </li>
        </ul>
        <button className="filter-active" onClick={this.props.displayFilters}>
          {`Viewing ${this.props.selectedCategory}`}
        </button>
      </div>
    );
  }
}

export default WorkFilter;
