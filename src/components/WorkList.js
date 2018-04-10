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
  wrapAround: false,
  prevNextButtons: false,
  pageDots: false,
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
      toggledFilter: false,
      isFlickity: true,
    };

    this.itemClick = this.itemClick.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillMount() {
    this.setState({ items: this.props.items.item });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (matchMedia('screen and (max-width: 900px)').matches) {
        options.lazyLoad = 2;
        options.freeScroll = false;
        options.wrapAround = true;
      }

      const carousel = document.getElementsByClassName('sf')[0];
      this.flkty = new Flickity(carousel, options);
      this.flkty.focus();
      this.flkty.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        if (typeof cellIndex === 'number') {
          this.flkty.select(cellIndex);
          this.itemClick(this.flkty.selectedElement);
        }
      });
      // document.addEventListener('keyup', this.enterPress, false);
    }
  }

  componentDidUpdate() {
    if (typeof window !== 'undefined' && !this.state.isFlickity) {
      if (matchMedia('screen and (max-width: 900px)').matches) {
        options.lazyLoad = 2;
        options.freeScroll = false;
      }

      const carousel = document.getElementsByClassName('sf')[0];
      this.flkty = new Flickity(carousel, options);
      this.flkty.focus();
      this.flkty.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        if (typeof cellIndex === 'number') {
          this.flkty.select(cellIndex);
          this.itemClick(this.flkty.selectedElement);
        }
      });
      this.setState({ isFlickity: true });
    }
  }

  componentWillUnmount() {
    if (this.flkty) {
      this.flkty.destroy();
    }
    // document.removeEventListener('keyup', this.enterPress, false);
  }

  keyPress(event) {
    if (event.key === 'Enter') {
      this.itemClick(this.flkty.selectedElement);
    } else if (event.key === 'Escape') {
      this.setState({ clickedItem: null });
    }
  }

  itemClick(event) {
    if (this.state.clickedItem) {
      this.setState({ clickedItem: null });
    } else {
      this.setState({ clickedItem: this.state.items[event.dataset.index] });
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
          <ClickedItem item={this.state.clickedItem} itemClick={this.itemClick} />
        ) : null}
        <div className="test">
          <div className="sf">
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
          {/* <WorkBar position={this.state.x} drag={this.scrollDrag} /> */}
        </div>
      </section>
    );
  }
}
