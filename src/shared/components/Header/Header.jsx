import React from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";

import styles from "./Header.module.less";

const Header = ({ children, ...restProps }) => (
  <Layout.Header className={styles.header} {...restProps}>
    {children}
  </Layout.Header>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
