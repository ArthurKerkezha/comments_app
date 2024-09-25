import React, { useCallback, useRef } from "react";
import { List } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { CommentsSelector } from "../../../redux/selectors";
import CommentsListItem from "./CommentsListItem";
import styles from "./CommentsList.module.less";
import { CommentsThunks } from "../../../redux/thunks";
import { useObserver } from "../../../hooks";

const CommentsList = () => {
  const isLoading = useSelector(CommentsSelector.selectIsLoading);
  const comments = useSelector(CommentsSelector.selectComments);

  const dispatch = useDispatch();
  const elemRef = useRef(null);

  const loadComments = useCallback(() => {
    dispatch(CommentsThunks.loadComments());
  }, [dispatch]);

  useObserver(elemRef, loadComments);

  return (
    <List
      bordered
      size="small"
      loading={isLoading}
      className={styles.list}
      dataSource={comments}
      renderItem={(item) => <CommentsListItem item={item} />}
    >
      <div
        ref={elemRef}
        style={{ height: "20px", background: "transparent" }}
      />
    </List>
  );
};

export default CommentsList;
