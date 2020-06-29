import React from "react";
import { Col, Card } from "antd";

export const AppsLoader = () => {
  return (
    <>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
        <Card className="card-app" loading={true}></Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
        <Card className="card-app" loading={true}></Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
        <Card className="card-app" loading={true}></Card>
      </Col>
    </>
  );
};
