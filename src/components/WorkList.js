import React from 'react';
import Draggable from 'react-draggable';
import WorkItem from './WorkItem';
import WorkBar from '../components/WorkBar';

export default class WorkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
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

  componentDidMount() {
    this.bounds();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items !== this.state.items) {
      this.bounds();
    }
  }

  bounds() {
    if (!document.getElementsByClassName('container')[0]) {
      return;
    }
    const container = document.getElementsByClassName('container')[0];
    const contWidth = container.getBoundingClientRect().width;

    const workList = document.getElementsByClassName('work-list')[0];
    const listWidth = workList.getBoundingClientRect().width;

    document.getElementsByClassName('react-draggable')[0].style.transform = 'none';

    const width = contWidth - listWidth;

    if (this.state.width !== width) {
      if (width > 0 && listWidth < contWidth) {
        this.setState({ width: 0 }, () => {});
      } else {
        this.setState({ width }, () => {});
      }
    }
  }

  handleClick(event) {
    document.getElementsByClassName('filter-list')[0].style.display = 'none';
    const barCategory = event.target.id;
    if (event.target.id === this.state.selectedCategory) {
      return;
    }

    this.setState({ selectedCategory: barCategory });
    this.renderCategory(barCategory);
  }

  displayFilters() {
    document.getElementsByClassName('filter-list')[0].style.display = 'block';
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
        <Draggable
          axis="x"
          defaultPosition={{ x: 0, y: 0 }}
          bounds={{ left: this.state.width, right: 0 }}
        >
          <div>
            <WorkItem items={this.state.items} categories={this.state.categories} />
          </div>
        </Draggable>
        <WorkBar
          categories={this.state.categories}
          selectedCategory={this.state.selectedCategory}
          handleClick={this.handleClick}
          displayFilters={this.displayFilters}
        />
      </div>
    );
  }
}
