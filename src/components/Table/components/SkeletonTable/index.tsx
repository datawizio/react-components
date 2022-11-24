import { Skeleton, Row, Col, Space } from "antd";
import React from "react";

interface SkeletonTableProps {
  loading: boolean;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  loading,
  children
}) => {
  const tableColumns = Array.from(Array(8).keys());
  const tableRows = Array.from(Array(10).keys());

  return (
    <div className="skeleton-container">
      {loading ? (
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
        children
      )}
    </div>
  );
};
