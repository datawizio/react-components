import { useReducer } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SelectValue } from "../DrawerSelect/antd/AntSelect";
import { AntTreeNode } from "antd/es/tree";
import { LevelsType } from "./types";
import { Key } from "antd/es/table/interface";

export interface IUseDrawerTreeSelect {
  drawerVisible: boolean;
  internalValue: any;
  selected: AntTreeNode;
  stateTreeData: any;
  internalLoading: boolean;
  internalLevels: LevelsType;
  selectAllState: string;
  internalTreeDataCount: number;
  internalTreeExpandedKeys: Key[];
  fakeVisible: boolean;
}

function reducer(state: IUseDrawerTreeSelect, action: any) {
  switch (action.type) {
    case "resetInternalValue":
      return { ...state, internalValue: [] };
    case "remoteLoadDataStart": {
      const newState: any = {
        stateTreeData: [],
        internalLoading: true
      };
      if (action.payload) {
        newState.value = action.payload;
      }
      return { ...state, ...newState };
    }
    case "remoteLoadDataStop": {
      action.payload.internalValue = filterInternalValue(state, action.payload.stateTreeData);
      return {
        ...state,
        internalLoading: false,
        ...action.payload
      };
    }
    case "drawerCancel": {
      action.payload.internalValue = filterInternalValue(state, action.payload.stateTreeData);
      return {
        ...state,
        selectAllState: "",
        drawerVisible: false,
        fakeVisible: false,
        internalTreeExpandedKeys: [],
        ...action.payload
      };
    }
    case "openDrawer": {
      return {
        ...state,
        drawerVisible: true,
        fakeVisible: true,
        ...action.payload
      };
    }
    case "drawerSubmit": {
      return {
        ...state,
        drawerVisible: false,
        fakeVisible: false,
        internalTreeExpandedKeys: []
      };
    }
    case "setSelected": {
      return {
        ...state,
        selected: action.payload
      };
    }
    case "internalTreeExpandedKeys": {
      return {
        ...state,
        internalTreeExpandedKeys: action.payload
      };
    }
    case "stateTreeData": {
      return {
        ...state,
        stateTreeData: action.payload
      };
    }
    case "internalValue": {
      return {
        ...state,
        internalValue: action.payload
      };
    }
    case "setState": {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      throw new Error();
  }
}

export const filterInternalValue = (state, stateTreeData) => {
  // check if selected keys are present in tree
  // filter internalValue by payload stateTreeData
  const stateTreeDataSet = new Set(stateTreeData.map(item => item.value));
  if (state.internalValue.length) {
    return state.internalValue.filter(item => {
      return stateTreeDataSet.has(item);
    });
  }
  return [];
}

export const useDrawerTreeSelect = (initialState: IUseDrawerTreeSelect) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return [state as IUseDrawerTreeSelect, dispatch as any];
};
