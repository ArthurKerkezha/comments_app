import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";

const Loader = ({ children, tip, size, ...restProps }) => (
  <Spin tip={tip} size={size} {...restProps}>
    {children}
  </Spin>
);

Loader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.node]),
  size: PropTypes.string,
  tip: PropTypes.string,
};
Loader.defaultProps = {
  children: null,
  size: "large",
  tip: "",
};

export default Loader;
