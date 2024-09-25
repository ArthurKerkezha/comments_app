import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CommentsThunks } from "../../../redux/thunks";

const CommentRemoval = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = async (e) => {
    e.stopPropagation();

    setIsLoading(true);
    // TODO there will always be errors here if there is no comment with this "id" in the database
    await dispatch(CommentsThunks.removeComment(id));

    setIsLoading(false);

    navigate("/");
  };

  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      loading={isLoading}
      onClick={onClick}
    />
  );
};

CommentRemoval.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CommentRemoval;
