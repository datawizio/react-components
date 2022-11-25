import { Skeleton, Row, Col, Space } from "antd";
import clsx from "clsx";
import React, { memo, useMemo } from "react";
import Loader from "../../../Loader";

interface SkeletonTableProps {
  loading: boolean;
  first: boolean;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = memo(
  ({ loading, first, children }) => {
    const tableColumns = Array.from(Array(8).keys());
    const tableRows = Array.from(Array(10).keys());

    const className = useMemo(
      () =>
        clsx("skeleton-container", {
          "skeleton-container--loading": loading
        }),
      [loading]
    );

    return (
      <div className={className}>
        {first ? (
          <Space direction="vertical">
            <Row gutter={8}>
              {tableColumns.map((_, index) => (
                <Col key={index} span={3}>
                  <Skeleton.Input active style={{ width: "100%" }} />
                </Col>
              ))}
            </Row>
            {tableRows.map((_, index) => (
              <Row key={index} gutter={8}>
                {tableColumns.map((_, index) => (
                  <Col key={index} span={3}>
                    <Skeleton.Input active style={{ width: "100%" }} />
                  </Col>
                ))}
              </Row>
            ))}
          </Space>
        ) : (
          <Loader loading={Boolean(loading)}>{children}</Loader>
        )}
      </div>
    );
  }
);
