import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";

import Storage from "../../helpers/storage";
import { createAndDownloadJsonFile } from "../../utils";
import { CommentsSelector } from "../../redux/selectors";

const StateFileCreator = () => {
  const limit = useSelector(CommentsSelector.selectLimit);
  const skip = useSelector(CommentsSelector.selectSkip);
  const commentState = useSelector(CommentsSelector.selectState);

  const onSaveState = () => {
    Storage.setCommentsParamsState({ limit, skip });

    const localStorageData = Array.from({ length: localStorage.length }).reduce(
      (data, _, index) => {
        const key = localStorage.key(index);

        data[key] = localStorage.getItem(key);
        return data;
      },
      {},
    );
    const combinedState = {
      localStorage: localStorageData,
      commentState,
    };

    createAndDownloadJsonFile(combinedState, "comment-app.json");
  };

  return (
    <Button className="m-r-5" onClick={onSaveState}>
      Create state file
    </Button>
  );
};

export default StateFileCreator;
