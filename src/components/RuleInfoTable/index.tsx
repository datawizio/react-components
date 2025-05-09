import React from "react";
import Button from "../Button";
import ColoredTags from "../ColoredTags";
import { useTranslation } from "react-i18next";
import { RuleInfoProps } from "../RuleInfo/types";
import { parseDimension, parseLogic } from "../RuleInfo/helpers";
import { RuleInfoTableSection } from "./components/RuleInfoTableSection";

import "./index.less";

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
          {typeof logic === "string" ? t(logic) : parseLogic(logic)}
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

        <RuleInfoTableSection name="FILTERS" className="rule-filters">
          <ColoredTags>
            {widget_params.filters.map(filter =>
              parseDimension(filter, formatDateRange, false, 2)
            )}
          </ColoredTags>
          {!!widget_params.filters?.length && (
            <Button
              type="link"
              className="show-all-modal-button"
              onClick={onShowRuleDetailsClick}
            >
              {t("SHOW_ALL")}
            </Button>
          )}
        </RuleInfoTableSection>
      </div>
    );
  }
);

export default RuleInfoTable;
