
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Spinner = ({ size = 48, style = {} }) => (
  <Flex align="center" justify="center" style={{ width: "100%", ...style }}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: size, color: style.color }} spin />} />
  </Flex>
);

export default Spinner;
