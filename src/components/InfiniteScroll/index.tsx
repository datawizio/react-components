import * as React from "react";
import { useCallback, useState, useImperativeHandle } from "react";

import Spin from "antd/lib/spin";

import "./index.less";

const DefaultLoader = () => {
  return (
    <div className="infinite-scroll__default-loader">
      <Spin />
    </div>
  );
};

export interface InfiniteScrollProps {
  maxPage?: number;
  overflow?: string;
  showLoader?: boolean;
  triggerCoeff?: number;
  height: number | string;

  loader?: () => React.ReactNode;
  onBottom?: (page: number) => Promise<void> | void;
}

export interface InfiniteScrollRef {
  reset: () => void;
}

const InfiniteScroll = React.forwardRef<InfiniteScrollRef, InfiniteScrollProps>(
  (props, ref) => {
    const {
      height,
      loader,
      overflow,
      onBottom,
      children,
      showLoader,
      triggerCoeff,
      maxPage
    } = props;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [scrollIsHandling, setScrollIsHandling] = useState<boolean>(false);

    const scrollIsBottom = useCallback(
      target => {
        const triggerHeight = (target.scrollHeight * triggerCoeff) / 100;
        const triggerZone = target.clientHeight + triggerHeight;
        const scrollPos = target.scrollHeight - target.scrollTop;
        return triggerZone >= scrollPos;
      },
      [triggerCoeff]
    );

    function handleScroll(event) {
      if (scrollIsHandling) return;

      const handle = async handler => {
        setScrollIsHandling(true);
        await handler(currentPage);
        setScrollIsHandling(false);
      };

      if (onBottom && currentPage <= maxPage && scrollIsBottom(event.target))
        handle(onBottom).then(() => {
          setCurrentPage(currentPage + 1);
        });
    }

    useImperativeHandle(ref, () => ({
      reset() {
        setCurrentPage(1);
        setScrollIsHandling(false);
      }
    }));

    return (
      <div
        onScroll={handleScroll}
        className="infinite-scroll"
        style={{ height, overflow }}
      >
        {children}
        {showLoader && scrollIsHandling && loader()}
      </div>
    );
  }
);

InfiniteScroll.defaultProps = {
  triggerCoeff: 5,
  overflow: "auto",
  showLoader: false,
  maxPage: Infinity,
  loader: DefaultLoader
};

export default InfiniteScroll;
