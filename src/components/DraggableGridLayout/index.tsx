import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

import "./index.less";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];

export default class DraggableGridLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 4,
    rowHeight: 50,
    onLayoutChange: function (val) {
      console.log(val);
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout))
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    //@ts-ignore
    this.props.onLayoutChange(layout); // updates status display
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <ReactGridLayout
          {...this.props}
          isResizable={false}
          //@ts-ignore
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        >
          <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
            <span className="text">1</span>
          </div>
          <div key="8" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
            <span className="text">8</span>
          </div>
          <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
            <span className="text">2</span>
          </div>
          <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
            <span className="text">3</span>
          </div>
          <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0 }}>
            <span className="text">4</span>
          </div>
          <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            <span className="text">5</span>
          </div>
          <div key="9" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            <span className="text">9</span>
          </div>
          <div key="7" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            <span className="text">7</span>
          </div>
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
