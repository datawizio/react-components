import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import { Image } from "./Image";

const mockProps = {
  name: "Image name",
  placeholder: "placeholder",
  value: "value",
  onChange: jest.fn()
};

const setUp = (props?) => shallow(<Image {...props} />);

describe("FormBuilder Image component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Image rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Image call upload action", () => {
    const mockImg = {
      type: "image/jpeg",
      size: 10000
    };
    const mockInvalidImg = {
      type: "invalid/type",
      size: 10000
    };

    const mockTooLargeImg = {
      type: "image/jpeg",
      size: 5000000
    };
    const uploadDragger = component
      .find(".field-image-upload-container")
      .first();
    const isValidImg = uploadDragger.props().beforeUpload(mockImg);
    const isInvalidImg = !uploadDragger.props().beforeUpload(mockInvalidImg);
    const isTooLarge = !uploadDragger.props().beforeUpload(mockTooLargeImg);

    expect(isValidImg).toBeTruthy();
    expect(isInvalidImg).toBeTruthy();
    expect(isTooLarge).toBeTruthy();
  });

  it("Image call upload action", () => {
    Object.defineProperty(global, "FileReader", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        readAsDataURL: jest.fn(),
        onLoad: jest.fn(),
        result: true
      }))
    });

    const mockFile = {
      uid: "id"
    };
    const uploadDragger = component
      .find(".field-image-upload-container")
      .first();
    const uploadResult = uploadDragger.props().action(mockFile);
    expect(uploadResult).toBe("");
  });
});
