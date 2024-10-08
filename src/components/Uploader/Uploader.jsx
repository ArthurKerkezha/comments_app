import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import { Button, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import { CommentsThunks } from "../../redux/thunks";
import { saveState } from "../../utils";
import { BREAKPOINTS_MEDIA_MAP } from "../../constants";

const Uploader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: BREAKPOINTS_MEDIA_MAP.mdMax });

  const onRestoreState = (file) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const fileState = JSON.parse(e.target.result);

        saveState(fileState);

        await dispatch(CommentsThunks.loadSavedState());
        const comment = get(fileState, "comment", {});

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
      <Button size={isMobile ? "small" : "middle"} icon={<UploadOutlined />}>
        Upload State File
      </Button>
    </Upload>
  );
};

export default Uploader;
