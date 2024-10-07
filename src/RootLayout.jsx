import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, Layout } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

import ContentViewWrapper from "./components/ContentViewWrapper";
import { Header } from "./shared/components";
import ResetList from "./components/ResetList";
import Uploader from "./components/Uploader";
import StateFileCreator from "./components/StateFileCreator";
import styles from "./RootLayout.module.less";

const { Content } = Layout;

const RootLayout = () => {
  const { commentId } = useParams();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

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
