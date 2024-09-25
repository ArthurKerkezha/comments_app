import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BREAKPOINTS_MEDIA_MAP } from "../../../constants";
import { CommentsSelector } from "../../../redux/selectors";
import { CommentsThunks } from "../../../redux/thunks";
import { CommentForm } from "../../../pages/Comments/components";
import FormModal from "../FormModal";
import DetailsCard from "../DetailsCard";
import Sider from "../Sider";

const ContentViewWrapper = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector(CommentsSelector.selectComment);
  const isCommentLoading = useSelector(CommentsSelector.selectIsCommentLoading);
  const isMobile = useMediaQuery({ query: BREAKPOINTS_MEDIA_MAP.mdMax });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    dispatch(CommentsThunks.loadComment(id));
  }, [id, dispatch]);

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
