import React from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const Sider = ({ isOpen, children, onClose }) => (
  <Layout.Sider
    reverseArrow
    collapsible
    collapsed={!isOpen}
    theme="light"
    width={350}
    collapsedWidth={0}
    trigger={<MenuUnfoldOutlined onClick={onClose} />}
    zeroWidthTriggerStyle={{ position: "absolute", left: 0, top: 0 }}
  >
    <div className="w-100 h-100 p-20">{children}</div>
  </Layout.Sider>
);

Sider.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

Sider.defaultProps = {
  onClose: () => null,
};

export default Sider;
