import { useReducer } from "react";

export interface IUseTransfer {
  sourceChecked: string[];
  targetChecked: string[];
}

function reducer(state: IUseTransfer, action: any) {
  switch (action.type) {
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

export const useTransfer = (initialState: IUseTransfer) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return [state as IUseTransfer, dispatch as any];
};
