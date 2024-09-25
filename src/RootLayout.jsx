import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import ContentViewWrapper from "./components/ContentViewWrapper";
import styles from "./RootLayout.module.less";

const { Content, Header } = Layout;

const RootLayout = () => (
  // const onBeforeUnload = useCallback((event) => {
  //   event.preventDefault();
  //   // Custom logic to handle the refresh
  //   // Display a confirmation message or perform necessary actions
  //   console.log("onBeforeUnload");
  // }, []);
  //
  // useEffect(() => {
  //   window.addEventListener("beforeunload", onBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", onBeforeUnload);
  //   };
  // }, [onBeforeUnload]);

  <Layout className={styles.layout}>
    <Header>
      <span className="white-text">Hello world !!!</span>
    </Header>
    <Layout>
      <Content className={styles.layoutContent}>
        <Outlet />
      </Content>
      <ContentViewWrapper />
    </Layout>
  </Layout>
);

export default RootLayout;
