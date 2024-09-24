import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { cx } from "@emotion/css";

import styles from "./BaseInput.module.less";

const BaseInput = React.forwardRef((props, ref) => {
  const {
    name,
    label,
    labelVariant,
    message,
    className,
    loading,
    status,
    isActive,
    isRequired,
    type,
    htmlType,
    size,
    prefix,
    suffix,
    ...restProps
  } = props;

  const components = {
    text: Input,
    password: Input.Password,
    search: Input.Search,
    textarea: Input.TextArea,
  };

  const Component = components[type];

  return (
    <div className={cx(className, styles.container)}>
      {label && (
        <label
          htmlFor={name}
          className={cx(styles.label, size, {
            [styles.isLabelInner]: labelVariant === "inner",
            [styles.isLabelOuter]: labelVariant === "outer",
            [styles.hasPrefix]: prefix,
          })}
        >
          {label}
          {isRequired && <span>*</span>}
        </label>
      )}

      <Component
        ref={ref}
        status={status}
        name={name}
        size={size}
        prefix={prefix}
        suffix={loading ? <LoadingOutlined /> : suffix}
        type={htmlType}
        className={cx(styles.input, size, {
          [styles.hasInnerLabel]: labelVariant === "inner",
          [styles.hasPrefix]: prefix,
          [styles.isActive]: isActive,
        })}
        {...restProps}
      />

      {message && <span className="field-error">{message}</span>}
    </div>
  );
});

BaseInput.propTypes = {
  className: PropTypes.string,
  htmlType: PropTypes.string,
  isActive: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  labelVariant: PropTypes.oneOf(["outer", "inner"]),
  loading: PropTypes.bool,
  message: PropTypes.string,
  name: PropTypes.string,
  prefix: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  status: PropTypes.string,
  suffix: PropTypes.node,
  type: PropTypes.oneOf(["text", "password", "search", "textarea"]),
};

BaseInput.defaultProps = {
  isActive: false,
  isRequired: false,
  className: "",
  name: "",
  label: "",
  prefix: null,
  suffix: null,
  labelVariant: "outer",
  size: "small",
  message: "",
  loading: false,
  status: "",
  type: "text",
  htmlType: undefined,
};

BaseInput.displayName = "BaseInput";

export default BaseInput;
