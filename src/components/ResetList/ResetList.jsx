import React from "react";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { CommentsActions } from "../../redux/slices/commentsSlice";
import { CommentsSelector } from "../../redux/selectors";
import { BREAKPOINTS_MEDIA_MAP } from "../../constants";
import { CommentsThunks } from "../../redux/thunks";

const ResetList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(CommentsSelector.selectIsLoading);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: BREAKPOINTS_MEDIA_MAP.mdMax });

  const onClick = async () => {
    dispatch(CommentsActions.clearComments());
    await dispatch(CommentsThunks.loadComments());

    if (id) {
      navigate("/");
    }
  };

  return (
    <Button
      size={isMobile ? "small" : "middle"}
      icon={<SyncOutlined spin={isLoading} />}
      onClick={onClick}
    >
      Clear state
    </Button>
  );
};

export default ResetList;
