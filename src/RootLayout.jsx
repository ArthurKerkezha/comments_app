import {
  Outlet,
  useBeforeUnload,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, Layout } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import ContentViewWrapper from "./components/ContentViewWrapper";
import { Header } from "./shared/components";
import ResetList from "./components/ResetList";
import Uploader from "./components/Uploader";
import StateFileCreator from "./components/StateFileCreator";
import { CommentsSelector } from "./redux/selectors";
import { saveState } from "./utils";
import styles from "./RootLayout.module.less";

const { Content } = Layout;

const RootLayout = () => {
  const { commentId } = useParams();
  const navigate = useNavigate();
  const state = useSelector(CommentsSelector.selectState);

  const onGoBack = () => {
    navigate(-1);
  };

  useBeforeUnload(
    useCallback(() => {
      saveState(state);
    }, [state]),
  );

  return (
    <Layout className={styles.layout}>
      <Header>
        <StateFileCreator />
        <Uploader />

        <div className="w-100 d-f jc-fe ai-c">
          {commentId ? (
            <Button icon={<RollbackOutlined />} onClick={onGoBack} />
          ) : (
            <ResetList />
          )}
        </div>
      </Header>
      <Layout>
        <Content className={styles.layoutContent}>
          <Outlet />
        </Content>
        <ContentViewWrapper />
      </Layout>
    </Layout>
  );
};

export default RootLayout;
