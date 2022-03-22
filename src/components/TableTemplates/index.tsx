import clsx from "clsx";
import * as React from "react";
import { useState, useCallback, useContext, useEffect, useMemo } from "react";
import { TagsOutlined } from "@ant-design/icons";
import Select from "../Select";
import { TableState } from "../Table/types";
import { TableTemplate } from "./types";
import Dropdown from "./components/Dropdown";
import Template from "./components/Template";
import ConfigContext from "../ConfigProvider/context";
import { TableContext } from "../Table/context";
import "./index.less";
import { useDeepEqualMemo } from "../../hooks/useDeepEqualMemo";

function pickState(
  state: TableState,
  baseState: TableState
): TableTemplate["state"] {
  const columnsPositions = (function rec(columns) {
    return columns.map(column => ({
      dataIndex: column.dataIndex,
      order: column.order,
      children:
        column.children && column.children.length && rec(column.children)
    }));
  })(baseState.columns);

  return {
    columnsPositions,
    pagination: state.pagination,
    sortParams: state.sortParams,
    columnsWidth: state.columnsWidth,
    fixedTotal: state.fixedTotal,
    filterParams: state.filterParams,
    visibleColumnsKeys: state.visibleColumnsKeys
  };
}

function SelectValue({ value }) {
  const { translate } = useContext(ConfigContext);

  return (
    <div className="table-templates__value">
      <TagsOutlined className="table-templates__icon" />
      <span className="table-templates__value-title">
        {value || translate("TEMPLATES")}
      </span>
    </div>
  );
}

type MaybePromise<T> = T | Promise<T>;

export interface TableTemplatesProps {
  fetchAfterApply?: boolean;
  sortFirstColumn?: boolean;
  templates?: () => MaybePromise<TableTemplate>;
  onDelete: (template: TableTemplate) => void;
  onSelect?: (template?: TableTemplate) => void;
  onSelectFavorite: (template: TableTemplate) => void;
  onCreate: (template: TableTemplate) => void | Promise<TableTemplate>;
}

const TableTemplates: React.FC<TableTemplatesProps> = props => {
  const {
    fetchAfterApply,
    onCreate,
    onDelete,
    onSelectFavorite,
    onSelect
  } = props;
  const { translate } = useContext(ConfigContext);

  const { tableState, dispatch, baseTableState, tableProps } = useContext(
    TableContext
  );

  const [templates, setTemplates] = useState([]);
  const [
    selectedTemplate,
    setSelectedTemplate
  ] = useState<TableTemplate | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const setTemplateToState = useCallback(
    template => {
      let sortParams = template.state.sortParams;
      const columnsPositions = template.state.columnsPositions;
      if (
        props.sortFirstColumn &&
        Object.keys(sortParams).length === 0 &&
        columnsPositions.length > 1
      ) {
        sortParams = {
          [columnsPositions[1].dataIndex]: "descend"
        };
      }
      if (fetchAfterApply) {
        template.state.forceFetch = tableState.forceFetch + 1;
      }

      if (!template.state?.hasOwnProperty("columnsWidth")) {
        template.state.columnsWidth = {};
      }
      if (!template.state?.hasOwnProperty("fixedTotal")) {
        template.state.fixedTotal = true;
      }
      dispatch({
        type: "recoveryState",
        payload: { ...template.state, sortParams, fetchAfterApply }
      });
    },
    [dispatch, fetchAfterApply, props.sortFirstColumn, tableState.forceFetch]
  );

  const handleSelect = useCallback(
    id => {
      if (!id) return;
      const template = templates.find(template => template.id === id);
      onSelect && onSelect(template);
      dispatch({
        type: "update",
        payload: {
          templateSelected: true,
          columnsForceUpdate: tableState.columnsForceUpdate + 1
        }
      });
      setSelectedTemplate(template);
      setTemplateToState(template);
    },
    [templates, onSelect, dispatch, setTemplateToState, tableState]
  );

  const handleSelectFavorite = useCallback(
    template => {
      setTemplates(templates =>
        templates.map(item => ({
          ...item,
          favorite: item.id === template.id && !item.favorite
        }))
      );
      onSelectFavorite && onSelectFavorite(template);
    },
    [onSelectFavorite]
  );

  const handleClear = useCallback(
    e => {
      e?.stopPropagation();
      e?.preventDefault();

      setSelectedTemplate(null);

      if (fetchAfterApply) {
        const state = {
          first: true,
          forceFetch: tableState.forceFetch + 1,
          visibleColumnsKeys: tableProps.visibleColumnsKeys,
          columnsWidth: {},
          columns: [],
          fixedTotal: true
        };
        dispatch({
          type: "update",
          payload: state
        });
        return;
      }

      dispatch({ type: "filter", payload: {} });
    },
    [
      dispatch,
      fetchAfterApply,
      tableProps.visibleColumnsKeys,
      tableState.forceFetch
    ]
  );

  const handleDelete = useCallback(
    template => {
      setTemplates(templates =>
        templates.filter(item => item.id !== template.id)
      );

      if (selectedTemplate?.id === template.id) {
        handleClear(null);
      }

      onDelete && onDelete(template);
    },
    [handleClear, onDelete, selectedTemplate]
  );

  const handleCreate = useCallback(
    async title => {
      let template: TableTemplate = {
        title,
        favorite: false,
        state: pickState(tableState, baseTableState)
      };

      if (onCreate) {
        const createResponse = await onCreate(template);
        if (createResponse) template = createResponse;
      }

      setSelectedTemplate(template);
      dispatch({
        type: "update",
        payload: {
          templateSelected: true
        }
      });
      setTemplates(templates => templates.concat(template));
    },
    [tableState, baseTableState, onCreate, dispatch]
  );

  useEffect(() => {
    if (!tableState.templateSelected) setSelectedTemplate(null);
    // eslint-disable-next-line
  }, [useDeepEqualMemo(tableState.templateSelected)]);

  useEffect(() => {
    function _setTemplates(templates) {
      const favorite = templates.find(template => template.favorite);

      if (favorite && favorite.state) {
        setSelectedTemplate(favorite);
        setTemplateToState(favorite);
      }

      setTemplates(templates);
    }

    if (tableState.templates) {
      _setTemplates(tableState.templates);
    } else if (props.templates) {
      typeof props.templates === "function"
        ? (props.templates() as any).then(_setTemplates)
        : _setTemplates(props.templates);
    }
    // eslint-disable-next-line
  }, [props.templates, tableState.templates]);

  const className = useMemo(() => {
    return clsx("table-templates", "table-toolbar--right", {
      "table-templates--selected": Boolean(selectedTemplate)
    });
  }, [selectedTemplate]);

  return (
    <div
      className={className}
      title={translate(
        selectedTemplate ? "CHANGE_TEMPLATE_BTN_TITLE" : "TEMPLATES_BTN_TITLE"
      )}
    >
      <Select
        listHeight={150}
        onChange={handleSelect}
        className="table-templates__selector"
        value={(<SelectValue value={selectedTemplate?.title} />) as any}
        onDropdownVisibleChange={state => {
          setIsDropdownOpen(state);
        }}
        dropdownRender={originNode => (
          <Dropdown onCreate={handleCreate} isOpen={isDropdownOpen}>
            {originNode}
          </Dropdown>
        )}
      >
        {templates.map((template, idx) => (
          <Select.Option key={idx} value={template.id}>
            <Template
              onDelete={handleDelete}
              onSelectFavorite={handleSelectFavorite}
              isActive={Boolean(selectedTemplate?.id === template.id)}
              {...template}
            />
          </Select.Option>
        ))}
      </Select>
      {selectedTemplate && (
        <span className="table-templates__value-unselect" onClick={handleClear}>
          &times;
        </span>
      )}
    </div>
  );
};

TableTemplates.defaultProps = {
  fetchAfterApply: true
};

export default TableTemplates;
