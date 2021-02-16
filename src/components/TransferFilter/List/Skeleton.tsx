import React from "react";
import { randomInteger } from "../../../utils/random";
import Skeleton from "../../Skeleton";

const renderItem = key => {
  const width = randomInteger(250, 350);
  return (
    <div className="ant-transfer-list-skeleton" key={key}>
      <Skeleton width={16} height={16} />
      <Skeleton width={width} height={16} />
    </div>
  );
};

export interface SkeletonListItemProps {
  count: number;
}

export const SkeletonListItem: React.FC<SkeletonListItemProps> = ({
  count
}) => {
  const items = Array(count).fill(0);
  return <>{items.map((v, key) => renderItem(key))}</>;
};
