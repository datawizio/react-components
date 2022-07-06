import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Forbidden from "./index";

const mockProps = {
  backUrl: "backUrl"
};

const setUp = (props?) => mount(<Forbidden {...props} />);

describe("Forbidden component", () => {
  let component;
  beforeEach(() => {
    jest.spyOn(console, "error");
    //@ts-ignore
    console.error.mockImplementation(() => {});
    component = setUp(mockProps);
  });

  afterEach(() => {
    //@ts-ignore
    console.error.mockRestore();
  });

  it("Render Forbidden correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Render Forbidden correctly", () => {
    const mockHref = "href";
    Object.defineProperty(window, "location", {
      value: {
        href: mockHref
      }
    });
    Object.defineProperty(window, "localStorage", {
      value: {
        removeItem: jest.fn()
      }
    });

    const button = component.find("Button").first();
    button.props().onClick();
    expect(window.location.href).toBe(mockProps.backUrl);
    expect(window.localStorage.removeItem).toBeCalledTimes(2);
  });
});
