import clsx from "clsx";
import * as React from "react";
import { TableTemplate } from "./types";
import { useState, useCallback, useContext, useEffect, useMemo } from "react";

import Select from "../Select";
import { TableState } from "../Table/types";

import Dropdown from "./components/Dropdown";
import Template from "./components/Template";
import { SaveOutlined } from "@ant-design/icons";
import ConfigContext from "../ConfigProvider/context";

import { TableContext } from "../Table/context";

import "./index.less";

function pickState(
  state: TableState,
  baseState: TableState
): TableTemplate["state"] {
  const columnsPositions = (function rec(columns) {
    return columns.map(column => ({
      dataIndex: column.dataIndex,
      children:
        column.children && column.children.length && rec(column.children)
    }));
  })(baseState.columns);

  return {
    columnsPositions,
    pagination: state.pagination,
    sortParams: state.sortParams,
    filterParams: state.filterParams,
    visibleColumnsKeys: state.visibleColumnsKeys
  };
}

function SelectValue({ value }) {
  const { translate } = useContext(ConfigContext);

  return (
    <div className="table-templates__value">
      <SaveOutlined className="table-templates__icon" />
      <span className="table-templates__value-title">
        {value || translate("TEMPLATES")}
      </span>
    </div>
  );
}

type MaybePromise<T> = T | Promise<T>;

export interface TableTemplatesProps {
  fetchAfterApply?: boolean;
  templates?: () => MaybePromise<TableTemplate>;
  onDelete: (template: TableTemplate) => void;
  onSelect?: () => void;
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
  const [value, setValue] = useState<string>(null);

  const setTemplateToState = useCallback(
    template => {
      if (fetchAfterApply) {
        template.state.forceFetch = tableState.forceFetch + 1;
      }
      dispatch({ type: "recoveryState", payload: template.state });
    },
    [dispatch]
  );

  const handleSelect = useCallback(
    value => {
      onSelect && onSelect();
      const template = templates.find(template => template.title === value);
      setValue(template.title);
      setTemplateToState(template);
    },
    [templates, setTemplateToState, onSelect]
  );

  const handleSelectFavorite = useCallback(
    template => {
      setTemplates(templates =>
        templates.map(item => ({
          ...item,
          favorite: item.title === template.title && !item.favorite
        }))
      );
      onSelectFavorite && onSelectFavorite(template);
    },
    [onSelectFavorite]
  );

  const handleDelete = useCallback(
    template => {
      setTemplates(templates =>
        templates.filter(item => item.id !== template.id)
      );
      value === template.title && setValue(null);
      onDelete && onDelete(template);
    },
    [onDelete, value]
  );

  const handleClear = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      setValue(null);
      if (fetchAfterApply) {
        const state = {
          forceFetch: tableState.forceFetch + 1,
          visibleColumnsKeys: tableProps.visibleColumnsKeys
        };
        dispatch({ type: "update", payload: state });
        return;
      }

      dispatch({ type: "filter", payload: {} });
    },
    [tableState.forceFetch]
  );

  const handleCreate = useCallback(
    async title => {
      let template = {
        title,
        favorite: false,
        state: pickState(tableState, baseTableState)
      };

      if (onCreate) {
        const createResponse = await onCreate(template);
        if (createResponse) template = createResponse;
      }
      setValue(title);
      setTemplates(templates => templates.concat(template));
    },
    [tableState, baseTableState, onCreate]
  );

  useEffect(() => {
    function _setTemplates(templates) {
      const favorite = templates.find(template => template.favorite);

      if (favorite && favorite.state) {
        setValue(favorite.title);
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
      "table-templates--selected": Boolean(value)
    });
  }, [value]);

  return (
    <div
      className={className}
      title={translate(
        value ? "CHANGE_TEMPLATE_BTN_TITLE" : "TEMPLATES_BTN_TITLE"
      )}
    >
      <Select
        listHeight={150}
        onChange={handleSelect}
        className="table-templates__selector"
        value={(<SelectValue value={value} />) as any}
        dropdownRender={originNode => (
          <Dropdown onCreate={handleCreate}>{originNode}</Dropdown>
        )}
      >
        {templates.map((template, idx) => (
          <Select.Option key={idx} value={template.title}>
            <Template
              onDelete={handleDelete}
              onSelectFavorite={handleSelectFavorite}
              {...template}
            />
          </Select.Option>
        ))}
      </Select>
      {value && (
        <span className="table-templates__value-unselect" onClick={handleClear}>
          &times;
        </span>
      )}
    </div>
  );
};

export default TableTemplates;
