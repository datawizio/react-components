import { Dispatch, useReducer } from "react";
import { basicDTypesConfig } from "../Table/utils/typesConfigs";
import { getCountValues, getDimensions } from "./helpers";
import { IRuleInfoReducer, RuleInfoAction, RuleInfoProps } from "./types";
import { ignoredFilters } from "../../utils/filter/constants";

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
      const { value, name } = action.payload;
      searchMap.set(name, value);

      const searchedWidgetParams = JSON.parse(
        JSON.stringify(state.widgetParams)
      );

      if (Array.isArray(state.widgetParams.filters)) {
        searchedWidgetParams.filters = state.widgetParams.filters.map(el => ({
          ...el,
          values:
            Array.isArray(el.values) && searchMap.get(el.name)
              ? el.values.filter(v =>
                  basicDTypesConfig.string.search(v, searchMap.get(el.name))
                )
              : el.values
        }));
      }

      const dimensionSearchValue = searchMap.get(
        state.widgetParams.dimension.name
      );

      if (
        Array.isArray(state.widgetParams.dimension.values) &&
        dimensionSearchValue
      ) {
        searchedWidgetParams.dimension.values = state.widgetParams.dimension.values.filter(
          el => basicDTypesConfig.string.search(el, dimensionSearchValue)
        );
      }

      return {
        ...state,
        dimensions: searchedWidgetParams.dimension
          ? getDimensions(searchedWidgetParams.dimension, state.formatDateRange)
          : {},
        filters: searchedWidgetParams.filters
          ? getDimensions(
              searchedWidgetParams.filters,
              state.formatDateRange,
              ignoredFilters
            )
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
    filters: filters
      ? getDimensions(filters, formatDateRange, ignoredFilters)
      : [],
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
