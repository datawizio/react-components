import "jsdom-global/register";

import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Upload } from "antd";

import { Image } from "./Image";
import { Preview } from "./Preview";

import type { RcFile } from "antd/es/upload";
import type { ImageProps } from "../../types";

const mockOnChange = jest.fn();

const mockProps: ImageProps = {
  name: "Image name",
  placeholder: "placeholder",
  value: "value",
  onChange: mockOnChange
};

type UploadDraggerProps = {
  beforeUpload: (file: RcFile) => boolean;
  action: (file: RcFile) => string;
};

type MockFileReader = {
  readAsDataURL: jest.Mock;
  result: string;
  onload: (() => void) | null;
};

const setUp = (props: ImageProps = mockProps) => shallow(<Image {...props} />);

const getDraggerProps = (wrapper: ShallowWrapper): UploadDraggerProps =>
  (wrapper
    .find(Upload.Dragger)
    .first()
    .props() as unknown) as UploadDraggerProps;

describe("FormBuilder Image component", () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("renders correctly with value", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders correctly without value", () => {
    const comp = setUp({ ...mockProps, value: null });
    expect(comp).toMatchSnapshot();
  });

  it("renders correctly when disabled", () => {
    const comp = setUp({ ...mockProps, disabled: true });
    expect(comp).toMatchSnapshot();
  });

  it("renders correctly with rect shape", () => {
    const comp = setUp({ ...mockProps, shape: "rect" });
    expect(comp).toMatchSnapshot();
  });

  describe("beforeUpload validation", () => {
    let draggerProps: UploadDraggerProps;

    beforeEach(() => {
      draggerProps = getDraggerProps(component);
    });

    const mockFile = (overrides: Partial<RcFile>): RcFile =>
      ({ uid: "id", ...overrides } as RcFile);

    it("accepts a valid JPEG within size limit", () => {
      expect(
        draggerProps.beforeUpload(mockFile({ type: "image/jpeg", size: 10000 }))
      ).toBe(true);
    });

    it("accepts a valid PNG within size limit", () => {
      expect(
        draggerProps.beforeUpload(mockFile({ type: "image/png", size: 10000 }))
      ).toBe(true);
    });

    it("rejects an unsupported file type", () => {
      expect(
        draggerProps.beforeUpload(
          mockFile({ type: "application/pdf", size: 10000 })
        )
      ).toBe(false);
    });

    it("rejects a file exceeding the default 2 MB limit", () => {
      // 5 000 000 bytes ≈ 4.77 MB > 2 MB
      expect(
        draggerProps.beforeUpload(
          mockFile({ type: "image/jpeg", size: 5000000 })
        )
      ).toBe(false);
    });

    it("accepts a file within a custom maxFileSize", () => {
      const comp = setUp({ ...mockProps, maxFileSize: 10 });
      expect(
        getDraggerProps(comp).beforeUpload(
          mockFile({ type: "image/jpeg", size: 5000000 })
        )
      ).toBe(true);
    });
  });

  describe("upload action – saveAs: base64 (default)", () => {
    const mockResult = "data:image/jpeg;base64,abc123";
    let onLoadHandler: (() => void) | undefined;

    beforeEach(() => {
      onLoadHandler = undefined;
      const mockReader: MockFileReader = {
        readAsDataURL: jest.fn(),
        result: mockResult,
        onload: null
      };
      Object.defineProperty(mockReader, "onload", {
        set(fn: () => void) {
          onLoadHandler = fn;
        },
        configurable: true
      });
      global.FileReader = (jest.fn(
        () => mockReader
      ) as unknown) as typeof FileReader;
    });

    it("returns an empty string immediately", () => {
      const { action } = getDraggerProps(component);
      expect(action({ uid: "id" } as RcFile)).toBe("");
    });

    it("calls onChange with the base64 result after the file is read", () => {
      const { action } = getDraggerProps(component);
      action({ uid: "id" } as RcFile);
      onLoadHandler?.();

      expect(mockOnChange).toHaveBeenCalledWith({
        name: "Image name",
        value: mockResult
      });
    });
  });

  describe("upload action – saveAs: file", () => {
    it("calls onChange with the File object directly", () => {
      const comp = setUp({ ...mockProps, saveAs: "file" });
      const mockFile = {
        uid: "id",
        type: "image/jpeg",
        size: 10000
      } as RcFile;

      getDraggerProps(comp).action(mockFile);

      expect(mockOnChange).toHaveBeenCalledWith({
        name: "Image name",
        value: mockFile
      });
    });
  });

  describe("delete", () => {
    it("calls onChange with null when Preview triggers onDelete", () => {
      component.find(Preview).first().props().onDelete();

      expect(mockOnChange).toHaveBeenCalledWith({
        name: "Image name",
        value: null
      });
    });
  });
});
