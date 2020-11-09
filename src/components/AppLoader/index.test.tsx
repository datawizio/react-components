import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import AppLoader from "./index";

const mockProps = {
  imageSrc: "mockImg"
};

const setUp = (props?) => mount(<AppLoader {...props} />);

describe("AppLoader component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render AppLoader correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("AppLoader has correct class", () => {
    expect(component.find(".loader").length).toBeTruthy();
  });

  it("AppLoader has correct img", () => {
    expect(component.find("img").props().src).toBe(mockProps.imageSrc);
  });
});
