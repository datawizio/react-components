import "jsdom-global/register";
import React from "react";

import DrawerTreeSelect from "./index";
import { shallow } from "enzyme";

import AntTreeSelect from "./antd/AntTreeSelect";

jest.mock("rc-select/es/Selector", () => {});
jest.mock("rc-select/es/SelectTrigger", () => {});

const A = () =>
  React.forwardRef((props, ref) => {
    //@ts-ignore
    return <input ref={ref}>moked</input>;
  });

jest.mock("./antd/AntTreeSelect", () => jest.fn());
//@ts-ignore
AntTreeSelect.mockImplementation(() => A);

describe("DrawerTreeSelect", () => {
  it("DrawerTreeSelect to match snapshot with defaul props", () => {
    const component = shallow(<DrawerTreeSelect />);
    expect(component).toMatchSnapshot();
  });

  it("DrawerTreeSelect to match snapshot with custom props and triger events", () => {
    const mockProps = {
      multiple: true
    };

    const mockChangeEvent = {
      checked: true,
      triggerValue: "value"
    };

    const component = shallow(<DrawerTreeSelect {...mockProps} />);
    component
      .find(".drawer-tree-select")
      .simulate("change", "value", "label", mockChangeEvent);
    component.find(".drawer-tree-select").simulate("select", "", "node");
    component.find(".drawer-tree-select").simulate("beforeBlur");
    component.find(".drawer-tree-select").simulate("treeExpand", "key");

    expect(component).toMatchSnapshot();
  });
});
