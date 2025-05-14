import React from "react";
import Modal from "../Modal";
import ColoredTags from "../ColoredTags";
import { CollapseList } from "./components/CollapseList";
import { useRuleInfo } from "./reducer";
import { RuleInfoContext } from "./context";
import { RuleInfoProps } from "./types";
import { parseDimension, parseLogic } from "./helpers";
import { RuleInfoSection } from "./components/RuleInfoSection";
import ShowAllModal from "./components/ShowAllModal";

import "./index.less";

const RuleInfo: React.FC<RuleInfoProps> = ({
  logic,
  widget_params,
  formatDateRange,
  name,
  dtype,
  ignoredFilters = []
}) => {
  const [state, dispatch] = useRuleInfo({
    logic,
    dtype,
    widget_params,
    formatDateRange,
    name,
    ignoredFilters
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
        <RuleInfoSection name="CONDITION" className="rule-condition">
          {typeof logic === "string" ? logic : parseLogic(logic)}
        </RuleInfoSection>

        {!!widget_params.dimension && (
          <RuleInfoSection name="DIMENSION" className="rule-dimension">
            <ColoredTags startIndex={2}>
              {parseDimension(
                widget_params.dimension,
                formatDateRange,
                false,
                2
              )}
            </ColoredTags>
          </RuleInfoSection>
        )}

        {!!widget_params.filters?.length && (
          <RuleInfoSection name="FILTERS" className="rule-filters">
            {/* TODO */}
            <ColoredTags suffix={<ShowAllModal />}>
              {widget_params.filters
                .filter(f => !ignoredFilters.includes(f.name))
                .map(f => parseDimension(f, formatDateRange, false, 2))}
            </ColoredTags>
          </RuleInfoSection>
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
};

export default React.memo(RuleInfo);
