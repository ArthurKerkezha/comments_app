import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import { CommentsThunks } from "../../redux/thunks";
import { CommentsSelector } from "../../redux/selectors";
import { DetailsCard } from "../../shared/components";
import { useLoading } from "../../hooks";

const CommentDetails = () => {
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useSelector(CommentsSelector.selectComment);

  const loadComment = useCallback(async () => {
    const payload = await dispatch(CommentsThunks.loadComment(commentId));

    if (payload.meta.rejectedWithValue) {
      navigate("/");
    }
  }, [commentId, dispatch, navigate]);

  const [loadCommentDetails, isLoading] = useLoading(loadComment);

  useEffect(() => {
    // TODO and there will always be errors here if there is no comment with this "id" in the database
    loadCommentDetails();
  }, [dispatch, loadCommentDetails]);

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
