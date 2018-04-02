import React from 'react';
import Flickity from 'flickity';
import WorkItem from './WorkItem';
import WorkBar from './WorkBar';
import WorkFilter from './WorkFilter';
import ClickedItem from './ClickedItem';

const options = {
  cellSelector: '.work-item',
  accessibility: true,
  freeScroll: true,
  dragThreshold: 5,
  lazyLoad: 4,
  freeScrollFriction: 0.05,
  contain: true,
};

export default class WorkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: new Set([]),
      selectedCategory: 'All',
      cachedFilters: {},
      clickedItem: '',
    };

    this.itemClick = this.itemClick.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.displayFilters = this.displayFilters.bind(this);
  }

  componentWillMount() {
    this.setState({ items: this.props.items.item });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const carousel = document.getElementsByClassName('sf')[0];
      this.flkty = new Flickity(carousel, options);
      // this.flkty.on('cellSelect', this.updateSelected);
      this.flkty.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        if (typeof cellIndex === 'number') {
          this.flkty.select(cellIndex);
          this.itemClick(this.flkty.selectedElement);
        }
      });
    }
  }

  componentDidUpdate() {
    if (typeof window !== 'undefined') {
      const carousel = document.getElementsByClassName('sf')[0];
      this.flkty = new Flickity(carousel, options);
      this.flkty.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        if (typeof cellIndex === 'number') {
          this.flkty.select(cellIndex);
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.flkty) {
      this.flkty.destroy();
    }
  }

  itemClick(event) {
    console.log(event);
    this.setState({ clickedItem: this.state.items[event.dataset.index] });
    console.log(this.state.clickedItem);
    console.log(this.state.items[event.dataset.index]);
  }

  filterClick(event) {
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
    this.flkty.destroy();

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
      <section className="work">
        {this.state.clickedItem ? <ClickedItem item={this.state.clickedItem} /> : null}
        <div className="test">
          <div className="sf">
            <WorkItem
              items={this.state.items}
              categories={this.state.categories}
              itemClick={this.itemClick}
              clickedItem={this.state.clickedItem}
            />
          </div>
        </div>
        <div className="work-bar">
          <WorkFilter
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            filterClick={this.filterClick}
            displayFilters={this.displayFilters}
          />
          <WorkBar position={this.state.x} drag={this.scrollDrag} />
        </div>
      </section>
    );
  }
}
