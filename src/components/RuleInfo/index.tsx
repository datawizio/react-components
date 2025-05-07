import React, { memo } from "react";
import Modal from "../Modal";
import { CollapseList } from "./components/CollapseList";
import { useRuleInfo } from "./reducer";
import { RuleInfoContext } from "./context";
import { RuleInfoProps } from "./types";
import { parseDimension, parseLogic } from "./helpers";
import { RuleInfoTableSection } from "../RuleInfoTable/RuleInfoTableSection";
import "./index.less";

const RuleInfo: React.FC<RuleInfoProps> = memo(
  ({ logic, widget_params, formatDateRange, name, dtype, filtersList }) => {
    const [state, dispatch] = useRuleInfo({
      logic,
      dtype,
      widget_params,
      formatDateRange,
      name
    });

    const handleCancel = () => {
      dispatch({
        type: "toggleModalShow",
        payload: { show: false, defaultActiveKey: [] }
      });
    };

    return (
      <RuleInfoContext.Provider value={{ ruleInfoState: state, dispatch }}>
        <div className="rule-info">
          <RuleInfoTableSection name="CONDITION" className="rule-condition">
            {typeof logic === "string" ? (
              <div>{logic}</div>
            ) : (
              <div>{parseLogic(logic)}</div>
            )}
          </RuleInfoTableSection>

          {!!widget_params.dimension && (
            <RuleInfoTableSection name="DIMENSION" className="rule-dimension">
              {parseDimension(widget_params.dimension, formatDateRange)}
            </RuleInfoTableSection>
          )}

          {!!widget_params.filters?.length && (
            <RuleInfoTableSection name="FILTERS" className="rule-filters">
              {filtersList
                ? filtersList
                : widget_params.filters.map(filter =>
                    parseDimension(filter, formatDateRange)
                  )}
            </RuleInfoTableSection>
          )}
        </div>
        <Modal
          title={name}
          className="rule-info-modal"
          visible={state.modalShow}
          width={"65%"}
          destroyOnClose={true}
          afterClose={() => dispatch({ type: "reset" })}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <CollapseList />
        </Modal>
      </RuleInfoContext.Provider>
    );
  }
);

export default RuleInfo;
