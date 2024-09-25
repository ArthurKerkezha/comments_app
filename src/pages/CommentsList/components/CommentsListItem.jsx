import React from "react";
import PropTypes from "prop-types";
import { Card, List } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import CommentRemoval from "./CommentRemoval";

const CommentsListItem = ({ item }) => {
  const navigate = useNavigate();

  const onClick = () => {
    // TODO the source of truth must be only one (in this case it should be query parameter)
    navigate(`/${item.id}`);
  };

  const HeartIcon = item.likes > 0 ? HeartFilled : HeartOutlined;

  return (
    <List.Item key={item.id}>
      <Card hoverable className="w-100" onClick={onClick}>
        <List.Item.Meta
          avatar={
            <div className="d-f ai-c">
              <HeartIcon className="m-r-5" />
              {item.likes}
            </div>
          }
          title={<span className="fw-w">{item.user.fullName}</span>}
          description={item.body}
        />
        <CommentRemoval id={item.id} />
      </Card>
    </List.Item>
  );
};

CommentsListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CommentsListItem;
