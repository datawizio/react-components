import React, { useState } from "react";
import ExpandButton from "../ExpandButton";

interface ListInfoProps {
  label: string;
  items?: IInfoListItem[] | null;
  delim?: string;
  linkFn?: (id: string) => string;
  renderItem?: (item: IInfoListItem) => React.ReactElement;
  LinkComponent?: any;
}

export interface IInfoListItem {
  id: string;
  name: string;
}

const SHORT_ITEMS_LIST_LENGTH = 5;

const ListInfo: React.FC<ListInfoProps> = ({
  label,
  items,
  delim,
  linkFn,
  renderItem,
  LinkComponent
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const cutItemsList =
    items && items.length !== 0 && items.length > SHORT_ITEMS_LIST_LENGTH;

  if (!items || items.length === 0) return <></>;

  const itemsForShow = showAll
    ? items
    : items.slice(0, SHORT_ITEMS_LIST_LENGTH);

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

        {cutItemsList && (
          <ExpandButton listOpen={showAll} setListOpen={setShowAll} />
        )}
      </span>
    </div>
  );
};

export default ListInfo;
