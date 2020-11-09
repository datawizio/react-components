import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import ApiError from "./index";

const mockShowErrorFunc = jest.fn();
jest.mock("antd/lib/notification", () => ({
  error: () => mockShowErrorFunc()
}));

const mockProps = {
  errors: "errorsText"
};

const setUp = (props?) => shallow(<ApiError {...props} />);

describe("ApiError component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("ApiError rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("ApiError show error notification", () => {
    ApiError.showError("errorText");
    expect(mockShowErrorFunc).toBeCalledTimes(1);
  });
});
