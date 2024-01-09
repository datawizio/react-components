import React, { memo, useState } from "react";
import ExpandButton from "../ExpandButton";

interface ListInfoProps {
  label: string;
  items?: IInfoListItem[] | null;
  delim?: string;
  linkFn?: (id: string) => string;
  renderItem?: (item: IInfoListItem) => React.ReactElement;
  LinkComponent?: any;
  expandButton?: React.ReactNode;
  maxLength?: number;
}

export interface IInfoListItem {
  id: string;
  name: string;
}

const SHORT_ITEMS_LIST_LENGTH = 5;

const ListInfo: React.FC<ListInfoProps> = memo(
  ({
    label,
    items,
    delim,
    linkFn,
    renderItem,
    LinkComponent,
    expandButton,
    maxLength
  }) => {
    const [showAll, setShowAll] = useState<boolean>(false);

    const maxLengthItemList = maxLength ?? SHORT_ITEMS_LIST_LENGTH;

    const cutItemsList =
      items && items.length !== 0 && items.length > maxLengthItemList;

    if (!items || items.length === 0) return <></>;

    const itemsForShow = showAll ? items : items.slice(0, maxLengthItemList);

    const renderExpandButton = expandButton ?? (
      <ExpandButton listOpen={showAll} setListOpen={setShowAll} />
    );

    return (
      <div>
        <span className="card-header-info-label">{label}:</span>
        <span>
          {itemsForShow
            .map<React.ReactNode>(item => {
              if (renderItem) {
                return renderItem(item);
              }
              if (linkFn && LinkComponent) {
                return (
                  <LinkComponent
                    key={item.id}
                    to={`${linkFn(item.id)}`}
                    target="_blank"
                  >
                    {item.name}
                  </LinkComponent>
                );
              }
              return item.name;
            })
            .reduce((prev, curr) => [prev, delim ?? ", ", curr])}

          {cutItemsList && renderExpandButton}
        </span>
      </div>
    );
  }
);

export default ListInfo;
