import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { useDrawerSelect } from "./useDrawerSelect";
import ActionButton from "antd/lib/modal/ActionButton";

const remoteLoadDataStopAC = payload => ({
  type: "remoteLoadDataStop",
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

const invalidActionAC = () => ({
  type: "invalidAction"
});

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
    return <input onChange={callAction} value={store}></input>;
  }
  const wrapper = mount(<TestComponent />);
  wrapper.update();

  return {
    wrapper,
    newStore
  };
}

describe("useDrawerSelect", () => {
  it("useDrawerSelect throw Error for invalid action type", () => {
    const { wrapper, newStore } = setUp(
      initialStoreMockData,
      setSelectedAC(true)
    );
    wrapper.find("input").simulate("change");
    const val = wrapper.find("input").props().value;
  });
});
