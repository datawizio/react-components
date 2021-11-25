import * as React from "react";
import { useCallback } from "react";
import { TableTemplate } from "../types";
import { StarOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import clsx from "clsx";

export interface TemplateProps extends TableTemplate {
  selectedTemplate: TableTemplate;
  onDelete: (template: TableTemplate) => void;
  onSelectFavorite: (template: TableTemplate) => void;
}

const Template: React.FC<TemplateProps> = ({
  onDelete,
  onSelectFavorite,
  selectedTemplate,
  ...template
}) => {
  const handleFavoriteClick = useCallback(
    e => {
      e.stopPropagation();
      onSelectFavorite(template);
    },
    [template, onSelectFavorite]
  );

  const handleDeleteClick = useCallback(
    e => {
      e.stopPropagation();
      onDelete(template);
    },
    [template, onDelete]
  );

  const className = clsx("table-templates__template-title", {
    "table-templates__template-title--selected": Boolean(
      selectedTemplate?.id === template?.id
    )
  });
  return (
    <div className="table-templates__template">
      {!template.favorite && (
        <StarOutlined
          onClick={handleFavoriteClick}
          className="table-templates__icon table-templates__icon--favorite"
        />
      )}
      {template.favorite && (
        <StarFilled
          onClick={handleFavoriteClick}
          className="table-templates__icon table-templates__icon--favorite-active"
        />
      )}
      <span title={template.title} className={className}>
        {template.title}
      </span>
      <DeleteOutlined
        onClick={handleDeleteClick}
        className="table-templates__icon--delete"
      />
    </div>
  );
};

export default Template;
