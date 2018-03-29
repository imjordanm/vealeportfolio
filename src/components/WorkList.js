import React from 'react';
import WorkItem from './WorkItem';
import WorkBar from '../components/WorkBar';
import WorkFilter from '../components/WorkFilter';

export default class WorkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: new Set([]),
      selectedCategory: 'All',
      cachedFilters: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.displayFilters = this.displayFilters.bind(this);
  }

  componentWillMount() {
    this.setState({ items: this.props.items.item });
  }

  handleClick(event) {
    if (document.getElementsByClassName('filter-active toggled')[0]) {
      document.getElementsByClassName('filter-list')[0].style.display = 'none';
      document.getElementsByClassName('filter-active toggled')[0].className = 'filter-active';
    }
    const barCategory = event.target.id;
    if (event.target.id === this.state.selectedCategory) {
      return;
    }

    this.setState({ selectedCategory: barCategory });
    this.renderCategory(barCategory);
  }

  displayFilters(event) {
    if (event.target.className === 'filter-active') {
      document.getElementsByClassName('filter-list')[0].style.display = 'block';
      event.target.className = 'filter-active toggled';
    } else {
      document.getElementsByClassName('filter-list')[0].style.display = 'none';
      event.target.className = 'filter-active';
    }
  }

  renderCategory(selected) {
    if (this.state.cachedFilters.hasOwnProperty(selected)) {
      this.setState({ items: this.state.cachedFilters[selected] });
      return;
    }

    if (selected === 'All') {
      const obj = Object.assign(this.state.cachedFilters, { [selected]: this.props.items.item });
      this.setState({
        cachedFilters: obj,
        items: this.props.items.item,
      });
    } else {
      const filtered = this.props.items.item.filter(item => item.category === selected);
      const obj = Object.assign(this.state.cachedFilters, { [selected]: filtered });
      this.setState({
        cachedFilters: obj,
        items: filtered,
      });
    }
  }

  render() {
    return (
      <div className="work">
        <div className="test">
          <div className="sf">
            <WorkItem items={this.state.items} categories={this.state.categories} />
          </div>
        </div>
        <div className="work-bar">
          <WorkFilter
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            handleClick={this.handleClick}
            displayFilters={this.displayFilters}
          />
          {/* <WorkBar position={this.state.x} drag={this.scrollDrag} /> */}
        </div>
      </div>
    );
  }
}
