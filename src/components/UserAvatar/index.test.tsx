import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import UserAvatar from "./index";

const mockProps = {
  src: "photoSrc",
  name: "John Lennon"
};

const setUp = (props?) => shallow(<UserAvatar {...props} />);

describe("UserAvatar component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("UserAvatar rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("UserAvatar show full name", () => {
    const abbr = mockProps.name
      .split(" ")
      .map(i => i[0])
      .join("");
    expect(toJson(component).children).toContain(abbr);
  });

  it("UserAvatar without photo", () => {
    const wrapper = setUp({ ...mockProps, src: null });

    expect(toJson(component).props).toHaveProperty("src");
    expect(toJson(wrapper).props).not.toHaveProperty("src");
  });
});
