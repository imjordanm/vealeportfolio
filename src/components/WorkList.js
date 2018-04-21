import React from 'react';
import Flickity from 'flickity';
import WorkItem from './WorkItem';
import WorkBar from './WorkBar';
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
  selectedAttraction: 0.018,
  friction: 0.28,
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
    this.itemClose = this.itemClose.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillMount() {
    this.setState({ items: this.props.items.item });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (matchMedia('screen and (max-width: 900px)').matches) {
        options.wrapAround = true;
      }

      const carousel = document.getElementsByClassName('sf')[0];
      this.flkty = new Flickity(carousel, options);
      this.flkty.focus();
      this.flkty.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        if (typeof cellIndex === 'number') {
          console.log(`${cellIndex} ${this.flkty.selectedIndex}`);
          if (cellIndex === this.flkty.selectedIndex) {
            this.itemClick(this.flkty.selectedElement);
          }
          this.flkty.select(cellIndex);
        }
      });
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
    if (!this.state.clickedItem) {
      this.setState({ clickedItem: this.state.items[event.dataset.index] });
    }
  }

  itemClose(event) {
    if (this.state.clickedItem) {
      this.setState({ clickedItem: null });
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
