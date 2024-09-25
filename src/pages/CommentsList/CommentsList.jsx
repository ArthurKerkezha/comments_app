import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBeforeUnload } from "react-router-dom";
import { List } from "antd";

import { CommentsSelector } from "../../redux/selectors";
import { CommentsThunks } from "../../redux/thunks";
import Storage from "../../helpers/storage";
import {
  useObserver,
  useScrollToPosition,
  useGetScrollPositions,
} from "../../hooks";
import CommentsListItem from "./components/CommentsListItem";
import styles from "./CommentsList.module.less";

const CommentsList = () => {
  const isLoading = useSelector(CommentsSelector.selectIsLoading);
  const comments = useSelector(CommentsSelector.selectComments);
  const limit = useSelector(CommentsSelector.selectLimit);
  const skip = useSelector(CommentsSelector.selectSkip);

  const dispatch = useDispatch();
  const elemRef = useRef(null);
  const scrollRef = useRef();

  const position = Storage.getScrollPosition();

  const loadComments = useCallback(() => {
    dispatch(CommentsThunks.loadComments());
  }, [dispatch]);

  useObserver(elemRef, loadComments);

  useScrollToPosition(scrollRef, position, !!position);

  const scrollPosition = useGetScrollPositions(scrollRef);

  useBeforeUnload(
    useCallback(() => {
      Storage.setScrollPosition(scrollPosition);
      Storage.setCommentsParamsState({ limit, skip });
    }, [scrollPosition, limit, skip]),
  );

  return (
    <List
      ref={scrollRef}
      bordered
      size="small"
      loading={isLoading}
      className={styles.list}
      loadMore={<div ref={elemRef} className={styles.listMore} />}
      dataSource={comments}
      renderItem={(item) => <CommentsListItem item={item} />}
    />
  );
};

export default CommentsList;
