import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "lodash";
import { CommentsThunks } from "../../redux/thunks";
import { CommentsList } from "./components";
import { CommentsSelector } from "../../redux/selectors";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector(CommentsSelector.selectComments);

  useEffect(() => {
    dispatch(CommentsThunks.loadComments());
  }, [dispatch]);

  return <CommentsList />;
};

export default Comments;
