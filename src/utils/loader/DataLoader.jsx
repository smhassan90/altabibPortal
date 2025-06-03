import { Flex, Spin } from "antd";
import React from "react";

const DataLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-[100px]">
      <Spin size="large" className="custom-spinner"/>
    </div>
  );
};

export default DataLoader;
