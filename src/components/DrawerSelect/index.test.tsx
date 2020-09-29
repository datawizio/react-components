import React from "react";
import { shallow } from "enzyme";
import DrawerSelect from "./index";
jest.mock("./antd/RcSelect", () => "select");

const setUp = (props?) => shallow(<DrawerSelect />);

describe("DrawerSelect component", () => {
  it("rendered", () => {
    const wrapper = setUp();
  });
});
