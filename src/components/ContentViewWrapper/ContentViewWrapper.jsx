import React, { useCallback, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BREAKPOINTS_MEDIA_MAP } from "../../constants";
import { CommentsSelector } from "../../redux/selectors";
import { CommentsThunks } from "../../redux/thunks";
import { CommentForm } from "../../pages/Comments/components";
import { DetailsCard, Sider, FormModal } from "../../shared/components";

const ContentViewWrapper = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector(CommentsSelector.selectComment);
  const isCommentLoading = useSelector(CommentsSelector.selectIsCommentLoading);
  const isMobile = useMediaQuery({ query: BREAKPOINTS_MEDIA_MAP.mdMax });
  const navigate = useNavigate();

  const loadComments = useCallback(async () => {
    const payload = await dispatch(CommentsThunks.loadComment(id));

    if (payload.meta.rejectedWithValue) {
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (!id) return;

    loadComments();
  }, [id, dispatch, loadComments]);

  const onClick = () => {
    navigate(`/comments/${id}`);
  };

  const onClose = () => {
    navigate("/");
  };

  const Wrapper = isMobile ? FormModal : Sider;

  return (
    <Wrapper isOpen={id} onClose={onClose}>
      <div className="d-f f-d-column ai-c jc-c w-100 h-100">
        <CommentForm />

        <DetailsCard
          title={comment?.user?.fullName}
          content={comment?.body}
          isLoading={isCommentLoading}
          onClick={onClick}
        />
      </div>
    </Wrapper>
  );
};

export default ContentViewWrapper;
