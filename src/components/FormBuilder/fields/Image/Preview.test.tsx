import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import { Modal } from "antd";

import { Preview } from "./Preview";

const mockOnDelete = jest.fn();

const mockProps = {
  value: "https://example.com/image.jpg",
  onDelete: mockOnDelete
};

const setUp = (props?) => shallow(<Preview {...props} />);

describe("FormBuilder Preview component", () => {
  let component;
  let confirmSpy: jest.SpyInstance;

  beforeEach(() => {
    confirmSpy = jest
      .spyOn(Modal, "confirm")
      .mockImplementation(() => ({ destroy: jest.fn(), update: jest.fn() }));
    component = setUp(mockProps);
  });

  afterEach(() => {
    confirmSpy.mockRestore();
  });

  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders correctly when disabled", () => {
    const comp = setUp({ ...mockProps, disabled: true });
    expect(comp).toMatchSnapshot();
  });

  it("uses the string value as the img src", () => {
    expect(component.find("img").prop("src")).toBe(
      "https://example.com/image.jpg"
    );
  });

  it("renders with a File value using an object URL", () => {
    const mockUrl = "blob:http://localhost/abc123";
    global.URL.createObjectURL = jest.fn().mockReturnValue(mockUrl);
    global.URL.revokeObjectURL = jest.fn();

    const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" });
    const comp = setUp({ value: mockFile, onDelete: mockOnDelete });

    expect(comp.find("img").prop("src")).toBe(mockUrl);
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
  });

  it("shows the delete action button when not disabled", () => {
    expect(component.find(".ant-upload-list-item-actions")).toHaveLength(1);
  });

  it("hides the delete action button when disabled", () => {
    const comp = setUp({ ...mockProps, disabled: true });
    expect(comp.find(".ant-upload-list-item-actions")).toHaveLength(0);
  });

  it("adds preview-disabled class when disabled", () => {
    const comp = setUp({ ...mockProps, disabled: true });
    expect(
      comp.find(".ant-upload-list-item").first().hasClass("preview-disabled")
    ).toBe(true);
  });

  describe("handleClick", () => {
    const mockEvent = { stopPropagation: jest.fn() };

    it("stops propagation and opens a confirmation modal", () => {
      component
        .find(".ant-upload-list-item")
        .first()
        .simulate("click", mockEvent);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(confirmSpy).toHaveBeenCalled();
    });

    it("calls onDelete when the modal is confirmed", () => {
      confirmSpy.mockImplementation(({ onOk }) => {
        onOk();
        return { destroy: jest.fn(), update: jest.fn() };
      });

      component
        .find(".ant-upload-list-item")
        .first()
        .simulate("click", mockEvent);

      expect(mockOnDelete).toHaveBeenCalled();
    });

    it("does not open a modal when disabled", () => {
      component = setUp({ ...mockProps, disabled: true });

      component
        .find(".ant-upload-list-item")
        .first()
        .simulate("click", mockEvent);

      expect(confirmSpy).not.toHaveBeenCalled();
    });
  });
});
