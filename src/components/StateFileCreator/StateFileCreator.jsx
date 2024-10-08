import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";

import { createAndDownloadJsonFile } from "../../utils";
import { CommentsSelector } from "../../redux/selectors";

const StateFileCreator = () => {
  const commentState = useSelector(CommentsSelector.selectState);

  const onSaveState = () => {
    createAndDownloadJsonFile(commentState, "comment-app.json");
  };

  return (
    <Button className="m-r-5" onClick={onSaveState}>
      Create state file
    </Button>
  );
};

export default StateFileCreator;
