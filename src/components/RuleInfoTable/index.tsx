import React from "react";
import Button from "../Button";
import ColoredTags from "../ColoredTags";
import { useTranslation } from "react-i18next";
import { RuleInfoProps } from "../RuleInfo/types";
import {
  getDimensionNameByKey,
  parseDimension,
  parseLogic
} from "../RuleInfo/helpers";
import { RuleInfoSection } from "../RuleInfo/components/RuleInfoSection";
import { ignoredFilters } from "../../utils/filter/constants";
import "./index.less";

type RuleInfoTableProps = Omit<RuleInfoProps, "name"> & {
  dimensionKey?: string;
  onShowDimensionTableClick?: () => void;
  onShowRuleDetailsClick?: () => void;
};

const RuleInfoTable: React.FC<RuleInfoTableProps> = React.memo(
  ({
    dtype,
    logic,
    widget_params,
    formatDateRange,
    dimensionKey = "product",
    metricsDictionary = {},
    onShowRuleDetailsClick,
    onShowDimensionTableClick
  }) => {
    const { t } = useTranslation();

    const showAllButton = !!widget_params.filters?.length && (
      <Button
        type="link"
        className="show-all-modal-button"
        onClick={onShowRuleDetailsClick}
      >
        {t("SHOW_ALL")}
      </Button>
    );

    return (
      <div className="rule-info-table">
        <RuleInfoSection name="CONDITION" className="rule-condition">
          {typeof logic === "string"
            ? t(logic)
            : parseLogic(logic, metricsDictionary)}
        </RuleInfoSection>

        {dtype === "report_rule" && onShowDimensionTableClick && (
          <RuleInfoSection name="DIMENSION" className="rule-report-dimension">
            <span>{t(getDimensionNameByKey(dimensionKey))}</span>
            <Button
              type="link"
              className="view-dimension-table-btn"
              onClick={onShowDimensionTableClick}
            >
              {t("SHOW_RESULTS")}
            </Button>
          </RuleInfoSection>
        )}

        {!!widget_params.dimension?.name && (
          <RuleInfoSection name="DIMENSION" className="rule-dimension">
            <span>{t(widget_params.dimension.name)}</span>
          </RuleInfoSection>
        )}

        <RuleInfoSection name="FILTERS" className="rule-filters">
          <ColoredTags suffix={showAllButton}>
            {widget_params.filters
              .filter(f => !ignoredFilters.includes(f.name))
              .map(f => parseDimension(f, formatDateRange, false, 2))}
          </ColoredTags>
        </RuleInfoSection>
      </div>
    );
  }
);

export default RuleInfoTable;
