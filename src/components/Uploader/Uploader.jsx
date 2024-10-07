import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import { Button, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { CommentsActions } from "../../redux/slices/commentsSlice";

const Uploader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRestoreState = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const loadedState = JSON.parse(e.target.result);
        const localStorageData = loadedState.localStorage;

        Object.entries(localStorageData).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });

        dispatch(CommentsActions.setFullState(loadedState.commentState));
        const comment = get(loadedState, "commentState.comment", {});

        if (!isEmpty(comment)) {
          navigate(`/${comment.id}`);
        }
        notification.success({
          message: "State successfully restored from file!",
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
        notification.error({
          message: "Invalid file format. Please upload a valid JSON file.",
        });
      }
    };

    reader.readAsText(file);

    return false;
  };

  return (
    <Upload beforeUpload={onRestoreState} showUploadList={false} accept=".json">
      <Button icon={<UploadOutlined />}>Upload State File</Button>
    </Upload>
  );
};

export default Uploader;
