import * as React from "react";

import "../index.less";

const ToolBar: React.FC = props => {
  return <div className="table-toolbar">{props.children}</div>;
};

export default ToolBar;
