import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import { CommentsThunks } from "../../redux/thunks";
import { CommentsSelector } from "../../redux/selectors";
import { DetailsCard } from "../../shared/components";

const CommentDetails = () => {
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector(CommentsSelector.selectComment);
  const isLoading = useSelector(CommentsSelector.selectIsLoading);

  useEffect(() => {
    dispatch(CommentsThunks.loadComment(commentId));
  }, [commentId, dispatch]);

  if (isEmpty(comment)) return null;

  return (
    <DetailsCard
      title={comment.user.fullName}
      content={comment.body}
      isLoading={isLoading}
    />
  );
};

export default CommentDetails;
