import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { CopyOutlined } from "@ant-design/icons";

import { createAndDownloadJsonFile } from "../../utils";
import { CommentsSelector } from "../../redux/selectors";
import { BREAKPOINTS_MEDIA_MAP } from "../../constants";

const StateFileCreator = () => {
  const commentState = useSelector(CommentsSelector.selectState);
  const isMobile = useMediaQuery({ query: BREAKPOINTS_MEDIA_MAP.mdMax });

  const onSaveState = () => {
    createAndDownloadJsonFile(commentState, "comment-app.json");
  };

  return (
    <Button
      size={isMobile ? "small" : "middle"}
      className="m-r-5"
      icon={<CopyOutlined />}
      onClick={onSaveState}
    >
      Create state file
    </Button>
  );
};

export default StateFileCreator;
