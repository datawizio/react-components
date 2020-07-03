import { useReducer } from "react";

import { SelectValue } from "../DrawerSelect/antd/AntSelect";
import { AntTreeNode } from "antd/es/tree";

export interface IUseDrawerSelect {
  internalLoading: boolean;
  page: number;
  totalPages: number;
  drawerVisible: boolean;
  searchValue: string;
  internalValue: SelectValue;
  selected: AntTreeNode;
  optionsState: any;
}

function reducer(state: IUseDrawerSelect, action: any) {
  switch (action.type) {
    case "remoteLoadDataStart": {
      return { ...state, internalLoading: true, ...action.payload };
    }
    case "remoteLoadDataStop": {
      return { ...state, internalLoading: false, ...action.payload };
    }
    case "drawerCancel": {
      return {
        ...state,
        searchValue: "",
        drawerVisible: false,
        ...action.payload
      };
    }
    case "openDrawer": {
      return {
        ...state,
        drawerVisible: true
      };
    }
    case "drawerSubmit": {
      return {
        ...state,
        searchValue: "",
        drawerVisible: false
      };
    }
    case "setSelected": {
      return {
        ...state,
        selected: action.payload
      };
    }
    case "setSearchValue": {
      return {
        ...state,
        searchValue: action.payload
      };
    }
    case "setInternalValue": {
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

export const useDrawerSelect = (initialState: IUseDrawerSelect) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return [state as IUseDrawerSelect, dispatch as any];
};
