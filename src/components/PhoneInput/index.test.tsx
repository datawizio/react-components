import "jsdom-global/register";
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import PhoneInput from "./index";

const mockProps = {
  placeholder: "placeholder",
  defaultCountry: "uk",
  value: "12345678",
  onChange: jest.fn()
};

const setUp = (props?) => mount(<PhoneInput {...props} />);

describe("PhoneInput component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("PhoneInput rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("PhoneInput validator works correctly", () => {
    const mockValidPhoneNumber = "+380994040400";
    const mockInvalidPhoneNumber = "0000994040400";

    expect(PhoneInput.isValidPhoneNumber(mockValidPhoneNumber)).toBeTruthy();
    expect(PhoneInput.isValidPhoneNumber(mockInvalidPhoneNumber)).toBeFalsy();
  });

  it("PhoneInput rendered correctly with empty value", () => {
    const wrapper = setUp({ ...mockProps, value: "UA" });
    expect(wrapper).toMatchSnapshot();
  });

  it("PhoneInput onChange input", () => {
    const mockEvent = {
      target: {
        value: "4141411"
      }
    };
    const input = component.find(".phone-input-input").first();
    act(() => {
      input.prop("onChange")(mockEvent);
    });
    expect(component.prop("onChange")).toBeCalledTimes(1);
  });

  it("PhoneInput onChange select", () => {
    const mockCountry = "UA";
    const select = component.find(".phone-input-select").first();
    act(() => {
      select.prop("onChange")(mockCountry);
    });
    select.update();
    expect(select.prop("value")).toBe(mockCountry);
  });
});
