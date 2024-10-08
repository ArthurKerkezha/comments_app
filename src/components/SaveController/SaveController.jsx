import React, { useCallback, useState } from "react";
import { useBeforeUnload } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Tooltip } from "antd";
import { SaveFilled, SaveOutlined } from "@ant-design/icons";

import { saveState } from "../../utils";
import { CommentsSelector } from "../../redux/selectors";

const SaveController = () => {
  const [isAllowSave, setIsAllowSave] = useState(true);
  const state = useSelector(CommentsSelector.selectState);

  useBeforeUnload(
    useCallback(() => {
      if (isAllowSave) {
        saveState(state);
      }
    }, [isAllowSave, state]),
  );

  const onClick = () => setIsAllowSave(!isAllowSave);

  const Icon = isAllowSave ? SaveFilled : SaveOutlined;
  const text = isAllowSave ? "Enabled" : "Disabled";

  return (
    <Tooltip title={`${text} save state before leave`}>
      <Button icon={<Icon />} onClick={onClick} />
    </Tooltip>
  );
};

export default SaveController;
