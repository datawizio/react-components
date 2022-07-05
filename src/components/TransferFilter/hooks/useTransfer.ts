import { Dispatch, useMemo, useReducer } from "react";
import { ICheckedItem, TransferFilterValue } from "../types";

export interface IUseTransfer {
  internalValue: TransferFilterValue;
  sourceValue: TransferFilterValue;
  sourceCheckedObj: { [key: string]: ICheckedItem };
  sourceChecked: Array<string>;
  targetValue: TransferFilterValue;
  targetChecked: Array<string>;
}

export interface IInitUseTransfer {
  internalValue: TransferFilterValue;
}

type UseTransferAction = {
  type: "setState";
  payload: Partial<IUseTransfer>;
};

function reducer(state: IUseTransfer, action: UseTransferAction) {
  switch (action.type) {
    case "setState": {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}

export const parseValue = (value: TransferFilterValue) => {
  const leftLoad = value.include === null || value.include.length > 0;
  // const rightLoad = value.include !== null && value.include.length === 0;

  const sourceValue: TransferFilterValue = {
    include: value.exclude.length > 0 ? value.exclude : leftLoad ? [] : null,
    exclude: value.include && value.include.length > 0 ? value.include : []
  };
  const targetValue: TransferFilterValue = {
    exclude: value.exclude,
    include: value.include
  };
  return {
    sourceValue,
    targetValue
  };
};

export const useTransfer = (
  value: TransferFilterValue
): [IUseTransfer, Dispatch<UseTransferAction>] => {
  const { sourceValue, targetValue } = useMemo(() => parseValue(value), [
    value
  ]);
  const [state, dispatch] = useReducer(reducer, {
    internalValue: value,
    sourceValue,
    targetValue,
    sourceCheckedObj: {},
    sourceChecked: [],
    targetChecked: []
  });

  return [state, dispatch];
};
