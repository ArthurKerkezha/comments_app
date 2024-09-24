import React from "react";
import { List } from "antd";
import { useSelector } from "react-redux";

import { CommentsSelector } from "../../../redux/selectors";
import CommentsListItem from "./CommentsListItem";
import styles from "./CommentsList.module.less";

const CommentsList = () => {
  const isLoading = useSelector(CommentsSelector.selectIsLoading);
  const comments = useSelector(CommentsSelector.selectComments);

  return (
    <List
      bordered
      size="small"
      loading={isLoading}
      className={styles.list}
      dataSource={comments}
      renderItem={(item) => <CommentsListItem item={item} />}
    />
  );
};

export default CommentsList;
