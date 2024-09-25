import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

const DetailsCard = ({ title, content, isLoading, onClick, ...restProps }) => (
  <Card
    {...restProps}
    bordered
    hoverable
    title={title}
    className="w-100 h-100"
    loading={isLoading}
    onClick={onClick}
  >
    <p>{content}</p>
  </Card>
);

DetailsCard.propTypes = {
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

DetailsCard.defaultProps = {
  title: "",
  content: "",
  isLoading: false,
  onClick: null,
};
export default DetailsCard;
