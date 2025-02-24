import React from "react";
import clsx from "clsx";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import { RuleInfoProps } from "../RuleInfo/types";
import { parseDimension, parseLogic } from "../RuleInfo/helpers";
import "./index.less";

const RuleInfoTableSection: React.FC<{ name: string; className?: string }> = ({
  name,
  children,
  className
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx("rule-info-section", className)}>
      <div className="rule-info-section-name">{t(name)}</div>
      <div className="rule-info-section-content">{children}</div>
    </div>
  );
};

type RuleInfoTableProps = Omit<RuleInfoProps, "name"> & {
  onShowProductsTableClick?: () => void;
  onShowRuleDetailsClick?: () => void;
};

const RuleInfoTable: React.FC<RuleInfoTableProps> = React.memo(
  ({
    dtype,
    logic,
    widget_params,
    formatDateRange,
    onShowRuleDetailsClick,
    onShowProductsTableClick
  }) => {
    const { t } = useTranslation();

    return (
      <div className="rule-info-table">
        <RuleInfoTableSection name="CONDITION" className="rule-condition">
          {parseLogic(logic)}
        </RuleInfoTableSection>

        {dtype === "report_rule" && onShowProductsTableClick && (
          <RuleInfoTableSection name="PRODUCTS" className="rule-products">
            <Button
              type="link"
              className="view-product-list-btn"
              onClick={onShowProductsTableClick}
            >
              {t("SHOW_RESULTS")}
            </Button>
          </RuleInfoTableSection>
        )}

        {!!widget_params.dimension?.name && (
          <RuleInfoTableSection name="DIMENSION" className="rule-dimension">
            <span>{t(widget_params.dimension.name)}</span>
            <Button
              type="link"
              className="show-all-modal-button"
              onClick={onShowRuleDetailsClick}
            >
              {t("SHOW_RESULTS")}
            </Button>
          </RuleInfoTableSection>
        )}

        {widget_params.filters?.length && (
          <RuleInfoTableSection name="FILTERS" className="rule-filters">
            {widget_params.filters.map((filter, i) => {
              return (
                <div
                  key={`filter-tag-${i}`}
                  className="filter-tag"
                  data-key={(i % 4) + 1}
                >
                  {parseDimension(filter, formatDateRange, false, 2)}
                </div>
              );
            })}
            <Button
              type="link"
              className="show-all-modal-button"
              onClick={onShowRuleDetailsClick}
            >
              {t("SHOW_ALL")}
            </Button>
          </RuleInfoTableSection>
        )}
      </div>
    );
  }
);

export default RuleInfoTable;
