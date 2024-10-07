import React, { useCallback, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BREAKPOINTS_MEDIA_MAP } from "../../constants";
import { CommentsSelector } from "../../redux/selectors";
import { CommentsThunks } from "../../redux/thunks";
import { CommentForm } from "../../pages/CommentsList/components";
import { DetailsCard, Sider, FormModal } from "../../shared/components";
import { useLoading } from "../../hooks";
import Storage from "../../helpers/storage";

const ContentViewWrapper = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector(CommentsSelector.selectComment);
  const isMobile = useMediaQuery({ query: BREAKPOINTS_MEDIA_MAP.mdMax });
  const navigate = useNavigate();

  const loadComment = useCallback(async () => {
    const payload = await dispatch(CommentsThunks.loadComment(id));

    if (payload.meta.rejectedWithValue) {
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  const [loadCommentDetails, isLoading] = useLoading(loadComment);

  useEffect(() => {
    if (!id) return;

    loadCommentDetails();
  }, [id, dispatch, loadCommentDetails]);

  const onClick = () => navigate(`/comments/${id}`);

  const onClose = () => {
    Storage.clearFormValues();

    navigate("/");
  };

  const Wrapper = isMobile ? FormModal : Sider;

  return (
    <Wrapper isOpen={!!id} onClose={onClose}>
      <div className="d-f f-d-column ai-c jc-c w-100 h-100">
        <CommentForm />

        <DetailsCard
          title={comment?.user?.fullName}
          content={comment?.body}
          isLoading={isLoading}
          onClick={onClick}
        />
      </div>
    </Wrapper>
  );
};

export default ContentViewWrapper;
