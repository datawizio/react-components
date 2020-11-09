import "jsdom-global/register";
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { useDrawerSelect } from "./useDrawerSelect";

const remoteLoadDataStopAC = payload => ({
  type: "remoteLoadDataStop",
  payload
});

const remoteLoadDataStartAC = payload => ({
  type: "remoteLoadDataStart",
  payload
});

const drawerCancelAC = payload => ({
  type: "drawerCancel",
  payload
});

const openDrawerAC = () => ({
  type: "openDrawer"
});

const drawerSubmitAC = payload => ({
  type: "drawerSubmit",
  payload
});

const setSelectedAC = payload => ({
  type: "setSelected",
  payload
});

const setSearchValueAC = payload => ({
  type: "setSearchValue",
  payload
});

const setInternalValueAC = payload => ({
  type: "setInternalValue",
  payload
});

const setStateAC = payload => ({
  type: "setState",
  payload
});

// const invalidActionAC = () => ({
//   type: "invalidAction"
// });

const initialStoreMockData = {
  internalLoading: false,
  page: 0,
  totalPages: 1,
  drawerVisible: false,
  searchValue: "",
  internalValue: undefined,
  selected: undefined,
  optionsState: []
};

function setUp(initialStore, action) {
  let newStore;
  function TestComponent() {
    const reducerResult = useDrawerSelect(initialStore);
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

describe("useDrawerSelect", () => {
  it("remoteLoadDataStart case works correctly", () => {
    const payload = {
      optionsState: "value"
    };
    const { wrapper } = setUp(
      initialStoreMockData,
      remoteLoadDataStartAC(payload)
    );
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.internalLoading).toBeTruthy();
    expect(nextStore.optionsState).toBe(payload.optionsState);
  });

  it("remoteLoadDataStop case works correctly", () => {
    const payload = {
      optionsState: "value"
    };
    const { wrapper } = setUp(
      initialStoreMockData,
      remoteLoadDataStopAC(payload)
    );
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.internalLoading).toBeFalsy();
    expect(nextStore.optionsState).toBe(payload.optionsState);
  });

  it("drawerCancel case works correctly", () => {
    const payload = {
      optionsState: "value"
    };

    const { wrapper } = setUp(initialStoreMockData, drawerCancelAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.searchValue).toBe("");
    expect(nextStore.drawerVisible).toBeFalsy();
    expect(nextStore.optionsState).toBe(payload.optionsState);
  });

  it("openDrawer case works correctly", () => {
    const { wrapper } = setUp(initialStoreMockData, openDrawerAC());
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.drawerVisible).toBeTruthy();
  });
  it("drawerSubmit case works correctly", () => {
    const payload = {
      optionsState: "value"
    };

    const { wrapper } = setUp(initialStoreMockData, drawerSubmitAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.searchValue).toBe("");
    expect(nextStore.drawerVisible).toBeFalsy();
    expect(nextStore.optionsState).toBe(payload.optionsState);
  });
  it("setSelected case works correctly", () => {
    const { wrapper } = setUp(initialStoreMockData, setSelectedAC(true));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.selected).toBeTruthy();
  });
  it("setSearchValue case works correctly", () => {
    const payload = "searchValue";
    const { wrapper } = setUp(initialStoreMockData, setSearchValueAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.searchValue).toBe(payload);
  });
  it("setInternalValue case works correctly", () => {
    const payload = "internalValue";
    const { wrapper } = setUp(
      initialStoreMockData,
      setInternalValueAC(payload)
    );
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore.internalValue).toBe(payload);
  });

  it("setState case works correctly", () => {
    const payload = {
      internalLoading: true,
      page: 5,
      totalPages: 15,
      drawerVisible: true,
      searchValue: "value",
      internalValue: "internalValue",
      selected: true,
      optionsState: []
    };
    const { wrapper } = setUp(initialStoreMockData, setStateAC(payload));
    wrapper.find("button").simulate("click");
    const nextStore = wrapper.find("button").prop("data-store") as any;

    expect(nextStore).toEqual(payload);
  });
});
