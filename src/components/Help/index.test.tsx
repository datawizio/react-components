import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import Help from "./index";
import { fireEvent, render } from "@testing-library/react";

const dropdownClick = (wrapper, name) => {
  fireEvent.click(wrapper.getByText(name));
};

const mockProps = {
  onTutorialLinkClick: jest.fn(),
  onServiceUpdateClick: jest.fn(),
  onHelperClick: jest.fn()
};

const setUp = (props?) => shallow(<Help {...props} />);

describe("Help component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Help rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("should clicks on Help Menu work correctly", () => {
    const wrapper = render(<Help {...mockProps} />);
    fireEvent.click(document.querySelector(".help-icon"));

    dropdownClick(wrapper, "READ_TUTORIAL");
    expect(mockProps.onTutorialLinkClick).toBeCalledTimes(1);

    dropdownClick(wrapper, "SERVICE_UPDATE");
    expect(mockProps.onServiceUpdateClick).toBeCalledTimes(1);

    dropdownClick(wrapper, "BES_HELPER");
    expect(mockProps.onHelperClick).toBeCalledTimes(1);
  });
});
