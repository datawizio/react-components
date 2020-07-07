import * as React from "react";
import BaseSkeleton, { SkeletonProps } from "react-loading-skeleton";

const Skeleton: React.FC<SkeletonProps> = props => {
  return <BaseSkeleton {...props} />;
};

export default Skeleton;
