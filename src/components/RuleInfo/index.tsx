import React from "react";
import ListInfo from "../ListInfo";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import "./index.less";

type WidgetParamsDimension = {
  name: string;
  type?: "exclude" | "include";
  values?: string[] | string | { from: string; to: string };
};
interface RuleInfoProps {
  formatDateRange: (from: string, to: string) => string;
  logic: any;
  widget_params: {
    dimension: WidgetParamsDimension;
    filters: WidgetParamsDimension[];
  };
}

const getValue = (
  dimension: WidgetParamsDimension,
  formatDateRange: (from: string, to: string) => string
) => {
  if (!dimension.values) return [i18next.t("ALL")];
  if (typeof dimension.values === "string") {
    return [i18next.t(dimension.values.toUpperCase())];
  }
  if (Array.isArray(dimension.values)) {
    if (dimension.type === "exclude") {
      const res = [...dimension.values];
      res[0] = `${i18next.t("ALL_EXCEPT")} ${res[0]}`;
      return res;
    }
    return dimension.values;
  }
  if (dimension.values.from) {
    return [formatDateRange(dimension.values.from, dimension.values.to)];
  }
};

const parseDimension = (
  dimension: WidgetParamsDimension,
  formatDateRange: (from: string, to: string) => string
) => {
  let values = dimension.values;
  if (typeof dimension.values === "string") {
    values = [dimension.values];
  }

  return (
    <ListInfo
      key={dimension.name}
      //@ts-ignore
      items={getValue(dimension, formatDateRange)}
      label={i18next.t(dimension.name.toUpperCase())}
      //@ts-ignore
      renderItem={(item: string) => item}
    />
  );
};

const parseLogic = (logic: any): any => {
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
  const res: string[] = parseLogic(l);
  if (res.length > 1)
    return `(${res.join(` ${i18next.t(op.toUpperCase())} `)})`;
  return res.join(` ${i18next.t(op.toUpperCase())}`);
};

const RuleInfo: React.FC<RuleInfoProps> = ({
  logic,
  widget_params,
  formatDateRange
}) => {
  const { t } = useTranslation();

  return (
    <div className="rule-info">
      <div className="rule-info-title">{t("CONDITION")}</div>
      <div>{parseLogic(logic)}</div>
      <div className="rule-info-title">{t("DIMENSION")}</div>
      <div>{parseDimension(widget_params.dimension, formatDateRange)}</div>
      <div className="rule-info-title">{t("FILTERS")}</div>
      <div>
        {widget_params.filters.map(filter =>
          parseDimension(filter, formatDateRange)
        )}
      </div>
    </div>
  );
};

export default RuleInfo;
