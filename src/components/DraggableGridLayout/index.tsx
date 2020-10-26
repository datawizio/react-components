import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

import { DraggableGridProps, DraggableGridState } from "./types";
import "./index.less";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS() || [];

export default class DraggableGridLayout extends React.PureComponent<
  DraggableGridProps,
  DraggableGridState
> {
  static defaultProps = {
    className: "layout",
    cols: 4,
    rowHeight: 400,
    onLayoutChange: lay => {
      console.log(lay);
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      items: JSON.parse(JSON.stringify(originalLayout)),
      newCounter: 0
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  resetLayout() {
    this.setState({
      items: []
    });
  }

  onLayoutChange(items) {
    saveToLS(items);
    this.setState({ items });

    this.props.onLayoutChange(items);
  }

  onAddItem() {
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: this.state.newCounter.toString(),
        x: (this.state.items.length * 2) % this.props.cols,
        y: Infinity, // puts it at the bottom
        w: 1,
        h: 1
      }),
      newCounter: this.state.newCounter + 1
    });
  }

  // onRemoveItem(i) {
  //   console.log("removing", i);
  //   this.setState({ items: this.state.items.filter(item => item.i === i)) });
  // }

  createItem(item) {
    return (
      <div key={item.config.i} data-grid={item.config}>
        <span>{item.config.i}</span>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <ReactGridLayout
          {...this.props}
          //@ts-ignore
          layout={this.state.items}
          onLayoutChange={this.onLayoutChange}
        >
          <div key="1" data-grid={{ w: 1, h: 1, x: 0, y: 0 }}>
            <span className="text">1</span>
          </div>
          <div key="2" data-grid={{ w: 1, h: 1, x: 2, y: 0 }}>
            <span className="text">2</span>
          </div>
          <div key="3" data-grid={{ w: 1, h: 1, x: 4, y: 0 }}>
            <span className="text">3</span>
          </div>
          <div key="4" data-grid={{ w: 1, h: 1, x: 6, y: 0 }}>
            <span className="text">4</span>
          </div>
          <div key="5" data-grid={{ w: 1, h: 1, x: 8, y: 0 }}>
            <span className="text">5</span>
          </div>
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS() {
  let ls;
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("layout")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls;
}

function saveToLS(value) {
  if (global.localStorage) {
    global.localStorage.setItem("layout", JSON.stringify(value));
  }
}
