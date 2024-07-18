import * as React from "react";
import { IHelpMenu } from "./types";
import HelpMenu from "./HelpMenu";
import "./styles.less";

const Help: React.FC<IHelpMenu> = ({ ...params }) => {
  return (
    <>
      <HelpMenu {...params} />
      <div className="divider"></div>
    </>
  );
};

export default Help;
