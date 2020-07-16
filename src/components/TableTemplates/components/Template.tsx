import * as React from "react";
import { useCallback } from "react";
import { TableTemplate } from "../types";
import { StarOutlined, StarFilled, CloseOutlined } from "@ant-design/icons";

export interface TemplateProps extends TableTemplate {
  onDelete: (template: TableTemplate) => void;
  onSelectFavorite: (template: TableTemplate) => void;
}

const Template: React.FC<TemplateProps> = ({
  onDelete,
  onSelectFavorite,
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
      <span title={template.title} className="table-templates__template-title">
        {template.title}
      </span>
      <CloseOutlined
        onClick={handleDeleteClick}
        className="table-templates__icon--delete"
      />
    </div>
  );
};

export default Template;
