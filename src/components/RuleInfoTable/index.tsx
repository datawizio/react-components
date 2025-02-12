import React from "react";
import clsx from "clsx";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import { RightOutlined } from "@ant-design/icons";
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
  onShowProductsListClick?: () => void;
  onShowAllClick?: () => void;
};

const RuleInfoTable: React.FC<RuleInfoTableProps> = React.memo(
  ({ logic, widget_params, formatDateRange, onShowAllClick, onShowProductsListClick }) => {
    const { t } = useTranslation();

    return (
      <div className="rule-info-table">
        <RuleInfoTableSection name="CONDITION" className="rule-condition">
          {parseLogic(logic)}
        </RuleInfoTableSection>

        <RuleInfoTableSection name="DIMENSION" className="rule-dimension">
          {t(widget_params.dimension.name)}

          <Button
            type="link"
            className="show-all-modal-button"
            onClick={onShowAllClick}
          >
            {t("SHOW_RESULTS")}
          </Button>
        </RuleInfoTableSection>

        <RuleInfoTableSection name="FILTERS" className="rule-filters">
          {widget_params.filters.map((filter, i) => {
            return (
              <div
                key={`filter-tag-${i}`}
                className="filter-tag"
                data-key={(i % 4) + 1}
              >
                {parseDimension(filter, formatDateRange)}
              </div>
            );
          })}
        </RuleInfoTableSection>

        <RuleInfoTableSection name="PRODUCTS" className="rule-products">
          <div
            className="view-product-list-btn"
            onClick={onShowProductsListClick}
          >
            {t("SHOW_LIST")} <RightOutlined />
          </div>
        </RuleInfoTableSection>
      </div>
    );
  }
);

export default RuleInfoTable;
