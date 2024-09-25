import React, { useCallback, useEffect, useRef, useState } from "react";
import { List } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useBeforeUnload } from "react-router-dom";
import { CommentsSelector } from "../../../redux/selectors";
import { CommentsThunks } from "../../../redux/thunks";
import Storage from "../../../helpers/storage";
import {
  useObserver,
  useScrollToPosition,
  useGetScrollPositions,
} from "../../../hooks";
import CommentsListItem from "./CommentsListItem";
import styles from "./CommentsList.module.less";

const CommentsList = () => {
  const isLoading = useSelector(CommentsSelector.selectIsLoading);
  const comments = useSelector(CommentsSelector.selectComments);
  const dispatch = useDispatch();
  const elemRef = useRef(null);
  const scrollRef = useRef();
  const position = Storage.getScrollPosition();

  const loadComments = useCallback(() => {
    dispatch(CommentsThunks.loadComments());
  }, [dispatch]);

  useScrollToPosition(scrollRef, position, !!position);

  const scrollPosition = useGetScrollPositions(scrollRef);

  useObserver(elemRef, loadComments);

  useBeforeUnload(
    useCallback(() => {
      Storage.setScrollPosition(scrollPosition);
    }, [scrollPosition]),
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
