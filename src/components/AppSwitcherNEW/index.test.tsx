import "jsdom-global/register";
import React from "react";
import { mount, ReactWrapper } from "enzyme";

import AppSwitcher from "./index";

const mockProps = {
  apps: [
    {
      app_id: "first app",
      name: "AP",
      description: "Admin Panel",
      is_main: false
    },
    {
      app_id: "second app",
      name: "BI",
      description: "Builder",
      is_main: true
    }
  ]
};

const setUp = (props?: any) => mount(<AppSwitcher {...props} />);

describe("AppSwitcher component", () => {
  let component: ReactWrapper<any, React.Component["state"], React.Component>;

  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render AppSwitcher correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
