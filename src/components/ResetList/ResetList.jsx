import React from "react";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { CommentsActions } from "../../redux/slices/commentsSlice";
import { CommentsSelector } from "../../redux/selectors";

const ResetList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(CommentsSelector.selectIsLoading);
  const navigate = useNavigate();

  const onClick = async () => {
    dispatch(CommentsActions.clearComments());

    if (id) {
      navigate("/");
    }
  };

  return (
    <Button icon={<SyncOutlined spin={isLoading} />} onClick={onClick}>
      Clear state
    </Button>
  );
};

export default ResetList;
