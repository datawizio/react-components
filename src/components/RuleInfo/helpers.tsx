import i18next from "i18next";
import React from "react";
import ListInfo from "../ListInfo";
import ShowAllModal from "./components/ShowAllModal";
import { filtersMapperFunctions as functions } from "./filters";
import {
  DimensionsType,
  formatDateRangeType,
  WidgetParams,
  WidgetParamsDimension
} from "./types";

export const MAX_LENGTH_ITEM_LIST = 7;

export function getValue<TDimension = WidgetParamsDimension>(
  dimension: TDimension,
  formatDateRange: (from: string, to: string) => string
) {
  const key = dimension["name"].toLowerCase();
  const value = dimension["values"];

  if (!value) return [i18next.t("ALL")];
  if (typeof value === "boolean") return [functions.boolean(value)];
  if (typeof value === "string") return [functions.string(value)];

  if (typeof value === "number") {
    const fn = functions.number?.[key];
    return fn ? fn(value) : [value];
  }

  if (Array.isArray(value)) return functions.array(value, dimension["type"]);
  if (value["from"]) return [formatDateRange(value["from"], value["to"])];

  if (typeof value === "object") {
    const fn = functions.object?.[key];
    return fn ? fn(value) : [JSON.stringify(value)];
  }

  return [value];
}

export const parseDimension = (
  dimension: WidgetParamsDimension,
  formatDateRange: (from: string, to: string) => string,
  showExpandButton: boolean = true,
  maxLength?: number
) => (
  <ListInfo
    key={dimension.name}
    // @ts-ignore
    items={getValue(dimension, formatDateRange)}
    label={i18next.t(dimension.name.toUpperCase())}
    maxLength={maxLength ?? MAX_LENGTH_ITEM_LIST}
    showExpandButton={showExpandButton}
    expandButton={<ShowAllModal dimensionName={dimension.name} />}
    // @ts-ignore
    renderItem={(item: string) => item}
  />
);

export function parseLogic<TLogic>(logic: TLogic) {
  if (Array.isArray(logic)) {
    return logic.map(l => {
      if (typeof l !== "object") return l;
      if (l["var"]) return i18next.t(l["var"].toUpperCase());
      return parseLogic(l);
    });
  }
  const op = Object.keys(logic)[0];
  const l = logic[op];
  if (op === "!") return "!" + parseLogic(l);
  const res = parseLogic(l);
  if (Array.isArray(res) && res.length > 1)
    return `(${res.join(` ${i18next.t(op.toUpperCase())} `)})`;
  return res.join(` ${i18next.t(op.toUpperCase())}`);
}

export function getDimensions<
  TDimension,
  TReturn extends TDimension extends any[] ? DimensionsType[] : DimensionsType
>(
  dimension: TDimension,
  formatDateRange: formatDateRangeType,
  ignore: string[] = []
): TReturn {
  if (!dimension) return null;

  if (Array.isArray(dimension)) {
    return dimension
      .filter(f => !ignore.includes(f.name))
      .map(filter => ({
        displayName: `${i18next.t("FILTER")}: ${i18next.t(
          filter["name"].toUpperCase()
        )}`,
        originalName: filter["name"],
        values: getValue(filter, formatDateRange)
      })) as TReturn;
  }

  return {
    displayName: `${i18next.t("DIMENSION")}: ${i18next.t(
      dimension["name"].toUpperCase()
    )}`,
    originalName: dimension["name"],
    values: getValue<TDimension>(dimension, formatDateRange)
  } as TReturn;
}

export function countValues<
  TDimension extends WidgetParamsDimension | WidgetParamsDimension[]
>(dimension: TDimension): number {
  if (!dimension.values) return 0;
  if (Array.isArray(dimension.values)) return dimension.values.length;
  return 1;
}

export function getCountValues<TDimension extends WidgetParams>(
  item: TDimension,
  formatDateRange: formatDateRangeType
): { [key: string]: number } {
  if (!item.filters) return {};
  const returnObj = {};
  item.filters.forEach(
    d => (returnObj[d.name] = getValue(d, formatDateRange).length)
  );

  if (item.dimension) {
    returnObj[item.dimension.name] = getValue(
      item.dimension,
      formatDateRange
    ).length;
  }

  return returnObj;
}

export function getDimensionNameByKey(key: string): string {
  const specificDimensionNames = {
    category: "CATEGORIES"
  };

  return specificDimensionNames[key] ?? key.toUpperCase() + "S";
}
