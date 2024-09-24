import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { CommentsThunks } from "../../redux/thunks";
import { CommentsList } from "./components";

const Comments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CommentsThunks.loadComments());
  }, [dispatch]);

  return <CommentsList />;
};

export default Comments;
