import { Dispatch, useReducer } from "react";
import { basicDTypesConfig } from "../Table/utils/typesConfigs";
import { getCountValues, getDimensions } from "./helpers";
import { IRuleInfoReducer, RuleInfoAction, RuleInfoProps } from "./types";

const reducer = (
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

      const searchedWidgetParams = JSON.parse(
        JSON.stringify(state.widgetParams)
      );
      if (Array.isArray(state.widgetParams[type])) {
        searchedWidgetParams.filters = state.widgetParams.filters.map(el =>
          el.name === name
            ? {
                ...el,
                values: Array.isArray(el.values)
                  ? el.values.filter(l =>
                      basicDTypesConfig.string.search(l, value)
                    )
                  : el.values
              }
            : el
        );
      } else {
        if (Array.isArray(state.widgetParams.dimension.values)) {
          searchedWidgetParams.dimension.values = state.widgetParams.dimension.values.filter(
            el => basicDTypesConfig.string.search(el, value)
          );
        }
      }

      return {
        ...state,
        dimensions: getDimensions(
          searchedWidgetParams.dimension,
          state.formatDateRange
        ),
        filters: getDimensions(
          searchedWidgetParams.filters,
          state.formatDateRange
        )
      };
    }
    default:
      throw new Error("Unknown action type");
  }
};

const initializer = (props: RuleInfoProps) => {
  const { widget_params, formatDateRange, logic, name } = props;
  return {
    widgetParams: widget_params,
    dimensions: getDimensions(widget_params.dimension, formatDateRange),
    filters: getDimensions(widget_params.filters, formatDateRange),
    countValues: getCountValues(widget_params, formatDateRange),
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
  const [state, dispatch] = useReducer(reducer, props, initializer);
  return [state, dispatch];
};
