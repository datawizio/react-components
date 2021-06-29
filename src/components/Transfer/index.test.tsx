import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Transfer from "./index";

const listCommonProps = {
  prefixCls: "ant-transfer-list",
  selectedText: "string",
  searchText: "string",
  titleText: "string",
  sourceLoadData: jest.fn(),
  noDataText: "Not Found"
};
const mockProps = {
  operationDisabled: false,
  sourceTitle: "string",
  sourceLoadData: jest.fn(() => {
    const obj = {
      data: [
        {
          totalPages: 5,
          count: 7,
          key: "a",
          title: "a"
        },
        {
          key: "b",
          title: "b"
        },
        {
          key: "c",
          title: "c"
        }
      ]
    };
    return obj;
  }),
  targetTitle: "string",
  targetLoadData: jest.fn(() => {
    const obj = {
      totalPages: 5,
      count: 7,
      data: [
        {
          key: "a",
          title: "a"
        },
        {
          key: "b",
          title: "b"
        },
        {
          key: "c",
          title: "c"
        }
      ]
    };
    return obj;
  }),
  onMoveToRight: jest.fn(),
  onMoveAllToRight: jest.fn(),
  onMoveToLeft: jest.fn(),
  onMoveAllToLeft: jest.fn()
};

const setUp = (props?) => mount(<Transfer {...props} />);

describe("Transfer component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Transfer rendered correctly", async () => {
    component.find("TransferList").first().setState({ loading: false });
    expect(component).toMatchSnapshot();
  });

  it("should move all keys to right list", () => {
    const handeMoveAllToRight = jest.fn();
    const wrapper = mount(
      //@ts-ignore
      <Transfer {...mockProps} onMoveAllToRight={handeMoveAllToRight} />
    );
    act(() => {
      wrapper
        .find(".ant-transfer-operation")
        .find(".ant-btn-icon-only")
        .at(0)
        .simulate("click"); // move all keys to right list
    });
    expect(handeMoveAllToRight).toHaveBeenCalled();
  });

  it("should move selected keys to right list", () => {
    const handeMoveToRight = jest.fn();
    const wrapper = mount(
      //@ts-ignore
      <Transfer {...mockProps} onMoveToRight={handeMoveToRight} />
    );

    act(() => {
      wrapper
        .find(".ant-transfer-operation")
        .find(".ant-btn-icon-only")
        .at(1)
        .simulate("click"); // move all keys to right list
    });
    expect(handeMoveToRight).toHaveBeenCalled();
  });

  it("should move selected keys to left list", () => {
    const handeMoveToLeft = jest.fn();
    const wrapper = mount(
      //@ts-ignore
      <Transfer {...mockProps} onMoveToLeft={handeMoveToLeft} />
    );

    act(() => {
      wrapper
        .find(".ant-transfer-operation")
        .find(".ant-btn-icon-only")
        .at(2)
        .simulate("click"); // move all keys to right list
    });
    expect(handeMoveToLeft).toHaveBeenCalled();
  });

  it("should move all keys to left list", () => {
    const handeMoveAllToLeft = jest.fn();
    const wrapper = mount(
      //@ts-ignore
      <Transfer {...mockProps} onMoveAllToLeft={handeMoveAllToLeft} />
    );

    act(() => {
      wrapper
        .find(".ant-transfer-operation")
        .find(".ant-btn-icon-only")
        .at(3)
        .simulate("click"); // move all keys to right list
    });
    expect(handeMoveAllToLeft).toHaveBeenCalled();
  });
});
