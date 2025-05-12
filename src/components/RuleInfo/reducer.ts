import { Dispatch, useReducer } from "react";
import { basicDTypesConfig } from "../Table/utils/typesConfigs";
import { getCountValues, getDimensions } from "./helpers";
import { IRuleInfoReducer, RuleInfoAction, RuleInfoProps } from "./types";

const searchMap = new Map<string, string>();

const reducer = (
  initialState: IRuleInfoReducer,
  state: IRuleInfoReducer,
  action: RuleInfoAction
): IRuleInfoReducer => {
  switch (action.type) {
    case "toggleModalShow": {
      const { show, defaultActiveKey } = action.payload;
      return { ...state, modalShow: show, defaultActiveKey };
    }

    case "search": {
      const { value, type, name } = action.payload;
      searchMap.set(name, value);

      const searchedWidgetParams = JSON.parse(
        JSON.stringify(state.widgetParams)
      );

      if (Array.isArray(state.widgetParams[type])) {
        searchedWidgetParams.filters = state.widgetParams.filters.map(el => ({
          ...el,
          value:
            Array.isArray(el.value) && searchMap.get(el.name)
              ? el.value.filter(v =>
                  basicDTypesConfig.string.search(v, searchMap.get(el.name))
                )
              : el.value
        }));
      } else if (Array.isArray(state.widgetParams.dimension.value)) {
        searchedWidgetParams.dimension.value = state.widgetParams.dimension.value.filter(
          el => basicDTypesConfig.string.search(el, value)
        );
      }

      return {
        ...state,
        dimensions: searchedWidgetParams.dimension
          ? getDimensions(searchedWidgetParams.dimension, state.formatDateRange)
          : {},
        filters: searchedWidgetParams.filters
          ? getDimensions(searchedWidgetParams.filters, state.formatDateRange)
          : []
      };
    }

    case "reset":
      searchMap.clear();
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
};

const initializer = (props: RuleInfoProps) => {
  const { widget_params, formatDateRange, logic, name } = props;
  const { dimension, filters } = widget_params;
  return {
    widgetParams: widget_params,
    dimensions: dimension ? getDimensions(dimension, formatDateRange) : {},
    filters: filters ? getDimensions(filters, formatDateRange) : [],
    countValues:
      dimension || filters
        ? getCountValues(widget_params, formatDateRange)
        : {},
    logic,
    formatDateRange,
    name,
    modalShow: false,
    defaultActiveKey: []
  };
};

export const useRuleInfo = (
  props: RuleInfoProps
): [IRuleInfoReducer, Dispatch<RuleInfoAction>] => {
  const initialState = initializer(props);

  const customReducer = (state: IRuleInfoReducer, action: RuleInfoAction) => {
    return reducer(initialState, state, action);
  };

  return useReducer(customReducer, props, initializer);
};
