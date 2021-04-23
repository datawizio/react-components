import "jsdom-global/register";
import React from "react";
import { useDrawerTreeSelect } from "./useDrawerTreeSelect";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

const resetInternalValueAC = () => ({
  type: "resetInternalValue"
});

const remoteLoadDataStartAC = payload => ({
  type: "remoteLoadDataStart",
  payload
});

const remoteLoadDataStopAC = payload => ({
  type: "remoteLoadDataStop",
  payload
});

const drawerCancelAC = payload => ({
  type: "drawerCancel",
  payload
});

const openDrawerAC = payload => ({
  type: "openDrawer",
  payload
});

const drawerSubmitAC = () => ({
  type: "drawerSubmit"
});

const setSelectedAC = payload => ({
  type: "setSelected",
  payload
});

const internalTreeExpandedKeysAC = payload => ({
  type: "internalTreeExpandedKeys",
  payload
});

const stateTreeDataAC = payload => ({
  type: "stateTreeData",
  payload
});

const internalValueAC = payload => ({
  type: "internalValue",
  payload
});

const setStateAC = payload => ({
  type: "setState",
  payload
});

const initialStoreMockData = {
  fakeVisible: false,
  drawerVisible: false,
  internalValue: "value",
  selected: {},
  stateTreeData: [],
  internalLoading: false,
  internalLevels: {
    value: "internalLevelsValue",
    label: "label"
  },
  selectAllState: "",
  internalTreeDataCount: 0,
  internalTreeExpandedKeys: []
};

function setUp(initialStore, action) {
  let newStore;
  function TestComponent() {
    const reducerResult = useDrawerTreeSelect(initialStore);
    const [store, dispatch] = reducerResult;
    const callAction = () => {
      act(() => {
        dispatch(action);
      });
    };
    newStore = store;
    return <button onClick={callAction} data-store={store}></button>;
  }
  const wrapper = mount(<TestComponent />);
  wrapper.update();

  return {
    wrapper,
    newStore
  };
}

describe("Drawer tree select reducer", () => {
  it("resetInternalValue action", () => {
    const { wrapper } = setUp(initialStoreMockData, resetInternalValueAC());
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.internalValue).toEqual([]);
  });

  it("remoteLoadDataStart action", () => {
    const payload = "newValue";
    const { wrapper } = setUp(
      initialStoreMockData,
      remoteLoadDataStartAC(payload)
    );
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.stateTreeData).toEqual([]);
    expect(nextStore.internalLoading).toBeTruthy();
    expect(nextStore.value).toBe(payload);
  });

  it("remoteLoadDataStop action", () => {
    const propStoreKey = "value";
    const payload = {
      [propStoreKey]: "nextValue"
    };

    const { wrapper } = setUp(
      initialStoreMockData,
      remoteLoadDataStopAC(payload)
    );
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.internalLoading).toBeFalsy();
    expect(nextStore[propStoreKey]).toBe(payload[propStoreKey]);
  });

  it("drawerCancel action", () => {
    const propStoreKey = "value";
    const payload = {
      [propStoreKey]: "nextValue"
    };

    const { wrapper } = setUp(initialStoreMockData, drawerCancelAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore[propStoreKey]).toBe(payload[propStoreKey]);
    expect(nextStore.internalTreeExpandedKeys).toEqual([]);
    expect(nextStore.fakeVisible).toBeFalsy();
    expect(nextStore.drawerVisible).toBeFalsy();
    expect(nextStore.selectAllState).toBe("");
  });

  it("openDrawer action", () => {
    const propStoreKey = "value";
    const payload = {
      [propStoreKey]: "nextValue"
    };

    const { wrapper } = setUp(initialStoreMockData, openDrawerAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.fakeVisible).toBeTruthy();
    expect(nextStore.drawerVisible).toBeTruthy();
    expect(nextStore[propStoreKey]).toBe(payload[propStoreKey]);
  });

  it("drawerSubmit action", () => {
    const { wrapper } = setUp(initialStoreMockData, drawerSubmitAC());
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.fakeVisible).toBeFalsy();
    expect(nextStore.drawerVisible).toBeFalsy();
    expect(nextStore.internalTreeExpandedKeys).toEqual([]);
  });

  it("setSelected action", () => {
    const payload = true;
    const { wrapper } = setUp(initialStoreMockData, setSelectedAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.selected).toBe(payload);
  });

  it("internalTreeExpandedKeys action", () => {
    const payload = [1, 2, 3];
    const { wrapper } = setUp(
      initialStoreMockData,
      internalTreeExpandedKeysAC(payload)
    );
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.internalTreeExpandedKeys).toBe(payload);
  });

  it("stateTreeData action", () => {
    const payload = [3, 2, 1];
    const { wrapper } = setUp(initialStoreMockData, stateTreeDataAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.stateTreeData).toBe(payload);
  });

  it("internalValue action", () => {
    const payload = "new internalValue";
    const { wrapper } = setUp(initialStoreMockData, internalValueAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.internalValue).toBe(payload);
  });

  it("setState action", () => {
    const propStoreKey = "value";
    const payload = {
      [propStoreKey]: "nextValue"
    };

    const { wrapper } = setUp(initialStoreMockData, setStateAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore[propStoreKey]).toBe(payload[propStoreKey]);
  });
});
