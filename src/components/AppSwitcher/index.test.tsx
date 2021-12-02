import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import AppSwitcher from "./index";

const mockProps = {
  apps: [{ app_id: "first app", name: "AP", description: "Admin Panel" }]
};

const setUp = (props?) => mount(<AppSwitcher {...props} />);

describe("AppSwitcher component", () => {
  let component;

  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render AppSwitcher correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
