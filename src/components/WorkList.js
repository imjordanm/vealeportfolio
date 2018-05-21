import React from 'react';
import Flickity from 'flickity';
import WorkItem from './WorkItem';
import WorkFilter from './WorkFilter';
import ClickedItem from './ClickedItem';

const options = {
  cellSelector: '.work-item',
  accessibility: true,
  lazyLoad: 2,
  contain: false,
  wrapAround: false,
  prevNextButtons: false,
  pageDots: false,
  autoPlay: 5000,
  selectedAttraction: 0.015,
  friction: 0.3,
};

export default class WorkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: new Set([]),
      selectedCategory: 'All',
      cachedFilters: {},
      clickedItem: null,
      toggledFilter: false,
      isFlickity: true,
    };

    this.itemClick = this.itemClick.bind(this);
    this.itemClose = this.itemClose.bind(this);
    this.itemSwitch = this.itemSwitch.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillMount() {
    this.setState({ items: this.props.items.item });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const carousel = document.getElementsByClassName('work-list')[0];
      this.flkty = new Flickity(carousel, options);
      this.flkty.focus();
      this.flkty.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        if (typeof cellIndex === 'number') {
          if (cellIndex === this.flkty.selectedIndex) {
            this.itemClick(this.flkty.selectedElement);
          }
          this.flkty.select(cellIndex);
        }
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.isFlickity) {
      const carousel = document.getElementsByClassName('work-list')[0];
      this.flkty = new Flickity(carousel, options);
      this.flkty.focus();
      this.flkty.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        if (typeof cellIndex === 'number') {
          if (cellIndex === this.flkty.selectedIndex) {
            this.itemClick(this.flkty.selectedElement);
          }
          this.flkty.select(cellIndex);
        }
      });
      this.setState({ isFlickity: true });
    }
  }

  componentWillUnmount() {
    if (this.flkty) {
      this.flkty.destroy();
    }
  }

  keyPress(event) {
    if (event.key === 'Enter') {
      this.itemClick(this.flkty.selectedElement);
    } else if (event.key === 'Escape') {
      this.setState({ clickedItem: null });
    }
  }

  itemClick(event) {
    if (!this.state.clickedItem) {
      this.setState({ clickedItem: this.state.items[event.dataset.index] });
    }
  }

  itemClose(event) {
    if (this.state.clickedItem) {
      this.setState({ clickedItem: null });
    }
  }

  itemSwitch(event) {
    const index = this.flkty.selectedIndex;
    const length = this.flkty.cells.length;
    if (event.clientX <= window.innerWidth / 2 && index !== 0) {
      this.setState({ clickedItem: this.state.items[index - 1] });
      this.flkty.previous();
    }
    if (event.clientX >= window.innerWidth / 2 && index !== length - 1) {
      this.setState({ clickedItem: this.state.items[index + 1] });
      this.flkty.next();
    }
  }

  filterClick(event) {
    if (this.state.toggledFilter) {
      this.setState({ toggledFilter: false });
    } else {
      this.setState({ toggledFilter: true });
    }

    const barCategory = event.target.id;
    if (barCategory && barCategory !== this.state.selectedCategory) {
      this.setState({ selectedCategory: barCategory });
      this.renderCategory(barCategory);
    }
  }

  renderCategory(selected) {
    this.flkty.destroy();
    this.setState({ isFlickity: false });

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
      <section className="work" onKeyUp={this.keyPress}>
        {this.state.clickedItem ? (
          <ClickedItem item={this.state.clickedItem} itemClose={this.itemClose} />
        ) : null}
        <div
          className={this.state.clickedItem !== null ? 'item-overlay clicked' : 'item-overlay'}
          onClick={this.itemSwitch}
        />
        <div className={this.state.clickedItem !== null ? 'test clicked' : 'test'}>
          <div className="work-list">
            <WorkItem items={this.state.items} categories={this.state.categories} />
          </div>
        </div>
        <div className="work-bar">
          <WorkFilter
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            filterClick={this.filterClick}
            toggledFilter={this.state.toggledFilter}
          />
        </div>
      </section>
    );
  }
}
